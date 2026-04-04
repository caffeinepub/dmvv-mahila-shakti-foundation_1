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
import { type NewsItem, useApp } from "@/context/AppContext";
import { ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "Achievement",
  "Center Opening",
  "Awards",
  "Financial Empowerment",
  "Training",
  "Partnership",
  "Events",
  "Others",
];

const EMPTY_FORM = {
  title: "",
  content: "",
  category: "Achievement",
  publishDate: new Date().toISOString().slice(0, 10),
  isPublished: true,
  imageUrl: "",
};

export default function AdminNews() {
  const { news, addNews, updateNews, deleteNews } = useApp();

  // Add dialog
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
  const [addImage, setAddImage] = useState<string | null>(null);
  const addFileRef = useRef<HTMLInputElement>(null);

  // Edit dialog
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });
  const [editImage, setEditImage] = useState<string | null>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  // Image picker helper
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

  // Add handlers
  const handleAdd = () => {
    if (!addForm.title.trim()) {
      toast.error("News title is required.");
      return;
    }
    if (!addForm.content.trim()) {
      toast.error("News content is required.");
      return;
    }
    const item: NewsItem = {
      id: `n_${Date.now()}`,
      title: addForm.title.trim(),
      content: addForm.content.trim(),
      category: addForm.category,
      publishDate: addForm.publishDate,
      isPublished: addForm.isPublished,
      imageUrl: addImage || addForm.imageUrl || undefined,
    };
    addNews(item);
    toast.success("News added.");
    setAddOpen(false);
    setAddForm({ ...EMPTY_FORM });
    setAddImage(null);
  };

  // Edit handlers
  const openEdit = (item: NewsItem) => {
    setEditItem(item);
    setEditForm({
      title: item.title,
      content: item.content,
      category: item.category,
      publishDate: item.publishDate,
      isPublished: item.isPublished,
      imageUrl: item.imageUrl || "",
    });
    setEditImage(item.imageUrl || null);
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    updateNews(editItem.id, {
      title: editForm.title.trim(),
      content: editForm.content.trim(),
      category: editForm.category,
      publishDate: editForm.publishDate,
      isPublished: editForm.isPublished,
      imageUrl: editImage || editForm.imageUrl || undefined,
    });
    toast.success("News updated.");
    setEditItem(null);
    setEditImage(null);
  };

  const handleTogglePublish = (item: NewsItem) => {
    updateNews(item.id, { isPublished: !item.isPublished });
    toast.success(item.isPublished ? "News unpublished." : "News published.");
  };

  const handleDelete = (id: string) => {
    deleteNews(id);
    toast.success("News deleted.");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Community Center News — photo upload, edit, publish/unpublish
            control
          </p>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700 text-white"
          onClick={() => setAddOpen(true)}
          data-ocid="admin_news.add_button"
        >
          <Plus size={16} className="mr-1" /> New News
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-ngo-green">
              {news.length}
            </div>
            <div className="text-xs text-gray-500">Total News</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {news.filter((n) => n.isPublished).length}
            </div>
            <div className="text-xs text-gray-500">Published</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {news.filter((n) => !n.isPublished).length}
            </div>
            <div className="text-xs text-gray-500">Drafts</div>
          </CardContent>
        </Card>
      </div>

      {/* News list */}
      <div className="space-y-4">
        {news.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No news items yet. Use the 'New News' button to add one.
          </div>
        ) : (
          news.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex gap-0">
                  {/* Thumbnail */}
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
                  {/* Details */}
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {item.publishDate}
                          </span>
                          <Badge
                            className={
                              item.isPublished
                                ? "bg-green-100 text-green-700 text-xs"
                                : "bg-orange-100 text-orange-700 text-xs"
                            }
                          >
                            {item.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.content}
                        </p>
                      </div>
                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Publish</span>
                          <Switch
                            checked={item.isPublished}
                            onCheckedChange={() => handleTogglePublish(item)}
                            data-ocid={`admin_news.toggle_publish.${item.id}`}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(item)}
                          data-ocid={`admin_news.edit_button.${item.id}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-500 hover:bg-red-50"
                              data-ocid={`admin_news.delete_button.${item.id}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                News Delete Karen?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                "{item.title}" will be permanently deleted. This
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => handleDelete(item.id)}
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
            <DialogTitle>Nayi News Add Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Image upload */}
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
                    <p className="text-sm">Select a photo (click)</p>
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
              <Label htmlFor="add-title">Title *</Label>
              <Input
                id="add-title"
                value={addForm.title}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="News ka title"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="add-content">Content *</Label>
              <Textarea
                id="add-content"
                value={addForm.content}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="News ka content"
                rows={5}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="add-date">Publish Date</Label>
                <Input
                  id="add-date"
                  type="date"
                  value={addForm.publishDate}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, publishDate: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={addForm.isPublished}
                onCheckedChange={(v) =>
                  setAddForm((f) => ({ ...f, isPublished: v }))
                }
              />
              <Label>Publish Now</Label>
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
              News Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>News Edit Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Image */}
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
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, title: e.target.value }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="edit-content">Content *</Label>
              <Textarea
                id="edit-content"
                value={editForm.content}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, content: e.target.value }))
                }
                rows={5}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="edit-date">Publish Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editForm.publishDate}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, publishDate: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={editForm.isPublished}
                onCheckedChange={(v) =>
                  setEditForm((f) => ({ ...f, isPublished: v }))
                }
              />
              <Label>Published Status</Label>
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
