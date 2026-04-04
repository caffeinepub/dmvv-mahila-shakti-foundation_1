import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  type IncomeSource,
  type InsuranceApplication,
  type LoanApplication,
  type Order,
  type TrainingEnrollment,
  type VolunteerActivity,
  useApp,
} from "@/context/AppContext";
import {
  AlertCircle,
  Award,
  Bolt,
  Briefcase,
  Building2,
  Bus,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Droplets,
  FileCheck,
  Flame,
  GraduationCap,
  HandHeart,
  History,
  IndianRupee,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Package,
  Phone,
  Printer,
  RefreshCw,
  Settings,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  Tv,
  User,
  Wallet,
  Wifi,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "My Profile", key: "profile", icon: User },
  { label: "ID Card & Certificate", key: "idcard", icon: CreditCard },
  { label: "Loan Apply", key: "loan", icon: IndianRupee },
  { label: "Multiple Income", key: "income", icon: Briefcase },
  { label: "Training", key: "training", icon: GraduationCap },
  { label: "Volunteer Work", key: "volunteer", icon: HandHeart },
  { label: "Product Shopping", key: "shopping", icon: ShoppingCart },
  { label: "Utilities", key: "utilities", icon: Wrench },
  { label: "Insurance", key: "insurance", icon: Shield },
  { label: "My Wallet", key: "wallet", icon: Wallet },
  { label: "KYC", key: "kyc", icon: FileCheck },
];

async function downloadAsPDF(elementId: string, filename: string) {
  const el = document.getElementById(elementId);
  if (!el) return;
  try {
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width / 2, canvas.height / 2],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(filename);
    toast.success("PDF download started!");
  } catch {
    toast.error("Error downloading PDF. Please try again.");
  }
}

