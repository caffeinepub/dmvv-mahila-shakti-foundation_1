import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { type InsuranceScheme, useApp } from "@/context/AppContext";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const emptyScheme = (): Omit<InsuranceScheme, "id"> => ({
  name: "",
  type: "life",
  description: "",
  premium: "",
  coverage: "",
  tenure: "",
  eligibility: [],
  isActive: true,
});

export default function AdminInsurance() {
  const {
    insuranceSchemes,
    addInsuranceScheme,
    updateInsuranceScheme,
    deleteInsuranceScheme,
    insuranceApplications,
  } = useApp();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<InsuranceScheme, "id">>(emptyScheme());
  const [eligStr, setEligStr] = useState("");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (!form.name || !form.premium) {
      toast.error("Name and premium are required.");
      return;
    }
    const data = { ...form, eligibility: eligStr.split("\n").filter(Boolean) };
    if (editId) {
      updateInsuranceScheme(editId, data);
      toast.success("Scheme updated!");
    } else {
      addInsuranceScheme({ ...data, id: `ins_${Date.now()}` });
      toast.success("Scheme added!");
    }
    setOpen(false);
    setForm(emptyScheme());
    setEligStr("");
    setEditId(null);
  };

  const startEdit = (s: InsuranceScheme) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      type: s.type,
      description: s.description,
      premium: s.premium,
      coverage: s.coverage,
      tenure: s.tenure,
      eligibility: s.eligibility,
      isActive: s.isActive,
    });
    setEligStr(s.eligibility.join("\n"));
    setOpen(true);
  };

  const typeColor: Record<string, string> = {
    life: "bg-green-100 text-green-700",
    health: "bg-blue-100 text-blue-700",
    crop: "bg-yellow-100 text-yellow-700",
    accident: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Insurance Management
      </h1>
      <Tabs defaultValue="schemes">
        <TabsList className="mb-4">
          <TabsTrigger value="schemes" data-ocid="admin_insurance.tab">
            Schemes
          </TabsTrigger>
          <TabsTrigger value="applications" data-ocid="admin_insurance.tab">
            Applications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schemes">
          <div className="flex justify-end mb-4">
            <Dialog
              open={open}
              onOpenChange={(v) => {
                setOpen(v);
                if (!v) {
                  setForm(emptyScheme());
                  setEligStr("");
                  setEditId(null);
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  className="bg-ngo-green text-white"
                  data-ocid="admin_insurance.open_modal_button"
                >
                  + Add Scheme
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="admin_insurance.dialog">
                <DialogHeader>
                  <DialogTitle>
                    {editId ? "Edit" : "Add"} Insurance Scheme
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Scheme Name *</Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="admin_insurance.input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Type</Label>
                    <Select
                      value={form.type}
                      onValueChange={(v) =>
                        setForm((p) => ({
                          ...p,
                          type: v as InsuranceScheme["type"],
                        }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="admin_insurance.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["life", "health", "crop", "accident"].map((t) => (
                          <SelectItem key={t} value={t} className="capitalize">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {(
                    [
                      ["Premium *", "premium"],
                      ["Coverage", "coverage"],
                      ["Tenure", "tenure"],
                    ] as [string, string][]
                  ).map(([l, k]) => (
                    <div key={k}>
                      <Label className="text-xs">{l}</Label>
                      <Input
                        value={
                          (form as unknown as Record<string, string>)[k] || ""
                        }
                        onChange={(e) =>
                          setForm((p) => ({ ...p, [k]: e.target.value }))
                        }
                        className="mt-1"
                        data-ocid="admin_insurance.input"
                      />
                    </div>
                  ))}
                  <div>
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, description: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="admin_insurance.textarea"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">
                      Eligibility (one per line)
                    </Label>
                    <Textarea
                      value={eligStr}
                      onChange={(e) => setEligStr(e.target.value)}
                      className="mt-1 h-20"
                      placeholder="Age 18-50\nBank account holder"
                      data-ocid="admin_insurance.textarea"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={form.isActive}
                      onCheckedChange={(v) =>
                        setForm((p) => ({ ...p, isActive: v }))
                      }
                      data-ocid="admin_insurance.switch"
                    />
                    <Label className="text-sm">Active</Label>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={handleSave}
                    className="bg-ngo-green text-white"
                    data-ocid="admin_insurance.save_button"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    data-ocid="admin_insurance.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insuranceSchemes.map((s, i) => (
              <Card key={s.id} data-ocid={`admin_insurance.item.${i + 1}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-gray-800 flex-1 pr-2">
                      {s.name}
                    </h3>
                    <Badge className={`capitalize ${typeColor[s.type]}`}>
                      {s.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {s.premium} | {s.coverage} | {s.tenure}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(s)}
                      data-ocid={`admin_insurance.edit_button.${i + 1}`}
                    >
                      <Pencil size={12} className="mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        deleteInsuranceScheme(s.id);
                        toast.success("Deleted!");
                      }}
                      data-ocid={`admin_insurance.delete_button.${i + 1}`}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications">
          {insuranceApplications.length === 0 ? (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="admin_insurance.empty_state"
            >
              No applications found.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {["Applicant", "Scheme", "Status", "Date"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-semibold text-gray-700"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {insuranceApplications.map((a, i) => (
                    <tr
                      key={a.id}
                      className="border-t"
                      data-ocid={`admin_insurance.row.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-medium">{a.userName}</td>
                      <td className="px-4 py-3">{a.schemeName}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={`capitalize ${
                            a.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : a.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {a.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs">{a.appliedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
