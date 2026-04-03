import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminCompanyProfile() {
  const { companyProfile, updateCompanyProfile } = useApp();
  const [form, setForm] = useState({ ...companyProfile });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile(form);
    toast.success("Company profile updated successfully.");
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Company Profile
      </h1>
      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <form
            onSubmit={handleSave}
            className="space-y-5"
            data-ocid="admin_company.modal"
          >
            <div>
              <Label>Organization Name</Label>
              <Input
                value={form.orgName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, orgName: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin_company.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={5}
                className="mt-1"
                placeholder="Describe your organization's mission and work"
                data-ocid="admin_company.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Registration Number</Label>
                <Input
                  value={form.registrationNo}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, registrationNo: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_company.input"
                />
              </div>
              <div>
                <Label>Founding Year</Label>
                <Input
                  value={form.foundingYear}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, foundingYear: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_company.input"
                />
              </div>
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={form.website}
                onChange={(e) =>
                  setForm((p) => ({ ...p, website: e.target.value }))
                }
                placeholder="www.example.org"
                className="mt-1"
                data-ocid="admin_company.input"
              />
            </div>

            {/* Read-only display of current saved values */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Current Profile
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Organization:</dt>
                  <dd className="font-medium text-gray-800 text-right max-w-[60%]">
                    {companyProfile.orgName}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Reg. No:</dt>
                  <dd className="font-medium text-gray-800">
                    {companyProfile.registrationNo}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Founded:</dt>
                  <dd className="font-medium text-gray-800">
                    {companyProfile.foundingYear}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Website:</dt>
                  <dd className="font-medium text-gray-800">
                    {companyProfile.website}
                  </dd>
                </div>
              </dl>
            </div>

            <Button
              type="submit"
              className="bg-ngo-green text-white hover:bg-ngo-green-dark"
              data-ocid="admin_company.save_button"
            >
              Update Company Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
