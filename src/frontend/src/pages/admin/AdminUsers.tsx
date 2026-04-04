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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { type User, useApp } from "@/context/AppContext";
import {
  CheckCircle,
  CreditCard,
  Pencil,
  ShieldCheck,
  Trash2,
  UserCircle,
  User as UserIcon,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface EditForm {
  fullName: string;
  mobile: string;
  email: string;
  role: User["role"];
  status: User["status"];
  // Personal Details
  fatherName: string;
  dob: string;
  gender: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  // KYC Details
  aadhaarNumber: string;
  panNumber: string;
  nomineeName: string;
  nomineeRelation: string;
}

export default function AdminUsers() {
  const { users, updateUser, deleteUser } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    fullName: "",
    mobile: "",
    email: "",
    role: "user",
    status: "pending",
    fatherName: "",
    dob: "",
    gender: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    aadhaarNumber: "",
    panNumber: "",
    nomineeName: "",
    nomineeRelation: "",
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
      fatherName: user.fatherName || "",
      dob: user.dob || "",
      gender: user.gender || "",
      address: user.address || "",
      district: user.district || "",
      state: user.state || "",
      pincode: user.pincode || "",
      aadhaarNumber: user.aadhaarNumber || "",
      panNumber: user.panNumber || "",
      nomineeName: user.nomineeName || "",
      nomineeRelation: user.nomineeRelation || "",
    });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    updateUser(editingUser.id, {
      fullName: editForm.fullName,
      mobile: editForm.mobile,
      email: editForm.email,
      role: editForm.role,
      status: editForm.status,
      fatherName: editForm.fatherName || undefined,
      dob: editForm.dob || undefined,
      gender: editForm.gender || undefined,
      address: editForm.address || undefined,
      district: editForm.district || undefined,
      state: editForm.state || undefined,
      pincode: editForm.pincode || undefined,
      aadhaarNumber: editForm.aadhaarNumber || undefined,
      panNumber: editForm.panNumber || undefined,
      nomineeName: editForm.nomineeName || undefined,
      nomineeRelation: editForm.nomineeRelation || undefined,
    });
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
                            {user.aadhaarNumber && (
                              <Badge className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5">
                                KYC
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
                              title="Edit User"
                              onClick={() => openEdit(user)}
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
                            {/* Full Profile */}
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-green-400 text-green-700 hover:bg-green-50"
                              title="Full Profile"
                              onClick={() =>
                                navigate(`/admin/user-profile/${user.id}`)
                              }
                              data-ocid="admin_users.button"
                            >
                              <UserCircle size={13} />
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
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
      >
        <DialogContent className="max-w-2xl" data-ocid="admin_users.dialog">
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto pr-1">
            {/* ── Section 1: Basic Details ── */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-ngo-green/10">
                  <UserIcon size={14} className="text-ngo-green" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Basic Details
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
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
                    <SelectTrigger
                      className="mt-1"
                      data-ocid="admin_users.select"
                    >
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
                      setEditForm((p) => ({
                        ...p,
                        status: v as User["status"],
                      }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1"
                      data-ocid="admin_users.select"
                    >
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
            </div>

            <Separator className="my-4" />

            {/* ── Section 2: Personal Details ── */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-100">
                  <UserIcon size={14} className="text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Personal Details / व्यक्तिगत विवरण
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Father's Name</Label>
                  <Input
                    value={editForm.fatherName}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, fatherName: e.target.value }))
                    }
                    placeholder="Father's full name"
                    className="mt-1"
                    data-ocid="admin_users.input"
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={editForm.dob}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, dob: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="admin_users.input"
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select
                    value={editForm.gender}
                    onValueChange={(v) =>
                      setEditForm((p) => ({ ...p, gender: v }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1"
                      data-ocid="admin_users.select"
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male / पुरुष</SelectItem>
                      <SelectItem value="Female">Female / महिला</SelectItem>
                      <SelectItem value="Other">Other / अन्य</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pincode</Label>
                  <Input
                    value={editForm.pincode}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, pincode: e.target.value }))
                    }
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className="mt-1"
                    data-ocid="admin_users.input"
                  />
                </div>
                <div>
                  <Label>District</Label>
                  <Input
                    value={editForm.district}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, district: e.target.value }))
                    }
                    placeholder="District"
                    className="mt-1"
                    data-ocid="admin_users.input"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={editForm.state}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, state: e.target.value }))
                    }
                    placeholder="State"
                    className="mt-1"
                    data-ocid="admin_users.input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Address</Label>
                  <Textarea
                    value={editForm.address}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, address: e.target.value }))
                    }
                    placeholder="Full address"
                    rows={2}
                    className="mt-1 resize-none"
                    data-ocid="admin_users.textarea"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* ── Section 3: KYC Details ── */}
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100">
                  <CreditCard size={14} className="text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  KYC Details / केवाईसी विवरण
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Aadhaar Number</Label>
                  <Input
                    value={editForm.aadhaarNumber}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        aadhaarNumber: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                    className="mt-1"
                    data-ocid="admin_users.input"
                  />
                </div>
                <div>
                  <Label>PAN Number</Label>
                  <Input
                    value={editForm.panNumber}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        panNumber: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="e.g. ABCDE1234F"
                    maxLength={10}
                    className="mt-1 uppercase"
                    data-ocid="admin_users.input"
                  />
                </div>
                <div>
                  <Label>Nominee Name</Label>
                  <Input
                    value={editForm.nomineeName}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        nomineeName: e.target.value,
                      }))
                    }
                    placeholder="Nominee's full name"
                    className="mt-1"
                    data-ocid="admin_users.input"
                  />
                </div>
                <div>
                  <Label>Nominee Relation</Label>
                  <Input
                    value={editForm.nomineeRelation}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        nomineeRelation: e.target.value,
                      }))
                    }
                    placeholder="e.g. Mother, Spouse"
                    className="mt-1"
                    data-ocid="admin_users.input"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
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
