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
import { type YouTubeVideo, useApp } from "@/context/AppContext";
import { Pencil, Plus, Trash2, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function extractYouTubeId(url: string): string {
  const regexes = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([A-Za-z0-9_-]{11})$/,
  ];
  for (const re of regexes) {
    const match = url.match(re);
    if (match) return match[1];
  }
  return url;
}

const EMPTY: Omit<YouTubeVideo, "id"> = {
  title: "",
  youtubeId: "",
  description: "",
  isActive: true,
  sortOrder: 1,
};

export default function AdminYouTubeVideos() {
  const {
    youtubeVideos,
    addYouTubeVideo,
    updateYouTubeVideo,
    deleteYouTubeVideo,
  } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<YouTubeVideo | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [form, setForm] = useState<Omit<YouTubeVideo, "id">>(EMPTY);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setUrlInput("");
    setOpen(true);
  };
  const openEdit = (v: YouTubeVideo) => {
    setEditing(v);
    setForm({
      title: v.title,
      youtubeId: v.youtubeId,
      description: v.description,
      isActive: v.isActive,
      sortOrder: v.sortOrder,
    });
    setUrlInput(v.youtubeId);
    setOpen(true);
  };

  const handleSave = () => {
    const youtubeId = extractYouTubeId(urlInput.trim());
    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!youtubeId) {
      toast.error("YouTube URL or ID is required.");
      return;
    }
    if (editing) {
      updateYouTubeVideo(editing.id, { ...form, youtubeId });
      toast.success("Video updated.");
    } else {
      addYouTubeVideo({ id: `yt_${Date.now()}`, ...form, youtubeId });
      toast.success("Video added.");
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">
          YouTube Videos
        </h1>
        <Button
          className="bg-ngo-green text-white"
          onClick={openAdd}
          data-ocid="admin_youtube.open_modal_button"
        >
          <Plus size={16} className="mr-2" /> Add Video
        </Button>
      </div>

      {youtubeVideos.length === 0 ? (
        <div
          className="text-center py-20 text-gray-400"
          data-ocid="admin_youtube.empty_state"
        >
          <Youtube size={52} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No YouTube videos yet</p>
          <p className="text-sm mt-1">
            Add your first video to display it on the homepage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeVideos.map((v, idx) => (
            <Card
              key={v.id}
              className={`border ${v.isActive ? "border-ngo-green/30" : "border-gray-200 opacity-70"}`}
              data-ocid={`admin_youtube.item.${idx + 1}`}
            >
              <CardContent className="p-0">
                <div
                  className="relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-t-xl"
                    src={`https://www.youtube.com/embed/${v.youtubeId}`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 flex-1">
                      {v.title}
                    </h3>
                    <Badge
                      className={
                        v.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    >
                      {v.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  {v.description && (
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">
                      {v.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => openEdit(v)}
                      data-ocid="admin_youtube.edit_button"
                    >
                      <Pencil size={13} className="mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        deleteYouTubeVideo(v.id);
                        toast.success("Deleted.");
                      }}
                      data-ocid="admin_youtube.delete_button"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md" data-ocid="admin_youtube.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} YouTube Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>YouTube URL or Video ID *</Label>
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or video ID"
                className="mt-1"
                data-ocid="admin_youtube.input"
              />
              <p className="text-xs text-gray-400 mt-1">
                Paste full YouTube URL or just the 11-character video ID
              </p>
            </div>
            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Video title"
                className="mt-1"
                data-ocid="admin_youtube.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Brief description (optional)"
                className="mt-1"
                data-ocid="admin_youtube.textarea"
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
                data-ocid="admin_youtube.input"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                data-ocid="admin_youtube.switch"
              />
              <Label>Active (show on homepage)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin_youtube.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-ngo-green text-white"
              onClick={handleSave}
              data-ocid="admin_youtube.save_button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
