import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const STAFF_ROLES = ["admin", "manager", "sales_executive", "operations", "insurance_executive", "mf_executive"] as const;
type StaffRole = typeof STAFF_ROLES[number];

async function getAdminUserId(token: string): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) throw new Error("Unauthorized");
  const { data: role } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!role) throw new Error("Forbidden: admin only");
  return data.user.id;
}

function generatePassword(len = 12) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$";
  let out = "";
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  for (let i = 0; i < len; i++) out += chars[arr[i] % chars.length];
  return out;
}

export const listEmployees = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await getAdminUserId(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role")
      .in("role", [...STAFF_ROLES]);
    const ids = Array.from(new Set((roles ?? []).map((r) => r.user_id)));
    if (ids.length === 0) return { employees: [] };
    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name, phone")
      .in("id", ids);
    const rolesByUser = new Map<string, string[]>();
    for (const r of roles ?? []) {
      const arr = rolesByUser.get(r.user_id) ?? [];
      arr.push(r.role);
      rolesByUser.set(r.user_id, arr);
    }
    const employees = (profiles ?? []).map((p) => ({
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      phone: p.phone,
      roles: rolesByUser.get(p.id) ?? [],
    }));
    return { employees };
  });

export const createEmployee = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      email: z.string().trim().email(),
      full_name: z.string().trim().min(1).max(120),
      phone: z.string().trim().min(7).max(20),
      role: z.enum(STAFF_ROLES),
    }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await getAdminUserId(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const password = generatePassword(12);

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password,
      email_confirm: true,
      user_metadata: { full_name: data.full_name, phone: data.phone },
    });
    if (error || !created.user) throw new Error(error?.message || "Failed to create user");

    const uid = created.user.id;

    await supabaseAdmin.from("profiles").upsert({
      id: uid,
      email: data.email,
      full_name: data.full_name,
      phone: data.phone,
    });

    await supabaseAdmin.from("user_roles").delete().eq("user_id", uid);
    const { error: rErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: uid, role: data.role as StaffRole });
    if (rErr) throw new Error(rErr.message);

    return {
      employee: { id: uid, email: data.email, full_name: data.full_name, phone: data.phone, role: data.role },
      password,
    };
  });

export const deleteEmployee = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ user_id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const adminId = await getAdminUserId(context.token);
    if (data.user_id === adminId) throw new Error("Cannot delete yourself");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.user_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const resetEmployeePassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ user_id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await getAdminUserId(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const password = generatePassword(12);
    const { error } = await supabaseAdmin.auth.admin.updateUserById(data.user_id, { password });
    if (error) throw new Error(error.message);
    return { password };
  });
