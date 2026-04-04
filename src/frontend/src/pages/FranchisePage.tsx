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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  BarChart3,
  Box,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  FileText,
  Handshake,
  IndianRupee,
  MapPin,
  Megaphone,
  Package,
  Phone,
  Settings2,
  Star,
  TrendingUp,
  Upload,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const INVESTMENT_PLANS = [
  { value: "Basic Plan", label: "Basic Plan — ₹75,000", fee: "₹75,000" },
  {
    value: "Standard Plan",
    label: "Standard Plan — ₹1,40,000",
    fee: "₹1,40,000",
  },
  {
    value: "Premium Plan",
    label: "Premium Plan — ₹2,40,000",
    fee: "₹2,40,000",
  },
];

const DEFAULT_DATA = {
  hero: {
    title: "Anshika Udhyog Centre — Franchise Program",
    subtitle: "Start your own enterprise — Walk the path of self-employment",
    tagline:
      "Join India's growing franchise network and build your future with DMVV Bhartiy Mahila Shakti Foundation's Anshika Udhyog Centre",
  },
  machines: [
    {
      id: "1",
      name: "Agarbatti Making Machine",
      description:
        "High-speed automatic agarbatti manufacturing machine, 10kg/hr capacity",
      rate: "₹45,000",
      photo: "",
    },
    {
      id: "2",
      name: "Papad Making Machine",
      description: "Semi-automatic papad rolling & drying machine, 20kg/hr",
      rate: "₹28,000",
      photo: "",
    },
    {
      id: "3",
      name: "Masala Grinding Machine",
      description: "Commercial-grade masala grinder with 5 sieves, 15kg/hr",
      rate: "₹35,000",
      photo: "",
    },
    {
      id: "4",
      name: "Pickle Making Unit",
      description:
        "Stainless steel pickle processing unit with mixing & sealing",
      rate: "₹22,000",
      photo: "",
    },
    {
      id: "5",
      name: "Phenyl / Cleaning Liquid Unit",
      description: "Phenyl and floor cleaner mixing and bottling unit",
      rate: "₹18,000",
      photo: "",
    },
  ],
  rawMaterials: [
    { id: "1", name: "Bamboo Powder", unit: "KG", rate: "₹25" },
    { id: "2", name: "Charcoal Powder", unit: "KG", rate: "₹18" },
    { id: "3", name: "Jigat Powder (Binder)", unit: "KG", rate: "₹40" },
    { id: "4", name: "Masala Fragrance", unit: "KG", rate: "₹120" },
    { id: "5", name: "Wheat Flour (Papad)", unit: "KG", rate: "₹28" },
    { id: "6", name: "Urad Dal Flour", unit: "KG", rate: "₹65" },
    { id: "7", name: "Spices Mix", unit: "KG", rate: "₹90" },
    { id: "8", name: "Packaging Material", unit: "BOX", rate: "₹12" },
    { id: "9", name: "Chemicals (Phenyl Base)", unit: "LITRE", rate: "₹35" },
    { id: "10", name: "Plastic Bottles", unit: "PIECE", rate: "₹4" },
  ],
  blueprint: [
    {
      id: "1",
      step: 1,
      title: "Raw Material Procurement",
      description:
        "Source quality raw materials from approved suppliers at competitive rates",
    },
    {
      id: "2",
      step: 2,
      title: "Quality Testing & Sorting",
      description:
        "Inspect and sort all incoming raw materials as per quality standards",
    },
    {
      id: "3",
      step: 3,
      title: "Machine Processing",
      description:
        "Feed materials into respective machines for processing and manufacturing",
    },
    {
      id: "4",
      step: 4,
      title: "Quality Check (QC)",
      description:
        "Conduct quality check on finished products before packaging",
    },
    {
      id: "5",
      step: 5,
      title: "Packaging & Labelling",
      description:
        "Pack products in branded packaging with proper labelling and weight",
    },
    {
      id: "6",
      step: 6,
      title: "Storage & Dispatch",
      description:
        "Store in dry, hygienic conditions and dispatch to distribution points",
    },
  ],
  roadmap: [
    {
      id: "1",
      step: 1,
      title: "Inquiry & Application",
      description:
        "Fill franchise inquiry form; our team contacts you within 48 hours",
      duration: "Day 1–2",
    },
    {
      id: "2",
      step: 2,
      title: "Eligibility Check",
      description:
        "Team visits your location, verifies space, investment readiness",
      duration: "Day 3–5",
    },
    {
      id: "3",
      step: 3,
      title: "Agreement Signing",
      description:
        "Sign the franchise agreement with DMVV Foundation; submit fee",
      duration: "Day 6–10",
    },
    {
      id: "4",
      step: 4,
      title: "Training & Setup",
      description:
        "5-day training at Anshika Udhyog Centre; machine installation at your unit",
      duration: "Day 11–20",
    },
    {
      id: "5",
      step: 5,
      title: "Trial Production",
      description:
        "Start trial production with full guidance from our expert team",
      duration: "Day 21–25",
    },
    {
      id: "6",
      step: 6,
      title: "Commercial Launch",
      description:
        "Official launch of your Anshika Udhyog franchise unit with marketing support",
      duration: "Day 26–30",
    },
  ],
  charges: [
    {
      id: "1",
      item: "Franchise Registration Fee",
      amount: "₹5,000",
      note: "One-time, non-refundable",
    },
    {
      id: "2",
      item: "Machine & Equipment Cost",
      amount: "₹50,000 – ₹2,00,000",
      note: "Depends on product category",
    },
    {
      id: "3",
      item: "Raw Material (Initial Stock)",
      amount: "₹15,000 – ₹30,000",
      note: "As per selected products",
    },
    {
      id: "4",
      item: "Training Fee",
      amount: "₹2,000",
      note: "5-day comprehensive training",
    },
    {
      id: "5",
      item: "Branding & Marketing Kit",
      amount: "₹3,500",
      note: "Banners, boards, visiting cards",
    },
    {
      id: "6",
      item: "Monthly Royalty",
      amount: "₹500 / month",
      note: "After first 3 months free",
    },
    {
      id: "7",
      item: "Total Estimated Investment",
      amount: "₹75,000 – ₹2,40,500",
      note: "Category-wise breakdown available",
    },
  ],
  marketingSupport: [
    {
      id: "1",
      title: "Digital Marketing",
      description:
        "Social media promotion, WhatsApp campaigns, and Google listing support",
    },
    {
      id: "2",
      title: "Branding Kit",
      description:
        "Flex banners, boards, visiting cards, and product stickers with Anshika branding",
    },
    {
      id: "3",
      title: "Product Display Support",
      description: "Display stands and product demo materials for your centre",
    },
    {
      id: "4",
      title: "Mela & Exhibition Participation",
      description: "Inclusion in district-level trade fairs and women's melas",
    },
    {
      id: "5",
      title: "Centralized Order Booking",
      description: "Bulk orders from DMVV network shared with franchisees",
    },
    {
      id: "6",
      title: "Training & Mentoring",
      description: "Regular follow-up calls and workshops by DMVV trainers",
    },
  ],
  plans: [
    {
      id: "1",
      name: "Starter Plan",
      price: "₹75,000",
      duration: "1 Year",
      color: "blue",
      features: [
        "1 Machine (Your Choice)",
        "Basic Training (3 Days)",
        "Starter Raw Material Kit",
        "Branding Board",
        "Phone Support",
      ],
    },
    {
      id: "2",
      name: "Standard Plan",
      price: "₹1,40,000",
      duration: "2 Years",
      color: "green",
      features: [
        "2 Machines",
        "5-Day Training + Certificate",
        "Raw Material Stock (30 days)",
        "Full Branding Kit",
        "WhatsApp Group Support",
        "Mela Participation",
      ],
      recommended: true,
    },
    {
      id: "3",
      name: "Premium Plan",
      price: "₹2,40,000",
      duration: "3 Years",
      color: "orange",
      features: [
        "3–4 Machines",
        "10-Day Master Training",
        "Raw Material Stock (60 days)",
        "Full Branding + Display Kit",
        "Digital Marketing Package",
        "Priority Order Routing",
        "Dedicated Field Support",
      ],
    },
  ],
  packaging: [
    {
      id: "1",
      product: "Agarbatti",
      type: "Paper Box",
      size: "19 cm",
      weight: "90g / 200g",
      qtyPerBox: "12 packets",
    },
    {
      id: "2",
      product: "Papad",
      type: "Polypropylene Pouch",
      size: "30x20 cm",
      weight: "200g / 500g",
      qtyPerBox: "24 pouches",
    },
    {
      id: "3",
      product: "Masala",
      type: "Zipper Pouch",
      size: "15x10 cm",
      weight: "50g / 100g",
      qtyPerBox: "50 pouches",
    },
    {
      id: "4",
      product: "Pickle",
      type: "Glass Jar",
      size: "250ml / 500ml",
      weight: "250g / 500g",
      qtyPerBox: "12 jars",
    },
    {
      id: "5",
      product: "Phenyl",
      type: "HDPE Bottle",
      size: "500ml / 1L",
      weight: "500ml / 1L",
      qtyPerBox: "24 bottles",
    },
  ],
  programs: [
    {
      id: "1",
      name: "Agarbatti Udhyog",
      description:
        "Complete incense stick manufacturing unit with training and marketing support",
      badge: "Popular",
    },
    {
      id: "2",
      name: "Papad Udhyog",
      description:
        "Traditional papad making with modern semi-automatic equipment",
      badge: "",
    },
    {
      id: "3",
      name: "Masala Udhyog",
      description:
        "Spice grinding, blending and packaging unit for local markets",
      badge: "",
    },
    {
      id: "4",
      name: "Achar (Pickle) Udhyog",
      description:
        "Traditional pickle production with hygienic processing unit",
      badge: "",
    },
    {
      id: "5",
      name: "Phenyl & Cleaners Udhyog",
      description:
        "Floor cleaner, phenyl, disinfectant manufacturing and bottling",
      badge: "New",
    },
    {
      id: "6",
      name: "Detergent Powder Udhyog",
      description: "Washing powder and dishwash powder blending and packing",
      badge: "",
    },
    {
      id: "7",
      name: "Candle Making Udhyog",
      description: "Decorative and utility candle making with mould casting",
      badge: "",
    },
    {
      id: "8",
      name: "Makhana Processing Udhyog",
      description: "Fox nut roasting, flavouring, and premium packaging unit",
      badge: "New",
    },
  ],
  applications: [] as {
    id: string;
    name: string;
    phone: string;
    district: string;
    state: string;
    message: string;
    date: string;
  }[],
};

