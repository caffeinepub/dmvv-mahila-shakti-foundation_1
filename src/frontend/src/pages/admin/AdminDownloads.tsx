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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { type DownloadItem, useApp } from "@/context/AppContext";
import {
  Download,
  File,
  FileImage,
  FileText,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FILE_TYPES = ["PDF", "Word", "Excel", "Image", "Video", "Other"];
const CATEGORIES = [
  "Brochures",
  "Reports",
  "Forms",
  "Training",
  "Schemes",
  "Certificates",
  "Others",
];

const typeIcon = (type: string) => {
  if (type === "PDF") return FileText;
  if (type === "Image") return FileImage;
  return File;
};

const EMPTY_FORM = {
  name: "",
  type: "PDF",
  size: "",
  category: "Forms",
  desc: "",
  fileUrl: "",
  isActive: true,
  sortOrder: 1,
};

export default function AdminDownloads() {
  const {
    downloadItems,
    addDownloadItem,
    updateDownloadItem,
    deleteDownloadItem,
  } = useApp();

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });

  const [editItem, setEditItem] = useState<DownloadItem | null>(null);
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });

  const handleAdd = () => {
    if (!addForm.name.trim()) {
      toast.error("Document name is required.");
      return;
    }
    addDownloadItem({
      id: `dl_${Date.now()}`,
      ...addForm,
      name: addForm.name.trim(),
      sortOrder: downloadItems.length + 1,
    });
    toast.success("Download item added!");
    setAddOpen(false);
    setAddForm({ ...EMPTY_FORM });
  };

  const openEdit = (item: DownloadItem) => {
    setEditItem(item);
    setEditForm({
      name: item.name || "",
      type: item.type || "",
      size: item.size || "",
      category: item.category,
      desc: item.desc || "",
      fileUrl: item.fileUrl,
      isActive: item.isActive,
      sortOrder: item.sortOrder,
    });
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    if (!editForm.name.trim()) {
      toast.error("Document name is required.");
      return;
    }
    updateDownloadItem(editItem.id, {
      ...editForm,
      name: editForm.name.trim(),
    });
    toast.success("Download item updated!");
    setEditItem(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Downloads Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage forms, brochures, reports and resources
          </p>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700 text-white"
          onClick={() => setAddOpen(true)}
          data-ocid="admin_downloads.add_button"
        >
          <Plus size={16} className="mr-1" /> Add Document
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-ngo-green">
              {downloadItems.length}
            </div>
            <div className="text-xs text-gray-500">Total Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {downloadItems.filter((d) => d.isActive).length}
            </div>
            <div className="text-xs text-gray-500">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {downloadItems.filter((d) => !d.isActive).length}
            </div>
            <div className="text-xs text-gray-500">Hidden</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {downloadItems.length === 0 ? (
          <div
            className="text-center py-16 text-gray-400"
            data-ocid="admin_downloads.empty_state"
          >
            No downloads. Click "Add Document" to create one.
          </div>
        ) : (
          downloadItems.map((item, idx) => {
            const Icon = typeIcon(item.type || "");
            return (
              <Card key={item.id} data-ocid={`admin_downloads.item.${idx + 1}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {item.type}
                        </span>
                        {item.size && (
                          <span className="text-xs text-gray-400">
                            {item.size}
                          </span>
                        )}
                        <Badge
                          className={
                            item.isActive
                              ? "bg-green-100 text-green-700 text-xs"
                              : "bg-gray-100 text-gray-500 text-xs"
                          }
                        >
                          {item.isActive ? "Active" : "Hidden"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Switch
                        checked={item.isActive}
                        onCheckedChange={(v) => {
                          updateDownloadItem(item.id, { isActive: v });
                          toast.success(v ? "Visible!" : "Hidden!");
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(item)}
                        data-ocid="admin_downloads.edit_button"
                      >
                        <Pencil size={14} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-500 hover:bg-red-50"
                            data-ocid="admin_downloads.delete_button"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Download?
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
                                deleteDownloadItem(item.id);
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
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Download Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Document Name *</Label>
              <Input
                value={addForm.name}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Annual Report 2025"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={addForm.desc}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, desc: e.target.value }))
                }
                rows={2}
                placeholder="Short description"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>File Type</Label>
                <Select
                  value={addForm.type}
                  onValueChange={(v) => setAddForm((f) => ({ ...f, type: v }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FILE_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={addForm.category}
                  onValueChange={(v) =>
                    setAddForm((f) => ({ ...f, category: v }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>File Size</Label>
                <Input
                  value={addForm.size}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, size: e.target.value }))
                  }
                  placeholder="e.g. 2.4 MB"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>File URL (optional)</Label>
                <Input
                  value={addForm.fileUrl}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, fileUrl: e.target.value }))
                  }
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={addForm.isActive}
                onCheckedChange={(v) =>
                  setAddForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active (visible on site)</Label>
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
              <Download size={14} className="mr-1" /> Add Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Download Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Document Name *</Label>
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editForm.desc}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, desc: e.target.value }))
                }
                rows={2}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>File Type</Label>
                <Select
                  value={editForm.type}
                  onValueChange={(v) => setEditForm((f) => ({ ...f, type: v }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FILE_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={editForm.category}
                  onValueChange={(v) =>
                    setEditForm((f) => ({ ...f, category: v }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>File Size</Label>
                <Input
                  value={editForm.size}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, size: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>File URL</Label>
                <Input
                  value={editForm.fileUrl}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, fileUrl: e.target.value }))
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
