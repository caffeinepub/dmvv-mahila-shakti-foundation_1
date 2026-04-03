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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ApplyFormSubmission, useApp } from "@/context/AppContext";
import {
  CheckCircle,
  Clock,
  Eye,
  Mail,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<ApplyFormSubmission["status"], string> = {
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-yellow-100 text-yellow-700",
  contacted: "bg-green-100 text-green-700",
  enrolled: "bg-purple-100 text-purple-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminApplyForm() {
  const {
    applyFormSubmissions,
    updateApplyFormSubmission,
    deleteApplyFormSubmission,
  } = useApp();
  const [viewItem, setViewItem] = useState<ApplyFormSubmission | null>(null);

  const newCount = applyFormSubmissions.filter(
    (s) => s.status === "new",
  ).length;
  const reviewedCount = applyFormSubmissions.filter(
    (s) => s.status === "reviewed",
  ).length;
  const contactedCount = applyFormSubmissions.filter(
    (s) => s.status === "contacted",
  ).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Apply Form Submissions
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Website se aye hue application forms yahan dikhai dete hain
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{newCount}</div>
            <div className="text-xs text-gray-500">New Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {reviewedCount}
            </div>
            <div className="text-xs text-gray-500">Reviewed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {contactedCount}
            </div>
            <div className="text-xs text-gray-500">Contacted</div>
          </CardContent>
        </Card>
      </div>

      {applyFormSubmissions.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <User size={48} className="mx-auto mb-3 opacity-30" />
          <p>
            Abhi koi application nahi aayi. Jab koi Apply Form submit karega,
            yahan dikhega.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...applyFormSubmissions].reverse().map((sub) => (
            <Card key={sub.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">
                        {sub.fullName}
                      </h3>
                      <Badge className={`text-xs ${STATUS_COLORS[sub.status]}`}>
                        {sub.status === "new"
                          ? "New"
                          : sub.status === "reviewed"
                            ? "Reviewed"
                            : "Contacted"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone size={10} />
                        {sub.mobile}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={10} />
                        {sub.email}
                      </span>
                      <span>
                        {sub.district}, {sub.state}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {sub.submittedAt}
                      </span>
                    </div>
                    <p className="text-xs text-ngo-green font-medium mt-1">
                      Apply For: {sub.applyFor}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Select
                      value={sub.status}
                      onValueChange={(v) => {
                        updateApplyFormSubmission(sub.id, {
                          status: v as ApplyFormSubmission["status"],
                        });
                        toast.success("Status update ho gaya.");
                      }}
                    >
                      <SelectTrigger className="w-28 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewItem(sub)}
                    >
                      <Eye size={14} />
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
                            Application Delete Karen?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            "{sub.fullName}" ki application permanently delete
                            ho jayegi.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              deleteApplyFormSubmission(sub.id);
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
      )}

      {/* View Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500 text-xs">Full Name</span>
                  <p className="font-semibold">{viewItem.fullName}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Mobile</span>
                  <p className="font-semibold">{viewItem.mobile}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Email</span>
                  <p className="font-semibold">{viewItem.email}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Apply For</span>
                  <p className="font-semibold text-ngo-green">
                    {viewItem.applyFor}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">State</span>
                  <p className="font-semibold">{viewItem.state}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">District</span>
                  <p className="font-semibold">{viewItem.district}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Submitted</span>
                  <p className="font-semibold">{viewItem.submittedAt}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Status</span>
                  <Badge
                    className={`text-xs ${STATUS_COLORS[viewItem.status]}`}
                  >
                    {viewItem.status}
                  </Badge>
                </div>
              </div>
              {viewItem.message && (
                <div>
                  <span className="text-gray-500 text-xs">Message</span>
                  <p className="text-sm mt-1 bg-gray-50 p-3 rounded">
                    {viewItem.message}
                  </p>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <Button
                  className="flex-1 bg-ngo-green hover:bg-green-700 text-white"
                  onClick={() => {
                    updateApplyFormSubmission(viewItem.id, {
                      status: "contacted",
                    });
                    setViewItem((v) =>
                      v ? { ...v, status: "contacted" } : null,
                    );
                    toast.success("Contacted mark ho gaya.");
                  }}
                >
                  <CheckCircle size={14} className="mr-2" /> Mark Contacted
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
