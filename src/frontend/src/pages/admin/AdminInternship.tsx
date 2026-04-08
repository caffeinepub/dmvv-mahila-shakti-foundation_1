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
import { useApp } from "@/context/AppContext";
import {
  AlertCircle,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Download,
  Edit,
  Eye,
  FileText,
  LogIn,
  Mail,
  Phone,
  Plus,
  Search,
  Send,
  Star,
  Trash2,
  Upload,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  shortlisted: "bg-blue-100 text-blue-700",
  call_scheduled: "bg-purple-100 text-purple-700",
  interview: "bg-orange-100 text-orange-700",
  selected: "bg-green-100 text-green-700",
  joining: "bg-teal-100 text-teal-700",
  joined: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  forwarded: "bg-gray-100 text-gray-700",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  shortlisted: "Shortlisted",
  call_scheduled: "Call Scheduled",
  interview: "Interview",
  selected: "Selected",
  joining: "Joining",
  joined: "Joined",
  rejected: "Rejected",
  forwarded: "Forwarded",
};

const emptyVacancy = {
  id: "",
  title: "",
  department: "",
  salary: "",
  location: "",
  duration: "",
  seats: "",
  lastDate: "",
  description: "",
  requirements: "",
  perks: "",
  photo: "",
  videoUrl: "",
  isActive: true,
  createdAt: "",
};

