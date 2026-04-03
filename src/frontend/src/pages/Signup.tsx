import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type User, useApp } from "@/context/AppContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const { addUser, users } = useApp();
  const _navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" as User["role"],
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.mobile || !form.email || !form.password) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (users.find((u) => u.email === form.email)) {
      toast.error("An account with this email already exists.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: `user_${Date.now()}`,
        fullName: form.fullName,
        mobile: form.mobile,
        email: form.email,
        password: form.password,
        role: form.role,
        status: "pending",
        createdAt: new Date().toISOString().slice(0, 10),
        isVerified: false,
      };
      addUser(newUser);
      setLoading(false);
      setDone(true);
    }, 1000);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card className="max-w-md w-full" data-ocid="signup.success_state">
          <CardContent className="p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Registration Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Your registration is <strong>pending admin approval</strong>. You
              will be notified once approved.
            </p>
            <Link to="/login">
              <Button
                className="bg-ngo-green text-white hover:bg-ngo-green-dark w-full"
                data-ocid="signup.primary_button"
              >
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <Badge className="bg-ngo-orange text-white mb-2">
              New Registration
            </Badge>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Create Your Account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Join DMVV Bhartiy Mahila Shakti Foundation
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="signup.modal"
          >
            <div>
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fullName: e.target.value }))
                }
                placeholder="Enter your full name"
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>
            <div>
              <Label htmlFor="mobile">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mobile"
                value={form.mobile}
                onChange={(e) =>
                  setForm((p) => ({ ...p, mobile: e.target.value }))
                }
                placeholder="10-digit mobile number"
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>
            <div>
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>
            <div>
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                placeholder="Minimum 6 characters"
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((p) => ({ ...p, confirmPassword: e.target.value }))
                }
                placeholder="Repeat your password"
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>
            <div>
              <Label>
                Register As <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.role}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, role: v as User["role"] }))
                }
              >
                <SelectTrigger className="mt-1" data-ocid="signup.select">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User (Beneficiary)</SelectItem>
                  <SelectItem value="center">Center (Mahila Kendra)</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-ngo-green text-white hover:bg-ngo-green-dark"
              disabled={loading}
              data-ocid="signup.submit_button"
            >
              {loading ? "Registering..." : "Register Now"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-ngo-green font-semibold hover:underline"
              data-ocid="signup.link"
            >
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
