import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import type { LegalDocument } from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import {
  FileText,
  Pencil,
  Plus,
  Shield,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const DOC_TYPES = [
  "Registration Certificate",
  "12A Certificate",
  "80G Certificate",
  "PAN Card",
  "FCRA Certificate",
  "GST Certificate",
  "MOU / Agreement",
  "Bank Certificate",
  "Audit Report",
  "Other",
];

const empty: LegalDocument = {
  id: "",
  title: "",
  description: "",
  documentType: "Registration Certificate",
  issuedBy: "",
  issuedDate: "",
  expiryDate: "",
  imageUrl: "",
  isActive: true,
  sortOrder: 1,
};

export default function AdminLegalDocs() {
  const {
    legalDocuments,
    addLegalDocument,
    updateLegalDocument,
    deleteLegalDocument,
  } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<LegalDocument | null>(null);
  const [form, setForm] = useState<LegalDocument>(empty);
  const fileRef = useRef<HTMLInputElement>(null);

  function openAdd() {
    setEditing(null);
    setForm({
      ...empty,
      id: crypto.randomUUID(),
      sortOrder: legalDocuments.length + 1,
    });
    setShowForm(true);
  }

  function openEdit(doc: LegalDocument) {
    setEditing(doc);
    setForm({ ...doc });
    setShowForm(true);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((f) => ({ ...f, imageUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!form.title.trim() || !form.issuedBy.trim() || !form.issuedDate) {
      toast.error("Title, Issued By, and Issued Date are required");
      return;
    }
    if (editing) {
      updateLegalDocument(editing.id, form);
      toast.success("Document updated!");
    } else {
      addLegalDocument(form);
      toast.success("New document added!");
    }
    setShowForm(false);
  }

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteLegalDocument(id);
      toast.success("Document deleted");
    }
  }

  const sorted = [...legalDocuments].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-green-700" size={26} />
          <h1 className="text-2xl font-extrabold text-gray-900">
            Legal Documents
          </h1>
        </div>
        <Button
          onClick={openAdd}
          className="bg-green-700 hover:bg-green-800 text-white"
        >
          <Plus size={16} className="mr-1" /> Add New Document
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-green-800">
                {editing ? "Edit Document" : "Add New Document"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Document Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Society Registration Certificate"
                />
              </div>
              <div>
                <Label>Document Type *</Label>
                <Select
                  value={form.documentType}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, documentType: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DOC_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Issued By *</Label>
                <Input
                  value={form.issuedBy}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, issuedBy: e.target.value }))
                  }
                  placeholder="e.g. Registrar of Societies, UP"
                />
              </div>
              <div>
                <Label>Issue Date *</Label>
                <Input
                  type="date"
                  value={form.issuedDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, issuedDate: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Expiry Date (optional)</Label>
                <Input
                  type="date"
                  value={form.expiryDate || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expiryDate: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isActive: v }))
                  }
                />
                <Label>Active (Visible on Public Page)</Label>
              </div>
              <div className="col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Enter document details..."
                />
              </div>
              <div className="col-span-2">
                <Label>Document Image / Scan (optional)</Label>
                <div className="flex items-center gap-3 mt-1">
                  {form.imageUrl && (
                    <img
                      src={form.imageUrl}
                      alt="doc"
                      className="w-24 h-16 object-cover rounded border"
                    />
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Upload size={14} className="mr-1" /> Image Upload Karen
                  </Button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {form.imageUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                    >
                      <X size={14} /> Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleSave}
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                {editing ? "Update Karen" : "Save Karen"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((doc) => (
          <Card
            key={doc.id}
            className={`border ${doc.isActive ? "border-green-200" : "border-gray-200 opacity-60"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 flex-1">
                  {doc.imageUrl ? (
                    <img
                      src={doc.imageUrl}
                      alt={doc.title}
                      className="w-14 h-14 object-cover rounded border flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-green-50 rounded border border-green-200 flex items-center justify-center flex-shrink-0">
                      <FileText size={24} className="text-green-700" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {doc.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {doc.documentType}
                      </Badge>
                      {!doc.isActive && (
                        <Badge variant="secondary" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Issued by: {doc.issuedBy}
                    </p>
                    <p className="text-xs text-gray-500">
                      Date: {doc.issuedDate}
                      {doc.expiryDate ? ` | Expiry: ${doc.expiryDate}` : ""}
                    </p>
                    {doc.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(doc)}
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {legalDocuments.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FileText size={40} className="mx-auto mb-2" />
          <p>
            No legal documents yet. Click "Add New Document" to get started.
          </p>
        </div>
      )}
    </div>
  );
}
