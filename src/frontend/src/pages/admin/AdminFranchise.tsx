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
  initializeFromBackend,
  saveToBackend,
} from "@/utils/BackendDataService";
import {
  Award,
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit2,
  Factory,
  FileText,
  Handshake,
  Image as ImageIcon,
  IndianRupee,
  Megaphone,
  Package,
  Printer,
  Save,
  Search,
  Settings2,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────
type FranchiseApplication = {
  id: string;
  name: string;
  fatherName?: string;
  dob?: string;
  gender?: string;
  phone: string;
  email?: string;
  address?: string;
  district: string;
  state: string;
  pincode?: string;
  aadhaar?: string;
  pan?: string;
  bankAccount?: string;
  ifsc?: string;
  bankName?: string;
  passportPhoto?: string;
  aadhaarDoc?: string;
  panDoc?: string;
  additionalDoc?: string;
  category?: string;
  plan?: string;
  message?: string;
  status: "pending" | "approved" | "rejected" | "forwarded";
  kycStatus: "pending" | "approved" | "rejected";
  date: string;
  approvedDate?: string;
  rejectedDate?: string;
  forwardedTo?: string;
  adminNotes?: string;
};

// ─── Default Data ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
  hero: {
    title: "Anshika Udhyog Centre — Franchise Program",
    subtitle: "Start your own enterprise — Walk the path of self-employment",
    tagline:
      "Join India's growing franchise network and build your future with DMVV Bhartiy Mahila Shakti Foundation's Anshika Udhyog Centre",
  },
  machines: [
    {
      id: "1",
      name: "Agarbatti Making Machine",
      description:
        "High-speed automatic agarbatti manufacturing machine, 10kg/hr capacity",
      rate: "₹45,000",
      photo: "",
    },
    {
      id: "2",
      name: "Papad Making Machine",
      description: "Semi-automatic papad rolling & drying machine, 20kg/hr",
      rate: "₹28,000",
      photo: "",
    },
    {
      id: "3",
      name: "Masala Grinding Machine",
      description: "Commercial-grade masala grinder with 5 sieves, 15kg/hr",
      rate: "₹35,000",
      photo: "",
    },
  ],
  rawMaterials: [
    { id: "1", name: "Bamboo Powder", unit: "KG", rate: "₹25" },
    { id: "2", name: "Charcoal Powder", unit: "KG", rate: "₹18" },
    { id: "3", name: "Jigat Powder", unit: "KG", rate: "₹40" },
  ],
  blueprint: [
    {
      id: "1",
      step: 1,
      title: "Raw Material Procurement",
      description: "Source quality raw materials from approved suppliers",
    },
    {
      id: "2",
      step: 2,
      title: "Quality Testing",
      description: "Inspect and sort all incoming raw materials",
    },
    {
      id: "3",
      step: 3,
      title: "Machine Processing",
      description: "Feed materials into machines for processing",
    },
  ],
  roadmap: [
    {
      id: "1",
      step: 1,
      title: "Inquiry & Application",
      description: "Fill franchise inquiry form",
      duration: "Day 1–2",
    },
    {
      id: "2",
      step: 2,
      title: "Eligibility Check",
      description: "Team visits your location",
      duration: "Day 3–5",
    },
    {
      id: "3",
      step: 3,
      title: "Agreement Signing",
      description: "Sign franchise agreement",
      duration: "Day 6–10",
    },
  ],
  charges: [
    {
      id: "1",
      item: "Franchise Registration Fee",
      amount: "₹5,000",
      note: "One-time, non-refundable",
    },
    {
      id: "2",
      item: "Machine & Equipment Cost",
      amount: "₹50,000 – ₹2,00,000",
      note: "Depends on product category",
    },
    {
      id: "3",
      item: "Training Fee",
      amount: "₹2,000",
      note: "5-day comprehensive training",
    },
  ],
  marketingSupport: [
    {
      id: "1",
      title: "Digital Marketing",
      description: "Social media promotion and WhatsApp campaigns",
    },
    {
      id: "2",
      title: "Branding Kit",
      description: "Flex banners, boards, visiting cards",
    },
  ],
  plans: [
    {
      id: "1",
      name: "Starter Plan",
      price: "₹75,000",
      duration: "1 Year",
      color: "blue",
      features: ["1 Machine", "Basic Training (3 Days)", "Branding Board"],
      recommended: false,
    },
    {
      id: "2",
      name: "Standard Plan",
      price: "₹1,40,000",
      duration: "2 Years",
      color: "green",
      features: ["2 Machines", "5-Day Training", "Full Branding Kit"],
      recommended: true,
    },
    {
      id: "3",
      name: "Premium Plan",
      price: "₹2,40,000",
      duration: "3 Years",
      color: "orange",
      features: ["3–4 Machines", "10-Day Training", "Digital Marketing"],
      recommended: false,
    },
  ],
  packaging: [
    {
      id: "1",
      product: "Agarbatti",
      type: "Paper Box",
      size: "19 cm",
      weight: "90g",
      qtyPerBox: "12 packets",
    },
    {
      id: "2",
      product: "Papad",
      type: "PP Pouch",
      size: "30x20 cm",
      weight: "200g",
      qtyPerBox: "24 pouches",
    },
  ],
  programs: [
    {
      id: "1",
      name: "Agarbatti Udhyog",
      description: "Complete incense stick manufacturing unit",
      badge: "Popular",
    },
    {
      id: "2",
      name: "Papad Udhyog",
      description: "Traditional papad making with modern equipment",
      badge: "",
    },
    {
      id: "3",
      name: "Masala Udhyog",
      description: "Spice grinding and packaging unit",
      badge: "",
    },
  ],
};

type FranchiseData = typeof DEFAULT_DATA;

