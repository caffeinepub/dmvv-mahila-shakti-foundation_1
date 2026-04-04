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
import { Card, CardContent } from "@/components/ui/card";
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
import { type CommunityCenter, useApp } from "@/context/AppContext";
import { Building, ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const EMPTY_FORM = {
  name: "",
  address: "",
  state: "",
  district: "",
  services: "",
  imageUrl: "",
  isActive: true,
  sortOrder: 1,
};

export default function AdminCommunityCenter() {
  const {
    communityCenters,
    addCommunityCenter,
    updateCommunityCenter,
    deleteCommunityCenter,
  } = useApp();

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
  const [addImage, setAddImage] = useState<string | null>(null);
  const addFileRef = useRef<HTMLInputElement>(null);

  const [editItem, setEditItem] = useState<CommunityCenter | null>(null);
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });
  const [editImage, setEditImage] = useState<string | null>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  const readFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAdd = () => {
    if (!addForm.name.trim() || !addForm.address.trim()) {
      toast.error("Name and address are required.");
      return;
    }
    addCommunityCenter({
      id: `cm_${Date.now()}`,
      ...addForm,
      name: addForm.name.trim(),
      imageUrl: addImage || addForm.imageUrl || undefined,
      sortOrder: communityCenters.length + 1,
    });
    toast.success("Community center added!");
    setAddOpen(false);
    setAddForm({ ...EMPTY_FORM });
    setAddImage(null);
  };

  const openEdit = (item: CommunityCenter) => {
    setEditItem(item);
    setEditForm({
      name: item.name,
      address: item.address,
      state: item.state,
      district: item.district,
      services: item.services,
      imageUrl: item.imageUrl || "",
      isActive: item.isActive,
      sortOrder: item.sortOrder,
    });
    setEditImage(item.imageUrl || null);
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    if (!editForm.name.trim() || !editForm.address.trim()) {
      toast.error("Name and address are required.");
      return;
    }
    updateCommunityCenter(editItem.id, {
      ...editForm,
      name: editForm.name.trim(),
      imageUrl: editImage || editForm.imageUrl || undefined,
    });
    toast.success("Community center updated!");
    setEditItem(null);
    setEditImage(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Community Centers
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, and manage community centers shown on the public site
          </p>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700 text-white"
          onClick={() => setAddOpen(true)}
          data-ocid="admin_community.add_button"
        >
          <Plus size={16} className="mr-1" /> Add Center
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-ngo-green">
              {communityCenters.length}
            </div>
            <div className="text-xs text-gray-500">Total Centers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {communityCenters.filter((c) => c.isActive).length}
            </div>
            <div className="text-xs text-gray-500">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {communityCenters.filter((c) => !c.isActive).length}
            </div>
            <div className="text-xs text-gray-500">Inactive</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {communityCenters.length === 0 ? (
          <div
            className="text-center py-16 text-gray-400"
            data-ocid="admin_community.empty_state"
          >
            No community centers. Click "Add Center" to create one.
          </div>
        ) : (
          communityCenters.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex gap-0">
                  <div className="w-32 h-28 flex-shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building size={32} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {item.name}
                        </h3>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.address}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.state} — {item.district}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 line-clamp-1">
                          {item.services}
                        </div>
                        <Badge
                          className={
                            item.isActive
                              ? "mt-1 bg-green-100 text-green-700 text-xs"
                              : "mt-1 bg-gray-100 text-gray-600 text-xs"
                          }
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Switch
                          checked={item.isActive}
                          onCheckedChange={(v) => {
                            updateCommunityCenter(item.id, { isActive: v });
                            toast.success(v ? "Activated!" : "Deactivated!");
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(item)}
                          data-ocid="admin_community.edit_button"
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-500 hover:bg-red-50"
                              data-ocid="admin_community.delete_button"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Community Center?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                "{item.name}" will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                  deleteCommunityCenter(item.id);
                                  toast.success("Deleted!");
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Community Center</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Photo Upload</Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-ngo-green"
                onClick={() => addFileRef.current?.click()}
              >
                {addImage ? (
                  <img
                    src={addImage}
                    alt="preview"
                    className="mx-auto max-h-40 object-contain rounded"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={32} className="mx-auto mb-1" />
                    <p className="text-sm">Click to upload</p>
                  </div>
                )}
              </button>
              <input
                ref={addFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => readFile(e, setAddImage)}
              />
              {addImage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-red-500"
                  onClick={() => setAddImage(null)}
                >
                  Remove
                </Button>
              )}
            </div>
            <div>
              <Label>Center Name *</Label>
              <Input
                value={addForm.name}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="DMVV Community Center - City"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Address *</Label>
              <Textarea
                value={addForm.address}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, address: e.target.value }))
                }
                rows={2}
                className="mt-1"
                placeholder="Full address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>State</Label>
                <Input
                  value={addForm.state}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, state: e.target.value }))
                  }
                  placeholder="e.g. Uttar Pradesh"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>District</Label>
                <Input
                  value={addForm.district}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, district: e.target.value }))
                  }
                  placeholder="e.g. Lucknow"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Services Offered</Label>
              <Input
                value={addForm.services}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, services: e.target.value }))
                }
                placeholder="e.g. Training, Health Camps, Legal Aid"
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={addForm.isActive}
                onCheckedChange={(v) =>
                  setAddForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAdd}
            >
              Add Center
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Community Center</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Photo Upload</Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-ngo-green"
                onClick={() => editFileRef.current?.click()}
              >
                {editImage ? (
                  <img
                    src={editImage}
                    alt="preview"
                    className="mx-auto max-h-40 object-contain rounded"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={32} className="mx-auto mb-1" />
                    <p className="text-sm">Click to upload</p>
                  </div>
                )}
              </button>
              <input
                ref={editFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => readFile(e, setEditImage)}
              />
              {editImage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-red-500"
                  onClick={() => setEditImage(null)}
                >
                  Remove
                </Button>
              )}
            </div>
            <div>
              <Label>Center Name *</Label>
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Address *</Label>
              <Textarea
                value={editForm.address}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, address: e.target.value }))
                }
                rows={2}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>State</Label>
                <Input
                  value={editForm.state}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, state: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>District</Label>
                <Input
                  value={editForm.district}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, district: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Services Offered</Label>
              <Input
                value={editForm.services}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, services: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={editForm.sortOrder}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch
                  checked={editForm.isActive}
                  onCheckedChange={(v) =>
                    setEditForm((f) => ({ ...f, isActive: v }))
                  }
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
