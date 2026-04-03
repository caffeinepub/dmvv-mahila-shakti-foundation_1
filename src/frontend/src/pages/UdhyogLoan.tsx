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
import { Briefcase, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function UdhyogLoan() {
  const { currentUser, addLoanApplication } = useApp();
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (
      !form.applicantName ||
      !form.mobile ||
      !form.businessName ||
      !form.loanAmount ||
      !form.bankName ||
      !form.accountNumber
    ) {
      toast.error("Kripya sare required fields bharein.");
      return;
    }
    setSubmitting(true);
    const app: LoanApplication = {
      id: `udh_${Date.now()}`,
      userId: currentUser?.id || "guest",
      userName: form.applicantName,
      userMobile: form.mobile,
      loanType: "udhyog",
      amount: form.loanAmount,
      purpose: form.purpose || "Business Expansion",
      bankName: form.bankName,
      accountNumber: form.accountNumber,
      ifscCode: form.ifscCode || "",
      guarantorName: "",
      guarantorPhone: "",
      businessName: form.businessName,
      businessType: form.businessType,
      gstNumber: form.gstNumber,
      businessDetails: form.businessDetails,
      status: "pending",
      appliedAt: new Date().toISOString().split("T")[0],
    };
    addLoanApplication(app);
    setSubmitted(true);
    setSubmitting(false);
    toast.success("🎉 Udhyog Loan application submit ho gayi!");
  };

  const F = ({
    label,
    k,
    placeholder,
    type = "text",
    required,
  }: {
    label: string;
    k: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
  }) => (
    <div>
      <Label className="text-xs">
        {label}
        {required && " *"}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={form[k] || ""}
        onChange={(e) => setForm((p) => ({ ...p, [k]: e.target.value }))}
        className="mt-1"
        data-ocid="udhyog_loan.input"
      />
    </div>
  );

  const businessCategories = [
    "Manufacturing",
    "Handicraft",
    "Food Processing",
    "Retail",
    "Service Sector",
    "Agriculture",
    "Textile",
    "IT/Digital",
    "Other",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[260px] flex items-center bg-gradient-to-br from-orange-700 to-amber-500">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
            <Briefcase size={16} /> Udhyog Loan
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Udhyog Loan Yojana
          </h1>
          <p className="text-orange-100 mt-3 max-w-2xl text-lg">
            Mahila udyamitaon ke liye vyavsayik loan. Apne sapno ka business
            shuru karein ya badhaein.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-600 py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {(
            [
              ["1,200+", "Businesses Funded"],
              ["₹8.5 Lakh", "Avg Loan Amount"],
              ["78%", "Business Success Rate"],
              ["7%", "Interest Rate p.a."],
            ] as [string, string][]
          ).map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-extrabold">{v}</div>
              <div className="text-orange-200 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* What is */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            Udhyog Loan Kya Hai?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Udhyog Loan ek vishesh vyavsayik loan yojana hai jo mahila
            udyamitaon ko apna vyavsay shuru karne ya badhaane ke liye praadan
            ki jaati hai. DMVV Foundation ke saath registered mahilayein is loan
            ke liye apply kar sakti hain aur apni aajivika behtar bana sakti
            hain.
          </p>
        </section>

        {/* Business categories */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Supported Business Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(
              [
                ["🧵", "Manufacturing"],
                ["🪡", "Handicraft"],
                ["🍱", "Food Processing"],
                ["🛍️", "Retail Business"],
                ["⚙️", "Service Sector"],
                ["🌾", "Agriculture"],
                ["👗", "Textile"],
                ["💻", "IT/Digital"],
                ["💼", "Other"],
              ] as [string, string][]
            ).map(([icon, name]) => (
              <div
                key={name}
                className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100"
              >
                <span className="text-2xl">{icon}</span>
                <span className="font-semibold text-gray-800">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            Paatrata (Eligibility)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "DMVV Foundation ki approved member",
              "Mahila ya mahila-led business",
              "Umar 18-55 saal",
              "Valid KYC documents",
              "Bank account mandatory",
              "Business plan ya existing business proof",
            ].map((e) => (
              <div
                key={e}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <CheckCircle
                  size={16}
                  className="text-orange-500 flex-shrink-0"
                />{" "}
                {e}
              </div>
            ))}
          </div>
        </section>

        {/* Required documents */}
        <section className="bg-orange-50 rounded-2xl p-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">
            Zaroori Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Aadhaar Card (ID Proof)",
              "PAN Card",
              "Bank Passbook / Statement",
              "Business Registration (if existing)",
              "GST Certificate (if applicable)",
              "Udyam Registration (if any)",
              "2 Passport Photos",
              "Address Proof",
            ].map((d) => (
              <div
                key={d}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span className="text-orange-500">✓</span> {d}
              </div>
            ))}
          </div>
        </section>

        {/* Application form */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-orange-50 rounded-2xl border-2 border-orange-200"
            data-ocid="udhyog_loan.success_state"
          >
            <CheckCircle size={56} className="text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-orange-800">
              Application Submit Ho Gayi!
            </h2>
            <p className="text-orange-600 mt-2">
              Hamare team aapko 2-3 working days mein contact karenge.
            </p>
            <Button
              className="mt-6 bg-orange-600 text-white"
              onClick={() => {
                setSubmitted(false);
                setForm({});
              }}
              data-ocid="udhyog_loan.primary_button"
            >
              Naya Application
            </Button>
          </motion.div>
        ) : (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Udhyog Loan Application Form
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <F label="Aavedan karta ka naam" k="applicantName" required />
              <F label="Mobile Number" k="mobile" type="tel" required />
              <F label="Email" k="email" type="email" />
              <F label="Address" k="address" />
              <F label="Business Ka Naam" k="businessName" required />
              <div>
                <Label className="text-xs">Business Category</Label>
                <Select
                  value={form.businessType || ""}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, businessType: v }))
                  }
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="udhyog_loan.select"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessCategories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <F label="Business Age (Years)" k="businessAge" type="number" />
              <F label="Annual Turnover (₹)" k="annualTurnover" type="number" />
              <F label="Number of Employees" k="employees" type="number" />
              <F
                label="GST Number (Optional)"
                k="gstNumber"
                placeholder="22AAAAA0000A1Z5"
              />
              <F label="Udyam Registration (Optional)" k="udyamReg" />
              <F
                label="Loan Amount Required (₹)"
                k="loanAmount"
                type="number"
                required
              />
              <F label="Tenure (Years)" k="tenure" type="number" />
              <F label="Bank Name" k="bankName" required />
              <F label="Account Number" k="accountNumber" required />
              <F label="IFSC Code" k="ifscCode" />
              <div className="md:col-span-2">
                <Label className="text-xs">Loan ka Purpose</Label>
                <Textarea
                  placeholder="Loan kis kaam ke liye chahiye..."
                  value={form.purpose || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, purpose: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="udhyog_loan.textarea"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs">Business Details</Label>
                <Textarea
                  placeholder="Apne business ke baare mein bataaein..."
                  value={form.businessDetails || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, businessDetails: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="udhyog_loan.textarea"
                />
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-orange-600 text-white mt-6 w-full md:w-auto"
              data-ocid="udhyog_loan.submit_button"
            >
              {submitting ? "Submitting..." : "Submit Udhyog Loan Application"}
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}
