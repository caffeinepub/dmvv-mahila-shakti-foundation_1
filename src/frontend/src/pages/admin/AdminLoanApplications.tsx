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
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { Copy, ExternalLink, Link } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLoanApplications() {
  const { loanApplications, updateLoanApplication } = useApp();
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [remark, setRemark] = useState("");

  const loanApplyUrl = `${window.location.origin}/loan-apply`;

  const handleCopyLoanLink = () => {
    navigator.clipboard.writeText(loanApplyUrl);
    toast.success("Link copied!");
  };

  const filtered = loanApplications.filter((a) => {
    const typeMatch = typeFilter === "all" || a.loanType === typeFilter;
    const statusMatch = statusFilter === "all" || a.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const statusColor = (s: string) => {
    if (s === "approved") return "bg-green-100 text-green-700";
    if (s === "rejected") return "bg-red-100 text-red-700";
    if (s === "under_review") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const handleAction = (
    id: string,
    status: "approved" | "rejected" | "under_review",
  ) => {
    updateLoanApplication(id, { status, adminRemark: remark || undefined });
    toast.success(`Application ${status} kar di gayi!`);
    setExpandedId(null);
    setRemark("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Loan Applications
      </h1>

      {/* ── Shareable Loan Apply Link Box ── */}
      <div
        className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
        data-ocid="admin_loan_apps.panel"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600">
            <Link size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-green-800 text-sm">
              Share Loan Apply Link / लोन अप्लाई लिंक शेयर करें
            </h3>
            <p className="text-xs text-green-700">
              Is link ko share karein — jo bhi loan apply karega uski poori
              details yahan dikhegi
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Input
            readOnly
            value={loanApplyUrl}
            className="bg-white border-green-300 text-gray-700 text-sm flex-1 font-mono"
            data-ocid="admin_loan_apps.input"
          />
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white gap-1.5 shrink-0"
            onClick={handleCopyLoanLink}
            data-ocid="admin_loan_apps.primary_button"
          >
            <Copy size={14} />
            Copy Link
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-green-400 text-green-700 hover:bg-green-50 gap-1.5 shrink-0"
            onClick={() => window.open(loanApplyUrl, "_blank")}
            data-ocid="admin_loan_apps.secondary_button"
          >
            <ExternalLink size={14} />
            Open
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div>
          <Label className="text-xs">Type</Label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger
              className="w-36 mt-1"
              data-ocid="admin_loan_apps.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="shg">SHG</SelectItem>
              <SelectItem value="udhyog">Udhyog</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="w-40 mt-1"
              data-ocid="admin_loan_apps.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="text-center py-16 text-gray-400"
          data-ocid="admin_loan_apps.empty_state"
        >
          Koi application nahi hai.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a, i) => (
            <Card key={a.id} data-ocid={`admin_loan_apps.item.${i + 1}`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-800">
                        {a.userName}
                      </span>
                      <Badge
                        className={`capitalize ${a.loanType === "shg" ? "bg-blue-100 text-blue-700" : a.loanType === "udhyog" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"}`}
                      >
                        {a.loanType}
                      </Badge>
                      <Badge className={`capitalize ${statusColor(a.status)}`}>
                        {a.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {a.userMobile} | Applied: {a.appliedAt}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Amount:</span>{" "}
                      <span className="font-bold text-green-700">
                        ₹{Number(a.amount).toLocaleString()}
                      </span>{" "}
                      | <span className="text-gray-400">Purpose:</span>{" "}
                      {a.purpose}
                    </div>
                    {a.adminRemark && (
                      <div className="text-xs text-blue-600 mt-1">
                        Remark: {a.adminRemark}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setExpandedId(expandedId === a.id ? null : a.id)
                      }
                      data-ocid={`admin_loan_apps.edit_button.${i + 1}`}
                    >
                      {expandedId === a.id ? "Close" : "Details"}
                    </Button>
                  </div>
                </div>

                {expandedId === a.id && (
                  <div className="mt-4 border-t pt-4 space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      {(
                        [
                          ["Bank Name", a.bankName],
                          ["Account No.", a.accountNumber],
                          ["IFSC", a.ifscCode],
                          ["Guarantor", a.guarantorName],
                          ["Guarantor Ph.", a.guarantorPhone],
                          ...(a.shgName
                            ? [
                                ["SHG Name", a.shgName],
                                ["SHG Members", a.shgMembersCount || ""],
                              ]
                            : []),
                          ...(a.businessName
                            ? [
                                ["Business", a.businessName],
                                ["Biz Type", a.businessType || ""],
                              ]
                            : []),
                          ...(a.gstNumber ? [["GST", a.gstNumber]] : []),
                        ] as [string, string][]
                      ).map(([k, v]) =>
                        v ? (
                          <div key={k}>
                            <span className="text-gray-400 text-xs">{k}: </span>
                            <span className="font-medium">{v}</span>
                          </div>
                        ) : null,
                      )}
                    </div>
                    <div>
                      <Label className="text-xs">Admin Remark</Label>
                      <Textarea
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        placeholder="Remark ya reason likhein..."
                        className="mt-1 h-20"
                        data-ocid="admin_loan_apps.textarea"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 text-white"
                        onClick={() => handleAction(a.id, "approved")}
                        data-ocid={`admin_loan_apps.confirm_button.${i + 1}`}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white"
                        onClick={() => handleAction(a.id, "under_review")}
                        data-ocid={`admin_loan_apps.secondary_button.${i + 1}`}
                      >
                        Under Review
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(a.id, "rejected")}
                        data-ocid={`admin_loan_apps.delete_button.${i + 1}`}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
