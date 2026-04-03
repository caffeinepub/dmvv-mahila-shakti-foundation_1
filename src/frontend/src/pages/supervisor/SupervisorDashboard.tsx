import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function SupervisorDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState("attendance");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "supervisor" && currentUser.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  const navItems = [
    { label: "Attendance Check", key: "attendance" },
    { label: "Machine Report", key: "machine" },
    { label: "Daily Report", key: "daily" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div>
            <div className="font-bold text-sm">Supervisor Panel</div>
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
              key={item.key}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${section === item.key ? "bg-green-700 font-semibold" : "text-green-200 hover:bg-green-700"}`}
              onClick={() => {
                setSection(item.key);
                setSidebarOpen(false);
              }}
              data-ocid="supervisor_nav.link"
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
            data-ocid="supervisor_nav.close_button"
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
            data-ocid="supervisor.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800 capitalize">
            {navItems.find((n) => n.key === section)?.label} - Supervisor Panel
          </span>
        </div>
        <main className="flex-1 p-6">
          {section === "attendance" && <SupervisorAttendance />}
          {section === "machine" && <SupervisorMachine />}
          {section === "daily" && <SupervisorDaily />}
        </main>
      </div>
    </div>
  );
}

function SupervisorAttendance() {
  const records = [
    { center: "DMVV Lucknow", present: 22, absent: 3, total: 25 },
    { center: "DMVV Varanasi", present: 18, absent: 5, total: 23 },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Attendance Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map((r, i) => (
          <div
            key={r.center}
            className="bg-white rounded-xl shadow p-5"
            data-ocid={`supervisor_attendance.card.${i + 1}`}
          >
            <h3 className="font-bold text-gray-800 mb-3">{r.center}</h3>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {r.present}
                </div>
                <div className="text-xs text-gray-500">Present</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {r.absent}
                </div>
                <div className="text-xs text-gray-500">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {r.total}
                </div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupervisorMachine() {
  const [machines] = useState([
    {
      id: "M-001",
      type: "Sewing Machine",
      status: "Working",
      lastMaintenance: "2026-03-15",
    },
    {
      id: "M-002",
      type: "Overlock Machine",
      status: "Working",
      lastMaintenance: "2026-03-10",
    },
    {
      id: "M-003",
      type: "Button Stitch",
      status: "Repair Needed",
      lastMaintenance: "2026-02-28",
    },
  ]);
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Machine Status Report
      </h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Machine ID", "Type", "Status", "Last Maintenance"].map((h) => (
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
            {machines.map((m, i) => (
              <tr
                key={m.id}
                className="border-t"
                data-ocid={`supervisor_machine.row.${i + 1}`}
              >
                <td className="px-4 py-3 font-mono">{m.id}</td>
                <td className="px-4 py-3">{m.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${m.status === "Working" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">{m.lastMaintenance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SupervisorDaily() {
  const [report, setReport] = useState("");
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Submit Daily Report
      </h2>
      <div className="bg-white rounded-xl shadow p-5">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Date: {today}</p>
          <div>
            <label
              htmlFor="daily-report"
              className="text-sm font-medium text-gray-700"
            >
              Daily Report
            </label>
            <textarea
              id="daily-report"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              rows={6}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Describe today's activities, issues, and progress..."
              data-ocid="supervisor_daily.textarea"
            />
          </div>
          <button
            type="button"
            className="bg-ngo-green text-white px-4 py-2 rounded text-sm w-full"
            data-ocid="supervisor_daily.submit_button"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
