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
import { CheckCircle, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function SHGLoan() {
  const { currentUser, addLoanApplication } = useApp();
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (
      !form.applicantName ||
      !form.mobile ||
      !form.shgName ||
      !form.loanAmount ||
      !form.bankName ||
      !form.accountNumber
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    const app: LoanApplication = {
      id: `shg_${Date.now()}`,
      userId: currentUser?.id || "guest",
      userName: form.applicantName,
      userMobile: form.mobile,
      loanType: "shg",
      amount: form.loanAmount,
      purpose: form.purpose || "SHG Group Activity",
      bankName: form.bankName,
      accountNumber: form.accountNumber,
      ifscCode: form.ifscCode || "",
      guarantorName: "",
      guarantorPhone: "",
      shgName: form.shgName,
      shgMembersCount: form.membersCount,
      businessDetails: form.groupActivity,
      status: "pending",
      appliedAt: new Date().toISOString().split("T")[0],
    };
    addLoanApplication(app);
    setSubmitted(true);
    setSubmitting(false);
    toast.success("🎉 SHG Loan application submitted successfully!");
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
        data-ocid="shg_loan.input"
      />
    </div>
  );

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[260px] flex items-center bg-gradient-to-br from-blue-800 to-blue-600">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
            <Users size={16} /> Self Help Group Loan
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            SHG Loan Yojana
          </h1>
          <p className="text-blue-100 mt-3 max-w-2xl text-lg">
            Special loan scheme for Women Self-Help Groups. Build business
            success through collective strength.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-700 py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {(
            [
              ["₹50 Lakh+", "Max Group Loan"],
              ["2,500+", "SHG Groups Helped"],
              ["96%", "Repayment Rate"],
              ["6%", "Interest Rate p.a."],
            ] as [string, string][]
          ).map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-extrabold">{v}</div>
              <div className="text-blue-200 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* What is SHG Loan */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            What is SHG Loan?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Self Help Group (SHG) Loan is a group loan scheme where women's
            self-help groups collectively take loans for their business
            activities. DMVV Foundation provides this loan to registered SHG
            groups that have been operating for at least 6 months.
          </p>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              [
                [
                  "💰 Group Loan",
                  "Loan is given in the group's name — no individual guarantee required.",
                ],
                [
                  "▼ Low Interest",
                  "Available at just 6% annual interest rate — much lower than other banks.",
                ],
                [
                  "⚡ Quick Processing",
                  "The entire process is completed within 7-10 days.",
                ],
                ["📈 Loan Limit", "Loans available from ₹1 lakh to ₹50 lakh."],
                [
                  "📅 Flexible Tenure",
                  "Choose a repayment tenure of 2 to 7 years.",
                ],
                [
                  "🤝 DMVV Support",
                  "DMVV team support throughout the entire process.",
                ],
              ] as [string, string][]
            ).map(([t, d]) => (
              <Card key={t}>
                <CardContent className="p-4">
                  <div className="font-bold text-gray-800 mb-2">{t}</div>
                  <div className="text-sm text-gray-500">{d}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            Eligibility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Registered SHG group with DMVV Foundation",
              "Minimum 10 active members",
              "Group savings record of more than 6 months",
              "Samuh KYC completed",
              "No previous loan defaults",
              "Group must have a bank account",
            ].map((e) => (
              <div
                key={e}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <CheckCircle
                  size={16}
                  className="text-green-500 flex-shrink-0"
                />{" "}
                {e}
              </div>
            ))}
          </div>
        </section>

        {/* How to apply */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            How to Apply (Steps)
          </h2>
          <div className="space-y-3">
            {(
              [
                ["1", "Fill the form below or visit a DMVV center"],
                ["2", "Submit group documents"],
                ["3", "Field officer verification"],
                ["4", "Loan committee approval (3-5 days)"],
                ["5", "Loan disbursement into the group's bank account"],
              ] as [string, string][]
            ).map(([num, step]) => (
              <div
                key={num}
                className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                  {num}
                </div>
                <div className="text-gray-700">{step}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Application form */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-green-50 rounded-2xl border-2 border-green-200"
            data-ocid="shg_loan.success_state"
          >
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-green-800">
              Application Submitted Successfully!
            </h2>
            <p className="text-green-600 mt-2">
              Our team will contact you within 2-3 working days.
            </p>
            <Button
              className="mt-6 bg-blue-600 text-white"
              onClick={() => {
                setSubmitted(false);
                setForm({});
              }}
              data-ocid="shg_loan.primary_button"
            >
              New Application
            </Button>
          </motion.div>
        ) : (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              SHG Loan Application Form
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <F label="Applicant Name" k="applicantName" required />
              <F label="Mobile Number" k="mobile" type="tel" required />
              <F label="Email" k="email" type="email" />
              <F label="Village / Ward" k="village" />
              <F label="Block" k="block" />
              <F label="District" k="district" required />
              <F label="State" k="state" />
              <F label="SHG Group Name" k="shgName" required />
              <F label="SHG Registration Number" k="shgRegNo" />
              <F
                label="Members Count"
                k="membersCount"
                type="number"
                required
              />
              <F
                label="Group Activity Type"
                k="groupActivityType"
                placeholder="Tailoring / Farming / Handicraft"
              />
              <F label="Group Age (Years)" k="groupAge" type="number" />
              <F
                label="Monthly Group Savings (₹)"
                k="monthlySavings"
                type="number"
              />
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
                <Label className="text-xs">Loan Purpose</Label>
                <Textarea
                  placeholder="What will the loan be used for..."
                  value={form.purpose || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, purpose: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="shg_loan.textarea"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs">Group Activity Description</Label>
                <Textarea
                  placeholder="Describe the group's activities..."
                  value={form.groupActivity || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, groupActivity: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="shg_loan.textarea"
                />
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 text-white mt-6 w-full md:w-auto"
              data-ocid="shg_loan.submit_button"
            >
              {submitting ? "Submitting..." : "Submit SHG Loan Application"}
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}
