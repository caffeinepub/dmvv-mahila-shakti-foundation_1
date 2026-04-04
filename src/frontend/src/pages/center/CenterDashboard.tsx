import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  AttendanceRecord,
  MemberRecord,
  Order,
  ProductionEntry,
} from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import {
  BarChart2,
  Boxes,
  CalendarCheck,
  Factory,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type CenterNavKey =
  | "dashboard"
  | "members"
  | "attendance"
  | "production"
  | "salary"
  | "orders"
  | "shipping"
  | "business"
  | "products";

const ALL_CENTER_NAV: {
  label: string;
  key: CenterNavKey;
  icon: React.ElementType;
}[] = [
  { label: "Dashboard", key: "dashboard", icon: BarChart2 },
  { label: "Members", key: "members", icon: Users },
  { label: "Attendance", key: "attendance", icon: CalendarCheck },
  { label: "Production", key: "production", icon: Factory },
  { label: "Salary", key: "salary", icon: Boxes },
  { label: "Orders", key: "orders", icon: ShoppingCart },
  { label: "Shipping", key: "shipping", icon: Truck },
  { label: "Business", key: "business", icon: BarChart2 },
  { label: "Products", key: "products", icon: Package },
];

function getAccessibleCenterSections(
  designation: string | undefined,
  role: string,
): CenterNavKey[] {
  const des = designation || "";
  if (role === "admin" || des.toLowerCase().includes("manager")) {
    return ALL_CENTER_NAV.map((n) => n.key);
  }
  if (des.toLowerCase().includes("operator")) {
    return ["dashboard", "members", "attendance", "production"];
  }
  return [
    "dashboard",
    "members",
    "attendance",
    "production",
    "salary",
    "orders",
    "business",
  ];
}

export default function CenterDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState<CenterNavKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "center" && currentUser.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  const accessible = getAccessibleCenterSections(
    currentUser.designation,
    currentUser.role,
  );
  const navItems = ALL_CENTER_NAV.filter((n) => accessible.includes(n.key));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div>
            <div className="font-bold text-sm">Center Panel</div>
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
              data-ocid="center_nav.link"
            >
              <item.icon size={15} /> {item.label}
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
            data-ocid="center_nav.close_button"
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
            data-ocid="center.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800">
            {navItems.find((n) => n.key === section)?.label} — Center Panel
          </span>
        </div>
        <main className="flex-1 p-4 md:p-6">
          {section === "dashboard" && <CenterHome />}
          {section === "members" && <CenterMembers />}
          {section === "attendance" && <CenterAttendance />}
          {section === "production" && <CenterProduction />}
          {section === "salary" && <CenterSalary />}
          {section === "orders" && <CenterOrders />}
          {section === "shipping" && <CenterShipping />}
          {section === "business" && <CenterBusiness />}
          {section === "products" && <CenterProducts />}
        </main>
      </div>
    </div>
  );
}

