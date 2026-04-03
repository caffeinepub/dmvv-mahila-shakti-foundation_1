import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  BarChart3,
  Box,
  CheckCircle2,
  ChevronRight,
  Factory,
  Handshake,
  IndianRupee,
  MapPin,
  Megaphone,
  Package,
  Phone,
  Settings2,
  Star,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DEFAULT_DATA = {
  hero: {
    title: "Anshika Udhyog Centre — Franchise Program",
    subtitle: "अपना खुद का उद्योग शुरू करें — स्वरोजगार की राह पर चलें",
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
  const [data, _setData] = useState(() => {
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
  return data;
}

export default function FranchisePage() {
  const data = useLocalFranchiseData();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    district: "",
    state: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Naam aur phone number bharna zaroori hai");
      return;
    }
    setSubmitting(true);
    const apps = JSON.parse(
      localStorage.getItem("dmvv_franchise_applications") || "[]",
    );
    apps.push({
      ...form,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("hi-IN"),
    });
    localStorage.setItem("dmvv_franchise_applications", JSON.stringify(apps));
    toast.success(
      "Aapka application submit ho gaya! Hamari team jald contact karegi.",
    );
    setForm({ name: "", phone: "", district: "", state: "", message: "" });
    setSubmitting(false);
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
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Anshika Udhyog Centre
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
            {data.hero.title}
          </h1>
          <p className="text-green-200 text-lg md:text-xl font-medium mb-2">
            {data.hero.subtitle}
          </p>
          <p className="text-green-100 text-sm md:text-base max-w-3xl mx-auto mb-8">
            {data.hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#apply">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 text-lg rounded-lg shadow-lg">
                <Handshake size={18} className="mr-2" /> Franchise Ke Liye Apply
                Karein
              </Button>
            </a>
            <a href="#plans">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-800 font-semibold px-6 py-3 text-base rounded-lg"
              >
                <BarChart3 size={16} className="mr-2" /> Plans Dekhein
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-orange-500 py-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-white px-4">
          <div>
            <div className="font-extrabold text-2xl">500+</div>
            <div className="text-xs text-orange-100">Franchise Centers</div>
          </div>
          <div>
            <div className="font-extrabold text-2xl">8+</div>
            <div className="text-xs text-orange-100">Udhyog Programs</div>
          </div>
          <div>
            <div className="font-extrabold text-2xl">25+</div>
            <div className="text-xs text-orange-100">States Active</div>
          </div>
          <div>
            <div className="font-extrabold text-2xl">₹75K+</div>
            <div className="text-xs text-orange-100">Entry Investment</div>
          </div>
        </div>
      </section>

      {/* Machines Section */}
      <section className="py-12 px-4 bg-white" id="machines">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Settings2 size={14} /> Machine Details
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Machines & Equipment
            </h2>
            <p className="text-gray-500 mt-2">
              Franchise ke saath milne wali machines ki photo, description aur
              rate
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.machines.map((m) => (
              <Card
                key={m.id}
                className="border border-blue-100 hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg flex items-center justify-center overflow-hidden">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <Settings2 size={56} className="text-blue-300" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{m.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{m.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Rate / Price</span>
                    <span className="font-extrabold text-green-700 text-lg">
                      {m.rate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Raw Material Section */}
      <section className="py-12 px-4 bg-gray-50" id="rawmaterial">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Package size={14} /> Raw Material
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Raw Material Details & Rate
            </h2>
            <p className="text-gray-500 mt-2">
              Sabhi kachcha maal ki list, unit aur current rate
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-yellow-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead className="bg-yellow-50 text-yellow-800">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">#</th>
                  <th className="px-4 py-3 text-left font-bold">
                    Raw Material Name
                  </th>
                  <th className="px-4 py-3 text-center font-bold">Unit</th>
                  <th className="px-4 py-3 text-right font-bold">Rate</th>
                </tr>
              </thead>
              <tbody>
                {data.rawMaterials.map((rm, idx) => (
                  <tr
                    key={rm.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-yellow-50/40"}
                  >
                    <td className="px-4 py-3 text-gray-400 font-medium">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {rm.name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary" className="text-xs">
                        {rm.unit}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-green-700">
                      {rm.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Production Blueprint */}
      <section className="py-12 px-4 bg-white" id="blueprint">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Factory size={14} /> Production Blueprint
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Production Blueprint
            </h2>
            <p className="text-gray-500 mt-2">
              Step-by-step production process for Anshika Udhyog products
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-6 top-6 bottom-6 w-0.5 bg-purple-200" />
            <div className="space-y-5">
              {data.blueprint.map((b, idx) => (
                <div key={b.id} className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md z-10">
                    {b.step}
                  </div>
                  <div className="flex-1 bg-purple-50 border border-purple-100 rounded-xl p-4">
                    <h4 className="font-bold text-purple-900 mb-1">
                      {b.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{b.description}</p>
                  </div>
                  {idx < data.blueprint.length - 1 && (
                    <ChevronRight
                      size={16}
                      className="absolute left-5.5 top-14 text-purple-400 md:hidden"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Roadmap */}
      <section
        className="py-12 px-4 bg-gradient-to-br from-green-50 to-teal-50"
        id="roadmap"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <TrendingUp size={14} /> Franchise Roadmap
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Franchise Roadmap
            </h2>
            <p className="text-gray-500 mt-2">
              Franchise lene se launch tak ka pura safar — sirf 30 din mein
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.roadmap.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-teal-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-extrabold text-base flex-shrink-0">
                    {r.step}
                  </span>
                  <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {r.duration}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{r.title}</h4>
                <p className="text-gray-500 text-sm">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Charges */}
      <section className="py-12 px-4 bg-white" id="charges">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <IndianRupee size={14} /> Franchise Charges
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Franchise Investment Breakdown
            </h2>
            <p className="text-gray-500 mt-2">Pura kharcha ek nazar mein</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-red-100 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead className="bg-red-50 text-red-800">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Item</th>
                  <th className="px-4 py-3 text-right font-bold">Amount</th>
                  <th className="px-4 py-3 text-left font-bold hidden md:table-cell">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.charges.map((c, idx) => (
                  <tr
                    key={c.id}
                    className={`${idx === data.charges.length - 1 ? "bg-red-50 font-bold text-red-900" : idx % 2 === 0 ? "bg-white" : "bg-red-50/30"}`}
                  >
                    <td className="px-4 py-3">{c.item}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-bold">
                      {c.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">
                      {c.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Marketing Support */}
      <section className="py-12 px-4 bg-gray-50" id="marketing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Megaphone size={14} /> Marketing Support
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Marketing Support
            </h2>
            <p className="text-gray-500 mt-2">
              Hamari taraf se franchise partners ko milne wala support
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.marketingSupport.map((ms) => (
              <div
                key={ms.id}
                className="bg-white border border-pink-100 rounded-xl p-5 flex gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-pink-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{ms.title}</h4>
                  <p className="text-gray-500 text-sm">{ms.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Plans */}
      <section className="py-12 px-4 bg-white" id="plans">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Award size={14} /> Franchise Plans
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Franchise Plans
            </h2>
            <p className="text-gray-500 mt-2">
              Apni zaroorat aur budget ke hisaab se plan chunein
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.plans.map((plan) => (
              <div
                key={plan.id}
                className={`border-2 rounded-2xl p-6 relative ${planColors[plan.color] || "border-gray-200 bg-gray-50"} ${plan.recommended ? "scale-105 shadow-xl" : "shadow-sm"} transition-all`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                <div
                  className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${planBadge[plan.color] || "bg-gray-100 text-gray-700"}`}
                >
                  {plan.name}
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-1">
                  {plan.price}
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  Valid for {plan.duration}
                </div>
                <Separator className="mb-4" />
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-green-500 flex-shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#apply">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold">
                    Is Plan Ke Liye Apply Karein
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Packaging */}
      <section className="py-12 px-4 bg-gray-50" id="packaging">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Box size={14} /> Product Packaging
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Product Packaging Details
            </h2>
            <p className="text-gray-500 mt-2">
              Har product ki packaging type, size aur quantity details
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-indigo-100 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50 text-indigo-800">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Product</th>
                  <th className="px-4 py-3 text-left font-bold">
                    Packaging Type
                  </th>
                  <th className="px-4 py-3 text-center font-bold">Size</th>
                  <th className="px-4 py-3 text-center font-bold">Weight</th>
                  <th className="px-4 py-3 text-center font-bold">Qty/Box</th>
                </tr>
              </thead>
              <tbody>
                {data.packaging.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-indigo-50/30"}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {p.product}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.type}</td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {p.size}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {p.weight}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className="text-xs">
                        {p.qtyPerBox}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* All Udhyog Programs */}
      <section className="py-12 px-4 bg-white" id="programs">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Zap size={14} /> Udhyog Programs
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Anshika Udhyog — Sab Programs
            </h2>
            <p className="text-gray-500 mt-2">
              Har franchise centre mein yeh programs available hain
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.programs.map((p) => (
              <div
                key={p.id}
                className="bg-orange-50 border border-orange-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <Factory
                    size={22}
                    className="text-orange-500 flex-shrink-0"
                  />
                  {p.badge && (
                    <Badge className="text-xs bg-orange-500 text-white">
                      {p.badge}
                    </Badge>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">
                  {p.name}
                </h4>
                <p className="text-gray-500 text-xs">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-green-700 to-green-900"
        id="apply"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Handshake size={14} /> Franchise Apply
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Franchise Ke Liye Apply Karein
            </h2>
            <p className="text-green-200 mt-2">
              Form bharo, hamari team 48 ghante mein contact karegi
            </p>
          </div>
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleApply} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 font-medium mb-1 block">
                      Pura Naam *
                    </Label>
                    <div className="relative">
                      <User
                        size={14}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <Input
                        className="pl-9"
                        placeholder="Aapka pura naam"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium mb-1 block">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone
                        size={14}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <Input
                        className="pl-9"
                        placeholder="10 digit mobile number"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium mb-1 block">
                      District
                    </Label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <Input
                        className="pl-9"
                        placeholder="Aapka district"
                        value={form.district}
                        onChange={(e) =>
                          setForm({ ...form, district: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium mb-1 block">
                      State
                    </Label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <Input
                        className="pl-9"
                        placeholder="Aapka state"
                        value={form.state}
                        onChange={(e) =>
                          setForm({ ...form, state: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700 font-medium mb-1 block">
                    Message / Query
                  </Label>
                  <Textarea
                    placeholder="Koi bhi sawaal ya details yahan likhein..."
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 text-base"
                >
                  <Handshake size={16} className="mr-2" />{" "}
                  {submitting
                    ? "Submit Ho Raha Hai..."
                    : "Application Submit Karein"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-green-200 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-300" /> Free
              Consultation
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-300" /> No Hidden
              Charges
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400" /> 4.8★ Franchise
              Rating
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
