import type { LetterheadConfig, OfficialLetter } from "@/context/AppContext";

interface LetterheadDocumentProps {
  config: LetterheadConfig;
  letter: OfficialLetter;
  printMode?: boolean;
}

export default function LetterheadDocument({
  config,
  letter,
  printMode = false,
}: LetterheadDocumentProps) {
  const d = config.designId;

  const containerStyle: React.CSSProperties = printMode
    ? {
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#fff",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
      }
    : {
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#fff",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
        borderRadius: "4px",
      };

  // ─── Design header renderers ───────────────────────────────────────
  function renderHeader() {
    if (d === 1) {
      // Classic Green
      return (
        <div>
          <div
            style={{ height: "8px", background: "#16a34a", width: "100%" }}
          />
          <div
            style={{
              background: "#166534",
              padding: "20px 32px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {config.logoUrl && (
              <img
                src={config.logoUrl}
                alt="Logo"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            )}
            <div>
              <div
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                }}
              >
                {config.orgName}
              </div>
              <div
                style={{ color: "#bbf7d0", fontSize: "12px", marginTop: "2px" }}
              >
                {config.tagline}
              </div>
            </div>
          </div>
          <div
            style={{
              background: "#f0fdf4",
              padding: "8px 32px",
              fontSize: "11px",
              color: "#374151",
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              borderBottom: "1px solid #d1fae5",
            }}
          >
            {config.address && <span>📍 {config.address}</span>}
            {config.contactNumber && <span>📞 {config.contactNumber}</span>}
            {config.email && <span>✉ {config.email}</span>}
            {config.website && <span>🌐 {config.website}</span>}
          </div>
        </div>
      );
    }

    if (d === 2) {
      // Premium Gold
      return (
        <div>
          <div
            style={{
              background:
                "linear-gradient(135deg, #78350f 0%, #d97706 50%, #92400e 100%)",
              padding: "24px 32px",
              textAlign: "center",
            }}
          >
            {config.logoUrl && (
              <img
                src={config.logoUrl}
                alt="Logo"
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto 10px",
                }}
              />
            )}
            <div
              style={{
                color: "#fef3c7",
                fontSize: "20px",
                fontWeight: "800",
                letterSpacing: "1px",
              }}
            >
              {config.orgName}
            </div>
            <div
              style={{ color: "#fde68a", fontSize: "12px", marginTop: "4px" }}
            >
              {config.tagline}
            </div>
          </div>
          <div style={{ height: "3px", background: "#d97706" }} />
          <div
            style={{ height: "1px", background: "#fbbf24", margin: "2px 0" }}
          />
          <div
            style={{
              background: "#fffbeb",
              padding: "8px 32px",
              fontSize: "11px",
              color: "#78350f",
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              borderBottom: "2px solid #d97706",
            }}
          >
            {config.address && <span>{config.address}</span>}
            {config.contactNumber && <span>Ph: {config.contactNumber}</span>}
            {config.email && <span>{config.email}</span>}
          </div>
        </div>
      );
    }

    if (d === 3) {
      // Minimal Modern
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px 32px",
            borderLeft: "5px solid #16a34a",
            borderBottom: "1px solid #e5e7eb",
            gap: "14px",
          }}
        >
          {config.logoUrl && (
            <img
              src={config.logoUrl}
              alt="Logo"
              style={{
                width: "56px",
                height: "56px",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          )}
          <div>
            <div
              style={{ fontSize: "17px", fontWeight: "700", color: "#111827" }}
            >
              {config.orgName}
            </div>
            <div
              style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}
            >
              {config.tagline}
            </div>
            <div
              style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px" }}
            >
              {[config.address, config.contactNumber, config.email]
                .filter(Boolean)
                .join(" | ")}
            </div>
          </div>
        </div>
      );
    }

    if (d === 4) {
      // Government Style
      return (
        <div style={{ border: "2px solid #374151" }}>
          <div style={{ border: "4px solid #374151", margin: "3px" }}>
            <div
              style={{
                padding: "20px 32px",
                textAlign: "center",
                borderBottom: "2px solid #374151",
              }}
            >
              {config.logoUrl && (
                <img
                  src={config.logoUrl}
                  alt="Logo"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto 10px",
                  }}
                />
              )}
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#111827",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {config.orgName}
              </div>
              <div
                style={{ fontSize: "12px", color: "#374151", marginTop: "4px" }}
              >
                {config.tagline}
              </div>
            </div>
            <div
              style={{
                padding: "8px 32px",
                textAlign: "center",
                fontSize: "11px",
                color: "#374151",
                borderBottom: "2px solid #374151",
              }}
            >
              {[config.address, config.contactNumber, config.email]
                .filter(Boolean)
                .join(" | ")}
            </div>
          </div>
        </div>
      );
    }

    if (d === 5) {
      // Blue Corporate
      return (
        <div>
          <div
            style={{
              background: "#1e3a5f",
              padding: "20px 32px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {config.logoUrl && (
                <img
                  src={config.logoUrl}
                  alt="Logo"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                <div
                  style={{ color: "#fff", fontSize: "17px", fontWeight: "700" }}
                >
                  {config.orgName}
                </div>
                <div
                  style={{
                    color: "#93c5fd",
                    fontSize: "11px",
                    marginTop: "2px",
                  }}
                >
                  {config.tagline}
                </div>
              </div>
            </div>
            <div
              style={{ textAlign: "right", color: "#bfdbfe", fontSize: "10px" }}
            >
              {config.contactNumber && <div>{config.contactNumber}</div>}
              {config.email && <div>{config.email}</div>}
              {config.website && <div>{config.website}</div>}
            </div>
          </div>
          <div style={{ background: "#3b82f6", height: "4px" }} />
          <div
            style={{
              background: "#eff6ff",
              padding: "6px 32px",
              fontSize: "11px",
              color: "#1e3a5f",
              borderBottom: "1px solid #bfdbfe",
            }}
          >
            {config.address}
          </div>
        </div>
      );
    }

    if (d === 6) {
      // Red & White Formal
      return (
        <div>
          <div
            style={{
              background: "#dc2626",
              padding: "20px 32px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {config.logoUrl && (
              <img
                src={config.logoUrl}
                alt="Logo"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            )}
            <div>
              <div
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                }}
              >
                {config.orgName}
              </div>
              <div
                style={{ color: "#fca5a5", fontSize: "11px", marginTop: "2px" }}
              >
                {config.tagline}
              </div>
            </div>
          </div>
          <div style={{ height: "3px", background: "#b91c1c" }} />
          <div
            style={{
              padding: "8px 32px",
              fontSize: "11px",
              color: "#dc2626",
              background: "#fff5f5",
              borderBottom: "1px solid #fca5a5",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {config.address && <span>{config.address}</span>}
            {config.contactNumber && <span>Tel: {config.contactNumber}</span>}
            {config.email && <span>{config.email}</span>}
          </div>
        </div>
      );
    }

    if (d === 7) {
      // Tri-Color Indian
      return (
        <div>
          <div style={{ display: "flex", height: "12px" }}>
            <div style={{ flex: 1, background: "#FF9933" }} />
            <div
              style={{
                flex: 1,
                background: "#fff",
                border: "1px solid #e5e7eb",
              }}
            />
            <div style={{ flex: 1, background: "#138808" }} />
          </div>
          <div
            style={{
              padding: "20px 32px",
              textAlign: "center",
              borderBottom: "2px solid #138808",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              {config.logoUrl && (
                <img
                  src={config.logoUrl}
                  alt="Logo"
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "contain",
                  }}
                />
              )}
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  {config.orgName}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    marginTop: "2px",
                  }}
                >
                  {config.tagline}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "10px",
                paddingTop: "8px",
                borderTop: "1px dashed #d1d5db",
                fontSize: "10px",
                color: "#374151",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {config.address && <span>{config.address}</span>}
              {config.contactNumber && <span>{config.contactNumber}</span>}
              {config.email && <span>{config.email}</span>}
            </div>
          </div>
          <div style={{ display: "flex", height: "4px" }}>
            <div style={{ flex: 1, background: "#FF9933" }} />
            <div
              style={{
                flex: 1,
                background: "#fff",
                border: "1px solid #e5e7eb",
              }}
            />
            <div style={{ flex: 1, background: "#138808" }} />
          </div>
        </div>
      );
    }

    if (d === 8) {
      // Dark Green Elegant
      return (
        <div>
          <div
            style={{
              background: "#1a4a2e",
              padding: "22px 32px",
              display: "flex",
              alignItems: "center",
              gap: "18px",
              borderBottom: "3px solid #c6a034",
            }}
          >
            {config.logoUrl && (
              <img
                src={config.logoUrl}
                alt="Logo"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#c6a034",
                  fontSize: "16px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {config.orgName}
              </div>
              <div
                style={{ color: "#86efac", fontSize: "11px", marginTop: "3px" }}
              >
                {config.tagline}
              </div>
            </div>
            <div
              style={{ color: "#a7f3d0", fontSize: "10px", textAlign: "right" }}
            >
              {config.contactNumber && <div>{config.contactNumber}</div>}
              {config.email && <div>{config.email}</div>}
            </div>
          </div>
          <div
            style={{
              background: "#f0fdf4",
              padding: "6px 32px",
              fontSize: "11px",
              color: "#1a4a2e",
              borderBottom: "1px solid #c6a034",
            }}
          >
            {config.address}
          </div>
        </div>
      );
    }

    if (d === 9) {
      // Purple Gradient
      return (
        <div>
          <div
            style={{
              background: "linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)",
              padding: "22px 32px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 4px 12px rgba(109,40,217,0.3)",
            }}
          >
            {config.logoUrl && (
              <img
                src={config.logoUrl}
                alt="Logo"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  padding: "4px",
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "#fff", fontSize: "18px", fontWeight: "700" }}
              >
                {config.orgName}
              </div>
              <div
                style={{ color: "#c4b5fd", fontSize: "11px", marginTop: "2px" }}
              >
                {config.tagline}
              </div>
              <div
                style={{ color: "#e9d5ff", fontSize: "10px", marginTop: "6px" }}
              >
                {[config.address, config.contactNumber, config.email]
                  .filter(Boolean)
                  .join(" • ")}
              </div>
            </div>
          </div>
          <div
            style={{
              height: "4px",
              background: "linear-gradient(90deg, #7c3aed, #4f46e5, #7c3aed)",
            }}
          />
        </div>
      );
    }

    // d === 10: Newspaper/Print
    return (
      <div>
        <div
          style={{
            borderTop: "5px solid #111827",
            borderBottom: "5px solid #111827",
            padding: "16px 32px",
          }}
        >
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {config.logoUrl && (
              <img
                src={config.logoUrl}
                alt="Logo"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  flexShrink: 0,
                  borderRight: "2px solid #374151",
                  paddingRight: "16px",
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "900",
                  color: "#111827",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "Georgia, serif",
                }}
              >
                {config.orgName}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#374151",
                  marginTop: "4px",
                  fontStyle: "italic",
                  fontFamily: "Georgia, serif",
                }}
              >
                {config.tagline}
              </div>
            </div>
            <div
              style={{ textAlign: "right", fontSize: "10px", color: "#374151" }}
            >
              {config.address && <div>{config.address}</div>}
              {config.contactNumber && <div>Tel: {config.contactNumber}</div>}
              {config.email && <div>{config.email}</div>}
              {config.website && <div>{config.website}</div>}
            </div>
          </div>
        </div>
        <div
          style={{ height: "2px", background: "#111827", marginTop: "2px" }}
        />
      </div>
    );
  }

  function getAccentColor() {
    const colors: Record<number, string> = {
      1: "#16a34a",
      2: "#d97706",
      3: "#16a34a",
      4: "#374151",
      5: "#1e3a5f",
      6: "#dc2626",
      7: "#138808",
      8: "#1a4a2e",
      9: "#6d28d9",
      10: "#111827",
    };
    return colors[d] || "#16a34a";
  }

  const accentColor = getAccentColor();

  return (
    <div id="letterhead-print-area" style={containerStyle}>
      {/* Header */}
      {renderHeader()}

      {/* Meta bar: Ref + Date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 32px",
          background: "#f9fafb",
          borderBottom: `1px solid ${accentColor}33`,
          fontSize: "11px",
          color: "#374151",
        }}
      >
        <span>
          <strong>Ref No.:</strong> {letter.referenceNumber || "—"}
        </span>
        <span>
          <strong>Date:</strong>{" "}
          {letter.date
            ? new Date(letter.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "—"}
        </span>
      </div>

      {/* Body content */}
      <div style={{ padding: "24px 32px", flex: 1 }}>
        {/* Addressee */}
        <div
          style={{ marginBottom: "20px", fontSize: "12px", color: "#374151" }}
        >
          <div style={{ fontWeight: "600", marginBottom: "2px" }}>To,</div>
          <div>{letter.issuedToName}</div>
          {letter.issuedToDesignation && (
            <div>{letter.issuedToDesignation}</div>
          )}
          {letter.issuedToAddress && (
            <div style={{ color: "#6b7280" }}>{letter.issuedToAddress}</div>
          )}
        </div>

        {/* Subject */}
        <div
          style={{
            fontWeight: "700",
            fontSize: "13px",
            marginBottom: "16px",
            color: "#111827",
            borderBottom: `2px solid ${accentColor}`,
            paddingBottom: "6px",
          }}
        >
          Subject: {letter.subject}
        </div>

        {/* Body */}
        <div
          style={{
            fontSize: "12px",
            lineHeight: "1.8",
            color: "#374151",
            whiteSpace: "pre-wrap",
            minHeight: "200px",
          }}
        >
          {letter.bodyContent}
        </div>
      </div>

      {/* Signature footer */}
      <div
        style={{
          padding: "16px 32px 24px",
          borderTop: `2px solid ${accentColor}33`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "#9ca3af",
            maxWidth: "360px",
            lineHeight: "1.5",
          }}
        >
          {config.footerNote}
        </div>
        <div style={{ textAlign: "center", position: "relative" }}>
          {config.sealUrl && (
            <img
              src={config.sealUrl}
              alt="Seal"
              style={{
                position: "absolute",
                right: "60px",
                bottom: "30px",
                width: "70px",
                height: "70px",
                objectFit: "contain",
                opacity: 0.45,
                borderRadius: "50%",
              }}
            />
          )}
          {(config.authoritySignatureUrl || letter.signatureUrl) && (
            <img
              src={letter.signatureUrl || config.authoritySignatureUrl}
              alt="Signature"
              style={{
                height: "50px",
                maxWidth: "160px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 4px",
              }}
            />
          )}
          <div
            style={{ fontSize: "12px", fontWeight: "600", color: "#111827" }}
          >
            {letter.issuedByName || config.signatoryName}
          </div>
          <div style={{ fontSize: "11px", color: "#6b7280" }}>
            {letter.issuedByDesignation || config.signatoryTitle}
          </div>
          <div
            style={{
              height: "1px",
              background: accentColor,
              width: "160px",
              margin: "6px auto 0",
            }}
          />
          <div
            style={{ fontSize: "10px", color: accentColor, marginTop: "2px" }}
          >
            Authorized Signatory
          </div>
        </div>
      </div>

      {/* DRAFT stamp */}
      {letter.status === "draft" && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-35deg)",
            fontSize: "72px",
            fontWeight: "900",
            color: "rgba(220,38,38,0.15)",
            letterSpacing: "8px",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          DRAFT
        </div>
      )}
    </div>
  );
}
