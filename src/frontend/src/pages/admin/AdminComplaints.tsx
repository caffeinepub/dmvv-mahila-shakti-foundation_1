import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { type ComplaintSubmission, useApp } from "@/context/AppContext";
import { AlertCircle, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminComplaints() {
  const {
    complaintSubmissions,
    updateComplaintSubmission,
    deleteComplaintSubmission,
  } = useApp();
  const [viewing, setViewing] = useState<ComplaintSubmission | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [newStatus, setNewStatus] =
    useState<ComplaintSubmission["status"]>("pending");

  const openView = (c: ComplaintSubmission) => {
    setViewing(c);
    setAdminNote(c.adminNote || "");
    setNewStatus(c.status);
  };

  const handleSaveStatus = () => {
    if (!viewing) return;
    updateComplaintSubmission(viewing.id, { status: newStatus, adminNote });
    toast.success("Complaint updated.");
    setViewing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Complaint Management
        </h1>
        <Badge className="bg-ngo-orange text-white text-sm px-3 py-1">
          {complaintSubmissions.length} Total
        </Badge>
      </div>

      {complaintSubmissions.length === 0 ? (
        <div
          className="text-center py-20 text-gray-400"
          data-ocid="admin_complaints.empty_state"
        >
          <AlertCircle size={52} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No complaints submitted yet</p>
        </div>
      ) : (
        <div
          className="overflow-x-auto rounded-xl border border-gray-200"
          data-ocid="admin_complaints.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaintSubmissions.map((c, idx) => (
                <TableRow
                  key={c.id}
                  data-ocid={`admin_complaints.row.${idx + 1}`}
                >
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-sm">{c.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {c.complaintType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm max-w-32 truncate">
                    {c.subject}
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${STATUS_COLORS[c.status]}`}>
                      {c.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {new Date(c.submittedAt).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => openView(c)}
                        data-ocid="admin_complaints.edit_button"
                      >
                        <Eye size={11} className="mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-xs"
                        onClick={() => {
                          deleteComplaintSubmission(c.id);
                          toast.success("Deleted.");
                        }}
                        data-ocid="admin_complaints.delete_button"
                      >
                        <Trash2 size={11} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={!!viewing}
        onOpenChange={(open) => !open && setViewing(null)}
      >
        <DialogContent className="max-w-lg" data-ocid="admin_complaints.dialog">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Name:</span>
                  <p className="text-gray-600 mt-1">{viewing.name}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <p className="text-gray-600 mt-1">{viewing.phone}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>
                  <p className="text-gray-600 mt-1">
                    {viewing.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Type:</span>
                  <p className="text-gray-600 mt-1">{viewing.complaintType}</p>
                </div>
              </div>
              <div>
                <span className="font-semibold text-sm text-gray-700">
                  Subject:
                </span>
                <p className="text-gray-600 text-sm mt-1">{viewing.subject}</p>
              </div>
              <div>
                <span className="font-semibold text-sm text-gray-700">
                  Message:
                </span>
                <p className="text-gray-600 text-sm mt-1 bg-gray-50 rounded-lg p-3">
                  {viewing.message}
                </p>
              </div>
              <div>
                <Label>Update Status</Label>
                <Select
                  value={newStatus}
                  onValueChange={(v) =>
                    setNewStatus(v as ComplaintSubmission["status"])
                  }
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="admin_complaints.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Admin Note</Label>
                <Textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add internal note or resolution details..."
                  className="mt-1"
                  data-ocid="admin_complaints.textarea"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewing(null)}
              data-ocid="admin_complaints.cancel_button"
            >
              Close
            </Button>
            <Button
              className="bg-ngo-green text-white"
              onClick={handleSaveStatus}
              data-ocid="admin_complaints.save_button"
            >
              Save &amp; Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
