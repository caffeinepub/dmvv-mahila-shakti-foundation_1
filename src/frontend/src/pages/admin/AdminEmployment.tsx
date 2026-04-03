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
import { Card, CardContent } from "@/components/ui/card";
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
  type EmploymentPartner,
  type SuccessStory,
  useApp,
} from "@/context/AppContext";
import {
  Building2,
  ImageIcon,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AdminEmployment() {
  const {
    employmentPartners,
    addEmploymentPartner,
    updateEmploymentPartner,
    deleteEmploymentPartner,
    successStories,
    addSuccessStory,
    updateSuccessStory,
    deleteSuccessStory,
  } = useApp();

  // Partners
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    sector: "",
    openings: 0,
    description: "",
    isActive: true,
    sortOrder: 1,
  });
  const [editPartner, setEditPartner] = useState<EmploymentPartner | null>(
    null,
  );
  const [editPartnerForm, setEditPartnerForm] = useState({
    name: "",
    sector: "",
    openings: 0,
    description: "",
    isActive: true,
    sortOrder: 1,
  });

  // Stories
  const [storyOpen, setStoryOpen] = useState(false);
  const [storyForm, setStoryForm] = useState({
    name: "",
    from: "",
    now: "",
    income: "",
    quote: "",
    photoUrl: "",
    isActive: true,
    sortOrder: 1,
  });
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const storyFileRef = useRef<HTMLInputElement>(null);
  const [editStory, setEditStory] = useState<SuccessStory | null>(null);
  const [editStoryForm, setEditStoryForm] = useState({
    name: "",
    from: "",
    now: "",
    income: "",
    quote: "",
    photoUrl: "",
    isActive: true,
    sortOrder: 1,
  });
  const [editStoryImage, setEditStoryImage] = useState<string | null>(null);
  const editStoryFileRef = useRef<HTMLInputElement>(null);

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

  const handleAddPartner = () => {
    if (!partnerForm.name.trim()) {
      toast.error("Partner ka naam zaroori hai.");
      return;
    }
    addEmploymentPartner({
      id: `ep_${Date.now()}`,
      ...partnerForm,
      name: partnerForm.name.trim(),
    });
    toast.success("Partner add ho gaya.");
    setPartnerOpen(false);
    setPartnerForm({
      name: "",
      sector: "",
      openings: 0,
      description: "",
      isActive: true,
      sortOrder: 1,
    });
  };

  const openEditPartner = (p: EmploymentPartner) => {
    setEditPartner(p);
    setEditPartnerForm({
      name: p.name,
      sector: p.sector,
      openings: p.openings,
      description: p.description,
      isActive: p.isActive,
      sortOrder: p.sortOrder,
    });
  };

  const handleSavePartner = () => {
    if (!editPartner) return;
    updateEmploymentPartner(editPartner.id, { ...editPartnerForm });
    toast.success("Partner update ho gaya.");
    setEditPartner(null);
  };

  const handleAddStory = () => {
    if (!storyForm.name.trim()) {
      toast.error("Naam zaroori hai.");
      return;
    }
    addSuccessStory({
      id: `ss_${Date.now()}`,
      ...storyForm,
      photoUrl: storyImage || storyForm.photoUrl || undefined,
    });
    toast.success("Success story add ho gayi.");
    setStoryOpen(false);
    setStoryForm({
      name: "",
      from: "",
      now: "",
      income: "",
      quote: "",
      photoUrl: "",
      isActive: true,
      sortOrder: 1,
    });
    setStoryImage(null);
  };

  const openEditStory = (s: SuccessStory) => {
    setEditStory(s);
    setEditStoryForm({
      name: s.name,
      from: s.from,
      now: s.now,
      income: s.income,
      quote: s.quote,
      photoUrl: s.photoUrl || "",
      isActive: s.isActive,
      sortOrder: s.sortOrder || 0,
    });
    setEditStoryImage(s.photoUrl || null);
  };

  const handleSaveStory = () => {
    if (!editStory) return;
    updateSuccessStory(editStory.id, {
      ...editStoryForm,
      photoUrl: editStoryImage || editStoryForm.photoUrl || undefined,
    });
    toast.success("Story update ho gayi.");
    setEditStory(null);
    setEditStoryImage(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Employment Page Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Industry partners aur success stories manage karen
        </p>
      </div>

      <Tabs defaultValue="partners">
        <TabsList className="mb-6">
          <TabsTrigger value="partners">
            <Building2 size={14} className="mr-2" />
            Industry Partners ({employmentPartners.length})
          </TabsTrigger>
          <TabsTrigger value="stories">
            <Users size={14} className="mr-2" />
            Success Stories ({successStories.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="partners">
          <div className="flex justify-end mb-4">
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={() => setPartnerOpen(true)}
            >
              <Plus size={16} className="mr-1" /> Partner Add Karen
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employmentPartners.map((p) => (
              <Card key={p.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{p.name}</h3>
                      <p className="text-xs text-gray-500">{p.sector}</p>
                      <Badge className="mt-1 bg-green-100 text-green-700 text-xs">
                        {p.openings} openings
                      </Badge>
                      <Badge
                        className={`ml-2 text-xs ${p.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Switch
                        checked={p.isActive}
                        onCheckedChange={(v) =>
                          updateEmploymentPartner(p.id, { isActive: v })
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditPartner(p)}
                      >
                        <Pencil size={14} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-500"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Partner Delete Karen?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              "{p.name}" delete ho jayega.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600"
                              onClick={() => {
                                deleteEmploymentPartner(p.id);
                                toast.success("Delete ho gaya.");
                              }}
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

        <TabsContent value="stories">
          <div className="flex justify-end mb-4">
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={() => setStoryOpen(true)}
            >
              <Plus size={16} className="mr-1" /> Story Add Karen
            </Button>
          </div>
          <div className="space-y-3">
            {successStories.map((s) => (
              <Card key={s.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex gap-3">
                      {s.photoUrl ? (
                        <img
                          src={s.photoUrl}
                          alt={s.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-ngo-orange rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {s.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900">{s.name}</h3>
                        <p className="text-xs text-gray-500">
                          {s.from} → {s.now}
                        </p>
                        <p className="text-xs text-ngo-orange font-bold">
                          {s.income}
                        </p>
                        <Badge
                          className={`mt-1 text-xs ${s.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                        >
                          {s.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Switch
                        checked={s.isActive}
                        onCheckedChange={(v) =>
                          updateSuccessStory(s.id, { isActive: v })
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditStory(s)}
                      >
                        <Pencil size={14} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-500"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Story Delete Karen?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              "{s.name}" ki story delete ho jayegi.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600"
                              onClick={() => {
                                deleteSuccessStory(s.id);
                                toast.success("Delete ho gayi.");
                              }}
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
      </Tabs>

      {/* Add Partner Dialog */}
      <Dialog open={partnerOpen} onOpenChange={setPartnerOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Partner Add Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Company Name *</Label>
              <Input
                value={partnerForm.name}
                onChange={(e) =>
                  setPartnerForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Sector</Label>
                <Input
                  value={partnerForm.sector}
                  onChange={(e) =>
                    setPartnerForm((f) => ({ ...f, sector: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Openings</Label>
                <Input
                  type="number"
                  value={partnerForm.openings}
                  onChange={(e) =>
                    setPartnerForm((f) => ({
                      ...f,
                      openings: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={partnerForm.description}
                onChange={(e) =>
                  setPartnerForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={2}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={partnerForm.isActive}
                onCheckedChange={(v) =>
                  setPartnerForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPartnerOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAddPartner}
            >
              Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Partner Dialog */}
      <Dialog open={!!editPartner} onOpenChange={() => setEditPartner(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Partner Edit Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Company Name *</Label>
              <Input
                value={editPartnerForm.name}
                onChange={(e) =>
                  setEditPartnerForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Sector</Label>
                <Input
                  value={editPartnerForm.sector}
                  onChange={(e) =>
                    setEditPartnerForm((f) => ({
                      ...f,
                      sector: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Openings</Label>
                <Input
                  type="number"
                  value={editPartnerForm.openings}
                  onChange={(e) =>
                    setEditPartnerForm((f) => ({
                      ...f,
                      openings: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editPartnerForm.description}
                onChange={(e) =>
                  setEditPartnerForm((f) => ({
                    ...f,
                    description: e.target.value,
                  }))
                }
                rows={2}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editPartnerForm.isActive}
                onCheckedChange={(v) =>
                  setEditPartnerForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPartner(null)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleSavePartner}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Story Dialog */}
      <Dialog open={storyOpen} onOpenChange={setStoryOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Success Story Add Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-semibold">Photo (optional)</Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-ngo-green"
                onClick={() => storyFileRef.current?.click()}
              >
                {storyImage ? (
                  <img
                    src={storyImage}
                    alt="preview"
                    className="mx-auto max-h-28 object-contain rounded"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={28} className="mx-auto mb-1" />
                    <p className="text-sm">Photo select karein</p>
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
                  Photo hatao
                </Button>
              )}
            </div>
            <div>
              <Label>Naam *</Label>
              <Input
                value={storyForm.name}
                onChange={(e) =>
                  setStoryForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Shehar / Gaon</Label>
                <Input
                  value={storyForm.from}
                  onChange={(e) =>
                    setStoryForm((f) => ({ ...f, from: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="Bareilly, UP"
                />
              </div>
              <div>
                <Label>Ab Kya Karti Hain</Label>
                <Input
                  value={storyForm.now}
                  onChange={(e) =>
                    setStoryForm((f) => ({ ...f, now: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Mahina Kamaa</Label>
              <Input
                value={storyForm.income}
                onChange={(e) =>
                  setStoryForm((f) => ({ ...f, income: e.target.value }))
                }
                className="mt-1"
                placeholder="₹20,000/month"
              />
            </div>
            <div>
              <Label>Quote</Label>
              <Textarea
                value={storyForm.quote}
                onChange={(e) =>
                  setStoryForm((f) => ({ ...f, quote: e.target.value }))
                }
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={storyForm.isActive}
                onCheckedChange={(v) =>
                  setStoryForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStoryOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAddStory}
            >
              Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Story Dialog */}
      <Dialog open={!!editStory} onOpenChange={() => setEditStory(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Success Story Edit Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-semibold">Photo</Label>
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-ngo-green"
                onClick={() => editStoryFileRef.current?.click()}
              >
                {editStoryImage ? (
                  <img
                    src={editStoryImage}
                    alt="preview"
                    className="mx-auto max-h-28 object-contain rounded"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={28} className="mx-auto mb-1" />
                    <p className="text-sm">Photo select karein</p>
                  </div>
                )}
              </button>
              <input
                ref={editStoryFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => readFile(e, setEditStoryImage)}
              />
              {editStoryImage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-red-500"
                  onClick={() => setEditStoryImage(null)}
                >
                  Photo hatao
                </Button>
              )}
            </div>
            <div>
              <Label>Naam *</Label>
              <Input
                value={editStoryForm.name}
                onChange={(e) =>
                  setEditStoryForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Shehar / Gaon</Label>
                <Input
                  value={editStoryForm.from}
                  onChange={(e) =>
                    setEditStoryForm((f) => ({ ...f, from: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Ab Kya Karti Hain</Label>
                <Input
                  value={editStoryForm.now}
                  onChange={(e) =>
                    setEditStoryForm((f) => ({ ...f, now: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Mahina Kamaa</Label>
              <Input
                value={editStoryForm.income}
                onChange={(e) =>
                  setEditStoryForm((f) => ({ ...f, income: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Quote</Label>
              <Textarea
                value={editStoryForm.quote}
                onChange={(e) =>
                  setEditStoryForm((f) => ({ ...f, quote: e.target.value }))
                }
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editStoryForm.isActive}
                onCheckedChange={(v) =>
                  setEditStoryForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditStory(null)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleSaveStory}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
