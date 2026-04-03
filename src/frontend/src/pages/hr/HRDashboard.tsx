import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function HRDashboard() {
  const { currentUser, setCurrentUser, users, kycs, updateKYC } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState("staff");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "hr" && currentUser.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  const navItems = [
    { label: "Staff", key: "staff" },
    { label: "Training", key: "training" },
    { label: "KYC Verification", key: "kyc" },
  ];

  const pendingKYC = kycs.filter((k) => k.status === "pending");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div>
            <div className="font-bold text-sm">HR Panel</div>
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
              data-ocid="hr_nav.link"
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
      <div className="flex-1 lg:ml-60 flex flex-col">
        <div className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-ocid="hr.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800 capitalize">
            {navItems.find((n) => n.key === section)?.label} - HR Panel
          </span>
        </div>
        <main className="flex-1 p-6">
          {section === "staff" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Staff Directory
              </h2>
              <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Name", "Email", "Role", "Status", "Joined"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left font-semibold text-gray-700"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter(
                        (u) => u.role !== "admin" && u.status === "approved",
                      )
                      .map((u, i) => (
                        <tr
                          key={u.id}
                          className="border-t"
                          data-ocid={`hr_staff.row.${i + 1}`}
                        >
                          <td className="px-4 py-3 font-medium">
                            {u.fullName}
                          </td>
                          <td className="px-4 py-3 text-xs">{u.email}</td>
                          <td className="px-4 py-3 capitalize">{u.role}</td>
                          <td className="px-4 py-3">
                            <Badge className="bg-green-100 text-green-700 capitalize">
                              {u.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">{u.createdAt}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {section === "training" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Training Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Tailoring Batch 12",
                    center: "Lucknow",
                    start: "2026-04-10",
                    students: 25,
                    instructor: "Mrs. Geeta Rani",
                  },
                  {
                    name: "Computer Literacy Batch 8",
                    center: "Varanasi",
                    start: "2026-04-15",
                    students: 20,
                    instructor: "Mr. Rahul Mishra",
                  },
                  {
                    name: "Beauty & Wellness Batch 5",
                    center: "Patna",
                    start: "2026-05-01",
                    students: 15,
                    instructor: "Ms. Pooja Kumari",
                  },
                ].map((t, i) => (
                  <div
                    key={t.name}
                    className="bg-white rounded-xl shadow p-5"
                    data-ocid={`hr_training.card.${i + 1}`}
                  >
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {t.center} | Start: {t.start}
                    </div>
                    <div className="text-sm text-gray-500">
                      Instructor: {t.instructor}
                    </div>
                    <div className="text-sm font-medium text-ngo-green mt-1">
                      {t.students} Students
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {section === "kyc" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Pending KYC Verification ({pendingKYC.length})
              </h2>
              {pendingKYC.length === 0 ? (
                <div
                  className="text-center py-12 text-gray-400"
                  data-ocid="hr_kyc.empty_state"
                >
                  No pending KYC records.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingKYC.map((kyc, i) => {
                    const user = users.find((u) => u.id === kyc.userId);
                    return (
                      <div
                        key={kyc.id}
                        className="bg-white rounded-xl shadow p-5"
                        data-ocid={`hr_kyc.row.${i + 1}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-gray-900">
                              {user?.fullName || "Unknown"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user?.email} | Submitted: {kyc.submittedAt}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Bank: {kyc.bankName} | IFSC: {kyc.ifscCode}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                              onClick={() => {
                                updateKYC(kyc.id, {
                                  status: "approved",
                                  adminRemark: "Verified by HR",
                                });
                                toast.success("KYC approved.");
                              }}
                              data-ocid="hr_kyc.confirm_button"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              className="px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600"
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
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
