import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { AlertCircle, FileCheck, User } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { currentUser, kycs } = useApp();

  if (!currentUser) return <Navigate to="/login" replace />;

  const myKYC = kycs.find((k) => k.userId === currentUser.id);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome, {currentUser.fullName}
          </h1>
          <p className="text-gray-500 mt-1">
            Your DMVV Foundation member dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Account Status */}
          <Card className="border-l-4 border-green-400">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <User size={24} className="text-ngo-green" />
                <h3 className="font-bold text-gray-800">Account Status</h3>
              </div>
              <Badge className="bg-green-100 text-green-700 capitalize">
                {currentUser.status}
              </Badge>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <div>
                  <span className="font-medium">Role:</span>{" "}
                  <span className="capitalize">{currentUser.role}</span>
                </div>
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  {currentUser.email}
                </div>
                <div>
                  <span className="font-medium">Mobile:</span>{" "}
                  {currentUser.mobile}
                </div>
                <div>
                  <span className="font-medium">Joined:</span>{" "}
                  {currentUser.createdAt}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KYC Status */}
          <Card className="border-l-4 border-orange-400">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <FileCheck size={24} className="text-ngo-orange" />
                <h3 className="font-bold text-gray-800">KYC Status</h3>
              </div>
              {myKYC ? (
                <>
                  <Badge
                    className={`${
                      myKYC.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : myKYC.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    } capitalize`}
                  >
                    {myKYC.status}
                  </Badge>
                  {myKYC.adminRemark && (
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>Admin Remark:</strong> {myKYC.adminRemark}
                    </div>
                  )}
                  <div className="mt-3">
                    <Link to="/user/kyc">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-ngo-green text-ngo-green w-full"
                        data-ocid="user_dashboard.edit_button"
                      >
                        View / Update KYC
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-yellow-600 mb-3">
                    <AlertCircle size={16} />
                    <span className="text-sm">KYC not submitted</span>
                  </div>
                  <Link to="/user/kyc">
                    <Button
                      size="sm"
                      className="bg-ngo-orange text-white hover:bg-ngo-orange-dark w-full"
                      data-ocid="user_dashboard.primary_button"
                    >
                      Submit KYC Now
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-l-4 border-blue-400">
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-800 mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/schemes">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left"
                    data-ocid="user_dashboard.secondary_button"
                  >
                    📋 View Schemes
                  </Button>
                </Link>
                <Link to="/training">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left"
                    data-ocid="user_dashboard.secondary_button"
                  >
                    🎓 Training Programs
                  </Button>
                </Link>
                <Link to="/loan">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left"
                    data-ocid="user_dashboard.secondary_button"
                  >
                    💰 Loan Schemes
                  </Button>
                </Link>
                <Link to="/downloads">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left"
                    data-ocid="user_dashboard.secondary_button"
                  >
                    📥 Downloads
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: currentUser.fullName },
                { label: "Email", value: currentUser.email },
                { label: "Mobile", value: currentUser.mobile },
                { label: "Role", value: currentUser.role, capitalize: true },
                {
                  label: "Account Status",
                  value: currentUser.status,
                  capitalize: true,
                },
                { label: "Member Since", value: currentUser.createdAt },
              ].map((field) => (
                <div key={field.label} className="flex flex-col">
                  <span className="text-xs text-gray-400 font-medium">
                    {field.label}
                  </span>
                  <span
                    className={`text-sm text-gray-800 font-semibold mt-0.5 ${field.capitalize ? "capitalize" : ""}`}
                  >
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
