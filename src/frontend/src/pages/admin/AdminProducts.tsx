import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { type Product, useApp } from "@/context/AppContext";
import { Package, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const emptyProduct = (): Omit<Product, "id"> => ({
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  centerName: "",
  centerId: "",
  stock: 0,
  isActive: true,
});

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct());
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required.");
      return;
    }
    if (editId) {
      updateProduct(editId, form);
      toast.success("Product updated!");
    } else {
      addProduct({ ...form, id: `pr_${Date.now()}` });
      toast.success("Product added successfully!");
    }
    setOpen(false);
    setForm(emptyProduct());
    setEditId(null);
  };

  const startEdit = (p: Product) => {
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
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) {
              setForm(emptyProduct());
              setEditId(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="bg-ngo-green text-white"
              data-ocid="admin_products.open_modal_button"
            >
              + Add Product
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="admin_products.dialog">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit" : "Add"} Product</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(
                [
                  ["Product Name *", "name", "text"],
                  ["Price (₹) *", "price", "number"],
                  ["Category", "category", "text"],
                  ["Center Name", "centerName", "text"],
                  ["Image URL", "imageUrl", "text"],
                  ["Stock", "stock", "number"],
                ] as [string, string, string][]
              ).map(([l, k, t]) => (
                <div key={k}>
                  <Label className="text-xs">{l}</Label>
                  <Input
                    type={t}
                    value={
                      k === "stock"
                        ? form.stock.toString()
                        : (form as unknown as Record<string, string>)[k] || ""
                    }
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        [k]:
                          k === "stock"
                            ? Number(e.target.value)
                            : e.target.value,
                      }))
                    }
                    className="mt-1"
                    data-ocid="admin_products.input"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <Label className="text-xs">Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_products.input"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, isActive: v }))
                  }
                  data-ocid="admin_products.switch"
                />
                <Label className="text-sm">Active</Label>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={handleSave}
                className="bg-ngo-green text-white"
                data-ocid="admin_products.save_button"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="admin_products.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <Card key={p.id} data-ocid={`admin_products.item.${i + 1}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{p.name}</h3>
                  <div className="text-sm text-gray-500">{p.category}</div>
                  <div className="text-sm font-bold text-green-700 mt-1">
                    ₹{Number(p.price).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    Stock: {p.stock} | {p.centerName}
                  </div>
                </div>
                <Badge
                  className={
                    p.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }
                >
                  {p.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(p)}
                  data-ocid={`admin_products.edit_button.${i + 1}`}
                >
                  <Pencil size={12} className="mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    deleteProduct(p.id);
                    toast.success("Product deleted!");
                  }}
                  data-ocid={`admin_products.delete_button.${i + 1}`}
                >
                  <Trash2 size={12} className="mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
