import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from "@/components/ui/textarea";
import { type Partner, useApp } from "@/context/AppContext";
import { Building2, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const PARTNER_TYPES = ["Government", "NGO", "Corporate", "International"];
const EMPTY: Omit<Partner, "id"> = {
  name: "",
  description: "",
  logoUrl: "",
  website: "",
  partnerType: "Government",
  isActive: true,
  sortOrder: 1,
};

export default function AdminOurPartners() {
  const { partners, addPartner, updatePartner, deletePartner } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState<Omit<Partner, "id">>(EMPTY);
  const logoRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (p: Partner) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      logoUrl: p.logoUrl || "",
      website: p.website || "",
      partnerType: p.partnerType,
      isActive: p.isActive,
      sortOrder: p.sortOrder,
    });
    setOpen(true);
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((prev) => ({ ...prev, logoUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (editing) {
      updatePartner(editing.id, form);
      toast.success("Partner updated.");
    } else {
      addPartner({ id: `p_${Date.now()}`, ...form });
      toast.success("Partner added.");
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Our Partners</h1>
        <Button
          className="bg-ngo-green text-white"
          onClick={openAdd}
          data-ocid="admin_partners.open_modal_button"
        >
          <Plus size={16} className="mr-2" /> Add Partner
        </Button>
      </div>

      {partners.length === 0 ? (
        <div
          className="text-center py-20 text-gray-400"
          data-ocid="admin_partners.empty_state"
        >
          <Building2 size={52} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No partners yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((p, idx) => (
            <div
              key={p.id}
              className="border border-gray-200 rounded-xl p-4"
              data-ocid={`admin_partners.item.${idx + 1}`}
            >
              <div className="flex items-start gap-3 mb-3">
                {p.logoUrl ? (
                  <img
                    src={p.logoUrl}
                    alt={p.name}
                    className="w-12 h-12 object-contain rounded-lg border"
                  />
                ) : (
                  <div className="w-12 h-12 bg-ngo-green/10 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-ngo-green">
                      {p.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                  <Badge className="bg-blue-100 text-blue-700 text-xs mt-1">
                    {p.partnerType}
                  </Badge>
                </div>
                <Badge
                  className={
                    p.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }
                >
                  {p.isActive ? "Active" : "Off"}
                </Badge>
              </div>
              <p className="text-gray-500 text-xs line-clamp-2 mb-3">
                {p.description}
              </p>
              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ngo-green text-xs flex items-center gap-1 mb-3 hover:underline"
                >
                  <ExternalLink size={11} />
                  {p.website}
                </a>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-7 text-xs"
                  onClick={() => openEdit(p)}
                  data-ocid="admin_partners.edit_button"
                >
                  <Pencil size={11} className="mr-1" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-7 text-xs"
                      data-ocid="admin_partners.open_modal_button"
                    >
                      <Trash2 size={11} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="admin_partners.dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Remove partner <strong>{p.name}</strong>?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-ocid="admin_partners.cancel_button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 text-white"
                        onClick={() => {
                          deletePartner(p.id);
                          toast.success("Deleted.");
                        }}
                        data-ocid="admin_partners.confirm_button"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_partners.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} Partner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[65vh] overflow-y-auto">
            <div className="flex items-center gap-4">
              {form.logoUrl ? (
                <img
                  src={form.logoUrl}
                  alt="Logo"
                  className="w-14 h-14 rounded-lg object-contain border"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-100 rounded-lg border-dashed border-2 border-gray-300 flex items-center justify-center">
                  <Building2 size={20} className="text-gray-400" />
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => logoRef.current?.click()}
                data-ocid="admin_partners.upload_button"
              >
                Upload Logo
              </Button>
              <input
                ref={logoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoSelect}
              />
            </div>
            <div>
              <Label>Organization Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1"
                data-ocid="admin_partners.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-1"
                data-ocid="admin_partners.textarea"
              />
            </div>
            <div>
              <Label>Website URL</Label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin_partners.input"
              />
            </div>
            <div>
              <Label>Partner Type</Label>
              <Select
                value={form.partnerType}
                onValueChange={(v) => setForm({ ...form, partnerType: v })}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin_partners.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PARTNER_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: Number(e.target.value) })
                }
                className="mt-1 w-24"
                data-ocid="admin_partners.input"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                data-ocid="admin_partners.switch"
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin_partners.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-ngo-green text-white"
              onClick={handleSave}
              data-ocid="admin_partners.save_button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
