import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  GraduationCap,
  IndianRupee,
  MapPin,
  PlayCircle,
  Star,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function InternshipPage() {
  const { internshipVacancies, addInternshipApplication, internshipSettings } =
    useApp();
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    qualification: "",
    skills: "",
    experience: "",
    // KYC
    aadhaar: "",
    pan: "",
    bankAccount: "",
    ifsc: "",
    bankName: "",
    // Documents (base64/name)
    passportPhoto: "",
    passportPhotoName: "",
    aadhaarDoc: "",
    aadhaarDocName: "",
    panDoc: "",
    panDocName: "",
    educationCert: "",
    educationCertName: "",
    resume: "",
    resumeName: "",
    declaration: false,
  });

  const activeVacancies = internshipVacancies.filter((v) => v.isActive);
  const selected = internshipVacancies.find((v) => v.id === selectedVacancy);

  const handleFileUpload = (
    field: string,
    nameField: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({
        ...prev,
        [field]: ev.target?.result as string,
        [nameField]: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.declaration) {
      alert("Please accept the declaration to proceed.");
      return;
    }
    const app = {
      id: `INT-${Date.now()}`,
      vacancyId: selectedVacancy || "",
      vacancyTitle: selected?.title || "",
      appliedAt: new Date().toISOString(),
      status: "pending" as const,
      ...form,
      declaration: true,
    };
    addInternshipApplication(app);
    setShowApplyForm(false);
    setShowSuccess(true);
    setForm({
      fullName: "",
      fatherName: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      district: "",
      state: "",
      pincode: "",
      qualification: "",
      skills: "",
      experience: "",
      aadhaar: "",
      pan: "",
      bankAccount: "",
      ifsc: "",
      bankName: "",
      passportPhoto: "",
      passportPhotoName: "",
      aadhaarDoc: "",
      aadhaarDocName: "",
      panDoc: "",
      panDocName: "",
      educationCert: "",
      educationCertName: "",
      resume: "",
      resumeName: "",
      declaration: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-white text-green-700 mb-4 text-sm">
            Now Hiring
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {internshipSettings?.heroTitle || "Internship Opportunities"}
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto mb-6">
            {internshipSettings?.heroSubtitle ||
              "Join DMVV Bhartiy Mahila Shakti Foundation and build your career while making a difference."}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>{activeVacancies.length} Open Positions</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Multiple Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span>Freshers Welcome</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vacancies */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Open Vacancies
        </h2>
        <p className="text-gray-500 mb-8">
          Click on any position to view details and apply
        </p>

        {activeVacancies.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-xl">No vacancies posted yet. Check back soon!</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeVacancies.map((v) => (
            <Card
              key={v.id}
              className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
              onClick={() => setSelectedVacancy(v.id)}
            >
              {v.photo && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={v.photo}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                  {v.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-green-700">
                    {v.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-300 shrink-0 ml-2"
                  >
                    {v.department}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-gray-800">
                    {v.salary}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{v.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{v.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{v.seats} Seats</span>
                </div>
                {v.lastDate && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Last Date: {v.lastDate}</span>
                  </div>
                )}
                <p className="text-gray-500 text-sm line-clamp-2 mt-2">
                  {v.description}
                </p>
                <Button
                  className="w-full mt-3 bg-green-600 hover:bg-green-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVacancy(v.id);
                    setShowApplyForm(true);
                  }}
                >
                  Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vacancy Detail Dialog */}
      {selected && !showApplyForm && (
        <Dialog
          open={!!selectedVacancy && !showApplyForm}
          onOpenChange={() => setSelectedVacancy(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-green-700">
                {selected.title}
              </DialogTitle>
            </DialogHeader>
            {selected.photo && (
              <img
                src={selected.photo}
                alt={selected.title}
                className="w-full h-56 object-cover rounded-lg"
              />
            )}
            {selected.videoUrl && (
              <div className="rounded-lg overflow-hidden">
                {selected.videoUrl.includes("youtube") ||
                selected.videoUrl.includes("youtu.be") ? (
                  <iframe
                    src={selected.videoUrl
                      .replace("watch?v=", "embed/")
                      .replace("youtu.be/", "youtube.com/embed/")}
                    className="w-full h-48"
                    allowFullScreen
                    title="Internship video"
                  />
                ) : (
                  <video src={selected.videoUrl} controls className="w-full">
                    <track kind="captions" />
                  </video>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Salary / Stipend</p>
                <p className="font-bold text-green-700">{selected.salary}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Department</p>
                <p className="font-bold text-blue-700">{selected.department}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-bold text-yellow-700">{selected.duration}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-bold text-purple-700">{selected.location}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Available Seats</p>
                <p className="font-bold text-red-600">{selected.seats}</p>
              </div>
              {selected.lastDate && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Last Date</p>
                  <p className="font-bold text-orange-600">
                    {selected.lastDate}
                  </p>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Job Description
              </h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">
                {selected.description}
              </p>
            </div>
            {selected.requirements && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Requirements
                </h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {selected.requirements}
                </p>
              </div>
            )}
            {selected.perks && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Perks & Benefits
                </h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {selected.perks}
                </p>
              </div>
            )}
            <Button
              className="w-full bg-green-600 hover:bg-green-700 mt-2"
              onClick={() => setShowApplyForm(true)}
            >
              Apply for this Position
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Apply Form Dialog */}
      <Dialog open={showApplyForm} onOpenChange={setShowApplyForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-green-700">
              Apply for: {selected?.title || "Internship"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Details */}
            <div>
              <h3 className="font-semibold text-gray-800 border-b pb-2 mb-4 text-green-700">
                Basic Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    required
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fullName: e.target.value }))
                    }
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label>Father's Name</Label>
                  <Input
                    value={form.fatherName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fatherName: e.target.value }))
                    }
                    placeholder="Father's name"
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={form.dob}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, dob: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select
                    value={form.gender}
                    onValueChange={(v) => setForm((p) => ({ ...p, gender: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Phone Number *</Label>
                  <Input
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Address</Label>
                  <Textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, address: e.target.value }))
                    }
                    placeholder="Full address"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>District</Label>
                  <Input
                    value={form.district}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, district: e.target.value }))
                    }
                    placeholder="District"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={form.state}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, state: e.target.value }))
                    }
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label>Pincode</Label>
                  <Input
                    value={form.pincode}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, pincode: e.target.value }))
                    }
                    placeholder="6-digit pincode"
                    maxLength={6}
                  />
                </div>
                <div>
                  <Label>Qualification *</Label>
                  <Input
                    required
                    value={form.qualification}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, qualification: e.target.value }))
                    }
                    placeholder="e.g. 12th, B.A., B.Com"
                  />
                </div>
                <div>
                  <Label>Skills</Label>
                  <Input
                    value={form.skills}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, skills: e.target.value }))
                    }
                    placeholder="e.g. Computer, Communication"
                  />
                </div>
                <div>
                  <Label>Experience</Label>
                  <Input
                    value={form.experience}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, experience: e.target.value }))
                    }
                    placeholder="e.g. Fresher, 1 Year"
                  />
                </div>
              </div>
            </div>

            {/* KYC Details */}
            <div>
              <h3 className="font-semibold border-b pb-2 mb-4 text-green-700">
                KYC / Identity Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Aadhaar Number</Label>
                  <Input
                    value={form.aadhaar}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        aadhaar: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                  />
                </div>
                <div>
                  <Label>PAN Number</Label>
                  <Input
                    value={form.pan}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        pan: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                </div>
                <div>
                  <Label>Bank Account Number</Label>
                  <Input
                    value={form.bankAccount}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, bankAccount: e.target.value }))
                    }
                    placeholder="Account number"
                  />
                </div>
                <div>
                  <Label>IFSC Code</Label>
                  <Input
                    value={form.ifsc}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        ifsc: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="IFSC code"
                  />
                </div>
                <div>
                  <Label>Bank Name</Label>
                  <Input
                    value={form.bankName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, bankName: e.target.value }))
                    }
                    placeholder="Bank name"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <h3 className="font-semibold border-b pb-2 mb-4 text-green-700">
                Document Upload
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Passport Size Photo *",
                    field: "passportPhoto",
                    nameField: "passportPhotoName",
                    required: true,
                  },
                  {
                    label: "Aadhaar Card",
                    field: "aadhaarDoc",
                    nameField: "aadhaarDocName",
                    required: false,
                  },
                  {
                    label: "PAN Card",
                    field: "panDoc",
                    nameField: "panDocName",
                    required: false,
                  },
                  {
                    label: "Education Certificate",
                    field: "educationCert",
                    nameField: "educationCertName",
                    required: false,
                  },
                  {
                    label: "Resume / CV",
                    field: "resume",
                    nameField: "resumeName",
                    required: false,
                  },
                ].map(({ label, field, nameField, required }) => (
                  <div key={field}>
                    <Label>{label}</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-green-400 transition-colors relative">
                      <input
                        type="file"
                        accept="image/*,.pdf,.doc,.docx"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required={required}
                        onChange={(e) => handleFileUpload(field, nameField, e)}
                      />
                      {(form as Record<string, unknown>)[field] ? (
                        <div className="text-green-600 text-sm">
                          <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                          <p className="truncate">
                            {
                              (form as Record<string, unknown>)[
                                nameField
                              ] as string
                            }
                          </p>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">
                          <Upload className="w-5 h-5 mx-auto mb-1" />
                          <p>Click to upload</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Declaration */}
            <div className="bg-green-50 p-4 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.declaration}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, declaration: e.target.checked }))
                  }
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I hereby declare that all the information provided above is
                  true and correct to the best of my knowledge. I understand
                  that any false information may lead to rejection of my
                  application.
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowApplyForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Popup */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md text-center">
          <div className="py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for applying. Your application has been received
              successfully.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left mb-4">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Next Steps:
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>✅ Application received and under review</li>
                <li>📞 Our team will call you within 2-5 working days</li>
                <li>📋 Shortlisted candidates will be called for interview</li>
                <li>📄 Keep your documents ready for verification</li>
                <li>✉️ Offer letter will be issued post selection</li>
              </ul>
            </div>
            <p className="text-xs text-gray-500">
              For queries, contact: DMVV Bhartiy Mahila Shakti Foundation
            </p>
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700 w-full"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Why Join Us */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Why Join Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎓",
                title: "Learn & Grow",
                desc: "Hands-on experience with real projects and mentorship from experts",
              },
              {
                icon: "💰",
                title: "Paid Internship",
                desc: "Competitive stipend with performance bonuses and allowances",
              },
              {
                icon: "📜",
                title: "Certificate",
                desc: "Official DMVV internship completion certificate for your portfolio",
              },
              {
                icon: "🌟",
                title: "Placement Support",
                desc: "Top performers get direct placement recommendations",
              },
              {
                icon: "🤝",
                title: "Network",
                desc: "Connect with professionals and NGO leaders across India",
              },
              {
                icon: "🏆",
                title: "Recognition",
                desc: "Monthly awards and recognition for outstanding interns",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
