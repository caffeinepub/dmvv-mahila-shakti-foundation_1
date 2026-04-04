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
import { type Product, useApp } from "@/context/AppContext";
import {
  Camera,
  ImageIcon,
  Package,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const PRODUCT_CATEGORIES = [
  "Food Products",
  "Handicrafts",
  "Textiles & Clothing",
  "Agriculture",
  "Beauty & Wellness",
  "Stationery",
  "Electronics",
  "Others",
];

const emptyForm = (): Omit<Product, "id"> => ({
  name: "",
  description: "",
  price: "",
  category: PRODUCT_CATEGORIES[0],
  imageUrl: "",
  centerName: "",
  centerId: "",
  stock: 0,
  isActive: true,
});

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();

  // Dialog state
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyForm());

  // Photo upload state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gallery picker state
  const { galleryItems } = useApp();
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);

  // Filter / search
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // ── helpers ──────────────────────────────────────────────────
  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setPhotoPreview(null);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl || "",
      centerName: p.centerName || "",
      centerId: p.centerId || "",
      stock: p.stock,
      isActive: p.isActive,
    });
    setPhotoPreview(p.imageUrl || null);
    setOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPhotoPreview(dataUrl);
      setForm((prev) => ({ ...prev, imageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleGalleryPick = (src: string) => {
    setPhotoPreview(src);
    setForm((prev) => ({ ...prev, imageUrl: src }));
    setGalleryPickerOpen(false);
    toast.success("Photo selected from gallery.");
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    setForm((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (!form.price || Number.isNaN(Number(form.price))) {
      toast.error("Valid price is required.");
      return;
    }
    if (editId) {
      updateProduct(editId, form);
      toast.success("Product updated successfully!");
    } else {
      addProduct({ ...form, id: `pr_${Date.now()}` });
      toast.success("Product added successfully!");
    }
    setOpen(false);
    setForm(emptyForm());
    setPhotoPreview(null);
    setEditId(null);
  };

  // ── filtered list ────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.centerName || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || p.category === filterCategory;
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
          ? p.isActive
          : !p.isActive;
    return matchSearch && matchCat && matchStatus;
  });

  const galleryPhotos = galleryItems.filter((g) => g.mediaType !== "video");

  // ── render ───────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {products.length} total &bull;{" "}
            {products.filter((p) => p.isActive).length} active
          </p>
        </div>
        <Button
          className="bg-ngo-green text-white"
          onClick={openAdd}
          data-ocid="admin_products.open_modal_button"
        >
          <Plus size={16} className="mr-1" /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
          data-ocid="admin_products.search"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {PRODUCT_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-16 text-gray-400"
          data-ocid="admin_products.empty_state"
        >
          <Package size={48} className="mx-auto mb-3 opacity-25" />
          <p className="text-sm">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <Card
              key={p.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
              data-ocid={`admin_products.item.${i + 1}`}
            >
              {/* Product Image */}
              <div className="h-44 bg-gray-100 relative flex items-center justify-center">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Package size={44} className="text-gray-300" />
                )}
                <Badge
                  className={`absolute top-2 right-2 text-xs ${
                    p.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {p.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <CardContent className="p-3">
                <h3 className="font-bold text-gray-800 text-sm line-clamp-1">
                  {p.name}
                </h3>
                <div className="text-xs text-gray-500 mt-0.5">{p.category}</div>
                {p.centerName && (
                  <div className="text-xs text-gray-400">{p.centerName}</div>
                )}
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-extrabold text-green-700 text-base">
                    ₹{Number(p.price).toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">
                    Stock: {p.stock}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEdit(p)}
                    data-ocid={`admin_products.edit_button.${i + 1}`}
                  >
                    <Pencil size={12} className="mr-1" /> Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        data-ocid={`admin_products.delete_button.${i + 1}`}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &ldquo;{p.name}
                          &rdquo;? This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => {
                            deleteProduct(p.id);
                            toast.success("Product deleted.");
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ── Add / Edit Dialog ── */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            setForm(emptyForm());
            setPhotoPreview(null);
            setEditId(null);
          }
        }}
      >
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin_products.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Photo Upload Section */}
            <div>
              <Label className="text-sm font-semibold">Product Photo</Label>
              <div className="mt-2">
                {photoPreview ? (
                  <div className="relative w-full h-52 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearPhoto}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      data-ocid="admin_products.clear_photo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-52 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-400">
                      <ImageIcon size={40} className="mx-auto mb-2" />
                      <p className="text-sm">No photo selected</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Buttons */}
              <div className="flex gap-2 mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  data-ocid="admin_products.upload_photo_button"
                >
                  <Camera size={14} className="mr-1" /> Upload Photo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setGalleryPickerOpen(true)}
                  data-ocid="admin_products.pick_from_gallery_button"
                >
                  <ImageIcon size={14} className="mr-1" /> Pick from Gallery
                </Button>
                {photoPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearPhoto}
                    className="text-red-500 hover:text-red-700"
                    data-ocid="admin_products.remove_photo_button"
                  >
                    <X size={14} className="mr-1" /> Remove
                  </Button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <Label className="text-xs">Product Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="e.g. Handmade Soap"
                  data-ocid="admin_products.input_name"
                />
              </div>

              <div>
                <Label className="text-xs">Price (₹) *</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, price: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="e.g. 250"
                  data-ocid="admin_products.input_price"
                />
              </div>

              <div>
                <Label className="text-xs">Stock Quantity</Label>
                <Input
                  type="number"
                  value={form.stock.toString()}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, stock: Number(e.target.value) }))
                  }
                  className="mt-1"
                  placeholder="e.g. 100"
                  data-ocid="admin_products.input_stock"
                />
              </div>

              <div>
                <Label className="text-xs">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="admin_products.select_category"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Center Name</Label>
                <Input
                  value={form.centerName || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, centerName: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="e.g. Anshika Center"
                  data-ocid="admin_products.input_center"
                />
              </div>

              <div className="sm:col-span-2">
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="mt-1"
                  rows={3}
                  placeholder="Product description..."
                  data-ocid="admin_products.input_description"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, isActive: v }))
                  }
                  data-ocid="admin_products.switch_active"
                />
                <Label className="text-sm">Active (visible to users)</Label>
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                className="bg-ngo-green text-white flex-1"
                data-ocid="admin_products.save_button"
              >
                {editId ? "Update Product" : "Add Product"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="admin_products.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Gallery Picker Dialog ── */}
      <Dialog open={galleryPickerOpen} onOpenChange={setGalleryPickerOpen}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] overflow-y-auto"
          data-ocid="admin_products.gallery_picker_dialog"
        >
          <DialogHeader>
            <DialogTitle>Pick Photo from Gallery</DialogTitle>
          </DialogHeader>

          {galleryPhotos.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No photos in gallery yet.</p>
              <p className="text-xs mt-1">
                Upload photos in the Gallery section first.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {galleryPhotos.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleGalleryPick(g.src)}
                  className="relative h-24 rounded-lg overflow-hidden border-2 border-transparent hover:border-ngo-green transition-all focus:outline-none focus:border-ngo-green"
                  data-ocid={`admin_products.gallery_pick.${i + 1}`}
                >
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all" />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
