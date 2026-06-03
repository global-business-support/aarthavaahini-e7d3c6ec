import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";

type User = { email: string; id: string };

type AuthCtx = {
  user: User | null;
  role: string | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  role: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRole = async (uid: string) => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid);
      const roles = (data ?? []).map((r) => r.role as string);
      setRole(roles.includes("admin") ? "admin" : roles[0] ?? "user");
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e, session) => {
        const u = session?.user;
        if (u) {
          setUser({ email: u.email ?? "", id: u.id });
          setTimeout(() => loadRole(u.id), 0);
        } else {
          setUser(null);
          setRole(null);
        }
      },
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user;
      if (u) {
        setUser({ email: u.email ?? "", id: u.id });
        loadRole(u.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <Ctx.Provider
      value={{ user, role, isAdmin: role === "admin", loading, signOut }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
