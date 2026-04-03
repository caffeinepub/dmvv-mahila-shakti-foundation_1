import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LoanApplication, useApp } from "@/context/AppContext";
import { CheckCircle, Clock, IndianRupee, Percent } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Loan() {
  const { loanSchemes, currentUser, addLoanApplication } = useApp();
  const active = loanSchemes
    .filter((l) => l.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleApplySubmit = (schemeName: string) => {
    if (
      !form.fullName ||
      !form.mobile ||
      !form.amount ||
      !form.bankName ||
      !form.accountNumber
    ) {
      toast.error("Kripya sare required fields bharein.");
      return;
    }
    setSubmitting(true);
    const app: LoanApplication = {
      id: `loan_${Date.now()}`,
      userId: currentUser?.id || "guest",
      userName: form.fullName,
      userMobile: form.mobile,
      loanType: "general",
      amount: form.amount,
      purpose: form.purpose || schemeName,
      bankName: form.bankName,
      accountNumber: form.accountNumber,
      ifscCode: form.ifscCode || "",
      guarantorName: form.guarantorName || "",
      guarantorPhone: form.guarantorPhone || "",
      status: "pending",
      appliedAt: new Date().toISOString().split("T")[0],
    };
    addLoanApplication(app);
    toast.success(
      "🎉 Loan application submit ho gayi! Hum jald hi contact karenge.",
    );
    setForm({});
    setOpenModal(null);
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">
            Financial Empowerment
          </Badge>
          <h1 className="text-4xl font-extrabold text-white">Loan Schemes</h1>
          <p className="text-green-200 mt-2">
            Microfinance and loan programs for women entrepreneurs
          </p>
        </div>
      </section>

      {/* SHG / Udhyog banner */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="text-white font-bold">Vishesh Loan Yojanaein:</div>
          <div className="flex gap-3">
            <Link to="/shg-loan">
              <Button
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold"
                data-ocid="loan_page.secondary_button"
              >
                SHG Loan Yojana →
              </Button>
            </Link>
            <Link to="/udhyog-loan">
              <Button
                className="bg-white text-orange-700 hover:bg-orange-50 font-bold"
                data-ocid="loan_page.secondary_button"
              >
                Udhyog Loan Yojana →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: IndianRupee,
                label: "Total Loans Disbursed",
                value: "₹35 Crore+",
                color: "text-green-600",
              },
              {
                icon: Percent,
                label: "Repayment Rate",
                value: "94%",
                color: "text-blue-600",
              },
              {
                icon: Clock,
                label: "Processing Time",
                value: "7-14 Days",
                color: "text-orange-500",
              },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-5 flex flex-col items-center">
                  <s.icon size={28} className={s.color} />
                  <div className={`text-2xl font-extrabold mt-2 ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 space-y-8">
        {active.length === 0 ? (
          <div
            className="text-center py-20 text-gray-400"
            data-ocid="loan.empty_state"
          >
            Koi loan scheme available nahi hai.
          </div>
        ) : (
          active.map((scheme, idx) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              data-ocid={`loan.item.${idx + 1}`}
            >
              <Card
                className={`border-l-4 ${scheme.color} hover:shadow-lg transition-shadow`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-extrabold text-gray-900 mb-1">
                        {scheme.name}
                      </h2>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <Badge variant="outline">
                          <IndianRupee size={12} className="mr-1" />
                          {scheme.amount}
                        </Badge>
                        <Badge variant="outline">
                          <Percent size={12} className="mr-1" />
                          {scheme.interest}
                        </Badge>
                        <Badge variant="outline">
                          <Clock size={12} className="mr-1" />
                          {scheme.tenure}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{scheme.description}</p>
                      <div>
                        <h3 className="font-bold text-sm text-gray-800 mb-2">
                          Eligibility:
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                          {scheme.eligibility.map((e) => (
                            <li
                              key={e}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle
                                size={14}
                                className="text-green-500 mt-0.5 flex-shrink-0"
                              />
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Dialog
                        open={openModal === scheme.id}
                        onOpenChange={(open) => {
                          setOpenModal(open ? scheme.id : null);
                          setForm({});
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="bg-ngo-green text-white"
                            data-ocid={`loan.primary_button.${idx + 1}`}
                          >
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className="max-w-md"
                          data-ocid="loan.dialog"
                        >
                          <DialogHeader>
                            <DialogTitle>Apply for {scheme.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {(
                              [
                                ["Full Name *", "fullName", "text"],
                                ["Mobile *", "mobile", "tel"],
                                ["Loan Amount (₹) *", "amount", "number"],
                                ["Purpose", "purpose", "text"],
                                [
                                  "Monthly Income (₹)",
                                  "monthlyIncome",
                                  "number",
                                ],
                                ["Bank Name *", "bankName", "text"],
                                ["Account Number *", "accountNumber", "text"],
                                ["IFSC Code", "ifscCode", "text"],
                                ["Guarantor Name", "guarantorName", "text"],
                                ["Guarantor Phone", "guarantorPhone", "tel"],
                              ] as [string, string, string][]
                            ).map(([l, k, t]) => (
                              <div key={k}>
                                <Label className="text-xs">{l}</Label>
                                <Input
                                  type={t}
                                  value={form[k] || ""}
                                  onChange={(e) =>
                                    setForm((p) => ({
                                      ...p,
                                      [k]: e.target.value,
                                    }))
                                  }
                                  className="mt-1"
                                  data-ocid="loan.input"
                                />
                              </div>
                            ))}
                          </div>
                          <Button
                            onClick={() => handleApplySubmit(scheme.name)}
                            disabled={submitting}
                            className="bg-ngo-green text-white w-full mt-2"
                            data-ocid="loan.submit_button"
                          >
                            {submitting
                              ? "Submitting..."
                              : "Submit Application"}
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
}
