import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
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

export default function Login() {
  const { users, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );
      if (!user) {
        toast.error("Invalid email or password.");
        setLoading(false);
        return;
      }
      if (user.status === "pending") {
        toast.warning("Your account is pending admin approval. Please wait.");
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
      toast.success(`Welcome back, ${user.fullName}!`);
      navigate(getDashboardPath(user.role));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <img
              src="/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png"
              alt="Logo"
              className="h-14 mx-auto mb-2"
            />
            <Badge className="bg-ngo-green text-white mb-2">Secure Login</Badge>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Login to Your Account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              DMVV Bhartiy Mahila Shakti Foundation Portal
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
            data-ocid="login.modal"
          >
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address daalen"
                className="mt-1"
                autoComplete="email"
                data-ocid="login.input"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password daalen"
                className="mt-1"
                autoComplete="current-password"
                data-ocid="login.input"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-ngo-green text-white hover:bg-ngo-green-dark"
              disabled={loading}
              data-ocid="login.submit_button"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-ngo-green font-semibold hover:underline"
              data-ocid="login.link"
            >
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
