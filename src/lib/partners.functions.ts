import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const STAFF_ROLES = ["admin", "manager", "sales_executive", "operations", "insurance_executive", "mf_executive"] as const;

async function getUserFromToken(token: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) throw new Error("Unauthorized: please sign in again.");
  return data.user;
}

async function assertStaff(token: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const user = await getUserFromToken(token);
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .in("role", STAFF_ROLES as unknown as string[])
    .limit(1)
    .maybeSingle();
  if (!data) throw new Error("Forbidden: staff access required.");
  return user;
}

async function assertAdmin(token: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const user = await getUserFromToken(token);
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden: admin access required.");
  return user;
}

export const listPartners = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("partners")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { partners: data ?? [] };
  });

export const createPartnerAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: {
    name: string; email: string; password: string; phone: string;
    organisation?: string; category?: string; city?: string;
    commission_pct?: number; notes?: string;
  }) => {
    if (!d?.name?.trim()) throw new Error("Name required");
    if (!d?.email?.trim()) throw new Error("Email required");
    if (!d?.password || d.password.length < 6) throw new Error("Password must be 6+ chars");
    if (!d?.phone?.trim()) throw new Error("Phone required");
    return d;
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Create auth user (email confirmed so they can sign in immediately)
    const { data: created, error: authErr } = await supabaseAdmin.auth.admin.createUser({
      email: data.email.trim().toLowerCase(),
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.name, phone: data.phone },
    });
    if (authErr || !created.user) throw new Error(authErr?.message || "Could not create login account");
    const userId = created.user.id;

    // Replace default 'user' role with 'partner' (handle_new_user trigger inserts 'user')
    await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);
    const { error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "partner" });
    if (roleErr) {
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error("Failed to assign partner role: " + roleErr.message);
    }

    // Insert partner row
    const { data: partner, error: pErr } = await supabaseAdmin
      .from("partners")
      .insert({
        user_id: userId,
        name: data.name,
        email: data.email.trim().toLowerCase(),
        phone: data.phone,
        organisation: data.organisation || null,
        category: data.category || "DSA / Connector",
        city: data.city || null,
        commission_pct: data.commission_pct ?? 0,
        notes: data.notes || null,
        status: "Active",
      })
      .select()
      .single();
    if (pErr) {
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error("Failed to create partner: " + pErr.message);
    }
    return { partner };
  });

export const updatePartner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; patch: Record<string, unknown> }) => {
    if (!d?.id) throw new Error("Partner id required");
    return d;
  })
  .handler(async ({ data, context }) => {
    await assertStaff(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const allowed = ["name", "organisation", "category", "phone", "city", "status", "commission_pct", "notes"];
    const patch: Record<string, unknown> = {};
    for (const k of allowed) if (k in data.patch) patch[k] = data.patch[k];
    const { data: row, error } = await supabaseAdmin
      .from("partners").update(patch).eq("id", data.id).select().single();
    if (error) throw new Error(error.message);
    return { partner: row };
  });

export const resetPartnerPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { partnerId: string; password: string }) => {
    if (!d?.partnerId) throw new Error("Partner id required");
    if (!d?.password || d.password.length < 6) throw new Error("Password must be 6+ chars");
    return d;
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: p } = await supabaseAdmin
      .from("partners").select("user_id").eq("id", data.partnerId).single();
    if (!p?.user_id) throw new Error("Partner has no login account");
    const { error } = await supabaseAdmin.auth.admin.updateUserById(p.user_id, { password: data.password });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deletePartner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => {
    if (!d?.id) throw new Error("Partner id required");
    return d;
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: p } = await supabaseAdmin
      .from("partners").select("user_id").eq("id", data.id).single();
    await supabaseAdmin.from("partners").delete().eq("id", data.id);
    if (p?.user_id) await supabaseAdmin.auth.admin.deleteUser(p.user_id);
    return { ok: true };
  });

// Partner self-service
export const getMyPartner = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const user = await getUserFromToken(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("partners").select("*").eq("user_id", user.id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("No partner profile found for this account.");
    return { partner: data, email: user.email };
  });

export const updateMyPartner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { name?: string; phone?: string; city?: string; organisation?: string; notes?: string }) => d)
  .handler(async ({ data, context }) => {
    const user = await getUserFromToken(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    for (const k of ["name", "phone", "city", "organisation", "notes"] as const) {
      if (data[k] !== undefined) patch[k] = data[k];
    }
    const { data: row, error } = await supabaseAdmin
      .from("partners").update(patch).eq("user_id", user.id).select().single();
    if (error) throw new Error(error.message);
    return { partner: row };
  });

export const listMyPartnerLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const user = await getUserFromToken(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: p } = await supabaseAdmin
      .from("partners").select("id").eq("user_id", user.id).maybeSingle();
    if (!p) return { leads: [] };
    const { data, error } = await supabaseAdmin
      .from("leads").select("*").eq("partner_id", p.id).order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { leads: data ?? [] };
  });

export const createMyPartnerLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: {
    full_name: string; phone: string; email?: string;
    product_type?: string; product_name?: string; amount?: number;
    city?: string; state?: string; message?: string;
  }) => {
    if (!d?.full_name?.trim()) throw new Error("Name required");
    if (!d?.phone?.trim()) throw new Error("Phone required");
    return d;
  })
  .handler(async ({ data, context }) => {
    const user = await getUserFromToken(context.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: p } = await supabaseAdmin
      .from("partners").select("id").eq("user_id", user.id).maybeSingle();
    if (!p) throw new Error("Partner profile missing");
    const { data: row, error } = await supabaseAdmin
      .from("leads").insert({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email || null,
        product_type: data.product_type || null,
        product_name: data.product_name || null,
        amount: data.amount ?? null,
        city: data.city || null,
        state: data.state || null,
        message: data.message || null,
        lead_source: "Partner",
        status: "new",
        partner_id: p.id,
      }).select().single();
    if (error) throw new Error(error.message);
    return { lead: row };
  });
