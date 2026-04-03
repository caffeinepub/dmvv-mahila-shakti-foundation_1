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
import { type ComplaintSubmission, useApp } from "@/context/AppContext";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const COMPLAINT_TYPES = [
  "Service Issue",
  "Staff Behavior",
  "Financial Concern",
  "Program Quality",
  "Center Facilities",
  "Discrimination/Harassment",
  "Other",
];

export default function Complaint() {
  const { addComplaintSubmission } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    complaintType: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      !form.complaintType ||
      !form.subject ||
      !form.message
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    const complaint: ComplaintSubmission = {
      id: `c_${Date.now()}`,
      ...form,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    addComplaintSubmission(complaint);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Complaint submitted successfully.");
    }, 800);
  };

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">
            Help &amp; Support
          </Badge>
          <h1 className="text-4xl font-extrabold text-white">
            Submit a Complaint
          </h1>
          <p className="text-green-200 mt-2">
            We take all complaints seriously and aim to resolve them promptly
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            <Card className="border border-green-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <MessageSquare
                    className="text-ngo-green mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Complaint Tracking
                    </h3>
                    <p className="text-gray-500 text-sm">
                      After submission, you will receive a complaint ID. You can
                      track status by contacting us with your ID.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-green-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Phone
                    className="text-ngo-orange mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Helpline</h3>
                    <p className="text-gray-500 text-sm">
                      For urgent issues, call our helpline:
                    </p>
                    <p className="font-semibold text-ngo-green mt-1">
                      +91-522-4001234
                    </p>
                    <p className="text-xs text-gray-400">Mon-Sat, 9am to 6pm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-green-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className="text-blue-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Resolution Time
                    </h3>
                    <p className="text-gray-500 text-sm">
                      We aim to acknowledge complaints within 48 hours and
                      resolve them within 7-14 working days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-green-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <FileText
                    className="text-purple-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Confidentiality
                    </h3>
                    <p className="text-gray-500 text-sm">
                      All complaints are treated with strict confidentiality.
                      Identity is protected unless disclosure is legally
                      required.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <Card
                className="border border-green-200"
                data-ocid="complaint.success_state"
              >
                <CardContent className="p-10 flex flex-col items-center text-center">
                  <CheckCircle2 size={64} className="text-ngo-green mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Complaint Submitted!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Thank you for bringing this to our attention. Your complaint
                    has been registered and will be reviewed by our grievance
                    team.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    You will be contacted within 48 hours on the phone number
                    provided.
                  </p>
                  <Button
                    className="bg-ngo-green text-white"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        complaintType: "",
                        subject: "",
                        message: "",
                      });
                    }}
                  >
                    Submit Another Complaint
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card data-ocid="complaint.dialog">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Complaint Form
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Your full name"
                          className="mt-1"
                          data-ocid="complaint.input"
                        />
                      </div>
                      <div>
                        <Label>Phone Number *</Label>
                        <Input
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          placeholder="10-digit mobile number"
                          className="mt-1"
                          data-ocid="complaint.input"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="your@email.com (optional)"
                        className="mt-1"
                        data-ocid="complaint.input"
                      />
                    </div>
                    <div>
                      <Label>Complaint Type *</Label>
                      <Select
                        value={form.complaintType}
                        onValueChange={(v) =>
                          setForm({ ...form, complaintType: v })
                        }
                      >
                        <SelectTrigger
                          className="mt-1"
                          data-ocid="complaint.select"
                        >
                          <SelectValue placeholder="Select complaint type" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPLAINT_TYPES.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Subject *</Label>
                      <Input
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        placeholder="Brief subject of complaint"
                        className="mt-1"
                        data-ocid="complaint.input"
                      />
                    </div>
                    <div>
                      <Label>Complaint Details *</Label>
                      <Textarea
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Please describe your complaint in detail. Include dates, names of staff involved (if any), and what resolution you are seeking."
                        className="mt-1 min-h-32"
                        data-ocid="complaint.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-ngo-green text-white hover:bg-ngo-green-dark"
                      disabled={loading}
                      data-ocid="complaint.submit_button"
                    >
                      {loading ? "Submitting..." : "Submit Complaint"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
