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
  type HomeCard,
  type HomeImpactStory,
  type HomeInitiative,
  type HomeStat,
  type SliderImage,
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

// ---- Slider Images Management Component ----
function SliderImagesTab({
  sliderImages,
  addSliderImage,
  updateSliderImage,
  deleteSliderImage,
}: {
  sliderImages: SliderImage[];
  addSliderImage: (img: SliderImage) => void;
  updateSliderImage: (id: string, updates: Partial<SliderImage>) => void;
  deleteSliderImage: (id: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<SliderImage | null>(null);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    isActive: true,
  });

  const resetForm = () =>
    setForm({ title: "", subtitle: "", imageUrl: "", isActive: true });

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit = false,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      if (isEdit && editItem) {
        updateSliderImage(editItem.id, { imageUrl: url });
        setEditItem((prev) => (prev ? { ...prev, imageUrl: url } : prev));
      } else {
        setForm((f) => ({ ...f, imageUrl: url }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!form.imageUrl) {
      toast.error("Please upload an image first");
      return;
    }
    addSliderImage({
      id: `slider_${Date.now()}`,
      imageUrl: form.imageUrl,
      title: form.title,
      subtitle: form.subtitle,
      isActive: form.isActive,
      sortOrder: sliderImages.length + 1,
    });
    toast.success("Slide added!");
    resetForm();
    setDialogOpen(false);
  };

  const sorted = [...sliderImages].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Main Page Image Slider</CardTitle>
          <Button
            size="sm"
            className="bg-ngo-green text-white"
            onClick={() => {
              resetForm();
              setDialogOpen(true);
            }}
          >
            <Plus size={16} className="mr-1" /> Add Slide
          </Button>
        </CardHeader>
        <CardContent>
          {sorted.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <ImageIcon size={40} className="mx-auto mb-3 text-gray-300" />
              <p>No slides added yet. Click "Add Slide" to upload images.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sorted.map((slide, idx) => (
                <Card
                  key={slide.id}
                  className="overflow-hidden border-2 border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title || `Slide ${idx + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge
                        className={
                          slide.isActive
                            ? "bg-green-500 text-white text-xs"
                            : "bg-gray-400 text-white text-xs"
                        }
                      >
                        {slide.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/50 text-white text-xs">
                        #{idx + 1}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3 space-y-2">
                    {slide.title && (
                      <p className="font-semibold text-sm text-gray-800 truncate">
                        {slide.title}
                      </p>
                    )}
                    {slide.subtitle && (
                      <p className="text-xs text-gray-500 truncate">
                        {slide.subtitle}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Active</span>
                        <Switch
                          checked={slide.isActive}
                          onCheckedChange={(v) =>
                            updateSliderImage(slide.id, { isActive: v })
                          }
                        />
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2"
                          onClick={() => setEditItem({ ...slide })}
                        >
                          <Pencil size={13} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-red-500 border-red-200"
                            >
                              <Trash2 size={13} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Slide?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove the slide from the homepage
                                slider. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 text-white"
                                onClick={() => {
                                  deleteSliderImage(slide.id);
                                  toast.success("Slide deleted");
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    {/* Move up/down */}
                    <div className="flex gap-1 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs"
                        disabled={idx === 0}
                        onClick={() => {
                          const prev = sorted[idx - 1];
                          updateSliderImage(slide.id, {
                            sortOrder: prev.sortOrder,
                          });
                          updateSliderImage(prev.id, {
                            sortOrder: slide.sortOrder,
                          });
                        }}
                      >
                        ↑ Move Up
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs"
                        disabled={idx === sorted.length - 1}
                        onClick={() => {
                          const next = sorted[idx + 1];
                          updateSliderImage(slide.id, {
                            sortOrder: next.sortOrder,
                          });
                          updateSliderImage(next.id, {
                            sortOrder: slide.sortOrder,
                          });
                        }}
                      >
                        ↓ Move Down
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Slide Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Slide</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Slide Image *</Label>
              <div
                className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-green-400 transition"
                onClick={() => fileRef.current?.click()}
                onKeyDown={() => fileRef.current?.click()}
              >
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="mx-auto max-h-40 rounded-lg object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={32} className="mx-auto mb-2" />
                    <p className="text-sm">Click to upload image</p>
                    <p className="text-xs mt-1">JPG, PNG, WebP (max 5MB)</p>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e, false)}
              />
            </div>
            <div>
              <Label>Title (shown on slide)</Label>
              <input
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Empowering Women Across India"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <input
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                value={form.subtitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subtitle: e.target.value }))
                }
                placeholder="e.g. Join DMVV Foundation today"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))}
              />
              <Label>Active (visible on homepage)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-ngo-green text-white" onClick={handleAdd}>
              Add Slide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Slide Dialog */}
      {editItem && (
        <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Slide</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Slide Image</Label>
                <div
                  className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-green-400 transition"
                  onClick={() => editFileRef.current?.click()}
                  onKeyDown={() => editFileRef.current?.click()}
                >
                  <img
                    src={editItem.imageUrl}
                    alt="Preview"
                    className="mx-auto max-h-40 rounded-lg object-cover"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Click to change image
                  </p>
                </div>
                <input
                  ref={editFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e, true)}
                />
              </div>
              <div>
                <Label>Title</Label>
                <input
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                  value={editItem.title}
                  onChange={(e) =>
                    setEditItem((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev,
                    )
                  }
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <input
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                  value={editItem.subtitle}
                  onChange={(e) =>
                    setEditItem((prev) =>
                      prev ? { ...prev, subtitle: e.target.value } : prev,
                    )
                  }
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={editItem.isActive}
                  onCheckedChange={(v) =>
                    setEditItem((prev) =>
                      prev ? { ...prev, isActive: v } : prev,
                    )
                  }
                />
                <Label>Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditItem(null)}>
                Cancel
              </Button>
              <Button
                className="bg-ngo-green text-white"
                onClick={() => {
                  if (editItem) {
                    updateSliderImage(editItem.id, {
                      title: editItem.title,
                      subtitle: editItem.subtitle,
                      isActive: editItem.isActive,
                      imageUrl: editItem.imageUrl,
                    });
                    toast.success("Slide updated!");
                    setEditItem(null);
                  }
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// ---- Home Cards Management Component ----
function HomeCardsTab({
  homeCards,
  galleryItems,
  addHomeCard,
  updateHomeCard,
  deleteHomeCard,
}: {
  homeCards: HomeCard[];
  galleryItems: {
    id: string;
    src: string;
    caption: string;
    mediaType?: string;
  }[];
  addHomeCard: (c: HomeCard) => void;
  updateHomeCard: (id: string, updates: Partial<HomeCard>) => void;
  deleteHomeCard: (id: string) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCard, setEditCard] = useState<HomeCard | null>(null);
  const [form, setForm] = useState<Partial<HomeCard>>({});
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const imageGallery = galleryItems.filter(
    (g) => !g.mediaType || g.mediaType === "photo",
  );

  const openAdd = () => {
    setEditCard(null);
    setForm({ icon: "🏠", isActive: true, sortOrder: homeCards.length + 1 });
    setDialogOpen(true);
  };

  const openEdit = (c: HomeCard) => {
    setEditCard(c);
    setForm({ ...c });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name?.trim()) return;
    if (editCard) {
      updateHomeCard(editCard.id, form);
    } else {
      addHomeCard({
        id: `hc${Date.now()}`,
        name: form.name ?? "",
        description: form.description ?? "",
        icon: form.icon ?? "🏠",
        imageUrl: form.imageUrl ?? "",
        isActive: form.isActive ?? true,
        sortOrder: form.sortOrder ?? homeCards.length + 1,
      });
    }
    setDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, imageUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-900">
            Home Cards (Schemes Section)
          </h3>
          <p className="text-gray-500 text-sm">
            These cards appear in the "Programs We Support" section on the home
            page.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-ngo-green hover:bg-green-700 text-white"
          data-ocid="admin_homecards.open_modal_button"
        >
          + Add Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {homeCards
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((card, idx) => (
            <div
              key={card.id}
              className={`border rounded-xl overflow-hidden transition-shadow hover:shadow-md ${card.isActive ? "border-gray-200" : "border-gray-100 opacity-60"}`}
              data-ocid={`admin_homecards.item.${idx + 1}`}
            >
              {card.imageUrl && (
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-4">
                {!card.imageUrl && (
                  <div className="text-3xl mb-2">{card.icon}</div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      {card.name}
                    </div>
                    <div className="text-gray-500 text-xs mt-1 line-clamp-2">
                      {card.description}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(card)}
                      data-ocid={`admin_homecards.edit_button.${idx + 1}`}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (window.confirm(`Delete "${card.name}"?`))
                          deleteHomeCard(card.id);
                      }}
                      data-ocid={`admin_homecards.delete_button.${idx + 1}`}
                    >
                      Del
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    Order: {card.sortOrder}
                  </span>
                  <span
                    className={`text-xs font-medium ${card.isActive ? "text-green-600" : "text-gray-400"}`}
                  >
                    {card.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_homecards.dialog">
          <DialogHeader>
            <DialogTitle>{editCard ? "Edit Card" : "Add New Card"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Card Name *</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Beti Bachao Beti Padhao"
                className="mt-1"
                data-ocid="admin_homecards.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Short description of the scheme"
                rows={2}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Icon (Emoji)</Label>
              <Input
                value={form.icon ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, icon: e.target.value }))
                }
                placeholder="e.g. 👧 🔥 🏠"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Card Image</Label>
              <div className="mt-1 space-y-2">
                {form.imageUrl && (
                  <div className="relative">
                    <img
                      src={form.imageUrl}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 text-xs"
                      onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileRef.current?.click()}
                    data-ocid="admin_homecards.upload_button"
                  >
                    <ImageIcon size={14} className="mr-1" /> Upload Image
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setGalleryPickerOpen(true)}
                    data-ocid="admin_homecards.secondary_button"
                  >
                    Pick from Gallery
                  </Button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  If no image is set, the emoji icon will be shown instead.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={form.sortOrder ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  min={1}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end gap-2 pb-1">
                <Switch
                  checked={form.isActive ?? true}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isActive: v }))
                  }
                  data-ocid="admin_homecards.switch"
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin_homecards.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-ngo-green hover:bg-green-700 text-white"
              disabled={!form.name?.trim()}
              data-ocid="admin_homecards.save_button"
            >
              {editCard ? "Save Changes" : "Add Card"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Gallery Picker Dialog */}
      <Dialog open={galleryPickerOpen} onOpenChange={setGalleryPickerOpen}>
        <DialogContent className="max-w-2xl" data-ocid="admin_homecards.modal">
          <DialogHeader>
            <DialogTitle>Pick Image from Gallery</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto py-2">
            {imageGallery.length === 0 && (
              <p className="col-span-3 text-center text-gray-500 py-8">
                No images in gallery yet.
              </p>
            )}
            {imageGallery.map((g) => (
              <button
                key={g.id}
                type="button"
                className="rounded-lg overflow-hidden border-2 border-transparent hover:border-ngo-green transition-all cursor-pointer"
                onClick={() => {
                  setForm((f) => ({ ...f, imageUrl: g.src }));
                  setGalleryPickerOpen(false);
                }}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  className="w-full h-24 object-cover"
                />
                <p className="text-xs text-gray-500 p-1 truncate">
                  {g.caption}
                </p>
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setGalleryPickerOpen(false)}
              data-ocid="admin_homecards.close_button"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
    sliderImages,
    addSliderImage,
    updateSliderImage,
    deleteSliderImage,
    homeCards,
    addHomeCard,
    updateHomeCard,
    deleteHomeCard,
    galleryItems,
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
          <TabsTrigger value="slider" data-ocid="admin_homepage.tab">
            Image Slider
          </TabsTrigger>
          <TabsTrigger value="homecards" data-ocid="admin_homepage.tab">
            Home Cards
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
        {/* IMAGE SLIDER TAB */}
        <TabsContent value="slider">
          <SliderImagesTab
            sliderImages={sliderImages}
            addSliderImage={addSliderImage}
            updateSliderImage={updateSliderImage}
            deleteSliderImage={deleteSliderImage}
          />
        </TabsContent>
        {/* HOME CARDS TAB */}
        <TabsContent value="homecards">
          <HomeCardsTab
            homeCards={homeCards}
            galleryItems={galleryItems}
            addHomeCard={addHomeCard}
            updateHomeCard={updateHomeCard}
            deleteHomeCard={deleteHomeCard}
          />
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
