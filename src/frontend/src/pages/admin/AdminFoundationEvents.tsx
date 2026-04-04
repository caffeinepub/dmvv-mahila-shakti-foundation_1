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
import { type FoundationEvent, useApp } from "@/context/AppContext";
import { CalendarDays, ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const EMPTY: Omit<FoundationEvent, "id"> = {
  title: "",
  description: "",
  eventDate: new Date().toISOString().slice(0, 10),
  location: "",
  imageUrl: "",
  isActive: true,
  sortOrder: 1,
};

export default function AdminFoundationEvents() {
  const {
    foundationEvents,
    addFoundationEvent,
    updateFoundationEvent,
    deleteFoundationEvent,
  } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY });
  const [addImage, setAddImage] = useState<string | null>(null);
  const addFileRef = useRef<HTMLInputElement>(null);

  const [editItem, setEditItem] = useState<FoundationEvent | null>(null);
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
    if (!addForm.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    addFoundationEvent({
      id: `fe_${Date.now()}`,
      ...addForm,
      title: addForm.title.trim(),
      imageUrl: addImage || addForm.imageUrl || undefined,
    });
    toast.success("Event added successfully.");
    setAddOpen(false);
    setAddForm({ ...EMPTY });
    setAddImage(null);
  };

  const openEdit = (item: FoundationEvent) => {
    setEditItem(item);
    setEditForm({
      title: item.title,
      description: item.description,
      eventDate: item.eventDate,
      location: item.location,
      imageUrl: item.imageUrl || "",
      isActive: item.isActive,
      sortOrder: item.sortOrder,
    });
    setEditImage(item.imageUrl || null);
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    updateFoundationEvent(editItem.id, {
      ...editForm,
      imageUrl: editImage || editForm.imageUrl || undefined,
    });
    toast.success("Event updated successfully.");
    setEditItem(null);
    setEditImage(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Foundation Events
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Events add, edit, photo upload, active/inactive control
          </p>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700 text-white"
          onClick={() => setAddOpen(true)}
        >
          <Plus size={16} className="mr-1" /> New Event
        </Button>
      </div>

      <div className="space-y-4">
        {foundationEvents.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No events yet.</div>
        ) : (
          foundationEvents.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex gap-0">
                  <div className="w-32 h-28 flex-shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={32} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <CalendarDays size={10} className="mr-1" />
                            {item.eventDate}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {item.location}
                          </span>
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
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Switch
                          checked={item.isActive}
                          onCheckedChange={(v) =>
                            updateFoundationEvent(item.id, { isActive: v })
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
                                Event Delete Karen?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                "{item.title}" will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                  deleteFoundationEvent(item.id);
                                  toast.success("Event deleted successfully.");
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
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-semibold">Photo Upload</Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-ngo-green transition-colors"
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
            <div>
              <Label>Title *</Label>
              <Input
                value={addForm.title}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, title: e.target.value }))
                }
                className="mt-1"
                placeholder="Event name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={addForm.description}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Event Date</Label>
                <Input
                  type="date"
                  value={addForm.eventDate}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, eventDate: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={addForm.location}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, location: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="Shehar, State"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={addForm.sortOrder}
                  onChange={(e) =>
                    setAddForm((f) => ({
                      ...f,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-3 mt-6">
                <Switch
                  checked={addForm.isActive}
                  onCheckedChange={(v) =>
                    setAddForm((f) => ({ ...f, isActive: v }))
                  }
                />
                <Label>Active</Label>
              </div>
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
              Event Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Edit Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-semibold">Photo</Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-ngo-green transition-colors"
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
            <div>
              <Label>Title *</Label>
              <Input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, title: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Event Date</Label>
                <Input
                  type="date"
                  value={editForm.eventDate}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, eventDate: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, location: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
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
              <div className="flex items-center gap-3 mt-6">
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
