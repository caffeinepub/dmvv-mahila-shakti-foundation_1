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
  type AwardCategory,
  type AwardWinner,
  useApp,
} from "@/context/AppContext";
import { Award, Pencil, Plus, Trash2, Trophy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminRewards() {
  const {
    awardCategories,
    addAwardCategory,
    updateAwardCategory,
    deleteAwardCategory,
    awardWinners,
    addAwardWinner,
    updateAwardWinner,
    deleteAwardWinner,
  } = useApp();

  // Award Categories
  const [catOpen, setCatOpen] = useState(false);
  const [catForm, setCatForm] = useState({
    category: "",
    description: "",
    prize: "",
    color: "border-yellow-400 bg-yellow-50",
    isActive: true,
    sortOrder: 1,
  });
  const [editCat, setEditCat] = useState<AwardCategory | null>(null);
  const [editCatForm, setEditCatForm] = useState({
    category: "",
    description: "",
    prize: "",
    color: "border-yellow-400 bg-yellow-50",
    isActive: true,
    sortOrder: 1,
  });

  // Award Winners
  const [winnerOpen, setWinnerOpen] = useState(false);
  const [winnerForm, setWinnerForm] = useState({
    name: "",
    year: new Date().getFullYear().toString(),
    category: "",
    state: "",
    isActive: true,
    sortOrder: 1,
  });
  const [editWinner, setEditWinner] = useState<AwardWinner | null>(null);
  const [editWinnerForm, setEditWinnerForm] = useState({
    name: "",
    year: "",
    category: "",
    state: "",
    isActive: true,
    sortOrder: 1,
  });

  const handleAddCat = () => {
    if (!catForm.category.trim()) {
      toast.error("Category naam zaroori hai.");
      return;
    }
    addAwardCategory({
      id: `ac_${Date.now()}`,
      ...catForm,
      category: catForm.category.trim(),
    });
    toast.success("Award category add ho gayi.");
    setCatOpen(false);
    setCatForm({
      category: "",
      description: "",
      prize: "",
      color: "border-yellow-400 bg-yellow-50",
      isActive: true,
      sortOrder: 1,
    });
  };

  const openEditCat = (a: AwardCategory) => {
    setEditCat(a);
    setEditCatForm({
      category: a.category || "",
      description: a.description,
      prize: a.prize || "",
      color: a.color,
      isActive: a.isActive,
      sortOrder: a.sortOrder,
    });
  };

  const handleSaveCat = () => {
    if (!editCat) return;
    updateAwardCategory(editCat.id, { ...editCatForm });
    toast.success("Category update ho gayi.");
    setEditCat(null);
  };

  const handleAddWinner = () => {
    if (!winnerForm.name.trim()) {
      toast.error("Naam zaroori hai.");
      return;
    }
    addAwardWinner({
      id: `aw_${Date.now()}`,
      ...winnerForm,
      name: winnerForm.name.trim(),
    });
    toast.success("Winner add ho gaya.");
    setWinnerOpen(false);
    setWinnerForm({
      name: "",
      year: new Date().getFullYear().toString(),
      category: "",
      state: "",
      isActive: true,
      sortOrder: 1,
    });
  };

  const openEditWinner = (w: AwardWinner) => {
    setEditWinner(w);
    setEditWinnerForm({
      name: w.name,
      year: w.year,
      category: w.category || "",
      state: w.state || "",
      isActive: w.isActive,
      sortOrder: w.sortOrder || 0,
    });
  };

  const handleSaveWinner = () => {
    if (!editWinner) return;
    updateAwardWinner(editWinner.id, { ...editWinnerForm });
    toast.success("Winner update ho gaya.");
    setEditWinner(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Rewards Page Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Award categories aur past winners manage karen
        </p>
      </div>

      <Tabs defaultValue="categories">
        <TabsList className="mb-6">
          <TabsTrigger value="categories">
            <Award size={14} className="mr-2" />
            Award Categories ({awardCategories.length})
          </TabsTrigger>
          <TabsTrigger value="winners">
            <Trophy size={14} className="mr-2" />
            Past Winners ({awardWinners.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="flex justify-end mb-4">
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={() => setCatOpen(true)}
            >
              <Plus size={16} className="mr-1" /> Category Add Karen
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awardCategories.map((a) => (
              <Card key={a.id} className={`border-l-4 ${a.color}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{a.category}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {a.description}
                      </p>
                      <Badge className="mt-2 bg-ngo-orange text-white text-xs">
                        {a.prize}
                      </Badge>
                      <Badge
                        className={`ml-2 text-xs ${a.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {a.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Switch
                        checked={a.isActive}
                        onCheckedChange={(v) =>
                          updateAwardCategory(a.id, { isActive: v })
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditCat(a)}
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
                              Category Delete Karen?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              "{a.category}" delete ho jayegi.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600"
                              onClick={() => {
                                deleteAwardCategory(a.id);
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

        <TabsContent value="winners">
          <div className="flex justify-end mb-4">
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={() => setWinnerOpen(true)}
            >
              <Plus size={16} className="mr-1" /> Winner Add Karen
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {awardWinners.map((w) => (
              <Card key={w.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-ngo-orange rounded-full flex items-center justify-center text-white font-bold">
                      {w.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        {w.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {w.year} | {w.state}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs w-full justify-center"
                  >
                    {w.category}
                  </Badge>
                  <Badge
                    className={`mt-2 text-xs ${w.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                  >
                    {w.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <div className="flex gap-2 mt-3">
                    <Switch
                      checked={w.isActive}
                      onCheckedChange={(v) =>
                        updateAwardWinner(w.id, { isActive: v })
                      }
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditWinner(w)}
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
                            Winner Delete Karen?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            "{w.name}" delete ho jayega.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600"
                            onClick={() => {
                              deleteAwardWinner(w.id);
                              toast.success("Delete ho gaya.");
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
      </Tabs>

      {/* Add Category Dialog */}
      <Dialog open={catOpen} onOpenChange={setCatOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Award Category Add Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Category Name *</Label>
              <Input
                value={catForm.category}
                onChange={(e) =>
                  setCatForm((f) => ({ ...f, category: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={catForm.description}
                onChange={(e) =>
                  setCatForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={2}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Prize Amount / Description</Label>
              <Input
                value={catForm.prize}
                onChange={(e) =>
                  setCatForm((f) => ({ ...f, prize: e.target.value }))
                }
                className="mt-1"
                placeholder="₹25,000 + Certificate + Trophy"
              />
            </div>
            <div>
              <Label>Color Classes</Label>
              <Input
                value={catForm.color}
                onChange={(e) =>
                  setCatForm((f) => ({ ...f, color: e.target.value }))
                }
                className="mt-1"
                placeholder="border-yellow-400 bg-yellow-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={catForm.isActive}
                onCheckedChange={(v) =>
                  setCatForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCatOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAddCat}
            >
              Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={!!editCat} onOpenChange={() => setEditCat(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Category Edit Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Category Name *</Label>
              <Input
                value={editCatForm.category}
                onChange={(e) =>
                  setEditCatForm((f) => ({ ...f, category: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editCatForm.description}
                onChange={(e) =>
                  setEditCatForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={2}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Prize</Label>
              <Input
                value={editCatForm.prize}
                onChange={(e) =>
                  setEditCatForm((f) => ({ ...f, prize: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Color Classes</Label>
              <Input
                value={editCatForm.color}
                onChange={(e) =>
                  setEditCatForm((f) => ({ ...f, color: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editCatForm.isActive}
                onCheckedChange={(v) =>
                  setEditCatForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCat(null)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleSaveCat}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Winner Dialog */}
      <Dialog open={winnerOpen} onOpenChange={setWinnerOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Winner Add Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Winner Naam *</Label>
              <Input
                value={winnerForm.name}
                onChange={(e) =>
                  setWinnerForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Year</Label>
                <Input
                  value={winnerForm.year}
                  onChange={(e) =>
                    setWinnerForm((f) => ({ ...f, year: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={winnerForm.state}
                  onChange={(e) =>
                    setWinnerForm((f) => ({ ...f, state: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={winnerForm.category}
                onChange={(e) =>
                  setWinnerForm((f) => ({ ...f, category: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={winnerForm.isActive}
                onCheckedChange={(v) =>
                  setWinnerForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWinnerOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAddWinner}
            >
              Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Winner Dialog */}
      <Dialog open={!!editWinner} onOpenChange={() => setEditWinner(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Winner Edit Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Winner Naam *</Label>
              <Input
                value={editWinnerForm.name}
                onChange={(e) =>
                  setEditWinnerForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Year</Label>
                <Input
                  value={editWinnerForm.year}
                  onChange={(e) =>
                    setEditWinnerForm((f) => ({ ...f, year: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={editWinnerForm.state}
                  onChange={(e) =>
                    setEditWinnerForm((f) => ({ ...f, state: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={editWinnerForm.category}
                onChange={(e) =>
                  setEditWinnerForm((f) => ({ ...f, category: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editWinnerForm.isActive}
                onCheckedChange={(v) =>
                  setEditWinnerForm((f) => ({ ...f, isActive: v }))
                }
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditWinner(null)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleSaveWinner}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
