import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import type { B2BEnquiry } from "@/context/AppContext";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function B2BPlan() {
  const { b2bSettings, b2bPlans, b2bBenefits, b2bSteps, addB2bEnquiry } =
    useApp();

  const enquiryRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    businessType: "",
    planInterested: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const activePlans = [...b2bPlans]
    .filter((p) => p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const activeBenefits = b2bBenefits.filter((b) => b.isActive);
  const activeSteps = b2bSteps
    .filter((s) => s.isActive)
    .sort((a, b) => a.stepNumber - b.stepNumber);

  const scrollToEnquiry = () => {
    enquiryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) {
      toast.error("Full Name and Mobile are required.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSubmitting(true);
    const enquiry: B2BEnquiry = {
      id: `b2b_enq_${Date.now()}`,
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      businessType: form.businessType,
      planInterested: form.planInterested,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
      status: "new",
    };
    addB2bEnquiry(enquiry);
    toast.success("Enquiry submitted! Our team will contact you soon.");
    setForm({
      name: "",
      mobile: "",
      email: "",
      businessType: "",
      planInterested: "",
      message: "",
    });
    setSubmitting(false);
  };

  const getBadgeStyle = (badge: string) => {
    if (badge === "Popular") return "bg-green-600 text-white";
    if (badge === "Best Value") return "bg-amber-500 text-white";
    if (badge === "New") return "bg-blue-500 text-white";
    if (badge === "Premium") return "bg-purple-600 text-white";
    return "bg-gray-700 text-white";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Section ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/30">
              <Sparkles size={14} className="text-yellow-300" />
              Exclusive Partnership Program
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {b2bSettings.heroTitle}
            </h1>
            <p className="text-green-100 text-xl font-medium mb-3">
              {b2bSettings.heroSubtitle}
            </p>
            <p className="text-green-200 text-base leading-relaxed mb-8 max-w-2xl">
              {b2bSettings.heroDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={scrollToEnquiry}
                className="bg-white text-green-800 hover:bg-green-50 font-semibold shadow-lg"
                data-ocid="b2b.primary_button"
              >
                {b2bSettings.ctaText || "Enquire Now"}
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <a href={`tel:${b2bSettings.ctaPhone}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  data-ocid="b2b.secondary_button"
                >
                  <Phone size={16} className="mr-2" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
        {b2bSettings.heroImage && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
            <img
              src={b2bSettings.heroImage}
              alt="B2B Partnership"
              className="w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
            />
          </div>
        )}
      </section>

      {/* ── Plans Section ──────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="bg-green-100 text-green-700 mb-3 px-3 py-1">
              Partnership Plans
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our B2B Partnership Plans
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Choose the plan that best fits your business needs and goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {activePlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  plan.badge === "Popular"
                    ? "border-green-600 scale-105"
                    : plan.badge === "Best Value"
                      ? "border-amber-400"
                      : "border-gray-200"
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${getBadgeStyle(plan.badge)}`}
                  >
                    {plan.badge}
                  </div>
                )}
                {plan.image && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2 pt-6">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                      plan.badge === "Popular"
                        ? "bg-green-100"
                        : plan.badge === "Best Value"
                          ? "bg-amber-100"
                          : "bg-gray-100"
                    }`}
                  >
                    <Award
                      size={20}
                      className={
                        plan.badge === "Popular"
                          ? "text-green-700"
                          : plan.badge === "Best Value"
                            ? "text-amber-600"
                            : "text-gray-600"
                      }
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-1">
                    <span className="text-3xl font-extrabold text-green-700">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      {plan.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {plan.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-green-600 mt-0.5 shrink-0"
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full font-semibold ${
                      plan.badge === "Popular"
                        ? "bg-green-700 hover:bg-green-800"
                        : plan.badge === "Best Value"
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "bg-gray-800 hover:bg-gray-900"
                    }`}
                    onClick={scrollToEnquiry}
                    data-ocid="b2b.plan.button"
                  >
                    {plan.buttonText}
                    <ChevronRight size={15} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Section ───────────────────────────────── */}
      {activeBenefits.length > 0 && (
        <section className="py-20 bg-green-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <Badge className="bg-green-100 text-green-700 mb-3 px-3 py-1">
                Why Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Why Partner With Us?
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Unlock exclusive benefits when you join the DMVV B2B Network.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {activeBenefits.map((benefit) => (
                <Card
                  key={benefit.id}
                  className="bg-white border border-green-100 hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{benefit.icon}</div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── How It Works ───────────────────────────────────── */}
      {activeSteps.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-14">
              <Badge className="bg-green-100 text-green-700 mb-3 px-3 py-1">
                Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                How to Get Started
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Simple 4-step process to become a DMVV B2B partner.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {activeSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                >
                  {index < activeSteps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-1/2 w-full h-0.5 bg-green-200 z-0" />
                  )}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-green-700 text-white font-bold text-xl flex items-center justify-center shadow-md mb-4">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Enquiry Form ───────────────────────────────────── */}
      <section
        ref={enquiryRef}
        className="py-20 bg-gradient-to-br from-green-800 to-green-700"
        data-ocid="b2b.section"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Enquire About B2B Partnership
            </h2>
            <p className="text-green-200">
              Fill in your details and our team will get back to you shortly.
            </p>
          </div>
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="b2b-name">Full Name *</Label>
                    <Input
                      id="b2b-name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="b2b.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="b2b-mobile">Mobile Number *</Label>
                    <Input
                      id="b2b-mobile"
                      placeholder="10-digit mobile"
                      value={form.mobile}
                      maxLength={10}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          mobile: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      data-ocid="b2b.input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="b2b-email">Email Address</Label>
                  <Input
                    id="b2b-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    data-ocid="b2b.input"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Business Type</Label>
                    <Select
                      value={form.businessType}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, businessType: v }))
                      }
                    >
                      <SelectTrigger data-ocid="b2b.select">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="Trading">Trading</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                        <SelectItem value="Agriculture">Agriculture</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Plan Interested</Label>
                    <Select
                      value={form.planInterested}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, planInterested: v }))
                      }
                    >
                      <SelectTrigger data-ocid="b2b.select">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {activePlans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.name}>
                            {plan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="b2b-message">Message</Label>
                  <Textarea
                    id="b2b-message"
                    placeholder="Tell us about your business and requirements..."
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    data-ocid="b2b.textarea"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-700 hover:bg-green-800 font-semibold text-base py-2.5"
                    disabled={submitting}
                    data-ocid="b2b.submit_button"
                  >
                    <Mail size={16} className="mr-2" />
                    Submit Enquiry
                  </Button>
                  <a href={`tel:${b2bSettings.ctaPhone}`} className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-green-700 text-green-700 hover:bg-green-50"
                      data-ocid="b2b.secondary_button"
                    >
                      <Phone size={16} className="mr-2" />
                      {b2bSettings.ctaPhone}
                    </Button>
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
