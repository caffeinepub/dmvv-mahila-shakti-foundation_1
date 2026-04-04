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
import { type ApplyFormSubmission, useApp } from "@/context/AppContext";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const APPLY_FOR_OPTIONS = [
  "Training Program",
  "Loan Application",
  "Employment Assistance",
  "Award Nomination",
  "Volunteer",
  "General Inquiry",
];

export default function Contact() {
  const { settings, addApplyFormSubmission } = useApp();

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [contactSending, setContactSending] = useState(false);

  const [applyForm, setApplyForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    state: "",
    district: "",
    applyFor: "",
    message: "",
  });
  const [applySubmitting, setApplySubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    setContactSending(true);
    setTimeout(() => {
      setContactSending(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      toast.success(
        "Your message has been sent. We will get back to you within 2-3 working days.",
      );
    }, 1200);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.fullName || !applyForm.mobile || !applyForm.applyFor) {
      toast.error("Full name, mobile, and apply-for are required.");
      return;
    }
    setApplySubmitting(true);
    setTimeout(() => {
      const submission: ApplyFormSubmission = {
        id: `af_${Date.now()}`,
        fullName: applyForm.fullName.trim(),
        mobile: applyForm.mobile.trim(),
        email: applyForm.email.trim(),
        state: applyForm.state.trim(),
        district: applyForm.district.trim(),
        applyFor: applyForm.applyFor,
        message: applyForm.message.trim(),
        submittedAt: new Date().toISOString(),
        status: "new",
      };
      addApplyFormSubmission(submission);
      setApplySubmitting(false);
      setApplyForm({
        fullName: "",
        mobile: "",
        email: "",
        state: "",
        district: "",
        applyFor: "",
        message: "",
      });
      toast.success(
        "Your application has been submitted successfully! We will contact you within 2-3 working days.",
      );
    }, 1000);
  };

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Get In Touch</Badge>
          <h1 className="text-4xl font-extrabold text-white">Contact Us</h1>
          <p className="text-green-200 mt-2">
            We're here to help and answer any questions
          </p>
        </div>
      </section>

      {/* Contact Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Address", value: settings.address },
              { icon: Phone, label: "Phone", value: settings.contactPhone },
              { icon: Mail, label: "Email", value: settings.contactEmail },
              {
                icon: Clock,
                label: "Office Hours",
                value: "Monday - Saturday: 9:00 AM - 6:00 PM",
              },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="p-4 flex items-start gap-4">
                  <item.icon
                    size={20}
                    className="text-ngo-green flex-shrink-0 mt-1"
                  />
                  <div>
                    <div className="font-bold text-sm text-gray-800">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-0.5">
                      {item.value}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div className="text-center text-green-700">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <div className="text-sm font-semibold">New Delhi, India</div>
                  <div className="text-xs">Sector 12, Vikas Bhawan</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Send Us a Message
              </h2>
              <form
                onSubmit={handleContactSubmit}
                className="space-y-4"
                data-ocid="contact.modal"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+91-XXXXXXXXXX"
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm((p) => ({
                          ...p,
                          subject: e.target.value,
                        }))
                      }
                      placeholder="How can we help?"
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Write your message here..."
                    rows={5}
                    className="mt-1"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-ngo-green text-white hover:bg-ngo-green-dark w-full"
                  disabled={contactSending}
                  data-ocid="contact.submit_button"
                >
                  {contactSending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Apply Now Form Section */}
      <section id="apply" className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-ngo-orange text-white mb-3">Apply Now</Badge>
            <h2 className="text-3xl font-extrabold text-gray-900">Apply Now</h2>
            <p className="text-gray-500 mt-2">
              Training, loan, employment, awards, or volunteer — fill the form
              and we'll reach you
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <form
                onSubmit={handleApplySubmit}
                className="space-y-5"
                data-ocid="apply.modal"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="apply-name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="apply-name"
                      value={applyForm.fullName}
                      onChange={(e) =>
                        setApplyForm((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }))
                      }
                      placeholder="Your full name"
                      className="mt-1"
                      data-ocid="apply.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apply-mobile">
                      Mobile <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="apply-mobile"
                      value={applyForm.mobile}
                      onChange={(e) =>
                        setApplyForm((p) => ({ ...p, mobile: e.target.value }))
                      }
                      placeholder="10-digit mobile number"
                      className="mt-1"
                      data-ocid="apply.input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="apply-email">Email</Label>
                    <Input
                      id="apply-email"
                      type="email"
                      value={applyForm.email}
                      onChange={(e) =>
                        setApplyForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="mt-1"
                      data-ocid="apply.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apply-for">
                      Apply For <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={applyForm.applyFor}
                      onValueChange={(v) =>
                        setApplyForm((p) => ({ ...p, applyFor: v }))
                      }
                    >
                      <SelectTrigger className="mt-1" data-ocid="apply.select">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {APPLY_FOR_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="apply-state">State</Label>
                    <Input
                      id="apply-state"
                      value={applyForm.state}
                      onChange={(e) =>
                        setApplyForm((p) => ({ ...p, state: e.target.value }))
                      }
                      placeholder="e.g. Uttar Pradesh"
                      className="mt-1"
                      data-ocid="apply.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apply-district">District</Label>
                    <Input
                      id="apply-district"
                      value={applyForm.district}
                      onChange={(e) =>
                        setApplyForm((p) => ({
                          ...p,
                          district: e.target.value,
                        }))
                      }
                      placeholder="e.g. Lucknow"
                      className="mt-1"
                      data-ocid="apply.input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="apply-message">
                    Message / Additional Details
                  </Label>
                  <Textarea
                    id="apply-message"
                    value={applyForm.message}
                    onChange={(e) =>
                      setApplyForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Anything else you want to share? Write here..."
                    rows={4}
                    className="mt-1"
                    data-ocid="apply.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="bg-ngo-orange text-white hover:bg-ngo-orange-dark w-full font-semibold"
                  disabled={applySubmitting}
                  data-ocid="apply.submit_button"
                >
                  <Send size={16} className="mr-2" />
                  {applySubmitting
                    ? "Submitting application..."
                    : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