// ─── Dashboard Home ───────────────────────────────────────────────────────────
function CenterHome() {
  const { centers, currentUser, memberRecords, attendanceRecords, orders } =
    useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];

  const cMembers = memberRecords.filter((m) => m.centerId === myCenter?.id);
  const today = new Date().toISOString().split("T")[0];
  const todayAtt = attendanceRecords.filter(
    (a) => a.centerId === myCenter?.id && a.date === today,
  );
  const presentToday = todayAtt.filter((a) => a.present).length;
  const pendingOrders = orders.filter(
    (o) =>
      o.centerId === myCenter?.id &&
      (o.status === "placed" || o.status === "confirmed"),
  ).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Center Overview</h1>
      {myCenter && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Members",
                value: cMembers.length,
                color: "text-blue-600",
              },
              {
                label: "Present Today",
                value: presentToday,
                color: "text-green-600",
              },
              {
                label: "Orders Pending",
                value: pendingOrders,
                color: "text-orange-500",
              },
              {
                label: "Total Orders",
                value: orders.filter((o) => o.centerId === myCenter.id).length,
                color: "text-purple-600",
              },
            ].map((s, i) => (
              <Card key={s.label} data-ocid={`center_dashboard.card.${i + 1}`}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Center Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {(
                  [
                    "Name",
                    "Address",
                    "State",
                    "District",
                    "Block",
                    "Phone",
                  ] as const
                ).map((k, i) => {
                  const vals = [
                    myCenter.name,
                    myCenter.address,
                    myCenter.state,
                    myCenter.district,
                    myCenter.block,
                    myCenter.contactPhone,
                  ];
                  return (
                    <div key={k} className="flex gap-2">
                      <span className="text-gray-500 font-medium w-20">
                        {k}:
                      </span>
                      <span className="text-gray-800">{vals[i]}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// ─── Members CRUD ───────────────────────────────────────────────────────────────
function CenterMembers() {
  const {
    centers,
    currentUser,
    memberRecords,
    addMemberRecord,
    updateMemberRecord,
    deleteMemberRecord,
  } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  const centerId = myCenter?.id || "";

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    role: "",
    salaryGrade: "B" as MemberRecord["salaryGrade"],
    joiningDate: new Date().toISOString().split("T")[0],
    address: "",
    aadhaar: "",
  });

  const members = memberRecords.filter((m) => m.centerId === centerId);

  const resetForm = () => {
    setForm({
      fullName: "",
      mobile: "",
      role: "",
      salaryGrade: "B",
      joiningDate: new Date().toISOString().split("T")[0],
      address: "",
      aadhaar: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.fullName || !form.mobile || !form.role) {
      toast.error("Name, Mobile, and Role are required.");
      return;
    }
    if (editId) {
      updateMemberRecord(editId, { ...form });
      toast.success("Member updated!");
    } else {
      addMemberRecord({
        id: `mr_${Date.now()}`,
        centerId,
        ...form,
        status: "active",
      });
      toast.success("Member added!");
    }
    resetForm();
  };

  const startEdit = (m: MemberRecord) => {
    setEditId(m.id);
    setForm({
      fullName: m.fullName,
      mobile: m.mobile,
      role: m.role,
      salaryGrade: m.salaryGrade,
      joiningDate: m.joiningDate,
      address: m.address || "",
      aadhaar: m.aadhaar || "",
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Members</h2>
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
          }}
          data-ocid="center_members.open_modal_button"
        >
          + Add Member
        </Button>
      </div>

      {showForm && (
        <Card data-ocid="center_members.modal">
          <CardHeader>
            <CardTitle className="text-sm">
              {editId ? "Edit Member" : "Add Member"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs">Full Name *</Label>
                <Input
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, fullName: e.target.value }))
                  }
                  data-ocid="center_members.input"
                />
              </div>
              <div>
                <Label className="text-xs">Mobile *</Label>
                <Input
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mobile: e.target.value }))
                  }
                  data-ocid="center_members.input"
                />
              </div>
              <div>
                <Label className="text-xs">Role *</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => setForm((p) => ({ ...p, role: v }))}
                >
                  <SelectTrigger data-ocid="center_members.select">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Tailor",
                      "Embroider",
                      "Computer Operator",
                      "Weaver",
                      "Beauty Expert",
                      "Other",
                    ].map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Salary Grade</Label>
                <Select
                  value={form.salaryGrade}
                  onValueChange={(v) =>
                    setForm((p) => ({
                      ...p,
                      salaryGrade: v as MemberRecord["salaryGrade"],
                    }))
                  }
                >
                  <SelectTrigger data-ocid="center_members.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Grade A — ₹10,000</SelectItem>
                    <SelectItem value="B">Grade B — ₹8,000</SelectItem>
                    <SelectItem value="C">Grade C — ₹6,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Joining Date</Label>
                <Input
                  type="date"
                  value={form.joiningDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, joiningDate: e.target.value }))
                  }
                  data-ocid="center_members.input"
                />
              </div>
              <div>
                <Label className="text-xs">Address</Label>
                <Input
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  data-ocid="center_members.input"
                />
              </div>
              <div>
                <Label className="text-xs">Aadhaar (optional)</Label>
                <Input
                  value={form.aadhaar}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, aadhaar: e.target.value }))
                  }
                  data-ocid="center_members.input"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-ngo-green hover:bg-green-700"
                onClick={handleSave}
                data-ocid="center_members.save_button"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                data-ocid="center_members.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Name",
                    "Mobile",
                    "Role",
                    "Grade",
                    "Status",
                    "Joining",
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
                {members.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="center_members.empty_state"
                    >
                      No members yet. Add your first member.
                    </td>
                  </tr>
                ) : (
                  members.map((m, i) => (
                    <tr
                      key={m.id}
                      className="border-t hover:bg-gray-50"
                      data-ocid={`center_members.row.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-medium">{m.fullName}</td>
                      <td className="px-4 py-3 text-xs">{m.mobile}</td>
                      <td className="px-4 py-3">{m.role}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            m.salaryGrade === "A"
                              ? "bg-yellow-100 text-yellow-700"
                              : m.salaryGrade === "B"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                          }
                        >
                          Grade {m.salaryGrade}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            m.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {m.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs">{m.joiningDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => startEdit(m)}
                            data-ocid={`center_members.edit_button.${i + 1}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs"
                            onClick={() =>
                              updateMemberRecord(m.id, {
                                status:
                                  m.status === "active" ? "inactive" : "active",
                              })
                            }
                            data-ocid={`center_members.toggle.${i + 1}`}
                          >
                            {m.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs text-red-500 hover:text-red-700"
                            onClick={() => {
                              deleteMemberRecord(m.id);
                              toast.success("Member removed.");
                            }}
                            data-ocid={`center_members.delete_button.${i + 1}`}
                          >
                            Del
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

// ─── Attendance ─────────────────────────────────────────────────────────────────
function CenterAttendance() {
  const {
    centers,
    currentUser,
    memberRecords,
    attendanceRecords,
    addAttendanceRecord,
  } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  const centerId = myCenter?.id || "";
  const today = new Date().toISOString().split("T")[0];

  const members = memberRecords.filter(
    (m) => m.centerId === centerId && m.status === "active",
  );
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const handleSubmit = () => {
    for (const m of members) {
      const record: AttendanceRecord = {
        id: `ar_${Date.now()}_${m.id}`,
        memberId: m.id,
        memberName: m.fullName,
        centerId,
        date: today,
        present: attendance[m.id] ?? false,
      };
      addAttendanceRecord(record);
    }
    toast.success("Attendance saved!");
    setAttendance({});
  };

  const history = attendanceRecords
    .filter((a) => a.centerId === centerId)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30);

  // Monthly summary
  const monthStr = today.slice(0, 7);
  const monthAtt = attendanceRecords.filter(
    (a) => a.centerId === centerId && a.date.startsWith(monthStr),
  );
  const memberSummary = members.map((m) => {
    const mAtt = monthAtt.filter((a) => a.memberId === m.id);
    const present = mAtt.filter((a) => a.present).length;
    return {
      name: m.fullName,
      total: mAtt.length,
      present,
      absent: mAtt.length - present,
    };
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Mark Attendance — {today}</CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div
              className="text-center py-6 text-gray-400"
              data-ocid="center_attendance.empty_state"
            >
              No active members in this center.
            </div>
          ) : (
            <div className="space-y-2">
              {members.map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  data-ocid={`center_attendance.row.${i + 1}`}
                >
                  <div>
                    <div className="font-medium text-sm">{m.fullName}</div>
                    <div className="text-xs text-gray-500">{m.role}</div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-green-600"
                      checked={attendance[m.id] ?? false}
                      onChange={(e) =>
                        setAttendance((prev) => ({
                          ...prev,
                          [m.id]: e.target.checked,
                        }))
                      }
                      data-ocid={`center_attendance.checkbox.${i + 1}`}
                    />
                    <span
                      className={`text-sm font-medium ${attendance[m.id] ? "text-green-600" : "text-red-500"}`}
                    >
                      {attendance[m.id] ? "Present" : "Absent"}
                    </span>
                  </label>
                </div>
              ))}
              <Button
                className="bg-ngo-green hover:bg-green-700 w-full mt-2"
                onClick={handleSubmit}
                data-ocid="center_attendance.submit_button"
              >
                Submit Attendance
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Monthly Summary — {monthStr}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Member", "Recorded Days", "Present", "Absent"].map((h) => (
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
                {memberSummary.map((s, i) => (
                  <tr
                    key={s.name}
                    className="border-t"
                    data-ocid={`center_attendance.item.${i + 1}`}
                  >
                    <td className="px-4 py-2">{s.name}</td>
                    <td className="px-4 py-2">{s.total}</td>
                    <td className="px-4 py-2 text-green-600 font-medium">
                      {s.present}
                    </td>
                    <td className="px-4 py-2 text-red-500 font-medium">
                      {s.absent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Attendance History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Date", "Member", "Status"].map((h) => (
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
                {history.map((a, i) => (
                  <tr
                    key={a.id}
                    className="border-t"
                    data-ocid={`center_attendance.row.${i + 1}`}
                  >
                    <td className="px-4 py-2">{a.date}</td>
                    <td className="px-4 py-2">{a.memberName}</td>
                    <td className="px-4 py-2">
                      <Badge
                        className={
                          a.present
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {a.present ? "Present" : "Absent"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Production ─────────────────────────────────────────────────────────────────
function CenterProduction() {
  const {
    centers,
    currentUser,
    memberRecords,
    productionEntries,
    addProductionEntry,
  } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  const centerId = myCenter?.id || "";
  const members = memberRecords.filter((m) => m.centerId === centerId);

  const [form, setForm] = useState({
    memberId: "",
    productName: "",
    unitsProduced: "",
    qualityCheck: "pending" as ProductionEntry["qualityCheck"],
    date: new Date().toISOString().split("T")[0],
    remarks: "",
  });

  const handleAdd = () => {
    if (!form.memberId || !form.productName || !form.unitsProduced) {
      toast.error("Fill all required fields.");
      return;
    }
    const member = members.find((m) => m.id === form.memberId);
    addProductionEntry({
      id: `pe_${Date.now()}`,
      centerId,
      memberId: form.memberId,
      memberName: member?.fullName || "",
      productName: form.productName,
      unitsProduced: Number(form.unitsProduced),
      qualityCheck: form.qualityCheck,
      date: form.date,
      remarks: form.remarks,
    });
    toast.success("Production entry added!");
    setForm((p) => ({
      ...p,
      memberId: "",
      productName: "",
      unitsProduced: "",
      remarks: "",
    }));
  };

  const entries = productionEntries.filter((e) => e.centerId === centerId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Add Production Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs">Member</Label>
              <Select
                value={form.memberId}
                onValueChange={(v) => setForm((p) => ({ ...p, memberId: v }))}
              >
                <SelectTrigger data-ocid="center_production.select">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Product Name</Label>
              <Input
                value={form.productName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, productName: e.target.value }))
                }
                data-ocid="center_production.input"
              />
            </div>
            <div>
              <Label className="text-xs">Units</Label>
              <Input
                type="number"
                value={form.unitsProduced}
                onChange={(e) =>
                  setForm((p) => ({ ...p, unitsProduced: e.target.value }))
                }
                data-ocid="center_production.input"
              />
            </div>
            <div>
              <Label className="text-xs">Quality Check</Label>
              <Select
                value={form.qualityCheck}
                onValueChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    qualityCheck: v as ProductionEntry["qualityCheck"],
                  }))
                }
              >
                <SelectTrigger data-ocid="center_production.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pass">Pass</SelectItem>
                  <SelectItem value="fail">Fail</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((p) => ({ ...p, date: e.target.value }))
                }
                data-ocid="center_production.input"
              />
            </div>
            <div>
              <Label className="text-xs">Remarks</Label>
              <Input
                value={form.remarks}
                onChange={(e) =>
                  setForm((p) => ({ ...p, remarks: e.target.value }))
                }
                data-ocid="center_production.input"
              />
            </div>
          </div>
          <Button
            className="bg-ngo-green hover:bg-green-700 mt-4"
            onClick={handleAdd}
            data-ocid="center_production.submit_button"
          >
            Add Entry
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Production Log</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Date",
                    "Member",
                    "Product",
                    "Units",
                    "Quality",
                    "Remarks",
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
                {entries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="center_production.empty_state"
                    >
                      No entries yet.
                    </td>
                  </tr>
                ) : (
                  entries.map((e, i) => (
                    <tr
                      key={e.id}
                      className="border-t"
                      data-ocid={`center_production.row.${i + 1}`}
                    >
                      <td className="px-4 py-2">{e.date}</td>
                      <td className="px-4 py-2">{e.memberName}</td>
                      <td className="px-4 py-2">{e.productName}</td>
                      <td className="px-4 py-2 font-medium">
                        {e.unitsProduced}
                      </td>
                      <td className="px-4 py-2">
                        <Badge
                          className={
                            e.qualityCheck === "pass"
                              ? "bg-green-100 text-green-700"
                              : e.qualityCheck === "fail"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {e.qualityCheck}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-500">
                        {e.remarks || "—"}
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

// ─── Salary ───────────────────────────────────────────────────────────────────
function CenterSalary() {
  const { centers, currentUser, memberRecords, attendanceRecords } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  const centerId = myCenter?.id || "";
  const today = new Date().toISOString().split("T")[0];
  const [selectedMonth, setSelectedMonth] = useState(today.slice(0, 7));
  const [paidStatus, setPaidStatus] = useState<Record<string, boolean>>({});

  const GRADE_SALARY: Record<string, number> = { A: 10000, B: 8000, C: 6000 };
  const WORKING_DAYS = 26;

  const members = memberRecords.filter((m) => m.centerId === centerId);
  const monthAttendance = attendanceRecords.filter(
    (a) => a.centerId === centerId && a.date.startsWith(selectedMonth),
  );

  const salaryRows = members.map((m) => {
    const base = GRADE_SALARY[m.salaryGrade] || 6000;
    const mAtt = monthAttendance.filter((a) => a.memberId === m.id);
    const presentDays = mAtt.filter((a) => a.present).length || WORKING_DAYS;
    const gross = Math.round(base * (presentDays / WORKING_DAYS));
    return {
      ...m,
      base,
      presentDays,
      gross,
      isPaid: paidStatus[m.id] || false,
    };
  });

  const markAllPaid = () => {
    const updated: Record<string, boolean> = {};
    for (const m of members) {
      updated[m.id] = true;
    }
    setPaidStatus((prev) => ({ ...prev, ...updated }));
    toast.success("All salaries marked as paid!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Label className="text-xs">Month:</Label>
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-40"
            data-ocid="center_salary.input"
          />
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={markAllPaid}
          data-ocid="center_salary.primary_button"
        >
          Mark All Paid
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Member",
                    "Grade",
                    "Base Salary",
                    "Working Days",
                    "Present Days",
                    "Gross Salary",
                    "Status",
                    "Action",
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
                {salaryRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="center_salary.empty_state"
                    >
                      No members to show salary.
                    </td>
                  </tr>
                ) : (
                  salaryRows.map((s, i) => (
                    <tr
                      key={s.id}
                      className="border-t"
                      data-ocid={`center_salary.row.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-medium">{s.fullName}</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-blue-100 text-blue-700">
                          Grade {s.salaryGrade}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">₹{s.base.toLocaleString()}</td>
                      <td className="px-4 py-3">{WORKING_DAYS}</td>
                      <td className="px-4 py-3">{s.presentDays}</td>
                      <td className="px-4 py-3 font-bold text-green-700">
                        ₹{s.gross.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            s.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {s.isPaid ? "Paid" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() =>
                            setPaidStatus((prev) => ({
                              ...prev,
                              [s.id]: !s.isPaid,
                            }))
                          }
                          data-ocid={`center_salary.toggle.${i + 1}`}
                        >
                          {s.isPaid ? "Mark Pending" : "Mark Paid"}
                        </Button>
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

// ─── Orders ───────────────────────────────────────────────────────────────────
function CenterOrders() {
  const { orders, updateOrder, centers, currentUser } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  const myOrders = orders.filter(
    (o) => !myCenter || o.centerId === myCenter?.id || o.status === "placed",
  );

  const statusColors: Record<Order["status"], string> = {
    placed: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Orders</h2>
      {myOrders.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400 bg-white rounded-xl"
          data-ocid="center_orders.empty_state"
        >
          No orders found.
        </div>
      ) : (
        <div className="space-y-3">
          {myOrders.map((order, i) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-4"
              data-ocid={`center_orders.row.${i + 1}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-gray-900">
                    {order.userName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.userMobile} • {order.placedAt}
                  </div>
                  <div className="text-sm mt-1">
                    {order.items
                      .map((it) => `${it.productName} ×${it.quantity}`)
                      .join(", ")}
                  </div>
                  <div className="font-bold text-green-700 mt-1">
                    Total: ₹{order.totalAmount}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                  {order.status === "placed" && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-xs h-7"
                      onClick={() => {
                        updateOrder(order.id, { status: "confirmed" });
                        toast.success("Order confirmed!");
                      }}
                      data-ocid={`center_orders.confirm_button.${i + 1}`}
                    >
                      Confirm
                    </Button>
                  )}
                  {order.status === "confirmed" && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-xs h-7"
                      onClick={() => {
                        updateOrder(order.id, { status: "shipped" });
                        toast.success("Order marked shipped!");
                      }}
                      data-ocid={`center_orders.confirm_button.${i + 1}`}
                    >
                      Mark Shipped
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Shipping ───────────────────────────────────────────────────────────────────
function CenterShipping() {
  const { orders, centers, currentUser } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  const shipped = orders.filter(
    (o) =>
      (o.centerId === myCenter?.id || !myCenter) &&
      (o.status === "shipped" || o.status === "delivered"),
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Tracker</h2>
      {shipped.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400 bg-white rounded-xl"
          data-ocid="center_shipping.empty_state"
        >
          No shipped orders yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Address",
                  "Items",
                  "Total",
                  "Status",
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
              {shipped.map((o, i) => (
                <tr
                  key={o.id}
                  className="border-t"
                  data-ocid={`center_shipping.row.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {o.id.slice(-6)}
                  </td>
                  <td className="px-4 py-3">
                    {o.userName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {o.userMobile}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-[120px] truncate">
                    {o.userAddress}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {o.items.map((it) => it.productName).join(", ")}
                  </td>
                  <td className="px-4 py-3 font-bold">₹{o.totalAmount}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        o.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }
                    >
                      {o.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Business ───────────────────────────────────────────────────────────────────
function CenterBusiness() {
  const { orders, centers, currentUser, memberRecords } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  const myOrders = orders.filter(
    (o) => !myCenter || o.centerId === myCenter?.id,
  );
  const cMembers = memberRecords.filter((m) => m.centerId === myCenter?.id);

  const delivered = myOrders.filter((o) => o.status === "delivered");
  const totalRevenue = delivered.reduce((s, o) => s + Number(o.totalAmount), 0);
  const monthStr = new Date().toISOString().slice(0, 7);
  const monthOrders = delivered.filter((o) => o.placedAt.startsWith(monthStr));
  const monthRevenue = monthOrders.reduce(
    (s, o) => s + Number(o.totalAmount),
    0,
  );

  const monthlyData = ["Jan", "Feb", "Mar", "Apr"].map((m, i) => ({
    month: m,
    value: [8500, 12000, 15000, monthRevenue][i] || 0,
  }));
  const maxVal = Math.max(...monthlyData.map((d) => d.value), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Orders",
            value: myOrders.length,
            color: "text-blue-600",
          },
          {
            label: "Delivered",
            value: delivered.length,
            color: "text-green-600",
          },
          {
            label: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            color: "text-orange-600",
          },
          {
            label: "Active Members",
            value: cMembers.filter((m) => m.status === "active").length,
            color: "text-purple-600",
          },
        ].map((s, i) => (
          <Card key={s.label} data-ocid={`center_business.card.${i + 1}`}>
            <CardContent className="p-4 text-center">
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Monthly Revenue (2026)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-6 h-36">
            {monthlyData.map((d, i) => {
              const pct = Math.round((d.value / maxVal) * 100);
              return (
                <div
                  key={d.month}
                  className="flex flex-col items-center gap-1"
                  data-ocid={`center_business.chart_point.${i + 1}`}
                >
                  <div className="text-xs text-gray-600">
                    ₹{(d.value / 1000).toFixed(1)}K
                  </div>
                  <div
                    className="w-12 bg-ngo-green rounded-t"
                    style={{ height: `${pct * 1.1}px`, minHeight: "4px" }}
                  />
                  <div className="text-xs text-gray-500">{d.month}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Products ───────────────────────────────────────────────────────────────────
function CenterProducts() {
  const {
    products,
    centers,
    currentUser,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  const centerId = myCenter?.id || "";

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const myProducts = products.filter(
    (p) => p.centerId === centerId || !p.centerId,
  );

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error("Name and price required.");
      return;
    }
    if (editId) {
      updateProduct(editId, {
        name: form.name,
        description: form.description,
        price: form.price,
        category: form.category,
        stock: Number(form.stock),
      });
      toast.success("Product updated!");
    } else {
      addProduct({
        id: `p_${Date.now()}`,
        name: form.name,
        description: form.description,
        price: form.price,
        category: form.category,
        stock: Number(form.stock),
        isActive: true,
        centerId,
        centerName: myCenter?.name || "",
      });
      toast.success("Product added!");
    }
    setShowForm(false);
    setEditId(null);
    setForm({ name: "", description: "", price: "", category: "", stock: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Products</h2>
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
          }}
          data-ocid="center_products.open_modal_button"
        >
          + Add Product
        </Button>
      </div>

      {showForm && (
        <Card data-ocid="center_products.modal">
          <CardHeader>
            <CardTitle className="text-sm">
              {editId ? "Edit Product" : "Add Product"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs">Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="center_products.input"
                />
              </div>
              <div>
                <Label className="text-xs">Price (₹)</Label>
                <Input
                  value={form.price}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, price: e.target.value }))
                  }
                  data-ocid="center_products.input"
                />
              </div>
              <div>
                <Label className="text-xs">Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  data-ocid="center_products.input"
                />
              </div>
              <div>
                <Label className="text-xs">Stock</Label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, stock: e.target.value }))
                  }
                  data-ocid="center_products.input"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs">Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  data-ocid="center_products.input"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-ngo-green hover:bg-green-700"
                onClick={handleSave}
                data-ocid="center_products.save_button"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
                data-ocid="center_products.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myProducts.length === 0 ? (
          <div
            className="col-span-3 text-center py-12 text-gray-400 bg-white rounded-xl"
            data-ocid="center_products.empty_state"
          >
            No products found.
          </div>
        ) : (
          myProducts.map((p, i) => (
            <Card key={p.id} data-ocid={`center_products.card.${i + 1}`}>
              <CardContent className="p-4">
                <div className="font-bold text-gray-900">{p.name}</div>
                <div className="text-xs text-gray-500 mt-1">{p.category}</div>
                <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {p.description}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="font-bold text-green-700">₹{p.price}</div>
                  <Badge className="bg-blue-100 text-blue-700">
                    Stock: {p.stock}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7"
                    onClick={() => {
                      setEditId(p.id);
                      setForm({
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        category: p.category || "",
                        stock: String(p.stock),
                      });
                      setShowForm(true);
                    }}
                    data-ocid={`center_products.edit_button.${i + 1}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 text-red-500 hover:text-red-700"
                    onClick={() => {
                      deleteProduct(p.id);
                      toast.success("Product deleted.");
                    }}
                    data-ocid={`center_products.delete_button.${i + 1}`}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
