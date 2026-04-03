import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  type AchievementCert,
  type Promotion,
  type User,
  useApp,
} from "@/context/AppContext";
import {
  ArrowLeft,
  Award,
  CreditCard,
  FileText,
  Printer,
  ScrollText,
  Star,
  TrendingUp,
  User as UserIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function PrintButton({ targetId }: { targetId: string }) {
  const handlePrint = () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const content = el.innerHTML;
    const win = window.open("", "_blank", "width=800,height=600");
    if (!win) return;
    win.document.write(`
      <html><head><title>Print</title>
      <style>
        body { font-family: Georgia, serif; margin: 0; padding: 20px; }
        * { box-sizing: border-box; }
      </style>
      </head><body>${content}</body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="border-green-400 text-green-700 hover:bg-green-50"
      data-ocid="profile.button"
    >
      <Printer size={14} className="mr-1.5" />
      Print
    </Button>
  );
}

function IDCardContent({ user }: { user: User }) {
  return (
    <div
      id="id-card-print"
      className="w-80 mx-auto border-2 border-green-600 rounded-xl overflow-hidden shadow-lg"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="bg-green-700 text-white px-4 py-3 text-center">
        <div className="font-bold text-sm tracking-wide">
          DMVV BHARTIY MAHILA SHAKTI
        </div>
        <div className="font-bold text-sm tracking-wide">FOUNDATION™</div>
        <div className="text-xs text-green-200">www.dmvvfoundation.org</div>
      </div>

      {/* Body */}
      <div className="bg-white px-4 py-4">
        <div className="flex gap-4 items-start">
          {/* Photo */}
          <div className="h-20 w-16 bg-green-100 rounded-lg border-2 border-green-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt="ID"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon size={32} className="text-green-500" />
            )}
          </div>
          {/* Info */}
          <div className="text-xs space-y-0.5 flex-1 min-w-0">
            <div className="font-bold text-sm text-gray-900 truncate">
              {user.fullName}
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">Role:</span>{" "}
              <span className="capitalize">{user.role}</span>
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">ID:</span>{" "}
              {user.memberId || "DMVV/2025/001"}
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">Mobile:</span> {user.mobile}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3" />

        <div className="flex justify-between items-center text-xs">
          <div className="text-gray-600">
            <span className="font-semibold">Access Code:</span>{" "}
            <span className="font-mono font-bold text-green-700">
              {user.accessCode || "N/A"}
            </span>
          </div>
          <div className="text-gray-400">Valid: 2025</div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex justify-between text-xs text-gray-500">
        <span>DMVV Foundation™</span>
        <span>dmvvfoundation.org</span>
      </div>
    </div>
  );
}

function MembershipCertContent({ user }: { user: User }) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      id="membership-cert-print"
      className="max-w-2xl mx-auto border-8 border-double border-green-600 rounded-2xl p-8 bg-white relative"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-lg" />
      <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-lg" />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-lg" />

      <div className="text-center space-y-4">
        {/* Org name */}
        <div>
          <div className="text-green-700 text-lg font-bold tracking-widest uppercase">
            DMVV Bhartiy Mahila Shakti Foundation™
          </div>
          <div className="text-xs text-gray-500 tracking-wide">
            Registered NGO | Empowering Women Across India
          </div>
        </div>

        <div className="border-t-2 border-b-2 border-green-200 py-2">
          <div className="text-2xl font-bold text-gray-800 tracking-widest uppercase">
            Certificate of Membership
          </div>
        </div>

        <div className="text-gray-500 text-sm">This is to certify that</div>

        <div
          className="text-3xl font-bold text-green-700"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {user.fullName}
        </div>

        <div className="text-gray-600 text-sm leading-relaxed">
          <span className="capitalize font-semibold">{user.role}</span>, is an
          active and valued member of{" "}
          <span className="font-semibold">
            DMVV Bhartiy Mahila Shakti Foundation™
          </span>
          . This member is registered and recognized for their contribution to
          our mission of women empowerment and social development.
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Member ID:</span>{" "}
            {user.memberId || "DMVV/2025/001"}
          </div>
          <div>
            <span className="font-semibold">Issued Date:</span> {today}
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="border-t-2 border-gray-400 w-32 mx-auto mb-1" />
            <div className="text-xs text-gray-500">Member Signature</div>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-400 w-32 mx-auto mb-1" />
            <div className="text-xs text-gray-500">Director's Signature</div>
            <div className="text-xs text-green-700 font-semibold mt-1">
              DMVV Foundation™
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementCertContent({
  cert,
  userName,
}: {
  cert: AchievementCert;
  userName: string;
}) {
  return (
    <div
      className="max-w-2xl mx-auto border-8 border-double border-yellow-500 rounded-2xl p-8 bg-gradient-to-br from-yellow-50 to-amber-50 relative"
      style={{ fontFamily: "Georgia, serif" }}
    >
      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-4xl">
        🏆
      </div>

      <div className="text-center space-y-4 mt-8">
        <div className="text-yellow-700 text-lg font-bold tracking-widest uppercase">
          DMVV Bhartiy Mahila Shakti Foundation™
        </div>

        <div className="border-t-2 border-b-2 border-yellow-400 py-2">
          <div className="text-2xl font-bold text-gray-800 tracking-wider uppercase">
            Certificate of Achievement
          </div>
          <div className="text-yellow-700 font-semibold mt-1">
            {cert.category}
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          This certificate is proudly presented to
        </div>

        <div
          className="text-3xl font-bold text-yellow-700"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {userName}
        </div>

        <div className="text-xl font-bold text-gray-800 border-b border-yellow-300 pb-3">
          {cert.title}
        </div>

        <div className="text-gray-600 text-sm leading-relaxed">
          {cert.description}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Awarded By:</span> {cert.awardedBy}
          </div>
          <div>
            <span className="font-semibold">Issued Date:</span>{" "}
            {cert.issuedDate}
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-4 border-t border-yellow-300">
          <div className="text-center">
            <div className="border-t-2 border-yellow-600 w-32 mx-auto mb-1" />
            <div className="text-xs text-gray-500">Recipient's Signature</div>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-yellow-600 w-32 mx-auto mb-1" />
            <div className="text-xs text-gray-500">Director's Signature</div>
            <div className="text-xs text-yellow-700 font-semibold mt-1">
              DMVV Foundation™
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromotionLetterContent({
  promo,
  user,
}: {
  promo: Promotion;
  user: User;
}) {
  const date = promo.letterDate || promo.promotionDate;
  return (
    <div
      className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="border-b-4 border-green-600 pb-4 mb-6">
        <div className="text-green-700 font-bold text-lg">
          DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
        </div>
        <div className="text-xs text-gray-500">
          Registered NGO | Women Empowerment | India
        </div>
      </div>

      <div className="text-right text-sm text-gray-600 mb-4">Date: {date}</div>

      <div className="text-center text-xl font-bold text-gray-800 tracking-wider border-b border-gray-200 pb-4 mb-6">
        PROMOTION LETTER
      </div>

      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          Dear <strong>{user.fullName}</strong>,
        </p>

        <p>
          We are pleased to inform you that you have been promoted from{" "}
          <strong className="capitalize text-green-700">
            {promo.fromRole}
          </strong>{" "}
          to{" "}
          <strong className="capitalize text-green-700">{promo.toRole}</strong>{" "}
          effective <strong>{promo.promotionDate}</strong>.
        </p>

        <p>
          This promotion recognizes your dedication, commitment, and outstanding
          service to the DMVV Bhartiy Mahila Shakti Foundation™. Your
          contributions have been invaluable to our mission of women
          empowerment.
        </p>

        {promo.reason && (
          <p>
            <strong>Remarks:</strong> {promo.reason}
          </p>
        )}

        <p>
          Congratulations on this well-deserved achievement. We look forward to
          your continued excellence in your new role.
        </p>

        <p>Yours sincerely,</p>
      </div>

      <div className="mt-10 pt-4 border-t border-gray-200">
        <div className="border-t-2 border-gray-400 w-40 mb-1" />
        <div className="font-bold text-gray-800">Director</div>
        <div className="text-green-700 font-semibold text-sm">
          DMVV Bhartiy Mahila Shakti Foundation™
        </div>
      </div>
    </div>
  );
}

export default function AdminUserFullProfile() {
  const { userId } = useParams<{ userId: string }>();
  const { users, updateUser } = useApp();
  const navigate = useNavigate();

  const user = users.find((u) => u.id === userId);

  const [profileForm, setProfileForm] = useState<Partial<User>>({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Achievement cert form
  const [certForm, setCertForm] = useState({
    title: "",
    description: "",
    category: "Excellence",
    awardedBy: "DMVV Foundation",
    issuedDate: new Date().toISOString().split("T")[0],
  });
  const [showCertPrint, setShowCertPrint] = useState<AchievementCert | null>(
    null,
  );

  // Promotion form
  const [promoForm, setPromoForm] = useState({
    fromRole: user?.role || "user",
    toRole: "supervisor" as User["role"],
    promotionDate: new Date().toISOString().split("T")[0],
    reason: "",
  });
  const [showPromoLetter, setShowPromoLetter] = useState<Promotion | null>(
    null,
  );

  const photoInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-400">
        <UserIcon size={48} className="mx-auto mb-4 opacity-30" />
        <p>User not found.</p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => navigate("/admin/login-management")}
        >
          <ArrowLeft size={14} className="mr-2" /> Back
        </Button>
      </div>
    );
  }

  const currentForm = { ...user, ...profileForm };

  const handleProfileChange = (field: keyof User, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsSavingProfile(true);
    updateUser(user.id, profileForm);
    if (photoPreview) {
      updateUser(user.id, { photoUrl: photoPreview });
    }
    setTimeout(() => {
      setIsSavingProfile(false);
      setProfileForm({});
      toast.success("Profile saved successfully!");
    }, 400);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCert = () => {
    if (!certForm.title.trim()) {
      toast.error("Certificate title is required.");
      return;
    }
    const newCert: AchievementCert = {
      id: `cert_${Date.now()}`,
      ...certForm,
    };
    const updated = [...(user.achievementCerts || []), newCert];
    updateUser(user.id, { achievementCerts: updated });
    toast.success("Achievement certificate added!");
    setCertForm({
      title: "",
      description: "",
      category: "Excellence",
      awardedBy: "DMVV Foundation",
      issuedDate: new Date().toISOString().split("T")[0],
    });
  };

  const handleAddPromotion = () => {
    if (!promoForm.reason.trim()) {
      toast.error("Reason / Remarks is required.");
      return;
    }
    const today = new Date().toLocaleDateString("en-IN");
    const newPromo: Promotion = {
      id: `promo_${Date.now()}`,
      ...promoForm,
      letterGenerated: true,
      letterDate: today,
    };
    const updated = [...(user.promotions || []), newPromo];
    updateUser(user.id, {
      promotions: updated,
      role: promoForm.toRole,
    });
    toast.success("Promotion added and letter generated!");
    setShowPromoLetter(newPromo);
    setPromoForm({
      fromRole: promoForm.toRole,
      toRole: "supervisor",
      promotionDate: new Date().toISOString().split("T")[0],
      reason: "",
    });
  };

  const handlePrintPromoLetter = (promo: Promotion) => {
    setShowPromoLetter(promo);
  };

  const roleOptions: User["role"][] = [
    "user",
    "center",
    "supervisor",
    "transport",
    "hr",
  ];

  const categoryBadgeColors: Record<string, string> = {
    Excellence: "bg-yellow-100 text-yellow-700",
    Leadership: "bg-purple-100 text-purple-700",
    Service: "bg-blue-100 text-blue-700",
    Innovation: "bg-teal-100 text-teal-700",
  };

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/admin/login-management")}
          data-ocid="profile.button"
        >
          <ArrowLeft size={14} className="mr-1.5" /> Back
        </Button>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">
            {user.fullName}
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <Badge className="capitalize bg-green-100 text-green-700">
              {user.role}
            </Badge>
            <span className="text-xs text-gray-400">
              {user.memberId || "DMVV/2025/001"}
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="profile" data-ocid="profile.tab">
            <UserIcon size={14} className="mr-1.5" /> Full Profile
          </TabsTrigger>
          <TabsTrigger value="idcard" data-ocid="profile.tab">
            <CreditCard size={14} className="mr-1.5" /> ID Card
          </TabsTrigger>
          <TabsTrigger value="membership" data-ocid="profile.tab">
            <ScrollText size={14} className="mr-1.5" /> Membership Cert
          </TabsTrigger>
          <TabsTrigger value="achievements" data-ocid="profile.tab">
            <Award size={14} className="mr-1.5" /> Achievements
          </TabsTrigger>
          <TabsTrigger value="promotions" data-ocid="profile.tab">
            <TrendingUp size={14} className="mr-1.5" /> Promotions
          </TabsTrigger>
        </TabsList>

        {/* === TAB 1: FULL PROFILE === */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <UserIcon size={18} className="text-green-600" /> Full Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Photo */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    className="h-28 w-28 rounded-full border-4 border-green-200 bg-green-50 flex items-center justify-center overflow-hidden cursor-pointer"
                    onClick={() => photoInputRef.current?.click()}
                    title="Click to change photo"
                  >
                    {photoPreview || user.photoUrl ? (
                      <img
                        src={photoPreview || user.photoUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserIcon size={44} className="text-green-400" />
                    )}
                  </button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => photoInputRef.current?.click()}
                    data-ocid="profile.upload_button"
                  >
                    Change Photo
                  </Button>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>

                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      className="mt-1"
                      value={currentForm.fullName || ""}
                      onChange={(e) =>
                        handleProfileChange("fullName", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label>Father's Name</Label>
                    <Input
                      className="mt-1"
                      value={currentForm.fatherName || ""}
                      onChange={(e) =>
                        handleProfileChange("fatherName", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      className="mt-1"
                      value={currentForm.dob || ""}
                      onChange={(e) =>
                        handleProfileChange("dob", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label>Mobile</Label>
                    <Input
                      className="mt-1"
                      value={currentForm.mobile || ""}
                      onChange={(e) =>
                        handleProfileChange("mobile", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      className="mt-1"
                      type="email"
                      value={currentForm.email || ""}
                      onChange={(e) =>
                        handleProfileChange("email", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select
                      value={currentForm.role || "user"}
                      onValueChange={(v) => handleProfileChange("role", v)}
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="profile.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((r) => (
                          <SelectItem key={r} value={r} className="capitalize">
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={currentForm.status || "pending"}
                      onValueChange={(v) => handleProfileChange("status", v)}
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="profile.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Member ID</Label>
                    <Input
                      className="mt-1 font-mono"
                      value={currentForm.memberId || ""}
                      placeholder="DMVV/2025/001"
                      onChange={(e) =>
                        handleProfileChange("memberId", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label>Access Code</Label>
                    <Input
                      className="mt-1 font-mono uppercase"
                      value={currentForm.accessCode || ""}
                      placeholder="DMV001"
                      onChange={(e) =>
                        handleProfileChange(
                          "accessCode",
                          e.target.value.toUpperCase(),
                        )
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Address</Label>
                    <Textarea
                      className="mt-1"
                      value={currentForm.address || ""}
                      onChange={(e) =>
                        handleProfileChange("address", e.target.value)
                      }
                      rows={2}
                      data-ocid="profile.textarea"
                    />
                  </div>
                  <div>
                    <Label>District</Label>
                    <Input
                      className="mt-1"
                      value={currentForm.district || ""}
                      onChange={(e) =>
                        handleProfileChange("district", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input
                      className="mt-1"
                      value={currentForm.state || ""}
                      onChange={(e) =>
                        handleProfileChange("state", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                  <div>
                    <Label>Pincode</Label>
                    <Input
                      className="mt-1"
                      value={currentForm.pincode || ""}
                      onChange={(e) =>
                        handleProfileChange("pincode", e.target.value)
                      }
                      data-ocid="profile.input"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleSaveProfile}
                  disabled={isSavingProfile}
                  data-ocid="profile.save_button"
                >
                  {isSavingProfile ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === TAB 2: ID CARD === */}
        <TabsContent value="idcard">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={18} className="text-green-600" /> ID Card
              </CardTitle>
              <PrintButton targetId="id-card-print" />
            </CardHeader>
            <CardContent>
              <IDCardContent user={user} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* === TAB 3: MEMBERSHIP CERTIFICATE === */}
        <TabsContent value="membership">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ScrollText size={18} className="text-green-600" /> Membership
                Certificate
              </CardTitle>
              <PrintButton targetId="membership-cert-print" />
            </CardHeader>
            <CardContent>
              <MembershipCertContent user={user} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* === TAB 4: ACHIEVEMENTS === */}
        <TabsContent value="achievements">
          <div className="space-y-6">
            {/* Existing certs */}
            {(user.achievementCerts || []).length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" /> Achievement
                  Certificates
                </h3>
                {(user.achievementCerts || []).map((cert, idx) => (
                  <Card
                    key={cert.id}
                    data-ocid={`achievements.item.${idx + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {cert.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {cert.description}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              className={`text-xs ${
                                categoryBadgeColors[cert.category] ||
                                "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {cert.category}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {cert.issuedDate}
                            </span>
                            <span className="text-xs text-gray-400">
                              by {cert.awardedBy}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-shrink-0 border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                          onClick={() => setShowCertPrint(cert)}
                          data-ocid="achievements.button"
                        >
                          <Printer size={13} className="mr-1" /> Print
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Add new cert */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award size={16} className="text-yellow-600" /> Add
                  Achievement Certificate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label>Certificate Title *</Label>
                    <Input
                      className="mt-1"
                      placeholder="e.g. Best Volunteer 2025"
                      value={certForm.title}
                      onChange={(e) =>
                        setCertForm((p) => ({ ...p, title: e.target.value }))
                      }
                      data-ocid="achievements.input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      className="mt-1"
                      placeholder="Describe the achievement..."
                      value={certForm.description}
                      onChange={(e) =>
                        setCertForm((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      rows={2}
                      data-ocid="achievements.textarea"
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={certForm.category}
                      onValueChange={(v) =>
                        setCertForm((p) => ({ ...p, category: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="achievements.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellence">Excellence</SelectItem>
                        <SelectItem value="Leadership">Leadership</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                        <SelectItem value="Innovation">Innovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Awarded By</Label>
                    <Input
                      className="mt-1"
                      value={certForm.awardedBy}
                      onChange={(e) =>
                        setCertForm((p) => ({
                          ...p,
                          awardedBy: e.target.value,
                        }))
                      }
                      data-ocid="achievements.input"
                    />
                  </div>
                  <div>
                    <Label>Issue Date</Label>
                    <Input
                      type="date"
                      className="mt-1"
                      value={certForm.issuedDate}
                      onChange={(e) =>
                        setCertForm((p) => ({
                          ...p,
                          issuedDate: e.target.value,
                        }))
                      }
                      data-ocid="achievements.input"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={handleAddCert}
                    data-ocid="achievements.primary_button"
                  >
                    <Award size={14} className="mr-1.5" /> Save Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Print dialog */}
          <Dialog
            open={!!showCertPrint}
            onOpenChange={(open) => !open && setShowCertPrint(null)}
          >
            <DialogContent
              className="max-w-3xl"
              data-ocid="achievements.dialog"
            >
              <DialogHeader>
                <DialogTitle>Achievement Certificate Preview</DialogTitle>
              </DialogHeader>
              <div className="overflow-auto max-h-[70vh] py-2">
                {showCertPrint && (
                  <div id={`ach-cert-print-${showCertPrint.id}`}>
                    <AchievementCertContent
                      cert={showCertPrint}
                      userName={user.fullName}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCertPrint(null)}
                  data-ocid="achievements.cancel_button"
                >
                  Close
                </Button>
                {showCertPrint && (
                  <PrintButton
                    targetId={`ach-cert-print-${showCertPrint.id}`}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* === TAB 5: PROMOTIONS === */}
        <TabsContent value="promotions">
          <div className="space-y-6">
            {/* Existing promotions */}
            {(user.promotions || []).length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" /> Promotion
                  History
                </h3>
                {(user.promotions || []).map((promo, idx) => (
                  <Card key={promo.id} data-ocid={`promotions.item.${idx + 1}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className="capitalize bg-green-100 text-green-700">
                              {promo.fromRole}
                            </Badge>
                            <span className="text-gray-400">→</span>
                            <Badge className="capitalize bg-blue-100 text-blue-700">
                              {promo.toRole}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mt-1.5">
                            <span className="font-semibold">Date:</span>{" "}
                            {promo.promotionDate}
                          </div>
                          {promo.reason && (
                            <div className="text-sm text-gray-500 mt-0.5">
                              {promo.reason}
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-shrink-0 border-green-400 text-green-700 hover:bg-green-50"
                          onClick={() => handlePrintPromoLetter(promo)}
                          data-ocid="promotions.button"
                        >
                          <FileText size={13} className="mr-1" /> View Letter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Add promotion form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" /> Add
                  Promotion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>From Role</Label>
                    <Select
                      value={promoForm.fromRole}
                      onValueChange={(v) =>
                        setPromoForm((p) => ({
                          ...p,
                          fromRole: v as User["role"],
                        }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="promotions.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((r) => (
                          <SelectItem key={r} value={r} className="capitalize">
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>To Role</Label>
                    <Select
                      value={promoForm.toRole}
                      onValueChange={(v) =>
                        setPromoForm((p) => ({
                          ...p,
                          toRole: v as User["role"],
                        }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="promotions.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((r) => (
                          <SelectItem key={r} value={r} className="capitalize">
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Promotion Date</Label>
                    <Input
                      type="date"
                      className="mt-1"
                      value={promoForm.promotionDate}
                      onChange={(e) =>
                        setPromoForm((p) => ({
                          ...p,
                          promotionDate: e.target.value,
                        }))
                      }
                      data-ocid="promotions.input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Reason / Remarks *</Label>
                    <Textarea
                      className="mt-1"
                      placeholder="Reason for promotion..."
                      value={promoForm.reason}
                      onChange={(e) =>
                        setPromoForm((p) => ({ ...p, reason: e.target.value }))
                      }
                      rows={3}
                      data-ocid="promotions.textarea"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleAddPromotion}
                    data-ocid="promotions.primary_button"
                  >
                    <TrendingUp size={14} className="mr-1.5" /> Save &amp;
                    Generate Letter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Promotion Letter Dialog */}
          <Dialog
            open={!!showPromoLetter}
            onOpenChange={(open) => !open && setShowPromoLetter(null)}
          >
            <DialogContent className="max-w-3xl" data-ocid="promotions.dialog">
              <DialogHeader>
                <DialogTitle>Promotion Letter Preview</DialogTitle>
              </DialogHeader>
              <div className="overflow-auto max-h-[70vh] py-2">
                {showPromoLetter && (
                  <div id={`promo-letter-print-${showPromoLetter.id}`}>
                    <PromotionLetterContent
                      promo={showPromoLetter}
                      user={user}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowPromoLetter(null)}
                  data-ocid="promotions.cancel_button"
                >
                  Close
                </Button>
                {showPromoLetter && (
                  <PrintButton
                    targetId={`promo-letter-print-${showPromoLetter.id}`}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
