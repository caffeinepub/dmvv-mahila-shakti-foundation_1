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
  GalleryItem,
  User,
} from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import {
  Building2,
  Check,
  CheckCircle,
  Edit,
  Eye,
  FileText,
  Filter,
  Handshake,
  ImageIcon,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Printer,
  Search,
  Send,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const statusBadge: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  inprogress: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const letterTypeColors: Record<string, string> = {
  approval: "bg-green-100 text-green-800",
  welcome: "bg-blue-100 text-blue-800",
  renewal: "bg-orange-100 text-orange-800",
  forward: "bg-purple-100 text-purple-800",
  cancellation: "bg-red-100 text-red-800",
  custom: "bg-gray-100 text-gray-800",
};

const franchiseStatusBadge: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  suspended: "bg-red-100 text-red-800",
};

function LetterRow({
  letter,
  partnerName,
  onDelete,
}: {
  letter: import("@/context/AppContext").FranchiseLetter;
  partnerName: string;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="border border-gray-100">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Mail size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-gray-800">{letter.subject}</h3>
              <span
                className={`text-xs rounded-full px-2 py-0.5 font-medium ${letterTypeColors[letter.type] || letterTypeColors.custom}`}
              >
                {letter.type}
              </span>
              {!letter.isRead && (
                <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2">
                  Unread
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              To: {partnerName} � {letter.date} � Sent by: {letter.sentBy}
            </p>
            {expanded && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {letter.content}
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded((p) => !p)}
              data-ocid="franchise_partners.secondary_button"
            >
              <Eye size={13} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.print()}
              data-ocid="franchise_partners.secondary_button"
            >
              <Printer size={13} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={onDelete}
              data-ocid="franchise_partners.delete_button"
            >
              <Trash2 size={13} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminFranchisePartners() {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    galleryItems,
    franchiseLetters,
    addFranchiseLetter,
    deleteFranchiseLetter,
    franchiseServiceRequests,
    updateFranchiseServiceRequest,
    deleteServiceRequest,
  } = useApp();

  const franchisePartners = users.filter((u) => u.role === "franchise");

  // Partner filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Edit partner
  const [editPartner, setEditPartner] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [editGalleryOpen, setEditGalleryOpen] = useState(false);

  // Generate letter
  const [letterPartner, setLetterPartner] = useState<User | null>(null);
  const [letterForm, setLetterForm] = useState({
    type: "welcome" as FranchiseLetter["type"],
    subject: "",
    content: "",
  });

  // View partner
  const [viewPartner, setViewPartner] = useState<User | null>(null);

  // Create new partner
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    businessName: "",
    franchiseCategory: "",
    franchisePlan: "",
    franchiseTerritory: "",
    franchiseCommissionRate: "",
    franchiseInvestment: "",
    franchiseJoiningDate: new Date().toISOString().split("T")[0],
  });

  // Service request respond
  const [respondReq, setRespondReq] = useState<FranchiseServiceRequest | null>(
    null,
  );
  const [respondText, setRespondText] = useState("");
  const [respondStatus, setRespondStatus] =
    useState<FranchiseServiceRequest["status"]>("resolved");

  // Letters filter
  const [letterSearch, setLetterSearch] = useState("");
  const [letterTypeFilter, setLetterTypeFilter] = useState("all");

  // SR filter
  const [srStatusFilter, setSrStatusFilter] = useState("all");

  const filtered = franchisePartners.filter((p) => {
    const matchSearch =
      !search ||
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      (p.businessName || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (p.franchiseStatus || "active") === filterStatus;
    const matchCat =
      filterCategory === "all" ||
      (p.franchiseCategory || "") === filterCategory;
    return matchSearch && matchStatus && matchCat;
  });

  const categories = Array.from(
    new Set(
      franchisePartners.map((p) => p.franchiseCategory || "").filter(Boolean),
    ),
  );

  const openEdit = (p: User) => {
    setEditPartner(p);
    setEditForm({
      fullName: p.fullName || "",
      mobile: p.mobile || "",
      email: p.email || "",
      fatherName: p.fatherName || "",
      dob: p.dob || "",
      gender: p.gender || "",
      address: p.address || "",
      district: p.district || "",
      state: p.state || "",
      pincode: p.pincode || "",
      businessName: p.businessName || "",
      franchiseCategory: p.franchiseCategory || "",
      franchisePlan: p.franchisePlan || "",
      franchiseTerritory: p.franchiseTerritory || "",
      franchiseCommissionRate: p.franchiseCommissionRate || "",
      franchiseInvestment: p.franchiseInvestment || "",
      franchiseJoiningDate: p.franchiseJoiningDate || "",
      franchiseStatus: p.franchiseStatus || "active",
    });
  };

  const handleSaveEdit = () => {
    if (!editPartner) return;
    updateUser(editPartner.id, editForm as Partial<User>);
    setEditPartner(null);
    toast.success("Partner profile updated!");
  };

  const handleSelectGalleryPhoto = (item: GalleryItem) => {
    if (!editPartner) return;
    setEditForm((f) => ({ ...f, photoUrl: item.src }));
    setEditGalleryOpen(false);
  };

  const handleGenerateLetter = () => {
    if (!letterPartner || !letterForm.subject || !letterForm.content) {
      toast.error("Please fill all letter fields.");
      return;
    }
    const letter: FranchiseLetter = {
      id: `fl_${Date.now()}`,
      partnerId: letterPartner.id,
      type: letterForm.type,
      subject: letterForm.subject,
      content: letterForm.content,
      date: new Date().toISOString().split("T")[0],
      sentBy: "Admin",
      isRead: false,
    };
    addFranchiseLetter(letter);
    setLetterPartner(null);
    setLetterForm({ type: "welcome", subject: "", content: "" });
    toast.success(
      `${letterForm.type} letter sent to ${letterPartner.fullName}!`,
    );
  };

  const handleCreatePartner = () => {
    if (!createForm.fullName || !createForm.email || !createForm.password) {
      toast.error("Full Name, Email, and Password are required.");
      return;
    }
    const newUser: User = {
      id: `fp_${Date.now()}`,
      ...createForm,
      role: "franchise",
      status: "approved",
      franchiseStatus: "active",
      createdAt: new Date().toISOString(),
      isVerified: true,
    };
    addUser(newUser);
    // Auto welcome letter
    addFranchiseLetter({
      id: `fl_${Date.now() + 1}`,
      partnerId: newUser.id,
      type: "welcome",
      subject: "Welcome to Anshika Udhyog Franchise Network",
      content: `Dear ${createForm.fullName},\n\nWelcome to the DMVV Bhartiy Mahila Shakti Foundation™ Franchise Network!\n\nWe are delighted to have you as our franchise partner. Your business — ${createForm.businessName} — is now part of our growing Anshika Udhyog family.\n\nYour franchise details:\n- Category: ${createForm.franchiseCategory}\n- Plan: ${createForm.franchisePlan}\n- Territory: ${createForm.franchiseTerritory}\n\nFor any assistance, please contact us through the support portal.\n\nWarm regards,\nAdmin Team\nDMVV Bhartiy Mahila Shakti Foundation™`,
      date: new Date().toISOString().split("T")[0],
      sentBy: "Admin",
      isRead: false,
    });
    setCreateOpen(false);
    setCreateForm({
      fullName: "",
      mobile: "",
      email: "",
      password: "",
      businessName: "",
      franchiseCategory: "",
      franchisePlan: "",
      franchiseTerritory: "",
      franchiseCommissionRate: "",
      franchiseInvestment: "",
      franchiseJoiningDate: new Date().toISOString().split("T")[0],
    });
    toast.success(`Partner account created! Login: ${createForm.email}`);
  };

  const handleRespond = () => {
    if (!respondReq) return;
    updateFranchiseServiceRequest(respondReq.id, {
      adminResponse: respondText,
      adminResponseDate: new Date().toISOString().split("T")[0],
      status: respondStatus,
    });
    setRespondReq(null);
    setRespondText("");
    toast.success("Response sent to partner!");
  };

  const filteredLetters = franchiseLetters.filter((l) => {
    const partner = users.find((u) => u.id === l.partnerId);
    const matchSearch =
      !letterSearch ||
      (partner?.fullName || "")
        .toLowerCase()
        .includes(letterSearch.toLowerCase()) ||
      l.subject.toLowerCase().includes(letterSearch.toLowerCase());
    const matchType = letterTypeFilter === "all" || l.type === letterTypeFilter;
    return matchSearch && matchType;
  });

  const filteredSR = franchiseServiceRequests.filter((r) => {
    return srStatusFilter === "all" || r.status === srStatusFilter;
  });

  const stats = {
    total: franchisePartners.length,
    active: franchisePartners.filter(
      (p) => (p.franchiseStatus || "active") === "active",
    ).length,
    inactive: franchisePartners.filter((p) => p.franchiseStatus === "inactive")
      .length,
    suspended: franchisePartners.filter(
      (p) => p.franchiseStatus === "suspended",
    ).length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Handshake className="text-green-700" size={24} /> Franchise
            Partners CRM
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage franchise partners, letters, and service requests
          </p>
        </div>
        <Button
          className="bg-green-700 hover:bg-green-800"
          onClick={() => setCreateOpen(true)}
          data-ocid="franchise_partners.open_modal_button"
        >
          <UserPlus size={16} className="mr-2" /> Add Partner
        </Button>
      </div>

      <Tabs defaultValue="partners">
        <TabsList
          className="mb-5 bg-white border border-gray-200 p-1 rounded-xl"
          data-ocid="franchise_partners.tab"
        >
          <TabsTrigger
            value="partners"
            className="flex items-center gap-1.5"
            data-ocid="franchise_partners.tab"
          >
            <Users size={14} /> All Partners ({stats.total})
          </TabsTrigger>
          <TabsTrigger
            value="letters"
            className="flex items-center gap-1.5"
            data-ocid="franchise_partners.tab"
          >
            <Mail size={14} /> Letters ({franchiseLetters.length})
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="flex items-center gap-1.5"
            data-ocid="franchise_partners.tab"
          >
            <MessageSquare size={14} /> Service Requests (
            {franchiseServiceRequests.length})
          </TabsTrigger>
          <TabsTrigger
            value="create"
            className="flex items-center gap-1.5"
            data-ocid="franchise_partners.tab"
          >
            <UserPlus size={14} /> Create Account
          </TabsTrigger>
        </TabsList>

        {/* ── ALL PARTNERS ─────────────────────────────────── */}
        <TabsContent value="partners">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              {
                label: "Total",
                value: stats.total,
                color: "text-gray-800",
                bg: "bg-white",
              },
              {
                label: "Active",
                value: stats.active,
                color: "text-green-700",
                bg: "bg-green-50",
              },
              {
                label: "Inactive",
                value: stats.inactive,
                color: "text-gray-600",
                bg: "bg-gray-50",
              },
              {
                label: "Suspended",
                value: stats.suspended,
                color: "text-red-600",
                bg: "bg-red-50",
              },
            ].map((s) => (
              <Card key={s.label} className={`border border-gray-100 ${s.bg}`}>
                <CardContent className="p-4 text-center">
                  <p className={`text-2xl font-extrabold ${s.color}`}>
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500">{s.label} Partners</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <Input
                className="pl-9"
                placeholder="Search by name, email, business..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="franchise_partners.search_input"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger
                className="w-36"
                data-ocid="franchise_partners.select"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            {categories.length > 0 && (
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger
                  className="w-40"
                  data-ocid="franchise_partners.select"
                >
                  <Filter size={14} className="mr-1" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {filtered.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="franchise_partners.empty_state"
            >
              <Handshake size={48} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">No franchise partners found</p>
              <p className="text-sm mt-1">
                Add a new partner or adjust filters
              </p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="franchise_partners.list">
              {filtered.map((partner, i) => {
                const initials = partner.fullName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();
                return (
                  <Card
                    key={partner.id}
                    className="border border-gray-100"
                    data-ocid={`franchise_partners.item.${i + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Avatar className="h-12 w-12 border border-green-100">
                          <AvatarImage src={partner.photoUrl} />
                          <AvatarFallback className="bg-green-100 text-green-700 font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-gray-800">
                              {partner.fullName}
                            </h3>
                            <Badge
                              className={
                                franchiseStatusBadge[
                                  partner.franchiseStatus || "active"
                                ] || "bg-gray-100 text-gray-800"
                              }
                            >
                              {partner.franchiseStatus || "active"}
                            </Badge>
                            {partner.franchiseCategory && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                                {partner.franchiseCategory}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {partner.businessName || "No business name"}
                          </p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1">
                            <span>{partner.email}</span>
                            <span>{partner.mobile}</span>
                            {partner.franchiseTerritory && (
                              <span>📍 {partner.franchiseTerritory}</span>
                            )}
                            {partner.franchisePlan && (
                              <span>Plan: {partner.franchisePlan}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setViewPartner(partner)}
                            data-ocid="franchise_partners.secondary_button"
                          >
                            <Eye size={13} className="mr-1" /> View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEdit(partner)}
                            data-ocid="franchise_partners.edit_button"
                          >
                            <Edit size={13} className="mr-1" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-purple-600 border-purple-200 hover:bg-purple-50"
                            onClick={() => {
                              setLetterPartner(partner);
                              setLetterForm({
                                type: "welcome",
                                subject: "",
                                content: "",
                              });
                            }}
                            data-ocid="franchise_partners.secondary_button"
                          >
                            <Mail size={13} className="mr-1" /> Letter
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => {
                              if (
                                confirm(`Delete partner ${partner.fullName}?`)
                              ) {
                                deleteUser(partner.id);
                                toast.success("Partner deleted.");
                              }
                            }}
                            data-ocid="franchise_partners.delete_button"
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── LETTERS ──────────────────────────────────────── */}
        <TabsContent value="letters">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <Input
                className="pl-9"
                placeholder="Search letters by partner name or subject..."
                value={letterSearch}
                onChange={(e) => setLetterSearch(e.target.value)}
                data-ocid="franchise_partners.search_input"
              />
            </div>
            <Select
              value={letterTypeFilter}
              onValueChange={setLetterTypeFilter}
            >
              <SelectTrigger
                className="w-40"
                data-ocid="franchise_partners.select"
              >
                <SelectValue placeholder="Filter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="welcome">Welcome</SelectItem>
                <SelectItem value="renewal">Renewal</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
                <SelectItem value="cancellation">Cancellation</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredLetters.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="franchise_partners.empty_state"
            >
              <Mail size={48} className="mx-auto mb-3 opacity-20" />
              <p>No letters found</p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="franchise_partners.list">
              {filteredLetters.map((letter, i) => {
                const partner = users.find((u) => u.id === letter.partnerId);
                return (
                  <div
                    key={letter.id}
                    data-ocid={`franchise_partners.item.${i + 1}`}
                  >
                    <LetterRow
                      letter={letter}
                      partnerName={partner?.fullName || "Unknown"}
                      onDelete={() => {
                        deleteFranchiseLetter(letter.id);
                        toast.success("Letter deleted.");
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── SERVICE REQUESTS ─────────────────────────────── */}
        <TabsContent value="requests">
          <div className="flex gap-3 mb-5">
            <Select value={srStatusFilter} onValueChange={setSrStatusFilter}>
              <SelectTrigger
                className="w-40"
                data-ocid="franchise_partners.select"
              >
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredSR.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="franchise_partners.empty_state"
            >
              <MessageSquare size={48} className="mx-auto mb-3 opacity-20" />
              <p>No service requests found</p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="franchise_partners.list">
              {filteredSR.map((req, i) => {
                const partner = users.find((u) => u.id === req.partnerId);
                return (
                  <Card
                    key={req.id}
                    className="border border-gray-100"
                    data-ocid={`franchise_partners.item.${i + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <MessageSquare
                          size={15}
                          className="text-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-gray-800">
                              {req.title}
                            </h3>
                            <span
                              className={`text-xs rounded-full px-2 py-0.5 font-medium ${statusBadge[req.status] || statusBadge.pending}`}
                            >
                              {req.status}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2">
                              {req.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            From: {partner?.fullName || "Unknown"} · {req.date}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {req.description}
                          </p>
                          {req.adminResponse && (
                            <div className="mt-2 p-2 bg-green-50 rounded border border-green-100">
                              <p className="text-xs font-semibold text-green-700">
                                Your Response:
                              </p>
                              <p className="text-xs text-gray-600">
                                {req.adminResponse}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-700 border-green-200"
                            onClick={() => {
                              setRespondReq(req);
                              setRespondText(req.adminResponse || "");
                              setRespondStatus("resolved");
                            }}
                            data-ocid="franchise_partners.edit_button"
                          >
                            <Send size={12} className="mr-1" /> Respond
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => {
                              deleteServiceRequest(req.id);
                              toast.success("Request deleted.");
                            }}
                            data-ocid="franchise_partners.delete_button"
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── CREATE ACCOUNT ───────────────────────────────── */}
        <TabsContent value="create">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus size={18} className="text-green-700" /> Create
                Franchise Partner Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-semibold text-gray-600 border-b pb-1">
                Account Details
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    ["fullName", "Full Name *"],
                    ["mobile", "Mobile"],
                    ["email", "Email *"],
                    ["password", "Password *"],
                  ] as [string, string][]
                ).map(([key, label]) => (
                  <div key={key}>
                    <Label className="text-xs">{label}</Label>
                    <Input
                      type={key === "password" ? "password" : "text"}
                      value={createForm[key as keyof typeof createForm] || ""}
                      onChange={(e) =>
                        setCreateForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="franchise_partners.input"
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
                    ["franchisePlan", "Plan (Starter/Standard/Premium)"],
                    ["franchiseTerritory", "Territory"],
                    ["franchiseCommissionRate", "Commission Rate"],
                    ["franchiseInvestment", "Investment Amount"],
                    ["franchiseJoiningDate", "Joining Date"],
                  ] as [string, string][]
                ).map(([key, label]) => (
                  <div key={key}>
                    <Label className="text-xs">{label}</Label>
                    <Input
                      type={key === "franchiseJoiningDate" ? "date" : "text"}
                      value={createForm[key as keyof typeof createForm] || ""}
                      onChange={(e) =>
                        setCreateForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="franchise_partners.input"
                    />
                  </div>
                ))}
              </div>
              <Button
                className="bg-green-700 hover:bg-green-800 w-full mt-2"
                onClick={handleCreatePartner}
                data-ocid="franchise_partners.submit_button"
              >
                <UserPlus size={15} className="mr-2" /> Create Partner Account &
                Send Welcome Letter
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── View Partner Dialog ─────────────────────────── */}
      {viewPartner && (
        <Dialog open={!!viewPartner} onOpenChange={() => setViewPartner(null)}>
          <DialogContent
            className="max-w-lg max-h-[80vh] overflow-y-auto"
            data-ocid="franchise_partners.dialog"
          >
            <DialogHeader>
              <DialogTitle>Partner Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-xl">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={viewPartner.photoUrl} />
                  <AvatarFallback className="bg-green-600 text-white font-bold">
                    {viewPartner.fullName
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {viewPartner.fullName}
                  </h3>
                  <p className="text-green-600">{viewPartner.businessName}</p>
                  <Badge
                    className={
                      franchiseStatusBadge[
                        viewPartner.franchiseStatus || "active"
                      ]
                    }
                  >
                    {viewPartner.franchiseStatus || "active"}
                  </Badge>
                </div>
              </div>
              {[
                ["Email", viewPartner.email],
                ["Mobile", viewPartner.mobile],
                ["Category", viewPartner.franchiseCategory],
                ["Plan", viewPartner.franchisePlan],
                ["Territory", viewPartner.franchiseTerritory],
                ["Commission", viewPartner.franchiseCommissionRate],
                ["Investment", viewPartner.franchiseInvestment],
                ["Joining Date", viewPartner.franchiseJoiningDate],
                ["District", viewPartner.district],
                ["State", viewPartner.state],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between border-b border-gray-50 pb-1"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-800">
                    {value || "—"}
                  </span>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-3 bg-green-700 hover:bg-green-800"
              onClick={() => setViewPartner(null)}
              data-ocid="franchise_partners.close_button"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* ── Edit Partner Dialog ─────────────────────────── */}
      {editPartner && (
        <Dialog open={!!editPartner} onOpenChange={() => setEditPartner(null)}>
          <DialogContent
            className="max-w-2xl max-h-[85vh] overflow-y-auto"
            data-ocid="franchise_partners.dialog"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit size={16} className="text-green-700" /> Edit Partner —{" "}
                {editPartner.fullName}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Photo from gallery */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={editForm.photoUrl || editPartner.photoUrl}
                  />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {editPartner.fullName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditGalleryOpen(true)}
                  data-ocid="franchise_partners.upload_button"
                >
                  <ImageIcon size={13} className="mr-1" /> Pick from Gallery
                </Button>
              </div>

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
                    <Label className="text-xs">{label}</Label>
                    <Input
                      value={editForm[key] || ""}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="franchise_partners.input"
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
                    ["franchiseInvestment", "Investment"],
                  ] as [string, string][]
                ).map(([key, label]) => (
                  <div key={key}>
                    <Label className="text-xs">{label}</Label>
                    <Input
                      value={editForm[key] || ""}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="franchise_partners.input"
                    />
                  </div>
                ))}
                <div>
                  <Label className="text-xs">Status</Label>
                  <Select
                    value={editForm.franchiseStatus || "active"}
                    onValueChange={(v) =>
                      setEditForm((f) => ({ ...f, franchiseStatus: v }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1"
                      data-ocid="franchise_partners.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-green-700 hover:bg-green-800"
                  onClick={handleSaveEdit}
                  data-ocid="franchise_partners.save_button"
                >
                  <Check size={14} className="mr-1" /> Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditPartner(null)}
                  data-ocid="franchise_partners.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Gallery picker inside edit dialog */}
      {editGalleryOpen && (
        <Dialog open={editGalleryOpen} onOpenChange={setEditGalleryOpen}>
          <DialogContent
            className="max-w-2xl max-h-[80vh] overflow-y-auto"
            data-ocid="franchise_partners.dialog"
          >
            <DialogHeader>
              <DialogTitle>Pick Photo from Gallery</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {galleryItems.filter((g) => g.mediaType !== "video").length ===
              0 ? (
                <p className="col-span-4 text-center text-gray-400 py-8">
                  No gallery images available
                </p>
              ) : (
                galleryItems
                  .filter((g) => g.mediaType !== "video")
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-green-500 transition-all"
                      onClick={() => handleSelectGalleryPhoto(item)}
                      data-ocid="franchise_partners.button"
                    >
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))
              )}
            </div>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setEditGalleryOpen(false)}
              data-ocid="franchise_partners.close_button"
            >
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* ── Generate Letter Dialog ──────────────────────── */}
      {letterPartner && (
        <Dialog
          open={!!letterPartner}
          onOpenChange={() => setLetterPartner(null)}
        >
          <DialogContent
            className="max-w-lg"
            data-ocid="franchise_partners.dialog"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail size={16} className="text-purple-600" /> Generate Letter —{" "}
                {letterPartner.fullName}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Letter Type</Label>
                <Select
                  value={letterForm.type}
                  onValueChange={(v) =>
                    setLetterForm((f) => ({
                      ...f,
                      type: v as FranchiseLetter["type"],
                    }))
                  }
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="franchise_partners.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approval">Approval Letter</SelectItem>
                    <SelectItem value="welcome">Welcome Letter</SelectItem>
                    <SelectItem value="renewal">Renewal Letter</SelectItem>
                    <SelectItem value="forward">Forward Letter</SelectItem>
                    <SelectItem value="cancellation">
                      Cancellation Letter
                    </SelectItem>
                    <SelectItem value="custom">Custom Letter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject *</Label>
                <Input
                  value={letterForm.subject}
                  onChange={(e) =>
                    setLetterForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  placeholder="Letter subject"
                  className="mt-1"
                  data-ocid="franchise_partners.input"
                />
              </div>
              <div>
                <Label>Content *</Label>
                <Textarea
                  value={letterForm.content}
                  onChange={(e) =>
                    setLetterForm((f) => ({ ...f, content: e.target.value }))
                  }
                  placeholder="Write the letter content..."
                  rows={6}
                  className="mt-1"
                  data-ocid="franchise_partners.textarea"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-purple-700 hover:bg-purple-800"
                  onClick={handleGenerateLetter}
                  data-ocid="franchise_partners.confirm_button"
                >
                  <Send size={14} className="mr-1" /> Send Letter
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setLetterPartner(null)}
                  data-ocid="franchise_partners.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ── Respond to Service Request Dialog ──────────── */}
      {respondReq && (
        <Dialog open={!!respondReq} onOpenChange={() => setRespondReq(null)}>
          <DialogContent data-ocid="franchise_partners.dialog">
            <DialogHeader>
              <DialogTitle>Respond to Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">{respondReq.title}</p>
                <p className="text-xs text-gray-500">
                  {respondReq.description}
                </p>
              </div>
              <div>
                <Label>Update Status</Label>
                <Select
                  value={respondStatus}
                  onValueChange={(v) =>
                    setRespondStatus(v as FranchiseServiceRequest["status"])
                  }
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="franchise_partners.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Admin Response *</Label>
                <Textarea
                  value={respondText}
                  onChange={(e) => setRespondText(e.target.value)}
                  placeholder="Write your response to the partner..."
                  rows={4}
                  className="mt-1"
                  data-ocid="franchise_partners.textarea"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-green-700 hover:bg-green-800"
                  onClick={handleRespond}
                  data-ocid="franchise_partners.confirm_button"
                >
                  <CheckCircle size={14} className="mr-1" /> Send Response
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setRespondReq(null)}
                  data-ocid="franchise_partners.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ── Add Partner Dialog (from button) ───────────── */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="franchise_partners.dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus size={16} className="text-green-700" /> Create New
              Partner Account
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-600 border-b pb-1">
              Account Details
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["fullName", "Full Name *"],
                  ["mobile", "Mobile"],
                  ["email", "Email *"],
                  ["password", "Password *"],
                ] as [string, string][]
              ).map(([key, label]) => (
                <div key={key}>
                  <Label className="text-xs">{label}</Label>
                  <Input
                    type={key === "password" ? "password" : "text"}
                    value={createForm[key as keyof typeof createForm] || ""}
                    onChange={(e) =>
                      setCreateForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="franchise_partners.input"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-600 border-b pb-1">
              Franchise Details
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["businessName", "Business Name"],
                  ["franchiseCategory", "Category"],
                  ["franchisePlan", "Plan"],
                  ["franchiseTerritory", "Territory"],
                  ["franchiseCommissionRate", "Commission Rate"],
                  ["franchiseInvestment", "Investment Amount"],
                  ["franchiseJoiningDate", "Joining Date"],
                ] as [string, string][]
              ).map(([key, label]) => (
                <div key={key}>
                  <Label className="text-xs">{label}</Label>
                  <Input
                    type={key === "franchiseJoiningDate" ? "date" : "text"}
                    value={createForm[key as keyof typeof createForm] || ""}
                    onChange={(e) =>
                      setCreateForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="franchise_partners.input"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-green-700 hover:bg-green-800"
                onClick={handleCreatePartner}
                data-ocid="franchise_partners.confirm_button"
              >
                <UserPlus size={14} className="mr-1" /> Create Account
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCreateOpen(false)}
                data-ocid="franchise_partners.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
