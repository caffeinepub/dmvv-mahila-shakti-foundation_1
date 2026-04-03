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
import { useApp } from "@/context/AppContext";
import {
  BarChart2,
  Boxes,
  LogOut,
  MapPin,
  Menu,
  Package,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const navItems = [
  { label: "Vehicles", key: "vehicles", icon: Truck },
  { label: "Drivers", key: "drivers", icon: Users },
  { label: "Trips", key: "trips", icon: MapPin },
  { label: "Pickup Schedule", key: "pickup", icon: Boxes },
  { label: "Orders", key: "orders", icon: Package },
  { label: "Shipping", key: "shipping", icon: Truck },
  { label: "Business", key: "business", icon: BarChart2 },
  { label: "Center Orders", key: "center_orders", icon: Package },
];

export default function TransportDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState("vehicles");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "transport" && currentUser.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
              data-ocid="transport_nav.link"
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
          {section === "orders" && <TransportOrders />}
          {section === "shipping" && <TransportShipping />}
          {section === "business" && <TransportBusiness />}
          {section === "center_orders" && <CenterOrdersTransport />}
        </main>
      </div>
    </div>
  );
}

function Vehicles() {
  const [vehicles, setVehicles] = useState([
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
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    reg: "",
    type: "",
    driver: "",
    status: "Active",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Vehicle Fleet</h2>
        <Button
          size="sm"
          className="bg-ngo-green text-white"
          onClick={() => setShowAdd(!showAdd)}
          data-ocid="transport_vehicles.primary_button"
        >
          + Add Vehicle
        </Button>
      </div>
      {showAdd && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(
                [
                  ["Registration No.", "reg"],
                  ["Vehicle Type", "type"],
                  ["Driver", "driver"],
                ] as [string, string][]
              ).map(([l, k]) => (
                <div key={k}>
                  <Label className="text-xs">{l}</Label>
                  <Input
                    value={(newVehicle as Record<string, string>)[k]}
                    onChange={(e) =>
                      setNewVehicle((p) => ({ ...p, [k]: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="transport_vehicles.input"
                  />
                </div>
              ))}
            </div>
            <Button
              size="sm"
              className="bg-ngo-green text-white mt-3"
              onClick={() => {
                if (!newVehicle.reg) {
                  toast.error("Registration required.");
                  return;
                }
                setVehicles((v) => [...v, newVehicle]);
                setNewVehicle({
                  reg: "",
                  type: "",
                  driver: "",
                  status: "Active",
                });
                setShowAdd(false);
                toast.success("Vehicle added!");
              }}
              data-ocid="transport_vehicles.submit_button"
            >
              Add Vehicle
            </Button>
          </CardContent>
        </Card>
      )}
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
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      v.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
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
  const [drivers, setDrivers] = useState([
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
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    license: "",
    phone: "",
    experience: "",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Driver Registry</h2>
        <Button
          size="sm"
          className="bg-ngo-green text-white"
          onClick={() => setShowAdd(!showAdd)}
          data-ocid="transport_drivers.primary_button"
        >
          + Add Driver
        </Button>
      </div>
      {showAdd && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(
                [
                  ["Name", "name"],
                  ["License No.", "license"],
                  ["Phone", "phone"],
                  ["Experience", "experience"],
                ] as [string, string][]
              ).map(([l, k]) => (
                <div key={k}>
                  <Label className="text-xs">{l}</Label>
                  <Input
                    value={(newDriver as Record<string, string>)[k]}
                    onChange={(e) =>
                      setNewDriver((p) => ({ ...p, [k]: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="transport_drivers.input"
                  />
                </div>
              ))}
            </div>
            <Button
              size="sm"
              className="bg-ngo-green text-white mt-3"
              onClick={() => {
                if (!newDriver.name) {
                  toast.error("Name required.");
                  return;
                }
                setDrivers((d) => [...d, newDriver]);
                setNewDriver({
                  name: "",
                  license: "",
                  phone: "",
                  experience: "",
                });
                setShowAdd(false);
                toast.success("Driver added!");
              }}
              data-ocid="transport_drivers.submit_button"
            >
              Add Driver
            </Button>
          </CardContent>
        </Card>
      )}
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

// ─── New Transport sections ───

function TransportOrders() {
  const { orders, updateOrder } = useApp();
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Orders</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "placed", "confirmed", "shipped", "delivered"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              statusFilter === s
                ? "bg-ngo-green text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            data-ocid="transport_orders.tab"
          >
            {s}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="transport_orders.empty_state"
        >
          Koi order nahi.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((o, i) => (
            <Card key={o.id} data-ocid={`transport_orders.item.${i + 1}`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-3">
                  <div>
                    <div className="font-bold">Order #{o.id.slice(-8)}</div>
                    <div className="text-sm text-gray-600">
                      {o.userName} | {o.userMobile}
                    </div>
                    <div className="text-sm text-gray-500">
                      Destination: {o.userAddress}
                    </div>
                    <div className="text-xs text-gray-400">
                      {o.items
                        .map((it) => `${it.productName} ×${it.quantity}`)
                        .join(", ")}
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    {o.status === "placed" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white"
                        onClick={() => {
                          updateOrder(o.id, { status: "confirmed" });
                          toast.success("Order confirmed!");
                        }}
                        data-ocid={`transport_orders.secondary_button.${i + 1}`}
                      >
                        Accept
                      </Button>
                    )}
                    {o.status === "confirmed" && (
                      <Button
                        size="sm"
                        className="bg-orange-600 text-white"
                        onClick={() => {
                          updateOrder(o.id, { status: "shipped" });
                          toast.success("Marked in transit!");
                        }}
                        data-ocid={`transport_orders.primary_button.${i + 1}`}
                      >
                        Mark Shipped
                      </Button>
                    )}
                    {o.status === "shipped" && (
                      <Button
                        size="sm"
                        className="bg-green-600 text-white"
                        onClick={() => {
                          updateOrder(o.id, { status: "delivered" });
                          toast.success("Delivered!");
                        }}
                        data-ocid={`transport_orders.primary_button.${i + 1}`}
                      >
                        Mark Delivered
                      </Button>
                    )}
                    <Badge
                      className={`capitalize ${
                        o.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : o.status === "confirmed"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {o.status}
                    </Badge>
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

function TransportShipping() {
  const { orders } = useApp();
  const active = orders.filter(
    (o) => o.status === "shipped" || o.status === "confirmed",
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Active Shipments</h2>
      {active.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="transport_shipping.empty_state"
        >
          Koi active shipment nahi.
        </div>
      ) : (
        <div className="space-y-3">
          {active.map((o, i) => (
            <Card key={o.id} data-ocid={`transport_shipping.item.${i + 1}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-bold">
                      Order #{o.id.slice(-8)} — {o.userName}
                    </div>
                    <div className="text-sm text-gray-500">{o.userAddress}</div>
                    <div className="text-xs text-gray-400">
                      ₹{Number(o.totalAmount).toLocaleString()} | {o.placedAt}
                    </div>
                  </div>
                  <Badge
                    className={`capitalize ${
                      o.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {o.status === "shipped" ? "In Transit" : "Ready to Ship"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function TransportBusiness() {
  const { orders } = useApp();
  const completed = orders.filter((o) => o.status === "delivered");
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthCompleted = completed.filter((o) =>
    o.placedAt.startsWith(thisMonth),
  );

  const stats = [
    [
      "Trips Completed (MTD)",
      monthCompleted.length.toString(),
      "text-green-700",
    ],
    ["Total Deliveries", completed.length.toString(), "text-blue-700"],
    [
      "Pending Deliveries",
      orders
        .filter(
          (o) =>
            o.status === "placed" ||
            o.status === "confirmed" ||
            o.status === "shipped",
        )
        .length.toString(),
      "text-orange-600",
    ],
    ["Active Drivers", "3", "text-purple-600"],
  ];

  const routeData = [
    { route: "Lucknow - Varanasi", trips: 45, kmCovered: 900 },
    { route: "Lucknow - Patna", trips: 30, kmCovered: 1800 },
    { route: "Lucknow - Kanpur", trips: 60, kmCovered: 420 },
  ];

  const driverPerf = [
    { name: "Ramesh Singh", trips: 48, onTime: "95%", rating: "4.8" },
    { name: "Suresh Kumar", trips: 32, onTime: "92%", rating: "4.6" },
    { name: "Mahesh Yadav", trips: 25, onTime: "88%", rating: "4.3" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">
        Transport Business Dashboard
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(stats as [string, string, string][]).map(([l, v, c]) => (
          <Card key={l}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-extrabold ${c}`}>{v}</div>
              <div className="text-xs text-gray-500 mt-1">{l}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Route Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Route", "Total Trips", "KM Covered"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-semibold text-gray-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {routeData.map((r, i) => (
                  <tr
                    key={r.route}
                    className="border-t"
                    data-ocid={`transport_business.row.${i + 1}`}
                  >
                    <td className="px-3 py-2">{r.route}</td>
                    <td className="px-3 py-2 font-bold text-blue-700">
                      {r.trips}
                    </td>
                    <td className="px-3 py-2">{r.kmCovered} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Driver Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Driver", "Trips", "On Time", "Rating"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-semibold text-gray-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {driverPerf.map((d, i) => (
                  <tr
                    key={d.name}
                    className="border-t"
                    data-ocid={`transport_business.row.${i + 1}`}
                  >
                    <td className="px-3 py-2 font-medium">{d.name}</td>
                    <td className="px-3 py-2">{d.trips}</td>
                    <td className="px-3 py-2 text-green-700 font-semibold">
                      {d.onTime}
                    </td>
                    <td className="px-3 py-2">⭐ {d.rating}</td>
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

function CenterOrdersTransport() {
  const { orders } = useApp();
  const centerOrders = orders.filter((o) => o.centerId);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Center-to-Customer Orders
      </h2>
      {centerOrders.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="transport_center_orders.empty_state"
        >
          Koi center order nahi.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Order ID",
                  "From Center",
                  "Destination",
                  "Amount",
                  "Status",
                  "Date",
                ].map((h) => (
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
              {centerOrders.map((o, i) => (
                <tr
                  key={o.id}
                  className="border-t"
                  data-ocid={`transport_center_orders.row.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {o.id.slice(-8)}
                  </td>
                  <td className="px-4 py-3">{o.centerId}</td>
                  <td className="px-4 py-3 text-sm">
                    {o.userAddress.slice(0, 30)}...
                  </td>
                  <td className="px-4 py-3 font-bold text-green-700">
                    ₹{Number(o.totalAmount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`capitalize ${
                        o.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs">{o.placedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