function useLocalFranchiseData() {
  const [data, setData] = useState<typeof DEFAULT_DATA>(() => {
    try {
      const saved = localStorage.getItem("dmvv_franchise_data");
      if (saved)
        return {
          ...DEFAULT_DATA,
          ...JSON.parse(saved),
          applications: JSON.parse(saved).applications || [],
        };
    } catch {}
    return DEFAULT_DATA;
  });

  const loadedRef = useRef(false);
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    import("@/utils/BackendDataService").then(({ initializeFromBackend }) => {
      initializeFromBackend().then((backendData) => {
        if (backendData.dmvv_franchise_data) {
          setData(backendData.dmvv_franchise_data as typeof DEFAULT_DATA);
        }
      });
    });
  }, []);

  return data;
}

function FileUploadField({
  label,
  required,
  value,
  onChange,
  accept = "image/*,.pdf",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (base64: string) => void;
  accept?: string;
}) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange((ev.target?.result as string) || "");
    };
    reader.readAsDataURL(file);
  };

  const isImage = value?.startsWith("data:image");
  const isPdf = value?.startsWith("data:application/pdf");

  return (
    <div>
      <Label className="text-gray-700 font-medium mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-green-400 transition-colors">
        <label className="cursor-pointer flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Upload size={16} className="text-green-600" />
            <span>{value ? "Change File" : "Upload File"}</span>
          </div>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFile}
          />
        </label>
        {isImage && (
          <div className="mt-2">
            <img
              src={value}
              alt="Preview"
              className="w-20 h-20 object-cover rounded border border-gray-200"
            />
          </div>
        )}
        {isPdf && (
          <div className="mt-2 flex items-center gap-2 text-green-700 text-xs">
            <FileText size={14} /> PDF document uploaded
          </div>
        )}
        {value && !isImage && !isPdf && (
          <div className="mt-2 text-green-600 text-xs">File uploaded</div>
        )}
      </div>
    </div>
  );
}

