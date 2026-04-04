import LogoImage from "@/components/LogoImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type {
  FranchiseLetter,
  FranchiseServiceRequest,
} from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import {
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Camera,
  Download,
  FileText,
  Handshake,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Plus,
  Printer,
  Send,
  Shield,
  Star,
  TrendingUp,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const letterTypeBadge: Record<string, string> = {
  approval: "bg-green-100 text-green-800 border-green-200",
  welcome: "bg-blue-100 text-blue-800 border-blue-200",
  renewal: "bg-orange-100 text-orange-800 border-orange-200",
  forward: "bg-purple-100 text-purple-800 border-purple-200",
  cancellation: "bg-red-100 text-red-800 border-red-200",
  custom: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusBadge: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  inprogress: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function FranchisePartnerDashboard() {
  const {
    currentUser,
    setCurrentUser,
    updateUser,
    franchiseLetters,
    updateFranchiseLetter,
    franchiseServiceRequests,
    addFranchiseServiceRequest,
  } = useApp();
  const navigate = useNavigate();

  // Edit profile state
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: "query" as FranchiseServiceRequest["category"],
    description: "",
  });
  const photoInputRef = useRef<HTMLInputElement>(null);

  if (!currentUser || currentUser.role !== "franchise") {
    return <Navigate to="/franchise-partner/login" replace />;
  }

  const myLetters = franchiseLetters.filter(
    (l) => l.partnerId === currentUser.id,
  );
  const myRequests = franchiseServiceRequests.filter(
    (r) => r.partnerId === currentUser.id,
  );
  const unreadLetters = myLetters.filter((l) => !l.isRead);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const openEditProfile = () => {
    setEditForm({
      fullName: currentUser.fullName || "",
      mobile: currentUser.mobile || "",
      email: currentUser.email || "",
      fatherName: currentUser.fatherName || "",
      dob: currentUser.dob || "",
      gender: currentUser.gender || "",
      address: currentUser.address || "",
      district: currentUser.district || "",
      state: currentUser.state || "",
      pincode: currentUser.pincode || "",
      businessName: currentUser.businessName || "",
      franchiseCategory: currentUser.franchiseCategory || "",
      franchisePlan: currentUser.franchisePlan || "",
      franchiseTerritory: currentUser.franchiseTerritory || "",
      franchiseCommissionRate: currentUser.franchiseCommissionRate || "",
      franchiseInvestment: currentUser.franchiseInvestment || "",
      franchiseJoiningDate: currentUser.franchiseJoiningDate || "",
    });
    setEditOpen(true);
  };

  const handleSaveProfile = () => {
    updateUser(currentUser.id, editForm as Record<string, string>);
    setCurrentUser({
      ...currentUser,
      ...(editForm as Record<string, string>),
    } as typeof currentUser);
    setEditOpen(false);
    toast.success("Profile updated successfully!");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      updateUser(currentUser.id, { photoUrl: dataUrl });
      setCurrentUser({ ...currentUser, photoUrl: dataUrl });
      toast.success("Profile photo updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleMarkRead = (letterId: string) => {
    updateFranchiseLetter(letterId, { isRead: true });
  };

  const handleSubmitRequest = () => {
    if (!serviceForm.title || !serviceForm.description) {
      toast.error("Please fill all required fields.");
      return;
    }
    const req: FranchiseServiceRequest = {
      id: `fsr_${Date.now()}`,
      partnerId: currentUser.id,
      title: serviceForm.title,
      description: serviceForm.description,
      category: serviceForm.category,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };
    addFranchiseServiceRequest(req);
    setServiceForm({ title: "", category: "query", description: "" });
    setServiceOpen(false);
    toast.success("Service request submitted!");
  };

  const initials = currentUser.fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <LogoImage
            className="h-9 w-9 object-contain flex-shrink-0"
            alt="DMVV Logo"
          />
          <div className="flex-1">
            <h1 className="font-bold text-lg leading-tight">
              Franchise Partner Portal
            </h1>
            <p className="text-green-200 text-xs">
              DMVV Bhartiy Mahila Shakti Foundation™
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadLetters.length > 0 && (
              <div className="relative" data-ocid="franchise_dash.bell_button">
                <Bell size={20} className="text-green-200" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadLetters.length}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.photoUrl} />
                <AvatarFallback className="bg-green-600 text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-tight">
                  {currentUser.fullName}
                </p>
                <p className="text-xs text-green-300">
                  {currentUser.businessName || "Franchise Partner"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-300 hover:text-white hover:bg-red-800/40"
              onClick={handleLogout}
              data-ocid="franchise_dash.close_button"
            >
              <LogOut size={16} className="mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap gap-1 h-auto mb-6 bg-white border border-gray-200 p-1 rounded-xl shadow-sm w-full sm:w-auto">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-1.5"
              data-ocid="franchise_dash.tab"
            >
              <LayoutDashboard size={14} /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center gap-1.5"
              data-ocid="franchise_dash.tab"
            >
              <User size={14} /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="letters"
              className="flex items-center gap-1.5"
              data-ocid="franchise_dash.tab"
            >
              <Mail size={14} /> Letters
              {unreadLetters.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 ml-1">
                  {unreadLetters.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="flex items-center gap-1.5"
              data-ocid="franchise_dash.tab"
            >
              <Send size={14} /> Service Requests
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="flex items-center gap-1.5"
              data-ocid="franchise_dash.tab"
            >
              <FileText size={14} /> Documents
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className="flex items-center gap-1.5"
              data-ocid="franchise_dash.tab"
            >
              <TrendingUp size={14} /> Business
            </TabsTrigger>
          </TabsList>

          {/* ── Overview ───────────────────────────────────────── */}
          <TabsContent value="overview">
            {/* Green gradient banner */}
            <div className="rounded-2xl bg-gradient-to-r from-green-700 to-emerald-600 text-white p-6 mb-6 shadow">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Avatar className="h-16 w-16 border-2 border-white/40">
                  <AvatarImage src={currentUser.photoUrl} />
                  <AvatarFallback className="bg-green-600 text-white text-xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold">
                    {currentUser.fullName}
                  </h2>
                  <p className="text-green-200 text-sm">
                    {currentUser.businessName || "Franchise Business"}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentUser.franchiseCategory && (
                      <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
                        {currentUser.franchiseCategory}
                      </span>
                    )}
                    {currentUser.franchiseTerritory && (
                      <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 flex items-center gap-1">
                        <MapPin size={10} /> {currentUser.franchiseTerritory}
                      </span>
                    )}
                    <span
                      className={`text-xs rounded-full px-2 py-0.5 font-semibold ${
                        currentUser.franchiseStatus === "active"
                          ? "bg-green-400/40"
                          : currentUser.franchiseStatus === "suspended"
                            ? "bg-red-400/40"
                            : "bg-gray-400/40"
                      }`}
                    >
                      {(currentUser.franchiseStatus || "active").toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: "Commission Rate",
                  value: currentUser.franchiseCommissionRate || "N/A",
                  icon: Star,
                  color: "text-yellow-500",
                },
                {
                  label: "Plan",
                  value: currentUser.franchisePlan || "N/A",
                  icon: Briefcase,
                  color: "text-blue-500",
                },
                {
                  label: "Joining Date",
                  value: currentUser.franchiseJoiningDate || "N/A",
                  icon: BookOpen,
                  color: "text-green-500",
                },
                {
                  label: "Letters",
                  value: myLetters.length.toString(),
                  icon: Mail,
                  color: "text-purple-500",
                },
              ].map((stat) => (
                <Card
                  key={stat.label}
                  className="border border-gray-100 shadow-sm"
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                      <stat.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="font-bold text-gray-900 text-sm">
                        {stat.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Dialog open={serviceOpen} onOpenChange={setServiceOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-green-700 hover:bg-green-800"
                    data-ocid="franchise_dash.primary_button"
                  >
                    <Plus size={16} className="mr-2" /> Raise Service Request
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Service Request</DialogTitle>
                  </DialogHeader>
                  <ServiceRequestForm
                    form={serviceForm}
                    setForm={setServiceForm}
                    onSubmit={handleSubmitRequest}
                    onCancel={() => setServiceOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                onClick={openEditProfile}
                data-ocid="franchise_dash.secondary_button"
              >
                <User size={16} className="mr-2" /> Edit Profile
              </Button>
            </div>

            {/* Recent Letters */}
            {myLetters.length > 0 && (
              <Card className="mb-5 border border-gray-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Mail size={15} className="text-green-600" /> Recent Letters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {myLetters.slice(0, 3).map((letter, i) => (
                    <div
                      key={letter.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        !letter.isRead
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-100"
                      }`}
                      data-ocid={`franchise_dash.item.${i + 1}`}
                    >
                      <Mail
                        size={14}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {letter.subject}
                        </p>
                        <p className="text-xs text-gray-400">
                          {letter.date} · {letter.sentBy}
                        </p>
                      </div>
                      <span
                        className={`text-xs rounded-full px-2 py-0.5 border font-medium flex-shrink-0 ${letterTypeBadge[letter.type] || letterTypeBadge.custom}`}
                      >
                        {letter.type}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent Service Requests */}
            {myRequests.length > 0 && (
              <Card className="border border-gray-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Send size={15} className="text-blue-500" /> Recent Service
                    Requests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {myRequests.slice(0, 3).map((req, i) => (
                    <div
                      key={req.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                      data-ocid={`franchise_dash.item.${i + 1}`}
                    >
                      <Send size={13} className="text-blue-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {req.title}
                        </p>
                        <p className="text-xs text-gray-400">{req.date}</p>
                      </div>
                      <span
                        className={`text-xs rounded-full px-2 py-0.5 border font-medium flex-shrink-0 ${statusBadge[req.status] || statusBadge.pending}`}
                      >
                        {req.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ── Profile ───────────────────────────────────────── */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Photo Card */}
              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={currentUser.photoUrl} />
                      <AvatarFallback className="bg-green-100 text-green-700 text-2xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-green-700 text-white p-1.5 rounded-full shadow hover:bg-green-800"
                      onClick={() => photoInputRef.current?.click()}
                      data-ocid="franchise_dash.upload_button"
                    >
                      <Camera size={13} />
                    </button>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900">
                    {currentUser.fullName}
                  </h3>
                  <p className="text-green-600 text-sm font-medium">
                    {currentUser.businessName || "Franchise Partner"}
                  </p>
                  <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                    {currentUser.franchiseStatus || "active"}
                  </Badge>
                  <Button
                    className="mt-4 w-full bg-green-700 hover:bg-green-800"
                    onClick={openEditProfile}
                    data-ocid="franchise_dash.edit_button"
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Details */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="border border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-gray-700">
                      <User size={14} /> Personal Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {[
                        ["Full Name", currentUser.fullName],
                        ["Mobile", currentUser.mobile],
                        ["Email", currentUser.email],
                        ["Father's Name", currentUser.fatherName],
                        ["Date of Birth", currentUser.dob],
                        ["Gender", currentUser.gender],
                        ["Address", currentUser.address],
                        ["District", currentUser.district],
                        ["State", currentUser.state],
                        ["Pincode", currentUser.pincode],
                      ].map(([label, value]) => (
                        <div key={label} className="flex flex-col">
                          <span className="text-xs text-gray-400 font-medium">
                            {label}
                          </span>
                          <span className="text-gray-800 font-medium">
                            {value || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-gray-700">
                      <Handshake size={14} /> Franchise Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {[
                        ["Business Name", currentUser.businessName],
                        ["Category", currentUser.franchiseCategory],
                        ["Plan", currentUser.franchisePlan],
                        ["Territory", currentUser.franchiseTerritory],
                        ["Joining Date", currentUser.franchiseJoiningDate],
                        [
                          "Commission Rate",
                          currentUser.franchiseCommissionRate,
                        ],
                        ["Investment", currentUser.franchiseInvestment],
                        ["Status", currentUser.franchiseStatus],
                      ].map(([label, value]) => (
                        <div key={label} className="flex flex-col">
                          <span className="text-xs text-gray-400 font-medium">
                            {label}
                          </span>
                          <span className="text-gray-800 font-medium">
                            {value || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogContent
                className="max-w-2xl max-h-[80vh] overflow-y-auto"
                data-ocid="franchise_dash.dialog"
              >
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <p className="text-sm font-semibold text-gray-600 border-b pb-1">
                    Personal Details
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        ["fullName", "Full Name"],
                        ["mobile", "Mobile"],
                        ["email", "Email"],
                        ["fatherName", "Father's Name"],
                        ["dob", "Date of Birth"],
                        ["gender", "Gender"],
                        ["address", "Address"],
                        ["district", "District"],
                        ["state", "State"],
                        ["pincode", "Pincode"],
                      ] as [string, string][]
                    ).map(([key, label]) => (
                      <div key={key}>
                        <Label className="text-xs text-gray-500">{label}</Label>
                        <Input
                          value={editForm[key] || ""}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              [key]: e.target.value,
                            }))
                          }
                          className="mt-1"
                          data-ocid="franchise_dash.input"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-600 border-b pb-1 pt-2">
                    Franchise Details
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        ["businessName", "Business Name"],
                        ["franchiseCategory", "Category"],
                        ["franchisePlan", "Plan"],
                        ["franchiseTerritory", "Territory"],
                        ["franchiseJoiningDate", "Joining Date"],
                        ["franchiseCommissionRate", "Commission Rate"],
                        ["franchiseInvestment", "Investment Amount"],
                      ] as [string, string][]
                    ).map(([key, label]) => (
                      <div key={key}>
                        <Label className="text-xs text-gray-500">{label}</Label>
                        <Input
                          value={editForm[key] || ""}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              [key]: e.target.value,
                            }))
                          }
                          className="mt-1"
                          data-ocid="franchise_dash.input"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1 bg-green-700 hover:bg-green-800"
                      onClick={handleSaveProfile}
                      data-ocid="franchise_dash.save_button"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setEditOpen(false)}
                      data-ocid="franchise_dash.cancel_button"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ── Letters ───────────────────────────────────────── */}
          <TabsContent value="letters">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">My Letters</h2>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                {myLetters.length} letters
              </Badge>
            </div>
            {myLetters.length === 0 ? (
              <div
                className="text-center py-16 text-gray-400"
                data-ocid="franchise_dash.empty_state"
              >
                <Mail size={48} className="mx-auto mb-3 opacity-20" />
                <p>No letters received yet</p>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="franchise_dash.list">
                {myLetters.map((letter, i) => (
                  <LetterCard
                    key={letter.id}
                    letter={letter}
                    onMarkRead={handleMarkRead}
                    index={i + 1}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── Service Requests ──────────────────────────────── */}
          <TabsContent value="requests">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Service Requests</h2>
              <Dialog open={serviceOpen} onOpenChange={setServiceOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-green-700 hover:bg-green-800"
                    size="sm"
                    data-ocid="franchise_dash.open_modal_button"
                  >
                    <Plus size={14} className="mr-1" /> New Request
                  </Button>
                </DialogTrigger>
                <DialogContent data-ocid="franchise_dash.dialog">
                  <DialogHeader>
                    <DialogTitle>Raise Service Request</DialogTitle>
                  </DialogHeader>
                  <ServiceRequestForm
                    form={serviceForm}
                    setForm={setServiceForm}
                    onSubmit={handleSubmitRequest}
                    onCancel={() => setServiceOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
            {myRequests.length === 0 ? (
              <div
                className="text-center py-16 text-gray-400"
                data-ocid="franchise_dash.empty_state"
              >
                <Send size={48} className="mx-auto mb-3 opacity-20" />
                <p>No service requests yet</p>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="franchise_dash.list">
                {myRequests.map((req, i) => (
                  <Card
                    key={req.id}
                    className="border border-gray-100"
                    data-ocid={`franchise_dash.item.${i + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-800">
                              {req.title}
                            </h3>
                            <span
                              className={`text-xs rounded-full px-2 py-0.5 border font-medium ${statusBadge[req.status] || statusBadge.pending}`}
                            >
                              {req.status}
                            </span>
                            <span className="text-xs bg-gray-100 rounded-full px-2 py-0.5">
                              {req.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {req.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Submitted: {req.date}
                          </p>
                          {req.adminResponse && (
                            <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-100">
                              <p className="text-xs font-semibold text-green-700 mb-1">
                                Admin Response:
                              </p>
                              <p className="text-sm text-gray-700">
                                {req.adminResponse}
                              </p>
                              {req.adminResponseDate && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {req.adminResponseDate}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── Documents ─────────────────────────────────────── */}
          <TabsContent value="documents">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-gray-100">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield size={14} /> KYC Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    ["Aadhaar Number", currentUser.aadhaarNumber],
                    ["PAN Number", currentUser.panNumber],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-2 border-b border-gray-50"
                    >
                      <span className="text-gray-500">{label}</span>
                      <span className="font-medium text-gray-800">
                        {value || "Not provided"}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* ID Card */}
              <Card className="border border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2 text-green-700">
                    <Building2 size={14} /> Franchise ID Card
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    id="franchise-id-card"
                    className="border-2 border-green-700 rounded-xl p-4 bg-white"
                  >
                    <div className="flex items-center gap-3 border-b border-green-100 pb-3 mb-3">
                      <LogoImage className="h-10 w-10" alt="Logo" />
                      <div>
                        <p className="font-bold text-green-800 text-xs">
                          DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
                        </p>
                        <p className="text-xs text-gray-500">
                          Franchise Partner ID
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Avatar className="h-14 w-14 border-2 border-green-200">
                        <AvatarImage src={currentUser.photoUrl} />
                        <AvatarFallback className="bg-green-100 text-green-700 font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-gray-800">
                          {currentUser.fullName}
                        </p>
                        <p className="text-gray-500">
                          {currentUser.businessName}
                        </p>
                        <p className="text-gray-500">
                          ID: {currentUser.id.slice(0, 12).toUpperCase()}
                        </p>
                        <p className="text-gray-500">
                          Plan: {currentUser.franchisePlan || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Phone size={10} className="text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {currentUser.mobile}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-3 border-green-300 text-green-700 hover:bg-green-50"
                    onClick={() => window.print()}
                    data-ocid="franchise_dash.primary_button"
                  >
                    <Printer size={14} className="mr-2" /> Print ID Card
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Business ──────────────────────────────────────── */}
          <TabsContent value="business">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-gray-100">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp size={14} className="text-green-600" />{" "}
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      label: "Monthly Target",
                      target: 100,
                      achieved: 68,
                      color: "bg-green-500",
                    },
                    {
                      label: "Orders Fulfilled",
                      target: 50,
                      achieved: 38,
                      color: "bg-blue-500",
                    },
                    {
                      label: "Customer Satisfaction",
                      target: 100,
                      achieved: 91,
                      color: "bg-purple-500",
                    },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-medium">
                          {metric.label}
                        </span>
                        <span className="text-gray-800 font-bold">
                          {metric.achieved}%
                        </span>
                      </div>
                      <Progress value={metric.achieved} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-gray-100">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Briefcase size={14} className="text-blue-600" /> Program
                    Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    ["Category", currentUser.franchiseCategory],
                    ["Plan", currentUser.franchisePlan],
                    ["Territory", currentUser.franchiseTerritory],
                    ["Commission", currentUser.franchiseCommissionRate],
                    ["Investment", currentUser.franchiseInvestment],
                    ["Since", currentUser.franchiseJoiningDate],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-1.5 border-b border-gray-50"
                    >
                      <span className="text-gray-500">{label}</span>
                      <span className="font-medium text-gray-800">
                        {value || "—"}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-gray-100 lg:col-span-2">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">
                        Need Help with your Franchise?
                      </h3>
                      <p className="text-sm text-gray-500">
                        Raise a service request and our team will assist you
                        promptly.
                      </p>
                    </div>
                    <Dialog open={serviceOpen} onOpenChange={setServiceOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-green-700 hover:bg-green-800 flex-shrink-0"
                          data-ocid="franchise_dash.primary_button"
                        >
                          <Send size={14} className="mr-2" /> Contact Support
                        </Button>
                      </DialogTrigger>
                      <DialogContent data-ocid="franchise_dash.dialog">
                        <DialogHeader>
                          <DialogTitle>Raise Service Request</DialogTitle>
                        </DialogHeader>
                        <ServiceRequestForm
                          form={serviceForm}
                          setForm={setServiceForm}
                          onSubmit={handleSubmitRequest}
                          onCancel={() => setServiceOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LetterCard({
  letter,
  onMarkRead,
  index,
}: {
  letter: FranchiseLetter;
  onMarkRead: (id: string) => void;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((p) => !p);
    if (!letter.isRead) onMarkRead(letter.id);
  };

  return (
    <Card
      className={`border cursor-pointer transition-all ${
        !letter.isRead ? "border-green-300 bg-green-50" : "border-gray-100"
      }`}
      onClick={handleExpand}
      data-ocid={`franchise_dash.item.${index}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Mail
            size={16}
            className={`flex-shrink-0 mt-0.5 ${!letter.isRead ? "text-green-600" : "text-gray-400"}`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-800 text-sm">
                {letter.subject}
              </h3>
              {!letter.isRead && (
                <span className="text-xs bg-green-600 text-white rounded-full px-1.5">
                  New
                </span>
              )}
              <span
                className={`text-xs rounded-full px-2 py-0.5 border font-medium ${letterTypeBadge[letter.type] || letterTypeBadge.custom}`}
              >
                {letter.type}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {letter.date} · Sent by: {letter.sentBy}
            </p>
            {expanded && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {letter.content}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.print();
                  }}
                  data-ocid="franchise_dash.primary_button"
                >
                  <Printer size={12} className="mr-1" /> Print
                </Button>
              </div>
            )}
          </div>
          <Download size={14} className="text-gray-300 flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}

function ServiceRequestForm({
  form,
  setForm,
  onSubmit,
  onCancel,
}: {
  form: {
    title: string;
    category: FranchiseServiceRequest["category"];
    description: string;
  };
  setForm: React.Dispatch<React.SetStateAction<typeof form>>;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4 py-2">
      <div>
        <Label>Title *</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Brief title of your request"
          className="mt-1"
          data-ocid="franchise_dash.input"
        />
      </div>
      <div>
        <Label>Category</Label>
        <Select
          value={form.category}
          onValueChange={(v) =>
            setForm((f) => ({
              ...f,
              category: v as FranchiseServiceRequest["category"],
            }))
          }
        >
          <SelectTrigger className="mt-1" data-ocid="franchise_dash.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="complaint">Complaint</SelectItem>
            <SelectItem value="query">Query</SelectItem>
            <SelectItem value="renewal">Renewal</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Description *</Label>
        <Textarea
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Describe your issue or request in detail..."
          rows={4}
          className="mt-1"
          data-ocid="franchise_dash.textarea"
        />
      </div>
      <div className="flex gap-3">
        <Button
          className="flex-1 bg-green-700 hover:bg-green-800"
          onClick={onSubmit}
          data-ocid="franchise_dash.submit_button"
        >
          Submit Request
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={onCancel}
          data-ocid="franchise_dash.cancel_button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
