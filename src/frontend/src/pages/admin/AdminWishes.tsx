import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { WishesLetter } from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import { Heart, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const empty: WishesLetter = {
  id: "",
  senderName: "",
  senderDesignation: "",
  senderOrganization: "",
  message: "",
  photoUrl: "",
  letterDate: "",
  isActive: true,
  sortOrder: 1,
};

export default function AdminWishes() {
  const {
    wishesLetters,
    addWishesLetter,
    updateWishesLetter,
    deleteWishesLetter,
  } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<WishesLetter | null>(null);
  const [form, setForm] = useState<WishesLetter>(empty);
  const photoRef = useRef<HTMLInputElement>(null);

  function openAdd() {
    setEditing(null);
    setForm({
      ...empty,
      id: crypto.randomUUID(),
      sortOrder: wishesLetters.length + 1,
    });
    setShowForm(true);
  }

  function openEdit(w: WishesLetter) {
    setEditing(w);
    setForm({ ...w });
    setShowForm(true);
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((f) => ({ ...f, photoUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!form.senderName.trim() || !form.message.trim()) {
      toast.error("Sender Name and Message are required");
      return;
    }
    if (editing) {
      updateWishesLetter(editing.id, form);
      toast.success("Wishes letter updated!");
    } else {
      addWishesLetter(form);
      toast.success("New wishes letter added!");
    }
    setShowForm(false);
  }

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this wishes letter?")) {
      deleteWishesLetter(id);
      toast.success("Wishes letter deleted");
    }
  }

  const sorted = [...wishesLetters].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart className="text-pink-600" size={26} />
          <h1 className="text-2xl font-extrabold text-gray-900">
            Wishes Letters
          </h1>
        </div>
        <Button
          onClick={openAdd}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          <Plus size={16} className="mr-1" /> Add New Wishes Letter
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 border-pink-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-pink-700">
                {editing ? "Wishes Letter Edit Karen" : "Add New Wishes Letter"}
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
              <div>
                <Label>Sender Name *</Label>
                <Input
                  value={form.senderName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, senderName: e.target.value }))
                  }
                  placeholder="e.g. Smt. Smriti Irani"
                />
              </div>
              <div>
                <Label>Designation</Label>
                <Input
                  value={form.senderDesignation}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      senderDesignation: e.target.value,
                    }))
                  }
                  placeholder="e.g. Union Minister"
                />
              </div>
              <div>
                <Label>Organization</Label>
                <Input
                  value={form.senderOrganization}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      senderOrganization: e.target.value,
                    }))
                  }
                  placeholder="e.g. Government of India"
                />
              </div>
              <div>
                <Label>Letter Date</Label>
                <Input
                  type="date"
                  value={form.letterDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, letterDate: e.target.value }))
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
                <Label>Message / Wishes *</Label>
                <Textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Enter their message or wishes here..."
                />
              </div>
              <div className="col-span-2">
                <Label>Sender Photo (optional)</Label>
                <div className="flex items-center gap-3 mt-1">
                  {form.photoUrl && (
                    <img
                      src={form.photoUrl}
                      alt={form.senderName}
                      className="w-16 h-16 object-cover rounded-full border-2 border-pink-200"
                    />
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => photoRef.current?.click()}
                  >
                    <Upload size={14} className="mr-1" /> Photo Upload Karen
                  </Button>
                  <input
                    ref={photoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  {form.photoUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setForm((f) => ({ ...f, photoUrl: "" }))}
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
                className="bg-pink-600 hover:bg-pink-700 text-white"
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
        {sorted.map((w) => (
          <Card
            key={w.id}
            className={`border ${w.isActive ? "border-pink-200" : "border-gray-200 opacity-60"}`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 flex-1">
                  {w.photoUrl ? (
                    <img
                      src={w.photoUrl}
                      alt={w.senderName}
                      className="w-14 h-14 object-cover rounded-full border-2 border-pink-200 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-pink-50 rounded-full border-2 border-pink-200 flex items-center justify-center flex-shrink-0">
                      <Heart size={20} className="text-pink-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {w.senderName}
                      </h3>
                      {!w.isActive && (
                        <Badge variant="secondary" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    {w.senderDesignation && (
                      <p className="text-xs text-pink-700 font-medium">
                        {w.senderDesignation}
                      </p>
                    )}
                    {w.senderOrganization && (
                      <p className="text-xs text-gray-500">
                        {w.senderOrganization}
                      </p>
                    )}
                    {w.letterDate && (
                      <p className="text-xs text-gray-400">{w.letterDate}</p>
                    )}
                    <p className="text-xs text-gray-600 mt-1 line-clamp-3 italic">
                      "{w.message}"
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(w)}
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200"
                    onClick={() => handleDelete(w.id)}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {wishesLetters.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Heart size={40} className="mx-auto mb-2" />
          <p>
            No wishes letters yet. Click "Add New Wishes Letter" to get started.
          </p>
        </div>
      )}
    </div>
  );
}
