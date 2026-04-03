import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Building2, CheckCircle, Clock, FileCheck, Users } from "lucide-react";

export default function AdminDashboard() {
  const { users, kycs, centers } = useApp();

  const totalUsers = users.filter((u) => u.role !== "admin").length;
  const pendingApprovals = users.filter((u) => u.status === "pending").length;
  const approvedUsers = users.filter(
    (u) => u.status === "approved" && u.role !== "admin",
  ).length;
  const pendingKYC = kycs.filter((k) => k.status === "pending").length;
  const approvedKYC = kycs.filter((k) => k.status === "approved").length;
  const activeCenters = centers.filter((c) => c.isActive).length;

  const statCards = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending Approvals",
      value: pendingApprovals,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Approved Users",
      value: approvedUsers,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Pending KYC",
      value: pendingKYC,
      icon: FileCheck,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Approved KYC",
      value: approvedKYC,
      icon: CheckCircle,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      label: "Active Centers",
      value: activeCenters,
      icon: Building2,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Card key={card.label} data-ocid="admin_dashboard.card">
            <CardContent
              className={`p-5 flex items-center gap-4 ${card.bg} rounded-lg`}
            >
              <card.icon size={28} className={card.color} />
              <div>
                <div className={`text-2xl font-extrabold ${card.color}`}>
                  {card.value}
                </div>
                <div className="text-sm text-gray-600">{card.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="font-bold text-gray-900 mb-4">
              Recent User Registrations
            </h2>
            <div className="space-y-3">
              {users
                .filter((u) => u.role !== "admin")
                .slice(-5)
                .reverse()
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <div className="font-medium text-gray-800">
                        {user.fullName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {user.email} • {user.role}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${
                        user.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : user.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="font-bold text-gray-900 mb-4">
              Recent KYC Submissions
            </h2>
            <div className="space-y-3">
              {kycs
                .slice(-5)
                .reverse()
                .map((kyc) => {
                  const user = users.find((u) => u.id === kyc.userId);
                  return (
                    <div
                      key={kyc.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div>
                        <div className="font-medium text-gray-800">
                          {user?.fullName || "Unknown"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {kyc.submittedAt} • {kyc.bankName}
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${
                          kyc.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : kyc.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {kyc.status}
                      </span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
