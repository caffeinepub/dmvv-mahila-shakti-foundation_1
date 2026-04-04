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
  Copy,
  CreditCard,
  ExternalLink,
  Link,
  Pencil,
  ShieldCheck,
  Trash2,
  UserCircle,
  User as UserIcon,
  UserPlus,
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
  const [activeTab, setActiveTab] = useState("new_registrations");
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

  const signupUrl = `${window.location.origin}/signup`;
  const pendingCount = users.filter(
    (u) => u.role !== "admin" && u.status === "pending",
  ).length;

  const handleCopySignupLink = () => {
    navigator.clipboard.writeText(signupUrl);
    toast.success("Link copied!");
  };

  const filtered = users.filter((u) => {
    if (u.role === "admin") return false;
    if (activeTab === "new_registrations") return u.status === "pending";
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

      {/* ── Shareable Signup Link Box ── */}
      <div
        className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
        data-ocid="admin_users.panel"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600">
            <UserPlus size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-green-800 text-sm">
              Share Signup Link / साइनअप लिंक शेयर करें
            </h3>
            <p className="text-xs text-green-700">
              Is link ko share karein — jo bhi form bharega uski poori details
              yahan dikhegi
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Input
            readOnly
            value={signupUrl}
            className="bg-white border-green-300 text-gray-700 text-sm flex-1 font-mono"
            data-ocid="admin_users.input"
          />
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white gap-1.5 shrink-0"
            onClick={handleCopySignupLink}
            data-ocid="admin_users.primary_button"
          >
            <Copy size={14} />
            Copy Link
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-green-400 text-green-700 hover:bg-green-50 gap-1.5 shrink-0"
            onClick={() => window.open(signupUrl, "_blank")}
            data-ocid="admin_users.secondary_button"
          >
            <ExternalLink size={14} />
            Open
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex-wrap h-auto gap-1">
          {/* New Registrations Tab */}
          <TabsTrigger
            value="new_registrations"
            className="relative gap-1.5"
            data-ocid="admin_users.tab"
          >
            <UserPlus size={13} />
            New Registrations
            {pendingCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {pendingCount}
              </span>
            )}
          </TabsTrigger>
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

        {/* ── New Registrations Tab (Card layout) ── */}
        <TabsContent value="new_registrations">
          {filtered.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200"
              data-ocid="admin_users.empty_state"
            >
              <UserPlus size={36} className="mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No new registrations</p>
              <p className="text-sm mt-1">
                Share the signup link to get new members.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((user, idx) => (
                <Card
                  key={user.id}
                  className="border-l-4 border-l-orange-400 shadow-sm"
                  data-ocid={`admin_users.item.${idx + 1}`}
                >
                  <CardContent className="p-5">
                    {/* Header row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-lg">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">
                              {user.fullName}
                            </span>
                            <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 font-bold uppercase tracking-wider">
                              NEW
                            </Badge>
                            {user.aadhaarNumber && (
                              <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5">
                                KYC
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            Registered: {user.createdAt}
                          </div>
                        </div>
                      </div>
                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white gap-1"
                          onClick={() => handleApprove(user.id, user.fullName)}
                          disabled={user.status === "approved"}
                          data-ocid={`admin_users.confirm_button.${idx + 1}`}
                        >
                          <CheckCircle size={13} />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-1"
                          onClick={() => handleReject(user.id, user.fullName)}
                          disabled={user.status === "rejected"}
                          data-ocid={`admin_users.delete_button.${idx + 1}`}
                        >
                          <XCircle size={13} />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-600 hover:bg-blue-50 gap-1"
                          onClick={() => openEdit(user)}
                          data-ocid={`admin_users.edit_button.${idx + 1}`}
                        >
                          <Pencil size={13} />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-400 text-green-700 hover:bg-green-50 gap-1"
                          onClick={() =>
                            navigate(`/admin/user-profile/${user.id}`)
                          }
                          data-ocid={`admin_users.button.${idx + 1}`}
                        >
                          <UserCircle size={13} />
                          Full Profile
                        </Button>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Basic Details */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <UserIcon size={10} /> Basic Info
                        </p>
                        <dl className="space-y-1">
                          <div className="flex gap-1">
                            <dt className="text-xs text-gray-400 w-16 shrink-0">
                              Mobile:
                            </dt>
                            <dd className="text-xs font-medium text-gray-700">
                              {user.mobile}
                            </dd>
                          </div>
                          <div className="flex gap-1">
                            <dt className="text-xs text-gray-400 w-16 shrink-0">
                              Email:
                            </dt>
                            <dd className="text-xs font-medium text-gray-700 break-all">
                              {user.email}
                            </dd>
                          </div>
                          <div className="flex gap-1">
                            <dt className="text-xs text-gray-400 w-16 shrink-0">
                              Role:
                            </dt>
                            <dd className="text-xs font-medium text-gray-700 capitalize">
                              {user.role}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Personal Details */}
                      <div className="bg-orange-50 rounded-lg p-3">
                        <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-2">
                          Personal Details
                        </p>
                        <dl className="space-y-1">
                          {user.fatherName && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-16 shrink-0">
                                Father:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.fatherName}
                              </dd>
                            </div>
                          )}
                          {user.dob && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-16 shrink-0">
                                DOB:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.dob}
                              </dd>
                            </div>
                          )}
                          {user.gender && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-16 shrink-0">
                                Gender:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.gender}
                              </dd>
                            </div>
                          )}
                          {user.address && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-16 shrink-0">
                                Address:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.address}
                              </dd>
                            </div>
                          )}
                          {user.district && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-16 shrink-0">
                                District:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.district}
                              </dd>
                            </div>
                          )}
                          {user.state && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-16 shrink-0">
                                State:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.state}
                              </dd>
                            </div>
                          )}
                          {user.pincode && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-16 shrink-0">
                                Pincode:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.pincode}
                              </dd>
                            </div>
                          )}
                          {!user.fatherName && !user.dob && !user.gender && (
                            <p className="text-xs text-gray-400 italic">
                              Not provided
                            </p>
                          )}
                        </dl>
                      </div>

                      {/* KYC Details */}
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <CreditCard size={10} /> KYC Details
                        </p>
                        <dl className="space-y-1">
                          {user.aadhaarNumber && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-20 shrink-0">
                                Aadhaar:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700 font-mono">
                                {user.aadhaarNumber.replace(
                                  /(\d{4})(\d{4})(\d{4})/,
                                  "$1 $2 $3",
                                )}
                              </dd>
                            </div>
                          )}
                          {user.panNumber && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-20 shrink-0">
                                PAN:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700 font-mono uppercase">
                                {user.panNumber}
                              </dd>
                            </div>
                          )}
                          {user.nomineeName && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-20 shrink-0">
                                Nominee:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.nomineeName}
                              </dd>
                            </div>
                          )}
                          {user.nomineeRelation && (
                            <div className="flex gap-1">
                              <dt className="text-xs text-gray-400 w-20 shrink-0">
                                Relation:
                              </dt>
                              <dd className="text-xs font-medium text-gray-700">
                                {user.nomineeRelation}
                              </dd>
                            </div>
                          )}
                          {!user.aadhaarNumber && !user.panNumber && (
                            <p className="text-xs text-gray-400 italic">
                              KYC not submitted
                            </p>
                          )}
                        </dl>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ── Other tabs (table layout) ── */}
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                {users.filter((u) => {
                  if (u.role === "admin") return false;
                  if (tab === "all") return true;
                  return u.status === tab;
                }).length === 0 ? (
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
                      {users
                        .filter((u) => {
                          if (u.role === "admin") return false;
                          if (tab === "all") return true;
                          return u.status === tab;
                        })
                        .map((user, idx) => (
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
                            <TableCell className="text-sm">
                              {user.email}
                            </TableCell>
                            <TableCell className="text-sm">
                              {user.mobile}
                            </TableCell>
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
        ))}
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
