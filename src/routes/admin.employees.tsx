import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { listEmployees, createEmployee, deleteEmployee, resetEmployeePassword } from "@/lib/employees.functions";
import { toast } from "sonner";
import {
  Loader2, UserPlus, Trash2, KeyRound, Copy, Check, ArrowLeft, Users, MessageCircle, Mail, Phone,
} from "lucide-react";

export const Route = createFileRoute("/admin/employees")({
  head: () => ({ meta: [{ title: "Employees — Admin" }] }),
  component: EmployeesPage,
});

type Emp = { id: string; email: string | null; full_name: string | null; phone: string | null; roles: string[] };

const ROLE_OPTIONS = [
  { value: "manager", label: "Manager" },
  { value: "sales_executive", label: "Sales Executive" },
  { value: "operations", label: "Operations" },
  { value: "insurance_executive", label: "Insurance Executive" },
  { value: "mf_executive", label: "Mutual Fund Executive" },
  { value: "admin", label: "Admin" },
];

function EmployeesPage() {
  const { user, isAdmin, loading } = useAuth();
  const list = useServerFn(listEmployees);
  const create = useServerFn(createEmployee);
  const del = useServerFn(deleteEmployee);
  const reset = useServerFn(resetEmployeePassword);

  const [emps, setEmps] = useState<Emp[]>([]);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: "", full_name: "", phone: "", role: "sales_executive" });
  const [creds, setCreds] = useState<{ email: string; password: string; phone: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = async () => {
    setBusy(true);
    try {
      const r = await list();
      setEmps(r.employees as Emp[]);
    } catch (e: any) { toast.error(e.message); }
    setBusy(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen"><Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-3xl font-bold">Access Denied</h1>
          <p className="mt-2 text-muted-foreground">Admins only.</p>
        </div><Footer />
      </div>
    );
  }

  const submit = async () => {
    if (!form.email || !form.full_name || !form.phone) { toast.error("Fill all fields"); return; }
    setBusy(true);
    try {
      const r = await create({ data: form as any });
      setCreds({ email: r.employee.email, password: r.password, phone: r.employee.phone ?? "", name: r.employee.full_name ?? "" });
      setOpen(false);
      setForm({ email: "", full_name: "", phone: "", role: "sales_executive" });
      await load();
      toast.success("Employee created");
    } catch (e: any) { toast.error(e.message); }
    setBusy(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this employee permanently?")) return;
    try { await del({ data: { user_id: id } }); toast.success("Deleted"); await load(); }
    catch (e: any) { toast.error(e.message); }
  };

  const handleReset = async (e: Emp) => {
    try {
      const r = await reset({ data: { user_id: e.id } });
      setCreds({ email: e.email ?? "", password: r.password, phone: e.phone ?? "", name: e.full_name ?? "" });
    } catch (err: any) { toast.error(err.message); }
  };

  const credsText = creds
    ? `Aarthvaahini CRM Login\nName: ${creds.name}\nLogin URL: ${typeof window !== "undefined" ? window.location.origin : ""}/crm/login\nEmail: ${creds.email}\nPassword: ${creds.password}\n\nPlease change your password after first login.`
    : "";

  const waLink = creds && creds.phone
    ? `https://wa.me/${creds.phone.replace(/\D/g, "")}?text=${encodeURIComponent(credsText)}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"><ArrowLeft className="h-3 w-3" /> Back to Admin</Link>
            <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 md:text-3xl">Employees</h1>
            <p className="text-sm text-slate-500">Add and manage CRM team members with role-based access.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90">
                <UserPlus className="mr-2 h-4 w-4" /> Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>A login will be created with an auto-generated password.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <div><Label>Full Name</Label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Ravi Kumar" /></div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ravi@company.com" /></div>
                <div><Label>Phone (with country code)</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+919876543210" /></div>
                <div><Label>Role</Label>
                  <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ROLE_OPTIONS.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="overflow-hidden border-slate-200/70 p-0">
          <div className="flex items-center gap-2 border-b border-slate-100 p-4">
            <Users className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-semibold">Staff Members ({emps.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wider text-slate-500">
                <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Role</th><th className="px-4 py-3 text-right">Actions</th></tr>
              </thead>
              <tbody>
                {busy && emps.length === 0 && (<tr><td colSpan={5} className="p-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-slate-400" /></td></tr>)}
                {!busy && emps.length === 0 && (<tr><td colSpan={5} className="p-10 text-center text-slate-400">No employees yet. Click "Add Employee" to create one.</td></tr>)}
                {emps.map((e) => (
                  <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-medium text-slate-900">{e.full_name || "—"}</td>
                    <td className="px-4 py-3 text-slate-700"><Mail className="mr-1 inline h-3 w-3 text-slate-400" />{e.email}</td>
                    <td className="px-4 py-3 text-slate-700"><Phone className="mr-1 inline h-3 w-3 text-slate-400" />{e.phone || "—"}</td>
                    <td className="px-4 py-3">{e.roles.map((r) => <Badge key={r} variant="secondary" className="mr-1 capitalize">{r.replace(/_/g, " ")}</Badge>)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => handleReset(e)}><KeyRound className="mr-1 h-3 w-3" />Reset</Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(e.id)}><Trash2 className="h-3 w-3" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      {/* Credentials Modal */}
      <Dialog open={!!creds} onOpenChange={(o) => !o && setCreds(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Credentials</DialogTitle>
            <DialogDescription>Save and share these now — the password will not be shown again.</DialogDescription>
          </DialogHeader>
          {creds && (
            <div className="space-y-3">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                Copy these credentials and share them with the employee securely. Ask them to change the password after first login.
              </div>
              <pre className="overflow-x-auto rounded-lg border bg-slate-50 p-3 text-xs">{credsText}</pre>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => { navigator.clipboard.writeText(credsText); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                {waLink && (
                  <a href={waLink} target="_blank" rel="noreferrer">
                    <Button className="bg-green-600 text-white hover:bg-green-700"><MessageCircle className="mr-2 h-4 w-4" /> Send via WhatsApp</Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
