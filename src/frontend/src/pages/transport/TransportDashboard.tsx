import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function TransportDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState("vehicles");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "transport" && currentUser.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  const navItems = [
    { label: "Vehicles", key: "vehicles" },
    { label: "Drivers", key: "drivers" },
    { label: "Trips", key: "trips" },
    { label: "Pickup Schedule", key: "pickup" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div>
            <div className="font-bold text-sm">Transport Panel</div>
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
              data-ocid="transport_nav.link"
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
            data-ocid="transport_nav.close_button"
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
            data-ocid="transport.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800 capitalize">
            {navItems.find((n) => n.key === section)?.label} - Transport Panel
          </span>
        </div>
        <main className="flex-1 p-6">
          {section === "vehicles" && <Vehicles />}
          {section === "drivers" && <Drivers />}
          {section === "trips" && <Trips />}
          {section === "pickup" && <Pickup />}
        </main>
      </div>
    </div>
  );
}

function Vehicles() {
  const vehicles = [
    {
      reg: "UP32-AB-1234",
      type: "Mini Bus (20 seater)",
      driver: "Ramesh Singh",
      status: "Active",
    },
    {
      reg: "UP32-CD-5678",
      type: "Tempo Traveller",
      driver: "Suresh Kumar",
      status: "Active",
    },
    {
      reg: "UP32-EF-9012",
      type: "Auto Rickshaw",
      driver: "Mahesh Yadav",
      status: "Maintenance",
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Fleet</h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Registration", "Type", "Driver", "Status"].map((h) => (
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
            {vehicles.map((v, i) => (
              <tr
                key={v.reg}
                className="border-t"
                data-ocid={`transport_vehicles.row.${i + 1}`}
              >
                <td className="px-4 py-3 font-mono">{v.reg}</td>
                <td className="px-4 py-3">{v.type}</td>
                <td className="px-4 py-3">{v.driver}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${v.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {v.status}
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

function Drivers() {
  const drivers = [
    {
      name: "Ramesh Singh",
      license: "UP0320230001234",
      phone: "9876543230",
      experience: "8 years",
    },
    {
      name: "Suresh Kumar",
      license: "UP0320220005678",
      phone: "9876543231",
      experience: "5 years",
    },
    {
      name: "Mahesh Yadav",
      license: "UP0320210009012",
      phone: "9876543232",
      experience: "3 years",
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Driver Registry</h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "License No.", "Phone", "Experience"].map((h) => (
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
            {drivers.map((d, i) => (
              <tr
                key={d.name}
                className="border-t"
                data-ocid={`transport_drivers.row.${i + 1}`}
              >
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{d.license}</td>
                <td className="px-4 py-3">{d.phone}</td>
                <td className="px-4 py-3">{d.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Trips() {
  const trips = [
    {
      date: "2026-04-02",
      route: "Lucknow HQ → Varanasi Center",
      driver: "Ramesh Singh",
      members: 18,
      status: "Completed",
    },
    {
      date: "2026-04-01",
      route: "Patna Center → Training Hall",
      driver: "Suresh Kumar",
      members: 12,
      status: "Completed",
    },
    {
      date: "2026-04-03",
      route: "Jaipur Center → Skill Fair",
      driver: "Mahesh Yadav",
      members: 25,
      status: "Scheduled",
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Log</h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Date", "Route", "Driver", "Members", "Status"].map((h) => (
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
            {trips.map((t, i) => (
              <tr
                key={`${t.date}-${i}`}
                className="border-t"
                data-ocid={`transport_trips.row.${i + 1}`}
              >
                <td className="px-4 py-3">{t.date}</td>
                <td className="px-4 py-3">{t.route}</td>
                <td className="px-4 py-3">{t.driver}</td>
                <td className="px-4 py-3">{t.members}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {t.status}
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

function Pickup() {
  const schedule = [
    {
      time: "07:30 AM",
      route: "Hazratganj → DMVV Center",
      vehicle: "UP32-AB-1234",
      seats: 20,
    },
    {
      time: "08:15 AM",
      route: "Gomti Nagar → DMVV Center",
      vehicle: "UP32-CD-5678",
      seats: 12,
    },
    {
      time: "05:30 PM",
      route: "DMVV Center → Hazratganj",
      vehicle: "UP32-AB-1234",
      seats: 20,
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Pickup Schedule</h2>
      <div className="space-y-3">
        {schedule.map((s, i) => (
          <div
            key={s.time}
            className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
            data-ocid={`transport_pickup.row.${i + 1}`}
          >
            <div>
              <div className="font-bold text-gray-900">{s.time}</div>
              <div className="text-sm text-gray-600">{s.route}</div>
              <div className="text-xs text-gray-400 mt-0.5">
                Vehicle: {s.vehicle}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-ngo-green">{s.seats}</div>
              <div className="text-xs text-gray-500">Seats</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
