import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type MediaFile, useApp } from "@/context/AppContext";
import { File, FileImage, FileText, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const typeIcon = (type: string) => {
  if (type === "PDF") return FileText;
  if (type === "Image") return FileImage;
  return File;
};

const fileTypeFromExt = (name: string): string => {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (["pdf"].includes(ext)) return "PDF";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "Image";
  if (["mp4", "avi", "mov"].includes(ext)) return "Video";
  return "File";
};

export default function AdminMedia() {
  const { media, addMedia, deleteMedia } = useApp();
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      const newFile: MediaFile = {
        id: `m_${Date.now()}`,
        fileName: file.name,
        fileType: fileTypeFromExt(file.name),
        uploadedAt: new Date().toISOString().slice(0, 10),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      };
      addMedia(newFile);
      setUploading(false);
      toast.success(`${file.name} uploaded successfully.`);
    }, 1000);
    e.target.value = "";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Media Manager</h1>
        <label className="cursor-pointer">
          <Button
            className="bg-ngo-green text-white hover:bg-ngo-green-dark"
            disabled={uploading}
            asChild
            data-ocid="admin_media.upload_button"
          >
            <span>
              <Upload size={16} className="mr-2" />
              {uploading ? "Uploading..." : "Upload File"}
            </span>
          </Button>
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept=".pdf,.jpg,.jpeg,.png,.mp4,.doc,.docx"
          />
        </label>
      </div>

      {media.length === 0 ? (
        <div
          className="text-center py-20 text-gray-400"
          data-ocid="admin_media.empty_state"
        >
          <Upload size={48} className="mx-auto mb-3 opacity-30" />
          <p>No files uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((file, idx) => {
            const Icon = typeIcon(file.fileType);
            return (
              <Card
                key={file.id}
                className="hover:shadow-md transition-shadow"
                data-ocid={`admin_media.item.${idx + 1}`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {file.fileName}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {file.fileType}
                      </Badge>
                      <span className="text-xs text-gray-400">{file.size}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {file.uploadedAt}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      deleteMedia(file.id);
                      toast.success("File deleted.");
                    }}
                    data-ocid="admin_media.delete_button"
                  >
                    <Trash2 size={14} />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
