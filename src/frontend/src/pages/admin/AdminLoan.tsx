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
import { Textarea } from "@/components/ui/textarea";
import { type LoanScheme, useApp } from "@/context/AppContext";
import {
  Check,
  Copy,
  ExternalLink,
  Link2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY: Omit<LoanScheme, "id"> = {
  name: "",
  amount: "",
  interest: "",
  tenure: "",
  description: "",
  eligibility: [""],
  color: "border-green-400",
  isActive: true,
  sortOrder: 1,
};

function ListEditor({
  values,
  onChange,
}: { values: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: editable list requires index
        <div key={i} className="flex gap-2">
          <Input
            value={v}
            onChange={(e) => {
              const n = [...values];
              n[i] = e.target.value;
              onChange(n);
            }}
            placeholder={`Item ${i + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={() => onChange(values.filter((_, j) => j !== i))}
          >
            ✕
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...values, ""])}
      >
        + Add
      </Button>
    </div>
  );
}

export default function AdminLoan() {
  const { loanSchemes, addLoanScheme, updateLoanScheme, deleteLoanScheme } =
    useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY, eligibility: [""] });

  const [editItem, setEditItem] = useState<LoanScheme | null>(null);
  const [editForm, setEditForm] = useState({ ...EMPTY });
  const [linkCopied, setLinkCopied] = useState(false);

  // Generate shareable public loan apply link
  const publicLoanApplyUrl = `${window.location.origin}${window.location.pathname}#/loan-apply`;

  const copyLink = () => {
    navigator.clipboard
      .writeText(publicLoanApplyUrl)
      .then(() => {
        setLinkCopied(true);
        toast.success("Link copy ho gaya! Share karein.");
        setTimeout(() => setLinkCopied(false), 2500);
      })
      .catch(() => {
        toast.error("Copy nahi hua, manually copy karein.");
      });
  };

  const handleAdd = () => {
    if (!addForm.name.trim()) {
      toast.error("Loan scheme ka naam zaroori hai.");
      return;
    }
    addLoanScheme({
      id: `ls_${Date.now()}`,
      ...addForm,
      name: addForm.name.trim(),
      eligibility: addForm.eligibility.filter(Boolean),
    });
    toast.success("Loan scheme add ho gayi.");
    setAddOpen(false);
    setAddForm({ ...EMPTY, eligibility: [""] });
  };

  const openEdit = (item: LoanScheme) => {
    setEditItem(item);
    setEditForm({ ...item });
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    updateLoanScheme(editItem.id, {
      ...editForm,
      eligibility: editForm.eligibility.filter(Boolean),
    });
    toast.success("Loan scheme update ho gayi.");
    setEditItem(null);
  };

  const CommonForm = ({
    form,
    setForm,
  }: { form: any; setForm: React.Dispatch<React.SetStateAction<any>> }) => (
    <>
      <div>
        <Label>Scheme Name *</Label>
        <Input
          value={form.name}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, name: e.target.value }))
          }
          className="mt-1"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>Loan Amount</Label>
          <Input
            value={form.amount}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, amount: e.target.value }))
            }
            className="mt-1"
            placeholder="Up to ₹50,000"
          />
        </div>
        <div>
          <Label>Interest Rate</Label>
          <Input
            value={form.interest}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, interest: e.target.value }))
            }
            className="mt-1"
            placeholder="7-10% p.a."
          />
        </div>
        <div>
          <Label>Tenure</Label>
          <Input
            value={form.tenure}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, tenure: e.target.value }))
            }
            className="mt-1"
            placeholder="Up to 5 years"
          />
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, description: e.target.value }))
          }
          rows={3}
          className="mt-1"
        />
      </div>
      <div>
        <Label>Eligibility (ek ek point alag)</Label>
        <ListEditor
          values={form.eligibility}
          onChange={(v) => setForm((f: any) => ({ ...f, eligibility: v }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Sort Order</Label>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, sortOrder: Number(e.target.value) }))
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label>Border Color Class</Label>
          <Input
            value={form.color}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, color: e.target.value }))
            }
            className="mt-1"
            placeholder="border-green-400"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={form.isActive}
          onCheckedChange={(v) => setForm((f: any) => ({ ...f, isActive: v }))}
        />
        <Label>Active</Label>
      </div>
    </>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Loan Schemes Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Loan page ke liye schemes manage karen — add, edit, active/inactive
          </p>
        </div>
        <Button
          className="bg-ngo-green hover:bg-green-700 text-white"
          onClick={() => setAddOpen(true)}
        >
          <Plus size={16} className="mr-1" /> Nayi Loan Scheme
        </Button>
      </div>

      {/* ──── SHAREABLE LOAN APPLY LINK ──── */}
      <Card className="mb-6 border-2 border-green-300 bg-green-50">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-full bg-green-100">
              <Link2 size={22} className="text-green-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900">
                  Loan Apply Shareable Link
                </h3>
                <Badge className="bg-green-600 text-white text-xs">New</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Is link ko share karein — koi bhi is link se seedha Loan
                Application Form bhar sakta hai. Submit hone par application
                aapko <strong>Loan Applications</strong> mein dikhai degi.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-white border border-green-200 rounded-lg px-3 py-2 text-sm text-gray-700 font-mono break-all select-all">
                  {publicLoanApplyUrl}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={copyLink}
                    className={`${
                      linkCopied
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-ngo-green hover:bg-green-700"
                    } text-white`}
                    data-ocid="admin_loan.copy_link_button"
                  >
                    {linkCopied ? (
                      <>
                        <Check size={15} className="mr-1" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={15} className="mr-1" /> Copy Link
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-400 text-green-700"
                    onClick={() => window.open(publicLoanApplyUrl, "_blank")}
                    data-ocid="admin_loan.open_link_button"
                  >
                    <ExternalLink size={15} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {loanSchemes.map((item) => (
          <Card key={item.id} className={`border-l-4 ${item.color}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.amount}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.interest}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.tenure}
                    </Badge>
                    <Badge
                      className={
                        item.isActive
                          ? "bg-green-100 text-green-700 text-xs"
                          : "bg-gray-100 text-gray-500 text-xs"
                      }
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={(v) =>
                      updateLoanScheme(item.id, { isActive: v })
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(item)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Loan Scheme Delete Karen?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          "{item.name}" permanently delete ho jayegi.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            deleteLoanScheme(item.id);
                            toast.success("Loan scheme delete ho gayi.");
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

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nayi Loan Scheme Add Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <CommonForm form={addForm} setForm={setAddForm} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleAdd}
            >
              Add Karen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Loan Scheme Edit Karen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <CommonForm form={editForm} setForm={setEditForm} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button
              className="bg-ngo-green hover:bg-green-700 text-white"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
