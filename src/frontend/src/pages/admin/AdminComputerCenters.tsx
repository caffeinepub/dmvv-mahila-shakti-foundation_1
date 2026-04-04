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
import { type ComputerCenter, useApp } from "@/context/AppContext";
import { ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const EMPTY: Omit<ComputerCenter, "id"> = {
  name: "",
  address: "",
  state: "",
  district: "",
  facilities: "",
  contactPhone: "",
  imageUrl: "",
  isActive: true,
};

export default function AdminComputerCenters() {
  const {
    computerCenters,
    addComputerCenter,
    updateComputerCenter,
    deleteComputerCenter,
  } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY });
  const [addImage, setAddImage] = useState<string | null>(null);
  const addFileRef = useRef<HTMLInputElement>(null);

  const [editItem, setEditItem] = useState<ComputerCenter | null>(null);
  const [editForm, setEditForm] = useState({ ...EMPTY });
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
    if (!addForm.name.trim()) {
      toast.error("Center name is required.");
      return;
    }
    addComputerCenter({
      id: `cc_${Date.now()}`,
      ...addForm,
      name: addForm.name.trim(),
      imageUrl: addImage || addForm.imageUrl || undefined,
    });
    toast.success("Computer center added successfully.");
    setAddOpen(false);
    setAddForm({ ...EMPTY });
    setAddImage(null);
  };

  const openEdit = (item: ComputerCenter) => {
    setEditItem(item);
    setEditForm({
      name: item.name,
      address: item.address,
      state: item.state,
      district: item.district,
      facilities: item.facilities,
      contactPhone: item.contactPhone,
      imageUrl: item.imageUrl || "",
      isActive: item.isActive,
    });
    setEditImage(item.imageUrl || null);
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    updateComputerCenter(editItem.id, {
      ...editForm,
      imageUrl: editImage || editForm.imageUrl || undefined,
    });
    toast.success("Computer center updated successfully.");
    setEditItem(null);
    setEditImage(null);
  };

  const FormFields = ({
    form,
    setForm,
  }: {
    form: typeof EMPTY;
    setForm: React.Dispatch<React.SetStateAction<typeof EMPTY>>;
  }) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Center Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1"
            placeholder="Center name"
          />
        </div>
        <div>
          <Label>Contact Phone</Label>
          <Input
            value={form.contactPhone}
            onChange={(e) =>
              setForm((f) => ({ ...f, contactPhone: e.target.value }))
            }
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label>Address</Label>
        <Input
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          className="mt-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>State</Label>
          <Input
            value={form.state}
            onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            className="mt-1"
          />
        </div>
        <div>
          <Label>District</Label>
          <Input
            value={form.district}
            onChange={(e) =>
              setForm((f) => ({ ...f, district: e.target.value }))
            }
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label>Facilities</Label>
        <Input
          value={form.facilities}
          onChange={(e) =>
            setForm((f) => ({ ...f, facilities: e.target.value }))
          }
          className="mt-1"
          placeholder="20 Computers, Wi-Fi, Printer"
        />
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={form.isActive}
          onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))}
        />
        <Label>Active</Label>
      </div>
    </>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Computer Centers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Computer center add, edit, photo upload, active/inactive control
          </p>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700 text-white"
          onClick={() => setAddOpen(true)}
        >
          <Plus size={16} className="mr-1" /> New Center
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {computerCenters.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-40 bg-gray-100 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={40} className="text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.district}, {item.state}
                    </p>
                    <p className="text-xs text-gray-400">{item.facilities}</p>
                    <Badge
                      className={`mt-2 text-xs ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={(v) =>
                        updateComputerCenter(item.id, { isActive: v })
                      }
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(item)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Center Delete Karen?
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
                              deleteComputerCenter(item.id);
                              toast.success("Center deleted successfully.");
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Computer Center</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-semibold">Photo Upload</Label>
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
                    <p className="text-sm">Select a photo</p>
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
                  Photo hatao
                </Button>
              )}
            </div>
            <FormFields form={addForm} setForm={setAddForm} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAdd}
            >
              Center Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Computer Center Edit Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-semibold">Photo</Label>
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
                    <p className="text-sm">Select a photo</p>
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
                  Photo hatao
                </Button>
              )}
            </div>
            <FormFields form={editForm} setForm={setEditForm} />
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