export default function FranchisePage() {
  const data = useLocalFranchiseData();

  // ── Form State ──────────────────────────────────────────────────────────────
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [passportPhoto, setPassportPhoto] = useState("");
  const [aadhaarDoc, setAadhaarDoc] = useState("");
  const [panDoc, setPanDoc] = useState("");
  const [additionalDoc, setAdditionalDoc] = useState("");
  const [category, setCategory] = useState("");
  const [plan, setPlan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [formError, setFormError] = useState("");

  const selectedPlanFee =
    INVESTMENT_PLANS.find((p) => p.value === plan)?.fee || "";

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim()) {
      setFormError("Full Name is required.");
      return;
    }
    if (!fatherName.trim()) {
      setFormError("Father's Name is required.");
      return;
    }
    if (!dob) {
      setFormError("Date of Birth is required.");
      return;
    }
    if (!gender) {
      setFormError("Please select Gender.");
      return;
    }
    if (!phone.trim() || phone.trim().length !== 10) {
      setFormError("Valid 10-digit Phone Number is required.");
      return;
    }
    if (!address.trim()) {
      setFormError("Address is required.");
      return;
    }
    if (!district.trim()) {
      setFormError("District is required.");
      return;
    }
    if (!state) {
      setFormError("Please select State.");
      return;
    }
    if (!pincode.trim()) {
      setFormError("Pincode is required.");
      return;
    }
    if (!aadhaar.trim() || aadhaar.trim().length !== 12) {
      setFormError("Valid 12-digit Aadhaar Number is required.");
      return;
    }
    if (!pan.trim() || pan.trim().length !== 10) {
      setFormError("Valid 10-character PAN Number is required.");
      return;
    }
    if (!passportPhoto) {
      setFormError("Passport Size Photo is required.");
      return;
    }
    if (!aadhaarDoc) {
      setFormError("Aadhaar Card upload is required.");
      return;
    }
    if (!category) {
      setFormError("Please select a Franchise Category.");
      return;
    }
    if (!plan) {
      setFormError("Please select an Investment Plan.");
      return;
    }

    setSubmitting(true);
    const appId = Date.now().toString();
    const newApp = {
      id: appId,
      name: fullName.trim(),
      fatherName: fatherName.trim(),
      dob,
      gender,
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      district: district.trim(),
      state,
      pincode: pincode.trim(),
      aadhaar: aadhaar.trim(),
      pan: pan.trim().toUpperCase(),
      bankAccount: bankAccount.trim(),
      ifsc: ifsc.trim().toUpperCase(),
      bankName: bankName.trim(),
      passportPhoto,
      aadhaarDoc,
      panDoc,
      additionalDoc,
      category,
      plan,
      status: "pending" as const,
      kycStatus: "pending" as const,
      date: new Date().toLocaleDateString("en-IN"),
      approvedDate: "",
      rejectedDate: "",
      forwardedTo: "",
      adminNotes: "",
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("dmvv_franchise_applications") || "[]",
      );
      const updated = [...existing, newApp];
      localStorage.setItem(
        "dmvv_franchise_applications",
        JSON.stringify(updated),
      );
      const { saveToBackend } = await import("@/utils/BackendDataService");
      await saveToBackend("dmvv_franchise_applications", updated);
    } catch {}

    setSubmittedApp({ name: fullName.trim(), id: appId });
    setShowSuccessModal(true);
    setSubmitting(false);

    // Reset form
    setFullName("");
    setFatherName("");
    setDob("");
    setGender("");
    setPhone("");
    setEmail("");
    setAddress("");
    setDistrict("");
    setState("");
    setPincode("");
    setAadhaar("");
    setPan("");
    setBankAccount("");
    setIfsc("");
    setBankName("");
    setPassportPhoto("");
    setAadhaarDoc("");
    setPanDoc("");
    setAdditionalDoc("");
    setCategory("");
    setPlan("");
  };

  const planColors: Record<string, string> = {
    blue: "border-blue-400 bg-blue-50",
    green: "border-green-500 bg-green-50",
    orange: "border-orange-400 bg-orange-50",
  };
  const planBadge: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              DMVV Bhartiy Mahila Shakti Foundation
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
            {data.hero.title}
          </h1>
          <p className="text-green-100 text-base md:text-lg mb-2">
            {data.hero.subtitle}
          </p>
          <p className="text-green-200 text-sm max-w-2xl mx-auto mb-8">
            {data.hero.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#apply">
              <Button className="bg-white text-green-800 hover:bg-green-50 font-bold px-6 py-3">
                <Handshake size={18} className="mr-2" /> Apply for Franchise
              </Button>
            </a>
            <a href="#plans">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold px-6 py-3"
              >
                <IndianRupee size={18} className="mr-2" /> View Plans & Charges
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-orange-500 py-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-white text-sm font-semibold">
            <div className="flex items-center gap-2">
              <Factory size={16} /> 8+ Product Categories
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} /> ₹75K–₹2.4L Investment
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} /> 200+ Active Franchisees
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} /> Work Starts in 7–30 Days
            </div>
          </div>
        </div>
      </section>

      {/* Machines */}
      <section className="py-12 px-4 bg-white" id="machines">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Settings2 size={12} /> Machines & Equipment
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Available Machines for Your Franchise
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.machines.map((m) => (
              <Card
                key={m.id}
                className="border border-green-100 hover:shadow-md transition-shadow"
              >
                {m.photo && (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                )}
                {!m.photo && (
                  <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center rounded-t-lg">
                    <Settings2 size={36} className="text-green-400" />
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900">{m.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{m.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-green-700 font-bold text-sm">
                    <IndianRupee size={14} />
                    {m.rate.replace("₹", "")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Raw Materials */}
      <section className="py-12 px-4 bg-gray-50" id="rawmaterial">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Box size={12} /> Raw Materials
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Raw Material Price List
            </h2>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-700">
                        Material
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700">
                        Unit
                      </th>
                      <th className="text-right p-3 font-semibold text-gray-700">
                        Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rawMaterials.map((rm, i) => (
                      <tr
                        key={rm.id}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="p-3 text-gray-800">{rm.name}</td>
                        <td className="p-3 text-gray-500">{rm.unit}</td>
                        <td className="p-3 text-right font-semibold text-green-700">
                          {rm.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blueprint */}
      <section className="py-12 px-4 bg-white" id="blueprint">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <BarChart3 size={12} /> Production Blueprint
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Production Process Flowchart
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.blueprint.map((step) => (
              <div
                key={step.id}
                className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section
        className="py-12 px-4 bg-gradient-to-r from-green-800 to-green-700 text-white"
        id="roadmap"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
              <ChevronRight size={12} /> Launch Roadmap
            </div>
            <h2 className="text-2xl font-extrabold">Your Path to Launch</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.roadmap.map((step) => (
              <div
                key={step.id}
                className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-white text-green-800 text-xs font-bold rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                </div>
                <h3 className="font-bold text-white">{step.title}</h3>
                <p className="text-green-200 text-xs mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charges */}
      <section className="py-12 px-4 bg-white" id="charges">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <IndianRupee size={12} /> Franchise Charges
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Complete Investment Breakdown
            </h2>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-yellow-50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-700">
                        Charge Item
                      </th>
                      <th className="text-right p-3 font-semibold text-gray-700">
                        Amount
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.charges.map((c, i) => (
                      <tr
                        key={c.id}
                        className={`${
                          i === data.charges.length - 1
                            ? "bg-yellow-50 font-bold"
                            : i % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50"
                        }`}
                      >
                        <td className="p-3 text-gray-800">{c.item}</td>
                        <td className="p-3 text-right text-green-700 font-semibold">
                          {c.amount}
                        </td>
                        <td className="p-3 text-gray-500 text-xs">{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Marketing Support */}
      <section className="py-12 px-4 bg-gray-50" id="marketing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Megaphone size={12} /> Marketing Support
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              What We Provide
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.marketingSupport.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 border border-purple-100 hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Megaphone size={16} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12 px-4 bg-white" id="plans">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <TrendingUp size={12} /> Investment Plans
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Choose Your Franchise Plan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.plans.map((p) => (
              <Card
                key={p.id}
                className={`border-2 ${
                  planColors[p.color] || "border-gray-200"
                } relative`}
              >
                {p.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-600 text-white px-3">
                      Recommended
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit ${
                      planBadge[p.color] || ""
                    }`}
                  >
                    {p.name}
                  </span>
                  <div className="text-2xl font-extrabold text-gray-900">
                    {p.price}
                  </div>
                  <div className="text-xs text-gray-500">{p.duration}</div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1 mb-4">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs text-gray-700"
                      >
                        <CheckCircle2
                          size={12}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#apply">
                    <Button
                      className="w-full text-xs"
                      variant={p.recommended ? "default" : "outline"}
                    >
                      Apply for This Plan
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section className="py-12 px-4 bg-gray-50" id="packaging">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Package size={12} /> Product Packaging
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Packaging Standards
            </h2>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-teal-50">
                    <tr>
                      {[
                        "Product",
                        "Packaging Type",
                        "Size",
                        "Weight",
                        "Qty/Box",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left p-3 font-semibold text-gray-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.packaging.map((pkg, i) => (
                      <tr
                        key={pkg.id}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="p-3 font-medium text-gray-800">
                          {pkg.product}
                        </td>
                        <td className="p-3 text-gray-600">{pkg.type}</td>
                        <td className="p-3 text-gray-600">{pkg.size}</td>
                        <td className="p-3 text-gray-600">{pkg.weight}</td>
                        <td className="p-3 text-gray-600">{pkg.qtyPerBox}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 px-4 bg-white" id="programs">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Award size={12} /> Franchise Categories
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Available Franchise Programs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-orange-50 border border-orange-100 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Factory size={16} className="text-white" />
                  </div>
                  {prog.badge && (
                    <Badge className="bg-orange-500 text-white text-xs">
                      {prog.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{prog.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{prog.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ─── Franchise Application Form ──────────────────────────────────────── */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-green-800 to-green-900"
        id="apply"
        data-ocid="franchise.section"
      >
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              <Handshake size={15} /> Apply for Franchise
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Franchise Application Form
            </h2>
            <p className="text-green-200 mt-2 text-sm">
              Fill all required details. Our team will contact you within 48
              hours after reviewing your application.
            </p>
          </div>

          <form onSubmit={handleApply} noValidate>
            <div className="space-y-6">
              {/* Section 1 — Basic Details */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="pb-3 border-b border-green-100">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    <User size={18} className="text-green-600" />
                    Basic Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        data-ocid="franchise.input"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Father&apos;s Name{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Father's full name"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Date of Birth <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger data-ocid="franchise.select">
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
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        placeholder="your@email.com (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Full Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        placeholder="House no., Street, Village/Ward, Block"
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        data-ocid="franchise.textarea"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        District <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Your district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {INDIAN_STATES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Pincode <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="6-digit pincode"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) =>
                          setPincode(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2 — KYC Details */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="pb-3 border-b border-blue-100">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    <FileText size={18} className="text-blue-600" />
                    KYC &amp; Bank Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Aadhaar Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="12-digit Aadhaar number"
                        maxLength={12}
                        value={aadhaar}
                        onChange={(e) =>
                          setAadhaar(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        PAN Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Bank Account Number
                      </Label>
                      <Input
                        placeholder="Account number"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        IFSC Code
                      </Label>
                      <Input
                        placeholder="e.g. SBIN0001234"
                        value={ifsc}
                        onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Bank Name
                      </Label>
                      <Input
                        placeholder="Name of your bank"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3 — Document Upload */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="pb-3 border-b border-orange-100">
                  <CardTitle className="flex items-center gap-2 text-orange-800 text-base">
                    <Upload size={18} className="text-orange-600" />
                    Document Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FileUploadField
                      label="Passport Size Photo"
                      required
                      value={passportPhoto}
                      onChange={setPassportPhoto}
                      accept="image/*"
                    />
                    <FileUploadField
                      label="Aadhaar Card"
                      required
                      value={aadhaarDoc}
                      onChange={setAadhaarDoc}
                    />
                    <FileUploadField
                      label="PAN Card"
                      value={panDoc}
                      onChange={setPanDoc}
                    />
                    <FileUploadField
                      label="Additional Document (optional)"
                      value={additionalDoc}
                      onChange={setAdditionalDoc}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section 4 — Franchise Selection */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="pb-3 border-b border-green-100">
                  <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                    <Building2 size={18} className="text-green-600" />
                    Franchise Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Franchise Category{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger data-ocid="franchise.select">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {data.programs.map((prog) => (
                            <SelectItem key={prog.id} value={prog.name}>
                              {prog.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium mb-1 block">
                        Investment Plan <span className="text-red-500">*</span>
                      </Label>
                      <Select value={plan} onValueChange={setPlan}>
                        <SelectTrigger data-ocid="franchise.select">
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {INVESTMENT_PLANS.map((ip) => (
                            <SelectItem key={ip.value} value={ip.value}>
                              {ip.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Franchise Fee Display */}
                  {plan && selectedPlanFee && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <IndianRupee size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                            Franchise Fee for {plan}
                          </div>
                          <div className="text-2xl font-extrabold text-green-800">
                            {selectedPlanFee}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            Payment to be made after admin approval process
                            begins
                          </div>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="text-xs text-gray-600">
                        <strong>Charges included:</strong>{" "}
                        {data.charges
                          .slice(0, 4)
                          .map((c) => c.item)
                          .join(" • ")}
                      </div>
                    </div>
                  )}

                  {/* Full Charges Summary */}
                  {data.charges.length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                        Complete Franchise Charges Breakdown
                      </div>
                      <div className="space-y-1">
                        {data.charges.map((c) => (
                          <div
                            key={c.id}
                            className="flex items-center justify-between text-xs py-1.5 px-2 rounded bg-gray-50"
                          >
                            <span className="text-gray-700">{c.item}</span>
                            <span className="font-semibold text-green-700">
                              {c.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Error */}
              {formError && (
                <div
                  className="bg-red-50 border border-red-300 text-red-700 text-sm px-4 py-3 rounded-xl"
                  data-ocid="franchise.error_state"
                >
                  ⚠️ {formError}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-green-800 hover:bg-green-50 font-extrabold py-4 text-base shadow-2xl"
                data-ocid="franchise.submit_button"
              >
                <Handshake size={18} className="mr-2" />
                {submitting
                  ? "Submitting Application..."
                  : "Submit Franchise Application"}
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-6 text-green-200 text-xs">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-green-400" /> Secure
                  &amp; Confidential
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-green-400" /> KYC
                  Verified Process
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-yellow-400" /> 4.8★ Franchise
                  Rating
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ─── Success Modal ─────────────────────────────────────────────────────── */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="franchise.dialog"
        >
          <DialogHeader>
            <div className="flex flex-col items-center text-center mb-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 size={36} className="text-green-600" />
              </div>
              <DialogTitle className="text-xl font-extrabold text-gray-900">
                Application Submitted Successfully!
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                Thank you for applying for DMVV Anshika Udhyog Centre Franchise
              </p>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* Applicant Info */}
            {submittedApp && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-xs text-gray-500">Applicant</div>
                <div className="font-bold text-gray-900">
                  {submittedApp.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Application ID:{" "}
                  <span className="font-mono font-semibold">
                    {submittedApp.id}
                  </span>
                </div>
              </div>
            )}

            {/* Main Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 space-y-2">
              <p>
                Your franchise application has been received and is{" "}
                <strong>under review</strong>.
              </p>
              <p>
                After <strong>Franchise Fee Payment</strong> is confirmed and
                verified, your application will be reviewed and{" "}
                <strong>approved by the Admin team</strong>.
              </p>
              <div className="bg-white border border-blue-100 rounded-lg p-3 mt-2">
                <div className="font-semibold text-gray-800 mb-1">
                  Your work process will begin within:
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 size={14} />
                  <span>
                    <strong>Minimum Time:</strong> 7 Working Days
                  </span>
                </div>
                <div className="flex items-center gap-2 text-orange-600 mt-1">
                  <CheckCircle2 size={14} />
                  <span>
                    <strong>Maximum Time:</strong> 30 Working Days
                  </span>
                </div>
              </div>
            </div>

            {/* Franchise Categories */}
            <div>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                Available Franchise Categories:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {data.programs.map((prog) => (
                  <div
                    key={prog.id}
                    className="bg-orange-50 border border-orange-100 rounded-lg p-2"
                  >
                    <div className="text-xs font-semibold text-gray-800">
                      {prog.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {prog.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button
              className="w-full bg-green-700 hover:bg-green-800 text-white"
              onClick={() => setShowSuccessModal(false)}
              data-ocid="franchise.close_button"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
