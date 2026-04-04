import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type {
  LeaveRequest,
  PayrollRecord,
  TrainingEnrollment,
  User,
} from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  DollarSign,
  LogOut,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type HRNavKey =
  | "overview"
  | "staff"
  | "payroll"
  | "hrattendance"
  | "leaves"
  | "kyc"
  | "hrtraining";

const ALL_HR_NAV: { label: string; key: HRNavKey; icon: React.ElementType }[] =
  [
    { label: "Overview", key: "overview", icon: ClipboardList },
    { label: "Staff Management", key: "staff", icon: Users },
    { label: "Payroll System", key: "payroll", icon: DollarSign },
    { label: "Attendance", key: "hrattendance", icon: CalendarCheck },
    { label: "Leave Management", key: "leaves", icon: BookOpen },
    { label: "KYC Verification", key: "kyc", icon: ShieldCheck },
    { label: "Training", key: "hrtraining", icon: BookOpen },
  ];

function getAccessibleHRSections(
  designation: string | undefined,
  role: string,
): HRNavKey[] {
  const desig = (designation || "").toLowerCase();
  if (role === "admin" || desig.includes("manager")) {
    return ALL_HR_NAV.map((n) => n.key);
  }
  if (desig.includes("executive")) {
    return ["overview", "staff", "kyc", "leaves", "hrtraining"];
  }
  if (desig.includes("assistant")) {
    return ["overview", "staff", "kyc"];
  }
  return ["overview", "staff", "kyc", "leaves", "payroll"];
}

