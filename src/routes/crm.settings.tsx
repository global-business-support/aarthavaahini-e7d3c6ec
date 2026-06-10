import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { toast } from "sonner";
import { Settings as SettingsIcon, Loader2, Save, LogOut } from "lucide-react";

export const Route = createFileRoute("/crm/settings")({ component: SettingsPage });

function SettingsPage() {
  const { user, primaryRole } = useCrmAuth();
  const nav = useNavigate();
  const [profile, setProfile] = useState({ full_name: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("profiles")
        .select("full_name, phone").eq("id", user.id).maybeSingle();
      if (data) setProfile({ full_name: data.full_name ?? "", phone: data.phone ?? "" });
      setLoading(false);
    })();
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles")
      .update({ full_name: profile.full_name, phone: profile.phone })
      .eq("id", user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/crm/login" });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 px-4 py-3 text-white shadow-md">
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-5 w-5" />
          <div>
            <div className="text-sm font-semibold">Settings</div>
            <div className="text-[11px] text-white/80">Manage your profile and account</div>
          </div>
        </div>
      </div>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900">Account</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Email</Label>
            <Input value={user?.email ?? ""} disabled className="bg-slate-50" />
          </div>
          <div>
            <Label className="text-xs">Role</Label>
            <div className="mt-1.5"><Badge variant="secondary" className="capitalize">{primaryRole?.replace(/_/g, " ") ?? "user"}</Badge></div>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900">Profile</h2>
        {loading ? (
          <div className="flex h-24 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Full Name</Label>
              <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="bg-white" />
            </div>
            <div>
              <Label className="text-xs">Phone</Label>
              <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="bg-white" />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <Button onClick={save} disabled={saving} className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900">Session</h2>
        <p className="mt-1 text-xs text-slate-500">Sign out of the CRM on this device.</p>
        <Button onClick={signOut} variant="outline" className="mt-3 border-red-200 text-red-600 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </Card>
    </div>
  );
}
