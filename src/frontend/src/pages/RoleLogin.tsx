import LogoImage from "@/components/LogoImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import {
  BookOpen,
  Building2,
  ChevronRight,
  LogIn,
  Shield,
  Truck,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function getDashboardPath(role: string): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "center":
      return "/center/dashboard";
    case "supervisor":
      return "/supervisor/dashboard";
    case "transport":
      return "/transport/dashboard";
    case "hr":
      return "/hr/dashboard";
    default:
      return "/user/dashboard";
  }
}

const roles = [
  {
    id: "user",
    label: "\u0938\u0926\u0938\u094d\u092f / Member",
    sublabel: "Registered member login",
    icon: <User size={28} className="text-green-600" />,
    color: "border-green-400 hover:bg-green-50",
    badge: "bg-green-100 text-green-700",
  },
  {
    id: "admin",
    label: "Admin",
    sublabel: "Administrator portal",
    icon: <Shield size={28} className="text-purple-600" />,
    color: "border-purple-400 hover:bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    id: "center",
    label: "\u0915\u0947\u0902\u0926\u094d\u0930 / Center",
    sublabel: "Center manager login",
    icon: <Building2 size={28} className="text-blue-600" />,
    color: "border-blue-400 hover:bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    id: "supervisor",
    label: "Supervisor",
    sublabel: "Field supervisor login",
    icon: <Users size={28} className="text-orange-600" />,
    color: "border-orange-400 hover:bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    id: "transport",
    label: "Transport",
    sublabel: "Transport team login",
    icon: <Truck size={28} className="text-teal-600" />,
    color: "border-teal-400 hover:bg-teal-50",
    badge: "bg-teal-100 text-teal-700",
  },
  {
    id: "hr",
    label: "HR",
    sublabel: "HR department login",
    icon: <BookOpen size={28} className="text-pink-600" />,
    color: "border-pink-400 hover:bg-pink-50",
    badge: "bg-pink-100 text-pink-700",
  },
];

export default function RoleLogin() {
  const { users, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Both email and password are required.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = users.find(
        (u) =>
          u.email === email &&
          u.password === password &&
          (selectedRole ? u.role === selectedRole : true),
      );
      if (!user) {
        toast.error(
          selectedRole
            ? "Incorrect email or password for this role."
            : "Invalid email or password.",
        );
        setLoading(false);
        return;
      }
      if (user.status === "pending") {
        toast.warning("Your account is pending admin approval.");
        setLoading(false);
        return;
      }
      if (user.status === "rejected") {
        toast.error(
          "Your account has been rejected. Please contact the admin.",
        );
        setLoading(false);
        return;
      }
      setCurrentUser(user);
      toast.success(`Welcome, ${user.fullName}!`);
      navigate(getDashboardPath(user.role));
      setLoading(false);
    }, 800);
  };

  const selectedRoleInfo = roles.find((r) => r.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <LogoImage className="h-16 mx-auto mb-3" alt="DMVV Logo" />
          <h1 className="text-2xl font-extrabold text-gray-900">
            DMVV Portal Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Choose your role and login
          </p>
        </div>

        {!selectedRole ? (
          <div>
            <h2 className="text-center text-lg font-semibold text-gray-700 mb-5">
              Who are you? Select your role:
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center p-5 rounded-2xl border-2 bg-white shadow-sm transition-all cursor-pointer group ${role.color}`}
                  data-ocid={`role_login.role_card.${role.id}`}
                >
                  <div className="mb-3 p-3 rounded-full bg-gray-50 group-hover:scale-110 transition-transform">
                    {role.icon}
                  </div>
                  <span className="font-bold text-gray-800 text-sm text-center leading-tight">
                    {role.label}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 text-center">
                    {role.sublabel}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-gray-400 mt-2 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              For direct login:{" "}
              <Link
                to="/login"
                className="text-ngo-green font-semibold hover:underline"
              >
                General Login
              </Link>
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-gray-50">
                  <div className="p-2 rounded-full bg-white shadow-sm">
                    {selectedRoleInfo?.icon}
                  </div>
                  <div>
                    <Badge className={selectedRoleInfo?.badge}>
                      {selectedRoleInfo?.label}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {selectedRoleInfo?.sublabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole(null);
                      setEmail("");
                      setPassword("");
                    }}
                    className="ml-auto text-xs text-gray-400 hover:text-gray-600 underline"
                  >
                    Badlein
                  </button>
                </div>

                <form
                  onSubmit={handleLogin}
                  className="space-y-4"
                  data-ocid="role_login.form"
                >
                  <div>
                    <Label htmlFor="rl-email">Email Address</Label>
                    <Input
                      id="rl-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="mt-1"
                      autoComplete="email"
                      data-ocid="role_login.email_input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rl-password">Password</Label>
                    <Input
                      id="rl-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="mt-1"
                      autoComplete="current-password"
                      data-ocid="role_login.password_input"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-ngo-green text-white hover:bg-green-700"
                    disabled={loading}
                    data-ocid="role_login.submit_button"
                  >
                    <LogIn size={16} className="mr-2" />
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-ngo-green font-semibold hover:underline"
                  >
                    Register Karein
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
