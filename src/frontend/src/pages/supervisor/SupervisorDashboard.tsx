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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AttendanceRecord,
  MachineRecord,
  ProductionEntry,
  SupervisorReport,
} from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import {
  AlertTriangle,
  BarChart2,
  Building2,
  CalendarCheck,
  ClipboardList,
  Cog,
  Factory,
  LogOut,
  Menu,
  MessageSquare,
  Target,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type NavKey =
  | "overview"
  | "centers"
  | "members"
  | "attendance"
  | "production"
  | "machines"
  | "reports"
  | "targets"
  | "complaints";

const ALL_NAV_ITEMS: { label: string; key: NavKey; icon: React.ElementType }[] =
  [
    { label: "Overview", key: "overview", icon: BarChart2 },
    { label: "Center Management", key: "centers", icon: Building2 },
    { label: "Members Overview", key: "members", icon: Users },
    { label: "Attendance", key: "attendance", icon: CalendarCheck },
    { label: "Production Tracking", key: "production", icon: Factory },
    { label: "Machines & Equipment", key: "machines", icon: Cog },
    { label: "Reports", key: "reports", icon: ClipboardList },
    { label: "Targets & Performance", key: "targets", icon: Target },
    { label: "Complaints & Issues", key: "complaints", icon: AlertTriangle },
  ];

function getAccessibleSections(
  designation: string | undefined,
  role: string,
): NavKey[] {
  const des = designation || "";
  if (
    role === "admin" ||
    des.toLowerCase().includes("senior") ||
    des.toLowerCase().includes("head")
  ) {
    return ALL_NAV_ITEMS.map((n) => n.key);
  }
  if (
    des.toLowerCase().includes("sub") ||
    des.toLowerCase().includes("field")
  ) {
    return ["overview", "attendance", "production", "reports"];
  }
  return [
    "overview",
    "members",
    "attendance",
    "production",
    "machines",
    "reports",
    "complaints",
  ];
}

export default function SupervisorDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState<NavKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "supervisor" && currentUser.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  const accessible = getAccessibleSections(
    currentUser.designation,
    currentUser.role,
  );
  const navItems = ALL_NAV_ITEMS.filter((n) => accessible.includes(n.key));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div>
            <div className="font-bold text-sm">Supervisor Panel</div>
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
              data-ocid="supervisor_nav.link"
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
            data-ocid="supervisor.close_button"
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
            data-ocid="supervisor.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800">
            {navItems.find((n) => n.key === section)?.label} — Supervisor Panel
          </span>
        </div>
        <main className="flex-1 p-4 md:p-6">
          {section === "overview" && <OverviewSection />}
          {section === "centers" && <CentersSection />}
          {section === "members" && <MembersSection />}
          {section === "attendance" && <AttendanceSection />}
          {section === "production" && <ProductionSection />}
          {section === "machines" && <MachinesSection />}
          {section === "reports" && <ReportsSection />}
          {section === "targets" && <TargetsSection />}
          {section === "complaints" && <ComplaintsSection />}
        </main>
      </div>
    </div>
  );
}

