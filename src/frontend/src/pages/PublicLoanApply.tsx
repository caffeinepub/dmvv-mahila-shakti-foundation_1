import LogoImage from "@/components/LogoImage";
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
import { type LoanApplication, useApp } from "@/context/AppContext";
import { CheckCircle, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PublicLoanApply() {
  const { addLoanApplication } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    district: "",
    state: "",
    loanType: "general" as "general" | "shg" | "udhyog",
    amount: "",
    purpose: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    guarantorName: "",
    guarantorPhone: "",
    // SHG fields
    shgName: "",
    shgMembersCount: "",
    // Udhyog fields
    businessName: "",
    businessType: "",
    gstNumber: "",
  });

  const set = (field: string, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.mobile ||
      !form.amount ||
      !form.purpose ||
      !form.bankName ||
      !form.accountNumber
    ) {
      toast.error(
        "Zaroori fields bhar karein (naam, mobile, amount, purpose, bank details).",
      );
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const refId = `LA-${Date.now().toString().slice(-6)}`;
      const application: LoanApplication = {
        id: `la_${Date.now()}`,
        userId: "public",
        userName: form.fullName,
        userMobile: form.mobile,
        loanType: form.loanType,
        amount: form.amount,
        purpose: form.purpose,
        bankName: form.bankName,
        accountNumber: form.accountNumber,
        ifscCode: form.ifscCode,
        guarantorName: form.guarantorName,
        guarantorPhone: form.guarantorPhone,
        shgName: form.shgName || undefined,
        shgMembersCount: form.shgMembersCount || undefined,
        businessName: form.businessName || undefined,
        businessType: form.businessType || undefined,
        gstNumber: form.gstNumber || undefined,
        status: "pending",
        appliedAt: new Date().toLocaleDateString("en-IN"),
      };
      addLoanApplication(application);
      setSubmittedRef(refId);
      setSubmitted(true);
      setLoading(false);
      toast.success("Loan application submit ho gayi!");
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardContent className="p-8 text-center">
            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Application Submit Ho Gayi!
            </h2>
            <p className="text-gray-600 mb-4">
              Aapki loan application safaltapoorvak submit ho gayi hai. Hamari
              team jald hi aapse sampark karegi.
            </p>
            <Badge className="bg-green-100 text-green-800 text-base px-4 py-1">
              Reference No: {submittedRef}
            </Badge>
            <p className="text-sm text-gray-400 mt-4">
              Yeh reference number save karein. Admin se status jaanne ke liye
              sampark mein rahein.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <LogoImage className="h-14 mx-auto mb-2" alt="DMVV Logo" />
          <Badge className="bg-ngo-green text-white mb-2">
            <FileText size={13} className="mr-1" /> Loan Application Form
          </Badge>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Loan Ke Liye Avedan Karein
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            DMVV Bhartiy Mahila Shakti Foundation — Loan Apply
          </p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="public_loan_apply.form"
            >
              {/* Personal Info */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-1">
                  व्यक्तिगत जानकारी
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>पूरा नाम *</Label>
                    <Input
                      value={form.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                      placeholder="Apna poora naam"
                      className="mt-1"
                      data-ocid="public_loan_apply.name_input"
                    />
                  </div>
                  <div>
                    <Label>मोबाइल नंबर *</Label>
                    <Input
                      value={form.mobile}
                      onChange={(e) => set("mobile", e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="mt-1"
                      data-ocid="public_loan_apply.mobile_input"
                    />
                  </div>
                  <div>
                    <Label>Email (Optional)</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="Email address"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>जिला / District</Label>
                    <Input
                      value={form.district}
                      onChange={(e) => set("district", e.target.value)}
                      placeholder="District"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>पता / Address</Label>
                    <Textarea
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      placeholder="Poora pata"
                      className="mt-1 h-16"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Info */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-1">
                  Loan जानकारी
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Loan का प्रकार *</Label>
                    <Select
                      value={form.loanType}
                      onValueChange={(v) =>
                        set("loanType", v as "general" | "shg" | "udhyog")
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="public_loan_apply.loan_type_select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Loan</SelectItem>
                        <SelectItem value="shg">
                          SHG Loan (स्वयं सहायता समूह)
                        </SelectItem>
                        <SelectItem value="udhyog">
                          Udhyog Loan (उद्योग)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Loan Amount (₹) *</Label>
                    <Input
                      type="number"
                      value={form.amount}
                      onChange={(e) => set("amount", e.target.value)}
                      placeholder="Kitna loan chahiye"
                      className="mt-1"
                      data-ocid="public_loan_apply.amount_input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Loan का उद्देश्य / Purpose *</Label>
                    <Textarea
                      value={form.purpose}
                      onChange={(e) => set("purpose", e.target.value)}
                      placeholder="Loan kis kaam ke liye chahiye?"
                      className="mt-1 h-16"
                      data-ocid="public_loan_apply.purpose_input"
                    />
                  </div>
                </div>
              </div>

              {/* SHG fields */}
              {form.loanType === "shg" && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-1">
                    SHG जानकारी
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>SHG का नाम</Label>
                      <Input
                        value={form.shgName}
                        onChange={(e) => set("shgName", e.target.value)}
                        placeholder="SHG naam"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>सदस्य संख्या</Label>
                      <Input
                        type="number"
                        value={form.shgMembersCount}
                        onChange={(e) => set("shgMembersCount", e.target.value)}
                        placeholder="Kitne members"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Udhyog fields */}
              {form.loanType === "udhyog" && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-1">
                    व्यवसाय जानकारी
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Business / Udyog ka Naam</Label>
                      <Input
                        value={form.businessName}
                        onChange={(e) => set("businessName", e.target.value)}
                        placeholder="Business naam"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Business Type</Label>
                      <Input
                        value={form.businessType}
                        onChange={(e) => set("businessType", e.target.value)}
                        placeholder="Manufacturing, Service, etc."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>GST Number (if any)</Label>
                      <Input
                        value={form.gstNumber}
                        onChange={(e) => set("gstNumber", e.target.value)}
                        placeholder="GST Number"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Details */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-1">
                  Bank जानकारी
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Bank का नाम *</Label>
                    <Input
                      value={form.bankName}
                      onChange={(e) => set("bankName", e.target.value)}
                      placeholder="Bank naam"
                      className="mt-1"
                      data-ocid="public_loan_apply.bank_name_input"
                    />
                  </div>
                  <div>
                    <Label>Account Number *</Label>
                    <Input
                      value={form.accountNumber}
                      onChange={(e) => set("accountNumber", e.target.value)}
                      placeholder="Account number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>IFSC Code</Label>
                    <Input
                      value={form.ifscCode}
                      onChange={(e) =>
                        set("ifscCode", e.target.value.toUpperCase())
                      }
                      placeholder="IFSC Code"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Guarantor */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-1">
                  Guarantor जानकारी
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Guarantor का नाम</Label>
                    <Input
                      value={form.guarantorName}
                      onChange={(e) => set("guarantorName", e.target.value)}
                      placeholder="Guarantor naam"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Guarantor Mobile</Label>
                    <Input
                      value={form.guarantorPhone}
                      onChange={(e) => set("guarantorPhone", e.target.value)}
                      placeholder="Guarantor phone"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-ngo-green text-white hover:bg-green-700 text-base py-3"
                disabled={loading}
                data-ocid="public_loan_apply.submit_button"
              >
                {loading
                  ? "Submit ho raha hai..."
                  : "Loan Application Submit Karein"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
