import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Activity, Loader2, StickyNote, UserPlus, FileEdit } from "lucide-react";

export const Route = createFileRoute("/crm/activity")({ component: ActivityPage });

type Item = {
  id: string;
  activity_type: string;
  notes: string | null;
  created_at: string;
  lead_id: string | null;
  customer_id: string | null;
};

const ICONS: Record<string, typeof Activity> = {
  note: StickyNote,
  created: UserPlus,
  updated: FileEdit,
};

function ActivityPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("activities")
        .select("id, activity_type, notes, created_at, lead_id, customer_id")
        .order("created_at", { ascending: false })
        .limit(200);
      setItems((data ?? []) as Item[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 px-4 py-3 text-white shadow-md">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5" />
          <div>
            <div className="text-sm font-semibold">Activity Feed</div>
            <div className="text-[11px] text-white/80">Recent notes & updates across leads and customers</div>
          </div>
        </div>
      </div>

      <Card className="p-4">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">No activity yet.</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((it) => {
              const Icon = ICONS[it.activity_type] ?? Activity;
              return (
                <li key={it.id} className="flex gap-3 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">{it.activity_type}</Badge>
                      <span className="text-[11px] text-slate-500">{new Date(it.created_at).toLocaleString("en-IN")}</span>
                    </div>
                    {it.notes && <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{it.notes}</p>}
                    <div className="mt-1 text-[11px] text-slate-400">
                      {it.lead_id ? `Lead: ${it.lead_id.slice(0, 8)}…` : it.customer_id ? `Customer: ${it.customer_id.slice(0, 8)}…` : ""}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
