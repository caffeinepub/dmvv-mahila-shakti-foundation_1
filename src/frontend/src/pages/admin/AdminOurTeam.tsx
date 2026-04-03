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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { type TeamMember, useApp } from "@/context/AppContext";
import { Pencil, Plus, Trash2, Users } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const EMPTY: Omit<TeamMember, "id"> = {
  name: "",
  designation: "",
  department: "",
  photoUrl: "",
  email: "",
  phone: "",
  bio: "",
  isActive: true,
  sortOrder: 1,
};

export default function AdminOurTeam() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } =
    useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<Omit<TeamMember, "id">>(EMPTY);
  const photoRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name,
      designation: m.designation,
      department: m.department,
      photoUrl: m.photoUrl || "",
      email: m.email || "",
      phone: m.phone || "",
      bio: m.bio,
      isActive: m.isActive,
      sortOrder: m.sortOrder,
    });
    setOpen(true);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((prev) => ({ ...prev, photoUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (editing) {
      updateTeamMember(editing.id, form);
      toast.success("Member updated.");
    } else {
      addTeamMember({ id: `tm_${Date.now()}`, ...form });
      toast.success("Member added.");
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Our Team</h1>
        <Button
          className="bg-ngo-green text-white"
          onClick={openAdd}
          data-ocid="admin_team.open_modal_button"
        >
          <Plus size={16} className="mr-2" /> Add Member
        </Button>
      </div>

      {teamMembers.length === 0 ? (
        <div
          className="text-center py-20 text-gray-400"
          data-ocid="admin_team.empty_state"
        >
          <Users size={52} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No team members yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((m, idx) => (
            <div
              key={m.id}
              className="border border-gray-200 rounded-xl p-4 flex gap-3 items-start"
              data-ocid={`admin_team.item.${idx + 1}`}
            >
              {m.photoUrl ? (
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-ngo-green flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-ngo-green/10 border-2 border-ngo-green flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-ngo-green text-lg">
                    {m.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{m.name}</p>
                    <p className="text-ngo-green text-xs">{m.designation}</p>
                    <Badge className="bg-gray-100 text-gray-600 text-xs mt-1">
                      {m.department}
                    </Badge>
                  </div>
                  <Badge
                    className={
                      m.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }
                  >
                    {m.isActive ? "Active" : "Off"}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => openEdit(m)}
                    data-ocid="admin_team.edit_button"
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
                        data-ocid="admin_team.open_modal_button"
                      >
                        <Trash2 size={11} className="mr-1" />
                        Del
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent data-ocid="admin_team.dialog">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {m.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-ocid="admin_team.cancel_button">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 text-white"
                          onClick={() => {
                            deleteTeamMember(m.id);
                            toast.success("Deleted.");
                          }}
                          data-ocid="admin_team.confirm_button"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_team.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[65vh] overflow-y-auto">
            <div className="flex items-center gap-4">
              {form.photoUrl ? (
                <img
                  src={form.photoUrl}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-ngo-green"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Users size={20} className="text-gray-400" />
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => photoRef.current?.click()}
                data-ocid="admin_team.upload_button"
              >
                Upload Photo
              </Button>
              <input
                ref={photoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoSelect}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1"
                  data-ocid="admin_team.input"
                />
              </div>
              <div>
                <Label>Designation *</Label>
                <Input
                  value={form.designation}
                  onChange={(e) =>
                    setForm({ ...form, designation: e.target.value })
                  }
                  className="mt-1"
                  data-ocid="admin_team.input"
                />
              </div>
            </div>
            <div>
              <Label>Department</Label>
              <Input
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                placeholder="e.g. Leadership, Finance, Operations"
                className="mt-1"
                data-ocid="admin_team.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1"
                  data-ocid="admin_team.input"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1"
                  data-ocid="admin_team.input"
                />
              </div>
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="mt-1"
                data-ocid="admin_team.textarea"
              />
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
                data-ocid="admin_team.input"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                data-ocid="admin_team.switch"
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin_team.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-ngo-green text-white"
              onClick={handleSave}
              data-ocid="admin_team.save_button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