function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved) as T;
    } catch {}
    return initial;
  });
  const set = (v: T) => {
    setState(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  return [state, set];
}

function genId() {
  return Date.now().toString();
}

// ─── Letter Modal ─────────────────────────────────────────────────────────────
function LetterModal({
  type,
  app,
  onClose,
}: {
  type: "approval" | "rejection" | "cancellation";
  app: FranchiseApplication;
  onClose: () => void;
}) {
  const today = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const titles = {
    approval: "Franchise Approval Letter",
    rejection: "Franchise Rejection Letter",
    cancellation: "Franchise Cancellation Letter",
  };

  const bodies = {
    approval: `Dear ${app.name},

Congratulations! We are pleased to inform you that your franchise application (Application ID: ${app.id}) for DMVV Anshika Udhyog Centre has been APPROVED.

Your selected franchise category: ${app.category || "N/A"}
Investment Plan: ${app.plan || "N/A"}

Please complete the Franchise Fee Payment at the earliest to initiate the work process. Your franchise unit will be set up within the following timeline:
• Minimum Time: 7 Working Days
• Maximum Time: 30 Working Days

For further assistance, please contact our franchise support team.

We look forward to a successful business partnership with you.

Welcome to the DMVV Bhartiy Mahila Shakti Foundation family!`,
    rejection: `Dear ${app.name},

Thank you for your interest in the DMVV Anshika Udhyog Centre Franchise Program.

We regret to inform you that your franchise application (Application ID: ${app.id}) has been REJECTED after careful review by our team.

This decision may be due to eligibility requirements, documentation issues, or capacity constraints in your area.

You are welcome to reapply after addressing the concerns. For clarification, please contact our office.

We appreciate your interest in DMVV Bhartiy Mahila Shakti Foundation.`,
    cancellation: `Dear ${app.name},

This letter is to inform you that your franchise application / agreement (Application ID: ${app.id}) with DMVV Anshika Udhyog Centre has been CANCELLED as per our records.

If you believe this is in error or wish to discuss this matter, please contact our office immediately.

All associated documents and records related to this application have been duly noted and archived.

Thank you for your understanding.`,
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="franchise.dialog"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText size={18} />
            {titles[type]}
          </DialogTitle>
        </DialogHeader>

        {/* Letter preview */}
        <div
          id="letter-content"
          className="border border-gray-300 rounded-lg p-6 bg-white text-sm"
        >
          {/* Letterhead */}
          <div className="text-center border-b-2 border-green-700 pb-4 mb-4">
            <div className="flex items-center justify-center gap-3 mb-1">
              <img
                src="/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png"
                alt="DMVV Logo"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <div className="font-extrabold text-green-800 text-base">
                  DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
                </div>
                <div className="text-xs text-gray-500">
                  Anshika Udhyog Centre Franchise Program
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Registered NGO | ISO Certified | Est. 2018
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-600 mb-4">
            <div>
              Application ID: <strong>{app.id}</strong>
            </div>
            <div>
              Date: <strong>{today}</strong>
            </div>
          </div>

          <div className="mb-4">
            <div className="font-semibold">To,</div>
            <div>{app.name}</div>
            {app.address && <div className="text-gray-600">{app.address}</div>}
            <div className="text-gray-600">
              {app.district}
              {app.district && app.state ? ", " : ""}
              {app.state}
              {app.pincode ? ` - ${app.pincode}` : ""}
            </div>
          </div>

          <div className="font-bold underline text-center mb-3">
            Subject: {titles[type]}
          </div>

          <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
            {bodies[type]}
          </pre>

          <div className="mt-8 flex justify-between">
            <div className="text-center">
              <div className="w-32 border-t border-gray-400 mt-8 pt-1 text-xs text-gray-500">
                Applicant Signature
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 border-t border-gray-400 mt-8 pt-1 text-xs text-gray-500">
                Authorized Signatory
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            DMVV Bhartiy Mahila Shakti Foundation™ | Official Document
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <Button
            className="flex-1 bg-green-700 text-white hover:bg-green-800"
            onClick={() => window.print()}
            data-ocid="franchise.primary_button"
          >
            <Printer size={14} className="mr-2" /> Print Letter
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="franchise.close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Application Card ─────────────────────────────────────────────────────────
function ApplicationCard({
  app,
  onUpdate,
}: {
  app: FranchiseApplication;
  onUpdate: (updated: FranchiseApplication) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [forwardTo, setForwardTo] = useState(app.forwardedTo || "");
  const [showForwardInput, setShowForwardInput] = useState(false);
  const [adminNotes, setAdminNotes] = useState(app.adminNotes || "");
  const [letterType, setLetterType] = useState<
    "approval" | "rejection" | "cancellation" | null
  >(null);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    approved: "bg-green-100 text-green-800 border-green-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
    forwarded: "bg-blue-100 text-blue-800 border-blue-300",
  };
  const kycColors = {
    pending: "bg-yellow-50 text-yellow-700",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
  };

  const today = new Date().toLocaleDateString("en-IN");

  const handleApprove = () => {
    onUpdate({ ...app, status: "approved", approvedDate: today });
    toast.success(`${app.name}'s application approved!`);
  };
  const handleReject = () => {
    onUpdate({ ...app, status: "rejected", rejectedDate: today });
    toast.error(`${app.name}'s application rejected.`);
  };
  const handleForward = () => {
    if (!forwardTo.trim()) {
      toast.error("Enter forward destination");
      return;
    }
    onUpdate({ ...app, status: "forwarded", forwardedTo: forwardTo.trim() });
    setShowForwardInput(false);
    toast.success(`Application forwarded to ${forwardTo}`);
  };
  const handleKycApprove = () => {
    onUpdate({ ...app, kycStatus: "approved" });
    toast.success("KYC approved!");
  };
  const handleKycReject = () => {
    onUpdate({ ...app, kycStatus: "rejected" });
    toast.error("KYC rejected.");
  };
  const handleSaveNotes = () => {
    onUpdate({ ...app, adminNotes });
    toast.success("Notes saved!");
  };

  const isImage = (val?: string) => val?.startsWith("data:image");
  const isPdf = (val?: string) => val?.startsWith("data:application/pdf");

  return (
    <>
      {letterType && (
        <LetterModal
          type={letterType}
          app={app}
          onClose={() => setLetterType(null)}
        />
      )}

      <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
        {/* Card Header */}
        <button
          type="button"
          className="flex items-center gap-3 p-4 w-full text-left hover:bg-gray-50"
          onClick={() => setExpanded((e) => !e)}
        >
          {/* Passport Photo */}
          <div className="w-10 h-10 rounded-full bg-green-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
            {isImage(app.passportPhoto) ? (
              <img
                src={app.passportPhoto}
                alt={app.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Users size={18} className="text-green-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-900">{app.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${
                  statusColors[app.status]
                }`}
              >
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded font-medium ${
                  kycColors[app.kycStatus]
                }`}
              >
                KYC: {app.kycStatus}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {app.phone} • {app.district}, {app.state} • {app.date}
            </div>
          </div>
          <div className="text-gray-400 flex-shrink-0">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="border-t border-gray-100 p-4 space-y-5">
            {/* Basic Details */}
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Basic Details
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {app.fatherName && (
                  <div>
                    <span className="text-gray-400 text-xs">
                      Father&apos;s Name
                    </span>
                    <div className="font-medium">{app.fatherName}</div>
                  </div>
                )}
                {app.dob && (
                  <div>
                    <span className="text-gray-400 text-xs">Date of Birth</span>
                    <div className="font-medium">{app.dob}</div>
                  </div>
                )}
                {app.gender && (
                  <div>
                    <span className="text-gray-400 text-xs">Gender</span>
                    <div className="font-medium">{app.gender}</div>
                  </div>
                )}
                {app.email && (
                  <div>
                    <span className="text-gray-400 text-xs">Email</span>
                    <div className="font-medium">{app.email}</div>
                  </div>
                )}
                {app.address && (
                  <div className="col-span-2">
                    <span className="text-gray-400 text-xs">Address</span>
                    <div className="font-medium">{app.address}</div>
                  </div>
                )}
                {app.pincode && (
                  <div>
                    <span className="text-gray-400 text-xs">Pincode</span>
                    <div className="font-medium">{app.pincode}</div>
                  </div>
                )}
              </div>
            </div>

            {/* KYC Details */}
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                KYC Details
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {app.aadhaar && (
                  <div>
                    <span className="text-gray-400 text-xs">Aadhaar</span>
                    <div className="font-medium font-mono">{app.aadhaar}</div>
                  </div>
                )}
                {app.pan && (
                  <div>
                    <span className="text-gray-400 text-xs">PAN</span>
                    <div className="font-medium font-mono">{app.pan}</div>
                  </div>
                )}
                {app.bankAccount && (
                  <div>
                    <span className="text-gray-400 text-xs">Account No.</span>
                    <div className="font-medium">{app.bankAccount}</div>
                  </div>
                )}
                {app.ifsc && (
                  <div>
                    <span className="text-gray-400 text-xs">IFSC</span>
                    <div className="font-medium font-mono">{app.ifsc}</div>
                  </div>
                )}
                {app.bankName && (
                  <div>
                    <span className="text-gray-400 text-xs">Bank Name</span>
                    <div className="font-medium">{app.bankName}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Documents */}
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Documents
              </div>
              <div className="flex flex-wrap gap-3">
                {isImage(app.passportPhoto) && (
                  <div className="text-center">
                    <img
                      src={app.passportPhoto}
                      alt="Applicant"
                      className="w-16 h-20 object-cover rounded border border-gray-200"
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      Passport Photo
                    </div>
                  </div>
                )}
                {isImage(app.aadhaarDoc) && (
                  <div className="text-center">
                    <img
                      src={app.aadhaarDoc}
                      alt="Aadhaar"
                      className="w-20 h-14 object-cover rounded border border-gray-200"
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      Aadhaar Card
                    </div>
                  </div>
                )}
                {isPdf(app.aadhaarDoc) && (
                  <a
                    href={app.aadhaarDoc}
                    download="aadhaar.pdf"
                    className="flex items-center gap-1 text-xs text-blue-600 underline"
                  >
                    <FileText size={14} /> Aadhaar PDF
                  </a>
                )}
                {isImage(app.panDoc) && (
                  <div className="text-center">
                    <img
                      src={app.panDoc}
                      alt="PAN"
                      className="w-20 h-14 object-cover rounded border border-gray-200"
                    />
                    <div className="text-xs text-gray-400 mt-1">PAN Card</div>
                  </div>
                )}
                {isPdf(app.panDoc) && (
                  <a
                    href={app.panDoc}
                    download="pan.pdf"
                    className="flex items-center gap-1 text-xs text-blue-600 underline"
                  >
                    <FileText size={14} /> PAN PDF
                  </a>
                )}
                {app.additionalDoc && (
                  <a
                    href={app.additionalDoc}
                    download="additional-doc"
                    className="flex items-center gap-1 text-xs text-blue-600 underline"
                  >
                    <FileText size={14} /> Additional Doc
                  </a>
                )}
                {!app.passportPhoto && !app.aadhaarDoc && !app.panDoc && (
                  <span className="text-xs text-gray-400">
                    No documents uploaded
                  </span>
                )}
              </div>
            </div>

            {/* Application Details */}
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Application Details
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {app.category && (
                  <div>
                    <span className="text-gray-400 text-xs">Category</span>
                    <div className="font-medium">{app.category}</div>
                  </div>
                )}
                {app.plan && (
                  <div>
                    <span className="text-gray-400 text-xs">Plan</span>
                    <div className="font-medium">{app.plan}</div>
                  </div>
                )}
                {app.message && (
                  <div className="col-span-2">
                    <span className="text-gray-400 text-xs">Message</span>
                    <div className="font-medium italic">
                      &ldquo;{app.message}&rdquo;
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* KYC Approval */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs font-bold text-gray-600 mb-2">
                KYC Verification
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-semibold ${
                    kycColors[app.kycStatus]
                  }`}
                >
                  Status: {app.kycStatus}
                </span>
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700 text-xs"
                  onClick={handleKycApprove}
                  data-ocid="franchise.primary_button"
                >
                  <UserCheck size={13} className="mr-1" /> Approve KYC
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs"
                  onClick={handleKycReject}
                  data-ocid="franchise.secondary_button"
                >
                  <XCircle size={13} className="mr-1" /> Reject KYC
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs font-bold text-gray-600 mb-2">
                Application Actions
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleApprove}
                  disabled={app.status === "approved"}
                  data-ocid="franchise.primary_button"
                >
                  <CheckCircle2 size={13} className="mr-1" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleReject}
                  disabled={app.status === "rejected"}
                  data-ocid="franchise.delete_button"
                >
                  <XCircle size={13} className="mr-1" /> Reject
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setShowForwardInput((v) => !v)}
                  data-ocid="franchise.secondary_button"
                >
                  ➡️ Forward
                </Button>
              </div>
              {showForwardInput && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Forward to (dept / person name)"
                    value={forwardTo}
                    onChange={(e) => setForwardTo(e.target.value)}
                    className="text-sm"
                    data-ocid="franchise.input"
                  />
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white"
                    onClick={handleForward}
                    data-ocid="franchise.confirm_button"
                  >
                    Send
                  </Button>
                </div>
              )}
              {app.forwardedTo && (
                <div className="text-xs text-blue-600 mt-1">
                  Forwarded to: {app.forwardedTo}
                </div>
              )}
            </div>

            {/* Admin Notes */}
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                Admin Notes
              </div>
              <Textarea
                rows={2}
                placeholder="Add internal notes about this application..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="text-sm"
                data-ocid="franchise.textarea"
              />
              <Button
                size="sm"
                className="mt-2 bg-gray-700 text-white hover:bg-gray-800"
                onClick={handleSaveNotes}
                data-ocid="franchise.save_button"
              >
                <Save size={13} className="mr-1" /> Save Notes
              </Button>
            </div>

            {/* Letter Generation */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="text-xs font-bold text-green-800 mb-2">
                📄 Generate Official Letters
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-green-700 text-white hover:bg-green-800"
                  onClick={() => setLetterType("approval")}
                  data-ocid="franchise.primary_button"
                >
                  <FileText size={13} className="mr-1" /> Approval Letter
                </Button>
                <Button
                  size="sm"
                  className="bg-red-700 text-white hover:bg-red-800"
                  onClick={() => setLetterType("rejection")}
                  data-ocid="franchise.secondary_button"
                >
                  <FileText size={13} className="mr-1" /> Rejection Letter
                </Button>
                <Button
                  size="sm"
                  className="bg-orange-600 text-white hover:bg-orange-700"
                  onClick={() => setLetterType("cancellation")}
                  data-ocid="franchise.secondary_button"
                >
                  <FileText size={13} className="mr-1" /> Cancellation Letter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Main AdminFranchise Component ───────────────────────────────────────────
export default function AdminFranchise() {
  const [data, setData] = useLocalStorage<FranchiseData>(
    "dmvv_franchise_data",
    DEFAULT_DATA,
  );

  const [applications, setApplications] = useLocalStorage<
    FranchiseApplication[]
  >("dmvv_franchise_applications", []);

  // Search + Filter state for applications
  const [appSearch, setAppSearch] = useState("");
  const [appFilter, setAppFilter] = useState("all");

  // ─── Backend Sync ────────────────────────────────────────────────────────────
  const franchiseBackendLoadedRef = useRef(false);
  useEffect(() => {
    if (franchiseBackendLoadedRef.current) return;
    franchiseBackendLoadedRef.current = true;
    initializeFromBackend().then((backendData) => {
      if (backendData.dmvv_franchise_data) {
        setData(backendData.dmvv_franchise_data as FranchiseData);
      }
      if (backendData.dmvv_franchise_applications) {
        setApplications(
          backendData.dmvv_franchise_applications as FranchiseApplication[],
        );
      }
    });
  }, [setData, setApplications]);

  useEffect(() => {
    saveToBackend("dmvv_franchise_data", data);
  }, [data]);

  const updateApplications = (updated: FranchiseApplication[]) => {
    setApplications(updated);
    saveToBackend("dmvv_franchise_applications", updated);
  };

  const handleUpdateApp = (updatedApp: FranchiseApplication) => {
    const next = applications.map((a) =>
      a.id === updatedApp.id ? updatedApp : a,
    );
    updateApplications(next);
  };

  // ─── Hero edit ────────────────────────────────────────────────────────────
  const [heroEdit, setHeroEdit] = useState(data.hero);

  // ─── Machine form ─────────────────────────────────────────────────────────
  const [machineForm, setMachineForm] = useState({
    id: "",
    name: "",
    description: "",
    rate: "",
    photo: "",
  });
  const [machineEditing, setMachineEditing] = useState(false);

  // ─── Raw material form ────────────────────────────────────────────────────
  const [rmForm, setRmForm] = useState({
    id: "",
    name: "",
    unit: "",
    rate: "",
  });
  const [rmEditing, setRmEditing] = useState(false);

  // ─── Blueprint form ───────────────────────────────────────────────────────
  const [bpForm, setBpForm] = useState({
    id: "",
    step: 0,
    title: "",
    description: "",
  });
  const [bpEditing, setBpEditing] = useState(false);

  // ─── Roadmap form ─────────────────────────────────────────────────────────
  const [roadmapForm, setRoadmapForm] = useState({
    id: "",
    step: 0,
    title: "",
    description: "",
    duration: "",
  });
  const [roadmapEditing, setRoadmapEditing] = useState(false);

  // ─── Charges form ─────────────────────────────────────────────────────────
  const [chargeForm, setChargeForm] = useState({
    id: "",
    item: "",
    amount: "",
    note: "",
  });
  const [chargeEditing, setChargeEditing] = useState(false);

  // ─── Marketing form ───────────────────────────────────────────────────────
  const [msForm, setMsForm] = useState({ id: "", title: "", description: "" });
  const [msEditing, setMsEditing] = useState(false);

  // ─── Plans form ───────────────────────────────────────────────────────────
  const [planForm, setPlanForm] = useState({
    id: "",
    name: "",
    price: "",
    duration: "",
    color: "green",
    features: "",
    recommended: false,
  });
  const [planEditing, setPlanEditing] = useState(false);

  // ─── Packaging form ───────────────────────────────────────────────────────
  const [pkgForm, setPkgForm] = useState({
    id: "",
    product: "",
    type: "",
    size: "",
    weight: "",
    qtyPerBox: "",
  });
  const [pkgEditing, setPkgEditing] = useState(false);

  // ─── Program form ─────────────────────────────────────────────────────────
  const [progForm, setProgForm] = useState({
    id: "",
    name: "",
    description: "",
    badge: "",
  });
  const [progEditing, setProgEditing] = useState(false);

  // ─── Save helpers ─────────────────────────────────────────────────────────
  const saveHero = () => {
    setData({ ...data, hero: heroEdit });
    toast.success("Hero section updated!");
  };

  const startMachineEdit = (m: (typeof data.machines)[0]) => {
    setMachineForm({ ...m });
    setMachineEditing(true);
  };
  const saveMachine = () => {
    if (!machineForm.name || !machineForm.rate) {
      toast.error("Name and rate are required");
      return;
    }
    if (machineEditing && machineForm.id) {
      setData({
        ...data,
        machines: data.machines.map((m) =>
          m.id === machineForm.id ? machineForm : m,
        ),
      });
    } else {
      setData({
        ...data,
        machines: [...data.machines, { ...machineForm, id: genId() }],
      });
    }
    setMachineForm({ id: "", name: "", description: "", rate: "", photo: "" });
    setMachineEditing(false);
    toast.success("Machine saved!");
  };
  const deleteMachine = (id: string) => {
    setData({ ...data, machines: data.machines.filter((m) => m.id !== id) });
    toast.success("Machine deleted!");
  };
  const handleMachinePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setMachineForm((f) => ({ ...f, photo: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const saveRm = () => {
    if (!rmForm.name || !rmForm.rate) {
      toast.error("Name and rate are required");
      return;
    }
    if (rmEditing && rmForm.id) {
      setData({
        ...data,
        rawMaterials: data.rawMaterials.map((r) =>
          r.id === rmForm.id ? rmForm : r,
        ),
      });
    } else {
      setData({
        ...data,
        rawMaterials: [...data.rawMaterials, { ...rmForm, id: genId() }],
      });
    }
    setRmForm({ id: "", name: "", unit: "", rate: "" });
    setRmEditing(false);
    toast.success("Raw material saved!");
  };

  const saveBp = () => {
    if (!bpForm.title) {
      toast.error("Title is required");
      return;
    }
    const stepNum =
      bpEditing && bpForm.id ? bpForm.step : data.blueprint.length + 1;
    if (bpEditing && bpForm.id) {
      setData({
        ...data,
        blueprint: data.blueprint.map((b) =>
          b.id === bpForm.id ? { ...bpForm } : b,
        ),
      });
    } else {
      setData({
        ...data,
        blueprint: [
          ...data.blueprint,
          { ...bpForm, id: genId(), step: stepNum },
        ],
      });
    }
    setBpForm({ id: "", step: 0, title: "", description: "" });
    setBpEditing(false);
    toast.success("Blueprint step saved!");
  };

  const saveRoadmap = () => {
    if (!roadmapForm.title) {
      toast.error("Title is required");
      return;
    }
    const stepNum =
      roadmapEditing && roadmapForm.id
        ? roadmapForm.step
        : data.roadmap.length + 1;
    if (roadmapEditing && roadmapForm.id) {
      setData({
        ...data,
        roadmap: data.roadmap.map((r) =>
          r.id === roadmapForm.id ? { ...roadmapForm } : r,
        ),
      });
    } else {
      setData({
        ...data,
        roadmap: [
          ...data.roadmap,
          { ...roadmapForm, id: genId(), step: stepNum },
        ],
      });
    }
    setRoadmapForm({
      id: "",
      step: 0,
      title: "",
      description: "",
      duration: "",
    });
    setRoadmapEditing(false);
    toast.success("Roadmap step saved!");
  };

  const saveCharge = () => {
    if (!chargeForm.item || !chargeForm.amount) {
      toast.error("Item and amount are required");
      return;
    }
    if (chargeEditing && chargeForm.id) {
      setData({
        ...data,
        charges: data.charges.map((c) =>
          c.id === chargeForm.id ? chargeForm : c,
        ),
      });
    } else {
      setData({
        ...data,
        charges: [...data.charges, { ...chargeForm, id: genId() }],
      });
    }
    setChargeForm({ id: "", item: "", amount: "", note: "" });
    setChargeEditing(false);
    toast.success("Charge saved!");
  };

  const saveMs = () => {
    if (!msForm.title) {
      toast.error("Title is required");
      return;
    }
    if (msEditing && msForm.id) {
      setData({
        ...data,
        marketingSupport: data.marketingSupport.map((m) =>
          m.id === msForm.id ? msForm : m,
        ),
      });
    } else {
      setData({
        ...data,
        marketingSupport: [
          ...data.marketingSupport,
          { ...msForm, id: genId() },
        ],
      });
    }
    setMsForm({ id: "", title: "", description: "" });
    setMsEditing(false);
    toast.success("Marketing support saved!");
  };

  const savePlan = () => {
    if (!planForm.name || !planForm.price) {
      toast.error("Name and price are required");
      return;
    }
    const features = planForm.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    if (planEditing && planForm.id) {
      setData({
        ...data,
        plans: data.plans.map((p) =>
          p.id === planForm.id ? { ...planForm, features } : p,
        ),
      });
    } else {
      setData({
        ...data,
        plans: [...data.plans, { ...planForm, id: genId(), features }],
      });
    }
    setPlanForm({
      id: "",
      name: "",
      price: "",
      duration: "",
      color: "green",
      features: "",
      recommended: false,
    });
    setPlanEditing(false);
    toast.success("Plan saved!");
  };

  const savePkg = () => {
    if (!pkgForm.product) {
      toast.error("Product name is required");
      return;
    }
    if (pkgEditing && pkgForm.id) {
      setData({
        ...data,
        packaging: data.packaging.map((p) =>
          p.id === pkgForm.id ? pkgForm : p,
        ),
      });
    } else {
      setData({
        ...data,
        packaging: [...data.packaging, { ...pkgForm, id: genId() }],
      });
    }
    setPkgForm({
      id: "",
      product: "",
      type: "",
      size: "",
      weight: "",
      qtyPerBox: "",
    });
    setPkgEditing(false);
    toast.success("Packaging detail saved!");
  };

  const saveProg = () => {
    if (!progForm.name) {
      toast.error("Program name is required");
      return;
    }
    if (progEditing && progForm.id) {
      setData({
        ...data,
        programs: data.programs.map((p) =>
          p.id === progForm.id ? progForm : p,
        ),
      });
    } else {
      setData({
        ...data,
        programs: [...data.programs, { ...progForm, id: genId() }],
      });
    }
    setProgForm({ id: "", name: "", description: "", badge: "" });
    setProgEditing(false);
    toast.success("Program saved!");
  };

  // ─── Filtered applications ────────────────────────────────────────────────
  const filteredApps = applications.filter((a) => {
    const matchSearch =
      !appSearch ||
      a.name.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.phone.includes(appSearch) ||
      a.district.toLowerCase().includes(appSearch.toLowerCase());
    const matchFilter = appFilter === "all" || a.status === appFilter;
    return matchSearch && matchFilter;
  });

  const approvedApps = applications.filter((a) => a.status === "approved");
  const pendingApps = applications.filter((a) => a.status === "pending");
  const rejectedForwardedApps = applications.filter(
    (a) => a.status === "rejected" || a.status === "forwarded",
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Franchise Page Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Anshika Udhyog Centre — Manage all franchise page content here
          </p>
        </div>
        <a href="/#/franchise" target="_blank" rel="noreferrer">
          <Button variant="outline" className="border-green-600 text-green-700">
            <FileText size={15} className="mr-2" /> View Live Page
          </Button>
        </a>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex flex-wrap gap-1 h-auto mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="rawmaterial">Raw Material</TabsTrigger>
          <TabsTrigger value="blueprint">Blueprint</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="charges">Charges</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="packaging">Packaging</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="applications">
            Applications
            {pendingApps.length > 0 && (
              <span className="ml-1.5 bg-yellow-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {pendingApps.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
        </TabsList>

        {/* HERO */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake size={18} /> Hero Banner Edit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Main Title</Label>
                <Input
                  value={heroEdit.title}
                  onChange={(e) =>
                    setHeroEdit({ ...heroEdit, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={heroEdit.subtitle}
                  onChange={(e) =>
                    setHeroEdit({ ...heroEdit, subtitle: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Tagline</Label>
                <Textarea
                  rows={2}
                  value={heroEdit.tagline}
                  onChange={(e) =>
                    setHeroEdit({ ...heroEdit, tagline: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={saveHero}
                className="bg-green-700 text-white hover:bg-green-800"
                data-ocid="franchise.save_button"
              >
                <Save size={14} className="mr-2" /> Save Hero
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MACHINES */}
        <TabsContent value="machines">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 size={18} />{" "}
                {machineEditing ? "Edit Machine" : "Add New Machine"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Machine Name *</Label>
                  <Input
                    placeholder="Machine name"
                    value={machineForm.name}
                    onChange={(e) =>
                      setMachineForm({ ...machineForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Rate / Price *</Label>
                  <Input
                    placeholder="e.g. ₹45,000"
                    value={machineForm.rate}
                    onChange={(e) =>
                      setMachineForm({ ...machineForm, rate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  placeholder="Machine details"
                  value={machineForm.description}
                  onChange={(e) =>
                    setMachineForm({
                      ...machineForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Machine Photo Upload</Label>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMachinePhoto}
                    className="text-sm"
                  />
                  {machineForm.photo && (
                    <img
                      src={machineForm.photo}
                      alt="preview"
                      className="w-20 h-14 object-cover rounded border"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveMachine}
                  className="bg-green-700 text-white hover:bg-green-800"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />{" "}
                  {machineEditing ? "Update" : "Add Machine"}
                </Button>
                {machineEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMachineForm({
                        id: "",
                        name: "",
                        description: "",
                        rate: "",
                        photo: "",
                      });
                      setMachineEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {data.machines.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="w-14 h-12 bg-blue-50 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Settings2 size={22} className="text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {m.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {m.description}
                  </div>
                </div>
                <div className="font-bold text-green-700 text-sm">{m.rate}</div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startMachineEdit(m)}
                  data-ocid="franchise.edit_button"
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMachine(m.id)}
                  data-ocid="franchise.delete_button"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* RAW MATERIAL */}
        <TabsContent value="rawmaterial">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package size={18} />{" "}
                {rmEditing ? "Edit Raw Material" : "Add New Raw Material"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>Name *</Label>
                  <Input
                    placeholder="Material name"
                    value={rmForm.name}
                    onChange={(e) =>
                      setRmForm({ ...rmForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Unit (KG/LITRE/PCS)</Label>
                  <Input
                    placeholder="KG"
                    value={rmForm.unit}
                    onChange={(e) =>
                      setRmForm({ ...rmForm, unit: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Rate *</Label>
                  <Input
                    placeholder="₹25"
                    value={rmForm.rate}
                    onChange={(e) =>
                      setRmForm({ ...rmForm, rate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveRm}
                  className="bg-yellow-600 text-white hover:bg-yellow-700"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />
                  {rmEditing ? "Update" : "Add"}
                </Button>
                {rmEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRmForm({ id: "", name: "", unit: "", rate: "" });
                      setRmEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-center">Unit</th>
                  <th className="px-4 py-2 text-right">Rate</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.rawMaterials.map((rm) => (
                  <tr key={rm.id} className="border-t">
                    <td className="px-4 py-2 font-medium">{rm.name}</td>
                    <td className="px-4 py-2 text-center">
                      <Badge variant="secondary">{rm.unit}</Badge>
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-green-700">
                      {rm.rate}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setRmForm({ ...rm });
                            setRmEditing(true);
                          }}
                          data-ocid="franchise.edit_button"
                        >
                          <Edit2 size={13} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setData({
                              ...data,
                              rawMaterials: data.rawMaterials.filter(
                                (r) => r.id !== rm.id,
                              ),
                            })
                          }
                          data-ocid="franchise.delete_button"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* BLUEPRINT */}
        <TabsContent value="blueprint">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory size={18} /> {bpEditing ? "Edit Step" : "Add New Step"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Step Title *</Label>
                <Input
                  placeholder="e.g. Raw Material Procurement"
                  value={bpForm.title}
                  onChange={(e) =>
                    setBpForm({ ...bpForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={bpForm.description}
                  onChange={(e) =>
                    setBpForm({ ...bpForm, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveBp}
                  className="bg-purple-700 text-white hover:bg-purple-800"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />
                  {bpEditing ? "Update" : "Add Step"}
                </Button>
                {bpEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setBpForm({
                        id: "",
                        step: 0,
                        title: "",
                        description: "",
                      });
                      setBpEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {data.blueprint.map((b) => (
              <div
                key={b.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <span className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {b.step}
                </span>
                <div className="flex-1">
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-xs text-gray-500">{b.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setBpForm({ ...b });
                    setBpEditing(true);
                  }}
                  data-ocid="franchise.edit_button"
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      blueprint: data.blueprint.filter((x) => x.id !== b.id),
                    })
                  }
                  data-ocid="franchise.delete_button"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ROADMAP */}
        <TabsContent value="roadmap">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={18} />{" "}
                {roadmapEditing ? "Edit Step" : "Add New Roadmap Step"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Step Title *</Label>
                  <Input
                    placeholder="e.g. Inquiry & Application"
                    value={roadmapForm.title}
                    onChange={(e) =>
                      setRoadmapForm({ ...roadmapForm, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    placeholder="e.g. Day 1–2"
                    value={roadmapForm.duration}
                    onChange={(e) =>
                      setRoadmapForm({
                        ...roadmapForm,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={roadmapForm.description}
                  onChange={(e) =>
                    setRoadmapForm({
                      ...roadmapForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveRoadmap}
                  className="bg-teal-700 text-white hover:bg-teal-800"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />
                  {roadmapEditing ? "Update" : "Add Step"}
                </Button>
                {roadmapEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRoadmapForm({
                        id: "",
                        step: 0,
                        title: "",
                        description: "",
                        duration: "",
                      });
                      setRoadmapEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {data.roadmap.map((r) => (
              <div
                key={r.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {r.step}
                </span>
                <div className="flex-1">
                  <div className="font-semibold">
                    {r.title}{" "}
                    <span className="text-xs text-teal-600 ml-2">
                      {r.duration}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{r.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRoadmapForm({ ...r });
                    setRoadmapEditing(true);
                  }}
                  data-ocid="franchise.edit_button"
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      roadmap: data.roadmap.filter((x) => x.id !== r.id),
                    })
                  }
                  data-ocid="franchise.delete_button"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* CHARGES */}
        <TabsContent value="charges">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee size={18} />{" "}
                {chargeEditing ? "Edit Charge" : "Add New Charge"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>Item Name *</Label>
                  <Input
                    placeholder="e.g. Registration Fee"
                    value={chargeForm.item}
                    onChange={(e) =>
                      setChargeForm({ ...chargeForm, item: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Amount *</Label>
                  <Input
                    placeholder="e.g. ₹5,000"
                    value={chargeForm.amount}
                    onChange={(e) =>
                      setChargeForm({ ...chargeForm, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Note</Label>
                  <Input
                    placeholder="Optional note"
                    value={chargeForm.note}
                    onChange={(e) =>
                      setChargeForm({ ...chargeForm, note: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveCharge}
                  className="bg-green-700 text-white hover:bg-green-800"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />
                  {chargeEditing ? "Update" : "Add Charge"}
                </Button>
                {chargeEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setChargeForm({ id: "", item: "", amount: "", note: "" });
                      setChargeEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="text-left p-3">Item</th>
                  <th className="text-right p-3">Amount</th>
                  <th className="text-left p-3">Note</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.charges.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3 font-medium">{c.item}</td>
                    <td className="p-3 text-right font-bold text-green-700">
                      {c.amount}
                    </td>
                    <td className="p-3 text-xs text-gray-500">{c.note}</td>
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setChargeForm({ ...c });
                            setChargeEditing(true);
                          }}
                          data-ocid="franchise.edit_button"
                        >
                          <Edit2 size={13} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setData({
                              ...data,
                              charges: data.charges.filter(
                                (x) => x.id !== c.id,
                              ),
                            })
                          }
                          data-ocid="franchise.delete_button"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* MARKETING SUPPORT */}
        <TabsContent value="marketing">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone size={18} />{" "}
                {msEditing ? "Edit Item" : "Add New Support Item"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Title *</Label>
                <Input
                  placeholder="e.g. Digital Marketing"
                  value={msForm.title}
                  onChange={(e) =>
                    setMsForm({ ...msForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={msForm.description}
                  onChange={(e) =>
                    setMsForm({ ...msForm, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveMs}
                  className="bg-pink-600 text-white hover:bg-pink-700"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />
                  {msEditing ? "Update" : "Add"}
                </Button>
                {msEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMsForm({ id: "", title: "", description: "" });
                      setMsEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {data.marketingSupport.map((ms) => (
              <div
                key={ms.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-semibold">{ms.title}</div>
                  <div className="text-xs text-gray-500">{ms.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setMsForm({ ...ms });
                    setMsEditing(true);
                  }}
                  data-ocid="franchise.edit_button"
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      marketingSupport: data.marketingSupport.filter(
                        (x) => x.id !== ms.id,
                      ),
                    })
                  }
                  data-ocid="franchise.delete_button"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* PLANS */}
        <TabsContent value="plans">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={18} /> {planEditing ? "Edit Plan" : "Add New Plan"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Plan Name *</Label>
                  <Input
                    placeholder="e.g. Starter Plan"
                    value={planForm.name}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Price *</Label>
                  <Input
                    placeholder="e.g. ₹75,000"
                    value={planForm.price}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    placeholder="e.g. 1 Year"
                    value={planForm.duration}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, duration: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Color (blue/green/orange)</Label>
                  <Input
                    placeholder="green"
                    value={planForm.color}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, color: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Features (one per line)</Label>
                <Textarea
                  rows={4}
                  placeholder={"1 Machine\n5-Day Training\nFull Branding Kit"}
                  value={planForm.features}
                  onChange={(e) =>
                    setPlanForm({ ...planForm, features: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={planForm.recommended}
                  onChange={(e) =>
                    setPlanForm({ ...planForm, recommended: e.target.checked })
                  }
                  id="recommended"
                />
                <Label htmlFor="recommended">
                  Recommended Plan (will be highlighted)
                </Label>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={savePlan}
                  className="bg-green-700 text-white hover:bg-green-800"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />
                  {planEditing ? "Update" : "Add Plan"}
                </Button>
                {planEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPlanForm({
                        id: "",
                        name: "",
                        price: "",
                        duration: "",
                        color: "green",
                        features: "",
                        recommended: false,
                      });
                      setPlanEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {data.plans.map((plan) => (
              <div
                key={plan.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{plan.name}</span>
                    {plan.recommended && (
                      <Badge className="bg-green-600 text-white text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-green-700 font-semibold">
                    {plan.price}
                  </div>
                  <div className="text-xs text-gray-500">
                    {plan.features.join(" • ")}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setPlanForm({
                      ...plan,
                      features: plan.features.join("\n"),
                    });
                    setPlanEditing(true);
                  }}
                  data-ocid="franchise.edit_button"
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      plans: data.plans.filter((x) => x.id !== plan.id),
                    })
                  }
                  data-ocid="franchise.delete_button"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* PACKAGING */}
        <TabsContent value="packaging">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box size={18} />{" "}
                {pkgEditing ? "Edit Packaging" : "Add New Packaging"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>Product *</Label>
                  <Input
                    placeholder="e.g. Agarbatti"
                    value={pkgForm.product}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, product: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Packaging Type</Label>
                  <Input
                    placeholder="e.g. Paper Box"
                    value={pkgForm.type}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, type: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Size</Label>
                  <Input
                    placeholder="e.g. 19 cm"
                    value={pkgForm.size}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, size: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Weight</Label>
                  <Input
                    placeholder="e.g. 90g"
                    value={pkgForm.weight}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, weight: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Qty Per Box</Label>
                  <Input
                    placeholder="e.g. 12 packets"
                    value={pkgForm.qtyPerBox}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, qtyPerBox: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={savePkg}
                  className="bg-teal-600 text-white hover:bg-teal-700"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />
                  {pkgEditing ? "Update" : "Add"}
                </Button>
                {pkgEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPkgForm({
                        id: "",
                        product: "",
                        type: "",
                        size: "",
                        weight: "",
                        qtyPerBox: "",
                      });
                      setPkgEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-teal-50">
                <tr>
                  {[
                    "Product",
                    "Type",
                    "Size",
                    "Weight",
                    "Qty/Box",
                    "Action",
                  ].map((h) => (
                    <th key={h} className="text-left p-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.packaging.map((pkg) => (
                  <tr key={pkg.id} className="border-t">
                    <td className="p-3 font-medium">{pkg.product}</td>
                    <td className="p-3 text-gray-600">{pkg.type}</td>
                    <td className="p-3 text-gray-600">{pkg.size}</td>
                    <td className="p-3 text-gray-600">{pkg.weight}</td>
                    <td className="p-3 text-gray-600">{pkg.qtyPerBox}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setPkgForm({ ...pkg });
                            setPkgEditing(true);
                          }}
                          data-ocid="franchise.edit_button"
                        >
                          <Edit2 size={13} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setData({
                              ...data,
                              packaging: data.packaging.filter(
                                (x) => x.id !== pkg.id,
                              ),
                            })
                          }
                          data-ocid="franchise.delete_button"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* PROGRAMS */}
        <TabsContent value="programs">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap size={18} />{" "}
                {progEditing ? "Edit Program" : "Add New Program"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Label>Program Name *</Label>
                  <Input
                    placeholder="e.g. Agarbatti Udhyog"
                    value={progForm.name}
                    onChange={(e) =>
                      setProgForm({ ...progForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Badge (Popular/New)</Label>
                  <Input
                    placeholder="Popular"
                    value={progForm.badge}
                    onChange={(e) =>
                      setProgForm({ ...progForm, badge: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={progForm.description}
                  onChange={(e) =>
                    setProgForm({ ...progForm, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveProg}
                  className="bg-orange-600 text-white hover:bg-orange-700"
                  data-ocid="franchise.save_button"
                >
                  <Save size={14} className="mr-2" />
                  {progEditing ? "Update" : "Add Program"}
                </Button>
                {progEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setProgForm({
                        id: "",
                        name: "",
                        description: "",
                        badge: "",
                      });
                      setProgEditing(false);
                    }}
                    data-ocid="franchise.cancel_button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {data.programs.map((p) => (
              <div
                key={p.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{p.name}</span>
                    {p.badge && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        {p.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{p.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setProgForm({ ...p });
                    setProgEditing(true);
                  }}
                  data-ocid="franchise.edit_button"
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      programs: data.programs.filter((x) => x.id !== p.id),
                    })
                  }
                  data-ocid="franchise.delete_button"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* APPLICATIONS — Full Upgrade */}
        <TabsContent value="applications" data-ocid="franchise.panel">
          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="bg-white border rounded-xl p-3 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-gray-900">
                {applications.length}
              </div>
              <div className="text-xs text-gray-500">Total Applications</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-extrabold text-yellow-700">
                {pendingApps.length}
              </div>
              <div className="text-xs text-yellow-600">Pending</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-extrabold text-green-700">
                {approvedApps.length}
              </div>
              <div className="text-xs text-green-600">Approved</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-extrabold text-red-700">
                {rejectedForwardedApps.length}
              </div>
              <div className="text-xs text-red-600">Rejected / Forwarded</div>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <Input
                className="pl-9"
                placeholder="Search by name, phone, district..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                data-ocid="franchise.search_input"
              />
            </div>
            <Select value={appFilter} onValueChange={setAppFilter}>
              <SelectTrigger className="w-40" data-ocid="franchise.select">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="forwarded">Forwarded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Application Cards */}
          {filteredApps.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="franchise.empty_state"
            >
              <Handshake size={48} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">
                {applications.length === 0
                  ? "No applications received yet"
                  : "No applications match your search/filter"}
              </p>
              <p className="text-xs mt-1">
                {applications.length === 0
                  ? "When someone applies for a franchise, it will appear here"
                  : "Try adjusting your search terms or filter"}
              </p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="franchise.list">
              {filteredApps.map((app, idx) => (
                <div key={app.id} data-ocid={`franchise.item.${idx + 1}`}>
                  <ApplicationCard app={app} onUpdate={handleUpdateApp} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* RECRUITMENT */}
        <TabsContent value="recruitment" data-ocid="franchise.panel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users size={18} /> Franchise Partners Directory
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  data-ocid="franchise.primary_button"
                >
                  <Printer size={14} className="mr-1" /> Print List
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {approvedApps.length === 0 ? (
                <div
                  className="text-center py-12 text-gray-400"
                  data-ocid="franchise.empty_state"
                >
                  <UserCheck size={48} className="mx-auto mb-3 opacity-30" />
                  <p>No approved franchise partners yet</p>
                  <p className="text-xs mt-1">
                    Approved applications will appear here as active franchise
                    partners
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-ocid="franchise.table">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          #
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Phone
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Category
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Plan
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Location
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Approved Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedApps.map((app, i) => (
                        <tr
                          key={app.id}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          data-ocid={`franchise.row.${i + 1}`}
                        >
                          <td className="p-3 text-gray-400">{i + 1}</td>
                          <td className="p-3 font-semibold text-gray-900">
                            {app.name}
                          </td>
                          <td className="p-3 text-gray-600">{app.phone}</td>
                          <td className="p-3">
                            {app.category ? (
                              <Badge variant="secondary" className="text-xs">
                                {app.category}
                              </Badge>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="p-3 text-gray-600">
                            {app.plan || "—"}
                          </td>
                          <td className="p-3 text-gray-600">
                            {app.district}, {app.state}
                          </td>
                          <td className="p-3 text-gray-500 text-xs">
                            {app.approvedDate || app.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
