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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import {
  BarChart2,
  Boxes,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", key: "dashboard", icon: BarChart2 },
  { label: "Members", key: "members", icon: Package },
  { label: "Attendance", key: "attendance", icon: Boxes },
  { label: "Production", key: "production", icon: ShoppingBag },
  { label: "Salary", key: "salary", icon: ShoppingCart },
  { label: "Orders", key: "orders", icon: ShoppingCart },
  { label: "Shipping", key: "shipping", icon: Truck },
  { label: "Business", key: "business", icon: BarChart2 },
  { label: "Products", key: "products", icon: Package },
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
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
        <nav className="flex-1 py-4 overflow-y-auto">
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
            {navItems.find((n) => n.key === section)?.label} - Center Panel
          </span>
        </div>
        <main className="flex-1 p-6">
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
                  "Name",
                  "Address",
                  "State",
                  "District",
                  "Block",
                  "Phone",
                ] as const
              ).map((k, i) => {
                const vals: string[] = [
                  myCenter.name,
                  myCenter.address,
                  myCenter.state,
                  myCenter.district,
                  myCenter.block,
                  myCenter.contactPhone,
                ];
                return (
                  <div key={k} className="flex gap-2">
                    <span className="text-gray-500 font-medium w-20">{k}:</span>
                    <span className="text-gray-800">{vals[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow">
            <h2 className="font-bold text-gray-800 mb-3">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  ["Members", "24", "text-blue-600"],
                  ["Present Today", "18", "text-green-600"],
                  ["Orders Pending", "7", "text-orange-500"],
                  ["Revenue (MTD)", "₹1.2L", "text-purple-600"],
                ] as [string, string, string][]
              ).map((row) => (
                <div
                  key={row[0]}
                  className="text-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`text-2xl font-bold ${row[2]}`}>{row[1]}</div>
                  <div className="text-xs text-gray-500">{row[0]}</div>
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
            onClick={() => toast.success("Production submitted!")}
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

// ─── New sections ───

function CenterOrders() {
  const { orders } = useApp();
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);
  const statuses = [
    "all",
    "placed",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Center Orders</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
              statusFilter === s
                ? "bg-ngo-green text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            data-ocid="center_orders.tab"
          >
            {s}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="center_orders.empty_state"
        >
          Koi order nahi hai.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Items",
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
              {filtered.map((o, i) => (
                <tr
                  key={o.id}
                  className="border-t"
                  data-ocid={`center_orders.row.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {o.id.slice(-8)}
                  </td>
                  <td className="px-4 py-3 font-medium">{o.userName}</td>
                  <td className="px-4 py-3 text-xs">
                    {o.items
                      .map((it) => `${it.productName}(${it.quantity})`)
                      .join(", ")}
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
                            : o.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {o.placedAt}
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

function CenterShipping() {
  const { orders, updateOrder } = useApp();
  const shippable = orders.filter(
    (o) => o.status === "confirmed" || o.status === "shipped",
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Queue</h2>
      {shippable.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="center_shipping.empty_state"
        >
          Koi shipment pending nahi hai.
        </div>
      ) : (
        <div className="space-y-3">
          {shippable.map((o, i) => (
            <Card key={o.id} data-ocid={`center_shipping.item.${i + 1}`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-gray-800">
                      Order #{o.id.slice(-8)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Customer: {o.userName} | ₹
                      {Number(o.totalAmount).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Deliver to: {o.userAddress}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {o.items
                        .map((it) => `${it.productName} ×${it.quantity}`)
                        .join(", ")}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {o.status === "confirmed" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white"
                        onClick={() => {
                          updateOrder(o.id, { status: "shipped" });
                          toast.success("Marked as shipped!");
                        }}
                        data-ocid={`center_shipping.secondary_button.${i + 1}`}
                      >
                        <Truck size={14} className="mr-1" /> Mark Shipped
                      </Button>
                    )}
                    {o.status === "shipped" && (
                      <Button
                        size="sm"
                        className="bg-green-600 text-white"
                        onClick={() => {
                          updateOrder(o.id, { status: "delivered" });
                          toast.success("Marked as delivered!");
                        }}
                        data-ocid={`center_shipping.primary_button.${i + 1}`}
                      >
                        Mark Delivered
                      </Button>
                    )}
                    <Badge
                      className={`self-center capitalize ${
                        o.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
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

function CenterBusiness() {
  const { orders, products } = useApp();
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthOrders = orders.filter((o) => o.placedAt.startsWith(thisMonth));
  const totalRevenue = monthOrders.reduce(
    (s, o) => s + Number(o.totalAmount),
    0,
  );
  const pendingOrders = orders.filter(
    (o) => o.status === "placed" || o.status === "confirmed",
  ).length;

  const monthlyData = ["Jan", "Feb", "Mar", "Apr"].map((m, i) => ({
    month: m,
    revenue: [18000, 24000, 31000, totalRevenue || 12000][i],
  }));
  const maxRev = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Business Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(
          [
            [
              "Revenue (MTD)",
              `₹${totalRevenue.toLocaleString()}`,
              "text-green-700",
            ],
            ["Total Orders", orders.length.toString(), "text-blue-700"],
            ["Pending Orders", pendingOrders.toString(), "text-orange-600"],
            [
              "Products",
              products.filter((p) => p.isActive).length.toString(),
              "text-purple-600",
            ],
          ] as [string, string, string][]
        ).map(([l, v, c]) => (
          <Card key={l}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-extrabold ${c}`}>{v}</div>
              <div className="text-xs text-gray-500 mt-1">{l}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CSS Revenue chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 h-32">
            {monthlyData.map((d) => (
              <div
                key={d.month}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div className="text-xs font-bold text-green-700">
                  ₹{(d.revenue / 1000).toFixed(0)}k
                </div>
                <div
                  className="w-full bg-ngo-green rounded-t-sm"
                  style={{
                    height: `${(d.revenue / maxRev) * 80}px`,
                    minHeight: "4px",
                  }}
                />
                <div className="text-xs text-gray-500">{d.month}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top products */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Product", "Category", "Stock", "Price"].map((h) => (
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
                {products
                  .filter((p) => p.isActive)
                  .slice(0, 5)
                  .map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-t"
                      data-ocid={`center_business.row.${i + 1}`}
                    >
                      <td className="px-3 py-2 font-medium">{p.name}</td>
                      <td className="px-3 py-2 text-gray-500">{p.category}</td>
                      <td className="px-3 py-2">{p.stock}</td>
                      <td className="px-3 py-2 font-bold text-green-700">
                        ₹{Number(p.price).toLocaleString()}
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

function CenterProducts() {
  const { products, updateProduct } = useApp();
  const [editStock, setEditStock] = useState<Record<string, string>>({});

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Manage Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p, i) => (
          <Card key={p.id} data-ocid={`center_products.item.${i + 1}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{p.name}</h3>
                  <div className="text-sm text-gray-500">
                    {p.category} | ₹{Number(p.price).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">{p.centerName}</div>
                </div>
                <Badge
                  className={
                    p.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }
                >
                  {p.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Label className="text-xs w-16">Stock:</Label>
                <Input
                  type="number"
                  value={editStock[p.id] ?? p.stock.toString()}
                  onChange={(e) =>
                    setEditStock((prev) => ({
                      ...prev,
                      [p.id]: e.target.value,
                    }))
                  }
                  className="w-24 h-8 text-sm"
                  data-ocid="center_products.input"
                />
                <Button
                  size="sm"
                  className="bg-ngo-green text-white h-8"
                  onClick={() => {
                    updateProduct(p.id, {
                      stock: Number(editStock[p.id] ?? p.stock),
                    });
                    toast.success("Stock updated!");
                  }}
                  data-ocid={`center_products.save_button.${i + 1}`}
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
