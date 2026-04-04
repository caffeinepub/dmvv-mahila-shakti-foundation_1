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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { type Review, useApp } from "@/context/AppContext";
import { CheckCircle, Pencil, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StarDisplay({ stars }: { stars: number }) {
  return (
    <span className="text-base">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= stars ? "#f59e0b" : "#d1d5db" }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function AdminReviews() {
  const { reviews, updateReview, deleteReview } = useApp();

  const [editOpen, setEditOpen] = useState(false);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [editForm, setEditForm] = useState<Partial<Review>>({});

  const openEdit = (r: Review) => {
    setEditReview(r);
    setEditForm({ ...r });
    setEditOpen(true);
  };

  const saveEdit = () => {
    if (!editReview) return;
    updateReview(editReview.id, editForm);
    toast.success("Review updated!");
    setEditOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Delete review from "${name}"? This cannot be undone.`))
      return;
    deleteReview(id);
    toast.success("Review deleted.");
  };

  const approveAll = () => {
    for (const r of reviews) {
      if (!r.isApproved) updateReview(r.id, { isApproved: true });
    }
    toast.success("All reviews approved!");
  };

  const pending = reviews.filter((r) => !r.isApproved).length;

  return (
    <div className="space-y-6" data-ocid="admin_reviews.page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="text-yellow-500" size={24} />
            Reviews & Testimonials
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage public reviews shown on the home page
          </p>
        </div>
        {pending > 0 && (
          <Button
            onClick={approveAll}
            className="bg-green-600 hover:bg-green-700 text-white"
            data-ocid="admin_reviews.primary_button"
          >
            <CheckCircle size={16} className="mr-2" />
            Approve All ({pending} pending)
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews ({reviews.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {reviews.length === 0 ? (
            <div
              className="text-center py-12 text-gray-500"
              data-ocid="admin_reviews.empty_state"
            >
              No reviews yet. They will appear here when users submit them from
              the home page.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin_reviews.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Stars</TableHead>
                    <TableHead className="min-w-[240px]">Review</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((r, idx) => (
                    <TableRow
                      key={r.id}
                      data-ocid={`admin_reviews.row.${idx + 1}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${r.avatarColor}`}
                          >
                            {r.profileInitial}
                          </div>
                          <span className="font-medium text-sm">{r.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StarDisplay stars={r.stars} />
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                          {r.text}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                        {new Date(r.date).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell>
                        {r.isApproved ? (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Approved
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(r)}
                            data-ocid={`admin_reviews.edit_button.${idx + 1}`}
                          >
                            <Pencil size={14} />
                          </Button>
                          {!r.isApproved && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                updateReview(r.id, { isApproved: true });
                                toast.success("Review approved!");
                              }}
                              data-ocid={`admin_reviews.confirm_button.${idx + 1}`}
                            >
                              Approve
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(r.id, r.name)}
                            data-ocid={`admin_reviews.delete_button.${idx + 1}`}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_reviews.dialog">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Reviewer Name</Label>
              <Input
                value={editForm.name ?? ""}
                onChange={(e) =>
                  setEditForm((f) => ({
                    ...f,
                    name: e.target.value,
                    profileInitial:
                      e.target.value[0]?.toUpperCase() ?? f.profileInitial,
                  }))
                }
                className="mt-1"
                data-ocid="admin_reviews.input"
              />
            </div>
            <div>
              <Label>Stars (1–5)</Label>
              <div className="flex gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setEditForm((f) => ({ ...f, stars: s }))}
                    style={{
                      fontSize: 28,
                      color: s <= (editForm.stars ?? 5) ? "#f59e0b" : "#d1d5db",
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Review Text</Label>
              <Textarea
                value={editForm.text ?? ""}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, text: e.target.value }))
                }
                rows={4}
                className="mt-1"
                data-ocid="admin_reviews.textarea"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={editForm.isApproved ?? false}
                onCheckedChange={(v) =>
                  setEditForm((f) => ({ ...f, isApproved: v }))
                }
                data-ocid="admin_reviews.switch"
              />
              <Label>Approved (visible on home page)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditOpen(false)}
              data-ocid="admin_reviews.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={saveEdit}
              className="bg-ngo-green hover:bg-green-700 text-white"
              data-ocid="admin_reviews.save_button"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
