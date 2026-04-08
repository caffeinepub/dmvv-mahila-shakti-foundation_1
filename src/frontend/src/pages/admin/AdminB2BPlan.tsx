import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  type B2BBenefit,
  type B2BEnquiry,
  type B2BPlanCard,
  type B2BStep,
  useApp,
} from "@/context/AppContext";
import {
  Award,
  Briefcase,
  CheckSquare,
  ClipboardList,
  Gift,
  ImageIcon,
  Pencil,
  Plus,
  Save,
  Settings,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ────────────────────────────────────────────────────────────
// Empty form helpers
// ────────────────────────────────────────────────────────────
const emptyPlan = (): Omit<B2BPlanCard, "id"> => ({
  name: "",
  price: "",
  duration: "Per Month",
  description: "",
  features: [],
  badge: "",
  image: "",
  buttonText: "Get Started",
  isActive: true,
  sortOrder: 1,
});

const emptyBenefit = (): Omit<B2BBenefit, "id"> => ({
  icon: "🤝",
  title: "",
  description: "",
  isActive: true,
});

const emptyStep = (): Omit<B2BStep, "id"> => ({
  stepNumber: 1,
  title: "",
  description: "",
  isActive: true,
});

// ────────────────────────────────────────────────────────────
// Status badge color
// ────────────────────────────────────────────────────────────
function EnquiryStatusBadge({ status }: { status: B2BEnquiry["status"] }) {
  const map: Record<B2BEnquiry["status"], string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    converted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminB2BPlan() {
  const {
    b2bSettings,
    updateB2bSettings,
    b2bPlans,
    addB2bPlan,
    updateB2bPlan,
    deleteB2bPlan,
    b2bBenefits,
    addB2bBenefit,
    updateB2bBenefit,
    deleteB2bBenefit,
    b2bSteps,
    addB2bStep,
    updateB2bStep,
    deleteB2bStep,
    b2bEnquiries,
    updateB2bEnquiry,
    deleteB2bEnquiry,
    galleryItems,
  } = useApp();

  // ── Settings form ──────────────────────────────────────────
  const [settingsForm, setSettingsForm] = useState({ ...b2bSettings });
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(
    b2bSettings.heroImage || null,
  );
  const heroFileRef = useRef<HTMLInputElement>(null);
  const [heroGalleryOpen, setHeroGalleryOpen] = useState(false);

  // ── Plan dialog ────────────────────────────────────────────
  const [planOpen, setPlanOpen] = useState(false);
  const [editPlanId, setEditPlanId] = useState<string | null>(null);
  const [planForm, setPlanForm] = useState<Omit<B2BPlanCard, "id">>(
    emptyPlan(),
  );
  const [planFeaturesText, setPlanFeaturesText] = useState("");
  const [planImagePreview, setPlanImagePreview] = useState<string | null>(null);
  const planFileRef = useRef<HTMLInputElement>(null);
  const [planGalleryOpen, setPlanGalleryOpen] = useState(false);

  // ── Benefit dialog ─────────────────────────────────────────
  const [benefitOpen, setBenefitOpen] = useState(false);
  const [editBenefitId, setEditBenefitId] = useState<string | null>(null);
  const [benefitForm, setBenefitForm] = useState<Omit<B2BBenefit, "id">>(
    emptyBenefit(),
  );

  // ── Step dialog ────────────────────────────────────────────
  const [stepOpen, setStepOpen] = useState(false);
  const [editStepId, setEditStepId] = useState<string | null>(null);
  const [stepForm, setStepForm] = useState<Omit<B2BStep, "id">>(emptyStep());

  // ── Enquiry filter ─────────────────────────────────────────
  const [enqFilter, setEnqFilter] = useState<string>("all");

  // ════════════════════════════════════════════════════════════
  // Settings handlers
  // ════════════════════════════════════════════════════════════
  const handleHeroFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setHeroImagePreview(url);
      setSettingsForm((p) => ({ ...p, heroImage: url }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleHeroGalleryPick = (src: string) => {
    setHeroImagePreview(src);
    setSettingsForm((p) => ({ ...p, heroImage: src }));
    setHeroGalleryOpen(false);
    toast.success("Image selected from gallery.");
  };

  const clearHeroImage = () => {
    setHeroImagePreview(null);
    setSettingsForm((p) => ({ ...p, heroImage: "" }));
  };

  const saveSettings = () => {
    updateB2bSettings(settingsForm);
    toast.success("Settings saved successfully!");
  };

  // ════════════════════════════════════════════════════════════
  // Plan handlers
  // ════════════════════════════════════════════════════════════
  const openAddPlan = () => {
    setEditPlanId(null);
    setPlanForm(emptyPlan());
    setPlanFeaturesText("");
    setPlanImagePreview(null);
    setPlanOpen(true);
  };

  const openEditPlan = (plan: B2BPlanCard) => {
    setEditPlanId(plan.id);
    setPlanForm({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      description: plan.description,
      features: plan.features,
      badge: plan.badge,
      image: plan.image,
      buttonText: plan.buttonText,
      isActive: plan.isActive,
      sortOrder: plan.sortOrder,
    });
    setPlanFeaturesText(plan.features.join("\n"));
    setPlanImagePreview(plan.image || null);
    setPlanOpen(true);
  };

  const handlePlanFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setPlanImagePreview(url);
      setPlanForm((p) => ({ ...p, image: url }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handlePlanGalleryPick = (src: string) => {
    setPlanImagePreview(src);
    setPlanForm((p) => ({ ...p, image: src }));
    setPlanGalleryOpen(false);
    toast.success("Image selected from gallery.");
  };

  const savePlan = () => {
    if (!planForm.name.trim()) {
      toast.error("Plan name is required.");
      return;
    }
    if (!planForm.price.trim()) {
      toast.error("Plan price is required.");
      return;
    }
    const features = planFeaturesText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    const finalForm = { ...planForm, features };
    if (editPlanId) {
      updateB2bPlan(editPlanId, finalForm);
      toast.success("Plan updated!");
    } else {
      addB2bPlan({ ...finalForm, id: `b2bp_${Date.now()}` });
      toast.success("Plan added!");
    }
    setPlanOpen(false);
  };

  // ════════════════════════════════════════════════════════════
  // Benefit handlers
  // ════════════════════════════════════════════════════════════
  const openAddBenefit = () => {
    setEditBenefitId(null);
    setBenefitForm(emptyBenefit());
    setBenefitOpen(true);
  };

  const openEditBenefit = (b: B2BBenefit) => {
    setEditBenefitId(b.id);
    setBenefitForm({
      icon: b.icon,
      title: b.title,
      description: b.description,
      isActive: b.isActive,
    });
    setBenefitOpen(true);
  };

  const saveBenefit = () => {
    if (!benefitForm.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (editBenefitId) {
      updateB2bBenefit(editBenefitId, benefitForm);
      toast.success("Benefit updated!");
    } else {
      addB2bBenefit({ ...benefitForm, id: `b2b_ben_${Date.now()}` });
      toast.success("Benefit added!");
    }
    setBenefitOpen(false);
  };

  // ════════════════════════════════════════════════════════════
  // Step handlers
  // ════════════════════════════════════════════════════════════
  const openAddStep = () => {
    setEditStepId(null);
    setStepForm(emptyStep());
    setStepOpen(true);
  };

  const openEditStep = (s: B2BStep) => {
    setEditStepId(s.id);
    setStepForm({
      stepNumber: s.stepNumber,
      title: s.title,
      description: s.description,
      isActive: s.isActive,
    });
    setStepOpen(true);
  };

  const saveStep = () => {
    if (!stepForm.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (editStepId) {
      updateB2bStep(editStepId, stepForm);
      toast.success("Step updated!");
    } else {
      addB2bStep({ ...stepForm, id: `b2b_step_${Date.now()}` });
      toast.success("Step added!");
    }
    setStepOpen(false);
  };

  // ════════════════════════════════════════════════════════════
  // Filtered enquiries
  // ════════════════════════════════════════════════════════════
  const filteredEnquiries =
    enqFilter === "all"
      ? b2bEnquiries
      : b2bEnquiries.filter((e) => e.status === enqFilter);

  const enqStats = {
    total: b2bEnquiries.length,
    new: b2bEnquiries.filter((e) => e.status === "new").length,
    contacted: b2bEnquiries.filter((e) => e.status === "contacted").length,
    converted: b2bEnquiries.filter((e) => e.status === "converted").length,
    rejected: b2bEnquiries.filter((e) => e.status === "rejected").length,
  };

  // ════════════════════════════════════════════════════════════
  // Render
  // ════════════════════════════════════════════════════════════
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <Briefcase size={20} className="text-green-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            B2B Plans Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage B2B partnership plans, benefits, steps and enquiries
          </p>
        </div>
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="flex-wrap h-auto gap-1 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value="settings"
            className="flex items-center gap-1.5"
            data-ocid="b2b_admin.tab"
          >
            <Settings size={14} /> Page Settings
          </TabsTrigger>
          <TabsTrigger
            value="plans"
            className="flex items-center gap-1.5"
            data-ocid="b2b_admin.tab"
          >
            <Award size={14} /> Plans
          </TabsTrigger>
          <TabsTrigger
            value="benefits"
            className="flex items-center gap-1.5"
            data-ocid="b2b_admin.tab"
          >
            <Gift size={14} /> Benefits
          </TabsTrigger>
          <TabsTrigger
            value="steps"
            className="flex items-center gap-1.5"
            data-ocid="b2b_admin.tab"
          >
            <CheckSquare size={14} /> Process Steps
          </TabsTrigger>
          <TabsTrigger
            value="enquiries"
            className="flex items-center gap-1.5"
            data-ocid="b2b_admin.tab"
          >
            <ClipboardList size={14} /> Enquiries
            {enqStats.new > 0 && (
              <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
                {enqStats.new}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Page Settings ───────────────────────────── */}
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={18} className="text-green-700" /> Page Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Hero Title</Label>
                  <Input
                    value={settingsForm.heroTitle}
                    onChange={(e) =>
                      setSettingsForm((p) => ({
                        ...p,
                        heroTitle: e.target.value,
                      }))
                    }
                    data-ocid="b2b_settings.input"
                  />
                </div>
                <div>
                  <Label>Hero Subtitle</Label>
                  <Input
                    value={settingsForm.heroSubtitle}
                    onChange={(e) =>
                      setSettingsForm((p) => ({
                        ...p,
                        heroSubtitle: e.target.value,
                      }))
                    }
                    data-ocid="b2b_settings.input"
                  />
                </div>
              </div>
              <div>
                <Label>Hero Description</Label>
                <Textarea
                  rows={3}
                  value={settingsForm.heroDescription}
                  onChange={(e) =>
                    setSettingsForm((p) => ({
                      ...p,
                      heroDescription: e.target.value,
                    }))
                  }
                  data-ocid="b2b_settings.textarea"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>CTA Button Text</Label>
                  <Input
                    value={settingsForm.ctaText}
                    onChange={(e) =>
                      setSettingsForm((p) => ({
                        ...p,
                        ctaText: e.target.value,
                      }))
                    }
                    data-ocid="b2b_settings.input"
                  />
                </div>
                <div>
                  <Label>CTA Phone</Label>
                  <Input
                    value={settingsForm.ctaPhone}
                    onChange={(e) =>
                      setSettingsForm((p) => ({
                        ...p,
                        ctaPhone: e.target.value,
                      }))
                    }
                    data-ocid="b2b_settings.input"
                  />
                </div>
                <div>
                  <Label>CTA Email</Label>
                  <Input
                    value={settingsForm.ctaEmail}
                    onChange={(e) =>
                      setSettingsForm((p) => ({
                        ...p,
                        ctaEmail: e.target.value,
                      }))
                    }
                    data-ocid="b2b_settings.input"
                  />
                </div>
              </div>

              {/* Hero Image Upload */}
              <div>
                <Label>Hero Image</Label>
                <div className="mt-2 flex flex-col gap-3">
                  {heroImagePreview ? (
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={heroImagePreview}
                        alt="Hero"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearHeroImage}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700"
                        data-ocid="b2b_settings.close_button"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-48 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
                      <ImageIcon size={28} />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => heroFileRef.current?.click()}
                      data-ocid="b2b_settings.upload_button"
                    >
                      <ImageIcon size={14} className="mr-1" /> Upload Image
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setHeroGalleryOpen(true)}
                      data-ocid="b2b_settings.open_modal_button"
                    >
                      Pick from Gallery
                    </Button>
                  </div>
                  <input
                    ref={heroFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleHeroFileSelect}
                  />
                </div>
              </div>

              <Button
                onClick={saveSettings}
                className="bg-green-700 hover:bg-green-800"
                data-ocid="b2b_settings.save_button"
              >
                <Save size={15} className="mr-2" /> Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 2: Plans ───────────────────────────────────── */}
        <TabsContent value="plans" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded-lg px-4 py-2 text-center">
                <div className="text-xl font-bold text-gray-900">
                  {b2bPlans.length}
                </div>
                <div className="text-xs text-gray-500">Total Plans</div>
              </div>
              <div className="bg-green-50 rounded-lg px-4 py-2 text-center">
                <div className="text-xl font-bold text-green-700">
                  {b2bPlans.filter((p) => p.isActive).length}
                </div>
                <div className="text-xs text-gray-500">Active Plans</div>
              </div>
            </div>
            <Button
              onClick={openAddPlan}
              className="bg-green-700 hover:bg-green-800"
              data-ocid="b2b_plans.open_modal_button"
            >
              <Plus size={15} className="mr-1" /> Add Plan
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {b2bPlans.map((plan, idx) => (
              <Card
                key={plan.id}
                className="border"
                data-ocid={`b2b_plans.item.${idx + 1}`}
              >
                {plan.image && (
                  <div className="h-28 overflow-hidden rounded-t-lg">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900">{plan.name}</h3>
                    {plan.badge && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-green-700 font-bold text-base mb-1">
                    {plan.price}
                  </p>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                    {plan.description}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Switch
                      checked={plan.isActive}
                      onCheckedChange={(v) =>
                        updateB2bPlan(plan.id, { isActive: v })
                      }
                      data-ocid="b2b_plans.switch"
                    />
                    <span className="text-xs text-gray-500">
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditPlan(plan)}
                      className="flex-1"
                      data-ocid="b2b_plans.edit_button"
                    >
                      <Pencil size={13} className="mr-1" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          data-ocid="b2b_plans.delete_button"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Plan?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The plan will be
                            permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-ocid="b2b_plans.cancel_button">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteB2bPlan(plan.id);
                              toast.success("Plan deleted.");
                            }}
                            className="bg-red-600 hover:bg-red-700"
                            data-ocid="b2b_plans.confirm_button"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Tab 3: Benefits ────────────────────────────────── */}
        <TabsContent value="benefits" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={openAddBenefit}
              className="bg-green-700 hover:bg-green-800"
              data-ocid="b2b_benefits.open_modal_button"
            >
              <Plus size={15} className="mr-1" /> Add Benefit
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {b2bBenefits.map((benefit, idx) => (
              <Card
                key={benefit.id}
                className="border"
                data-ocid={`b2b_benefits.item.${idx + 1}`}
              >
                <CardContent className="p-4 flex gap-3">
                  <div className="text-3xl shrink-0">{benefit.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {benefit.title}
                      </h3>
                      <Switch
                        checked={benefit.isActive}
                        onCheckedChange={(v) =>
                          updateB2bBenefit(benefit.id, { isActive: v })
                        }
                        data-ocid="b2b_benefits.switch"
                      />
                    </div>
                    <p className="text-gray-500 text-xs line-clamp-2">
                      {benefit.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditBenefit(benefit)}
                        data-ocid="b2b_benefits.edit_button"
                      >
                        <Pencil size={12} className="mr-1" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            data-ocid="b2b_benefits.delete_button"
                          >
                            <Trash2 size={12} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Benefit?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove this benefit.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-ocid="b2b_benefits.cancel_button">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteB2bBenefit(benefit.id);
                                toast.success("Benefit deleted.");
                              }}
                              className="bg-red-600 hover:bg-red-700"
                              data-ocid="b2b_benefits.confirm_button"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Tab 4: Process Steps ───────────────────────────── */}
        <TabsContent value="steps" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={openAddStep}
              className="bg-green-700 hover:bg-green-800"
              data-ocid="b2b_steps.open_modal_button"
            >
              <Plus size={15} className="mr-1" /> Add Step
            </Button>
          </div>
          <div className="space-y-3">
            {[...b2bSteps]
              .sort((a, b) => a.stepNumber - b.stepNumber)
              .map((step, idx) => (
                <Card
                  key={step.id}
                  className="border"
                  data-ocid={`b2b_steps.item.${idx + 1}`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-lg shrink-0">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {step.title}
                        </h3>
                        <Switch
                          checked={step.isActive}
                          onCheckedChange={(v) =>
                            updateB2bStep(step.id, { isActive: v })
                          }
                          data-ocid="b2b_steps.switch"
                        />
                      </div>
                      <p className="text-gray-500 text-xs">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditStep(step)}
                        data-ocid="b2b_steps.edit_button"
                      >
                        <Pencil size={13} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            data-ocid="b2b_steps.delete_button"
                          >
                            <Trash2 size={13} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Step?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove this step.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-ocid="b2b_steps.cancel_button">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteB2bStep(step.id);
                                toast.success("Step deleted.");
                              }}
                              className="bg-red-600 hover:bg-red-700"
                              data-ocid="b2b_steps.confirm_button"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* ── Tab 5: Enquiries ───────────────────────────────── */}
        <TabsContent value="enquiries" className="mt-6 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(
              [
                { label: "Total", value: enqStats.total, color: "gray" },
                { label: "New", value: enqStats.new, color: "blue" },
                {
                  label: "Contacted",
                  value: enqStats.contacted,
                  color: "yellow",
                },
                {
                  label: "Converted",
                  value: enqStats.converted,
                  color: "green",
                },
                { label: "Rejected", value: enqStats.rejected, color: "red" },
              ] as const
            ).map((stat) => (
              <button
                key={stat.label}
                type="button"
                className={`rounded-xl p-3 text-center cursor-pointer border-2 transition-all w-full ${
                  enqFilter ===
                  (stat.label === "Total" ? "all" : stat.label.toLowerCase())
                    ? "border-green-600 bg-green-50"
                    : "border-transparent bg-gray-50"
                }`}
                onClick={() =>
                  setEnqFilter(
                    stat.label === "Total" ? "all" : stat.label.toLowerCase(),
                  )
                }
                data-ocid="b2b_enquiries.tab"
              >
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </button>
            ))}
          </div>

          {/* Enquiry list */}
          <div className="space-y-3" data-ocid="b2b_enquiries.list">
            {filteredEnquiries.length === 0 ? (
              <div
                className="text-center py-16 text-gray-400 bg-gray-50 rounded-xl"
                data-ocid="b2b_enquiries.empty_state"
              >
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p>No enquiries found.</p>
              </div>
            ) : (
              [...filteredEnquiries]
                .sort(
                  (a, b) =>
                    new Date(b.submittedAt).getTime() -
                    new Date(a.submittedAt).getTime(),
                )
                .map((enq, idx) => (
                  <Card
                    key={enq.id}
                    className="border"
                    data-ocid={`b2b_enquiries.item.${idx + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900">
                              {enq.name}
                            </span>
                            <EnquiryStatusBadge status={enq.status} />
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-xs text-gray-500">
                            <span>📱 {enq.mobile}</span>
                            {enq.email && <span>✉️ {enq.email}</span>}
                            {enq.businessType && (
                              <span>🏢 {enq.businessType}</span>
                            )}
                            {enq.planInterested && (
                              <span>📋 {enq.planInterested}</span>
                            )}
                          </div>
                          {enq.message && (
                            <p className="text-xs text-gray-600 mt-1.5 bg-gray-50 rounded px-2 py-1">
                              {enq.message}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(enq.submittedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Select
                            value={enq.status}
                            onValueChange={(v) =>
                              updateB2bEnquiry(enq.id, {
                                status: v as B2BEnquiry["status"],
                              })
                            }
                          >
                            <SelectTrigger
                              className="h-8 text-xs w-32"
                              data-ocid="b2b_enquiries.select"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">
                                Contacted
                              </SelectItem>
                              <SelectItem value="converted">
                                Converted
                              </SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50 h-8"
                                data-ocid="b2b_enquiries.delete_button"
                              >
                                <Trash2 size={13} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Enquiry?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this enquiry.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel data-ocid="b2b_enquiries.cancel_button">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteB2bEnquiry(enq.id);
                                    toast.success("Enquiry deleted.");
                                  }}
                                  className="bg-red-600 hover:bg-red-700"
                                  data-ocid="b2b_enquiries.confirm_button"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* ══ Plan Add/Edit Dialog ════════════════════════════════ */}
      <Dialog open={planOpen} onOpenChange={setPlanOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editPlanId ? "Edit Plan" : "Add New Plan"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Plan Name *</Label>
                <Input
                  value={planForm.name}
                  onChange={(e) =>
                    setPlanForm((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="b2b_plan_dialog.input"
                />
              </div>
              <div>
                <Label>Price *</Label>
                <Input
                  placeholder="e.g. ₹7,999/month"
                  value={planForm.price}
                  onChange={(e) =>
                    setPlanForm((p) => ({ ...p, price: e.target.value }))
                  }
                  data-ocid="b2b_plan_dialog.input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Duration</Label>
                <Input
                  placeholder="e.g. Per Month, Annual"
                  value={planForm.duration}
                  onChange={(e) =>
                    setPlanForm((p) => ({ ...p, duration: e.target.value }))
                  }
                  data-ocid="b2b_plan_dialog.input"
                />
              </div>
              <div>
                <Label>Button Text</Label>
                <Input
                  value={planForm.buttonText}
                  onChange={(e) =>
                    setPlanForm((p) => ({ ...p, buttonText: e.target.value }))
                  }
                  data-ocid="b2b_plan_dialog.input"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={planForm.description}
                onChange={(e) =>
                  setPlanForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="b2b_plan_dialog.textarea"
              />
            </div>
            <div>
              <Label>Features (one per line)</Label>
              <Textarea
                rows={5}
                placeholder="Business Registration Support\n2 Training Sessions/Month\nMarketing Collateral"
                value={planFeaturesText}
                onChange={(e) => setPlanFeaturesText(e.target.value)}
                data-ocid="b2b_plan_dialog.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Badge</Label>
                <Input
                  placeholder="Popular / Best Value / New / Premium"
                  value={planForm.badge}
                  onChange={(e) =>
                    setPlanForm((p) => ({ ...p, badge: e.target.value }))
                  }
                  data-ocid="b2b_plan_dialog.input"
                />
                <div className="flex gap-1 mt-1 flex-wrap">
                  {["Popular", "Best Value", "New", "Premium"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setPlanForm((p) => ({ ...p, badge: b }))}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={planForm.sortOrder}
                  onChange={(e) =>
                    setPlanForm((p) => ({
                      ...p,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  data-ocid="b2b_plan_dialog.input"
                />
              </div>
            </div>

            {/* Plan Image */}
            <div>
              <Label>Plan Image</Label>
              <div className="mt-2 flex flex-col gap-2">
                {planImagePreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                    <img
                      src={planImagePreview}
                      alt="Plan"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPlanImagePreview(null);
                        setPlanForm((p) => ({ ...p, image: "" }));
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-gray-50">
                    <ImageIcon size={24} />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => planFileRef.current?.click()}
                    data-ocid="b2b_plan_dialog.upload_button"
                  >
                    <ImageIcon size={13} className="mr-1" /> Upload
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPlanGalleryOpen(true)}
                    data-ocid="b2b_plan_dialog.open_modal_button"
                  >
                    Pick from Gallery
                  </Button>
                </div>
                <input
                  ref={planFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePlanFileSelect}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={planForm.isActive}
                onCheckedChange={(v) =>
                  setPlanForm((p) => ({ ...p, isActive: v }))
                }
                data-ocid="b2b_plan_dialog.switch"
              />
              <Label>Active</Label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={savePlan}
                className="bg-green-700 hover:bg-green-800 flex-1"
                data-ocid="b2b_plan_dialog.save_button"
              >
                <Save size={14} className="mr-1" />{" "}
                {editPlanId ? "Update Plan" : "Add Plan"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setPlanOpen(false)}
                data-ocid="b2b_plan_dialog.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ══ Benefit Add/Edit Dialog ════════════════════════════ */}
      <Dialog open={benefitOpen} onOpenChange={setBenefitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editBenefitId ? "Edit Benefit" : "Add New Benefit"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Icon (Emoji)</Label>
              <Input
                value={benefitForm.icon}
                onChange={(e) =>
                  setBenefitForm((p) => ({ ...p, icon: e.target.value }))
                }
                placeholder="e.g. 🤝"
                data-ocid="b2b_benefit_dialog.input"
              />
            </div>
            <div>
              <Label>Title *</Label>
              <Input
                value={benefitForm.title}
                onChange={(e) =>
                  setBenefitForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="b2b_benefit_dialog.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={benefitForm.description}
                onChange={(e) =>
                  setBenefitForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="b2b_benefit_dialog.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={benefitForm.isActive}
                onCheckedChange={(v) =>
                  setBenefitForm((p) => ({ ...p, isActive: v }))
                }
                data-ocid="b2b_benefit_dialog.switch"
              />
              <Label>Active</Label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={saveBenefit}
                className="bg-green-700 hover:bg-green-800 flex-1"
                data-ocid="b2b_benefit_dialog.save_button"
              >
                <Save size={14} className="mr-1" />{" "}
                {editBenefitId ? "Update" : "Add Benefit"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setBenefitOpen(false)}
                data-ocid="b2b_benefit_dialog.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ══ Step Add/Edit Dialog ═══════════════════════════════ */}
      <Dialog open={stepOpen} onOpenChange={setStepOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editStepId ? "Edit Step" : "Add New Step"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Step Number</Label>
              <Input
                type="number"
                value={stepForm.stepNumber}
                onChange={(e) =>
                  setStepForm((p) => ({
                    ...p,
                    stepNumber: Number(e.target.value),
                  }))
                }
                data-ocid="b2b_step_dialog.input"
              />
            </div>
            <div>
              <Label>Title *</Label>
              <Input
                value={stepForm.title}
                onChange={(e) =>
                  setStepForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="b2b_step_dialog.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={stepForm.description}
                onChange={(e) =>
                  setStepForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="b2b_step_dialog.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={stepForm.isActive}
                onCheckedChange={(v) =>
                  setStepForm((p) => ({ ...p, isActive: v }))
                }
                data-ocid="b2b_step_dialog.switch"
              />
              <Label>Active</Label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={saveStep}
                className="bg-green-700 hover:bg-green-800 flex-1"
                data-ocid="b2b_step_dialog.save_button"
              >
                <Save size={14} className="mr-1" />{" "}
                {editStepId ? "Update" : "Add Step"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setStepOpen(false)}
                data-ocid="b2b_step_dialog.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ══ Hero Gallery Picker ════════════════════════════════ */}
      <Dialog open={heroGalleryOpen} onOpenChange={setHeroGalleryOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pick Image from Gallery</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 py-2">
            {galleryItems
              .filter((item) => item.mediaType !== "video")
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleHeroGalleryPick(item.src)}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-green-600 transition-all"
                  data-ocid="b2b_gallery.button"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            {galleryItems.filter((i) => i.mediaType !== "video").length ===
              0 && (
              <p className="col-span-3 text-center text-gray-400 py-8">
                No images in gallery.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ══ Plan Gallery Picker ════════════════════════════════ */}
      <Dialog open={planGalleryOpen} onOpenChange={setPlanGalleryOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pick Image from Gallery</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 py-2">
            {galleryItems
              .filter((item) => item.mediaType !== "video")
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePlanGalleryPick(item.src)}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-green-600 transition-all"
                  data-ocid="b2b_plan_gallery.button"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            {galleryItems.filter((i) => i.mediaType !== "video").length ===
              0 && (
              <p className="col-span-3 text-center text-gray-400 py-8">
                No images in gallery.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