export default function HRDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState<HRNavKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "hr" && currentUser.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  const accessible = getAccessibleHRSections(
    currentUser.designation,
    currentUser.role,
  );
  const navItems = ALL_HR_NAV.filter((n) => accessible.includes(n.key));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div>
            <div className="font-bold text-sm">HR Panel</div>
            <div className="text-xs text-green-300">{currentUser.fullName}</div>
            {currentUser.designation && (
              <div className="text-xs text-green-400 mt-0.5">
                {currentUser.designation}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.key}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                section === item.key
                  ? "bg-green-700 font-semibold"
                  : "text-green-200 hover:bg-green-700"
              }`}
              onClick={() => {
                setSection(item.key);
                setSidebarOpen(false);
              }}
              data-ocid="hr_nav.link"
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-green-700">
          <Button
            variant="ghost"
            className="w-full text-red-300 hover:text-red-100 hover:bg-red-900/30 justify-start"
            onClick={() => {
              setCurrentUser(null);
              navigate("/");
            }}
            data-ocid="hr_nav.close_button"
          >
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden w-full"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-64 flex flex-col">
        <div className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-ocid="hr.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800">
            {navItems.find((n) => n.key === section)?.label} — HR Panel
          </span>
        </div>
        <main className="flex-1 p-4 md:p-6">
          {section === "overview" && <HROverview setSection={setSection} />}
          {section === "staff" && <StaffManagement />}
          {section === "payroll" && <PayrollSystem />}
          {section === "hrattendance" && <HRAttendance />}
          {section === "leaves" && <LeaveManagement />}
          {section === "kyc" && <KYCVerification />}
          {section === "hrtraining" && <TrainingManagement />}
        </main>
      </div>
    </div>
  );
}

// ─── Overview ────────────────────────────────────────────────────────────────
function HROverview({ setSection }: { setSection: (s: HRNavKey) => void }) {
  const { users, payrollRecords, kycs, leaveRequests, trainingEnrollments } =
    useApp();

  const totalStaff = users.filter(
    (u) => u.role !== "admin" && u.status === "approved",
  ).length;
  const currentMonth = new Date().toISOString().slice(0, 7);
  const payrollThisMonth = payrollRecords.filter(
    (p) => p.month === currentMonth,
  ).length;
  const pendingKYC = kycs.filter((k) => k.status === "pending").length;
  const pendingLeaves = leaveRequests.filter(
    (l) => l.status === "pending",
  ).length;
  const activeTraining = trainingEnrollments.filter(
    (e) => e.status === "enrolled",
  ).length;

  const recent5Payroll = [...payrollRecords]
    .sort((a, b) => b.generatedAt.localeCompare(a.generatedAt))
    .slice(0, 5);

  const statusColors: Record<PayrollRecord["status"], string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    paid: "bg-green-100 text-green-700",
    hold: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Staff", value: totalStaff, color: "text-blue-600" },
          {
            label: "Payroll This Month",
            value: payrollThisMonth,
            color: "text-green-600",
          },
          { label: "Pending KYC", value: pendingKYC, color: "text-orange-600" },
          {
            label: "Pending Leaves",
            value: pendingLeaves,
            color: "text-red-600",
          },
          {
            label: "Training Active",
            value: activeTraining,
            color: "text-purple-600",
          },
        ].map((s, i) => (
          <Card key={s.label} data-ocid={`hr_overview.card.${i + 1}`}>
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={() => setSection("payroll")}
          data-ocid="hr_overview.primary_button"
        >
          Generate Payroll
        </Button>
        <Button
          variant="outline"
          onClick={() => setSection("kyc")}
          data-ocid="hr_overview.secondary_button"
        >
          View Pending KYC
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Staff",
                    "Designation",
                    "Month",
                    "Net Salary",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left font-semibold text-gray-600 text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent5Payroll.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-gray-400"
                      data-ocid="hr_overview.empty_state"
                    >
                      No payroll records yet.
                    </td>
                  </tr>
                ) : (
                  recent5Payroll.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-t"
                      data-ocid={`hr_overview.row.${i + 1}`}
                    >
                      <td className="px-4 py-2">{p.staffName}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">
                        {p.staffDesignation}
                      </td>
                      <td className="px-4 py-2">{p.month}</td>
                      <td className="px-4 py-2 font-bold text-green-700">
                        ₹{p.netSalary.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        <Badge className={statusColors[p.status]}>
                          {p.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Staff Management ─────────────────────────────────────────────────────────
function StaffManagement() {
  const { users, addUser, updateUser } = useApp();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "user" as User["role"],
    designation: "",
    accessCode: "",
    password: "User@123",
  });

  const staff = users
    .filter((u) => u.role !== "admin")
    .filter((u) => {
      const q = search.toLowerCase();
      if (filterRole !== "all" && u.role !== filterRole) return false;
      return (
        !q ||
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      mobile: "",
      role: "user",
      designation: "",
      accessCode: "",
      password: "User@123",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.fullName || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    if (editId) {
      updateUser(editId, {
        fullName: form.fullName,
        mobile: form.mobile,
        role: form.role,
        designation: form.designation,
        accessCode: form.accessCode,
      });
      toast.success("Staff updated!");
    } else {
      addUser({
        id: `u_${Date.now()}`,
        ...form,
        status: "approved",
        createdAt: new Date().toISOString().split("T")[0],
        isVerified: true,
        isLoginActive: true,
      });
      toast.success("Staff added!");
    }
    resetForm();
  };

  const profileUser = profileId ? users.find((u) => u.id === profileId) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3">
          <Input
            placeholder="Search by name/email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56"
            data-ocid="hr_staff.search_input"
          />
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-36" data-ocid="hr_staff.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={() => setShowForm(true)}
          data-ocid="hr_staff.open_modal_button"
        >
          + Add Staff
        </Button>
      </div>

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          if (!open) resetForm();
        }}
      >
        <DialogContent className="max-w-lg" data-ocid="hr_staff.dialog">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Staff" : "Add Staff"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Full Name *</Label>
              <Input
                value={form.fullName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fullName: e.target.value }))
                }
                data-ocid="hr_staff.input"
              />
            </div>
            <div>
              <Label className="text-xs">Email *</Label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                data-ocid="hr_staff.input"
              />
            </div>
            <div>
              <Label className="text-xs">Mobile</Label>
              <Input
                value={form.mobile}
                onChange={(e) =>
                  setForm((p) => ({ ...p, mobile: e.target.value }))
                }
                data-ocid="hr_staff.input"
              />
            </div>
            <div>
              <Label className="text-xs">Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, role: v as User["role"] }))
                }
              >
                <SelectTrigger data-ocid="hr_staff.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["user", "center", "supervisor", "transport", "hr"].map(
                    (r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Designation</Label>
              <Input
                value={form.designation}
                onChange={(e) =>
                  setForm((p) => ({ ...p, designation: e.target.value }))
                }
                placeholder="e.g. HR Manager"
                data-ocid="hr_staff.input"
              />
            </div>
            <div>
              <Label className="text-xs">Access Code</Label>
              <Input
                value={form.accessCode}
                onChange={(e) =>
                  setForm((p) => ({ ...p, accessCode: e.target.value }))
                }
                data-ocid="hr_staff.input"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              className="bg-ngo-green hover:bg-green-700"
              onClick={handleSave}
              data-ocid="hr_staff.save_button"
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={resetForm}
              data-ocid="hr_staff.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {profileUser && (
        <Dialog
          open={!!profileUser}
          onOpenChange={(open) => {
            if (!open) setProfileId(null);
          }}
        >
          <DialogContent data-ocid="hr_staff.dialog">
            <DialogHeader>
              <DialogTitle>Staff Profile — {profileUser.fullName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              {[
                ["Email", profileUser.email],
                ["Mobile", profileUser.mobile],
                ["Role", profileUser.role],
                ["Designation", profileUser.designation || "—"],
                ["Status", profileUser.status],
                ["Joined", profileUser.createdAt],
                ["Member ID", profileUser.memberId || "—"],
                ["Access Code", profileUser.accessCode || "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="font-medium text-gray-500 w-28">{k}:</span>
                  <span className="text-gray-800 capitalize">{v}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setProfileId(null)}
              data-ocid="hr_staff.close_button"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Mobile",
                    "Role",
                    "Designation",
                    "Status",
                    "Joined",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold text-gray-600 text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="hr_staff.empty_state"
                    >
                      No staff found.
                    </td>
                  </tr>
                ) : (
                  staff.map((u, i) => (
                    <tr
                      key={u.id}
                      className="border-t hover:bg-gray-50"
                      data-ocid={`hr_staff.row.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-medium">{u.fullName}</td>
                      <td className="px-4 py-3 text-xs">{u.email}</td>
                      <td className="px-4 py-3 text-xs">{u.mobile}</td>
                      <td className="px-4 py-3 capitalize">{u.role}</td>
                      <td className="px-4 py-3 text-xs">
                        {u.designation || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            u.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : u.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {u.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs">{u.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => {
                              setEditId(u.id);
                              setForm({
                                fullName: u.fullName,
                                email: u.email,
                                mobile: u.mobile,
                                role: u.role,
                                designation: u.designation || "",
                                accessCode: u.accessCode || "",
                                password: u.password,
                              });
                              setShowForm(true);
                            }}
                            data-ocid={`hr_staff.edit_button.${i + 1}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs"
                            onClick={() => setProfileId(u.id)}
                            data-ocid={`hr_staff.secondary_button.${i + 1}`}
                          >
                            Profile
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Payroll System ───────────────────────────────────────────────────────────
function PayrollSystem() {
  const { users, payrollRecords, addPayrollRecord, updatePayrollRecord } =
    useApp();
  const today = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(today);
  const [filterStatus, setFilterStatus] = useState<
    "all" | PayrollRecord["status"]
  >("all");
  const [slipRecord, setSlipRecord] = useState<PayrollRecord | null>(null);

  const ROLE_SALARY: Record<string, number> = {
    supervisor: 15000,
    center: 12000,
    hr: 13000,
    transport: 11000,
    user: 8000,
  };

  const generatePayroll = () => {
    const approvedStaff = users.filter(
      (u) => u.role !== "admin" && u.status === "approved",
    );
    const existing = payrollRecords
      .filter((p) => p.month === selectedMonth)
      .map((p) => p.userId);
    let added = 0;
    for (const u of approvedStaff) {
      if (existing.includes(u.id)) continue;
      const basic = ROLE_SALARY[u.role] || 8000;
      const hra = Math.round(basic * 0.2);
      const da = Math.round(basic * 0.1);
      const ta = 500;
      const medical = 300;
      const bonus = 0;
      const gross = basic + hra + da + ta + medical + bonus;
      const pf = Math.round(basic * 0.12);
      const esi = gross < 21000 ? Math.round(gross * 0.0075) : 0;
      const tds = 0;
      const adv = 0;
      const totalDed = pf + esi + tds + adv;
      const net = gross - totalDed;
      addPayrollRecord({
        id: `pay_${Date.now()}_${u.id}`,
        userId: u.id,
        staffName: u.fullName,
        staffDesignation: u.designation || u.role,
        month: selectedMonth,
        basicSalary: basic,
        hra,
        da,
        ta,
        medical,
        bonus,
        grossSalary: gross,
        pfDeduction: pf,
        esiDeduction: esi,
        tdsDeduction: tds,
        advanceDeduction: adv,
        totalDeductions: totalDed,
        netSalary: net,
        status: "pending",
        generatedAt: new Date().toISOString().split("T")[0],
      });
      added++;
    }
    if (added > 0)
      toast.success(`Payroll generated for ${added} staff members!`);
    else toast.info("Payroll already generated for this month.");
  };

  const bulkApprove = () => {
    const pending = payrollRecords.filter(
      (p) => p.month === selectedMonth && p.status === "pending",
    );
    for (const p of pending) {
      updatePayrollRecord(p.id, { status: "approved" });
    }
    toast.success(`${pending.length} payrolls approved!`);
  };

  const monthRecords = payrollRecords.filter((p) => p.month === selectedMonth);
  const filtered =
    filterStatus === "all"
      ? monthRecords
      : monthRecords.filter((p) => p.status === filterStatus);

  const statusColors: Record<PayrollRecord["status"], string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    paid: "bg-green-100 text-green-700",
    hold: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div>
          <Label className="text-xs">Month</Label>
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-40"
            data-ocid="hr_payroll.input"
          />
        </div>
        <Select
          value={filterStatus}
          onValueChange={(v) => setFilterStatus(v as any)}
        >
          <SelectTrigger className="w-36" data-ocid="hr_payroll.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="hold">Hold</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={generatePayroll}
          data-ocid="hr_payroll.primary_button"
        >
          Generate Payroll
        </Button>
        <Button
          variant="outline"
          onClick={bulkApprove}
          data-ocid="hr_payroll.secondary_button"
        >
          Bulk Approve Pending
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Staff",
                    "Designation",
                    "Basic",
                    "Gross",
                    "Deductions",
                    "Net Pay",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left font-semibold text-gray-600 text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="hr_payroll.empty_state"
                    >
                      No payroll records. Click "Generate Payroll" to create.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-t hover:bg-gray-50"
                      data-ocid={`hr_payroll.row.${i + 1}`}
                    >
                      <td className="px-4 py-2 font-medium">{p.staffName}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">
                        {p.staffDesignation}
                      </td>
                      <td className="px-4 py-2">
                        ₹{p.basicSalary.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        ₹{p.grossSalary.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-red-600">
                        ₹{p.totalDeductions.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 font-bold text-green-700">
                        ₹{p.netSalary.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        <Badge className={statusColors[p.status]}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-1 flex-wrap">
                          {p.status === "pending" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-xs h-6"
                              onClick={() => {
                                updatePayrollRecord(p.id, {
                                  status: "approved",
                                });
                                toast.success("Approved!");
                              }}
                              data-ocid={`hr_payroll.confirm_button.${i + 1}`}
                            >
                              Approve
                            </Button>
                          )}
                          {p.status === "approved" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-xs h-6"
                              onClick={() => {
                                updatePayrollRecord(p.id, {
                                  status: "paid",
                                  paidAt: new Date()
                                    .toISOString()
                                    .split("T")[0],
                                });
                                toast.success("Marked Paid!");
                              }}
                              data-ocid={`hr_payroll.confirm_button.${i + 1}`}
                            >
                              Mark Paid
                            </Button>
                          )}
                          {(p.status === "pending" ||
                            p.status === "approved") && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-xs h-6 text-orange-600"
                              onClick={() => {
                                updatePayrollRecord(p.id, { status: "hold" });
                                toast.success("Put on hold.");
                              }}
                              data-ocid={`hr_payroll.secondary_button.${i + 1}`}
                            >
                              Hold
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-6"
                            onClick={() => setSlipRecord(p)}
                            data-ocid={`hr_payroll.edit_button.${i + 1}`}
                          >
                            Payslip
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payslip Modal */}
      {slipRecord && (
        <Dialog
          open={!!slipRecord}
          onOpenChange={(open) => {
            if (!open) setSlipRecord(null);
          }}
        >
          <DialogContent className="max-w-lg" data-ocid="hr_payroll.dialog">
            <DialogHeader>
              <DialogTitle>Payslip — {slipRecord.month}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4" id="payslip-print-area">
              <div className="text-center border-b pb-4">
                <div className="font-bold text-lg">
                  DMVV Bhartiy Mahila Shakti Foundation™
                </div>
                <div className="text-sm text-gray-600">
                  Salary Slip for {slipRecord.month}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Employee:</span>{" "}
                  <strong>{slipRecord.staffName}</strong>
                </div>
                <div>
                  <span className="text-gray-500">Designation:</span>{" "}
                  {slipRecord.staffDesignation}
                </div>
                <div>
                  <span className="text-gray-500">Generated:</span>{" "}
                  {slipRecord.generatedAt}
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>{" "}
                  <Badge
                    className={
                      slipRecord.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {slipRecord.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="font-bold text-xs text-gray-600 mb-2 uppercase">
                    Earnings
                  </div>
                  {[
                    ["Basic Salary", slipRecord.basicSalary],
                    ["HRA", slipRecord.hra],
                    ["DA", slipRecord.da],
                    ["TA", slipRecord.ta],
                    ["Medical", slipRecord.medical],
                    ["Bonus", slipRecord.bonus],
                  ].map(([k, v]) => (
                    <div
                      key={String(k)}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">{k}</span>
                      <span>₹{Number(v).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold border-t mt-2 pt-2">
                    <span>Gross Salary</span>
                    <span className="text-green-700">
                      ₹{slipRecord.grossSalary.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="font-bold text-xs text-gray-600 mb-2 uppercase">
                    Deductions
                  </div>
                  {[
                    ["PF", slipRecord.pfDeduction],
                    ["ESI", slipRecord.esiDeduction],
                    ["TDS", slipRecord.tdsDeduction],
                    ["Advance", slipRecord.advanceDeduction],
                  ].map(([k, v]) => (
                    <div
                      key={String(k)}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">{k}</span>
                      <span className="text-red-600">
                        ₹{Number(v).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold border-t mt-2 pt-2">
                    <span>Total Deductions</span>
                    <span className="text-red-700">
                      ₹{slipRecord.totalDeductions.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-ngo-green text-white rounded-lg p-4 text-center">
                <div className="text-xs">NET PAY</div>
                <div className="text-2xl font-bold">
                  ₹{slipRecord.netSalary.toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-gray-400 text-center border-t pt-2">
                Authorized Signatory — DMVV Foundation HR Department
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                className="bg-ngo-green hover:bg-green-700"
                onClick={() => window.print()}
                data-ocid="hr_payroll.primary_button"
              >
                Print Payslip
              </Button>
              <Button
                variant="outline"
                onClick={() => setSlipRecord(null)}
                data-ocid="hr_payroll.close_button"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// ─── HR Attendance ───────────────────────────────────────────────────────────
function HRAttendance() {
  const { attendanceRecords, centers } = useApp();
  const [filterCenter, setFilterCenter] = useState("all");
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  const filtered = attendanceRecords.filter((a) => {
    if (filterCenter !== "all" && a.centerId !== filterCenter) return false;
    if (fromDate && a.date < fromDate) return false;
    if (toDate && a.date > toDate) return false;
    return true;
  });

  // Summary by member
  const summaryMap: Record<
    string,
    { name: string; center: string; total: number; present: number }
  > = {};
  for (const a of filtered) {
    if (!summaryMap[a.memberId]) {
      const center = centers.find((c) => c.id === a.centerId);
      summaryMap[a.memberId] = {
        name: a.memberName,
        center: center?.name || a.centerId,
        total: 0,
        present: 0,
      };
    }
    summaryMap[a.memberId].total++;
    if (a.present) summaryMap[a.memberId].present++;
  }
  const summary = Object.values(summaryMap);

  const exportText = summary
    .map(
      (s) =>
        `${s.name} | ${s.center} | ${s.total} days | ${s.present} present | ${s.total - s.present} absent | ${s.total > 0 ? Math.round((s.present / s.total) * 100) : 0}%`,
    )
    .join("\n");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={filterCenter} onValueChange={setFilterCenter}>
          <SelectTrigger className="w-52" data-ocid="hr_attendance.select">
            <SelectValue placeholder="Filter by center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Centers</SelectItem>
            {centers.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 items-center">
          <Label className="text-xs">From:</Label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-36"
            data-ocid="hr_attendance.input"
          />
          <Label className="text-xs">To:</Label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-36"
            data-ocid="hr_attendance.input"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Staff Name",
                    "Center",
                    "Total Days",
                    "Present",
                    "Absent",
                    "Attendance %",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold text-gray-600 text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {summary.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="hr_attendance.empty_state"
                    >
                      No attendance records found.
                    </td>
                  </tr>
                ) : (
                  summary.map((s, i) => {
                    const pct =
                      s.total > 0 ? Math.round((s.present / s.total) * 100) : 0;
                    return (
                      <tr
                        key={`hratt-${s.name}-${s.center}`}
                        className="border-t"
                        data-ocid={`hr_attendance.row.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-medium">{s.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {s.center}
                        </td>
                        <td className="px-4 py-3">{s.total}</td>
                        <td className="px-4 py-3 text-green-600 font-medium">
                          {s.present}
                        </td>
                        <td className="px-4 py-3 text-red-500 font-medium">
                          {s.total - s.present}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${pct >= 75 ? "bg-green-500" : "bg-red-400"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {exportText && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xs">
              Export Summary (Copy Text)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {exportText}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Leave Management ──────────────────────────────────────────────────────────
function LeaveManagement() {
  const { leaveRequests, addLeaveRequest, updateLeaveRequest, currentUser } =
    useApp();
  const [filterStatus, setFilterStatus] = useState<
    "all" | LeaveRequest["status"]
  >("all");
  const [showApply, setShowApply] = useState(false);
  const [applyForm, setApplyForm] = useState({
    leaveType: "casual" as LeaveRequest["leaveType"],
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const filtered =
    filterStatus === "all"
      ? leaveRequests
      : leaveRequests.filter((l) => l.status === filterStatus);

  const handleApply = () => {
    if (!applyForm.fromDate || !applyForm.toDate || !applyForm.reason) {
      toast.error("Fill all fields.");
      return;
    }
    const from = new Date(applyForm.fromDate);
    const to = new Date(applyForm.toDate);
    const days = Math.max(
      1,
      Math.round((to.getTime() - from.getTime()) / 86400000) + 1,
    );
    addLeaveRequest({
      id: `lr_${Date.now()}`,
      userId: currentUser?.id || "",
      userName: currentUser?.fullName || "",
      leaveType: applyForm.leaveType,
      fromDate: applyForm.fromDate,
      toDate: applyForm.toDate,
      days,
      reason: applyForm.reason,
      status: "pending",
      appliedAt: new Date().toISOString().split("T")[0],
    });
    toast.success("Leave applied!");
    setShowApply(false);
    setApplyForm({ leaveType: "casual", fromDate: "", toDate: "", reason: "" });
  };

  const statusColors: Record<LeaveRequest["status"], string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  // Leave balance (annual)
  const thisYear = new Date().getFullYear().toString();
  const myLeaves = leaveRequests.filter(
    (l) =>
      l.userId === currentUser?.id &&
      l.appliedAt.startsWith(thisYear) &&
      l.status === "approved",
  );
  const usedCasual = myLeaves
    .filter((l) => l.leaveType === "casual")
    .reduce((s, l) => s + l.days, 0);
  const usedSick = myLeaves
    .filter((l) => l.leaveType === "sick")
    .reduce((s, l) => s + l.days, 0);
  const usedEarned = myLeaves
    .filter((l) => l.leaveType === "earned")
    .reduce((s, l) => s + l.days, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-3">
          <Select
            value={filterStatus}
            onValueChange={(v) => setFilterStatus(v as any)}
          >
            <SelectTrigger className="w-36" data-ocid="hr_leaves.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={() => setShowApply(true)}
          data-ocid="hr_leaves.open_modal_button"
        >
          Apply Leave
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { type: "Casual", total: 12, used: usedCasual },
          { type: "Sick", total: 7, used: usedSick },
          { type: "Earned", total: 15, used: usedEarned },
        ].map((lb, i) => (
          <Card key={lb.type} data-ocid={`hr_leaves.card.${i + 1}`}>
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">{lb.type} Leave</div>
              <div className="font-bold text-lg">
                {lb.total - lb.used}{" "}
                <span className="text-xs font-normal text-gray-500">
                  / {lb.total} remaining
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={showApply}
        onOpenChange={(open) => {
          if (!open) setShowApply(false);
        }}
      >
        <DialogContent data-ocid="hr_leaves.dialog">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Leave Type</Label>
              <Select
                value={applyForm.leaveType}
                onValueChange={(v) =>
                  setApplyForm((p) => ({
                    ...p,
                    leaveType: v as LeaveRequest["leaveType"],
                  }))
                }
              >
                <SelectTrigger data-ocid="hr_leaves.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="sick">Sick</SelectItem>
                  <SelectItem value="earned">Earned</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">From Date</Label>
                <Input
                  type="date"
                  value={applyForm.fromDate}
                  onChange={(e) =>
                    setApplyForm((p) => ({ ...p, fromDate: e.target.value }))
                  }
                  data-ocid="hr_leaves.input"
                />
              </div>
              <div>
                <Label className="text-xs">To Date</Label>
                <Input
                  type="date"
                  value={applyForm.toDate}
                  onChange={(e) =>
                    setApplyForm((p) => ({ ...p, toDate: e.target.value }))
                  }
                  data-ocid="hr_leaves.input"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Reason</Label>
              <Input
                value={applyForm.reason}
                onChange={(e) =>
                  setApplyForm((p) => ({ ...p, reason: e.target.value }))
                }
                data-ocid="hr_leaves.input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-ngo-green hover:bg-green-700"
                onClick={handleApply}
                data-ocid="hr_leaves.submit_button"
              >
                Submit
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowApply(false)}
                data-ocid="hr_leaves.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Staff",
                    "Type",
                    "From",
                    "To",
                    "Days",
                    "Reason",
                    "Status",
                    "Applied",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-semibold text-gray-600 text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="hr_leaves.empty_state"
                    >
                      No leave requests.
                    </td>
                  </tr>
                ) : (
                  filtered.map((l, i) => (
                    <tr
                      key={l.id}
                      className="border-t hover:bg-gray-50"
                      data-ocid={`hr_leaves.row.${i + 1}`}
                    >
                      <td className="px-3 py-2 font-medium">{l.userName}</td>
                      <td className="px-3 py-2 capitalize">{l.leaveType}</td>
                      <td className="px-3 py-2 text-xs">{l.fromDate}</td>
                      <td className="px-3 py-2 text-xs">{l.toDate}</td>
                      <td className="px-3 py-2">{l.days}</td>
                      <td className="px-3 py-2 text-xs text-gray-500 max-w-[120px] truncate">
                        {l.reason}
                      </td>
                      <td className="px-3 py-2">
                        <Badge className={statusColors[l.status]}>
                          {l.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-2 text-xs">{l.appliedAt}</td>
                      <td className="px-3 py-2">
                        {l.status === "pending" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-xs h-6"
                              onClick={() => {
                                updateLeaveRequest(l.id, {
                                  status: "approved",
                                  hrRemark: "Approved by HR",
                                });
                                toast.success("Leave approved!");
                              }}
                              data-ocid={`hr_leaves.confirm_button.${i + 1}`}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 hover:bg-red-600 text-xs h-6"
                              onClick={() => {
                                updateLeaveRequest(l.id, {
                                  status: "rejected",
                                  hrRemark: "Rejected by HR",
                                });
                                toast.success("Leave rejected.");
                              }}
                              data-ocid={`hr_leaves.delete_button.${i + 1}`}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── KYC Verification ───────────────────────────────────────────────────────────
function KYCVerification() {
  const { users, kycs, updateKYC } = useApp();
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const filtered =
    filterStatus === "all"
      ? kycs
      : kycs.filter((k) => k.status === filterStatus);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        {(["all", "pending", "approved", "rejected"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filterStatus === s ? "default" : "outline"}
            className={filterStatus === s ? "bg-ngo-green" : ""}
            onClick={() => setFilterStatus(s)}
            data-ocid="hr_kyc.tab"
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}{" "}
            {s === "pending"
              ? `(${kycs.filter((k) => k.status === "pending").length})`
              : ""}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="hr_kyc.empty_state"
        >
          No KYC records found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((kyc, i) => {
            const user = users.find((u) => u.id === kyc.userId);
            return (
              <Card key={kyc.id} data-ocid={`hr_kyc.row.${i + 1}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">
                        {user?.fullName || "Unknown"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user?.email} | Submitted: {kyc.submittedAt}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Bank: {kyc.bankName} | A/C: {kyc.accountNumber} | IFSC:{" "}
                        {kyc.ifscCode}
                      </div>
                      {kyc.adminRemark && (
                        <div className="text-xs text-blue-600 mt-1">
                          Remark: {kyc.adminRemark}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge className={statusColors[kyc.status]}>
                        {kyc.status}
                      </Badge>
                      {kyc.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs h-7"
                            onClick={() => {
                              updateKYC(kyc.id, {
                                status: "approved",
                                adminRemark: "Verified by HR",
                              });
                              toast.success("KYC approved!");
                            }}
                            data-ocid="hr_kyc.confirm_button"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-xs h-7"
                            onClick={() => {
                              updateKYC(kyc.id, {
                                status: "rejected",
                                adminRemark: "Rejected by HR",
                              });
                              toast.success("KYC rejected.");
                            }}
                            data-ocid="hr_kyc.delete_button"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Training Management ─────────────────────────────────────────────────────────
function TrainingManagement() {
  const {
    trainingPrograms,
    trainingEnrollments,
    addTrainingProgram,
    updateTrainingProgram,
    deleteTrainingProgram,
  } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [expandId, setExpandId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    eligibility: "",
    certification: "",
    description: "",
    isActive: true,
    color: "bg-green-50 border-green-200",
    image: "",
    outcomes: [] as string[],
  });

  const resetForm = () => {
    setForm({
      title: "",
      duration: "",
      eligibility: "",
      certification: "",
      description: "",
      isActive: true,
      color: "bg-green-50 border-green-200",
      image: "",
      outcomes: [],
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.title) {
      toast.error("Title is required.");
      return;
    }
    if (editId) {
      updateTrainingProgram(editId, {
        title: form.title,
        duration: form.duration,
        eligibility: form.eligibility,
        certification: form.certification,
        description: form.description,
        isActive: form.isActive,
      });
      toast.success("Program updated!");
    } else {
      addTrainingProgram({ id: `tp_${Date.now()}`, ...form });
      toast.success("Program added!");
    }
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Training Programs</h2>
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={() => setShowForm(true)}
          data-ocid="hr_training.open_modal_button"
        >
          + Add Program
        </Button>
      </div>

      {showForm && (
        <Card data-ocid="hr_training.modal">
          <CardHeader>
            <CardTitle className="text-sm">
              {editId ? "Edit Program" : "Add Program"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  data-ocid="hr_training.input"
                />
              </div>
              <div>
                <Label className="text-xs">Duration</Label>
                <Input
                  value={form.duration}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, duration: e.target.value }))
                  }
                  placeholder="e.g. 3 Months"
                  data-ocid="hr_training.input"
                />
              </div>
              <div>
                <Label className="text-xs">Eligibility</Label>
                <Input
                  value={form.eligibility}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, eligibility: e.target.value }))
                  }
                  data-ocid="hr_training.input"
                />
              </div>
              <div>
                <Label className="text-xs">Certification</Label>
                <Input
                  value={form.certification}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, certification: e.target.value }))
                  }
                  data-ocid="hr_training.input"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs">Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  data-ocid="hr_training.textarea"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-ngo-green hover:bg-green-700"
                onClick={handleSave}
                data-ocid="hr_training.save_button"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                data-ocid="hr_training.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {trainingPrograms.length === 0 ? (
          <div
            className="text-center py-12 text-gray-400"
            data-ocid="hr_training.empty_state"
          >
            No training programs.
          </div>
        ) : (
          trainingPrograms.map((tp, i) => {
            const enrollments = trainingEnrollments.filter(
              (e: TrainingEnrollment) => e.programId === tp.id,
            );
            const isExpanded = expandId === tp.id;
            return (
              <Card key={tp.id} data-ocid={`hr_training.card.${i + 1}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{tp.title}</div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        {tp.duration} | {tp.eligibility} | {tp.certification}
                      </div>
                      {tp.description && (
                        <div className="text-sm text-gray-600 mt-1">
                          {tp.description}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge
                        className={
                          tp.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      >
                        {tp.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => {
                            setEditId(tp.id);
                            setForm({
                              title: tp.title,
                              duration: tp.duration,
                              eligibility: tp.eligibility,
                              certification: tp.certification,
                              description: tp.description,
                              isActive: tp.isActive,
                              color: tp.color,
                              image: tp.image,
                              outcomes: tp.outcomes,
                            });
                            setShowForm(true);
                          }}
                          data-ocid={`hr_training.edit_button.${i + 1}`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs"
                          onClick={() => setExpandId(isExpanded ? null : tp.id)}
                          data-ocid={`hr_training.toggle.${i + 1}`}
                        >
                          Enrollments ({enrollments.length})
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs text-red-500 hover:text-red-700"
                          onClick={() => {
                            deleteTrainingProgram(tp.id);
                            toast.success("Program deleted.");
                          }}
                          data-ocid={`hr_training.delete_button.${i + 1}`}
                        >
                          Del
                        </Button>
                      </div>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-4 border-t pt-3">
                      <div className="font-medium text-xs text-gray-600 mb-2">
                        Enrollments
                      </div>
                      {enrollments.length === 0 ? (
                        <div className="text-xs text-gray-400">
                          No enrollments yet.
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {enrollments.map(
                            (e: TrainingEnrollment, j: number) => (
                              <div
                                key={e.id}
                                className="flex items-center justify-between text-xs py-1 border-b last:border-0"
                                data-ocid={`hr_training.item.${j + 1}`}
                              >
                                <span className="font-medium">
                                  {e.userName}
                                </span>
                                <Badge
                                  className={
                                    e.status === "enrolled"
                                      ? "bg-blue-100 text-blue-700"
                                      : e.status === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                  }
                                >
                                  {e.status}
                                </Badge>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
