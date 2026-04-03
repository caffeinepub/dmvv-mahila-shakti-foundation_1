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
import { type GalleryItem, useApp } from "@/context/AppContext";
import { ImageIcon, Pencil, Plus, Trash2, Video } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = ["Training", "Centers", "Events", "Awards", "Others"];

export default function AdminGallery() {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } =
    useApp();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<string | null>(null);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Training");
  const [uploadMediaType, setUploadMediaType] = useState<"photo" | "video">(
    "photo",
  );
  const uploadFileRef = useRef<HTMLInputElement>(null);

  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    setUploadMediaType(isVideo ? "video" : "photo");
    const reader = new FileReader();
    reader.onload = () => setUploadFile(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleUpload = () => {
    if (!uploadFile) {
      toast.error("Please select a file.");
      return;
    }
    if (!uploadCaption.trim()) {
      toast.error("Please enter a caption.");
      return;
    }
    const item: GalleryItem = {
      id: `g_${Date.now()}`,
      src: uploadFile,
      category: uploadCategory,
      caption: uploadCaption.trim(),
      uploadedAt: new Date().toISOString().slice(0, 10),
      mediaType: uploadMediaType,
    };
    addGalleryItem(item);
    toast.success(
      `${uploadMediaType === "video" ? "Video" : "Photo"} added to gallery.`,
    );
    setUploadOpen(false);
    setUploadFile(null);
    setUploadCaption("");
    setUploadCategory("Training");
    setUploadMediaType("photo");
  };

  const openEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setEditCaption(item.caption);
    setEditCategory(item.category);
  };
  const handleSaveEdit = () => {
    if (!editingItem) return;
    updateGalleryItem(editingItem.id, {
      caption: editCaption.trim(),
      category: editCategory,
    });
    toast.success("Updated.");
    setEditingItem(null);
  };
  const handleDelete = (id: string) => {
    deleteGalleryItem(id);
    toast.success("Deleted from gallery.");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Gallery Management
        </h1>
        <Button
          className="bg-ngo-green text-white hover:bg-ngo-green-dark"
          onClick={() => setUploadOpen(true)}
          data-ocid="admin_gallery.open_modal_button"
        >
          <Plus size={16} className="mr-2" /> Upload Photo / Video
        </Button>
      </div>

      {galleryItems.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 text-gray-400"
          data-ocid="admin_gallery.empty_state"
        >
          <ImageIcon size={52} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">No items yet</p>
          <p className="text-sm mt-1">
            Upload your first photo or video to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              data-ocid={`admin_gallery.item.${idx + 1}`}
            >
              {item.mediaType === "video" ? (
                // biome-ignore lint/a11y/useMediaCaption: admin upload preview
                <video
                  src={item.src}
                  className="w-full h-44 object-cover"
                  preload="metadata"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-44 object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end gap-1.5 p-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/90 text-gray-800 hover:bg-white"
                  onClick={() => openEdit(item)}
                  title="Edit"
                  data-ocid="admin_gallery.edit_button"
                >
                  <Pencil size={13} />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0"
                      title="Delete"
                      data-ocid="admin_gallery.open_modal_button"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="admin_gallery.dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Item</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <strong>{item.caption}</strong>? This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-ocid="admin_gallery.cancel_button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => handleDelete(item.id)}
                        data-ocid="admin_gallery.confirm_button"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="p-3 bg-white">
                <div className="flex items-center gap-1.5 mb-1">
                  <Badge className="bg-ngo-orange/10 text-ngo-orange border-0 text-xs">
                    {item.category}
                  </Badge>
                  {item.mediaType === "video" && (
                    <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                      <Video size={9} className="mr-0.5" />
                      Video
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                  {item.caption}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.uploadedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-md" data-ocid="admin_gallery.dialog">
          <DialogHeader>
            <DialogTitle>Upload Photo / Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Select Photo or Video</Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-ngo-green transition-colors"
                onClick={() => uploadFileRef.current?.click()}
                data-ocid="admin_gallery.dropzone"
              >
                {uploadFile ? (
                  uploadMediaType === "video" ? (
                    // biome-ignore lint/a11y/useMediaCaption: user upload preview
                    <video
                      src={uploadFile}
                      className="w-full h-40 object-contain rounded"
                      controls
                    />
                  ) : (
                    <img
                      src={uploadFile}
                      alt="Preview"
                      className="w-full h-40 object-contain rounded"
                    />
                  )
                ) : (
                  <div className="py-6 text-gray-400">
                    <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
                    <p className="text-sm">Click to select an image or video</p>
                  </div>
                )}
              </button>
              <input
                ref={uploadFileRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            {uploadFile && (
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    uploadMediaType === "video"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }
                >
                  {uploadMediaType === "video" ? "Video" : "Photo"} selected
                </Badge>
              </div>
            )}
            <div>
              <Label>Caption</Label>
              <Input
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                placeholder="Enter caption"
                className="mt-1"
                data-ocid="admin_gallery.input"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={uploadCategory} onValueChange={setUploadCategory}>
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin_gallery.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUploadOpen(false)}
              data-ocid="admin_gallery.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-ngo-green text-white hover:bg-ngo-green-dark"
              onClick={handleUpload}
              data-ocid="admin_gallery.submit_button"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingItem}
        onOpenChange={(open) => !open && setEditingItem(null)}
      >
        <DialogContent className="max-w-sm" data-ocid="admin_gallery.dialog">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Caption</Label>
              <Input
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                className="mt-1"
                data-ocid="admin_gallery.input"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin_gallery.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingItem(null)}
              data-ocid="admin_gallery.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-ngo-green text-white hover:bg-ngo-green-dark"
              onClick={handleSaveEdit}
              data-ocid="admin_gallery.save_button"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
