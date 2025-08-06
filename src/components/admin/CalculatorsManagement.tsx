import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import DynamicIcon from "@/components/ui/DynamicIcon";

interface CalculatorRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  icon_name: string;
  visible: boolean;
  sort_order: number;
}

const emptyForm: Omit<CalculatorRow, "id" | "sort_order"> & { sort_order?: number } = {
  title: "",
  slug: "",
  description: "",
  icon_name: "calculator",
  visible: true,
};

const CalculatorsManagement = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<CalculatorRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<CalculatorRow | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("calculators")
      .select("*")
      .order("sort_order", { ascending: true });
    setLoading(false);
    if (error) {
      console.error(error);
      toast({ title: "Սխալ", description: "Չհաջողվեց բեռնել հաշվիչները", variant: "destructive" });
      return;
    }
    setItems(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const onEdit = (row: CalculatorRow) => {
    setEditing(row);
    setForm({
      title: row.title,
      slug: row.slug,
      description: row.description || "",
      icon_name: row.icon_name || "calculator",
      visible: !!row.visible,
    });
  };

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const save = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Լրացրեք վերնագիրն ու slug-ը", variant: "destructive" });
      return;
    }
    if (editing) {
      const { error } = await supabase
        .from("calculators")
        .update({
          title: form.title,
          slug: form.slug,
          description: form.description || null,
          icon_name: form.icon_name,
          visible: form.visible,
        })
        .eq("id", editing.id);
      if (error) return toast({ title: "Սխալ", description: "Չհաջողվեց թարմացնել", variant: "destructive" });
      toast({ title: "Թարմացվել է" });
    } else {
      // compute next order
      const nextOrder = items.length ? Math.max(...items.map(i => i.sort_order)) + 1 : 0;
      const { error } = await supabase
        .from("calculators")
        .insert({
          title: form.title,
          slug: form.slug,
          description: form.description || null,
          icon_name: form.icon_name,
          visible: form.visible,
          sort_order: nextOrder,
        });
      if (error) return toast({ title: "Սխալ", description: "Չհաջողվեց ավելացնել", variant: "destructive" });
      toast({ title: "Ավելացվել է" });
    }
    await load();
    reset();
  };

  const remove = async (row: CalculatorRow) => {
    const { error } = await supabase.from("calculators").delete().eq("id", row.id);
    if (error) return toast({ title: "Սխալ", description: "Չհաջողվեց ջնջել", variant: "destructive" });
    toast({ title: "Ջնջվել է" });
    await load();
  };

  const toggleVisible = async (row: CalculatorRow) => {
    const { error } = await supabase
      .from("calculators")
      .update({ visible: !row.visible })
      .eq("id", row.id);
    if (error) return toast({ title: "Սխալ", description: "Չհաջողվեց փոխել տեսանելիությունը", variant: "destructive" });
    await load();
  };

  const move = async (row: CalculatorRow, direction: -1 | 1) => {
    const index = items.findIndex(i => i.id === row.id);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const target = items[targetIndex];
    // swap sort_order between row and target
    const u1 = await supabase.from("calculators").update({ sort_order: target.sort_order }).eq("id", row.id);
    const u2 = await supabase.from("calculators").update({ sort_order: row.sort_order }).eq("id", target.id);
    if (u1.error || u2.error) {
      return toast({ title: "Սխալ", description: "Չհաջողվեց փոխել կարգը", variant: "destructive" });
    }
    await load();
  };


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Ավելացնել / խմբագրել հաշվիչ</CardTitle>
          <CardDescription>Կարգավորեք վերնագիրը, slug-ը, նկարագրությունն ու իկոնը</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Վերնագիր</Label>
              <Input id="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (օր. salary)</Label>
              <Input id="slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Նկարագրություն</Label>
              <Input id="description" value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Իկոնի անունը (lucide, kebab-case՝ օրինակ՝ calculator, percent)</Label>
              <div className="flex items-center gap-3">
                <Input id="icon" value={form.icon_name} onChange={e => setForm({ ...form, icon_name: e.target.value })} />
                <DynamicIcon name={form.icon_name} size={22} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="visible" checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} />
              <Label htmlFor="visible">Տեսանելի</Label>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={save}>{editing ? "Պահպանել" : "Ավելացնել"}</Button>
            {editing && <Button variant="outline" onClick={reset}>Չեղարկել</Button>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Հաշվիչների ցուցակ</CardTitle>
          <CardDescription>Քարշատել կարգը, խմբագրել կամ ջնջել</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loading && <p className="text-sm text-muted-foreground">Բեռնվում է…</p>}
            {!loading && items.length === 0 && (
              <p className="text-sm text-muted-foreground">Դեռ հաշվիչներ չկան</p>
            )}
            {!loading && items.map((row, idx) => (
              <div key={row.id} className="flex items-center justify-between border rounded-lg p-3 bg-background/60">
                <div className="flex items-center gap-3">
                  <DynamicIcon name={row.icon_name as any} size={20} />
                  <div>
                    <div className="font-medium">{row.title} {row.visible ? '' : '(թաքնված)'}</div>
                    <div className="text-xs text-muted-foreground">/{row.slug} • կարգ {row.sort_order}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => move(row, -1)} disabled={idx === 0}>Վերև</Button>
                  <Button size="sm" variant="outline" onClick={() => move(row, 1)} disabled={idx === items.length - 1}>Ներքև</Button>
                  <Button size="sm" variant="outline" onClick={() => toggleVisible(row)}>{row.visible ? 'Թաքցնել' : 'Ցույց տալ'}</Button>
                  <Button size="sm" variant="outline" onClick={() => onEdit(row)}>Խմբագրել</Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(row)}>Ջնջել</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorsManagement;