export default function UserDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-ngo-green text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div>
            <div className="font-bold text-sm">Member Dashboard</div>
            <div className="text-xs text-green-300 truncate max-w-[160px]">
              {currentUser.fullName}
            </div>
            {currentUser.memberId && (
              <div className="text-xs text-green-400">
                {currentUser.memberId}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.key}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
                section === item.key
                  ? "bg-green-700 font-semibold"
                  : "text-green-100 hover:bg-green-700"
              }`}
              onClick={() => {
                setSection(item.key);
                setSidebarOpen(false);
              }}
              data-ocid={`user_nav.${item.key}.link`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-green-700">
          <Button
            variant="ghost"
            className="w-full text-red-300 hover:text-red-100 hover:bg-red-900/30 justify-start"
            onClick={handleLogout}
            data-ocid="user_nav.close_button"
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

      <div className="flex-1 lg:ml-64 flex flex-col">
        <div className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-ocid="user.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800">
            {navItems.find((n) => n.key === section)?.label || "Dashboard"} —
            Member Panel
          </span>
        </div>
        <main className="flex-1 p-4 md:p-6">
          {section === "dashboard" && <UserHome setSection={setSection} />}
          {section === "profile" && <UserProfile />}
          {section === "idcard" && <UserIDCard />}
          {section === "loan" && <UserLoan />}
          {section === "income" && <UserIncome />}
          {section === "training" && <UserTraining />}
          {section === "volunteer" && <UserVolunteer />}
          {section === "shopping" && <UserShopping />}
          {section === "utilities" && <UserUtilities />}
          {section === "insurance" && <UserInsurance />}
          {section === "wallet" && <UserWallet />}
          {section === "kyc" && (
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-xl font-bold mb-4">KYC Verification</h2>
              <p className="text-gray-600 mb-4">
                Submit your KYC documents for account verification.
              </p>
              <Link to="/user/kyc">
                <Button
                  className="bg-ngo-green text-white"
                  data-ocid="user_kyc.primary_button"
                >
                  Go to KYC Page
                </Button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Home Section ───

function UserHome({ setSection }: { setSection: (s: string) => void }) {
  const { currentUser, kycs, walletTransactions } = useApp();
  if (!currentUser) return null;

  const myKYC = kycs.find((k) => k.userId === currentUser.id);
  const myTxns = walletTransactions.filter((t) => t.userId === currentUser.id);
  const walletBalance = myTxns.reduce(
    (sum, t) => sum + (t.type === "credit" ? t.amount : -t.amount),
    0,
  );

  const quickActions = [
    {
      label: "Apply Loan",
      key: "loan",
      icon: IndianRupee,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "My Training",
      key: "training",
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Shop Products",
      key: "shopping",
      icon: ShoppingCart,
      color: "bg-orange-100 text-orange-700",
    },
    {
      label: "Insurance",
      key: "insurance",
      icon: Shield,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "ID Card",
      key: "idcard",
      icon: CreditCard,
      color: "bg-pink-100 text-pink-700",
    },
    {
      label: "Volunteer",
      key: "volunteer",
      icon: HandHeart,
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Utilities",
      key: "utilities",
      icon: Wrench,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "My Wallet",
      key: "wallet",
      icon: Wallet,
      color: "bg-teal-100 text-teal-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-ngo-green to-green-600 text-white rounded-2xl p-6">
        <h1 className="text-2xl font-extrabold">
          Namaskar, {currentUser.fullName}! 🙏
        </h1>
        <p className="text-green-100 mt-1">DMVV Foundation Member Dashboard</p>
        {currentUser.memberId && (
          <span className="inline-block mt-2 bg-white/20 px-3 py-1 rounded-full text-sm font-mono">
            {currentUser.memberId}
          </span>
        )}
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-green-400">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <User size={18} className="text-ngo-green" />
              <span className="font-semibold text-gray-800">
                Account Status
              </span>
            </div>
            <Badge
              className={`capitalize ${
                currentUser.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : currentUser.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {currentUser.status}
            </Badge>
            <div className="mt-2 text-xs text-gray-500">
              Role:{" "}
              <span className="capitalize font-medium">{currentUser.role}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-400">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck size={18} className="text-ngo-orange" />
              <span className="font-semibold text-gray-800">KYC Status</span>
            </div>
            {myKYC ? (
              <Badge
                className={`capitalize ${
                  myKYC.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : myKYC.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {myKYC.status}
              </Badge>
            ) : (
              <div className="flex items-center gap-1 text-yellow-600 text-sm">
                <AlertCircle size={14} /> Not submitted
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-blue-400">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={18} className="text-blue-600" />
              <span className="font-semibold text-gray-800">
                Wallet Balance
              </span>
            </div>
            <div className="text-2xl font-extrabold text-blue-700">
              ₹{walletBalance.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <button
              key={a.key}
              type="button"
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${a.color} hover:opacity-90 transition-opacity`}
              onClick={() => setSection(a.key)}
              data-ocid={`user_home.${a.key}.button`}
            >
              <a.icon size={24} />
              <span className="text-xs font-semibold text-center">
                {a.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notice */}
      <Card className="border-l-4 border-yellow-400 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Zap size={18} className="text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-bold text-yellow-800">Notice</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Please complete your KYC verification to become eligible for
                loans, insurance, and training programs. For help, call +91
                9876543210.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Profile Section ───

function UserProfile() {
  const { currentUser, updateUser } = useApp();
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [pwForm, setPwForm] = useState({ oldPw: "", newPw: "", confirmPw: "" });

  if (!currentUser) return null;

  const handleEditSave = () => {
    updateUser(currentUser.id, {
      fullName: form.fullName || currentUser.fullName,
      mobile: form.mobile || currentUser.mobile,
      fatherName: form.fatherName || currentUser.fatherName,
      dob: form.dob || currentUser.dob,
      address: form.address || currentUser.address,
      district: form.district || currentUser.district,
      state: form.state || currentUser.state,
      pincode: form.pincode || currentUser.pincode,
    });
    toast.success("Profile updated successfully!");
    setEditing(false);
  };

  const handlePasswordChange = () => {
    if (pwForm.oldPw !== currentUser.password) {
      toast.error("Old password incorrect.");
      return;
    }
    if (pwForm.newPw !== pwForm.confirmPw) {
      toast.error("New passwords do not match.");
      return;
    }
    if (pwForm.newPw.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    updateUser(currentUser.id, { password: pwForm.newPw });
    toast.success("Password changed successfully!");
    setChangingPassword(false);
    setPwForm({ oldPw: "", newPw: "", confirmPw: "" });
  };

  const fields = [
    ["Full Name", "fullName", currentUser.fullName],
    ["Father's Name", "fatherName", currentUser.fatherName || ""],
    ["Date of Birth", "dob", currentUser.dob || ""],
    ["Mobile", "mobile", currentUser.mobile],
    ["Email", "email", currentUser.email],
    ["Address", "address", currentUser.address || ""],
    ["District", "district", currentUser.district || ""],
    ["State", "state", currentUser.state || ""],
    ["Pincode", "pincode", currentUser.pincode || ""],
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>My Profile</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditing(!editing);
                setForm({});
              }}
              data-ocid="user_profile.edit_button"
            >
              <Settings size={14} className="mr-1" />{" "}
              {editing ? "Cancel" : "Edit Profile"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-orange-300 text-orange-600"
              onClick={() => setChangingPassword(!changingPassword)}
              data-ocid="user_profile.secondary_button"
            >
              Change Password
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(([label, key, val]) => (
                <div key={key}>
                  <Label className="text-xs text-gray-500">{label}</Label>
                  <Input
                    defaultValue={val}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                    className="mt-1"
                    disabled={key === "email"}
                    data-ocid="user_profile.input"
                  />
                </div>
              ))}
              <div className="md:col-span-2 flex gap-2">
                <Button
                  onClick={handleEditSave}
                  className="bg-ngo-green text-white"
                  data-ocid="user_profile.save_button"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditing(false)}
                  data-ocid="user_profile.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(([label, , val]) => (
                <div key={label}>
                  <span className="text-xs text-gray-400 font-medium">
                    {label}
                  </span>
                  <div className="text-sm text-gray-800 font-semibold mt-0.5">
                    {val || "—"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {changingPassword && (
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-w-sm">
              <div>
                <Label>Old Password</Label>
                <Input
                  type="password"
                  value={pwForm.oldPw}
                  onChange={(e) =>
                    setPwForm((p) => ({ ...p, oldPw: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="user_profile.input"
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={pwForm.newPw}
                  onChange={(e) =>
                    setPwForm((p) => ({ ...p, newPw: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="user_profile.input"
                />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={pwForm.confirmPw}
                  onChange={(e) =>
                    setPwForm((p) => ({ ...p, confirmPw: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="user_profile.input"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handlePasswordChange}
                  className="bg-ngo-green text-white"
                  data-ocid="user_profile.submit_button"
                >
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setChangingPassword(false)}
                  data-ocid="user_profile.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── ID Card Section ───

function UserIDCard() {
  const { currentUser, settings } = useApp();
  const [selectedDesign, setSelectedDesign] = useState(0);
  if (!currentUser) return null;

  const designs = [
    {
      name: "Green Classic",
      bg: "linear-gradient(135deg, #0F4A2E 0%, #1a7a4a 100%)",
      accent: "#F28C28",
      text: "#fff",
    },
    {
      name: "Royal Blue",
      bg: "linear-gradient(135deg, #1a237e 0%, #1976D2 100%)",
      accent: "#FFD700",
      text: "#fff",
    },
    {
      name: "Deep Purple",
      bg: "linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)",
      accent: "#E91E63",
      text: "#fff",
    },
    {
      name: "Maroon Gold",
      bg: "linear-gradient(135deg, #880E4F 0%, #C62828 100%)",
      accent: "#FFD700",
      text: "#fff",
    },
  ];
  const d = designs[selectedDesign];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="idcard">
        <TabsList>
          <TabsTrigger value="idcard" data-ocid="user_idcard.tab">
            ID Card
          </TabsTrigger>
          <TabsTrigger value="certificate" data-ocid="user_idcard.tab">
            Certificate
          </TabsTrigger>
          <TabsTrigger value="achievements" data-ocid="user_idcard.tab">
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="idcard">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Design Select Karein:
            </h3>
            <div className="flex flex-wrap gap-2">
              {designs.map((des, i) => (
                <button
                  key={des.name}
                  type="button"
                  onClick={() => setSelectedDesign(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                    selectedDesign === i
                      ? "border-ngo-green shadow-md"
                      : "border-gray-200"
                  }`}
                  style={{ background: des.bg, color: des.text }}
                  data-ocid="user_idcard.toggle"
                >
                  {des.name}
                </button>
              ))}
            </div>
          </div>

          {/* PVC Card */}
          <div
            id="user-id-card"
            className="w-[340px] h-[214px] rounded-2xl p-4 shadow-2xl text-white relative overflow-hidden"
            style={{ background: d.bg }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
              style={{
                background: d.accent,
                transform: "translate(20px,-30px)",
              }}
            />
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/20 flex items-center justify-center flex-shrink-0">
                {currentUser.photoUrl ? (
                  <img
                    src={currentUser.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-white/70" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] opacity-70">
                  DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
                </div>
                <div className="font-extrabold text-sm truncate">
                  {currentUser.fullName}
                </div>
                <div className="text-xs opacity-80 capitalize">
                  {currentUser.role}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: d.accent }}>
                  {currentUser.memberId || "DMVV/2025/XXX"}
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1 text-[10px]">
              <div>
                <span className="opacity-60">Mobile: </span>
                {currentUser.mobile}
              </div>
              <div>
                <span className="opacity-60">Joined: </span>
                {currentUser.createdAt}
              </div>
              <div>
                <span className="opacity-60">Access: </span>
                {currentUser.accessCode || "—"}
              </div>
              <div>
                <span className="opacity-60">Status: </span>
                <span
                  style={{ color: d.accent }}
                  className="font-bold capitalize"
                >
                  {currentUser.status}
                </span>
              </div>
            </div>
            {(settings.signatureUrl || settings.authorityName) && (
              <div className="absolute bottom-3 right-4 text-right">
                {settings.signatureUrl && (
                  <img
                    src={settings.signatureUrl}
                    alt="Signature"
                    className="h-6 ml-auto mb-0.5"
                  />
                )}
                <div className="text-[9px] opacity-80">
                  {settings.authorityName}
                </div>
                <div className="text-[8px] opacity-60">
                  {settings.authorityDesignation}
                </div>
              </div>
            )}
            {settings.sealUrl && (
              <img
                src={settings.sealUrl}
                alt="Seal"
                className="absolute bottom-2 left-4 h-10 opacity-80"
              />
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              onClick={() =>
                downloadAsPDF(
                  "user-id-card",
                  `ID_Card_${currentUser.memberId}.pdf`,
                )
              }
              className="bg-ngo-green text-white"
              data-ocid="user_idcard.primary_button"
            >
              <Printer size={14} className="mr-2" /> Download PDF
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="certificate">
          <div
            id="user-certificate"
            className="max-w-[600px] bg-white border-4 border-green-700 rounded-2xl p-8 shadow-xl relative"
          >
            <div className="text-center mb-4">
              <img
                src="/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png"
                alt="Logo"
                className="h-16 mx-auto mb-2"
              />
              <h2 className="text-2xl font-extrabold text-green-800">
                DMVV Bhartiy Mahila Shakti Foundation™
              </h2>
              <div className="text-sm text-gray-500">
                Membership Certificate
              </div>
            </div>
            <div className="border-t border-b border-green-200 py-4 my-4 text-center">
              <p className="text-gray-600 text-sm">This is to certify that</p>
              <h3 className="text-3xl font-extrabold text-green-800 mt-1">
                {currentUser.fullName}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                is a registered member of
              </p>
              <p className="font-bold text-gray-800">
                DMVV Bhartiy Mahila Shakti Foundation™
              </p>
              <div className="mt-2 text-sm text-gray-500">
                Member ID:{" "}
                <span className="font-mono font-bold text-green-700">
                  {currentUser.memberId || "DMVV/2025/XXX"}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Member Since: {currentUser.createdAt}
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                {settings.sealUrl && (
                  <img src={settings.sealUrl} alt="Seal" className="h-16" />
                )}
              </div>
              <div className="text-right">
                {settings.signatureUrl && (
                  <img
                    src={settings.signatureUrl}
                    alt="Signature"
                    className="h-10 ml-auto mb-1"
                  />
                )}
                <div className="text-sm font-bold">
                  {settings.authorityName}
                </div>
                <div className="text-xs text-gray-500">
                  {settings.authorityDesignation}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() =>
              downloadAsPDF(
                "user-certificate",
                `Certificate_${currentUser.memberId}.pdf`,
              )
            }
            className="bg-ngo-green text-white mt-4"
            data-ocid="user_idcard.primary_button"
          >
            <Printer size={14} className="mr-2" /> Download PDF
          </Button>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="space-y-3">
            {(currentUser.achievementCerts || []).length === 0 ? (
              <div
                className="text-center py-12 text-gray-400"
                data-ocid="user_achievements.empty_state"
              >
                <Award size={40} className="mx-auto mb-3 opacity-30" />
                No achievement certificates yet.
              </div>
            ) : (
              (currentUser.achievementCerts || []).map((ac, i) => (
                <Card key={ac.id} data-ocid={`user_achievements.item.${i + 1}`}>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gray-800">{ac.title}</h3>
                    <p className="text-sm text-gray-500">{ac.description}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      {ac.issuedDate} | {ac.awardedBy}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Loan Section ───

function UserLoan() {
  const { currentUser, loanApplications, addLoanApplication } = useApp();
  const [activeTab, setActiveTab] = useState("general");
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!currentUser) return null;

  const myApplications = loanApplications.filter(
    (a) => a.userId === currentUser.id,
  );
  const hasActiveLoan = myApplications.some(
    (a) =>
      a.status === "pending" ||
      a.status === "approved" ||
      a.status === "under_review",
  );

  const handleSubmit = (type: "general" | "shg" | "udhyog") => {
    if (
      !form.amount ||
      !form.purpose ||
      !form.bankName ||
      !form.accountNumber
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    const app: LoanApplication = {
      id: `loan_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userMobile: currentUser.mobile,
      loanType: type,
      amount: form.amount,
      purpose: form.purpose,
      bankName: form.bankName,
      accountNumber: form.accountNumber,
      ifscCode: form.ifscCode || "",
      guarantorName: form.guarantorName || "",
      guarantorPhone: form.guarantorPhone || "",
      businessDetails: form.businessDetails,
      shgName: form.shgName,
      shgMembersCount: form.shgMembersCount,
      businessName: form.businessName,
      businessType: form.businessType,
      gstNumber: form.gstNumber,
      status: "pending",
      appliedAt: new Date().toISOString().split("T")[0],
    };
    addLoanApplication(app);
    toast.success("Loan application submitted! Admin will review it.");
    setForm({});
    setSubmitting(false);
  };

  const statusColor = (s: string) => {
    if (s === "approved") return "bg-green-100 text-green-700";
    if (s === "rejected") return "bg-red-100 text-red-700";
    if (s === "under_review") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const F = ({
    label,
    k,
    placeholder,
    type = "text",
  }: { label: string; k: string; placeholder?: string; type?: string }) => (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={form[k] || ""}
        onChange={(e) => setForm((p) => ({ ...p, [k]: e.target.value }))}
        className="mt-1"
        data-ocid="user_loan.input"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Banner to SHG/Udhyog pages */}
      <div className="flex flex-wrap gap-3">
        <Link to="/shg-loan">
          <Button
            className="bg-blue-600 text-white"
            data-ocid="user_loan.secondary_button"
          >
            SHG Loan Yojana →
          </Button>
        </Link>
        <Link to="/udhyog-loan">
          <Button
            className="bg-orange-600 text-white"
            data-ocid="user_loan.secondary_button"
          >
            Udhyog Loan Yojana →
          </Button>
        </Link>
      </div>

      {/* Existing applications */}
      {myApplications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Meri Loan Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {myApplications.map((a, i) => (
              <div
                key={a.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                data-ocid={`user_loan.item.${i + 1}`}
              >
                <div>
                  <div className="font-semibold text-sm capitalize">
                    {a.loanType} Loan — ₹{a.amount}
                  </div>
                  <div className="text-xs text-gray-500">
                    {a.purpose} | {a.appliedAt}
                  </div>
                </div>
                <Badge className={`capitalize ${statusColor(a.status)}`}>
                  {a.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {hasActiveLoan ? (
        <Card className="bg-yellow-50 border-yellow-300">
          <CardContent className="p-4 text-yellow-800">
            <AlertCircle size={18} className="inline mr-2" />
            You already have a pending/approved loan application. Please wait
            for it to be resolved before applying again.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Apply for a Loan</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="general" data-ocid="user_loan.tab">
                  General Loan
                </TabsTrigger>
                <TabsTrigger value="shg" data-ocid="user_loan.tab">
                  SHG Loan
                </TabsTrigger>
                <TabsTrigger value="udhyog" data-ocid="user_loan.tab">
                  Udhyog Loan
                </TabsTrigger>
              </TabsList>

              {(["general", "shg", "udhyog"] as const).map((type) => (
                <TabsContent key={type} value={type}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <F
                      label="Loan Amount (₹) *"
                      k="amount"
                      placeholder="50000"
                    />
                    <F
                      label="Purpose *"
                      k="purpose"
                      placeholder="Business / Medical / Education"
                    />
                    <F
                      label="Monthly Income (₹)"
                      k="monthlyIncome"
                      placeholder="15000"
                    />
                    <F
                      label="Occupation"
                      k="occupation"
                      placeholder="Tailor / Farmer / Business"
                    />
                    {type === "shg" && (
                      <>
                        <F
                          label="SHG Group Name *"
                          k="shgName"
                          placeholder="Mahila Shakti SHG"
                        />
                        <F
                          label="SHG Members Count"
                          k="shgMembersCount"
                          placeholder="10"
                        />
                        <div className="md:col-span-2">
                          <Label className="text-xs">
                            Group Activity Description
                          </Label>
                          <Textarea
                            placeholder="Describe the group's activities..."
                            value={form.businessDetails || ""}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                businessDetails: e.target.value,
                              }))
                            }
                            className="mt-1"
                            data-ocid="user_loan.textarea"
                          />
                        </div>
                      </>
                    )}
                    {type === "udhyog" && (
                      <>
                        <F
                          label="Business Name *"
                          k="businessName"
                          placeholder="Sharma Enterprises"
                        />
                        <F
                          label="Business Type"
                          k="businessType"
                          placeholder="Manufacturing / Service / Retail"
                        />
                        <F
                          label="Business Age (Years)"
                          k="businessAge"
                          placeholder="3"
                        />
                        <F
                          label="Annual Turnover (₹)"
                          k="annualTurnover"
                          placeholder="500000"
                        />
                        <F
                          label="GST Number (Optional)"
                          k="gstNumber"
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </>
                    )}
                    <F
                      label="Bank Name *"
                      k="bankName"
                      placeholder="State Bank of India"
                    />
                    <F
                      label="Account Number *"
                      k="accountNumber"
                      placeholder="123456789012"
                    />
                    <F
                      label="IFSC Code"
                      k="ifscCode"
                      placeholder="SBIN0001234"
                    />
                    <F
                      label="Guarantor Name"
                      k="guarantorName"
                      placeholder="Ramesh Kumar"
                    />
                    <F
                      label="Guarantor Phone"
                      k="guarantorPhone"
                      placeholder="9876543210"
                    />
                    <div className="md:col-span-2">
                      <Button
                        onClick={() => handleSubmit(type)}
                        disabled={submitting}
                        className="bg-ngo-green text-white"
                        data-ocid="user_loan.submit_button"
                      >
                        {submitting
                          ? "Submitting..."
                          : `Apply for ${type === "shg" ? "SHG" : type === "udhyog" ? "Udhyog" : "General"} Loan`}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Income Section ───

function UserIncome() {
  const { currentUser, incomeSources, addIncomeSource, deleteIncomeSource } =
    useApp();
  const [form, setForm] = useState({
    source: "",
    type: "salary" as IncomeSource["type"],
    monthlyAmount: "",
    description: "",
  });
  if (!currentUser) return null;
  const myIncome = incomeSources.filter((s) => s.userId === currentUser.id);
  const totalMonthly = myIncome.reduce(
    (sum, s) => sum + (Number.parseFloat(s.monthlyAmount) || 0),
    0,
  );

  const handleAdd = () => {
    if (!form.source || !form.monthlyAmount) {
      toast.error("Please fill source and amount.");
      return;
    }
    addIncomeSource({
      id: `inc_${Date.now()}`,
      userId: currentUser.id,
      ...form,
      addedAt: new Date().toISOString().split("T")[0],
    });
    setForm({ source: "", type: "salary", monthlyAmount: "", description: "" });
    toast.success("Income source added!");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="text-sm text-gray-600">Total Monthly Income</div>
          <div className="text-3xl font-extrabold text-green-700">
            ₹{totalMonthly.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Income Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Income Source Name *</Label>
              <Input
                value={form.source}
                onChange={(e) =>
                  setForm((p) => ({ ...p, source: e.target.value }))
                }
                placeholder="e.g. Tailoring Business"
                className="mt-1"
                data-ocid="user_income.input"
              />
            </div>
            <div>
              <Label className="text-xs">Type *</Label>
              <Select
                value={form.type}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, type: v as IncomeSource["type"] }))
                }
              >
                <SelectTrigger className="mt-1" data-ocid="user_income.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(
                    [
                      "salary",
                      "business",
                      "farming",
                      "handicraft",
                      "other",
                    ] as const
                  ).map((t) => (
                    <SelectItem key={t} value={t} className="capitalize">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Monthly Amount (₹) *</Label>
              <Input
                type="number"
                value={form.monthlyAmount}
                onChange={(e) =>
                  setForm((p) => ({ ...p, monthlyAmount: e.target.value }))
                }
                placeholder="15000"
                className="mt-1"
                data-ocid="user_income.input"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Brief description"
                className="mt-1"
                data-ocid="user_income.input"
              />
            </div>
            <div className="md:col-span-2">
              <Button
                onClick={handleAdd}
                className="bg-ngo-green text-white"
                data-ocid="user_income.primary_button"
              >
                Add Income Source
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {myIncome.length === 0 ? (
          <div
            className="text-center py-10 text-gray-400"
            data-ocid="user_income.empty_state"
          >
            No income sources added yet. Use the form above to add one.
          </div>
        ) : (
          myIncome.map((s, i) => (
            <Card key={s.id} data-ocid={`user_income.item.${i + 1}`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">{s.source}</div>
                  <div className="text-sm text-gray-500 capitalize">
                    {s.type} | Added: {s.addedAt}
                  </div>
                  {s.description && (
                    <div className="text-xs text-gray-400">{s.description}</div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-extrabold text-green-700">
                    ₹{Number(s.monthlyAmount).toLocaleString()}/mo
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => {
                      deleteIncomeSource(s.id);
                      toast.success("Removed.");
                    }}
                    data-ocid={`user_income.delete_button.${i + 1}`}
                  >
                    ✕
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Training Section ───

function UserTraining() {
  const {
    currentUser,
    trainingPrograms,
    trainingEnrollments,
    addTrainingEnrollment,
  } = useApp();
  if (!currentUser) return null;
  const myEnrollments = trainingEnrollments.filter(
    (e) => e.userId === currentUser.id,
  );
  const activePrograms = trainingPrograms.filter((p) => p.isActive);

  const isEnrolled = (programId: string) =>
    myEnrollments.some((e) => e.programId === programId);

  const handleEnroll = (program: (typeof trainingPrograms)[0]) => {
    if (isEnrolled(program.id)) {
      toast.error("Already enrolled!");
      return;
    }
    const enrollment: TrainingEnrollment = {
      id: `enr_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      programName: program.title,
      programId: program.id,
      enrolledAt: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    addTrainingEnrollment(enrollment);
    toast.success(`Successfully enrolled in ${program.title}!`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available" data-ocid="user_training.tab">
            Available Programs
          </TabsTrigger>
          <TabsTrigger value="enrolled" data-ocid="user_training.tab">
            My Enrollments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePrograms.map((p, i) => (
              <Card
                key={p.id}
                className={`border ${p.color}`}
                data-ocid={`user_training.item.${i + 1}`}
              >
                <CardContent className="p-4">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="font-bold text-gray-800">{p.title}</h3>
                  <div className="text-xs text-gray-500 mt-1">
                    {p.duration} | {p.eligibility}
                  </div>
                  <div className="text-xs text-gray-500">{p.certification}</div>
                  <p className="text-sm text-gray-600 mt-2">{p.description}</p>
                  <Button
                    size="sm"
                    className={`mt-3 w-full ${isEnrolled(p.id) ? "bg-gray-200 text-gray-600" : "bg-ngo-green text-white"}`}
                    onClick={() => handleEnroll(p)}
                    disabled={isEnrolled(p.id)}
                    data-ocid={`user_training.primary_button.${i + 1}`}
                  >
                    {isEnrolled(p.id) ? "✓ Enrolled" : "Enroll Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled">
          <div className="space-y-3">
            {myEnrollments.length === 0 ? (
              <div
                className="text-center py-10 text-gray-400"
                data-ocid="user_training.empty_state"
              >
                No enrollments found.
              </div>
            ) : (
              myEnrollments.map((e, i) => (
                <Card key={e.id} data-ocid={`user_training.item.${i + 1}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {e.programName}
                      </div>
                      <div className="text-xs text-gray-500">
                        Enrolled: {e.enrolledAt}
                      </div>
                    </div>
                    <Badge
                      className={`capitalize ${
                        e.status === "enrolled"
                          ? "bg-green-100 text-green-700"
                          : e.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : e.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {e.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Volunteer Section ───

function UserVolunteer() {
  const { currentUser, volunteerActivities, addVolunteerActivity } = useApp();
  const [form, setForm] = useState({
    area: "",
    hoursPerWeek: "",
    availability: "",
    description: "",
  });
  if (!currentUser) return null;
  const myActivity = volunteerActivities.find(
    (v) => v.userId === currentUser.id,
  );

  const handleRegister = () => {
    if (!form.area || !form.hoursPerWeek) {
      toast.error("Please fill area and hours.");
      return;
    }
    const activity: VolunteerActivity = {
      id: `vol_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userMobile: currentUser.mobile,
      ...form,
      status: "pending",
      joinedAt: new Date().toISOString().split("T")[0],
    };
    addVolunteerActivity(activity);
    toast.success("Volunteer registration submitted! Admin will approve it.");
  };

  if (myActivity) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Volunteer Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">Area:</span>{" "}
              {myActivity.area}
            </div>
            <div>
              <span className="font-medium text-gray-600">Hours/Week:</span>{" "}
              {myActivity.hoursPerWeek}
            </div>
            <div>
              <span className="font-medium text-gray-600">Availability:</span>{" "}
              {myActivity.availability}
            </div>
            <div>
              <span className="font-medium text-gray-600">Joined:</span>{" "}
              {myActivity.joinedAt}
            </div>
            <div>
              <span className="font-medium text-gray-600">Description:</span>{" "}
              {myActivity.description}
            </div>
            <div>
              <span className="font-medium text-gray-600">Status: </span>
              <Badge
                className={`capitalize ${
                  myActivity.status === "active"
                    ? "bg-green-100 text-green-700"
                    : myActivity.status === "inactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {myActivity.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Become a volunteer with DMVV Foundation and serve your community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs">Area of Interest *</Label>
            <Input
              value={form.area}
              onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))}
              placeholder="Education / Health / Environment"
              className="mt-1"
              data-ocid="user_volunteer.input"
            />
          </div>
          <div>
            <Label className="text-xs">Hours per Week *</Label>
            <Input
              type="number"
              value={form.hoursPerWeek}
              onChange={(e) =>
                setForm((p) => ({ ...p, hoursPerWeek: e.target.value }))
              }
              placeholder="5"
              className="mt-1"
              data-ocid="user_volunteer.input"
            />
          </div>
          <div>
            <Label className="text-xs">Availability Days</Label>
            <Input
              value={form.availability}
              onChange={(e) =>
                setForm((p) => ({ ...p, availability: e.target.value }))
              }
              placeholder="Mon, Wed, Sat"
              className="mt-1"
              data-ocid="user_volunteer.input"
            />
          </div>
          <div>
            <Label className="text-xs">Brief Description</Label>
            <Input
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Tell us about yourself"
              className="mt-1"
              data-ocid="user_volunteer.input"
            />
          </div>
          <div className="md:col-span-2">
            <Button
              onClick={handleRegister}
              className="bg-ngo-green text-white"
              data-ocid="user_volunteer.submit_button"
            >
              Register as Volunteer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Shopping Section ───

function UserShopping() {
  const { currentUser, products, addOrder } = useApp();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  if (!currentUser) return null;
  const activeProducts = products.filter((p) => p.isActive && p.stock > 0);

  const cartTotal = Object.entries(cart).reduce((sum, [pid, qty]) => {
    const p = products.find((pr) => pr.id === pid);
    return sum + (p ? Number.parseFloat(p.price) * qty : 0);
  }, 0);

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  const handleCheckout = () => {
    if (!checkoutForm.name || !checkoutForm.address || !checkoutForm.phone) {
      toast.error("Sare fields bharein.");
      return;
    }
    const items = Object.entries(cart).map(([pid, qty]) => {
      const p = products.find((pr) => pr.id === pid)!;
      return {
        productId: pid,
        productName: p.name,
        quantity: qty,
        price: p.price,
      };
    });
    const order: Order = {
      id: `ord_${Date.now()}`,
      userId: currentUser.id,
      userName: checkoutForm.name,
      userMobile: checkoutForm.phone,
      userAddress: checkoutForm.address,
      items,
      totalAmount: cartTotal.toString(),
      status: "placed",
      placedAt: new Date().toISOString().split("T")[0],
    };
    addOrder(order);
    setCart({});
    setCheckoutOpen(false);
    toast.success("Order placed successfully! 🎉");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-800">Available Products</h2>
        {cartCount > 0 && (
          <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-ngo-orange text-white"
                data-ocid="user_shopping.open_modal_button"
              >
                <ShoppingCart size={16} className="mr-2" /> Cart ({cartCount}) —
                ₹{cartTotal}
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="user_shopping.dialog">
              <DialogHeader>
                <DialogTitle>Checkout</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {Object.entries(cart).map(([pid, qty]) => {
                  const p = products.find((pr) => pr.id === pid);
                  return p ? (
                    <div key={pid} className="flex justify-between text-sm">
                      <span>
                        {p.name} × {qty}
                      </span>
                      <span className="font-bold">
                        ₹{(Number.parseFloat(p.price) * qty).toLocaleString()}
                      </span>
                    </div>
                  ) : null;
                })}
                <div className="border-t pt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div>
                  <Label className="text-xs">Delivery Name *</Label>
                  <Input
                    value={checkoutForm.name}
                    onChange={(e) =>
                      setCheckoutForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="user_shopping.input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Delivery Address *</Label>
                  <Textarea
                    value={checkoutForm.address}
                    onChange={(e) =>
                      setCheckoutForm((p) => ({
                        ...p,
                        address: e.target.value,
                      }))
                    }
                    className="mt-1"
                    data-ocid="user_shopping.textarea"
                  />
                </div>
                <div>
                  <Label className="text-xs">Phone *</Label>
                  <Input
                    value={checkoutForm.phone}
                    onChange={(e) =>
                      setCheckoutForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="user_shopping.input"
                  />
                </div>
                <Button
                  onClick={handleCheckout}
                  className="bg-ngo-green text-white w-full"
                  data-ocid="user_shopping.confirm_button"
                >
                  Confirm Order
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {activeProducts.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="user_shopping.empty_state"
        >
          <Package size={40} className="mx-auto mb-3 opacity-30" /> No products
          available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activeProducts.map((p, i) => (
            <Card
              key={p.id}
              className="hover:shadow-md transition-shadow"
              data-ocid={`user_shopping.item.${i + 1}`}
            >
              <CardContent className="p-0">
                <div className="h-40 bg-gray-100 rounded-t-lg flex items-center justify-center">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <Package size={40} className="text-gray-300" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-800 text-sm">{p.name}</h3>
                  <div className="text-xs text-gray-400">
                    {p.category} | {p.centerName}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-extrabold text-green-700">
                      ₹{Number(p.price).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      Stock: {p.stock}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setCart((c) => ({
                          ...c,
                          [p.id]: Math.max(0, (c[p.id] || 0) - 1),
                        }))
                      }
                      disabled={!cart[p.id]}
                    >
                      −
                    </Button>
                    <span className="text-sm font-bold w-6 text-center">
                      {cart[p.id] || 0}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }))
                      }
                    >
                      +
                    </Button>
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

// ─── Utilities Section ───

type UtilityCategory = {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  services: UtilityServiceItem[];
};

type UtilityServiceItem = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tag?: string;
  tagColor?: string;
};

type TransactionEntry = {
  id: string;
  service: string;
  emoji: string;
  amount: string;
  date: string;
  status: "success" | "pending" | "failed";
  ref: string;
};

const utilityCategories: UtilityCategory[] = [
  {
    id: "mobile",
    label: "Mobile Recharge",
    emoji: "📱",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    services: [
      {
        id: "prepaid",
        name: "Prepaid Recharge",
        emoji: "📲",
        description: "Airtel, Jio, Vi, BSNL",
        tag: "Popular",
        tagColor: "bg-violet-100 text-violet-700",
      },
      {
        id: "postpaid",
        name: "Postpaid Bill",
        emoji: "📋",
        description: "Monthly bill payment",
        tag: "New",
        tagColor: "bg-green-100 text-green-700",
      },
    ],
  },
  {
    id: "electricity",
    label: "Electricity",
    emoji: "⚡",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    services: [
      {
        id: "uppcl",
        name: "UPPCL Bill",
        emoji: "💡",
        description: "Urban & rural UP electricity",
        tag: "Quick Pay",
        tagColor: "bg-yellow-100 text-yellow-700",
      },
      {
        id: "pvvnl",
        name: "PVVNL / DVVNL",
        emoji: "🔌",
        description: "Paschimanchal/Dakshinanchal",
        tag: "",
        tagColor: "",
      },
    ],
  },
  {
    id: "water",
    label: "Water Bill",
    emoji: "💧",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    services: [
      {
        id: "jalnigam",
        name: "Jal Nigam",
        emoji: "🚰",
        description: "Urban water supply bill",
        tag: "Gov",
        tagColor: "bg-blue-100 text-blue-700",
      },
      {
        id: "jalboard",
        name: "Jal Board Rural",
        emoji: "🌊",
        description: "Village & gram panchayat",
        tag: "",
        tagColor: "",
      },
    ],
  },
  {
    id: "gas",
    label: "LPG Gas",
    emoji: "🔥",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    services: [
      {
        id: "indane",
        name: "Indane Gas",
        emoji: "🛢️",
        description: "Book & pay Indane cylinder",
        tag: "₹100 Off",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        id: "bharat",
        name: "Bharat Gas",
        emoji: "🔴",
        description: "Bharat Petroleum cylinder",
        tag: "",
        tagColor: "",
      },
      {
        id: "hp",
        name: "HP Gas",
        emoji: "🟠",
        description: "Hindustan Petroleum LPG",
        tag: "",
        tagColor: "",
      },
    ],
  },
  {
    id: "broadband",
    label: "Internet / DTH",
    emoji: "📡",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    services: [
      {
        id: "dth",
        name: "DTH Recharge",
        emoji: "📺",
        description: "Tata Play, DishTV, Airtel DTH",
        tag: "Popular",
        tagColor: "bg-cyan-100 text-cyan-700",
      },
      {
        id: "broadband",
        name: "Broadband Bill",
        emoji: "🌐",
        description: "BSNL, Airtel, Jio Fiber",
        tag: "",
        tagColor: "",
      },
    ],
  },
  {
    id: "transport",
    label: "Transport",
    emoji: "🚌",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    services: [
      {
        id: "bus",
        name: "Bus Pass / Ticket",
        emoji: "🎫",
        description: "UPSRTC & state bus booking",
        tag: "Book Now",
        tagColor: "bg-emerald-100 text-emerald-700",
      },
      {
        id: "fastag",
        name: "FASTag Recharge",
        emoji: "🚗",
        description: "NHAI FASTag top-up",
        tag: "",
        tagColor: "",
      },
    ],
  },
];

const mockTransactions: TransactionEntry[] = [
  {
    id: "t1",
    service: "Prepaid Recharge",
    emoji: "📱",
    amount: "₹299",
    date: "Today, 10:30 AM",
    status: "success",
    ref: "REF789012",
  },
  {
    id: "t2",
    service: "UPPCL Electricity",
    emoji: "⚡",
    amount: "₹1,240",
    date: "Yesterday, 3:15 PM",
    status: "success",
    ref: "REF456789",
  },
  {
    id: "t3",
    service: "Indane Gas Booking",
    emoji: "🔥",
    amount: "₹950",
    date: "3 days ago",
    status: "pending",
    ref: "REF123456",
  },
  {
    id: "t4",
    service: "Jal Nigam Bill",
    emoji: "💧",
    amount: "₹320",
    date: "1 week ago",
    status: "success",
    ref: "REF654321",
  },
  {
    id: "t5",
    service: "DTH Recharge",
    emoji: "📺",
    amount: "₹399",
    date: "1 week ago",
    status: "failed",
    ref: "REF111222",
  },
];

function ServiceModal({
  service,
  category,
  onClose,
}: {
  service: UtilityServiceItem;
  category: UtilityCategory;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const quickAmounts = ["₹99", "₹199", "₹299", "₹499", "₹999"];

  const handleProceed = () => {
    if (!accountNo.trim()) {
      toast.error("Please enter account / consumer number");
      return;
    }
    if (!amount) {
      toast.error("Please select or enter an amount");
      return;
    }
    setStep("confirm");
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {step === "form" && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${category.bgColor} flex items-center justify-center text-2xl`}
                >
                  {service.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500">{service.description}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Consumer / Account Number
                </Label>
                <div className="relative mt-1">
                  <Input
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                    placeholder="Enter consumer/account number"
                    className="pr-10 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-400"
                  />
                  <Phone className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Amount
                </Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {quickAmounts.map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => setAmount(a.replace("₹", ""))}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                        amount === a.replace("₹", "")
                          ? `${category.bgColor} ${category.color} ${category.borderColor} border`
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">
                    ₹
                  </span>
                  <Input
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    placeholder="Or enter custom amount"
                    className="pl-7 rounded-xl border-gray-200 focus:border-green-400"
                  />
                </div>
              </div>

              <Button
                className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-base"
                onClick={handleProceed}
              >
                Proceed to Pay ₹{amount || "0"}
              </Button>
            </div>
          </>
        )}

        {step === "confirm" && (
          <>
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center text-3xl mx-auto mb-3`}
              >
                {service.emoji}
              </div>
              <h3 className="font-bold text-gray-900 text-xl">
                Confirm Payment
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Review your transaction details
              </p>
            </div>

            <div
              className={`${category.bgColor} rounded-2xl p-4 space-y-3 mb-5`}
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service</span>
                <span className="font-semibold text-gray-900">
                  {service.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Account No.</span>
                <span className="font-semibold text-gray-900">{accountNo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount</span>
                <span className={`font-bold text-lg ${category.color}`}>
                  ₹{amount}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Via DMVV Center</span>
                <span className="font-semibold text-green-700">
                  ✅ Assisted Payment
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => setStep("form")}
              >
                Edit
              </Button>
              <Button
                className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold"
                onClick={handlePay}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Pay"
                )}
              </Button>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-2xl mb-1">
              Payment Submitted! 🎉
            </h3>
            <p className="text-gray-500 text-sm mb-1">
              Your request has been forwarded to the nearest DMVV center.
            </p>
            <p className="text-gray-400 text-xs mb-5">
              Ref: REF{Math.floor(Math.random() * 900000 + 100000)}
            </p>

            <div className="bg-green-50 rounded-2xl p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service</span>
                <span className="font-semibold">{service.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-green-700">₹{amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className="font-semibold text-green-600">
                  ✅ Submitted
                </span>
              </div>
            </div>

            <Button
              className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function UserUtilities() {
  const { utilityServices } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<{
    service: UtilityServiceItem;
    category: UtilityCategory;
  } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const adminServices = utilityServices.filter((s) => s.isActive);
  const displayCategories =
    activeCategory === "all"
      ? utilityCategories
      : utilityCategories.filter((c) => c.id === activeCategory);

  const filteredCategories = searchQuery
    ? utilityCategories
        .map((cat) => ({
          ...cat,
          services: cat.services.filter(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.description.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((cat) => cat.services.length > 0)
    : displayCategories;

  const statusColor: Record<string, string> = {
    success: "text-green-600 bg-green-50",
    pending: "text-yellow-600 bg-yellow-50",
    failed: "text-red-600 bg-red-50",
  };
  const statusIcon: Record<string, string> = {
    success: "✅",
    pending: "⏳",
    failed: "❌",
  };

  return (
    <div className="space-y-0 -mx-1">
      {/* App Header Banner */}
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 rounded-2xl p-5 mb-4 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-green-100 text-xs font-medium uppercase tracking-wider">
                DMVV Utility Services
              </p>
              <h2 className="text-2xl font-black mt-0.5">
                Pay Bills & Recharge ⚡
              </h2>
              <p className="text-green-100 text-xs mt-1">
                Instant assistance at your nearest DMVV center
              </p>
            </div>
            <div className="text-5xl opacity-80">🏪</div>
          </div>
          {/* Quick Stats */}
          <div className="flex gap-3 mt-3">
            <div className="bg-white/20 rounded-xl px-3 py-2 text-center flex-1">
              <p className="text-lg font-black">6+</p>
              <p className="text-xs text-green-100">Services</p>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-2 text-center flex-1">
              <p className="text-lg font-black">24/7</p>
              <p className="text-xs text-green-100">Support</p>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-2 text-center flex-1">
              <p className="text-lg font-black">₹0</p>
              <p className="text-xs text-green-100">Extra Fee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-2.5 text-gray-400 text-lg">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services (electricity, gas, mobile...)"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 shadow-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      {!searchQuery && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeCategory === "all"
                ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-200"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            🏠 All
          </button>
          {utilityCategories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat.id
                  ? `${cat.bgColor} ${cat.color} ${cat.borderColor} shadow-md`
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Quick Action Icons Row */}
      {!searchQuery && activeCategory === "all" && (
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            {
              emoji: "📱",
              label: "Mobile",
              id: "mobile",
              color: "bg-violet-50 border-violet-100",
            },
            {
              emoji: "⚡",
              label: "Electricity",
              id: "electricity",
              color: "bg-yellow-50 border-yellow-100",
            },
            {
              emoji: "💧",
              label: "Water",
              id: "water",
              color: "bg-blue-50 border-blue-100",
            },
            {
              emoji: "🔥",
              label: "Gas",
              id: "gas",
              color: "bg-orange-50 border-orange-100",
            },
            {
              emoji: "📡",
              label: "DTH/Net",
              id: "broadband",
              color: "bg-cyan-50 border-cyan-100",
            },
            {
              emoji: "🚌",
              label: "Transport",
              id: "transport",
              color: "bg-emerald-50 border-emerald-100",
            },
            {
              emoji: "🏦",
              label: "Insurance",
              id: "insurance",
              color: "bg-purple-50 border-purple-100",
            },
            {
              emoji: "🧾",
              label: "History",
              id: "history",
              color: "bg-gray-50 border-gray-200",
            },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                if (item.id === "history") setShowHistory(!showHistory);
                else if (item.id === "insurance") {
                  /* handled by nav */
                } else setActiveCategory(item.id);
              }}
              className={`${item.color} border rounded-2xl p-3 flex flex-col items-center gap-1.5 hover:scale-105 transition-transform active:scale-95 shadow-sm`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Admin-added services highlight */}
      {adminServices.length > 0 && !searchQuery && activeCategory === "all" && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h3 className="font-bold text-gray-800 text-sm">
              Featured by DMVV Centers
            </h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {adminServices.map((s) => {
              const typeEmoji: Record<string, string> = {
                electricity: "⚡",
                water: "💧",
                gas: "🔥",
                insurance: "🛡️",
                other: "🔧",
              };
              const typeColor: Record<string, string> = {
                electricity: "from-yellow-400 to-orange-400",
                water: "from-blue-400 to-cyan-400",
                gas: "from-orange-400 to-red-400",
                insurance: "from-purple-400 to-violet-400",
                other: "from-gray-400 to-slate-400",
              };
              return (
                <div
                  key={s.id}
                  className={`flex-shrink-0 w-44 rounded-2xl bg-gradient-to-br ${typeColor[s.type] || typeColor.other} p-3.5 text-white shadow-md`}
                >
                  <div className="text-3xl mb-2">
                    {typeEmoji[s.type] || "🔧"}
                  </div>
                  <p className="font-bold text-sm leading-tight">{s.name}</p>
                  <p className="text-xs opacity-90 mt-1 line-clamp-2">
                    {s.description}
                  </p>
                  <a
                    href={`tel:${s.contactNumber}`}
                    className="mt-2.5 flex items-center gap-1.5 bg-white/20 rounded-xl px-2 py-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span className="text-xs font-bold">{s.contactNumber}</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Service Categories */}
      <div className="space-y-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className={`bg-white rounded-2xl border ${cat.borderColor} overflow-hidden shadow-sm`}
          >
            {/* Category Header */}
            <div
              className={`${cat.bgColor} px-4 py-3 flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{cat.emoji}</span>
                <h3 className={`font-bold ${cat.color} text-sm`}>
                  {cat.label}
                </h3>
              </div>
              <ChevronRight className={`w-4 h-4 ${cat.color} opacity-60`} />
            </div>

            {/* Services List */}
            <div className="divide-y divide-gray-50">
              {cat.services.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => setSelectedService({ service, category: cat })}
                  className="w-full flex items-center gap-3 p-3.5 hover:bg-gray-50 transition-colors text-left active:bg-gray-100"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl ${cat.bgColor} flex items-center justify-center text-xl flex-shrink-0`}
                  >
                    {service.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm">
                        {service.name}
                      </p>
                      {service.tag && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${service.tagColor}`}
                        >
                          {service.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {service.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      {showHistory && (
        <div className="mt-5 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-gray-600" />
              <h3 className="font-bold text-gray-800 text-sm">
                Recent Transactions
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowHistory(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 p-3.5">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl flex-shrink-0">
                  {tx.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    {tx.service}
                  </p>
                  <p className="text-xs text-gray-400">
                    {tx.date} · {tx.ref}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">{tx.amount}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor[tx.status]}`}
                  >
                    {statusIcon[tx.status]} {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
        <div className="text-2xl flex-shrink-0">ℹ️</div>
        <div>
          <p className="font-semibold text-blue-800 text-sm">How It Works</p>
          <p className="text-xs text-blue-600 mt-0.5">
            Select a service, enter your details, and visit your nearest DMVV
            center. Our assisted payment service ensures zero extra charges and
            instant processing.
          </p>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService.service}
          category={selectedService.category}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

// ─── Insurance Section ───

function UserInsurance() {
  const {
    currentUser,
    insuranceSchemes,
    insuranceApplications,
    addInsuranceApplication,
  } = useApp();
  if (!currentUser) return null;
  const myApplications = insuranceApplications.filter(
    (a) => a.userId === currentUser.id,
  );

  const hasApplied = (schemeId: string) =>
    myApplications.some((a) => a.schemeId === schemeId);

  const handleApply = (scheme: (typeof insuranceSchemes)[0]) => {
    if (hasApplied(scheme.id)) {
      toast.error("Already applied!");
      return;
    }
    const app: InsuranceApplication = {
      id: `insapp_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      schemeId: scheme.id,
      schemeName: scheme.name,
      status: "pending",
      appliedAt: new Date().toISOString().split("T")[0],
    };
    addInsuranceApplication(app);
    toast.success(`Applied for ${scheme.name} successfully!`);
  };

  const typeColor: Record<string, string> = {
    life: "bg-green-100 text-green-700",
    health: "bg-blue-100 text-blue-700",
    crop: "bg-yellow-100 text-yellow-700",
    accident: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insuranceSchemes
          .filter((s) => s.isActive)
          .map((s, i) => (
            <Card
              key={s.id}
              className="hover:shadow-md transition-shadow"
              data-ocid={`user_insurance.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-gray-800 flex-1 pr-2">
                    {s.name}
                  </h3>
                  <Badge className={`capitalize ${typeColor[s.type]}`}>
                    {s.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-2">{s.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div>
                    <span className="text-gray-400">Premium: </span>
                    <span className="font-semibold">{s.premium}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Coverage: </span>
                    <span className="font-semibold">{s.coverage}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Tenure: </span>
                    <span className="font-semibold">{s.tenure}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    Eligibility:
                  </div>
                  {s.eligibility.map((e) => (
                    <div
                      key={e}
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      <CheckCircle size={12} className="text-green-500" /> {e}
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  className={`mt-3 w-full ${hasApplied(s.id) ? "bg-gray-200 text-gray-600" : "bg-ngo-green text-white"}`}
                  onClick={() => handleApply(s)}
                  disabled={hasApplied(s.id)}
                  data-ocid={`user_insurance.primary_button.${i + 1}`}
                >
                  {hasApplied(s.id) ? "✓ Applied" : "Apply Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {myApplications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">My Insurance Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {myApplications.map((a, i) => (
              <div
                key={a.id}
                className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg"
                data-ocid={`user_insurance.item.${i + 1}`}
              >
                <span>{a.schemeName}</span>
                <Badge
                  className={`capitalize ${
                    a.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : a.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {a.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Wallet Section ───

function UserWallet() {
  const { currentUser, walletTransactions } = useApp();
  if (!currentUser) return null;
  const myTxns = walletTransactions.filter((t) => t.userId === currentUser.id);
  const balance = myTxns.reduce(
    (sum, t) => sum + (t.type === "credit" ? t.amount : -t.amount),
    0,
  );

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-ngo-green to-green-600 text-white">
        <CardContent className="p-6">
          <div className="text-sm opacity-80">Total Wallet Balance</div>
          <div className="text-4xl font-extrabold">
            ₹{balance.toLocaleString()}
          </div>
          <div className="text-xs opacity-70 mt-2">
            {currentUser.fullName} | {currentUser.memberId}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4 text-sm text-yellow-800">
          <Wallet size={16} className="inline mr-2" />
          Your wallet is credited by the admin. Loan disbursements, rewards, and
          payments appear here.
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {myTxns.length === 0 ? (
            <div
              className="text-center py-10 text-gray-400"
              data-ocid="user_wallet.empty_state"
            >
              No transactions yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {["Date", "Description", "Type", "Amount", "Balance"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left font-semibold text-gray-600 text-xs"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {myTxns.map((t, i) => (
                    <tr
                      key={t.id}
                      className="border-t"
                      data-ocid={`user_wallet.row.${i + 1}`}
                    >
                      <td className="px-3 py-2 text-xs text-gray-500">
                        {t.date}
                      </td>
                      <td className="px-3 py-2">{t.description}</td>
                      <td className="px-3 py-2">
                        <Badge
                          className={`capitalize ${t.type === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                          {t.type}
                        </Badge>
                      </td>
                      <td
                        className={`px-3 py-2 font-bold ${t.type === "credit" ? "text-green-700" : "text-red-600"}`}
                      >
                        {t.type === "credit" ? "+" : "-"}₹
                        {t.amount.toLocaleString()}
                      </td>
                      <td className="px-3 py-2 font-semibold">
                        ₹{t.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
