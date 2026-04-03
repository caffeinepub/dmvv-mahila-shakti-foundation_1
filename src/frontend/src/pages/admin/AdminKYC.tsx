import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminKYC() {
  const { kycs, users, updateKYC } = useApp();
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all" ? kycs : kycs.filter((k) => k.status === activeTab);

  const handleApprove = (id: string) => {
    updateKYC(id, {
      status: "approved",
      adminRemark: remarks[id] || "Approved by admin.",
    });
    toast.success("KYC approved.");
  };

  const handleReject = (id: string) => {
    if (!remarks[id]) {
      toast.error("Please add a remark before rejecting.");
      return;
    }
    updateKYC(id, { status: "rejected", adminRemark: remarks[id] });
    toast.success("KYC rejected.");
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        KYC Management
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all" data-ocid="admin_kyc.tab">
            All ({kycs.length})
          </TabsTrigger>
          <TabsTrigger value="pending" data-ocid="admin_kyc.tab">
            Pending ({kycs.filter((k) => k.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved" data-ocid="admin_kyc.tab">
            Approved ({kycs.filter((k) => k.status === "approved").length})
          </TabsTrigger>
          <TabsTrigger value="rejected" data-ocid="admin_kyc.tab">
            Rejected ({kycs.filter((k) => k.status === "rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              {filtered.length === 0 ? (
                <div
                  className="text-center py-12 text-gray-400"
                  data-ocid="admin_kyc.empty_state"
                >
                  No KYC records found.
                </div>
              ) : (
                <Table data-ocid="admin_kyc.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Bank Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Remark</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((kyc, idx) => {
                      const user = users.find((u) => u.id === kyc.userId);
                      return (
                        <TableRow
                          key={kyc.id}
                          data-ocid={`admin_kyc.row.${idx + 1}`}
                        >
                          <TableCell className="font-medium">
                            {user?.fullName || "Unknown"}
                            <div className="text-xs text-gray-400">
                              {user?.email}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {kyc.submittedAt}
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            <div>📄 {kyc.aadhaarFileName}</div>
                            <div>📄 {kyc.photoFileName}</div>
                            {kyc.addressProofFileName && (
                              <div>📄 {kyc.addressProofFileName}</div>
                            )}
                          </TableCell>
                          <TableCell className="text-xs">
                            <div>{kyc.bankName}</div>
                            <div className="text-gray-400">
                              A/C: {kyc.accountNumber}
                            </div>
                            <div className="text-gray-400">
                              IFSC: {kyc.ifscCode}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`capitalize ${
                                kyc.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : kyc.status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {kyc.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Textarea
                              rows={2}
                              placeholder="Add remark..."
                              className="text-xs min-w-32"
                              value={remarks[kyc.id] || kyc.adminRemark}
                              onChange={(e) =>
                                setRemarks((p) => ({
                                  ...p,
                                  [kyc.id]: e.target.value,
                                }))
                              }
                              data-ocid="admin_kyc.textarea"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 text-white hover:bg-green-700"
                                onClick={() => handleApprove(kyc.id)}
                                disabled={kyc.status === "approved"}
                                data-ocid="admin_kyc.confirm_button"
                              >
                                <CheckCircle size={14} className="mr-1" />{" "}
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(kyc.id)}
                                disabled={kyc.status === "rejected"}
                                data-ocid="admin_kyc.delete_button"
                              >
                                <XCircle size={14} className="mr-1" /> Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
