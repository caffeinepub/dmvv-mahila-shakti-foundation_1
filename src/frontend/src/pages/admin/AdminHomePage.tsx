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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  type HomeImpactStory,
  type HomeInitiative,
  type HomeStat,
  useApp,
} from "@/context/AppContext";
import { ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ICON_OPTIONS = [
  "GraduationCap",
  "BookOpen",
  "Banknote",
  "Heart",
  "Users",
  "MapPin",
  "Award",
  "Clock",
  "Star",
  "Zap",
  "Home",
  "Briefcase",
  "Globe",
  "HeartHandshake",
  "Leaf",
  "Shield",
];

const COLOR_OPTIONS = [
  "text-blue-600",
  "text-green-600",
  "text-orange-500",
  "text-red-500",
  "text-purple-600",
  "text-yellow-600",
  "text-pink-600",
  "text-teal-600",
  "text-gray-700",
  "text-green-700",
];

const BG_COLOR_OPTIONS = [
  "bg-green-50",
  "bg-orange-50",
  "bg-blue-50",
  "bg-purple-50",
  "bg-red-50",
  "bg-yellow-50",
];

export default function AdminHomePage() {
  const {
    homeHero,
    homeStats,
    homeInitiatives,
    homeImpactStories,
    homeCTA,
    updateHomeHero,
    addHomeStat,
    updateHomeStat,
    deleteHomeStat,
    addHomeInitiative,
    updateHomeInitiative,
    deleteHomeInitiative,
    addHomeImpactStory,
    updateHomeImpactStory,
    deleteHomeImpactStory,
    updateHomeCTA,
  } = useApp();

  // --- Hero editing ---
  const [heroForm, setHeroForm] = useState({ ...homeHero });
  const saveHero = () => {
    updateHomeHero(heroForm);
    toast.success("Hero content updated!");
  };

  // --- CTA editing ---
  const [ctaForm, setCtaForm] = useState({ ...homeCTA });
  const saveCTA = () => {
    updateHomeCTA(ctaForm);
    toast.success("CTA content updated!");
  };

  // --- Stats ---
  const [statDialogOpen, setStatDialogOpen] = useState(false);
  const [editStat, setEditStat] = useState<HomeStat | null>(null);
  const EMPTY_STAT = {
    iconName: "Users",
    number: "",
    label: "",
    color: "text-green-700",
    sortOrder: homeStats.length + 1,
    isActive: true,
  };
  const [statForm, setStatForm] = useState<Omit<HomeStat, "id">>(EMPTY_STAT);

  const openAddStat = () => {
    setEditStat(null);
    setStatForm({ ...EMPTY_STAT, sortOrder: homeStats.length + 1 });
    setStatDialogOpen(true);
  };
  const openEditStat = (s: HomeStat) => {
    setEditStat(s);
    setStatForm({
      iconName: s.iconName,
      number: s.number,
      label: s.label,
      color: s.color,
      sortOrder: s.sortOrder,
      isActive: s.isActive,
    });
    setStatDialogOpen(true);
  };
  const saveStat = () => {
    if (!statForm.number.trim() || !statForm.label.trim()) {
      toast.error("Number and label are required.");
      return;
    }
    if (editStat) {
      updateHomeStat(editStat.id, statForm);
      toast.success("Stat updated!");
    } else {
      addHomeStat({ id: `hs_${Date.now()}`, ...statForm });
      toast.success("Stat added!");
    }
    setStatDialogOpen(false);
  };

  // --- Initiatives ---
  const [initDialogOpen, setInitDialogOpen] = useState(false);
  const [editInit, setEditInit] = useState<HomeInitiative | null>(null);
  const EMPTY_INIT = {
    label: "",
    iconName: "GraduationCap",
    color: "text-blue-600",
    sortOrder: homeInitiatives.length + 1,
    isActive: true,
  };
  const [initForm, setInitForm] =
    useState<Omit<HomeInitiative, "id">>(EMPTY_INIT);

  const openAddInit = () => {
    setEditInit(null);
    setInitForm({ ...EMPTY_INIT, sortOrder: homeInitiatives.length + 1 });
    setInitDialogOpen(true);
  };
  const openEditInit = (i: HomeInitiative) => {
    setEditInit(i);
    setInitForm({
      label: i.label,
      iconName: i.iconName,
      color: i.color,
      sortOrder: i.sortOrder,
      isActive: i.isActive,
    });
    setInitDialogOpen(true);
  };
  const saveInit = () => {
    if (!initForm.label.trim()) {
      toast.error("Label is required.");
      return;
    }
    if (editInit) {
      updateHomeInitiative(editInit.id, initForm);
      toast.success("Initiative updated!");
    } else {
      addHomeInitiative({ id: `hi_${Date.now()}`, ...initForm });
      toast.success("Initiative added!");
    }
    setInitDialogOpen(false);
  };

  // --- Impact Stories ---
  const [storyDialogOpen, setStoryDialogOpen] = useState(false);
  const [editStory, setEditStory] = useState<HomeImpactStory | null>(null);
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const storyFileRef = useRef<HTMLInputElement>(null);
  const EMPTY_STORY = {
    title: "",
    subtitle: "",
    imageUrl: "",
    bgColor: "bg-green-50",
    sortOrder: homeImpactStories.length + 1,
    isActive: true,
  };
  const [storyForm, setStoryForm] =
    useState<Omit<HomeImpactStory, "id">>(EMPTY_STORY);

  const readFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openAddStory = () => {
    setEditStory(null);
    setStoryImage(null);
    setStoryForm({ ...EMPTY_STORY, sortOrder: homeImpactStories.length + 1 });
    setStoryDialogOpen(true);
  };
  const openEditStory = (s: HomeImpactStory) => {
    setEditStory(s);
    setStoryImage(s.imageUrl || null);
    setStoryForm({
      title: s.title,
      subtitle: s.subtitle,
      imageUrl: s.imageUrl,
      bgColor: s.bgColor,
      sortOrder: s.sortOrder,
      isActive: s.isActive,
    });
    setStoryDialogOpen(true);
  };
  const saveStory = () => {
    if (!storyForm.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    const payload = {
      ...storyForm,
      imageUrl: storyImage || storyForm.imageUrl,
    };
    if (editStory) {
      updateHomeImpactStory(editStory.id, payload);
      toast.success("Impact story updated!");
    } else {
      addHomeImpactStory({ id: `his_${Date.now()}`, ...payload });
      toast.success("Impact story added!");
    }
    setStoryDialogOpen(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Home Page Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Hero, Stats, Initiatives, Impact Stories, CTA — sab edit karen
        </p>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="mb-6 flex flex-wrap gap-1 h-auto">
          <TabsTrigger value="hero" data-ocid="admin_homepage.tab">
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="stats" data-ocid="admin_homepage.tab">
            Stats
          </TabsTrigger>
          <TabsTrigger value="initiatives" data-ocid="admin_homepage.tab">
            Initiatives
          </TabsTrigger>
          <TabsTrigger value="stories" data-ocid="admin_homepage.tab">
            Impact Stories
          </TabsTrigger>
          <TabsTrigger value="cta" data-ocid="admin_homepage.tab">
            CTA Section
          </TabsTrigger>
        </TabsList>

        {/* HERO TAB */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Main Heading (use \n for line break)</Label>
                <Input
                  value={heroForm.heading}
                  onChange={(e) =>
                    setHeroForm((f) => ({ ...f, heading: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="Empowering Women,\nTransforming India"
                  data-ocid="admin_homepage.input"
                />
              </div>
              <div>
                <Label>Subheading</Label>
                <Textarea
                  value={heroForm.subheading}
                  onChange={(e) =>
                    setHeroForm((f) => ({ ...f, subheading: e.target.value }))
                  }
                  rows={3}
                  className="mt-1"
                  data-ocid="admin_homepage.textarea"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Button Text</Label>
                  <Input
                    value={heroForm.primaryBtnText}
                    onChange={(e) =>
                      setHeroForm((f) => ({
                        ...f,
                        primaryBtnText: e.target.value,
                      }))
                    }
                    className="mt-1"
                    data-ocid="admin_homepage.input"
                  />
                </div>
                <div>
                  <Label>Secondary Button Text</Label>
                  <Input
                    value={heroForm.secondaryBtnText}
                    onChange={(e) =>
                      setHeroForm((f) => ({
                        ...f,
                        secondaryBtnText: e.target.value,
                      }))
                    }
                    className="mt-1"
                    data-ocid="admin_homepage.input"
                  />
                </div>
              </div>
              <Button
                className="bg-ngo-green hover:bg-green-700 text-white"
                onClick={saveHero}
                data-ocid="admin_homepage.save_button"
              >
                Save Hero Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* STATS TAB */}
        <TabsContent value="stats">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Stats ({homeStats.length})
            </h2>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={openAddStat}
              data-ocid="admin_homepage.add_button"
            >
              <Plus size={16} className="mr-1" /> Add Stat
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeStats.map((stat) => (
              <Card key={stat.id}>
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-bold text-lg">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="text-xs text-gray-400">
                      Icon: {stat.iconName} | Color: {stat.color}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={stat.isActive}
                      onCheckedChange={(v) =>
                        updateHomeStat(stat.id, { isActive: v })
                      }
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditStat(stat)}
                      data-ocid="admin_homepage.edit_button"
                    >
                      <Pencil size={14} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-500 hover:bg-red-50"
                          data-ocid="admin_homepage.delete_button"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Stat?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This stat will be permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600"
                            onClick={() => {
                              deleteHomeStat(stat.id);
                              toast.success("Stat deleted!");
                            }}
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

        {/* INITIATIVES TAB */}
        <TabsContent value="initiatives">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Initiatives ({homeInitiatives.length})
            </h2>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={openAddInit}
              data-ocid="admin_homepage.add_button"
            >
              <Plus size={16} className="mr-1" /> Add Initiative
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeInitiatives.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs text-gray-400">
                      Icon: {item.iconName} | Sort: {item.sortOrder}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={(v) =>
                        updateHomeInitiative(item.id, { isActive: v })
                      }
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditInit(item)}
                      data-ocid="admin_homepage.edit_button"
                    >
                      <Pencil size={14} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-500 hover:bg-red-50"
                          data-ocid="admin_homepage.delete_button"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Initiative?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600"
                            onClick={() => {
                              deleteHomeInitiative(item.id);
                              toast.success("Deleted!");
                            }}
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

        {/* IMPACT STORIES TAB */}
        <TabsContent value="stories">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Impact Stories ({homeImpactStories.length})
            </h2>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={openAddStory}
              data-ocid="admin_homepage.add_button"
            >
              <Plus size={16} className="mr-1" /> Add Story
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeImpactStories.map((story) => (
              <Card key={story.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  {story.imageUrl ? (
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={24} className="text-gray-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{story.title}</div>
                    <div className="text-xs text-gray-500">
                      {story.subtitle}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Switch
                      checked={story.isActive}
                      onCheckedChange={(v) =>
                        updateHomeImpactStory(story.id, { isActive: v })
                      }
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditStory(story)}
                      data-ocid="admin_homepage.edit_button"
                    >
                      <Pencil size={14} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-500 hover:bg-red-50"
                          data-ocid="admin_homepage.delete_button"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Impact Story?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600"
                            onClick={() => {
                              deleteHomeImpactStory(story.id);
                              toast.success("Deleted!");
                            }}
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

        {/* CTA TAB */}
        <TabsContent value="cta">
          <Card>
            <CardHeader>
              <CardTitle>CTA Section Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Heading</Label>
                <Input
                  value={ctaForm.heading}
                  onChange={(e) =>
                    setCtaForm((f) => ({ ...f, heading: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_homepage.input"
                />
              </div>
              <div>
                <Label>Sub Text</Label>
                <Textarea
                  value={ctaForm.subtext}
                  onChange={(e) =>
                    setCtaForm((f) => ({ ...f, subtext: e.target.value }))
                  }
                  rows={2}
                  className="mt-1"
                  data-ocid="admin_homepage.textarea"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Button Text</Label>
                  <Input
                    value={ctaForm.primaryBtnText}
                    onChange={(e) =>
                      setCtaForm((f) => ({
                        ...f,
                        primaryBtnText: e.target.value,
                      }))
                    }
                    className="mt-1"
                    data-ocid="admin_homepage.input"
                  />
                </div>
                <div>
                  <Label>Secondary Button Text</Label>
                  <Input
                    value={ctaForm.secondaryBtnText}
                    onChange={(e) =>
                      setCtaForm((f) => ({
                        ...f,
                        secondaryBtnText: e.target.value,
                      }))
                    }
                    className="mt-1"
                    data-ocid="admin_homepage.input"
                  />
                </div>
              </div>
              <Button
                className="bg-ngo-green hover:bg-green-700 text-white"
                onClick={saveCTA}
                data-ocid="admin_homepage.save_button"
              >
                Save CTA Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Stat Dialog */}
      <Dialog open={statDialogOpen} onOpenChange={setStatDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editStat ? "Edit Stat" : "Add New Stat"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Number / Value *</Label>
              <Input
                value={statForm.number}
                onChange={(e) =>
                  setStatForm((f) => ({ ...f, number: e.target.value }))
                }
                placeholder="e.g. 50,000+"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Label *</Label>
              <Input
                value={statForm.label}
                onChange={(e) =>
                  setStatForm((f) => ({ ...f, label: e.target.value }))
                }
                placeholder="e.g. Women Empowered"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Icon Name</Label>
              <select
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                value={statForm.iconName}
                onChange={(e) =>
                  setStatForm((f) => ({ ...f, iconName: e.target.value }))
                }
              >
                {ICON_OPTIONS.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Color Class</Label>
              <select
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                value={statForm.color}
                onChange={(e) =>
                  setStatForm((f) => ({ ...f, color: e.target.value }))
                }
              >
                {COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={statForm.sortOrder}
                  onChange={(e) =>
                    setStatForm((f) => ({
                      ...f,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={statForm.isActive}
                  onCheckedChange={(v) =>
                    setStatForm((f) => ({ ...f, isActive: v }))
                  }
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={saveStat}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Initiative Dialog */}
      <Dialog open={initDialogOpen} onOpenChange={setInitDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editInit ? "Edit Initiative" : "Add Initiative"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Label *</Label>
              <Input
                value={initForm.label}
                onChange={(e) =>
                  setInitForm((f) => ({ ...f, label: e.target.value }))
                }
                placeholder="e.g. Vocational Training"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Icon Name</Label>
              <select
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                value={initForm.iconName}
                onChange={(e) =>
                  setInitForm((f) => ({ ...f, iconName: e.target.value }))
                }
              >
                {ICON_OPTIONS.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Color Class</Label>
              <select
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                value={initForm.color}
                onChange={(e) =>
                  setInitForm((f) => ({ ...f, color: e.target.value }))
                }
              >
                {COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={initForm.sortOrder}
                  onChange={(e) =>
                    setInitForm((f) => ({
                      ...f,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={initForm.isActive}
                  onCheckedChange={(v) =>
                    setInitForm((f) => ({ ...f, isActive: v }))
                  }
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInitDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={saveInit}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Impact Story Dialog */}
      <Dialog open={storyDialogOpen} onOpenChange={setStoryDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editStory ? "Edit Impact Story" : "Add Impact Story"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Photo Upload</Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-ngo-green"
                onClick={() => storyFileRef.current?.click()}
              >
                {storyImage ? (
                  <img
                    src={storyImage}
                    alt="preview"
                    className="mx-auto max-h-40 object-contain rounded"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={32} className="mx-auto mb-1" />
                    <p className="text-sm">Click to upload photo</p>
                  </div>
                )}
              </button>
              <input
                ref={storyFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => readFile(e, setStoryImage)}
              />
              {storyImage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-red-500"
                  onClick={() => setStoryImage(null)}
                >
                  Remove Photo
                </Button>
              )}
            </div>
            <div>
              <Label>Title *</Label>
              <Input
                value={storyForm.title}
                onChange={(e) =>
                  setStoryForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Sunita's Story"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={storyForm.subtitle}
                onChange={(e) =>
                  setStoryForm((f) => ({ ...f, subtitle: e.target.value }))
                }
                placeholder="e.g. From trainee to entrepreneur"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Background Color</Label>
              <select
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                value={storyForm.bgColor}
                onChange={(e) =>
                  setStoryForm((f) => ({ ...f, bgColor: e.target.value }))
                }
              >
                {BG_COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={storyForm.sortOrder}
                  onChange={(e) =>
                    setStoryForm((f) => ({
                      ...f,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={storyForm.isActive}
                  onCheckedChange={(v) =>
                    setStoryForm((f) => ({ ...f, isActive: v }))
                  }
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={saveStory}
            >
              Save Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
