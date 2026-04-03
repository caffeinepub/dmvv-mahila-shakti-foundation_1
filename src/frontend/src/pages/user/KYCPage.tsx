import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type KYC, useApp } from "@/context/AppContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export default function KYCPage() {
  const { currentUser, kycs, addKYC, updateKYC } = useApp();

  const myKYC = currentUser
    ? kycs.find((k) => k.userId === currentUser.id)
    : undefined;

  const [form, setForm] = useState({
    aadhaarFileName: myKYC?.aadhaarFileName || "",
    photoFileName: myKYC?.photoFileName || "",
    addressProofFileName: myKYC?.addressProofFileName || "",
    bankName: myKYC?.bankName || "",
    accountNumber: myKYC?.accountNumber || "",
    ifscCode: myKYC?.ifscCode || "",
    branchName: myKYC?.branchName || "",
  });
  const [loading, setLoading] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;

  const handleFileChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setForm((p) => ({ ...p, [field]: file.name }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.aadhaarFileName ||
      !form.photoFileName ||
      !form.bankName ||
      !form.accountNumber ||
      !form.ifscCode
    ) {
      toast.error(
        "Please fill all required fields and upload required documents.",
      );
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (myKYC) {
        updateKYC(myKYC.id, {
          ...form,
          status: "pending",
          adminRemark: "",
          submittedAt: new Date().toISOString().slice(0, 10),
        });
        toast.success("KYC updated and re-submitted for approval.");
      } else {
        const newKYC: KYC = {
          id: `kyc_${Date.now()}`,
          userId: currentUser.id,
          ...form,
          status: "pending",
          adminRemark: "",
          submittedAt: new Date().toISOString().slice(0, 10),
        };
        addKYC(newKYC);
        toast.success("KYC submitted successfully. Awaiting admin approval.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            KYC Verification
          </h1>
          <p className="text-gray-500 mt-1">
            Submit your documents for identity verification
          </p>
        </div>

        {myKYC && (
          <Card className="mb-6 border-l-4 border-ngo-orange">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">
                  Current KYC Status:
                </span>
                <Badge
                  className={`capitalize ${
                    myKYC.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : myKYC.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {myKYC.status}
                </Badge>
              </div>
              {myKYC.adminRemark && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Admin Remark:</strong> {myKYC.adminRemark}
                </div>
              )}
              {myKYC.status === "approved" && (
                <p className="text-sm text-green-600 mt-2">
                  Your KYC is verified. No action needed.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-ocid="kyc.modal"
            >
              {/* Document Upload */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                  Document Uploads
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="aadhaar">
                      Aadhaar Card <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1 flex items-center gap-3">
                      <Input
                        id="aadhaar"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange("aadhaarFileName")}
                        className="flex-1"
                        data-ocid="kyc.upload_button"
                      />
                    </div>
                    {form.aadhaarFileName && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ {form.aadhaarFileName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="photo">
                      Recent Passport Photo{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1">
                      <Input
                        id="photo"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange("photoFileName")}
                        data-ocid="kyc.upload_button"
                      />
                    </div>
                    {form.photoFileName && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ {form.photoFileName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="addressProof">Address Proof</Label>
                    <div className="mt-1">
                      <Input
                        id="addressProof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange("addressProofFileName")}
                        data-ocid="kyc.upload_button"
                      />
                    </div>
                    {form.addressProofFileName && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ {form.addressProofFileName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                  Bank Account Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankName">
                      Bank Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bankName"
                      value={form.bankName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, bankName: e.target.value }))
                      }
                      placeholder="e.g. State Bank of India"
                      className="mt-1"
                      data-ocid="kyc.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">
                      Account Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountNumber"
                      value={form.accountNumber}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          accountNumber: e.target.value,
                        }))
                      }
                      placeholder="12-digit account number"
                      className="mt-1"
                      data-ocid="kyc.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifscCode">
                      IFSC Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="ifscCode"
                      value={form.ifscCode}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          ifscCode: e.target.value.toUpperCase(),
                        }))
                      }
                      placeholder="e.g. SBIN0001234"
                      className="mt-1"
                      data-ocid="kyc.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branchName">Branch Name</Label>
                    <Input
                      id="branchName"
                      value={form.branchName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, branchName: e.target.value }))
                      }
                      placeholder="Branch name and city"
                      className="mt-1"
                      data-ocid="kyc.input"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-ngo-green text-white hover:bg-ngo-green-dark"
                disabled={loading || myKYC?.status === "approved"}
                data-ocid="kyc.submit_button"
              >
                {loading
                  ? "Submitting..."
                  : myKYC
                    ? "Update & Resubmit KYC"
                    : "Submit KYC"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
