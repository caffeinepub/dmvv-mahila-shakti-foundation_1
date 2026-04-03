import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Download, File, FileImage, FileText } from "lucide-react";

const typeIcon = (type: string) => {
  if (type === "PDF") return FileText;
  if (type === "Image") return FileImage;
  return File;
};

export default function Downloads() {
  const { downloadItems } = useApp();
  const active = downloadItems
    .filter((d) => d.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Resources</Badge>
          <h1 className="text-4xl font-extrabold text-white">Downloads</h1>
          <p className="text-green-200 mt-2">
            Forms, brochures, reports, and educational resources
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        {active.length === 0 ? (
          <div
            className="text-center py-20 text-gray-400"
            data-ocid="downloads.empty_state"
          >
            Koi download available nahi hai.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map((doc, idx) => {
              const Icon = typeIcon(doc.type || doc.fileType || "");
              return (
                <Card
                  key={doc.id}
                  className="hover:shadow-md transition-shadow"
                  data-ocid={`downloads.item.${idx + 1}`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm">
                        {doc.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {doc.desc}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {doc.category}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {doc.size}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-ngo-green text-ngo-green hover:bg-green-50 flex-shrink-0"
                      data-ocid="downloads.download_button"
                      onClick={() =>
                        doc.fileUrl && window.open(doc.fileUrl, "_blank")
                      }
                    >
                      <Download size={14} className="mr-1" /> Download
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
