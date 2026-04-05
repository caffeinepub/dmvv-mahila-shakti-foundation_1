import LetterheadDocument from "@/components/LetterheadDocument";
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
import type { LetterheadConfig, OfficialLetter } from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import {
  CheckCircle,
  Download,
  Eye,
  FileText,
  PenLine,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Letter type templates ────────────────────────────────────────────────────
const LETTER_TEMPLATES: Record<string, { title: string; body: string }> = {
  appointment: {
    title: "Appointment Letter",
    body: `Dear [Name],

We are pleased to inform you that you have been selected and appointed for the position of [Designation] with DMVV Bhartiy Mahila Shakti Foundation, effective from [Date].

Your appointment is subject to the terms and conditions as mentioned below:
1. Your services will be governed by the rules and regulations of the Foundation.
2. You will be required to maintain confidentiality of all organizational matters.
3. Your performance will be reviewed periodically.

We welcome you to our team and wish you a successful tenure with us.

Please sign and return a copy of this letter as your acceptance.

Yours sincerely,`,
  },
  experience: {
    title: "Experience Certificate",
    body: `To Whom It May Concern,

This is to certify that [Name], holding the designation of [Designation], has worked with DMVV Bhartiy Mahila Shakti Foundation from [Start Date] to [End Date].

During this period, [he/she] demonstrated excellent dedication, integrity, and professionalism. [He/She] was found to be hardworking and sincere in the performance of duties assigned.

We wish [him/her] all the best in future endeavors.

Issued on request and without any liability.

Yours faithfully,`,
  },
  noc: {
    title: "No Objection Certificate (NOC)",
    body: `To Whom It May Concern,

This is to certify that there is No Objection from DMVV Bhartiy Mahila Shakti Foundation regarding [Name], [Designation], for [Purpose].

The organization has no claim or objection to [his/her] [purpose — e.g., passport application / higher studies / joining another organization].

This NOC is issued in good faith and without any liability.

Issued on request of the applicant.

Yours faithfully,`,
  },
  approval: {
    title: "Approval Letter",
    body: `Dear [Name],

We are pleased to inform you that your application/request for [Subject] has been duly reviewed by the competent authority.

After careful consideration, we are happy to convey that your request has been APPROVED.

Please note the following conditions apply to this approval:
1. [Condition 1]
2. [Condition 2]

Kindly acknowledge receipt of this letter and proceed accordingly.

Warm regards,`,
  },
  rejection: {
    title: "Rejection Letter",
    body: `Dear [Name],

Thank you for submitting your application for [Subject] to DMVV Bhartiy Mahila Shakti Foundation.

After careful consideration, we regret to inform you that your application has not been successful at this time.

This decision was made after thorough evaluation of all received applications.

We appreciate your interest and encourage you to apply again in the future when suitable opportunities arise.

With regards,`,
  },
  recommendation: {
    title: "Recommendation Letter",
    body: `To Whom It May Concern,

It is with great pleasure that I write this letter of recommendation for [Name].

I have known [Name] in the capacity of [Relationship] for [Duration]. During this time, [he/she] has consistently demonstrated exceptional skills including [skill 1], [skill 2], and [skill 3].

[He/She] is a dedicated, reliable, and hardworking individual who would be an asset to any organization.

I recommend [him/her] without reservation.

Yours sincerely,`,
  },
  notice: {
    title: "Official Notice",
    body: `NOTICE

All concerned are hereby notified that:

[Notice content here. Describe the subject matter, requirements, deadlines, and any relevant information that needs to be communicated to the recipient(s).]

This notice is issued as per the decision of the authorized competent authority and shall come into immediate effect from the date of issue.

For DMVV Bhartiy Mahila Shakti Foundation,`,
  },
  promotion: {
    title: "Promotion Letter",
    body: `Dear [Name],

We are delighted to inform you that in recognition of your outstanding performance, dedication, and valuable contribution to DMVV Bhartiy Mahila Shakti Foundation, you have been promoted to the position of [New Designation], effective from [Date].

Your revised responsibilities and compensation details will be communicated separately.

We are confident that you will continue to excel in your new role and contribute positively to the growth of our organization.

Congratulations on this well-deserved promotion!

Sincerely,`,
  },
  award: {
    title: "Award Certificate Letter",
    body: `Dear [Name],

On behalf of DMVV Bhartiy Mahila Shakti Foundation, it gives us immense pleasure to present you with the [Award Name] Award.

This award recognizes your exceptional contribution in the field of [Field/Area] and your unwavering commitment to the welfare of women and society.

Your efforts have inspired many and reflect the core values of our Foundation.

Congratulations on this well-deserved recognition!

With warm regards,`,
  },
  custom: {
    title: "Official Letter",
    body: `Dear [Recipient Name],

[Write your letter content here. You can customize this template with any subject matter, instructions, or information you wish to communicate.]

For any clarification, please contact us at the above address.

Yours sincerely,`,
  },
};

const DESIGN_NAMES: Record<
  number,
  { name: string; description: string; colors: string[] }
> = {
  1: {
    name: "Classic Green",
    description: "Professional green header, clean and traditional",
    colors: ["#166534", "#16a34a", "#f0fdf4"],
  },
  2: {
    name: "Premium Gold",
    description: "Elegant gold gradient, luxury corporate feel",
    colors: ["#78350f", "#d97706", "#fffbeb"],
  },
  3: {
    name: "Minimal Modern",
    description: "Clean white with green accent bar, contemporary",
    colors: ["#16a34a", "#fff", "#6b7280"],
  },
  4: {
    name: "Government Style",
    description: "Double border, official government document look",
    colors: ["#111827", "#374151", "#fff"],
  },
  5: {
    name: "Blue Corporate",
    description: "Navy blue header, professional corporate style",
    colors: ["#1e3a5f", "#3b82f6", "#eff6ff"],
  },
  6: {
    name: "Red & White",
    description: "Bold red header, formal and authoritative",
    colors: ["#dc2626", "#b91c1c", "#fff5f5"],
  },
  7: {
    name: "Tri-Color (Indian)",
    description: "National tri-color theme, patriotic style",
    colors: ["#FF9933", "#fff", "#138808"],
  },
  8: {
    name: "Dark Green Elegant",
    description: "Deep green with gold accents, prestigious",
    colors: ["#1a4a2e", "#c6a034", "#f0fdf4"],
  },
  9: {
    name: "Purple Gradient",
    description: "Modern purple-to-indigo gradient, contemporary",
    colors: ["#6d28d9", "#4f46e5", "#ede9fe"],
  },
  10: {
    name: "Newspaper Print",
    description: "Bold newspaper-style, classic serif typography",
    colors: ["#111827", "#374151", "#fff"],
  },
};

async function downloadLetterAsPDF(letter: OfficialLetter, refNo: string) {
  const element = document.getElementById("letterhead-print-area");
  if (!element) {
    toast.error("Print area not found. Please open letter preview first.");
    return;
  }
  toast.info("Generating PDF...");
  try {
    const html2canvasLib = (await import("html2canvas")).default;
    const canvas = await html2canvasLib(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const jsPDFLib = (await import("jspdf")).default;
    const pdf = new jsPDFLib("p", "mm", "a4");
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pw, ph);
    pdf.save(`${refNo || "letter"}-${letter.letterTitle}.pdf`);
    toast.success("PDF downloaded successfully!");
  } catch {
    toast.error("PDF generation failed. Please try again.");
  }
}

// ─── SignaturePad ─────────────────────────────────────────────────────────────
function SignaturePad({ onSave }: { onSave: (dataUrl: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if (e instanceof TouchEvent && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    if (e instanceof MouseEvent) {
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    return { x: 0, y: 0 };
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: canvas ref never changes, getPos uses closures
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const startDraw = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawingRef.current = true;
      lastPosRef.current = getPos(e);
    };
    const draw = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastPosRef.current = pos;
    };
    const stopDraw = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDraw);
    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDraw);
    };
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
    toast.success("Signature saved!");
  };

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        width={400}
        height={120}
        style={{
          border: "2px dashed #d1d5db",
          borderRadius: "8px",
          cursor: "crosshair",
          touchAction: "none",
          display: "block",
          background: "#fff",
          maxWidth: "100%",
        }}
      />
      <p className="text-xs text-gray-500">
        Draw your signature in the box above using mouse or touch.
      </p>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={clearCanvas}>
          Clear
        </Button>
        <Button type="button" size="sm" onClick={saveSignature}>
          <PenLine size={14} className="mr-1" /> Save Signature
        </Button>
      </div>
    </div>
  );
}

