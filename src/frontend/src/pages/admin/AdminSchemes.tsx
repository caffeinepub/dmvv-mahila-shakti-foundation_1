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
import { type SchemeItem, useApp } from "@/context/AppContext";
import { ImageIcon, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const EMPTY: Omit<SchemeItem, "id"> = {
  name: "",
  ministry: "",
  description: "",
  eligibility: [""],
  benefits: [""],
  howToApply: "",
  color: "border-green-400",
  featured: false,
  isActive: true,
  sortOrder: 1,
  imageUrl: "",
};

function ListEditor({
  values,
  onChange,
}: { values: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: editable list requires index
        <div key={i} className="flex gap-2">
          <Input
            value={v}
            onChange={(e) => {
              const n = [...values];
              n[i] = e.target.value;
              onChange(n);
            }}
            placeholder={`Item ${i + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={() => onChange(values.filter((_, j) => j !== i))}
          >
            ✕
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...values, ""])}
      >
        + Add
      </Button>
    </div>
  );
}

export default function AdminSchemes() {
  const { schemes, addScheme, updateScheme, deleteScheme } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    ...EMPTY,
    eligibility: [""],
    benefits: [""],
  });
  const [addImage, setAddImage] = useState<string | null>(null);
  const addFileRef = useRef<HTMLInputElement>(null);

  const [editItem, setEditItem] = useState<SchemeItem | null>(null);
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
      toast.error("Scheme ka naam zaroori hai.");
      return;
    }
    addScheme({
      id: `s_${Date.now()}`,
      ...addForm,
      name: addForm.name.trim(),
      eligibility: addForm.eligibility.filter(Boolean),
      benefits: addForm.benefits.filter(Boolean),
      imageUrl: addImage || addForm.imageUrl || undefined,
    });
    toast.success("Scheme add ho gayi.");
    setAddOpen(false);
    setAddForm({ ...EMPTY, eligibility: [""], benefits: [""] });
    setAddImage(null);
  };

  const openEdit = (item: SchemeItem) => {
    setEditItem(item);
    setEditForm({ ...item });
    setEditImage(item.imageUrl || null);
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    updateScheme(editItem.id, {
      ...editForm,
      eligibility: editForm.eligibility.filter(Boolean),
      benefits: editForm.benefits.filter(Boolean),
      imageUrl: editImage || editForm.imageUrl || undefined,
    });
    toast.success("Scheme update ho gayi.");
    setEditItem(null);
    setEditImage(null);
  };

  const CommonForm = ({
    form,
    setForm,
  }: {
    form: typeof EMPTY;
    setForm: React.Dispatch<React.SetStateAction<any>>;
  }) => (
    <>
      <div>
        <Label>Scheme Name *</Label>
        <Input
          value={form.name}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, name: e.target.value }))
          }
          className="mt-1"
        />
      </div>
      <div>
        <Label>Ministry / Authority</Label>
        <Input
          value={form.ministry}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, ministry: e.target.value }))
          }
          className="mt-1"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, description: e.target.value }))
          }
          rows={3}
          className="mt-1"
        />
      </div>
      <div>
        <Label>Eligibility (ek ek point alag)</Label>
        <ListEditor
          values={form.eligibility}
          onChange={(v) => setForm((f: any) => ({ ...f, eligibility: v }))}
        />
      </div>
      <div>
        <Label>Benefits (ek ek point alag)</Label>
        <ListEditor
          values={form.benefits}
          onChange={(v) => setForm((f: any) => ({ ...f, benefits: v }))}
        />
      </div>
      <div>
        <Label>How to Apply</Label>
        <Textarea
          value={form.howToApply}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, howToApply: e.target.value }))
          }
          rows={2}
          className="mt-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Sort Order</Label>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, sortOrder: Number(e.target.value) }))
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label>Border Color Class</Label>
          <Input
            value={form.color}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, color: e.target.value }))
            }
            className="mt-1"
            placeholder="border-green-400"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Switch
            checked={form.featured}
            onCheckedChange={(v) =>
              setForm((f: any) => ({ ...f, featured: v }))
            }
          />
          <Label>Featured (Flagship)</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={form.isActive}
            onCheckedChange={(v) =>
              setForm((f: any) => ({ ...f, isActive: v }))
            }
          />
          <Label>Active</Label>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Schemes Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Schemes page ke liye content manage karen — add, edit, photo,
            active/inactive
          </p>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700 text-white"
          onClick={() => setAddOpen(true)}
        >
          <Plus size={16} className="mr-1" /> Nayi Scheme
        </Button>
      </div>

      <div className="space-y-3">
        {schemes.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    {item.featured && (
                      <Badge className="bg-ngo-orange text-white text-xs">
                        <Star size={10} className="mr-1" />
                        Flagship
                      </Badge>
                    )}
                    <Badge
                      className={
                        item.isActive
                          ? "bg-green-100 text-green-700 text-xs"
                          : "bg-gray-100 text-gray-500 text-xs"
                      }
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.ministry}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="mt-2 h-16 w-24 object-cover rounded border"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={(v) =>
                      updateScheme(item.id, { isActive: v })
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
                          Scheme Delete Karen?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          "{item.name}" permanently delete ho jayegi.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            deleteScheme(item.id);
                            toast.success("Scheme delete ho gayi.");
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nayi Scheme Add Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-semibold">
                Photo Upload (optional)
              </Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-ngo-green"
                onClick={() => addFileRef.current?.click()}
              >
                {addImage ? (
                  <img
                    src={addImage}
                    alt="preview"
                    className="mx-auto max-h-32 object-contain rounded"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={28} className="mx-auto mb-1" />
                    <p className="text-sm">Photo select karein</p>
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
            <CommonForm form={addForm} setForm={setAddForm} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAdd}
            >
              Scheme Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Scheme Edit Karen</DialogTitle>
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
                    className="mx-auto max-h-32 object-contain rounded"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={28} className="mx-auto mb-1" />
                    <p className="text-sm">Photo select karein</p>
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
            <CommonForm form={editForm} setForm={setEditForm} />
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
