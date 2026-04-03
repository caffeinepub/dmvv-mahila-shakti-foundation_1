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
import { Textarea } from "@/components/ui/textarea";
import { type TrainingProgram, useApp } from "@/context/AppContext";
import {
  GraduationCap,
  ImageIcon,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const COLOR_OPTIONS = [
  { label: "Pink", value: "border-pink-400" },
  { label: "Blue", value: "border-blue-400" },
  { label: "Purple", value: "border-purple-400" },
  { label: "Orange", value: "border-orange-400" },
  { label: "Yellow", value: "border-yellow-400" },
  { label: "Green", value: "border-green-400" },
  { label: "Teal", value: "border-teal-400" },
  { label: "Red", value: "border-red-400" },
];

const emptyProgram = (): Omit<TrainingProgram, "id"> => ({
  title: "",
  duration: "",
  eligibility: "",
  certification: "",
  description: "",
  outcomes: [""],
  image: "",
  color: "border-green-400",
  isActive: true,
});

export default function AdminTraining() {
  const {
    trainingPrograms,
    addTrainingProgram,
    updateTrainingProgram,
    deleteTrainingProgram,
  } = useApp();

  const [addOpen, setAddOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<TrainingProgram | null>(
    null,
  );
  const [formData, setFormData] = useState<Omit<TrainingProgram, "id">>(
    emptyProgram(),
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      setFormData((prev) => ({ ...prev, image: dataUrl }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openAdd = () => {
    setFormData(emptyProgram());
    setImagePreview(null);
    setAddOpen(true);
  };

  const openEdit = (program: TrainingProgram) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      duration: program.duration,
      eligibility: program.eligibility,
      certification: program.certification,
      description: program.description,
      outcomes: [...program.outcomes],
      image: program.image,
      color: program.color,
      isActive: program.isActive,
    });
    setImagePreview(null);
  };

  const handleOutcomeChange = (idx: number, value: string) => {
    setFormData((prev) => {
      const outcomes = [...prev.outcomes];
      outcomes[idx] = value;
      return { ...prev, outcomes };
    });
  };

  const addOutcome = () =>
    setFormData((prev) => ({ ...prev, outcomes: [...prev.outcomes, ""] }));

  const removeOutcome = (idx: number) =>
    setFormData((prev) => ({
      ...prev,
      outcomes: prev.outcomes.filter((_, i) => i !== idx),
    }));

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Program title required.");
      return false;
    }
    if (!formData.duration.trim()) {
      toast.error("Duration required.");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description required.");
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!validateForm()) return;
    const program: TrainingProgram = {
      id: `tp_${Date.now()}`,
      ...formData,
      outcomes: formData.outcomes.filter((o) => o.trim()),
    };
    addTrainingProgram(program);
    toast.success("Training program added.");
    setAddOpen(false);
  };

  const handleSaveEdit = () => {
    if (!editingProgram) return;
    if (!validateForm()) return;
    updateTrainingProgram(editingProgram.id, {
      ...formData,
      outcomes: formData.outcomes.filter((o) => o.trim()),
    });
    toast.success("Program updated.");
    setEditingProgram(null);
  };

  const handleDelete = (id: string) => {
    deleteTrainingProgram(id);
    toast.success("Program deleted.");
  };

  const ProgramForm = (
    <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
      {/* Image Upload */}
      <div>
        <Label>Program Photo</Label>
        <button
          type="button"
          className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:border-ngo-green transition-colors"
          onClick={() => fileRef.current?.click()}
          data-ocid="admin_training.image_upload"
        >
          {imagePreview || formData.image ? (
            <img
              src={imagePreview || formData.image}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="py-10 text-gray-400 flex flex-col items-center">
              <ImageIcon size={32} className="mb-2 opacity-40" />
              <p className="text-sm">Click to select photo from gallery</p>
            </div>
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
        {(imagePreview || formData.image) && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-1 text-xs"
            onClick={() => {
              setImagePreview(null);
              setFormData((p) => ({ ...p, image: "" }));
            }}
          >
            <X size={12} className="mr-1" /> Remove Photo
          </Button>
        )}
      </div>

      {/* Title */}
      <div>
        <Label>Program Title *</Label>
        <Input
          value={formData.title}
          onChange={(e) =>
            setFormData((p) => ({ ...p, title: e.target.value }))
          }
          placeholder="e.g. Tailoring & Fashion Design"
          className="mt-1"
          data-ocid="admin_training.input"
        />
      </div>

      {/* Duration + Eligibility */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Duration *</Label>
          <Input
            value={formData.duration}
            onChange={(e) =>
              setFormData((p) => ({ ...p, duration: e.target.value }))
            }
            placeholder="e.g. 3-6 Months"
            className="mt-1"
            data-ocid="admin_training.input"
          />
        </div>
        <div>
          <Label>Eligibility</Label>
          <Input
            value={formData.eligibility}
            onChange={(e) =>
              setFormData((p) => ({ ...p, eligibility: e.target.value }))
            }
            placeholder="e.g. Women aged 18-45"
            className="mt-1"
            data-ocid="admin_training.input"
          />
        </div>
      </div>

      {/* Certification */}
      <div>
        <Label>Certification</Label>
        <Input
          value={formData.certification}
          onChange={(e) =>
            setFormData((p) => ({ ...p, certification: e.target.value }))
          }
          placeholder="e.g. NSQF Level 4 - Apparel Sector"
          className="mt-1"
          data-ocid="admin_training.input"
        />
      </div>

      {/* Description */}
      <div>
        <Label>Description *</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="Program description..."
          className="mt-1"
          rows={3}
          data-ocid="admin_training.textarea"
        />
      </div>

      {/* Card Color */}
      <div>
        <Label>Card Border Color</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setFormData((p) => ({ ...p, color: c.value }))}
              className={`px-3 py-1 rounded text-xs border-2 transition-all ${
                formData.color === c.value
                  ? "border-gray-700 font-bold"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <span
                className={`inline-block w-3 h-3 rounded-full mr-1 border-2 ${c.value}`}
              />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Learning Outcomes */}
      <div>
        <Label>Learning Outcomes</Label>
        <div className="space-y-2 mt-2">
          {formData.outcomes.map((outcome, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: outcomes are ordered by index
            <div key={idx} className="flex gap-2">
              <Input
                value={outcome}
                onChange={(e) => handleOutcomeChange(idx, e.target.value)}
                placeholder={`Outcome ${idx + 1}`}
                className="flex-1"
                data-ocid="admin_training.input"
              />
              {formData.outcomes.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 px-2"
                  onClick={() => removeOutcome(idx)}
                >
                  <X size={14} />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={addOutcome}
          >
            <Plus size={12} className="mr-1" /> Add Outcome
          </Button>
        </div>
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-3">
        <Switch
          checked={formData.isActive}
          onCheckedChange={(v) => setFormData((p) => ({ ...p, isActive: v }))}
          id="isActive"
        />
        <Label htmlFor="isActive" className="cursor-pointer">
          Program Active (visible on public page)
        </Label>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Training Programs
        </h1>
        <Button
          className="bg-ngo-green text-white hover:bg-ngo-green-dark"
          onClick={openAdd}
          data-ocid="admin_training.add_button"
        >
          <Plus size={16} className="mr-2" />
          Add Program
        </Button>
      </div>

      {trainingPrograms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <GraduationCap size={52} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">No training programs yet</p>
          <p className="text-sm mt-1">
            Add your first training program to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {trainingPrograms.map((program, idx) => (
            <div
              key={program.id}
              className={`border-l-4 ${program.color} bg-white rounded-xl shadow-sm overflow-hidden`}
              data-ocid={`admin_training.item.${idx + 1}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-4">
                {/* Image */}
                <div className="md:col-span-1">
                  {program.image ? (
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-40 md:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 md:h-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon size={32} className="text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="md:col-span-3 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h2 className="text-lg font-extrabold text-gray-900">
                        {program.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge className="bg-gray-100 text-gray-600 border-0 text-xs">
                          {program.duration}
                        </Badge>
                        {program.isActive ? (
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-600 border-0 text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => openEdit(program)}
                        title="Edit"
                        data-ocid="admin_training.edit_button"
                      >
                        <Pencil size={13} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 w-8 p-0"
                            title="Delete"
                            data-ocid="admin_training.delete_button"
                          >
                            <Trash2 size={13} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent data-ocid="admin_training.dialog">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Program</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              <strong>{program.title}</strong>? This cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 text-white hover:bg-red-700"
                              onClick={() => handleDelete(program.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {program.eligibility && (
                    <p className="text-xs text-gray-500 mb-1">
                      <span className="font-medium">Eligibility:</span>{" "}
                      {program.eligibility}
                    </p>
                  )}
                  {program.certification && (
                    <p className="text-xs text-green-700 mb-2">
                      <span className="font-medium">Certification:</span>{" "}
                      {program.certification}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {program.description}
                  </p>

                  {program.outcomes.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-1">
                        Learning Outcomes:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {program.outcomes.slice(0, 5).map((o) => (
                          <span
                            key={o}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                          >
                            {o}
                          </span>
                        ))}
                        {program.outcomes.length > 5 && (
                          <span className="text-xs text-gray-400">
                            +{program.outcomes.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Program Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_training.dialog">
          <DialogHeader>
            <DialogTitle>Add Training Program</DialogTitle>
          </DialogHeader>
          {ProgramForm}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green text-white hover:bg-ngo-green-dark"
              onClick={handleAdd}
              data-ocid="admin_training.submit_button"
            >
              Add Program
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Program Dialog */}
      <Dialog
        open={!!editingProgram}
        onOpenChange={(open) => !open && setEditingProgram(null)}
      >
        <DialogContent className="max-w-lg" data-ocid="admin_training.dialog">
          <DialogHeader>
            <DialogTitle>Edit Training Program</DialogTitle>
          </DialogHeader>
          {ProgramForm}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProgram(null)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green text-white hover:bg-ngo-green-dark"
              onClick={handleSaveEdit}
              data-ocid="admin_training.save_button"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