// ─── Overview ────────────────────────────────────────────────────────────────
function OverviewSection() {
  const {
    centers,
    memberRecords,
    supervisorReports,
    complaintSubmissions,
    productionEntries,
  } = useApp();

  const today = new Date().toISOString().split("T")[0];
  const todayReports = supervisorReports.filter((r) =>
    r.date.startsWith(today),
  ).length;
  const pendingIssues = complaintSubmissions.filter(
    (c) => c.status === "pending",
  ).length;
  const totalProduction = productionEntries.reduce(
    (s, e) => s + e.unitsProduced,
    0,
  );

  const stats = [
    {
      label: "Total Centers",
      value: centers.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Members",
      value: memberRecords.length,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Today's Reports",
      value: todayReports,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Pending Issues",
      value: pendingIssues,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Monthly Production",
      value: totalProduction,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const recentReports = [...supervisorReports]
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <Card key={s.label} data-ocid={`supervisor_overview.card.${i + 1}`}>
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Supervisor",
                    "Center",
                    "Type",
                    "Date",
                    "Present",
                    "Production",
                    "Issues",
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
                {recentReports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="supervisor_reports.empty_state"
                    >
                      No reports submitted yet.
                    </td>
                  </tr>
                ) : (
                  recentReports.map((r, i) => (
                    <tr
                      key={r.id}
                      className="border-t"
                      data-ocid={`supervisor_overview.row.${i + 1}`}
                    >
                      <td className="px-4 py-2">{r.supervisorName}</td>
                      <td className="px-4 py-2">{r.centerName}</td>
                      <td className="px-4 py-2 capitalize">{r.reportType}</td>
                      <td className="px-4 py-2">{r.date}</td>
                      <td className="px-4 py-2">{r.membersPresent}</td>
                      <td className="px-4 py-2">{r.production} units</td>
                      <td className="px-4 py-2 max-w-[140px] truncate text-xs text-gray-500">
                        {r.issues || "None"}
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

// ─── Centers ─────────────────────────────────────────────────────────────────
function CentersSection() {
  const { centers, memberRecords } = useApp();
  const [search, setSearch] = useState("");

  const filtered = centers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search centers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          data-ocid="supervisor_centers.search_input"
        />
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Center Name",
                    "State",
                    "District",
                    "Block",
                    "Phone",
                    "Members",
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
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="supervisor_centers.empty_state"
                    >
                      No centers found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c, i) => {
                    const memberCount = memberRecords.filter(
                      (m) => m.centerId === c.id,
                    ).length;
                    return (
                      <tr
                        key={c.id}
                        className="border-t hover:bg-gray-50"
                        data-ocid={`supervisor_centers.row.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {c.state}
                        </td>
                        <td className="px-4 py-3 text-xs">{c.district}</td>
                        <td className="px-4 py-3 text-xs">{c.block}</td>
                        <td className="px-4 py-3 text-xs">{c.contactPhone}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{memberCount} members</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            className={
                              c.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {c.isActive ? "Active" : "Inactive"}
                          </Badge>
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
    </div>
  );
}

// ─── Members ─────────────────────────────────────────────────────────────────
function MembersSection() {
  const { memberRecords, centers, updateMemberRecord } = useApp();
  const [filterCenter, setFilterCenter] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = memberRecords.filter((m) => {
    if (filterCenter !== "all" && m.centerId !== filterCenter) return false;
    if (filterStatus !== "all" && m.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={filterCenter} onValueChange={setFilterCenter}>
          <SelectTrigger className="w-44" data-ocid="supervisor_members.select">
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
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-36" data-ocid="supervisor_members.select">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
                    "Center",
                    "Grade",
                    "Status",
                    "Joining Date",
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
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="supervisor_members.empty_state"
                    >
                      No members found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((m, i) => {
                    const center = centers.find((c) => c.id === m.centerId);
                    return (
                      <tr
                        key={m.id}
                        className="border-t hover:bg-gray-50"
                        data-ocid={`supervisor_members.row.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-medium">{m.fullName}</td>
                        <td className="px-4 py-3 text-xs">{m.mobile}</td>
                        <td className="px-4 py-3">{m.role}</td>
                        <td className="px-4 py-3 text-xs">
                          {center?.name || m.centerId}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            className={
                              m.salaryGrade === "A"
                                ? "bg-yellow-100 text-yellow-700"
                                : m.salaryGrade === "B"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
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
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7"
                            onClick={() =>
                              updateMemberRecord(m.id, {
                                status:
                                  m.status === "active" ? "inactive" : "active",
                              })
                            }
                            data-ocid={`supervisor_members.toggle.${i + 1}`}
                          >
                            {m.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
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
    </div>
  );
}

// ─── Attendance ───────────────────────────────────────────────────────────────
function AttendanceSection() {
  const { memberRecords, centers, attendanceRecords, addAttendanceRecord } =
    useApp();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [selectedCenter, setSelectedCenter] = useState(centers[0]?.id || "");
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const centerMembers = memberRecords.filter(
    (m) => m.centerId === selectedCenter && m.status === "active",
  );

  const handleSubmit = () => {
    if (!selectedCenter) return;
    for (const m of centerMembers) {
      const record: AttendanceRecord = {
        id: `ar_${Date.now()}_${m.id}`,
        memberId: m.id,
        memberName: m.fullName,
        centerId: selectedCenter,
        date,
        present: attendance[m.id] ?? false,
      };
      addAttendanceRecord(record);
    }
    toast.success("Attendance submitted successfully!");
    setAttendance({});
  };

  const history = attendanceRecords
    .filter((a) => !selectedCenter || a.centerId === selectedCenter)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-40"
                data-ocid="supervisor_attendance.input"
              />
            </div>
            <div>
              <Label className="text-xs">Center</Label>
              <Select value={selectedCenter} onValueChange={setSelectedCenter}>
                <SelectTrigger
                  className="w-52"
                  data-ocid="supervisor_attendance.select"
                >
                  <SelectValue placeholder="Select center" />
                </SelectTrigger>
                <SelectContent>
                  {centers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {centerMembers.length === 0 ? (
            <div
              className="text-center py-6 text-gray-400"
              data-ocid="supervisor_attendance.empty_state"
            >
              No active members in this center.
            </div>
          ) : (
            <div className="space-y-2">
              {centerMembers.map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  data-ocid={`supervisor_attendance.row.${i + 1}`}
                >
                  <div>
                    <div className="font-medium text-sm">{m.fullName}</div>
                    <div className="text-xs text-gray-500">{m.role}</div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attendance[m.id] ?? false}
                      onChange={(e) =>
                        setAttendance((prev) => ({
                          ...prev,
                          [m.id]: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 accent-green-600"
                    />
                    <span
                      className={`text-sm font-medium ${
                        attendance[m.id] ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {attendance[m.id] ? "Present" : "Absent"}
                    </span>
                  </label>
                </div>
              ))}
              <Button
                className="bg-ngo-green hover:bg-green-700 w-full mt-2"
                onClick={handleSubmit}
                data-ocid="supervisor_attendance.submit_button"
              >
                Submit Attendance
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Date", "Member", "Center", "Status"].map((h) => (
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
                    data-ocid={`supervisor_attendance.item.${i + 1}`}
                  >
                    <td className="px-4 py-2">{a.date}</td>
                    <td className="px-4 py-2">{a.memberName}</td>
                    <td className="px-4 py-2 text-xs text-gray-500">
                      {centers.find((c) => c.id === a.centerId)?.name ||
                        a.centerId}
                    </td>
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

// ─── Production ───────────────────────────────────────────────────────────────
function ProductionSection() {
  const { centers, memberRecords, productionEntries, addProductionEntry } =
    useApp();
  const [filterCenter, setFilterCenter] = useState("all");
  const [form, setForm] = useState({
    centerId: centers[0]?.id || "",
    memberId: "",
    productName: "",
    unitsProduced: "",
    qualityCheck: "pending" as ProductionEntry["qualityCheck"],
    date: new Date().toISOString().split("T")[0],
    remarks: "",
  });

  const centerMembers = memberRecords.filter(
    (m) => m.centerId === form.centerId,
  );

  const handleAdd = () => {
    if (!form.memberId || !form.productName || !form.unitsProduced) {
      toast.error("Please fill all required fields.");
      return;
    }
    const member = memberRecords.find((m) => m.id === form.memberId);
    addProductionEntry({
      id: `pe_${Date.now()}`,
      centerId: form.centerId,
      memberId: form.memberId,
      memberName: member?.fullName || "",
      productName: form.productName,
      unitsProduced: Number(form.unitsProduced),
      qualityCheck: form.qualityCheck,
      date: form.date,
      remarks: form.remarks,
    });
    toast.success("Production entry added!");
    setForm((prev) => ({
      ...prev,
      memberId: "",
      productName: "",
      unitsProduced: "",
      remarks: "",
    }));
  };

  const filtered = productionEntries.filter(
    (e) => filterCenter === "all" || e.centerId === filterCenter,
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add Production Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs">Center</Label>
              <Select
                value={form.centerId}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, centerId: v, memberId: "" }))
                }
              >
                <SelectTrigger data-ocid="supervisor_production.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {centers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Member</Label>
              <Select
                value={form.memberId}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, memberId: v }))
                }
              >
                <SelectTrigger data-ocid="supervisor_production.select">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {centerMembers.map((m) => (
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
                  setForm((prev) => ({ ...prev, productName: e.target.value }))
                }
                placeholder="e.g. Salwar Kameez"
                data-ocid="supervisor_production.input"
              />
            </div>
            <div>
              <Label className="text-xs">Units Produced</Label>
              <Input
                type="number"
                value={form.unitsProduced}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    unitsProduced: e.target.value,
                  }))
                }
                data-ocid="supervisor_production.input"
              />
            </div>
            <div>
              <Label className="text-xs">Quality Check</Label>
              <Select
                value={form.qualityCheck}
                onValueChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    qualityCheck: v as ProductionEntry["qualityCheck"],
                  }))
                }
              >
                <SelectTrigger data-ocid="supervisor_production.select">
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
                  setForm((prev) => ({ ...prev, date: e.target.value }))
                }
                data-ocid="supervisor_production.input"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Remarks (optional)</Label>
              <Input
                value={form.remarks}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, remarks: e.target.value }))
                }
                data-ocid="supervisor_production.input"
              />
            </div>
            <div className="flex items-end">
              <Button
                className="bg-ngo-green hover:bg-green-700 w-full"
                onClick={handleAdd}
                data-ocid="supervisor_production.submit_button"
              >
                Add Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Select value={filterCenter} onValueChange={setFilterCenter}>
          <SelectTrigger
            className="w-52"
            data-ocid="supervisor_production.select"
          >
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
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Date",
                    "Member",
                    "Center",
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
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="supervisor_production.empty_state"
                    >
                      No entries found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((e, i) => {
                    const center = centers.find((c) => c.id === e.centerId);
                    return (
                      <tr
                        key={e.id}
                        className="border-t"
                        data-ocid={`supervisor_production.row.${i + 1}`}
                      >
                        <td className="px-4 py-2">{e.date}</td>
                        <td className="px-4 py-2">{e.memberName}</td>
                        <td className="px-4 py-2 text-xs text-gray-500">
                          {center?.name || e.centerId}
                        </td>
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Machines ─────────────────────────────────────────────────────────────────
function MachinesSection() {
  const {
    machineRecords,
    centers,
    addMachineRecord,
    updateMachineRecord,
    deleteMachineRecord,
  } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    machineId: "",
    machineName: "",
    machineType: "",
    centerId: centers[0]?.id || "",
    status: "working" as MachineRecord["status"],
    lastMaintenance: "",
    nextMaintenance: "",
    assignedTo: "",
    remarks: "",
  });

  const statusColor: Record<MachineRecord["status"], string> = {
    working: "bg-green-100 text-green-700",
    repair: "bg-red-100 text-red-700",
    maintenance: "bg-yellow-100 text-yellow-700",
    idle: "bg-gray-100 text-gray-600",
  };

  const handleSave = () => {
    if (!form.machineId || !form.machineName) {
      toast.error("Machine ID and Name are required.");
      return;
    }
    if (editId) {
      updateMachineRecord(editId, { ...form });
      toast.success("Machine updated!");
      setEditId(null);
    } else {
      addMachineRecord({ id: `mch_${Date.now()}`, ...form });
      toast.success("Machine added!");
    }
    setShowForm(false);
    setForm({
      machineId: "",
      machineName: "",
      machineType: "",
      centerId: centers[0]?.id || "",
      status: "working",
      lastMaintenance: "",
      nextMaintenance: "",
      assignedTo: "",
      remarks: "",
    });
  };

  const startEdit = (m: MachineRecord) => {
    setEditId(m.id);
    setForm({
      machineId: m.machineId,
      machineName: m.machineName,
      machineType: m.machineType,
      centerId: m.centerId,
      status: m.status,
      lastMaintenance: m.lastMaintenance,
      nextMaintenance: m.nextMaintenance,
      assignedTo: m.assignedTo || "",
      remarks: m.remarks || "",
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-800">Machines & Equipment</h2>
        <Button
          className="bg-ngo-green hover:bg-green-700"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
          }}
          data-ocid="supervisor_machines.open_modal_button"
        >
          + Add Machine
        </Button>
      </div>

      {showForm && (
        <Card data-ocid="supervisor_machines.modal">
          <CardHeader>
            <CardTitle className="text-base">
              {editId ? "Edit Machine" : "Add Machine"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs">Machine ID</Label>
                <Input
                  value={form.machineId}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, machineId: e.target.value }))
                  }
                  data-ocid="supervisor_machines.input"
                />
              </div>
              <div>
                <Label className="text-xs">Machine Name</Label>
                <Input
                  value={form.machineName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, machineName: e.target.value }))
                  }
                  data-ocid="supervisor_machines.input"
                />
              </div>
              <div>
                <Label className="text-xs">Type</Label>
                <Input
                  value={form.machineType}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, machineType: e.target.value }))
                  }
                  data-ocid="supervisor_machines.input"
                />
              </div>
              <div>
                <Label className="text-xs">Center</Label>
                <Select
                  value={form.centerId}
                  onValueChange={(v) => setForm((p) => ({ ...p, centerId: v }))}
                >
                  <SelectTrigger data-ocid="supervisor_machines.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {centers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm((p) => ({
                      ...p,
                      status: v as MachineRecord["status"],
                    }))
                  }
                >
                  <SelectTrigger data-ocid="supervisor_machines.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="working">Working</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Last Maintenance</Label>
                <Input
                  type="date"
                  value={form.lastMaintenance}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, lastMaintenance: e.target.value }))
                  }
                  data-ocid="supervisor_machines.input"
                />
              </div>
              <div>
                <Label className="text-xs">Next Maintenance</Label>
                <Input
                  type="date"
                  value={form.nextMaintenance}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, nextMaintenance: e.target.value }))
                  }
                  data-ocid="supervisor_machines.input"
                />
              </div>
              <div>
                <Label className="text-xs">Assigned To</Label>
                <Input
                  value={form.assignedTo}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, assignedTo: e.target.value }))
                  }
                  data-ocid="supervisor_machines.input"
                />
              </div>
              <div>
                <Label className="text-xs">Remarks</Label>
                <Input
                  value={form.remarks}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, remarks: e.target.value }))
                  }
                  data-ocid="supervisor_machines.input"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-ngo-green hover:bg-green-700"
                onClick={handleSave}
                data-ocid="supervisor_machines.save_button"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
                data-ocid="supervisor_machines.cancel_button"
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
                    "Machine ID",
                    "Name",
                    "Type",
                    "Center",
                    "Status",
                    "Last Maintenance",
                    "Next Maintenance",
                    "Assigned To",
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
                {machineRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="supervisor_machines.empty_state"
                    >
                      No machines recorded.
                    </td>
                  </tr>
                ) : (
                  machineRecords.map((m, i) => {
                    const center = centers.find((c) => c.id === m.centerId);
                    return (
                      <tr
                        key={m.id}
                        className="border-t hover:bg-gray-50"
                        data-ocid={`supervisor_machines.row.${i + 1}`}
                      >
                        <td className="px-3 py-2 font-mono text-xs">
                          {m.machineId}
                        </td>
                        <td className="px-3 py-2">{m.machineName}</td>
                        <td className="px-3 py-2 text-xs">{m.machineType}</td>
                        <td className="px-3 py-2 text-xs">
                          {center?.name || m.centerId}
                        </td>
                        <td className="px-3 py-2">
                          <Badge className={statusColor[m.status]}>
                            {m.status}
                          </Badge>
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {m.lastMaintenance || "—"}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {m.nextMaintenance || "—"}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {m.assignedTo || "—"}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 text-xs px-2"
                              onClick={() => startEdit(m)}
                              data-ocid={`supervisor_machines.edit_button.${i + 1}`}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 text-xs px-2 text-red-500 hover:text-red-700"
                              onClick={() => {
                                deleteMachineRecord(m.id);
                                toast.success("Machine removed.");
                              }}
                              data-ocid={`supervisor_machines.delete_button.${i + 1}`}
                            >
                              Del
                            </Button>
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
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────
function ReportsSection() {
  const { centers, supervisorReports, addSupervisorReport, currentUser } =
    useApp();
  const [form, setForm] = useState({
    centerId: centers[0]?.id || "",
    reportType: "daily" as SupervisorReport["reportType"],
    date: new Date().toISOString().split("T")[0],
    membersPresent: "",
    production: "",
    issues: "",
    remarks: "",
  });

  const handleSubmit = () => {
    if (!form.centerId || !form.membersPresent) {
      toast.error("Please fill all required fields.");
      return;
    }
    const center = centers.find((c) => c.id === form.centerId);
    addSupervisorReport({
      id: `sr_${Date.now()}`,
      supervisorId: currentUser?.id || "",
      supervisorName: currentUser?.fullName || "",
      centerId: form.centerId,
      centerName: center?.name || "",
      reportType: form.reportType,
      date: form.date,
      membersPresent: Number(form.membersPresent),
      production: Number(form.production),
      issues: form.issues,
      remarks: form.remarks,
      submittedAt: new Date().toISOString(),
    });
    toast.success("Report submitted!");
    setForm((prev) => ({
      ...prev,
      membersPresent: "",
      production: "",
      issues: "",
      remarks: "",
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submit Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs">Center</Label>
              <Select
                value={form.centerId}
                onValueChange={(v) => setForm((p) => ({ ...p, centerId: v }))}
              >
                <SelectTrigger data-ocid="supervisor_reports.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {centers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Report Type</Label>
              <Select
                value={form.reportType}
                onValueChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    reportType: v as SupervisorReport["reportType"],
                  }))
                }
              >
                <SelectTrigger data-ocid="supervisor_reports.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
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
                data-ocid="supervisor_reports.input"
              />
            </div>
            <div>
              <Label className="text-xs">Members Present</Label>
              <Input
                type="number"
                value={form.membersPresent}
                onChange={(e) =>
                  setForm((p) => ({ ...p, membersPresent: e.target.value }))
                }
                data-ocid="supervisor_reports.input"
              />
            </div>
            <div>
              <Label className="text-xs">Production Units</Label>
              <Input
                type="number"
                value={form.production}
                onChange={(e) =>
                  setForm((p) => ({ ...p, production: e.target.value }))
                }
                data-ocid="supervisor_reports.input"
              />
            </div>
            <div>
              <Label className="text-xs">Issues</Label>
              <Input
                value={form.issues}
                onChange={(e) =>
                  setForm((p) => ({ ...p, issues: e.target.value }))
                }
                placeholder="Any issues today"
                data-ocid="supervisor_reports.input"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Remarks</Label>
              <Input
                value={form.remarks}
                onChange={(e) =>
                  setForm((p) => ({ ...p, remarks: e.target.value }))
                }
                data-ocid="supervisor_reports.input"
              />
            </div>
            <div className="flex items-end">
              <Button
                className="bg-ngo-green hover:bg-green-700 w-full"
                onClick={handleSubmit}
                data-ocid="supervisor_reports.submit_button"
              >
                Submit Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Past Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Supervisor",
                    "Center",
                    "Type",
                    "Date",
                    "Present",
                    "Production",
                    "Issues",
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
                {supervisorReports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-400"
                      data-ocid="supervisor_reports.empty_state"
                    >
                      No reports yet.
                    </td>
                  </tr>
                ) : (
                  [...supervisorReports]
                    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
                    .map((r, i) => (
                      <tr
                        key={r.id}
                        className="border-t"
                        data-ocid={`supervisor_reports.row.${i + 1}`}
                      >
                        <td className="px-4 py-2">{r.supervisorName}</td>
                        <td className="px-4 py-2">{r.centerName}</td>
                        <td className="px-4 py-2 capitalize">{r.reportType}</td>
                        <td className="px-4 py-2">{r.date}</td>
                        <td className="px-4 py-2">{r.membersPresent}</td>
                        <td className="px-4 py-2">{r.production}</td>
                        <td className="px-4 py-2 text-xs text-gray-500 max-w-[120px] truncate">
                          {r.issues || "None"}
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

// ─── Targets ──────────────────────────────────────────────────────────────────
function TargetsSection() {
  const { centers, productionEntries, attendanceRecords, memberRecords } =
    useApp();

  const centerStats = centers.map((c) => {
    const cEntries = productionEntries.filter((e) => e.centerId === c.id);
    const cMembers = memberRecords.filter(
      (m) => m.centerId === c.id && m.status === "active",
    );
    const cAttendance = attendanceRecords.filter((a) => a.centerId === c.id);
    const totalProduced = cEntries.reduce((s, e) => s + e.unitsProduced, 0);
    const target = 500;
    const pct = Math.min(100, Math.round((totalProduced / target) * 100));
    const totalAtt = cAttendance.length;
    const presentAtt = cAttendance.filter((a) => a.present).length;
    const attPct = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 0;
    return {
      center: c,
      totalProduced,
      target,
      pct,
      cMembers: cMembers.length,
      attPct,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {centerStats.map((cs, i) => (
          <Card
            key={cs.center.id}
            data-ocid={`supervisor_targets.card.${i + 1}`}
          >
            <CardHeader>
              <CardTitle className="text-sm">{cs.center.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>
                    Production: {cs.totalProduced} / {cs.target} units
                  </span>
                  <span>{cs.pct}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${cs.pct >= 80 ? "bg-green-500" : cs.pct >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${cs.pct}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Attendance Rate</span>
                  <span>{cs.attPct}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${cs.attPct >= 80 ? "bg-blue-500" : cs.attPct >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${cs.attPct}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Active Members: {cs.cMembers}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Monthly Production Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-32">
            {["Jan", "Feb", "Mar", "Apr"].map((month, i) => {
              const val = [
                280,
                350,
                420,
                productionEntries.reduce((s, e) => s + e.unitsProduced, 0),
              ][i];
              const max = 500;
              const pct = Math.min(100, Math.round((val / max) * 100));
              return (
                <div
                  key={month}
                  className="flex flex-col items-center gap-1"
                  data-ocid={`supervisor_targets.chart_point.${i + 1}`}
                >
                  <div className="text-xs text-gray-600">{val}</div>
                  <div
                    className="w-12 bg-ngo-green rounded-t"
                    style={{ height: `${pct * 0.9}px`, minHeight: "4px" }}
                  />
                  <div className="text-xs text-gray-500">{month}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Complaints ───────────────────────────────────────────────────────────────
function ComplaintsSection() {
  const { complaintSubmissions, updateComplaintSubmission } = useApp();
  const [filter, setFilter] = useState("all");

  const filtered = complaintSubmissions.filter(
    (c) => filter === "all" || c.status === filter,
  );

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger
          className="w-44"
          data-ocid="supervisor_complaints.select"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {filtered.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="supervisor_complaints.empty_state"
        >
          No complaints found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c, i) => (
            <Card key={c.id} data-ocid={`supervisor_complaints.row.${i + 1}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-medium">
                      {c.name} — {c.subject}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {c.complaintType} | {c.email} | {c.submittedAt}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      {c.message}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={statusColor[c.status]}>
                      {c.status.replace("_", " ")}
                    </Badge>
                    {c.status === "pending" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-xs h-7"
                        onClick={() => {
                          updateComplaintSubmission(c.id, {
                            status: "in_progress",
                          });
                          toast.success("Marked in progress.");
                        }}
                        data-ocid={`supervisor_complaints.confirm_button.${i + 1}`}
                      >
                        Mark In Progress
                      </Button>
                    )}
                    {c.status === "in_progress" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-xs h-7"
                        onClick={() => {
                          updateComplaintSubmission(c.id, {
                            status: "resolved",
                          });
                          toast.success("Marked resolved.");
                        }}
                        data-ocid={`supervisor_complaints.confirm_button.${i + 1}`}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
