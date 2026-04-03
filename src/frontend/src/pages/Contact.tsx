import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const { settings } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success(
        "Your message has been sent. We will get back to you within 2-3 working days.",
      );
    }, 1200);
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

            {/* Map placeholder */}
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
                onSubmit={handleSubmit}
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
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
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
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
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
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
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
                      value={form.subject}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, subject: e.target.value }))
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
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
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
                  disabled={sending}
                  data-ocid="contact.submit_button"
                >
                  {sending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
