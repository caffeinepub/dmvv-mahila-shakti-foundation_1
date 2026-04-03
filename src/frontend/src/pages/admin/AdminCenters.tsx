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
import { type Center, useApp } from "@/context/AppContext";
import { CheckCircle, Edit, Plus, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const emptyCenter = (): Omit<Center, "id"> => ({
  name: "",
  address: "",
  state: "",
  district: "",
  block: "",
  contactPhone: "",
  isActive: true,
});

export default function AdminCenters() {
  const { centers, addCenter, updateCenter, deleteCenter } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Center | null>(null);
  const [form, setForm] = useState(emptyCenter());

  const openAdd = () => {
    setEditing(null);
    setForm(emptyCenter());
    setOpen(true);
  };

  const openEdit = (c: Center) => {
    setEditing(c);
    setForm({
      name: c.name,
      address: c.address,
      state: c.state,
      district: c.district,
      block: c.block,
      contactPhone: c.contactPhone,
      isActive: c.isActive,
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.state || !form.district) {
      toast.error("Name, State and District are required.");
      return;
    }
    if (editing) {
      updateCenter(editing.id, form);
      toast.success("Center updated.");
    } else {
      addCenter({ id: `c_${Date.now()}`, ...form });
      toast.success("Center added.");
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteCenter(id);
    toast.success("Center deleted.");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Center Management
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-ngo-green text-white hover:bg-ngo-green-dark"
              onClick={openAdd}
              data-ocid="admin_centers.open_modal_button"
            >
              <Plus size={16} className="mr-2" /> Add Center
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="admin_centers.dialog">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Center" : "Add New Center"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label>Center Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_centers.input"
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_centers.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>State *</Label>
                  <Input
                    value={form.state}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, state: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="admin_centers.input"
                  />
                </div>
                <div>
                  <Label>District *</Label>
                  <Input
                    value={form.district}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, district: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="admin_centers.input"
                  />
                </div>
              </div>
              <div>
                <Label>Block</Label>
                <Input
                  value={form.block}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, block: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_centers.input"
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, contactPhone: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_centers.input"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, isActive: v }))
                  }
                  data-ocid="admin_centers.switch"
                />
                <Label>Active</Label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-ngo-green text-white hover:bg-ngo-green-dark"
                  onClick={handleSave}
                  data-ocid="admin_centers.confirm_button"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                  data-ocid="admin_centers.cancel_button"
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
          {centers.length === 0 ? (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="admin_centers.empty_state"
            >
              No centers found.
            </div>
          ) : (
            <Table data-ocid="admin_centers.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>District / Block</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {centers.map((center, idx) => (
                  <TableRow
                    key={center.id}
                    data-ocid={`admin_centers.row.${idx + 1}`}
                  >
                    <TableCell className="font-medium">
                      {center.name}
                      <div className="text-xs text-gray-400">
                        {center.address}
                      </div>
                    </TableCell>
                    <TableCell>{center.state}</TableCell>
                    <TableCell>
                      {center.district}
                      <div className="text-xs text-gray-400">
                        {center.block}
                      </div>
                    </TableCell>
                    <TableCell>{center.contactPhone}</TableCell>
                    <TableCell>
                      {center.isActive ? (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle size={12} className="mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500">
                          <XCircle size={12} className="mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(center)}
                          data-ocid="admin_centers.edit_button"
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(center.id)}
                          data-ocid="admin_centers.delete_button"
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
