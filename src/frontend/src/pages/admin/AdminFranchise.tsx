import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Box,
  ChevronDown,
  ChevronUp,
  Edit2,
  Factory,
  FileText,
  Handshake,
  Image as ImageIcon,
  IndianRupee,
  Megaphone,
  Package,
  Plus,
  Save,
  Settings2,
  Trash2,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  ],
  rawMaterials: [
    { id: "1", name: "Bamboo Powder", unit: "KG", rate: "₹25" },
    { id: "2", name: "Charcoal Powder", unit: "KG", rate: "₹18" },
    { id: "3", name: "Jigat Powder", unit: "KG", rate: "₹40" },
  ],
  blueprint: [
    {
      id: "1",
      step: 1,
      title: "Raw Material Procurement",
      description: "Source quality raw materials from approved suppliers",
    },
    {
      id: "2",
      step: 2,
      title: "Quality Testing",
      description: "Inspect and sort all incoming raw materials",
    },
    {
      id: "3",
      step: 3,
      title: "Machine Processing",
      description: "Feed materials into machines for processing",
    },
  ],
  roadmap: [
    {
      id: "1",
      step: 1,
      title: "Inquiry & Application",
      description: "Fill franchise inquiry form",
      duration: "Day 1–2",
    },
    {
      id: "2",
      step: 2,
      title: "Eligibility Check",
      description: "Team visits your location",
      duration: "Day 3–5",
    },
    {
      id: "3",
      step: 3,
      title: "Agreement Signing",
      description: "Sign the franchise agreement",
      duration: "Day 6–10",
    },
  ],
  charges: [
    {
      id: "1",
      item: "Franchise Registration Fee",
      amount: "₹5,000",
      note: "One-time",
    },
    {
      id: "2",
      item: "Machine & Equipment Cost",
      amount: "₹50,000 – ₹2,00,000",
      note: "Varies by product",
    },
  ],
  marketingSupport: [
    {
      id: "1",
      title: "Digital Marketing",
      description: "Social media and WhatsApp campaigns",
    },
    {
      id: "2",
      title: "Branding Kit",
      description: "Flex banners, boards, visiting cards",
    },
  ],
  plans: [
    {
      id: "1",
      name: "Starter Plan",
      price: "₹75,000",
      duration: "1 Year",
      color: "blue",
      features: ["1 Machine", "Basic Training", "Branding Board"],
      recommended: false,
    },
    {
      id: "2",
      name: "Standard Plan",
      price: "₹1,40,000",
      duration: "2 Years",
      color: "green",
      features: ["2 Machines", "5-Day Training", "Full Branding Kit"],
      recommended: true,
    },
    {
      id: "3",
      name: "Premium Plan",
      price: "₹2,40,000",
      duration: "3 Years",
      color: "orange",
      features: ["3–4 Machines", "10-Day Training", "Digital Marketing"],
      recommended: false,
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
  ],
  programs: [
    {
      id: "1",
      name: "Agarbatti Udhyog",
      description: "Incense stick manufacturing",
      badge: "Popular",
    },
    {
      id: "2",
      name: "Papad Udhyog",
      description: "Traditional papad making",
      badge: "",
    },
    {
      id: "3",
      name: "Masala Udhyog",
      description: "Spice grinding and packaging",
      badge: "",
    },
  ],
};

type FranchiseData = typeof DEFAULT_DATA;

