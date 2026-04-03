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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { type TransportInfo, useApp } from "@/context/AppContext";
import { Pencil, Plus, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const VEHICLE_TYPES = [
  "Mini Bus (22 Seater)",
  "Tempo Traveller (12 Seater)",
  "SUV (7 Seater)",
  "Auto Rickshaw",
  "Ambulance",
  "Cargo Van",
  "Other",
];

const EMPTY_FORM = {
  vehicleType: "Mini Bus (22 Seater)",
  routeFrom: "",
  routeTo: "",
  capacity: "",
  contactPhone: "",
  isActive: true,
  sortOrder: 1,
};

export default function AdminTransport() {
  const {
    transportInfo,
    addTransportInfo,
    updateTransportInfo,
    deleteTransportInfo,
  } = useApp();

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });

  const [editItem, setEditItem] = useState<TransportInfo | null>(null);
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });

  const handleAdd = () => {
    if (!addForm.routeFrom.trim() || !addForm.routeTo.trim()) {
      toast.error("Route From and Route To are required.");
      return;
    }
    addTransportInfo({
      id: `ti_${Date.now()}`,
      ...addForm,
      sortOrder: transportInfo.length + 1,
    });
    toast.success("Transport route added!");
    setAddOpen(false);
    setAddForm({ ...EMPTY_FORM });
  };

  const openEdit = (item: TransportInfo) => {
    setEditItem(item);
    setEditForm({
      vehicleType: item.vehicleType,
      routeFrom: item.routeFrom,
      routeTo: item.routeTo,
      capacity: item.capacity,
      contactPhone: item.contactPhone,
      isActive: item.isActive,
      sortOrder: item.sortOrder,
    });
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    if (!editForm.routeFrom.trim() || !editForm.routeTo.trim()) {
      toast.error("Route From and Route To are required.");
      return;
    }
    updateTransportInfo(editItem.id, editForm);
    toast.success("Transport route updated!");
    setEditItem(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transport Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Vehicle routes and transport info manage karen
          </p>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700 text-white"
          onClick={() => setAddOpen(true)}
          data-ocid="admin_transport.add_button"
        >
          <Plus size={16} className="mr-1" /> Add Route
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-ngo-green">
              {transportInfo.length}
            </div>
            <div className="text-xs text-gray-500">Total Routes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {transportInfo.filter((t) => t.isActive).length}
            </div>
            <div className="text-xs text-gray-500">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {transportInfo.filter((t) => !t.isActive).length}
            </div>
            <div className="text-xs text-gray-500">Inactive</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {transportInfo.length === 0 ? (
          <div
            className="text-center py-16 text-gray-400"
            data-ocid="admin_transport.empty_state"
          >
            No transport routes. Click "Add Route" to create one.
          </div>
        ) : (
          transportInfo.map((item, idx) => (
            <Card key={item.id} data-ocid={`admin_transport.item.${idx + 1}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Truck size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900">
                        {item.vehicleType}
                      </div>
                      <div className="text-sm text-gray-600 mt-0.5">
                        {item.routeFrom} → {item.routeTo}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">
                          Capacity: {item.capacity}
                        </span>
                        <span className="text-xs text-gray-500">
                          📞 {item.contactPhone}
                        </span>
                      </div>
                      <Badge
                        className={
                          item.isActive
                            ? "mt-1 bg-green-100 text-green-700 text-xs"
                            : "mt-1 bg-gray-100 text-gray-500 text-xs"
                        }
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={(v) => {
                        updateTransportInfo(item.id, { isActive: v });
                        toast.success(v ? "Activated!" : "Deactivated!");
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(item)}
                      data-ocid="admin_transport.edit_button"
                    >
                      <Pencil size={14} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-500 hover:bg-red-50"
                          data-ocid="admin_transport.delete_button"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Route?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This transport route will be permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              deleteTransportInfo(item.id);
                              toast.success("Route deleted!");
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Transport Route</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Vehicle Type</Label>
              <select
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                value={addForm.vehicleType}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, vehicleType: e.target.value }))
                }
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Route From *</Label>
                <Input
                  value={addForm.routeFrom}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, routeFrom: e.target.value }))
                  }
                  placeholder="e.g. Lucknow HQ"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Route To *</Label>
                <Input
                  value={addForm.routeTo}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, routeTo: e.target.value }))
                  }
                  placeholder="e.g. Rural Centers - UP"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Capacity</Label>
                <Input
                  value={addForm.capacity}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, capacity: e.target.value }))
                  }
                  placeholder="e.g. 22 women"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={addForm.contactPhone}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, contactPhone: e.target.value }))
                  }
                  placeholder="9876543XXX"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={addForm.isActive}
                onCheckedChange={(v) =>
                  setAddForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAdd}
            >
              Add Route
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Transport Route</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Vehicle Type</Label>
              <select
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                value={editForm.vehicleType}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, vehicleType: e.target.value }))
                }
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Route From *</Label>
                <Input
                  value={editForm.routeFrom}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, routeFrom: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Route To *</Label>
                <Input
                  value={editForm.routeTo}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, routeTo: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Capacity</Label>
                <Input
                  value={editForm.capacity}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, capacity: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={editForm.contactPhone}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, contactPhone: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={editForm.sortOrder}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch
                  checked={editForm.isActive}
                  onCheckedChange={(v) =>
                    setEditForm((f) => ({ ...f, isActive: v }))
                  }
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