export default function AdminInternship() {
  const {
    internshipVacancies,
    addInternshipVacancy,
    updateInternshipVacancy,
    deleteInternshipVacancy,
    internshipApplications,
    updateInternshipApplication,
    deleteInternshipApplication,
    internshipSettings,
    updateInternshipSettings,
    galleryItems,
  } = useApp();

  const [tab, setTab] = useState("vacancies");
  const [vacancyDialog, setVacancyDialog] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<
    typeof emptyVacancy | null
  >(null);
  const [vacancyForm, setVacancyForm] =
    useState<typeof emptyVacancy>(emptyVacancy);
  const [showGallery, setShowGallery] = useState(false);

  const [viewApp, setViewApp] = useState<string | null>(null);
  const [editApp, setEditApp] = useState<string | null>(null);
  const [editAppForm, setEditAppForm] = useState<Record<string, string>>({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showLetter, setShowLetter] = useState<{
    appId: string;
    type: string;
  } | null>(null);
  const [noteInput, setNoteInput] = useState<Record<string, string>>({});
  const [settingsForm, setSettingsForm] = useState(
    internshipSettings || { heroTitle: "", heroSubtitle: "", description: "" },
  );

  const stats = {
    total: internshipApplications.length,
    pending: internshipApplications.filter((a) => a.status === "pending")
      .length,
    shortlisted: internshipApplications.filter(
      (a) => a.status === "shortlisted",
    ).length,
    interview: internshipApplications.filter((a) => a.status === "interview")
      .length,
    selected: internshipApplications.filter((a) => a.status === "selected")
      .length,
    joined: internshipApplications.filter((a) => a.status === "joined").length,
    rejected: internshipApplications.filter((a) => a.status === "rejected")
      .length,
  };

  const filteredApps = internshipApplications.filter((a) => {
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    const matchRole = filterRole === "all" || a.vacancyTitle === filterRole;
    const matchSearch =
      !searchTerm ||
      a.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone?.includes(searchTerm) ||
      a.id?.includes(searchTerm);
    return matchStatus && matchRole && matchSearch;
  });

  const openAddVacancy = () => {
    setEditingVacancy(null);
    setVacancyForm(emptyVacancy);
    setVacancyDialog(true);
  };

  const openEditVacancy = (v: typeof emptyVacancy) => {
    setEditingVacancy(v);
    setVacancyForm(v);
    setVacancyDialog(true);
  };

  const saveVacancy = () => {
    if (!vacancyForm.title || !vacancyForm.department) {
      toast.error("Title and department are required");
      return;
    }
    if (editingVacancy) {
      updateInternshipVacancy(editingVacancy.id, vacancyForm);
      toast.success("Vacancy updated");
    } else {
      addInternshipVacancy({
        ...vacancyForm,
        id: `vac-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
      toast.success("Vacancy added");
    }
    setVacancyDialog(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setVacancyForm((p) => ({ ...p, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const changeStatus = (appId: string, status: string) => {
    updateInternshipApplication(appId, { status });
    toast.success(`Status updated to ${STATUS_LABELS[status]}`);
  };

  const saveNote = (appId: string) => {
    updateInternshipApplication(appId, { adminNote: noteInput[appId] || "" });
    toast.success("Note saved");
  };

  const saveEditApp = (appId: string) => {
    updateInternshipApplication(appId, editAppForm);
    setEditApp(null);
    toast.success("Profile updated");
  };

  const currentApp = internshipApplications.find(
    (a) => a.id === (viewApp || editApp),
  );

  const generateLetter = (app: typeof currentApp, type: string) => {
    if (!app) return "";
    const date = new Date().toLocaleDateString("en-IN");
    const refNo = `DMVV/INT/${new Date().getFullYear()}/${app.id.slice(-4)}`;
    const templates: Record<string, string> = {
      shortlist: `DMVV BHARTIY MAHILA SHAKTI FOUNDATION™\nShortlist Letter\nRef: ${refNo}\nDate: ${date}\n\nDear ${app.fullName},\n\nWe are pleased to inform you that your application for the internship position of "${app.vacancyTitle}" has been shortlisted.\n\nYou will be contacted shortly for the next steps.\n\nRegards,\nHR Department\nDMVV Bhartiy Mahila Shakti Foundation`,
      interview: `DMVV BHARTIY MAHILA SHAKTI FOUNDATION™\nInterview Call Letter\nRef: ${refNo}\nDate: ${date}\n\nDear ${app.fullName},\n\nYou are invited for an interview for the internship position of "${app.vacancyTitle}".\n\nPlease carry all original documents for verification.\n\nBest regards,\nHR Department\nDMVV Bhartiy Mahila Shakti Foundation`,
      offer: `DMVV BHARTIY MAHILA SHAKTI FOUNDATION™\nOffer Letter\nRef: ${refNo}\nDate: ${date}\n\nDear ${app.fullName},\n\nWe are pleased to offer you the Internship position of "${app.vacancyTitle}" at DMVV Bhartiy Mahila Shakti Foundation.\n\nThis offer is subject to successful completion of document verification and KYC process.\n\nCongratulations and welcome to the team!\n\nRegards,\nAuthorized Signatory\nDMVV Bhartiy Mahila Shakti Foundation`,
      joining: `DMVV BHARTIY MAHILA SHAKTI FOUNDATION™\nJoining Letter\nRef: ${refNo}\nDate: ${date}\n\nDear ${app.fullName},\n\nThis is to confirm your joining as an Intern for the position of "${app.vacancyTitle}" with DMVV Bhartiy Mahila Shakti Foundation.\n\nWe look forward to having you on our team.\n\nRegards,\nHR Department\nDMVV Bhartiy Mahila Shakti Foundation`,
      rejection: `DMVV BHARTIY MAHILA SHAKTI FOUNDATION™\nRejection Letter\nRef: ${refNo}\nDate: ${date}\n\nDear ${app.fullName},\n\nThank you for applying for the internship position of "${app.vacancyTitle}" with us.\n\nAfter careful consideration, we regret to inform you that your application has not been selected at this time. We encourage you to apply again in the future.\n\nBest regards,\nHR Department\nDMVV Bhartiy Mahila Shakti Foundation`,
    };
    return templates[type] || "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Internship Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage vacancies, applications, and internship workflow
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          {
            label: "Total",
            value: stats.total,
            color: "bg-blue-50 text-blue-700",
          },
          {
            label: "Pending",
            value: stats.pending,
            color: "bg-yellow-50 text-yellow-700",
          },
          {
            label: "Shortlisted",
            value: stats.shortlisted,
            color: "bg-purple-50 text-purple-700",
          },
          {
            label: "Interview",
            value: stats.interview,
            color: "bg-orange-50 text-orange-700",
          },
          {
            label: "Selected",
            value: stats.selected,
            color: "bg-green-50 text-green-700",
          },
          {
            label: "Joined",
            value: stats.joined,
            color: "bg-teal-50 text-teal-700",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            color: "bg-red-50 text-red-700",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`${s.color} rounded-lg p-3 text-center`}
          >
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="vacancies">Vacancies</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="settings">Page Settings</TabsTrigger>
        </TabsList>

        {/* --- VACANCIES --- */}
        <TabsContent value="vacancies" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={openAddVacancy}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Vacancy
            </Button>
          </div>
          {internshipVacancies.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No vacancies yet. Click "Add Vacancy" to post one.</p>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {internshipVacancies.map((v) => (
              <Card
                key={v.id}
                className={`border-l-4 ${v.isActive ? "border-l-green-500" : "border-l-gray-300"}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{v.title}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {v.department} — {v.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={v.isActive ? "default" : "secondary"}>
                        {v.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>💰 {v.salary}</span>
                    <span>⏱ {v.duration}</span>
                    <span>👥 {v.seats} seats</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditVacancy(v as typeof emptyVacancy)}
                    >
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        updateInternshipVacancy(v.id, {
                          isActive: !v.isActive,
                        });
                        toast.success(
                          `Vacancy ${v.isActive ? "deactivated" : "activated"}`,
                        );
                      }}
                    >
                      {v.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        if (confirm("Delete this vacancy?")) {
                          deleteInternshipVacancy(v.id);
                          toast.success("Vacancy deleted");
                        }
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* --- APPLICATIONS --- */}
        <TabsContent value="applications" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search name, phone, ID..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {Object.entries(STATUS_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {[
                  ...new Set(internshipApplications.map((a) => a.vacancyTitle)),
                ].map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No applications found.</p>
            </div>
          )}

          <div className="space-y-4">
            {filteredApps.map((app) => (
              <Card key={app.id} className="border-l-4 border-l-blue-400">
                <CardContent className="pt-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {app.passportPhoto ? (
                        <img
                          src={app.passportPhoto}
                          alt={app.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-green-300"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                          {app.fullName?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {app.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {app.vacancyTitle} &bull; {app.phone}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: {app.id} &bull; Applied:{" "}
                          {new Date(app.appliedAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[app.status] || "bg-gray-100"}`}
                      >
                        {STATUS_LABELS[app.status] || app.status}
                      </span>
                      {app.kycApproved && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          KYC ✓
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewApp(app.id)}
                    >
                      <Eye className="w-3 h-3 mr-1" /> View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditApp(app.id);
                        setEditAppForm({
                          fullName: app.fullName || "",
                          phone: app.phone || "",
                          email: app.email || "",
                          qualification: app.qualification || "",
                          skills: app.skills || "",
                          aadhaar: app.aadhaar || "",
                          pan: app.pan || "",
                          address: app.address || "",
                          district: app.district || "",
                          state: app.state || "",
                          accessLevel: app.accessLevel || "",
                        });
                      }}
                    >
                      <Edit className="w-3 h-3 mr-1" /> Edit Profile
                    </Button>
                    {/* Status change */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600"
                      onClick={() => changeStatus(app.id, "shortlisted")}
                    >
                      <Star className="w-3 h-3 mr-1" /> Shortlist
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-purple-600"
                      onClick={() => changeStatus(app.id, "call_scheduled")}
                    >
                      <Phone className="w-3 h-3 mr-1" /> Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-orange-600"
                      onClick={() => changeStatus(app.id, "interview")}
                    >
                      <Calendar className="w-3 h-3 mr-1" /> Interview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600"
                      onClick={() => changeStatus(app.id, "selected")}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" /> Select
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-teal-600"
                      onClick={() => changeStatus(app.id, "joining")}
                    >
                      <LogIn className="w-3 h-3 mr-1" /> Joining
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-emerald-600"
                      onClick={() => changeStatus(app.id, "joined")}
                    >
                      <UserCheck className="w-3 h-3 mr-1" /> Joined
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-gray-600"
                      onClick={() => changeStatus(app.id, "forwarded")}
                    >
                      <Send className="w-3 h-3 mr-1" /> Forward
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => changeStatus(app.id, "rejected")}
                    >
                      <XCircle className="w-3 h-3 mr-1" /> Reject
                    </Button>
                    {/* KYC */}
                    <Button
                      size="sm"
                      variant="outline"
                      className={
                        app.kycApproved ? "text-green-600" : "text-gray-600"
                      }
                      onClick={() => {
                        updateInternshipApplication(app.id, {
                          kycApproved: !app.kycApproved,
                        });
                        toast.success(
                          app.kycApproved ? "KYC revoked" : "KYC approved",
                        );
                      }}
                    >
                      <UserCheck className="w-3 h-3 mr-1" />
                      {app.kycApproved ? "KYC ✓" : "KYC"}
                    </Button>
                    {/* Letters */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-indigo-600"
                      onClick={() =>
                        setShowLetter({ appId: app.id, type: "shortlist" })
                      }
                    >
                      <FileText className="w-3 h-3 mr-1" /> Shortlist Letter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-indigo-600"
                      onClick={() =>
                        setShowLetter({ appId: app.id, type: "interview" })
                      }
                    >
                      <FileText className="w-3 h-3 mr-1" /> Interview Letter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-indigo-600"
                      onClick={() =>
                        setShowLetter({ appId: app.id, type: "offer" })
                      }
                    >
                      <FileText className="w-3 h-3 mr-1" /> Offer Letter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-indigo-600"
                      onClick={() =>
                        setShowLetter({ appId: app.id, type: "joining" })
                      }
                    >
                      <FileText className="w-3 h-3 mr-1" /> Joining Letter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500"
                      onClick={() =>
                        setShowLetter({ appId: app.id, type: "rejection" })
                      }
                    >
                      <FileText className="w-3 h-3 mr-1" /> Rejection Letter
                    </Button>
                    {/* Access level */}
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-gray-500" />
                      <Input
                        className="h-7 w-28 text-xs"
                        placeholder="Access Level"
                        defaultValue={app.accessLevel || ""}
                        onBlur={(e) =>
                          updateInternshipApplication(app.id, {
                            accessLevel: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Delete */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => {
                        if (confirm("Delete this application?")) {
                          deleteInternshipApplication(app.id);
                          toast.success("Application deleted");
                        }
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Admin Note */}
                  <div className="mt-3 flex gap-2">
                    <Input
                      className="text-sm"
                      placeholder="Admin note..."
                      value={noteInput[app.id] ?? app.adminNote ?? ""}
                      onChange={(e) =>
                        setNoteInput((p) => ({
                          ...p,
                          [app.id]: e.target.value,
                        }))
                      }
                    />
                    <Button size="sm" onClick={() => saveNote(app.id)}>
                      Save Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* --- SETTINGS --- */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Internship Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Hero Title</Label>
                <Input
                  value={settingsForm.heroTitle}
                  onChange={(e) =>
                    setSettingsForm((p) => ({
                      ...p,
                      heroTitle: e.target.value,
                    }))
                  }
                  placeholder="e.g. Internship Opportunities"
                />
              </div>
              <div>
                <Label>Hero Subtitle</Label>
                <Input
                  value={settingsForm.heroSubtitle}
                  onChange={(e) =>
                    setSettingsForm((p) => ({
                      ...p,
                      heroSubtitle: e.target.value,
                    }))
                  }
                  placeholder="Short description under the title"
                />
              </div>
              <div>
                <Label>Page Description</Label>
                <Textarea
                  value={settingsForm.description}
                  onChange={(e) =>
                    setSettingsForm((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Full description"
                  rows={3}
                />
              </div>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  updateInternshipSettings(settingsForm);
                  toast.success("Settings saved");
                }}
              >
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Vacancy Dialog */}
      <Dialog open={vacancyDialog} onOpenChange={setVacancyDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVacancy ? "Edit Vacancy" : "Add New Vacancy"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Job Title / Role *</Label>
              <Input
                value={vacancyForm.title}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="e.g. Field Coordinator"
              />
            </div>
            <div>
              <Label>Department *</Label>
              <Input
                value={vacancyForm.department}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, department: e.target.value }))
                }
                placeholder="e.g. HR, Admin, Field Work"
              />
            </div>
            <div>
              <Label>Salary / Stipend</Label>
              <Input
                value={vacancyForm.salary}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, salary: e.target.value }))
                }
                placeholder="e.g. ₹5,000/month"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={vacancyForm.location}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, location: e.target.value }))
                }
                placeholder="e.g. Indore, MP"
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input
                value={vacancyForm.duration}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, duration: e.target.value }))
                }
                placeholder="e.g. 3 Months"
              />
            </div>
            <div>
              <Label>Available Seats</Label>
              <Input
                value={vacancyForm.seats}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, seats: e.target.value }))
                }
                placeholder="e.g. 10"
              />
            </div>
            <div>
              <Label>Last Date to Apply</Label>
              <Input
                type="date"
                value={vacancyForm.lastDate}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, lastDate: e.target.value }))
                }
              />
            </div>
            <div className="col-span-2">
              <Label>Job Description</Label>
              <Textarea
                value={vacancyForm.description}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Detailed description of the internship role..."
                rows={3}
              />
            </div>
            <div className="col-span-2">
              <Label>Requirements / Eligibility</Label>
              <Textarea
                value={vacancyForm.requirements}
                onChange={(e) =>
                  setVacancyForm((p) => ({
                    ...p,
                    requirements: e.target.value,
                  }))
                }
                placeholder="Qualification, skills needed..."
                rows={2}
              />
            </div>
            <div className="col-span-2">
              <Label>Perks & Benefits</Label>
              <Textarea
                value={vacancyForm.perks}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, perks: e.target.value }))
                }
                placeholder="Certificate, stipend, bonus..."
                rows={2}
              />
            </div>
            <div className="col-span-2">
              <Label>Video URL (YouTube or direct link)</Label>
              <Input
                value={vacancyForm.videoUrl}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, videoUrl: e.target.value }))
                }
                placeholder="https://youtube.com/..."
              />
            </div>
            <div className="col-span-2">
              <Label>Photo</Label>
              <div className="flex gap-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex-1 text-center relative cursor-pointer hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handlePhotoUpload}
                  />
                  <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                  <p className="text-sm text-gray-500">Upload from device</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowGallery(true)}
                >
                  Pick from Gallery
                </Button>
              </div>
              {vacancyForm.photo && (
                <img
                  src={vacancyForm.photo}
                  alt="preview"
                  className="mt-2 h-24 rounded object-cover"
                />
              )}
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={vacancyForm.isActive}
                onChange={(e) =>
                  setVacancyForm((p) => ({ ...p, isActive: e.target.checked }))
                }
              />
              <Label htmlFor="isActive">Active (visible on public page)</Label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setVacancyDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={saveVacancy}
            >
              Save Vacancy
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Picker */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select from Gallery</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3">
            {galleryItems
              .filter((g) => g.mediaType !== "video")
              .map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className="w-full p-0 border-0 bg-transparent"
                  onClick={() => {
                    setVacancyForm((p) => ({ ...p, photo: g.src }));
                    setShowGallery(false);
                  }}
                >
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="w-full h-24 object-cover rounded hover:ring-2 ring-green-500"
                  />
                </button>
              ))}
          </div>
          {galleryItems.filter((g) => g.mediaType !== "video").length === 0 && (
            <p className="text-center text-gray-400 py-6">
              No images in gallery. Upload images first.
            </p>
          )}
        </DialogContent>
      </Dialog>

      {/* View Application Detail */}
      {viewApp && currentApp && (
        <Dialog open={!!viewApp} onOpenChange={() => setViewApp(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Application Detail — {currentApp.fullName}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {currentApp.passportPhoto && (
                <img
                  src={currentApp.passportPhoto}
                  alt="passport"
                  className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-green-300"
                />
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {(
                  [
                    ["Application ID", currentApp.id],
                    ["Applied For", currentApp.vacancyTitle],
                    [
                      "Status",
                      STATUS_LABELS[currentApp.status] || currentApp.status,
                    ],
                    [
                      "Applied On",
                      new Date(currentApp.appliedAt).toLocaleDateString(
                        "en-IN",
                      ),
                    ],
                    ["Full Name", currentApp.fullName],
                    ["Father's Name", currentApp.fatherName],
                    ["Date of Birth", currentApp.dob],
                    ["Gender", currentApp.gender],
                    ["Phone", currentApp.phone],
                    ["Email", currentApp.email],
                    ["Qualification", currentApp.qualification],
                    ["Skills", currentApp.skills],
                    ["Experience", currentApp.experience],
                    ["Address", currentApp.address],
                    ["District", currentApp.district],
                    ["State", currentApp.state],
                    ["Pincode", currentApp.pincode],
                    ["Aadhaar", currentApp.aadhaar],
                    ["PAN", currentApp.pan],
                    ["Bank Account", currentApp.bankAccount],
                    ["IFSC", currentApp.ifsc],
                    ["Bank Name", currentApp.bankName],
                    ["KYC Approved", currentApp.kycApproved ? "Yes" : "No"],
                    ["Access Level", currentApp.accessLevel || "—"],
                    ["Admin Note", currentApp.adminNote || "—"],
                  ] as [string, string][]
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">{k}</p>
                      <p className="font-medium text-gray-800">{v}</p>
                    </div>
                  ))}
              </div>
              {/* Documents */}
              <div>
                <h3 className="font-semibold mb-2">Uploaded Documents</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["Aadhaar Card", currentApp.aadhaarDoc],
                      ["PAN Card", currentApp.panDoc],
                      ["Education Cert", currentApp.educationCert],
                      ["Resume", currentApp.resume],
                    ] as [string, string][]
                  )
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <a
                        key={k}
                        href={v}
                        download={k.replace(" ", "_")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-2 border rounded-lg hover:bg-green-50 text-center text-xs text-gray-600"
                      >
                        <Download className="w-5 h-5 mb-1 text-green-600" />
                        {k}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Application Profile */}
      {editApp && (
        <Dialog open={!!editApp} onOpenChange={() => setEditApp(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Applicant Profile</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["fullName", "Full Name"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                  ["qualification", "Qualification"],
                  ["skills", "Skills"],
                  ["aadhaar", "Aadhaar"],
                  ["pan", "PAN"],
                  ["address", "Address"],
                  ["district", "District"],
                  ["state", "State"],
                  ["accessLevel", "Access Level"],
                ] as [string, string][]
              ).map(([field, label]) => (
                <div key={field}>
                  <Label>{label}</Label>
                  <Input
                    value={editAppForm[field] || ""}
                    onChange={(e) =>
                      setEditAppForm((p) => ({ ...p, [field]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setEditApp(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => saveEditApp(editApp)}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Letter Preview */}
      {showLetter &&
        (() => {
          const app = internshipApplications.find(
            (a) => a.id === showLetter.appId,
          );
          const content = generateLetter(app, showLetter.type);
          return (
            <Dialog
              open={!!showLetter}
              onOpenChange={() => setShowLetter(null)}
            >
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {{
                      shortlist: "Shortlist Letter",
                      interview: "Interview Call Letter",
                      offer: "Offer Letter",
                      joining: "Joining Letter",
                      rejection: "Rejection Letter",
                    }[showLetter.type] || "Letter"}
                  </DialogTitle>
                </DialogHeader>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono border">
                  {content}
                </pre>
                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      const blob = new Blob([content], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${showLetter.type}-letter-${showLetter.appId}.txt`;
                      a.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.print()}
                  >
                    Print
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          );
        })()}
    </div>
  );
}
