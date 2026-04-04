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
  CheckCircle,
  CreditCard,
  Download,
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

// ─── PDF Download helper ──────────────────────────────────────────────────────
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

// ─── Print helper ─────────────────────────────────────────────────────────────
function printElement(targetId: string) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const content = el.innerHTML;
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(`
    <html><head><title>Print</title>
    <style>
      body { font-family: Georgia, serif; margin: 0; padding: 20px; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      * { box-sizing: border-box; }
      @media print { body { margin: 0; padding: 0; } }
    </style>
    </head><body>${content}</body></html>
  `);
  win.document.close();
  win.focus();
  win.print();
  win.close();
}

// ─── PVC ID Card Designs ──────────────────────────────────────────────────────
const ID_CARD_DESIGNS = [
  { id: "design1", label: "Green Classic", color: "#1a7a3c" },
  { id: "design2", label: "Royal Blue", color: "#1a3a7a" },
  { id: "design3", label: "Deep Purple", color: "#4a1a7a" },
  { id: "design4", label: "Maroon Gold", color: "#7a1a1a" },
];

const CERT_DESIGNS = [
  { id: "cert1", label: "Classic Green", accent: "#16a34a" },
  { id: "cert2", label: "Royal Blue", accent: "#1d4ed8" },
  { id: "cert3", label: "Golden Award", accent: "#d97706" },
  { id: "cert4", label: "Purple Prestige", accent: "#7c3aed" },
];

