import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { type LeadershipMember, useApp } from "@/context/AppContext";
import { Edit2, PlusCircle, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const emptyForm: Omit<LeadershipMember, "id"> = {
  name: "",
  designation: "",
  qualification: "",
  message: "",
  photoUrl: "",
  sortOrder: 1,
  isActive: true,
};

export default function AdminLeadership() {
  const {
    leadership,
    addLeadershipMember,
    updateLeadershipMember,
    deleteLeadershipMember,
  } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<LeadershipMember, "id">>(emptyForm);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: leadership.length + 1 });
    setPhotoPreview("");
    setDialogOpen(true);
  };

  const openEdit = (member: LeadershipMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      designation: member.designation,
      qualification: member.qualification,
      message: member.message,
      photoUrl: member.photoUrl,
      sortOrder: member.sortOrder,
      isActive: member.isActive,
    });
    setPhotoPreview(member.photoUrl);
    setDialogOpen(true);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setPhotoPreview(url);
      setForm((prev) => ({ ...prev, photoUrl: url }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.designation.trim()) {
      toast.error("Designation is required");
      return;
    }
    if (editingId) {
      updateLeadershipMember(editingId, form);
      toast.success("Leadership member updated!");
    } else {
      addLeadershipMember({ id: `l${Date.now()}`, ...form });
      toast.success("New leadership member added!");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteLeadershipMember(id);
      toast.success("Deleted successfully!");
    }
  };

  const sorted = [...leadership].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Leadership Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage the leadership team displayed on the About Us page
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-ngo-green text-white hover:bg-ngo-green-dark"
        >
          <PlusCircle size={16} className="mr-2" /> Add New Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sorted.map((member) => (
          <Card
            key={member.id}
            className={`border-2 ${member.isActive ? "border-green-200" : "border-gray-200 opacity-60"}`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                {/* Photo */}
                <div className="shrink-0">
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-ngo-orange"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-ngo-orange flex items-center justify-center text-white text-2xl font-bold border-2 border-ngo-orange">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {member.name}
                    </h3>
                    <Badge
                      className={
                        member.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    >
                      {member.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-ngo-orange text-xs font-semibold mt-0.5">
                    {member.designation}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {member.qualification}
                  </p>
                  {member.message && (
                    <p className="text-gray-600 text-xs mt-2 line-clamp-2 italic">
                      "{member.message}"
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-ngo-green text-ngo-green hover:bg-green-50"
                  onClick={() => openEdit(member)}
                >
                  <Edit2 size={13} className="mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(member.id, member.name)}
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {leadership.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-10 text-center text-gray-400">
              <User size={40} className="mx-auto mb-3 opacity-30" />
              <p>No members found. Click 'Add New Member' to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Leadership Member Edit Karein" : "Add New Member"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Photo Upload */}
            <div className="flex flex-col items-center gap-3">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-ngo-orange"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <User size={28} className="text-gray-400" />
                </div>
              )}
              <Label
                htmlFor="photo-upload"
                className="cursor-pointer text-sm font-medium px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
              >
                Photo Upload Karein
              </Label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>

            <div>
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Jaise: Dr. Anjali Srivastava"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Designation *</Label>
              <Input
                value={form.designation}
                onChange={(e) =>
                  setForm((p) => ({ ...p, designation: e.target.value }))
                }
                placeholder="Jaise: Founder & President"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Qualification</Label>
              <Input
                value={form.qualification}
                onChange={(e) =>
                  setForm((p) => ({ ...p, qualification: e.target.value }))
                }
                placeholder="Jaise: Ph.D. Social Work, BHU"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Message / Quote</Label>
              <Textarea
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="A message or quote from this person..."
                className="mt-1 resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sort Order (kram)</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-1">
                  <Switch
                    checked={form.isActive}
                    onCheckedChange={(v) =>
                      setForm((p) => ({ ...p, isActive: v }))
                    }
                  />
                  <Label>{form.isActive ? "Active" : "Inactive"}</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-ngo-green text-white hover:bg-ngo-green-dark"
                onClick={handleSave}
              >
                {editingId ? "Update Karein" : "Add Karein"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="flex-1"
              >
                Raddh Karein
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