// ─── DesignCard mini-preview ──────────────────────────────────────────────────
function DesignPreviewCard({
  designId,
  isActive,
  onSelect,
}: {
  designId: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const info = DESIGN_NAMES[designId];
  const [c1, c2, c3] = info.colors;
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isActive ? "ring-2 ring-green-500" : ""
      }`}
      onClick={onSelect}
      data-ocid={`letterhead.design_card.${designId}`}
    >
      <CardContent className="p-3">
        {/* Mini preview */}
        <div
          style={{
            width: "100%",
            height: "120px",
            border: "1px solid #e5e7eb",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "8px",
            background: "#fff",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "32px",
              background: c1,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "rgba(255,255,255,0.3)",
                borderRadius: "50%",
              }}
            />
            <div>
              <div
                style={{
                  width: "80px",
                  height: "5px",
                  background: c2,
                  borderRadius: "2px",
                  marginBottom: "3px",
                }}
              />
              <div
                style={{
                  width: "50px",
                  height: "3px",
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>
          <div style={{ background: c3, height: "6px" }} />
          <div style={{ padding: "6px 8px" }}>
            <div
              style={{
                width: "60%",
                height: "4px",
                background: "#e5e7eb",
                borderRadius: "2px",
                marginBottom: "4px",
              }}
            />
            <div
              style={{
                width: "90%",
                height: "3px",
                background: "#f3f4f6",
                borderRadius: "2px",
                marginBottom: "3px",
              }}
            />
            <div
              style={{
                width: "80%",
                height: "3px",
                background: "#f3f4f6",
                borderRadius: "2px",
                marginBottom: "3px",
              }}
            />
            <div
              style={{
                width: "70%",
                height: "3px",
                background: "#f3f4f6",
                borderRadius: "2px",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              textAlign: "right",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "12px",
                background: c2,
                borderRadius: "2px",
                opacity: 0.6,
              }}
            />
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-800 mb-1">
          Design {designId}: {info.name}
        </div>
        <div className="text-[10px] text-gray-500 mb-2">{info.description}</div>
        {isActive ? (
          <Badge className="bg-green-500 text-white text-[10px]">
            <CheckCircle size={10} className="mr-1" /> Active
          </Badge>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-6 px-2"
            onClick={onSelect}
          >
            Select
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminLetterhead() {
  const {
    letterheadConfig,
    updateLetterheadConfig,
    officialLetters,
    addOfficialLetter,
    updateOfficialLetter,
    deleteOfficialLetter,
    galleryItems,
  } = useApp();

  const [activeTab, setActiveTab] = useState("settings");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [previewLetter, setPreviewLetter] = useState<OfficialLetter | null>(
    null,
  );
  const [editLetter, setEditLetter] = useState<OfficialLetter | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [showGalleryPicker, setShowGalleryPicker] = useState<
    "logo" | "seal" | "signature" | null
  >(null);

  // Settings form state
  const [cfg, setCfg] = useState<LetterheadConfig>({ ...letterheadConfig });
  const [sigMethod, setSigMethod] = useState<"upload" | "draw">(
    letterheadConfig.authoritySignatureMethod,
  );

  useEffect(() => {
    setCfg({ ...letterheadConfig });
    setSigMethod(letterheadConfig.authoritySignatureMethod);
  }, [letterheadConfig]);

  const handleCfgChange = (
    field: keyof LetterheadConfig,
    value: string | number,
  ) => {
    setCfg((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    updateLetterheadConfig(cfg);
    toast.success("Letterhead settings saved!");
  };

  const handleFileToBase64 = (
    file: File,
    callback: (base64: string) => void,
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) callback(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Compose form state
  const emptyLetter: Omit<OfficialLetter, "id" | "createdAt"> = {
    letterType: "custom",
    letterTitle: "",
    referenceNumber: "",
    date: new Date().toISOString().split("T")[0],
    issuedToName: "",
    issuedToDesignation: "",
    issuedToAddress: "",
    issuedByName: letterheadConfig.signatoryName,
    issuedByDesignation: letterheadConfig.signatoryTitle,
    subject: "",
    bodyContent: "",
    designId: letterheadConfig.designId,
    signatureUrl: letterheadConfig.authoritySignatureUrl,
    sealUrl: letterheadConfig.sealUrl,
    status: "draft",
  };

  const [composeLetter, setComposeLetter] =
    useState<Omit<OfficialLetter, "id" | "createdAt">>(emptyLetter);

  const handleComposeChange = (field: string, value: string | number) => {
    setComposeLetter((prev) => ({ ...prev, [field]: value }));
  };

  const handleLetterTypeChange = (type: string) => {
    const tmpl = LETTER_TEMPLATES[type];
    setComposeLetter((prev) => ({
      ...prev,
      letterType: type as OfficialLetter["letterType"],
      letterTitle: tmpl ? tmpl.title : prev.letterTitle,
      bodyContent: tmpl ? tmpl.body : prev.bodyContent,
    }));
  };

  const autoGenerateRef = useCallback(() => {
    const year = new Date().getFullYear();
    const count = String(officialLetters.length + 1).padStart(3, "0");
    return `DMVV/${year}/${count}`;
  }, [officialLetters.length]);

  const handleSaveLetter = (status: "draft" | "issued") => {
    if (!composeLetter.letterTitle.trim()) {
      toast.error("Please enter a letter title.");
      return;
    }
    if (!composeLetter.subject.trim()) {
      toast.error("Please enter a subject.");
      return;
    }
    const now = new Date().toISOString();
    if (editLetter) {
      updateOfficialLetter(editLetter.id, { ...composeLetter, status });
      toast.success("Letter updated!");
      setEditLetter(null);
    } else {
      const newLetter: OfficialLetter = {
        ...composeLetter,
        id: `ltr_${Date.now()}`,
        status,
        referenceNumber: composeLetter.referenceNumber || autoGenerateRef(),
        createdAt: now,
      };
      addOfficialLetter(newLetter);
      toast.success(
        status === "issued" ? "Letter issued!" : "Letter saved as draft!",
      );
    }
    setComposeLetter({
      ...emptyLetter,
      issuedByName: letterheadConfig.signatoryName,
      issuedByDesignation: letterheadConfig.signatoryTitle,
    });
    setActiveTab("letters");
  };

  const handleEditLetter = (letter: OfficialLetter) => {
    setEditLetter(letter);
    setComposeLetter({
      letterType: letter.letterType,
      letterTitle: letter.letterTitle,
      referenceNumber: letter.referenceNumber,
      date: letter.date,
      issuedToName: letter.issuedToName,
      issuedToDesignation: letter.issuedToDesignation,
      issuedToAddress: letter.issuedToAddress,
      issuedByName: letter.issuedByName,
      issuedByDesignation: letter.issuedByDesignation,
      subject: letter.subject,
      bodyContent: letter.bodyContent,
      designId: letter.designId,
      signatureUrl: letter.signatureUrl,
      sealUrl: letter.sealUrl,
      status: letter.status,
    });
    setActiveTab("compose");
  };

  const filteredLetters = officialLetters.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      l.letterTitle.toLowerCase().includes(q) ||
      l.referenceNumber.toLowerCase().includes(q) ||
      l.issuedToName.toLowerCase().includes(q);
    const matchType = filterType === "all" || l.letterType === filterType;
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const previewConfig: LetterheadConfig = {
    ...letterheadConfig,
    designId: composeLetter.designId,
  };

  const previewLetterData: OfficialLetter = {
    ...composeLetter,
    id: "preview",
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="space-y-6" data-ocid="letterhead.page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText size={24} className="text-green-600" />
            Official Letterhead Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Design letterheads, compose official letters, download as PDF.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditLetter(null);
            setComposeLetter({ ...emptyLetter });
            setActiveTab("compose");
          }}
          className="bg-green-600 hover:bg-green-700"
          data-ocid="letterhead.open_modal_button"
        >
          <Plus size={16} className="mr-2" /> New Letter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="settings" data-ocid="letterhead.settings.tab">
            <Settings size={14} className="mr-1" /> Settings
          </TabsTrigger>
          <TabsTrigger value="designs" data-ocid="letterhead.designs.tab">
            <Eye size={14} className="mr-1" /> 10 Designs
          </TabsTrigger>
          <TabsTrigger value="letters" data-ocid="letterhead.letters.tab">
            <FileText size={14} className="mr-1" /> All Letters (
            {officialLetters.length})
          </TabsTrigger>
          <TabsTrigger value="compose" data-ocid="letterhead.compose.tab">
            <PenLine size={14} className="mr-1" /> {editLetter ? "Edit" : "New"}{" "}
            Letter
          </TabsTrigger>
        </TabsList>

        {/* ───── Tab 1: Settings ───── */}
        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Organization Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Logo */}
                <div>
                  <Label>Logo URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={cfg.logoUrl}
                      onChange={(e) =>
                        handleCfgChange("logoUrl", e.target.value)
                      }
                      placeholder="https://... or /assets/logo.png"
                      data-ocid="letterhead.logo.input"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGalleryPicker("logo")}
                      data-ocid="letterhead.logo.upload_button"
                    >
                      <Upload size={14} />
                    </Button>
                  </div>
                  {cfg.logoUrl && (
                    <img
                      src={cfg.logoUrl}
                      alt="logo preview"
                      className="h-12 mt-2 object-contain"
                    />
                  )}
                </div>
                <div>
                  <Label>Organization Name</Label>
                  <Input
                    value={cfg.orgName}
                    onChange={(e) => handleCfgChange("orgName", e.target.value)}
                    className="mt-1"
                    data-ocid="letterhead.orgname.input"
                  />
                </div>
                <div>
                  <Label>Tagline</Label>
                  <Input
                    value={cfg.tagline}
                    onChange={(e) => handleCfgChange("tagline", e.target.value)}
                    className="mt-1"
                    data-ocid="letterhead.tagline.input"
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Textarea
                    value={cfg.address}
                    onChange={(e) => handleCfgChange("address", e.target.value)}
                    rows={2}
                    className="mt-1"
                    data-ocid="letterhead.address.textarea"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Contact Number</Label>
                    <Input
                      value={cfg.contactNumber}
                      onChange={(e) =>
                        handleCfgChange("contactNumber", e.target.value)
                      }
                      className="mt-1"
                      data-ocid="letterhead.contact.input"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={cfg.email}
                      onChange={(e) => handleCfgChange("email", e.target.value)}
                      className="mt-1"
                      data-ocid="letterhead.email.input"
                    />
                  </div>
                </div>
                <div>
                  <Label>Website</Label>
                  <Input
                    value={cfg.website}
                    onChange={(e) => handleCfgChange("website", e.target.value)}
                    className="mt-1"
                    data-ocid="letterhead.website.input"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Signatory & Seal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Signatory Name</Label>
                    <Input
                      value={cfg.signatoryName}
                      onChange={(e) =>
                        handleCfgChange("signatoryName", e.target.value)
                      }
                      className="mt-1"
                      data-ocid="letterhead.signatory_name.input"
                    />
                  </div>
                  <div>
                    <Label>Signatory Title</Label>
                    <Input
                      value={cfg.signatoryTitle}
                      onChange={(e) =>
                        handleCfgChange("signatoryTitle", e.target.value)
                      }
                      className="mt-1"
                      data-ocid="letterhead.signatory_title.input"
                    />
                  </div>
                </div>
                <div>
                  <Label>Footer Note</Label>
                  <Textarea
                    value={cfg.footerNote}
                    onChange={(e) =>
                      handleCfgChange("footerNote", e.target.value)
                    }
                    rows={2}
                    className="mt-1"
                    data-ocid="letterhead.footer_note.textarea"
                  />
                </div>

                {/* Authority Signature */}
                <div>
                  <Label className="mb-2 block">Authority Signature</Label>
                  <div className="flex gap-2 mb-3">
                    <Button
                      type="button"
                      variant={sigMethod === "upload" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSigMethod("upload");
                        handleCfgChange("authoritySignatureMethod", "upload");
                      }}
                      data-ocid="letterhead.sig_upload.toggle"
                    >
                      <Upload size={14} className="mr-1" /> Upload Image
                    </Button>
                    <Button
                      type="button"
                      variant={sigMethod === "draw" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSigMethod("draw");
                        handleCfgChange("authoritySignatureMethod", "draw");
                      }}
                      data-ocid="letterhead.sig_draw.toggle"
                    >
                      <PenLine size={14} className="mr-1" /> Draw
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGalleryPicker("signature")}
                      data-ocid="letterhead.sig_gallery.upload_button"
                    >
                      Gallery
                    </Button>
                  </div>
                  {sigMethod === "upload" && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file)
                            handleFileToBase64(file, (b64) =>
                              handleCfgChange("authoritySignatureUrl", b64),
                            );
                        }}
                        data-ocid="letterhead.signature.upload_button"
                        className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-green-50 file:text-green-700 file:rounded file:text-sm file:cursor-pointer"
                      />
                    </div>
                  )}
                  {sigMethod === "draw" && (
                    <SignaturePad
                      onSave={(dataUrl) => {
                        handleCfgChange("authoritySignatureUrl", dataUrl);
                        handleCfgChange("authoritySignatureMethod", "draw");
                      }}
                    />
                  )}
                  {cfg.authoritySignatureUrl && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500 mb-1">
                        Current signature:
                      </p>
                      <img
                        src={cfg.authoritySignatureUrl}
                        alt="Signature"
                        className="h-10 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Seal */}
                <div>
                  <Label className="mb-1 block">Official Seal</Label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          handleFileToBase64(file, (b64) =>
                            handleCfgChange("sealUrl", b64),
                          );
                      }}
                      data-ocid="letterhead.seal.upload_button"
                      className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-green-50 file:text-green-700 file:rounded file:text-sm file:cursor-pointer flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGalleryPicker("seal")}
                      data-ocid="letterhead.seal_gallery.upload_button"
                    >
                      Gallery
                    </Button>
                  </div>
                  {cfg.sealUrl && (
                    <div className="mt-2">
                      <img
                        src={cfg.sealUrl}
                        alt="Seal"
                        className="h-16 w-16 object-contain rounded-full border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSaveSettings}
              className="bg-green-600 hover:bg-green-700"
              data-ocid="letterhead.settings.save_button"
            >
              Save Settings
            </Button>
          </div>
        </TabsContent>

        {/* ───── Tab 2: 10 Designs ───── */}
        <TabsContent value="designs" className="mt-6">
          <h2 className="text-lg font-semibold mb-4">
            Select Letterhead Design
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
              <DesignPreviewCard
                key={id}
                designId={id}
                isActive={letterheadConfig.designId === id}
                onSelect={() => {
                  updateLetterheadConfig({ designId: id });
                  toast.success(
                    `Design ${id}: ${DESIGN_NAMES[id].name} selected!`,
                  );
                }}
              />
            ))}
          </div>
        </TabsContent>

        {/* ───── Tab 3: All Letters ───── */}
        <TabsContent value="letters" className="mt-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-48">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search letters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                data-ocid="letterhead.letters.search_input"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger
                className="w-44"
                data-ocid="letterhead.letters.type.select"
              >
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(LETTER_TEMPLATES).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger
                className="w-36"
                data-ocid="letterhead.letters.status.select"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredLetters.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="letterhead.letters.empty_state"
            >
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No letters found</p>
              <p className="text-sm">
                Create a new letter using the "New Letter" button.
              </p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="letterhead.letters.list">
              {filteredLetters.map((letter, idx) => (
                <Card
                  key={letter.id}
                  data-ocid={`letterhead.letters.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">
                            {letter.letterTitle}
                          </span>
                          <Badge
                            variant={
                              letter.status === "issued"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              letter.status === "issued"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {letter.status === "issued" ? "Issued" : "Draft"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {LETTER_TEMPLATES[letter.letterType]?.title ||
                              letter.letterType}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-3">
                          <span>Ref: {letter.referenceNumber || "—"}</span>
                          <span>
                            Date:{" "}
                            {letter.date
                              ? new Date(letter.date).toLocaleDateString(
                                  "en-IN",
                                )
                              : "—"}
                          </span>
                          <span>To: {letter.issuedToName || "—"}</span>
                        </div>
                        {letter.subject && (
                          <div className="text-xs text-gray-600 mt-1">
                            Subject: {letter.subject}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditLetter(letter)}
                          data-ocid={`letterhead.letters.edit_button.${idx + 1}`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPreviewLetter(letter)}
                          data-ocid={`letterhead.letters.preview.${idx + 1}`}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateOfficialLetter(letter.id, {
                              status:
                                letter.status === "draft" ? "issued" : "draft",
                            })
                          }
                          data-ocid={`letterhead.letters.toggle.${idx + 1}`}
                        >
                          {letter.status === "draft" ? "Issue" : "Draft"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => setShowDeleteConfirm(letter.id)}
                          data-ocid={`letterhead.letters.delete_button.${idx + 1}`}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ───── Tab 4: Compose ───── */}
        <TabsContent value="compose" className="mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Form */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {editLetter ? "Edit Letter" : "Compose New Letter"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Letter Type</Label>
                      <Select
                        value={composeLetter.letterType}
                        onValueChange={handleLetterTypeChange}
                      >
                        <SelectTrigger
                          className="mt-1"
                          data-ocid="letterhead.compose.type.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(LETTER_TEMPLATES).map(([k, v]) => (
                            <SelectItem key={k} value={k}>
                              {v.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Design</Label>
                      <Select
                        value={String(composeLetter.designId)}
                        onValueChange={(v) =>
                          handleComposeChange("designId", Number(v))
                        }
                      >
                        <SelectTrigger
                          className="mt-1"
                          data-ocid="letterhead.compose.design.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
                            <SelectItem key={id} value={String(id)}>
                              Design {id}: {DESIGN_NAMES[id].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Letter Title</Label>
                    <Input
                      value={composeLetter.letterTitle}
                      onChange={(e) =>
                        handleComposeChange("letterTitle", e.target.value)
                      }
                      className="mt-1"
                      data-ocid="letterhead.compose.title.input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Reference Number</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          value={composeLetter.referenceNumber}
                          onChange={(e) =>
                            handleComposeChange(
                              "referenceNumber",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. DMVV/2026/001"
                          data-ocid="letterhead.compose.ref.input"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleComposeChange(
                              "referenceNumber",
                              autoGenerateRef(),
                            )
                          }
                          title="Auto Generate"
                          data-ocid="letterhead.compose.ref.secondary_button"
                        >
                          <RefreshCw size={14} />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={composeLetter.date}
                        onChange={(e) =>
                          handleComposeChange("date", e.target.value)
                        }
                        className="mt-1"
                        data-ocid="letterhead.compose.date.input"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Issued To
                    </p>
                    <div className="space-y-2">
                      <Input
                        placeholder="Full Name"
                        value={composeLetter.issuedToName}
                        onChange={(e) =>
                          handleComposeChange("issuedToName", e.target.value)
                        }
                        data-ocid="letterhead.compose.to_name.input"
                      />
                      <Input
                        placeholder="Designation"
                        value={composeLetter.issuedToDesignation}
                        onChange={(e) =>
                          handleComposeChange(
                            "issuedToDesignation",
                            e.target.value,
                          )
                        }
                        data-ocid="letterhead.compose.to_designation.input"
                      />
                      <Textarea
                        placeholder="Address"
                        value={composeLetter.issuedToAddress}
                        onChange={(e) =>
                          handleComposeChange("issuedToAddress", e.target.value)
                        }
                        rows={2}
                        data-ocid="letterhead.compose.to_address.textarea"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Issued By
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Name"
                        value={composeLetter.issuedByName}
                        onChange={(e) =>
                          handleComposeChange("issuedByName", e.target.value)
                        }
                        data-ocid="letterhead.compose.by_name.input"
                      />
                      <Input
                        placeholder="Designation"
                        value={composeLetter.issuedByDesignation}
                        onChange={(e) =>
                          handleComposeChange(
                            "issuedByDesignation",
                            e.target.value,
                          )
                        }
                        data-ocid="letterhead.compose.by_designation.input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Subject</Label>
                    <Input
                      value={composeLetter.subject}
                      onChange={(e) =>
                        handleComposeChange("subject", e.target.value)
                      }
                      className="mt-1"
                      data-ocid="letterhead.compose.subject.input"
                    />
                  </div>

                  <div>
                    <Label>Body Content</Label>
                    <Textarea
                      value={composeLetter.bodyContent}
                      onChange={(e) =>
                        handleComposeChange("bodyContent", e.target.value)
                      }
                      rows={10}
                      className="mt-1 font-mono text-sm"
                      data-ocid="letterhead.compose.body.textarea"
                    />
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select
                      value={composeLetter.status}
                      onValueChange={(v) => handleComposeChange("status", v)}
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="letterhead.compose.status.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="issued">Issued</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-2 flex-wrap">
                    <Button
                      onClick={() => handleSaveLetter("draft")}
                      variant="outline"
                      data-ocid="letterhead.compose.save_draft.secondary_button"
                    >
                      Save as Draft
                    </Button>
                    <Button
                      onClick={() => handleSaveLetter("issued")}
                      className="bg-green-600 hover:bg-green-700"
                      data-ocid="letterhead.compose.issue.primary_button"
                    >
                      <CheckCircle size={14} className="mr-1" /> Issue Letter
                    </Button>
                    {editLetter && (
                      <Button
                        variant="outline"
                        className="text-red-600"
                        onClick={() => {
                          setEditLetter(null);
                          setComposeLetter({ ...emptyLetter });
                          setActiveTab("letters");
                        }}
                        data-ocid="letterhead.compose.cancel.cancel_button"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Preview */}
            <div>
              <div className="sticky top-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Live Preview</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      downloadLetterAsPDF(
                        previewLetterData,
                        previewLetterData.referenceNumber,
                      )
                    }
                    data-ocid="letterhead.compose.download.secondary_button"
                  >
                    <Download size={14} className="mr-1" /> Download PDF
                  </Button>
                </div>
                <div className="overflow-x-auto overflow-y-auto max-h-[860px] border border-gray-200 rounded-lg">
                  <div
                    style={{
                      transform: "scale(0.7)",
                      transformOrigin: "top left",
                      width: "794px",
                    }}
                  >
                    <LetterheadDocument
                      config={previewConfig}
                      letter={previewLetterData}
                      printMode={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* ───── Preview Dialog ───── */}
      <Dialog
        open={!!previewLetter}
        onOpenChange={(o) => {
          if (!o) setPreviewLetter(null);
        }}
      >
        <DialogContent
          className="max-w-5xl w-full p-4"
          data-ocid="letterhead.preview.dialog"
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{previewLetter?.letterTitle}</DialogTitle>
              <Button
                size="sm"
                onClick={() =>
                  previewLetter &&
                  downloadLetterAsPDF(
                    previewLetter,
                    previewLetter.referenceNumber,
                  )
                }
                className="bg-green-600 hover:bg-green-700 mr-8"
                data-ocid="letterhead.preview.download.primary_button"
              >
                <Download size={14} className="mr-1" /> Download PDF
              </Button>
            </div>
          </DialogHeader>
          <div className="overflow-auto max-h-[75vh]">
            {previewLetter && (
              <LetterheadDocument
                config={{
                  ...letterheadConfig,
                  designId: previewLetter.designId,
                }}
                letter={previewLetter}
                printMode={false}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ───── Delete Confirm Dialog ───── */}
      <Dialog
        open={!!showDeleteConfirm}
        onOpenChange={(o) => {
          if (!o) setShowDeleteConfirm(null);
        }}
      >
        <DialogContent data-ocid="letterhead.delete.dialog">
          <DialogHeader>
            <DialogTitle>Delete Letter?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            This action cannot be undone. The letter will be permanently
            deleted.
          </p>
          <div className="flex gap-3 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(null)}
              data-ocid="letterhead.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (showDeleteConfirm) {
                  deleteOfficialLetter(showDeleteConfirm);
                  toast.success("Letter deleted.");
                  setShowDeleteConfirm(null);
                }
              }}
              data-ocid="letterhead.delete.confirm_button"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ───── Gallery Picker Dialog ───── */}
      <Dialog
        open={!!showGalleryPicker}
        onOpenChange={(o) => {
          if (!o) setShowGalleryPicker(null);
        }}
      >
        <DialogContent
          className="max-w-2xl"
          data-ocid="letterhead.gallery.dialog"
        >
          <DialogHeader>
            <DialogTitle>Pick from Gallery</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto">
            {galleryItems
              .filter((g) => g.mediaType !== "video")
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-green-500 transition-colors aspect-square"
                  onClick={() => {
                    if (showGalleryPicker === "logo")
                      handleCfgChange("logoUrl", item.src);
                    else if (showGalleryPicker === "seal")
                      handleCfgChange("sealUrl", item.src);
                    else if (showGalleryPicker === "signature")
                      handleCfgChange("authoritySignatureUrl", item.src);
                    setShowGalleryPicker(null);
                    toast.success("Image selected from gallery!");
                  }}
                  data-ocid="letterhead.gallery_item.button"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            {galleryItems.filter((g) => g.mediaType !== "video").length ===
              0 && (
              <div
                className="col-span-4 text-center py-8 text-gray-400"
                data-ocid="letterhead.gallery.empty_state"
              >
                No images in gallery. Upload images via Gallery Management
                first.
              </div>
            )}
          </div>
          <div className="flex justify-end mt-3">
            <Button
              variant="outline"
              onClick={() => setShowGalleryPicker(null)}
              data-ocid="letterhead.gallery.close_button"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
