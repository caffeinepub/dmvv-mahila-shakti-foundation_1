import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", key: "dashboard" },
  { label: "Members", key: "members" },
  { label: "Attendance", key: "attendance" },
  { label: "Production", key: "production" },
  { label: "Salary", key: "salary" },
];

export default function CenterDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "center" && currentUser.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div>
            <div className="font-bold text-sm">Center Panel</div>
            <div className="text-xs text-green-300">{currentUser.fullName}</div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.label}
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

      <div className="flex-1 lg:ml-60 flex flex-col">
        <div className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-ocid="center.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800 capitalize">
            {section} - Center Panel
          </span>
        </div>
        <main className="flex-1 p-6">
          {section === "dashboard" && <CenterHome />}
          {section === "members" && <CenterMembers />}
          {section === "attendance" && <CenterAttendance />}
          {section === "production" && <CenterProduction />}
          {section === "salary" && <CenterSalary />}
        </main>
      </div>
    </div>
  );
}

function CenterHome() {
  const { centers, currentUser } = useApp();
  const myCenter = centers.find((c) => c.id === currentUser?.id) || centers[0];
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Center Overview</h1>
      {myCenter && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 shadow">
            <h2 className="font-bold text-gray-800 mb-3">Center Information</h2>
            <div className="space-y-2 text-sm">
              {(
                [
                  ["Name", myCenter.name],
                  ["Address", myCenter.address],
                  ["State", myCenter.state],
                  ["District", myCenter.district],
                  ["Block", myCenter.block],
                  ["Phone", myCenter.contactPhone],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-gray-500 font-medium w-20">{k}:</span>
                  <span className="text-gray-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow">
            <h2 className="font-bold text-gray-800 mb-3">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  ["Members", "24", "text-blue-600"],
                  ["Present Today", "18", "text-green-600"],
                  ["Production Units", "142", "text-orange-500"],
                  ["Pending Salary", "₹12,400", "text-red-500"],
                ] as [string, string, string][]
              ).map(([l, v, c]) => (
                <div key={l} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${c}`}>{v}</div>
                  <div className="text-xs text-gray-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CenterMembers() {
  const [members] = useState([
    {
      name: "Rani Devi",
      mobile: "9876543220",
      role: "Tailor",
      joined: "2024-01-15",
    },
    {
      name: "Seema Kumari",
      mobile: "9876543221",
      role: "Embroider",
      joined: "2024-02-10",
    },
    {
      name: "Pooja Singh",
      mobile: "9876543222",
      role: "Computer Operator",
      joined: "2024-03-01",
    },
  ]);
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Center Members</h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Mobile", "Role", "Joined"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr
                key={m.name}
                className="border-t"
                data-ocid={`center_members.row.${i + 1}`}
              >
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3">{m.mobile}</td>
                <td className="px-4 py-3">{m.role}</td>
                <td className="px-4 py-3">{m.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CenterAttendance() {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({
    "Rani Devi": true,
    "Seema Kumari": true,
    "Pooja Singh": false,
  });
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Today's Attendance
      </h2>
      <div className="bg-white rounded-xl shadow p-5">
        <div className="space-y-3">
          {Object.entries(attendance).map(([name, present], i) => (
            <div
              key={name}
              className="flex items-center justify-between py-2 border-b"
              data-ocid={`center_attendance.row.${i + 1}`}
            >
              <span className="font-medium text-gray-800">{name}</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={present}
                  onChange={(e) =>
                    setAttendance((p) => ({ ...p, [name]: e.target.checked }))
                  }
                  className="w-4 h-4"
                  aria-label={`${name} attendance`}
                  data-ocid="center_attendance.checkbox"
                />
                <span
                  className={`text-sm ${present ? "text-green-600" : "text-red-500"}`}
                >
                  {present ? "Present" : "Absent"}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CenterProduction() {
  const [units, setUnits] = useState("0");
  const [history] = useState([
    { date: "2026-04-01", units: 48, product: "Salwar Kameez" },
    { date: "2026-03-31", units: 52, product: "Embroidered Dupatta" },
    { date: "2026-03-30", units: 40, product: "Kurta" },
  ]);
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Production Entry</h2>
      <div className="bg-white rounded-xl shadow p-5 mb-6 max-w-sm">
        <div className="space-y-3">
          <div>
            <label htmlFor="production-units" className="text-sm font-medium">
              Units Produced Today
            </label>
            <input
              id="production-units"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              type="number"
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              data-ocid="center_production.input"
            />
          </div>
          <button
            type="button"
            className="bg-ngo-green text-white px-4 py-2 rounded text-sm w-full"
            data-ocid="center_production.submit_button"
          >
            Submit Production
          </button>
        </div>
      </div>
      <h3 className="font-bold text-gray-800 mb-3">Production History</h3>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Date", "Product", "Units"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((r, i) => (
              <tr
                key={r.date}
                className="border-t"
                data-ocid={`center_production.row.${i + 1}`}
              >
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{r.product}</td>
                <td className="px-4 py-3 font-bold">{r.units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CenterSalary() {
  const salaries = [
    {
      name: "Rani Devi",
      month: "March 2026",
      amount: "₹8,500",
      status: "Paid",
    },
    {
      name: "Seema Kumari",
      month: "March 2026",
      amount: "₹7,800",
      status: "Paid",
    },
    {
      name: "Pooja Singh",
      month: "March 2026",
      amount: "₹9,200",
      status: "Pending",
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Salary Records</h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Member", "Month", "Amount", "Status"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salaries.map((s, i) => (
              <tr
                key={s.name}
                className="border-t"
                data-ocid={`center_salary.row.${i + 1}`}
              >
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">{s.month}</td>
                <td className="px-4 py-3 font-bold text-green-700">
                  {s.amount}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
