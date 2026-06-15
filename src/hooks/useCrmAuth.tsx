import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const STAFF_ROLES = [
  "admin",
  "manager",
  "sales_executive",
  "operations",
  "insurance_executive",
  "mf_executive",
] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];

export function useCrmAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<StaffRole[]>([]);
  const [isPartner, setIsPartner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadRoles = async (u: User | null) => {
      if (!u) {
        if (mounted) {
          setRoles([]);
          setLoading(false);
        }
        return;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.id);
      if (!mounted) return;
      if (error) {
        console.error("CRM role check failed", error);
        setRoles([]);
        setLoading(false);
        return;
      }
      const allRoles = (data ?? []).map((r) => r.role as string);
      setRoles(allRoles.filter((r) => (STAFF_ROLES as readonly string[]).includes(r)) as StaffRole[]);
      setIsPartner(allRoles.includes("partner"));
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_evt, session) => {
        setUser(session?.user ?? null);
        // defer to avoid deadlocks
        setTimeout(() => loadRoles(session?.user ?? null), 0);
      },
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      loadRoles(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const isStaff = roles.length > 0;
  const isAdmin = roles.includes("admin");
  const primaryRole = roles[0] ?? null;

  return { user, roles, isStaff, isAdmin, isPartner, primaryRole, loading };
}
