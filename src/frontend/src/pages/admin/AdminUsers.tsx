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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type User, useApp } from "@/context/AppContext";
import {
  CheckCircle,
  Pencil,
  ShieldCheck,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EditForm {
  fullName: string;
  mobile: string;
  email: string;
  role: User["role"];
  status: User["status"];
}

export default function AdminUsers() {
  const { users, updateUser, deleteUser } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    fullName: "",
    mobile: "",
    email: "",
    role: "user",
    status: "pending",
  });

  const filtered = users.filter((u) => {
    if (u.role === "admin") return false;
    if (activeTab === "all") return true;
    return u.status === activeTab;
  });

  const openEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({
      fullName: user.fullName,
      mobile: user.mobile,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    updateUser(editingUser.id, editForm);
    toast.success(`${editForm.fullName}'s profile updated.`);
    setEditingUser(null);
  };

  const handleApprove = (id: string, name: string) => {
    updateUser(id, { status: "approved" });
    toast.success(`${name} has been approved.`);
  };

  const handleReject = (id: string, name: string) => {
    updateUser(id, { status: "rejected" });
    toast.success(`${name} has been rejected.`);
  };

  const handleRoleChange = (id: string, role: User["role"]) => {
    updateUser(id, { role });
    toast.success("Role updated.");
  };

  const handleToggleVerify = (user: User) => {
    updateUser(user.id, { isVerified: !user.isVerified });
    toast.success(
      user.isVerified
        ? `${user.fullName} verification removed.`
        : `${user.fullName} verified successfully.`,
    );
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    toast.success("User deleted.");
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        User Management
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all" data-ocid="admin_users.tab">
            All ({users.filter((u) => u.role !== "admin").length})
          </TabsTrigger>
          <TabsTrigger value="pending" data-ocid="admin_users.tab">
            Pending ({users.filter((u) => u.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved" data-ocid="admin_users.tab">
            Approved (
            {
              users.filter((u) => u.status === "approved" && u.role !== "admin")
                .length
            }
            )
          </TabsTrigger>
          <TabsTrigger value="rejected" data-ocid="admin_users.tab">
            Rejected ({users.filter((u) => u.status === "rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              {filtered.length === 0 ? (
                <div
                  className="text-center py-12 text-gray-400"
                  data-ocid="admin_users.empty_state"
                >
                  No users found.
                </div>
              ) : (
                <Table data-ocid="admin_users.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((user, idx) => (
                      <TableRow
                        key={user.id}
                        data-ocid={`admin_users.row.${idx + 1}`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span>{user.fullName}</span>
                            {user.isVerified && (
                              <Badge className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{user.email}</TableCell>
                        <TableCell className="text-sm">{user.mobile}</TableCell>
                        <TableCell>
                          <Select
                            defaultValue={user.role}
                            onValueChange={(v) =>
                              handleRoleChange(user.id, v as User["role"])
                            }
                          >
                            <SelectTrigger
                              className="h-8 w-28"
                              data-ocid="admin_users.select"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="center">Center</SelectItem>
                              <SelectItem value="supervisor">
                                Supervisor
                              </SelectItem>
                              <SelectItem value="transport">
                                Transport
                              </SelectItem>
                              <SelectItem value="hr">HR</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`capitalize ${
                              user.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : user.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.createdAt}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {/* Approve */}
                            <Button
                              size="sm"
                              className="bg-green-600 text-white hover:bg-green-700 h-8 w-8 p-0"
                              onClick={() =>
                                handleApprove(user.id, user.fullName)
                              }
                              disabled={user.status === "approved"}
                              title="Approve"
                              data-ocid="admin_users.confirm_button"
                            >
                              <CheckCircle size={13} />
                            </Button>
                            {/* Reject */}
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                handleReject(user.id, user.fullName)
                              }
                              disabled={user.status === "rejected"}
                              title="Reject"
                              data-ocid="admin_users.delete_button"
                            >
                              <XCircle size={13} />
                            </Button>
                            {/* Verify */}
                            <Button
                              size="sm"
                              variant="outline"
                              className={`h-8 w-8 p-0 ${
                                user.isVerified
                                  ? "border-green-500 text-green-600 bg-green-50"
                                  : "border-gray-300 text-gray-400"
                              }`}
                              onClick={() => handleToggleVerify(user)}
                              title={
                                user.isVerified
                                  ? "Remove Verification"
                                  : "Verify User"
                              }
                              data-ocid="admin_users.toggle"
                            >
                              <ShieldCheck size={13} />
                            </Button>
                            {/* Edit */}
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-blue-300 text-blue-600 hover:bg-blue-50"
                              onClick={() => openEdit(user)}
                              title="Edit Profile"
                              data-ocid="admin_users.edit_button"
                            >
                              <Pencil size={13} />
                            </Button>
                            {/* Delete */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 border-red-300 text-red-600 hover:bg-red-50"
                                  title="Delete User"
                                  data-ocid="admin_users.open_modal_button"
                                >
                                  <Trash2 size={13} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent data-ocid="admin_users.dialog">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete User
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete{" "}
                                    <strong>{user.fullName}</strong>? This
                                    action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel data-ocid="admin_users.cancel_button">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-600 text-white hover:bg-red-700"
                                    onClick={() => handleDelete(user.id)}
                                    data-ocid="admin_users.confirm_button"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
      >
        <DialogContent className="max-w-md" data-ocid="admin_users.dialog">
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Full Name</Label>
              <Input
                value={editForm.fullName}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, fullName: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin_users.input"
              />
            </div>
            <div>
              <Label>Mobile</Label>
              <Input
                value={editForm.mobile}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, mobile: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin_users.input"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, email: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin_users.input"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select
                value={editForm.role}
                onValueChange={(v) =>
                  setEditForm((p) => ({ ...p, role: v as User["role"] }))
                }
              >
                <SelectTrigger className="mt-1" data-ocid="admin_users.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(v) =>
                  setEditForm((p) => ({ ...p, status: v as User["status"] }))
                }
              >
                <SelectTrigger className="mt-1" data-ocid="admin_users.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingUser(null)}
              data-ocid="admin_users.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-ngo-green text-white hover:bg-ngo-green-dark"
              onClick={handleSaveEdit}
              data-ocid="admin_users.save_button"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