function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved) as T;
    } catch {}
    return initial;
  });
  const set = (v: T) => {
    setState(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  return [state, set];
}

function genId() {
  return Date.now().toString();
}

export default function AdminFranchise() {
  const [data, setData] = useLocalStorage<FranchiseData>(
    "dmvv_franchise_data",
    DEFAULT_DATA,
  );
  const [applications, _setApplications] = useLocalStorage<
    {
      id: string;
      name: string;
      phone: string;
      district: string;
      state: string;
      message: string;
      date: string;
    }[]
  >("dmvv_franchise_applications", []);

  // Hero edit
  const [heroEdit, setHeroEdit] = useState(data.hero);

  // Machine form
  const [machineForm, setMachineForm] = useState({
    id: "",
    name: "",
    description: "",
    rate: "",
    photo: "",
  });
  const [machineEditing, setMachineEditing] = useState(false);

  // Raw material form
  const [rmForm, setRmForm] = useState({
    id: "",
    name: "",
    unit: "",
    rate: "",
  });
  const [rmEditing, setRmEditing] = useState(false);

  // Blueprint form
  const [bpForm, setBpForm] = useState({
    id: "",
    step: 0,
    title: "",
    description: "",
  });
  const [bpEditing, setBpEditing] = useState(false);

  // Roadmap form
  const [roadmapForm, setRoadmapForm] = useState({
    id: "",
    step: 0,
    title: "",
    description: "",
    duration: "",
  });
  const [roadmapEditing, setRoadmapEditing] = useState(false);

  // Charges form
  const [chargeForm, setChargeForm] = useState({
    id: "",
    item: "",
    amount: "",
    note: "",
  });
  const [chargeEditing, setChargeEditing] = useState(false);

  // Marketing form
  const [msForm, setMsForm] = useState({ id: "", title: "", description: "" });
  const [msEditing, setMsEditing] = useState(false);

  // Plans form
  const [planForm, setPlanForm] = useState({
    id: "",
    name: "",
    price: "",
    duration: "",
    color: "green",
    features: "",
    recommended: false,
  });
  const [planEditing, setPlanEditing] = useState(false);

  // Packaging form
  const [pkgForm, setPkgForm] = useState({
    id: "",
    product: "",
    type: "",
    size: "",
    weight: "",
    qtyPerBox: "",
  });
  const [pkgEditing, setPkgEditing] = useState(false);

  // Program form
  const [progForm, setProgForm] = useState({
    id: "",
    name: "",
    description: "",
    badge: "",
  });
  const [progEditing, setProgEditing] = useState(false);

  const saveHero = () => {
    setData({ ...data, hero: heroEdit });
    toast.success("Hero section updated!");
  };

  // --- Machine helpers ---
  const startMachineEdit = (m: (typeof data.machines)[0]) => {
    setMachineForm({ ...m });
    setMachineEditing(true);
  };
  const saveMachine = () => {
    if (!machineForm.name || !machineForm.rate) {
      toast.error("Name and rate are required");
      return;
    }
    if (machineEditing && machineForm.id) {
      setData({
        ...data,
        machines: data.machines.map((m) =>
          m.id === machineForm.id ? machineForm : m,
        ),
      });
    } else {
      setData({
        ...data,
        machines: [...data.machines, { ...machineForm, id: genId() }],
      });
    }
    setMachineForm({ id: "", name: "", description: "", rate: "", photo: "" });
    setMachineEditing(false);
    toast.success("Machine saved!");
  };
  const deleteMachine = (id: string) => {
    setData({ ...data, machines: data.machines.filter((m) => m.id !== id) });
    toast.success("Machine deleted!");
  };
  const handleMachinePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setMachineForm((f) => ({ ...f, photo: reader.result as string }));
    reader.readAsDataURL(file);
  };

  // --- Raw Material helpers ---
  const saveRm = () => {
    if (!rmForm.name || !rmForm.rate) {
      toast.error("Name and rate are required");
      return;
    }
    if (rmEditing && rmForm.id) {
      setData({
        ...data,
        rawMaterials: data.rawMaterials.map((r) =>
          r.id === rmForm.id ? rmForm : r,
        ),
      });
    } else {
      setData({
        ...data,
        rawMaterials: [...data.rawMaterials, { ...rmForm, id: genId() }],
      });
    }
    setRmForm({ id: "", name: "", unit: "", rate: "" });
    setRmEditing(false);
    toast.success("Raw material saved!");
  };

  // --- Blueprint helpers ---
  const saveBp = () => {
    if (!bpForm.title) {
      toast.error("Title is required");
      return;
    }
    const stepNum =
      bpEditing && bpForm.id ? bpForm.step : data.blueprint.length + 1;
    if (bpEditing && bpForm.id) {
      setData({
        ...data,
        blueprint: data.blueprint.map((b) =>
          b.id === bpForm.id ? { ...bpForm } : b,
        ),
      });
    } else {
      setData({
        ...data,
        blueprint: [
          ...data.blueprint,
          { ...bpForm, id: genId(), step: stepNum },
        ],
      });
    }
    setBpForm({ id: "", step: 0, title: "", description: "" });
    setBpEditing(false);
    toast.success("Blueprint step saved!");
  };

  // --- Roadmap helpers ---
  const saveRoadmap = () => {
    if (!roadmapForm.title) {
      toast.error("Title is required");
      return;
    }
    const stepNum =
      roadmapEditing && roadmapForm.id
        ? roadmapForm.step
        : data.roadmap.length + 1;
    if (roadmapEditing && roadmapForm.id) {
      setData({
        ...data,
        roadmap: data.roadmap.map((r) =>
          r.id === roadmapForm.id ? { ...roadmapForm } : r,
        ),
      });
    } else {
      setData({
        ...data,
        roadmap: [
          ...data.roadmap,
          { ...roadmapForm, id: genId(), step: stepNum },
        ],
      });
    }
    setRoadmapForm({
      id: "",
      step: 0,
      title: "",
      description: "",
      duration: "",
    });
    setRoadmapEditing(false);
    toast.success("Roadmap step saved!");
  };

  // --- Charge helpers ---
  const saveCharge = () => {
    if (!chargeForm.item || !chargeForm.amount) {
      toast.error("Item and amount are required");
      return;
    }
    if (chargeEditing && chargeForm.id) {
      setData({
        ...data,
        charges: data.charges.map((c) =>
          c.id === chargeForm.id ? chargeForm : c,
        ),
      });
    } else {
      setData({
        ...data,
        charges: [...data.charges, { ...chargeForm, id: genId() }],
      });
    }
    setChargeForm({ id: "", item: "", amount: "", note: "" });
    setChargeEditing(false);
    toast.success("Charge saved!");
  };

  // --- Marketing Support helpers ---
  const saveMs = () => {
    if (!msForm.title) {
      toast.error("Title is required");
      return;
    }
    if (msEditing && msForm.id) {
      setData({
        ...data,
        marketingSupport: data.marketingSupport.map((m) =>
          m.id === msForm.id ? msForm : m,
        ),
      });
    } else {
      setData({
        ...data,
        marketingSupport: [
          ...data.marketingSupport,
          { ...msForm, id: genId() },
        ],
      });
    }
    setMsForm({ id: "", title: "", description: "" });
    setMsEditing(false);
    toast.success("Marketing support saved!");
  };

  // --- Plan helpers ---
  const savePlan = () => {
    if (!planForm.name || !planForm.price) {
      toast.error("Name and price are required");
      return;
    }
    const features = planForm.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    if (planEditing && planForm.id) {
      setData({
        ...data,
        plans: data.plans.map((p) =>
          p.id === planForm.id ? { ...planForm, features } : p,
        ),
      });
    } else {
      setData({
        ...data,
        plans: [...data.plans, { ...planForm, id: genId(), features }],
      });
    }
    setPlanForm({
      id: "",
      name: "",
      price: "",
      duration: "",
      color: "green",
      features: "",
      recommended: false,
    });
    setPlanEditing(false);
    toast.success("Plan saved!");
  };

  // --- Packaging helpers ---
  const savePkg = () => {
    if (!pkgForm.product) {
      toast.error("Product name is required");
      return;
    }
    if (pkgEditing && pkgForm.id) {
      setData({
        ...data,
        packaging: data.packaging.map((p) =>
          p.id === pkgForm.id ? pkgForm : p,
        ),
      });
    } else {
      setData({
        ...data,
        packaging: [...data.packaging, { ...pkgForm, id: genId() }],
      });
    }
    setPkgForm({
      id: "",
      product: "",
      type: "",
      size: "",
      weight: "",
      qtyPerBox: "",
    });
    setPkgEditing(false);
    toast.success("Packaging detail saved!");
  };

  // --- Program helpers ---
  const saveProg = () => {
    if (!progForm.name) {
      toast.error("Program name is required");
      return;
    }
    if (progEditing && progForm.id) {
      setData({
        ...data,
        programs: data.programs.map((p) =>
          p.id === progForm.id ? progForm : p,
        ),
      });
    } else {
      setData({
        ...data,
        programs: [...data.programs, { ...progForm, id: genId() }],
      });
    }
    setProgForm({ id: "", name: "", description: "", badge: "" });
    setProgEditing(false);
    toast.success("Program saved!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Franchise Page Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Anshika Udhyog Centre — Manage all franchise page content here
          </p>
        </div>
        <a href="/#/franchise" target="_blank" rel="noreferrer">
          <Button variant="outline" className="border-green-600 text-green-700">
            <FileText size={15} className="mr-2" /> Live Page Dekhein
          </Button>
        </a>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex flex-wrap gap-1 h-auto mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="rawmaterial">Raw Material</TabsTrigger>
          <TabsTrigger value="blueprint">Blueprint</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="charges">Charges</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="packaging">Packaging</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        {/* HERO */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake size={18} /> Hero Banner Edit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Main Title</Label>
                <Input
                  value={heroEdit.title}
                  onChange={(e) =>
                    setHeroEdit({ ...heroEdit, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Hindi Subtitle</Label>
                <Input
                  value={heroEdit.subtitle}
                  onChange={(e) =>
                    setHeroEdit({ ...heroEdit, subtitle: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Tagline (English)</Label>
                <Textarea
                  rows={2}
                  value={heroEdit.tagline}
                  onChange={(e) =>
                    setHeroEdit({ ...heroEdit, tagline: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={saveHero}
                className="bg-green-700 text-white hover:bg-green-800"
              >
                <Save size={14} className="mr-2" /> Hero Save Karein
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MACHINES */}
        <TabsContent value="machines">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 size={18} />{" "}
                {machineEditing
                  ? "Machine Edit Karein"
                  : "Nayi Machine Add Karein"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Machine Name *</Label>
                  <Input
                    placeholder="Machine name"
                    value={machineForm.name}
                    onChange={(e) =>
                      setMachineForm({ ...machineForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Rate / Price *</Label>
                  <Input
                    placeholder="e.g. ₹45,000"
                    value={machineForm.rate}
                    onChange={(e) =>
                      setMachineForm({ ...machineForm, rate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  placeholder="Machine ki details"
                  value={machineForm.description}
                  onChange={(e) =>
                    setMachineForm({
                      ...machineForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Machine Photo Upload</Label>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMachinePhoto}
                    className="text-sm"
                  />
                  {machineForm.photo && (
                    <img
                      src={machineForm.photo}
                      alt="preview"
                      className="w-20 h-14 object-cover rounded border"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveMachine}
                  className="bg-green-700 text-white hover:bg-green-800"
                >
                  <Save size={14} className="mr-2" />{" "}
                  {machineEditing ? "Update" : "Add Machine"}
                </Button>
                {machineEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMachineForm({
                        id: "",
                        name: "",
                        description: "",
                        rate: "",
                        photo: "",
                      });
                      setMachineEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {data.machines.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="w-14 h-12 bg-blue-50 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Settings2 size={22} className="text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {m.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {m.description}
                  </div>
                </div>
                <div className="font-bold text-green-700 text-sm">{m.rate}</div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    startMachineEdit(m);
                    setMachineEditing(true);
                  }}
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMachine(m.id)}
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* RAW MATERIAL */}
        <TabsContent value="rawmaterial">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package size={18} />{" "}
                {rmEditing ? "Edit Raw Material" : "Add New Raw Material"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>Name *</Label>
                  <Input
                    placeholder="Material name"
                    value={rmForm.name}
                    onChange={(e) =>
                      setRmForm({ ...rmForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Unit (KG/LITRE/PCS)</Label>
                  <Input
                    placeholder="KG"
                    value={rmForm.unit}
                    onChange={(e) =>
                      setRmForm({ ...rmForm, unit: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Rate *</Label>
                  <Input
                    placeholder="₹25"
                    value={rmForm.rate}
                    onChange={(e) =>
                      setRmForm({ ...rmForm, rate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveRm}
                  className="bg-yellow-600 text-white hover:bg-yellow-700"
                >
                  <Save size={14} className="mr-2" />
                  {rmEditing ? "Update" : "Add"}
                </Button>
                {rmEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRmForm({ id: "", name: "", unit: "", rate: "" });
                      setRmEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-2 text-left">Naam</th>
                  <th className="px-4 py-2 text-center">Unit</th>
                  <th className="px-4 py-2 text-right">Rate</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.rawMaterials.map((rm) => (
                  <tr key={rm.id} className="border-t">
                    <td className="px-4 py-2 font-medium">{rm.name}</td>
                    <td className="px-4 py-2 text-center">
                      <Badge variant="secondary">{rm.unit}</Badge>
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-green-700">
                      {rm.rate}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setRmForm({ ...rm });
                            setRmEditing(true);
                          }}
                        >
                          <Edit2 size={13} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setData({
                              ...data,
                              rawMaterials: data.rawMaterials.filter(
                                (r) => r.id !== rm.id,
                              ),
                            })
                          }
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* BLUEPRINT */}
        <TabsContent value="blueprint">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory size={18} /> {bpEditing ? "Edit Step" : "Add New Step"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Step Title *</Label>
                <Input
                  placeholder="e.g. Raw Material Procurement"
                  value={bpForm.title}
                  onChange={(e) =>
                    setBpForm({ ...bpForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={bpForm.description}
                  onChange={(e) =>
                    setBpForm({ ...bpForm, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveBp}
                  className="bg-purple-700 text-white hover:bg-purple-800"
                >
                  <Save size={14} className="mr-2" />
                  {bpEditing ? "Update" : "Add Step"}
                </Button>
                {bpEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setBpForm({
                        id: "",
                        step: 0,
                        title: "",
                        description: "",
                      });
                      setBpEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {data.blueprint.map((b) => (
              <div
                key={b.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <span className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {b.step}
                </span>
                <div className="flex-1">
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-xs text-gray-500">{b.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setBpForm({ ...b });
                    setBpEditing(true);
                  }}
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      blueprint: data.blueprint.filter((x) => x.id !== b.id),
                    })
                  }
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ROADMAP */}
        <TabsContent value="roadmap">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={18} />{" "}
                {roadmapEditing ? "Edit Step" : "Add New Roadmap Step"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Step Title *</Label>
                  <Input
                    placeholder="e.g. Inquiry & Application"
                    value={roadmapForm.title}
                    onChange={(e) =>
                      setRoadmapForm({ ...roadmapForm, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    placeholder="e.g. Day 1–2"
                    value={roadmapForm.duration}
                    onChange={(e) =>
                      setRoadmapForm({
                        ...roadmapForm,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={roadmapForm.description}
                  onChange={(e) =>
                    setRoadmapForm({
                      ...roadmapForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveRoadmap}
                  className="bg-teal-700 text-white hover:bg-teal-800"
                >
                  <Save size={14} className="mr-2" />
                  {roadmapEditing ? "Update" : "Add Step"}
                </Button>
                {roadmapEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRoadmapForm({
                        id: "",
                        step: 0,
                        title: "",
                        description: "",
                        duration: "",
                      });
                      setRoadmapEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {data.roadmap.map((r) => (
              <div
                key={r.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {r.step}
                </span>
                <div className="flex-1">
                  <div className="font-semibold">
                    {r.title}{" "}
                    <span className="text-xs text-teal-600 ml-2">
                      {r.duration}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{r.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRoadmapForm({ ...r });
                    setRoadmapEditing(true);
                  }}
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      roadmap: data.roadmap.filter((x) => x.id !== r.id),
                    })
                  }
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* CHARGES */}
        <TabsContent value="charges">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee size={18} />{" "}
                {chargeEditing ? "Edit Charge" : "Add New Charge"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>Item Name *</Label>
                  <Input
                    placeholder="e.g. Registration Fee"
                    value={chargeForm.item}
                    onChange={(e) =>
                      setChargeForm({ ...chargeForm, item: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Amount *</Label>
                  <Input
                    placeholder="e.g. ₹5,000"
                    value={chargeForm.amount}
                    onChange={(e) =>
                      setChargeForm({ ...chargeForm, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Note</Label>
                  <Input
                    placeholder="Optional note"
                    value={chargeForm.note}
                    onChange={(e) =>
                      setChargeForm({ ...chargeForm, note: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveCharge}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  <Save size={14} className="mr-2" />
                  {chargeEditing ? "Update" : "Add Charge"}
                </Button>
                {chargeEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setChargeForm({ id: "", item: "", amount: "", note: "" });
                      setChargeEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-left">Note</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.charges.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-4 py-2 font-medium">{c.item}</td>
                    <td className="px-4 py-2 text-right font-bold text-green-700">
                      {c.amount}
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-400">
                      {c.note}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setChargeForm({ ...c });
                            setChargeEditing(true);
                          }}
                        >
                          <Edit2 size={13} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setData({
                              ...data,
                              charges: data.charges.filter(
                                (x) => x.id !== c.id,
                              ),
                            })
                          }
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* MARKETING SUPPORT */}
        <TabsContent value="marketing">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone size={18} />{" "}
                {msEditing ? "Edit Item" : "Add New Support Item"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Title *</Label>
                <Input
                  placeholder="e.g. Digital Marketing"
                  value={msForm.title}
                  onChange={(e) =>
                    setMsForm({ ...msForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={msForm.description}
                  onChange={(e) =>
                    setMsForm({ ...msForm, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveMs}
                  className="bg-pink-600 text-white hover:bg-pink-700"
                >
                  <Save size={14} className="mr-2" />
                  {msEditing ? "Update" : "Add"}
                </Button>
                {msEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMsForm({ id: "", title: "", description: "" });
                      setMsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {data.marketingSupport.map((ms) => (
              <div
                key={ms.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-semibold">{ms.title}</div>
                  <div className="text-xs text-gray-500">{ms.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setMsForm({ ...ms });
                    setMsEditing(true);
                  }}
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      marketingSupport: data.marketingSupport.filter(
                        (x) => x.id !== ms.id,
                      ),
                    })
                  }
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* PLANS */}
        <TabsContent value="plans">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={18} /> {planEditing ? "Edit Plan" : "Add New Plan"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Plan Name *</Label>
                  <Input
                    placeholder="e.g. Starter Plan"
                    value={planForm.name}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Price *</Label>
                  <Input
                    placeholder="e.g. ₹75,000"
                    value={planForm.price}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    placeholder="e.g. 1 Year"
                    value={planForm.duration}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, duration: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Color (blue/green/orange)</Label>
                  <Input
                    placeholder="green"
                    value={planForm.color}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, color: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Features (one feature per line)</Label>
                <Textarea
                  rows={4}
                  placeholder={"1 Machine\n5-Day Training\nFull Branding Kit"}
                  value={planForm.features}
                  onChange={(e) =>
                    setPlanForm({ ...planForm, features: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={planForm.recommended}
                  onChange={(e) =>
                    setPlanForm({ ...planForm, recommended: e.target.checked })
                  }
                  id="recommended"
                />
                <Label htmlFor="recommended">
                  Recommended Plan (will be highlighted)
                </Label>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={savePlan}
                  className="bg-green-700 text-white hover:bg-green-800"
                >
                  <Save size={14} className="mr-2" />
                  {planEditing ? "Update" : "Add Plan"}
                </Button>
                {planEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPlanForm({
                        id: "",
                        name: "",
                        price: "",
                        duration: "",
                        color: "green",
                        features: "",
                        recommended: false,
                      });
                      setPlanEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {data.plans.map((plan) => (
              <div
                key={plan.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{plan.name}</span>
                    {plan.recommended && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        Recommended
                      </Badge>
                    )}
                    <span className="text-green-700 font-bold">
                      {plan.price}
                    </span>
                    <span className="text-xs text-gray-400">
                      {plan.duration}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {plan.features.join(" • ")}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setPlanForm({
                      ...plan,
                      features: plan.features.join("\n"),
                    });
                    setPlanEditing(true);
                  }}
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      plans: data.plans.filter((p) => p.id !== plan.id),
                    })
                  }
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* PACKAGING */}
        <TabsContent value="packaging">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box size={18} />{" "}
                {pkgEditing ? "Edit Packaging" : "Add New Packaging Detail"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <Label>Product *</Label>
                  <Input
                    placeholder="Agarbatti"
                    value={pkgForm.product}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, product: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Packaging Type</Label>
                  <Input
                    placeholder="Paper Box"
                    value={pkgForm.type}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, type: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Size</Label>
                  <Input
                    placeholder="19 cm"
                    value={pkgForm.size}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, size: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Weight</Label>
                  <Input
                    placeholder="90g / 200g"
                    value={pkgForm.weight}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, weight: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Qty Per Box</Label>
                  <Input
                    placeholder="12 packets"
                    value={pkgForm.qtyPerBox}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, qtyPerBox: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={savePkg}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Save size={14} className="mr-2" />
                  {pkgEditing ? "Update" : "Add"}
                </Button>
                {pkgEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPkgForm({
                        id: "",
                        product: "",
                        type: "",
                        size: "",
                        weight: "",
                        qtyPerBox: "",
                      });
                      setPkgEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2">Size</th>
                  <th className="px-3 py-2">Weight</th>
                  <th className="px-3 py-2">Qty/Box</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.packaging.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-3 py-2 font-medium">{p.product}</td>
                    <td className="px-3 py-2 text-gray-600">{p.type}</td>
                    <td className="px-3 py-2 text-center">{p.size}</td>
                    <td className="px-3 py-2 text-center">{p.weight}</td>
                    <td className="px-3 py-2 text-center">{p.qtyPerBox}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setPkgForm({ ...p });
                            setPkgEditing(true);
                          }}
                        >
                          <Edit2 size={13} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setData({
                              ...data,
                              packaging: data.packaging.filter(
                                (x) => x.id !== p.id,
                              ),
                            })
                          }
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* PROGRAMS */}
        <TabsContent value="programs">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap size={18} />{" "}
                {progEditing ? "Edit Program" : "Add New Program"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Label>Program Name *</Label>
                  <Input
                    placeholder="e.g. Agarbatti Udhyog"
                    value={progForm.name}
                    onChange={(e) =>
                      setProgForm({ ...progForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Badge (Popular/New)</Label>
                  <Input
                    placeholder="Popular"
                    value={progForm.badge}
                    onChange={(e) =>
                      setProgForm({ ...progForm, badge: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={progForm.description}
                  onChange={(e) =>
                    setProgForm({ ...progForm, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveProg}
                  className="bg-orange-600 text-white hover:bg-orange-700"
                >
                  <Save size={14} className="mr-2" />
                  {progEditing ? "Update" : "Add Program"}
                </Button>
                {progEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setProgForm({
                        id: "",
                        name: "",
                        description: "",
                        badge: "",
                      });
                      setProgEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {data.programs.map((p) => (
              <div
                key={p.id}
                className="flex items-start gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{p.name}</span>
                    {p.badge && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        {p.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{p.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setProgForm({ ...p });
                    setProgEditing(true);
                  }}
                >
                  <Edit2 size={13} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      programs: data.programs.filter((x) => x.id !== p.id),
                    })
                  }
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* APPLICATIONS */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users size={18} /> Franchise Applications
                </span>
                <Badge variant="secondary">{applications.length} Total</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Handshake size={48} className="mx-auto mb-3 opacity-30" />
                  <p>No applications received yet</p>
                  <p className="text-xs mt-1">
                    When someone applies for a franchise, it will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 border border-green-100 rounded-lg bg-green-50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-gray-900">
                            {app.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {app.phone}
                          </div>
                          <div className="text-xs text-gray-400">
                            {app.district}
                            {app.district && app.state ? ", " : ""}
                            {app.state}
                          </div>
                          {app.message && (
                            <div className="mt-1 text-sm text-gray-500 italic">
                              "{app.message}"
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 whitespace-nowrap">
                          {app.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
