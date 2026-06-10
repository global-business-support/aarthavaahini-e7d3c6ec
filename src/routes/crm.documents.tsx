import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Upload, Loader2, Download, Trash2 } from "lucide-react";

export const Route = createFileRoute("/crm/documents")({ component: DocumentsPage });

type Customer = { id: string; customer_name: string; mobile: string | null };
type Doc = {
  id: string;
  document_type: string;
  file_url: string;
  uploaded_at: string;
  customer_id: string | null;
};

const DOC_TYPES = ["PAN", "Aadhaar", "Bank Statement", "Salary Slip", "ITR", "Photo", "Property Papers", "Other"];

function DocumentsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState<string>("");
  const [docType, setDocType] = useState<string>("PAN");
  const [docs, setDocs] = useState<Doc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("customers")
        .select("id, customer_name, mobile")
        .order("created_at", { ascending: false })
        .limit(500);
      setCustomers((data ?? []) as Customer[]);
    })();
  }, []);

  const loadDocs = async (cid: string) => {
    if (!cid) return setDocs([]);
    setLoading(true);
    const { data } = await supabase
      .from("documents")
      .select("id, document_type, file_url, uploaded_at, customer_id")
      .eq("customer_id", cid)
      .order("uploaded_at", { ascending: false });
    setDocs((data ?? []) as Doc[]);
    setLoading(false);
  };

  useEffect(() => { loadDocs(customerId); }, [customerId]);

  const upload = async () => {
    if (!customerId) return toast.error("Select a customer first");
    if (!file) return toast.error("Choose a file to upload");
    setUploading(true);
    const path = `${customerId}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("customer-documents").upload(path, file);
    if (upErr) { setUploading(false); return toast.error(upErr.message); }
    const { error: insErr } = await supabase.from("documents").insert({
      customer_id: customerId,
      document_type: docType,
      file_url: path,
    });
    setUploading(false);
    if (insErr) return toast.error(insErr.message);
    toast.success("Document uploaded");
    setFile(null);
    loadDocs(customerId);
  };

  const open = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("customer-documents")
      .createSignedUrl(path, 60 * 10);
    if (error || !data) return toast.error(error?.message ?? "Cannot open");
    window.open(data.signedUrl, "_blank");
  };

  const remove = async (d: Doc) => {
    if (!confirm("Delete this document?")) return;
    await supabase.storage.from("customer-documents").remove([d.file_url]);
    const { error } = await supabase.from("documents").delete().eq("id", d.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    loadDocs(customerId);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 px-4 py-3 text-white shadow-md">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5" />
          <div>
            <div className="text-sm font-semibold">Customer Documents</div>
            <div className="text-[11px] text-white/80">Upload & manage KYC and supporting documents</div>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr_2fr_auto]">
          <div>
            <Label className="text-xs">Customer</Label>
            <Select value={customerId} onValueChange={setCustomerId}>
              <SelectTrigger className="bg-white"><SelectValue placeholder="Select customer" /></SelectTrigger>
              <SelectContent className="bg-white max-h-72">
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.customer_name} {c.mobile ? `· ${c.mobile}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Document Type</Label>
            <Select value={docType} onValueChange={setDocType}>
              <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white">
                {DOC_TYPES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">File</Label>
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="bg-white" />
          </div>
          <div className="flex items-end">
            <Button onClick={upload} disabled={uploading || !customerId || !file}
              className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Upload
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : !customerId ? (
          <div className="p-10 text-center text-sm text-slate-500">Select a customer to view documents.</div>
        ) : docs.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No documents uploaded yet.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.document_type}</TableCell>
                  <TableCell className="text-xs text-slate-600">{d.file_url.split("/").pop()}</TableCell>
                  <TableCell className="text-xs text-slate-500">{new Date(d.uploaded_at).toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1.5">
                      <Button size="sm" variant="outline" onClick={() => open(d.file_url)}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => remove(d)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
