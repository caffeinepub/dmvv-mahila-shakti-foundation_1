import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { type PageContent, useApp } from "@/context/AppContext";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminPages() {
  const { pages, addPage, updatePage, deletePage } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PageContent | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    isPublished: true,
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", slug: "", content: "", isPublished: true });
    setOpen(true);
  };

  const openEdit = (p: PageContent) => {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      content: p.content,
      isPublished: p.isPublished,
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.slug) {
      toast.error("Title and slug are required.");
      return;
    }
    if (editing) {
      updatePage(editing.id, form);
      toast.success("Page updated.");
    } else {
      addPage({
        id: `p_${Date.now()}`,
        ...form,
        createdAt: new Date().toISOString().slice(0, 10),
      });
      toast.success("Page created.");
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Page Builder</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-ngo-green text-white hover:bg-ngo-green-dark"
              onClick={openAdd}
              data-ocid="admin_pages.open_modal_button"
            >
              <Plus size={16} className="mr-2" /> New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" data-ocid="admin_pages.dialog">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Page" : "Create New Page"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label>Page Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_pages.input"
                />
              </div>
              <div>
                <Label>Slug (URL path) *</Label>
                <Input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    }))
                  }
                  className="mt-1"
                  placeholder="page-slug"
                  data-ocid="admin_pages.input"
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  rows={8}
                  className="mt-1"
                  data-ocid="admin_pages.textarea"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.isPublished}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, isPublished: v }))
                  }
                  data-ocid="admin_pages.switch"
                />
                <Label>Published</Label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-ngo-green text-white hover:bg-ngo-green-dark"
                  onClick={handleSave}
                  data-ocid="admin_pages.confirm_button"
                >
                  Save Page
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                  data-ocid="admin_pages.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {pages.length === 0 ? (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="admin_pages.empty_state"
            >
              No pages created yet.
            </div>
          ) : (
            <Table data-ocid="admin_pages.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page, idx) => (
                  <TableRow
                    key={page.id}
                    data-ocid={`admin_pages.row.${idx + 1}`}
                  >
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      /{page.slug}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          page.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }
                      >
                        {page.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{page.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(page)}
                          data-ocid="admin_pages.edit_button"
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePage(page.id)}
                          data-ocid="admin_pages.delete_button"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
