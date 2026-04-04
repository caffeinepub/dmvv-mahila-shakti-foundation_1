import LogoImage from "@/components/LogoImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { ArrowLeft, Handshake, LogIn, Store } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function FranchisePartnerLogin() {
  const { users, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = users.find(
        (u) =>
          u.email === email &&
          u.password === password &&
          u.role === "franchise",
      );
      if (!user) {
        toast.error("Invalid credentials or not a franchise partner account.");
        setLoading(false);
        return;
      }
      if (user.status !== "approved") {
        toast.warning("Your franchise account is pending approval.");
        setLoading(false);
        return;
      }
      setCurrentUser(user);
      toast.success(`Welcome, ${user.fullName}!`);
      navigate("/franchise-partner/dashboard");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 mx-auto">
            <LogoImage className="h-12 w-12 object-contain" alt="DMVV Logo" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Franchise Partner Portal
          </h1>
          <p className="text-green-200 text-sm mt-1">
            DMVV Bhartiy Mahila Shakti Foundation™
          </p>
        </div>

        <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-green-400 to-emerald-500" />
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-green-50 border border-green-100">
              <div className="p-2 rounded-lg bg-green-600">
                <Store size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-800 text-sm">
                  Franchise Partner Login
                </p>
                <p className="text-xs text-green-600">
                  Access your franchise CRM dashboard
                </p>
              </div>
              <Handshake size={18} className="ml-auto text-green-500" />
            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-4"
              data-ocid="franchise_login.form"
            >
              <div>
                <Label htmlFor="fp-email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="fp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@example.com"
                  className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  autoComplete="email"
                  data-ocid="franchise_login.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="fp-password"
                  className="text-gray-700 font-medium"
                >
                  Password
                </Label>
                <Input
                  id="fp-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  autoComplete="current-password"
                  data-ocid="franchise_login.input"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-xl transition-all"
                disabled={loading}
                data-ocid="franchise_login.submit_button"
              >
                <LogIn size={16} className="mr-2" />
                {loading ? "Logging in..." : "Login to Dashboard"}
              </Button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              Forgot Password?{" "}
              <span className="text-green-600 font-medium">Contact Admin</span>
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-5">
          <Link
            to="/role-login"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white text-sm transition-colors"
            data-ocid="franchise_login.link"
          >
            <ArrowLeft size={14} />
            Back to Role Login
          </Link>
        </div>
      </div>
    </div>
  );
}
