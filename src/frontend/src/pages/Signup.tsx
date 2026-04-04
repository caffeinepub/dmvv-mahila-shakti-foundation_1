import LogoImage from "@/components/LogoImage";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { type User, useApp } from "@/context/AppContext";
import { FileText } from "lucide-react";
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
    // KYC / Identity fields
    fatherName: "",
    dob: "",
    gender: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    aadhaarNumber: "",
    panNumber: "",
    nomineeName: "",
    nomineeRelation: "",
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
        fatherName: form.fatherName || undefined,
        dob: form.dob || undefined,
        gender: form.gender || undefined,
        address: form.address || undefined,
        district: form.district || undefined,
        state: form.state || undefined,
        pincode: form.pincode || undefined,
        aadhaarNumber: form.aadhaarNumber || undefined,
        panNumber: form.panNumber || undefined,
        nomineeName: form.nomineeName || undefined,
        nomineeRelation: form.nomineeRelation || undefined,
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
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <LogoImage className="h-14 mx-auto mb-2" alt="Logo" />
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
            {/* ── Basic Information ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
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
                    <SelectItem value="center">
                      Center (Mahila Kendra)
                    </SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* ── KYC / Identity Section ── */}
            <div className="pt-2">
              <Separator className="mb-4" />
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-ngo-green/10">
                  <FileText size={16} className="text-ngo-green" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    KYC / Identity Details
                  </h3>
                  <p className="text-xs text-gray-500">
                    Aadhaar, PAN &amp; personal details (optional — can be
                    filled later)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    value={form.fatherName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fatherName: e.target.value }))
                    }
                    placeholder="Father's full name"
                    className="mt-1"
                    data-ocid="signup.input"
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={form.dob}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, dob: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="signup.input"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={form.gender}
                    onValueChange={(v) => setForm((p) => ({ ...p, gender: v }))}
                  >
                    <SelectTrigger className="mt-1" data-ocid="signup.select">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={form.pincode}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, pincode: e.target.value }))
                    }
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className="mt-1"
                    data-ocid="signup.input"
                  />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={form.district}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, district: e.target.value }))
                    }
                    placeholder="Your district"
                    className="mt-1"
                    data-ocid="signup.input"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={form.state}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, state: e.target.value }))
                    }
                    placeholder="Your state"
                    className="mt-1"
                    data-ocid="signup.input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={form.address}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, address: e.target.value }))
                    }
                    placeholder="House no., street, village/city"
                    rows={2}
                    className="mt-1 resize-none"
                    data-ocid="signup.textarea"
                  />
                </div>

                {/* KYC Documents */}
                <div>
                  <Label htmlFor="aadhaarNumber">
                    <span className="flex items-center gap-1">
                      Aadhaar Number
                      <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0 ml-1 font-normal">
                        KYC
                      </Badge>
                    </span>
                  </Label>
                  <Input
                    id="aadhaarNumber"
                    value={form.aadhaarNumber}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        aadhaarNumber: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                    className="mt-1"
                    data-ocid="signup.input"
                  />
                </div>
                <div>
                  <Label htmlFor="panNumber">
                    <span className="flex items-center gap-1">
                      PAN Number
                      <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0 ml-1 font-normal">
                        KYC
                      </Badge>
                    </span>
                  </Label>
                  <Input
                    id="panNumber"
                    value={form.panNumber}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        panNumber: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="e.g. ABCDE1234F"
                    maxLength={10}
                    className="mt-1 uppercase"
                    data-ocid="signup.input"
                  />
                </div>

                {/* Nominee */}
                <div>
                  <Label htmlFor="nomineeName">Nominee Name</Label>
                  <Input
                    id="nomineeName"
                    value={form.nomineeName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, nomineeName: e.target.value }))
                    }
                    placeholder="Nominee's full name"
                    className="mt-1"
                    data-ocid="signup.input"
                  />
                </div>
                <div>
                  <Label htmlFor="nomineeRelation">Nominee Relation</Label>
                  <Input
                    id="nomineeRelation"
                    value={form.nomineeRelation}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        nomineeRelation: e.target.value,
                      }))
                    }
                    placeholder="e.g. Mother, Spouse"
                    className="mt-1"
                    data-ocid="signup.input"
                  />
                </div>
              </div>
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