// ─── PVC ID Card Component ────────────────────────────────────────────────────
function IDCardContent({
  user,
  design,
  signatureUrl,
  sealUrl,
  authorityName,
  authorityDesignation: _authorityDesignation,
}: {
  user: User;
  design: string;
  signatureUrl: string;
  sealUrl: string;
  authorityName: string;
  authorityDesignation: string;
}) {
  const d = ID_CARD_DESIGNS.find((x) => x.id === design) || ID_CARD_DESIGNS[0];
  const mainColor = d.color;

  return (
    <div
      id={`id-card-print-${design}`}
      style={{
        width: "340px",
        height: "215px",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        fontFamily: "Arial, sans-serif",
        background: "#fff",
        position: "relative",
        border: `2px solid ${mainColor}`,
        margin: "0 auto",
      }}
    >
      {/* Top color bar */}
      <div
        style={{
          background: `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}cc 100%)`,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "1px",
              lineHeight: 1.2,
            }}
          >
            DMVV BHARTIY MAHILA SHAKTI
          </div>
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "1px",
            }}
          >
            FOUNDATION™
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "8px" }}>
            www.dmvvfoundation.org
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: "6px",
            padding: "2px 8px",
            color: "#fff",
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "1px",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          ID CARD
        </div>
      </div>

      {/* Body */}
      <div
        style={{ display: "flex", padding: "8px 12px", gap: "10px", flex: 1 }}
      >
        {/* Photo */}
        <div
          style={{
            width: "70px",
            height: "80px",
            border: `2px solid ${mainColor}`,
            borderRadius: "8px",
            overflow: "hidden",
            flexShrink: 0,
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "28px", color: "#aaa" }}>👤</span>
          )}
        </div>

        {/* Info */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: "12px",
                color: "#1a1a1a",
                marginBottom: "2px",
              }}
            >
              {user.fullName}
            </div>
            <div
              style={{
                fontSize: "9px",
                color: mainColor,
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {user.role}
            </div>
            <div style={{ fontSize: "8.5px", color: "#555" }}>
              <b>ID:</b> {user.memberId || "DMVV/2025/001"}
            </div>
            <div style={{ fontSize: "8.5px", color: "#555" }}>
              <b>Mobile:</b> {user.mobile}
            </div>
            {user.district && (
              <div style={{ fontSize: "8.5px", color: "#555" }}>
                <b>District:</b> {user.district}
              </div>
            )}
          </div>

          {/* Access code row */}
          <div
            style={{
              background: `${mainColor}11`,
              borderRadius: "4px",
              padding: "2px 6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "8px", color: "#555" }}>
              Access:{" "}
              <b style={{ color: mainColor, fontFamily: "monospace" }}>
                {user.accessCode || "N/A"}
              </b>
            </span>
            <span style={{ fontSize: "7.5px", color: "#888" }}>
              Valid: 2025
            </span>
          </div>
        </div>
      </div>

      {/* Footer with signature and seal */}
      <div
        style={{
          borderTop: `1.5px solid ${mainColor}33`,
          background: "#fafafa",
          padding: "4px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {/* Signature */}
        <div style={{ textAlign: "center" }}>
          {signatureUrl ? (
            <img
              src={signatureUrl}
              alt="Signature"
              style={{ height: "22px", maxWidth: "70px", objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                borderTop: "1px solid #aaa",
                width: "60px",
                marginBottom: "2px",
              }}
            />
          )}
          <div style={{ fontSize: "7px", color: "#777" }}>
            {authorityName || "Director"}
          </div>
          <div style={{ fontSize: "6.5px", color: mainColor, fontWeight: 700 }}>
            DMVV Foundation™
          </div>
        </div>

        {/* Seal */}
        <div style={{ textAlign: "center" }}>
          {sealUrl ? (
            <img
              src={sealUrl}
              alt="Seal"
              style={{
                height: "32px",
                width: "32px",
                objectFit: "contain",
                opacity: 0.85,
              }}
            />
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                border: `1.5px dashed ${mainColor}66`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "7px",
                color: mainColor,
              }}
            >
              SEAL
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Certificate Designs ──────────────────────────────────────────────────────
function MembershipCertContent({
  user,
  design,
  signatureUrl,
  sealUrl,
  authorityName,
  authorityDesignation,
}: {
  user: User;
  design: string;
  signatureUrl: string;
  sealUrl: string;
  authorityName: string;
  authorityDesignation: string;
}) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const d = CERT_DESIGNS.find((x) => x.id === design) || CERT_DESIGNS[0];
  const acc = d.accent;

  const cornerStyle = (pos: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      width: "32px",
      height: "32px",
    };
    const borders: Record<string, React.CSSProperties> = {
      tl: {
        top: "8px",
        left: "8px",
        borderTop: `4px solid ${acc}`,
        borderLeft: `4px solid ${acc}`,
        borderRadius: "4px 0 0 0",
      },
      tr: {
        top: "8px",
        right: "8px",
        borderTop: `4px solid ${acc}`,
        borderRight: `4px solid ${acc}`,
        borderRadius: "0 4px 0 0",
      },
      bl: {
        bottom: "8px",
        left: "8px",
        borderBottom: `4px solid ${acc}`,
        borderLeft: `4px solid ${acc}`,
        borderRadius: "0 0 0 4px",
      },
      br: {
        bottom: "8px",
        right: "8px",
        borderBottom: `4px solid ${acc}`,
        borderRight: `4px solid ${acc}`,
        borderRadius: "0 0 4px 0",
      },
    };
    return { ...base, ...borders[pos] };
  };

  return (
    <div
      id={`membership-cert-print-${design}`}
      style={{
        maxWidth: "680px",
        margin: "0 auto",
        border: `8px double ${acc}`,
        borderRadius: "16px",
        padding: "40px 48px",
        background: "#fff",
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      {/* Corners */}
      <div style={cornerStyle("tl")} />
      <div style={cornerStyle("tr")} />
      <div style={cornerStyle("bl")} />
      <div style={cornerStyle("br")} />

      <div style={{ textAlign: "center" }}>
        {/* Org Header */}
        <div
          style={{
            color: acc,
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "2px",
          }}
        >
          DMVV Bhartiy Mahila Shakti Foundation™
        </div>
        <div
          style={{
            color: "#888",
            fontSize: "11px",
            letterSpacing: "1px",
            marginBottom: "16px",
          }}
        >
          Registered NGO | Empowering Women Across India
        </div>

        <div
          style={{
            borderTop: `2px solid ${acc}44`,
            borderBottom: `2px solid ${acc}44`,
            padding: "8px 0",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#222",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Certificate of Membership
          </div>
        </div>

        <div style={{ color: "#888", fontSize: "13px", marginBottom: "8px" }}>
          This is to certify that
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 800,
            color: acc,
            fontFamily: "Georgia, serif",
            marginBottom: "8px",
          }}
        >
          {user.fullName}
        </div>
        <div
          style={{
            color: "#555",
            fontSize: "13px",
            lineHeight: "1.7",
            marginBottom: "16px",
          }}
        >
          <span style={{ fontWeight: 700, textTransform: "capitalize" }}>
            {user.role}
          </span>
          , is an active and valued member of{" "}
          <span style={{ fontWeight: 700 }}>
            DMVV Bhartiy Mahila Shakti Foundation™
          </span>
          . This member is registered and recognized for their contribution to
          our mission of women empowerment and social development.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            fontSize: "12px",
            color: "#555",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: `${acc}11`,
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <b>Member ID:</b> {user.memberId || "DMVV/2025/001"}
          </div>
          <div
            style={{
              background: `${acc}11`,
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <b>Issued Date:</b> {today}
          </div>
        </div>

        {/* Signature row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${acc}44`,
            paddingTop: "16px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                borderTop: "2px solid #bbb",
                width: "100px",
                marginBottom: "4px",
              }}
            />
            <div style={{ fontSize: "11px", color: "#888" }}>
              Member Signature
            </div>
          </div>

          {/* Seal */}
          {sealUrl && (
            <div style={{ textAlign: "center" }}>
              <img
                src={sealUrl}
                alt="Official Seal"
                style={{
                  height: "60px",
                  width: "60px",
                  objectFit: "contain",
                  opacity: 0.8,
                }}
              />
              <div style={{ fontSize: "10px", color: "#aaa" }}>
                Official Seal
              </div>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            {signatureUrl ? (
              <img
                src={signatureUrl}
                alt="Authority Signature"
                style={{
                  height: "36px",
                  maxWidth: "120px",
                  objectFit: "contain",
                  marginBottom: "2px",
                }}
              />
            ) : (
              <div
                style={{
                  borderTop: "2px solid #bbb",
                  width: "120px",
                  marginBottom: "4px",
                }}
              />
            )}
            <div style={{ fontSize: "11px", color: "#888" }}>
              {authorityName || "Director"}
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: acc }}>
              {authorityDesignation || "DMVV Foundation™"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Achievement Certificate ──────────────────────────────────────────────────
function AchievementCertContent({
  cert,
  userName,
  design,
  signatureUrl,
  sealUrl,
  authorityName,
  authorityDesignation,
}: {
  cert: AchievementCert;
  userName: string;
  design: string;
  signatureUrl: string;
  sealUrl: string;
  authorityName: string;
  authorityDesignation: string;
}) {
  const d = CERT_DESIGNS.find((x) => x.id === design) || CERT_DESIGNS[2];
  const acc = d.accent;

  return (
    <div
      id="achievement-cert-print"
      style={{
        maxWidth: "680px",
        margin: "0 auto",
        border: `8px double ${acc}`,
        borderRadius: "16px",
        padding: "40px 48px",
        background: `linear-gradient(135deg, ${acc}08 0%, #fff 60%)`,
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🏆</div>
        <div
          style={{
            color: acc,
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "2px",
          }}
        >
          DMVV Bhartiy Mahila Shakti Foundation™
        </div>
        <div
          style={{
            borderTop: `2px solid ${acc}44`,
            borderBottom: `2px solid ${acc}44`,
            padding: "8px 0",
            margin: "12px 0",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#222",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Certificate of Achievement
          </div>
          <div
            style={{
              color: acc,
              fontWeight: 700,
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            {cert.category}
          </div>
        </div>

        <div style={{ color: "#888", fontSize: "13px", margin: "8px 0" }}>
          This certificate is proudly presented to
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 800,
            color: acc,
            marginBottom: "8px",
          }}
        >
          {userName}
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#222",
            borderBottom: `1px solid ${acc}44`,
            paddingBottom: "12px",
            marginBottom: "12px",
          }}
        >
          {cert.title}
        </div>
        <div
          style={{
            color: "#666",
            fontSize: "13px",
            lineHeight: "1.7",
            marginBottom: "20px",
          }}
        >
          {cert.description}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            fontSize: "12px",
            color: "#555",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: `${acc}11`,
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <b>Awarded By:</b> {cert.awardedBy}
          </div>
          <div
            style={{
              background: `${acc}11`,
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <b>Date:</b> {cert.issuedDate}
          </div>
        </div>

        {/* Signature row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${acc}44`,
            paddingTop: "16px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                borderTop: "2px solid #bbb",
                width: "100px",
                marginBottom: "4px",
              }}
            />
            <div style={{ fontSize: "11px", color: "#888" }}>
              Recipient's Signature
            </div>
          </div>
          {sealUrl && (
            <div style={{ textAlign: "center" }}>
              <img
                src={sealUrl}
                alt="Seal"
                style={{
                  height: "60px",
                  width: "60px",
                  objectFit: "contain",
                  opacity: 0.8,
                }}
              />
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            {signatureUrl ? (
              <img
                src={signatureUrl}
                alt="Signature"
                style={{
                  height: "36px",
                  maxWidth: "120px",
                  objectFit: "contain",
                  marginBottom: "2px",
                }}
              />
            ) : (
              <div
                style={{
                  borderTop: "2px solid #bbb",
                  width: "120px",
                  marginBottom: "4px",
                }}
              />
            )}
            <div style={{ fontSize: "11px", color: "#888" }}>
              {authorityName || "Director"}
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: acc }}>
              {authorityDesignation || "DMVV Foundation™"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Promotion Letter ─────────────────────────────────────────────────────────
function PromotionLetterContent({
  promo,
  user,
  signatureUrl,
  sealUrl,
  authorityName,
  authorityDesignation,
}: {
  promo: Promotion;
  user: User;
  signatureUrl: string;
  sealUrl: string;
  authorityName: string;
  authorityDesignation: string;
}) {
  const date = promo.letterDate || promo.promotionDate;
  return (
    <div
      id="promotion-letter-print"
      style={{
        maxWidth: "680px",
        margin: "0 auto",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "40px 48px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          borderBottom: "4px solid #16a34a",
          paddingBottom: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: "16px", color: "#16a34a" }}>
          DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
        </div>
        <div style={{ fontSize: "11px", color: "#888" }}>
          Registered NGO | Women Empowerment | India
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
          fontSize: "13px",
          color: "#555",
          marginBottom: "16px",
        }}
      >
        Date: {date}
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: 800,
          color: "#222",
          letterSpacing: "2px",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "16px",
          marginBottom: "24px",
        }}
      >
        PROMOTION LETTER
      </div>

      <div style={{ lineHeight: "1.8", color: "#444", fontSize: "14px" }}>
        <p>
          Dear <strong>{user.fullName}</strong>,
        </p>
        <p>
          We are pleased to inform you that you have been promoted from{" "}
          <strong style={{ color: "#16a34a", textTransform: "capitalize" }}>
            {promo.fromRole}
          </strong>{" "}
          to{" "}
          <strong style={{ color: "#16a34a", textTransform: "capitalize" }}>
            {promo.toRole}
          </strong>{" "}
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
        <p style={{ marginTop: "24px" }}>Yours sincerely,</p>
      </div>

      <div
        style={{
          marginTop: "32px",
          paddingTop: "16px",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "flex-end",
          gap: "24px",
        }}
      >
        {signatureUrl && (
          <img
            src={signatureUrl}
            alt="Signature"
            style={{ height: "48px", maxWidth: "140px", objectFit: "contain" }}
          />
        )}
        {sealUrl && (
          <img
            src={sealUrl}
            alt="Seal"
            style={{
              height: "64px",
              width: "64px",
              objectFit: "contain",
              opacity: 0.8,
            }}
          />
        )}
        <div>
          {!signatureUrl && (
            <div
              style={{
                borderTop: "2px solid #aaa",
                width: "160px",
                marginBottom: "4px",
              }}
            />
          )}
          <div style={{ fontWeight: 800, color: "#222", fontSize: "14px" }}>
            {authorityName || "Director"}
          </div>
          <div style={{ color: "#16a34a", fontWeight: 700, fontSize: "13px" }}>
            {authorityDesignation || "DMVV Bhartiy Mahila Shakti Foundation™"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Design Selector Component ────────────────────────────────────────────────
function DesignSelector<
  T extends { id: string; label: string; color?: string; accent?: string },
>({
  designs,
  selected,
  onSelect,
}: {
  designs: T[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {designs.map((d) => {
        const colorVal =
          (d as { color?: string; accent?: string }).color ||
          (d as { color?: string; accent?: string }).accent ||
          "#16a34a";
        return (
          <button
            type="button"
            key={d.id}
            onClick={() => onSelect(d.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
              selected === d.id
                ? "ring-2 ring-offset-1"
                : "opacity-70 hover:opacity-100"
            }`}
            style={{
              borderColor: colorVal,
              color: selected === d.id ? "#fff" : colorVal,
              background: selected === d.id ? colorVal : "transparent",
            }}
          >
            {selected === d.id && (
              <CheckCircle size={11} className="inline mr-1" />
            )}
            {d.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminUserFullProfile() {
  const { userId } = useParams<{ userId: string }>();
  const { users, updateUser, settings } = useApp();
  const navigate = useNavigate();

  const user = users.find((u) => u.id === userId);

  const signatureUrl = settings.signatureUrl || "";
  const sealUrl = settings.sealUrl || "";
  const authorityName = settings.authorityName || "Director";
  const authorityDesignation =
    settings.authorityDesignation || "DMVV Bhartiy Mahila Shakti Foundation™";

  // Profile form
  const [profileForm, setProfileForm] = useState<Partial<User>>({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Design selections
  const [idCardDesign, setIdCardDesign] = useState("design1");
  const [certDesign, setCertDesign] = useState("cert1");
  const [achieveCertDesign, setAchieveCertDesign] = useState("cert3");

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

  const _currentForm = { ...user, ...profileForm };

  const handleProfileChange = (field: keyof User, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsSavingProfile(true);
    updateUser(user.id, profileForm);
    if (photoPreview) updateUser(user.id, { photoUrl: photoPreview });
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
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddCert = () => {
    if (!certForm.title.trim()) {
      toast.error("Certificate title is required.");
      return;
    }
    const newCert: AchievementCert = { id: `cert_${Date.now()}`, ...certForm };
    updateUser(user.id, {
      achievementCerts: [...(user.achievementCerts || []), newCert],
    });
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
    updateUser(user.id, {
      promotions: [...(user.promotions || []), newPromo],
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

  // shared PDF/Print action buttons
  const CardActions = ({
    printId,
    pdfFilename,
  }: { printId: string; pdfFilename: string }) => (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => printElement(printId)}
        className="border-green-400 text-green-700 hover:bg-green-50"
        data-ocid="profile.button"
      >
        <Printer size={14} className="mr-1.5" /> Print
      </Button>
      <Button
        size="sm"
        onClick={() => downloadAsPDF(printId, pdfFilename)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
        data-ocid="profile.button"
      >
        <Download size={14} className="mr-1.5" /> Download PDF
      </Button>
    </div>
  );

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
        <h1 className="text-xl font-extrabold text-gray-900">
          {user.fullName}
        </h1>
        <Badge variant="outline" className="text-xs capitalize">
          {user.role}
        </Badge>
        {user.isVerified && (
          <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
            <CheckCircle size={11} className="mr-1" /> Verified
          </Badge>
        )}
      </div>

      {/* Settings note if no signature/seal */}
      {(!signatureUrl || !sealUrl) && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
          💡 Tip: Go to <strong>Settings</strong> to upload{" "}
          <strong>Authority Signature</strong> and{" "}
          <strong>Official Seal</strong> — they will be auto-attached to ID
          Cards and Certificates.
        </div>
      )}

      <Tabs defaultValue="profile">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="profile" data-ocid="profile.tab">
            <UserIcon size={14} className="mr-1.5" /> Profile
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

        {/* ── Profile Tab ── */}
        <TabsContent value="profile">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <UserIcon size={16} className="text-green-600" /> Full Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Photo */}
                <div className="md:col-span-2 flex items-center gap-4">
                  <div className="h-20 w-16 bg-green-50 rounded-xl border-2 border-green-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {photoPreview || user.photoUrl ? (
                      <img
                        src={photoPreview || user.photoUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserIcon size={28} className="text-green-300" />
                    )}
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => photoInputRef.current?.click()}
                      className="border-green-400 text-green-700 hover:bg-green-50"
                      data-ocid="profile.button"
                    >
                      Upload Photo
                    </Button>
                    <input
                      ref={photoInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>

                {[
                  { label: "Full Name", field: "fullName" as keyof User },
                  { label: "Father's Name", field: "fatherName" as keyof User },
                  { label: "Mobile", field: "mobile" as keyof User },
                  { label: "Date of Birth", field: "dob" as keyof User },
                  { label: "Member ID", field: "memberId" as keyof User },
                  { label: "Address", field: "address" as keyof User },
                  { label: "District", field: "district" as keyof User },
                  { label: "State", field: "state" as keyof User },
                  { label: "Pincode", field: "pincode" as keyof User },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <Label className="text-xs text-gray-500 mb-1">
                      {label}
                    </Label>
                    <Input
                      value={
                        (profileForm[field] as string) ??
                        ((user[field] as string) || "")
                      }
                      onChange={(e) =>
                        handleProfileChange(field, e.target.value)
                      }
                      className="h-9 text-sm"
                      data-ocid="profile.input"
                    />
                  </div>
                ))}

                <div>
                  <Label className="text-xs text-gray-500 mb-1">Role</Label>
                  <Select
                    value={(profileForm.role as string) || user.role}
                    onValueChange={(v) => handleProfileChange("role", v)}
                  >
                    <SelectTrigger
                      className="h-9 text-sm"
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
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                className="mt-6 bg-ngo-green text-white hover:bg-ngo-green-dark"
                data-ocid="profile.button"
              >
                {isSavingProfile ? "Saving..." : "Save Profile"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── ID Card Tab ── */}
        <TabsContent value="idcard">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard size={16} className="text-green-600" /> PVC ID
                  Card
                </CardTitle>
                <CardActions
                  printId={`id-card-print-${idCardDesign}`}
                  pdfFilename={`IDCard_${user.fullName}.pdf`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="text-xs text-gray-500 mb-2 block">
                  Design Template Chunein:
                </Label>
                <DesignSelector
                  designs={ID_CARD_DESIGNS}
                  selected={idCardDesign}
                  onSelect={setIdCardDesign}
                />
              </div>
              <div
                className="bg-gray-100 rounded-xl p-6 flex items-center justify-center"
                style={{ minHeight: "240px" }}
              >
                <IDCardContent
                  user={{
                    ...user,
                    ...(photoPreview ? { photoUrl: photoPreview } : {}),
                  }}
                  design={idCardDesign}
                  signatureUrl={signatureUrl}
                  sealUrl={sealUrl}
                  authorityName={authorityName}
                  authorityDesignation={authorityDesignation}
                />
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                CR80 standard PVC card size (85.6mm × 54mm). Download PDF or
                Print.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Membership Certificate Tab ── */}
        <TabsContent value="membership">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <ScrollText size={16} className="text-green-600" /> Membership
                  Certificate
                </CardTitle>
                <CardActions
                  printId={`membership-cert-print-${certDesign}`}
                  pdfFilename={`MembershipCert_${user.fullName}.pdf`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="text-xs text-gray-500 mb-2 block">
                  Certificate Design Chunein:
                </Label>
                <DesignSelector
                  designs={CERT_DESIGNS}
                  selected={certDesign}
                  onSelect={setCertDesign}
                />
              </div>
              <div className="bg-gray-50 rounded-xl p-6 overflow-x-auto">
                <MembershipCertContent
                  user={{
                    ...user,
                    ...(photoPreview ? { photoUrl: photoPreview } : {}),
                  }}
                  design={certDesign}
                  signatureUrl={signatureUrl}
                  sealUrl={sealUrl}
                  authorityName={authorityName}
                  authorityDesignation={authorityDesignation}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Achievements Tab ── */}
        <TabsContent value="achievements">
          <div className="space-y-6">
            {/* Add form */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" /> Achievement
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Existing certs */}
                {(user.achievementCerts || []).length > 0 ? (
                  <div className="mb-6 space-y-3">
                    {(user.achievementCerts || []).map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between border border-yellow-100 bg-yellow-50 rounded-xl px-4 py-3"
                      >
                        <div>
                          <div className="font-semibold text-sm text-gray-800">
                            {cert.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryBadgeColors[cert.category] || "bg-gray-100 text-gray-600"}`}
                            >
                              {cert.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {cert.issuedDate}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowCertPrint(cert)}
                          className="border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                          data-ocid="profile.button"
                        >
                          <FileText size={13} className="mr-1" /> View / Print
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mb-4">
                    No achievement certificates yet.
                  </p>
                )}

                {/* Add form */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Add New Certificate
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">
                        Certificate Title *
                      </Label>
                      <Input
                        value={certForm.title}
                        onChange={(e) =>
                          setCertForm((p) => ({ ...p, title: e.target.value }))
                        }
                        placeholder="e.g. Best Performer 2025"
                        className="mt-1 h-9 text-sm"
                        data-ocid="profile.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Category</Label>
                      <Select
                        value={certForm.category}
                        onValueChange={(v) =>
                          setCertForm((p) => ({ ...p, category: v }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1 h-9 text-sm"
                          data-ocid="profile.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Excellence",
                            "Leadership",
                            "Service",
                            "Innovation",
                          ].map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-xs text-gray-500">
                        Description
                      </Label>
                      <Textarea
                        value={certForm.description}
                        onChange={(e) =>
                          setCertForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Achievement ka short description..."
                        rows={2}
                        className="mt-1 text-sm"
                        data-ocid="profile.textarea"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        Awarded By
                      </Label>
                      <Input
                        value={certForm.awardedBy}
                        onChange={(e) =>
                          setCertForm((p) => ({
                            ...p,
                            awardedBy: e.target.value,
                          }))
                        }
                        className="mt-1 h-9 text-sm"
                        data-ocid="profile.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        Issue Date
                      </Label>
                      <Input
                        type="date"
                        value={certForm.issuedDate}
                        onChange={(e) =>
                          setCertForm((p) => ({
                            ...p,
                            issuedDate: e.target.value,
                          }))
                        }
                        className="mt-1 h-9 text-sm"
                        data-ocid="profile.input"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddCert}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white"
                    data-ocid="profile.button"
                  >
                    <Award size={14} className="mr-1.5" /> Save Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Cert Preview Dialog */}
          <Dialog
            open={!!showCertPrint}
            onOpenChange={() => setShowCertPrint(null)}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <DialogTitle>Achievement Certificate</DialogTitle>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs text-gray-500">Design:</Label>
                      <DesignSelector
                        designs={CERT_DESIGNS}
                        selected={achieveCertDesign}
                        onSelect={setAchieveCertDesign}
                      />
                    </div>
                  </div>
                </div>
              </DialogHeader>
              {showCertPrint && (
                <>
                  <div className="flex gap-2 mb-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => printElement("achievement-cert-print")}
                      className="border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                    >
                      <Printer size={14} className="mr-1.5" /> Print
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        downloadAsPDF(
                          "achievement-cert-print",
                          `AchievementCert_${user.fullName}.pdf`,
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Download size={14} className="mr-1.5" /> Download PDF
                    </Button>
                  </div>
                  <div className="overflow-auto max-h-[65vh] bg-gray-50 rounded-xl p-4">
                    <AchievementCertContent
                      cert={showCertPrint}
                      userName={user.fullName}
                      design={achieveCertDesign}
                      signatureUrl={signatureUrl}
                      sealUrl={sealUrl}
                      authorityName={authorityName}
                      authorityDesignation={authorityDesignation}
                    />
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* ── Promotions Tab ── */}
        <TabsContent value="promotions">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" /> Promotion
                  History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(user.promotions || []).length > 0 ? (
                  <div className="mb-6 space-y-3">
                    {(user.promotions || []).map((promo) => (
                      <div
                        key={promo.id}
                        className="flex items-center justify-between border border-green-100 bg-green-50 rounded-xl px-4 py-3"
                      >
                        <div>
                          <div className="font-semibold text-sm text-gray-800 capitalize">
                            {promo.fromRole} → {promo.toRole}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {promo.promotionDate} &nbsp;·&nbsp; {promo.reason}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowPromoLetter(promo)}
                          className="border-green-400 text-green-700 hover:bg-green-50"
                          data-ocid="profile.button"
                        >
                          <FileText size={13} className="mr-1" /> View Letter
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mb-4">
                    No promotion records yet.
                  </p>
                )}

                {/* Add promotion form */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Add New Promotion
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">From Role</Label>
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
                          className="mt-1 h-9 text-sm"
                          data-ocid="profile.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((r) => (
                            <SelectItem
                              key={r}
                              value={r}
                              className="capitalize"
                            >
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        To Role (Promote To)
                      </Label>
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
                          className="mt-1 h-9 text-sm"
                          data-ocid="profile.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((r) => (
                            <SelectItem
                              key={r}
                              value={r}
                              className="capitalize"
                            >
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        Promotion Date
                      </Label>
                      <Input
                        type="date"
                        value={promoForm.promotionDate}
                        onChange={(e) =>
                          setPromoForm((p) => ({
                            ...p,
                            promotionDate: e.target.value,
                          }))
                        }
                        className="mt-1 h-9 text-sm"
                        data-ocid="profile.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        Reason / Remarks *
                      </Label>
                      <Input
                        value={promoForm.reason}
                        onChange={(e) =>
                          setPromoForm((p) => ({
                            ...p,
                            reason: e.target.value,
                          }))
                        }
                        placeholder="Outstanding performance..."
                        className="mt-1 h-9 text-sm"
                        data-ocid="profile.input"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddPromotion}
                    className="mt-4 bg-ngo-green text-white hover:bg-ngo-green-dark"
                    data-ocid="profile.button"
                  >
                    <TrendingUp size={14} className="mr-1.5" /> Add Promotion
                    &amp; Generate Letter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Promotion Letter Dialog */}
          <Dialog
            open={!!showPromoLetter}
            onOpenChange={() => setShowPromoLetter(null)}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <DialogTitle>Promotion Letter</DialogTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => printElement("promotion-letter-print")}
                      className="border-green-400 text-green-700 hover:bg-green-50"
                    >
                      <Printer size={14} className="mr-1.5" /> Print
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        downloadAsPDF(
                          "promotion-letter-print",
                          `PromotionLetter_${user.fullName}.pdf`,
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Download size={14} className="mr-1.5" /> Download PDF
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              {showPromoLetter && (
                <div className="overflow-auto max-h-[65vh] bg-gray-50 rounded-xl p-4">
                  <PromotionLetterContent
                    promo={showPromoLetter}
                    user={user}
                    signatureUrl={signatureUrl}
                    sealUrl={sealUrl}
                    authorityName={authorityName}
                    authorityDesignation={authorityDesignation}
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
