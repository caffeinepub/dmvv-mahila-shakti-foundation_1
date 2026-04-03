import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { ImageIcon, PenLine, Stamp, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState({ ...settings });
  const fileRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLInputElement>(null);
  const sealRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string>(settings.logoUrl);
  const [signaturePreview, setSignaturePreview] = useState<string>(
    settings.signatureUrl || "",
  );
  const [sealPreview, setSealPreview] = useState<string>(
    settings.sealUrl || "",
  );

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setLogoPreview(base64);
      setForm((p) => ({ ...p, logoUrl: base64 }));
      updateSettings({ logoUrl: base64 });
      toast.success("Logo uploaded successfully.");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSignaturePreview(base64);
      setForm((p) => ({ ...p, signatureUrl: base64 }));
      updateSettings({ signatureUrl: base64 });
      toast.success(
        "Authority signature uploaded! Ab yeh ID Card aur Certificate mein auto-attach hogi.",
      );
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSealPreview(base64);
      setForm((p) => ({ ...p, sealUrl: base64 }));
      updateSettings({ sealUrl: base64 });
      toast.success(
        "Official seal uploaded! Ab yeh ID Card aur Certificate mein auto-attach hogi.",
      );
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    toast.success("Settings saved successfully.");
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Site Settings
      </h1>
      <div className="max-w-2xl space-y-6">
        {/* Logo Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-800">
              Organization Logo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 flex-shrink-0 overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Organization Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <ImageIcon size={28} className="text-gray-300" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Upload your organization logo. Recommended size: 200×200px.
                  PNG or JPG format.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="border-ngo-green text-ngo-green hover:bg-green-50"
                  onClick={() => fileRef.current?.click()}
                  data-ocid="admin_settings.upload_button"
                >
                  <Upload size={15} className="mr-2" />
                  Upload Logo
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signature & Seal Section */}
        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-blue-800 flex items-center gap-2">
              <PenLine size={18} className="text-blue-600" />
              Authority Signature &amp; Official Seal
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">
              Yahan upload ki gayi signature aur seal ID Card aur Certificate
              mein automatically attach ho jaayengi.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Signature Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <PenLine size={14} className="text-blue-600" />
                  Authority Signature
                </Label>
                <div className="w-full h-24 border-2 border-dashed border-blue-300 rounded-xl flex items-center justify-center bg-blue-50 overflow-hidden">
                  {signaturePreview ? (
                    <img
                      src={signaturePreview}
                      alt="Authority Signature"
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <div className="text-center">
                      <PenLine
                        size={24}
                        className="text-blue-300 mx-auto mb-1"
                      />
                      <p className="text-xs text-blue-400">Signature Image</p>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-400 text-blue-700 hover:bg-blue-50"
                  onClick={() => signatureRef.current?.click()}
                  data-ocid="admin_settings.upload_button"
                >
                  <Upload size={13} className="mr-2" />
                  Signature Upload Karein
                </Button>
                <input
                  ref={signatureRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleSignatureChange}
                />
                <p className="text-xs text-gray-400">
                  PNG transparent background recommended
                </p>
              </div>

              {/* Seal Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <Stamp size={14} className="text-purple-600" />
                  Official Seal / Stamp
                </Label>
                <div className="w-full h-24 border-2 border-dashed border-purple-300 rounded-xl flex items-center justify-center bg-purple-50 overflow-hidden">
                  {sealPreview ? (
                    <img
                      src={sealPreview}
                      alt="Official Seal"
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <div className="text-center">
                      <Stamp
                        size={24}
                        className="text-purple-300 mx-auto mb-1"
                      />
                      <p className="text-xs text-purple-400">
                        Seal / Stamp Image
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-400 text-purple-700 hover:bg-purple-50"
                  onClick={() => sealRef.current?.click()}
                  data-ocid="admin_settings.upload_button"
                >
                  <Upload size={13} className="mr-2" />
                  Seal Upload Karein
                </Button>
                <input
                  ref={sealRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleSealChange}
                />
                <p className="text-xs text-gray-400">
                  PNG transparent background recommended
                </p>
              </div>
            </div>

            {/* Authority Name & Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Authority Name
                </Label>
                <Input
                  value={form.authorityName || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, authorityName: e.target.value }))
                  }
                  placeholder="e.g. Smt. Rekha Sharma"
                  className="mt-1"
                  data-ocid="admin_settings.input"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Authority Designation
                </Label>
                <Input
                  value={form.authorityDesignation || ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      authorityDesignation: e.target.value,
                    }))
                  }
                  placeholder="e.g. Director, DMVV Foundation"
                  className="mt-1"
                  data-ocid="admin_settings.input"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card>
          <CardContent className="p-6">
            <form
              onSubmit={handleSave}
              className="space-y-5"
              data-ocid="admin_settings.modal"
            >
              <div>
                <Label>Site Title</Label>
                <Input
                  value={form.siteTitle}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, siteTitle: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_settings.input"
                />
              </div>
              <div>
                <Label>Tagline (Hindi)</Label>
                <Input
                  value={form.tagline}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tagline: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_settings.input"
                />
              </div>
              <div>
                <Label>Footer Text</Label>
                <Textarea
                  value={form.footerText}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, footerText: e.target.value }))
                  }
                  rows={3}
                  className="mt-1"
                  data-ocid="admin_settings.textarea"
                />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, contactEmail: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_settings.input"
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, contactPhone: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_settings.input"
                />
              </div>
              <div>
                <Label>Address</Label>
                <Textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  rows={3}
                  className="mt-1"
                  data-ocid="admin_settings.textarea"
                />
              </div>
              <Button
                type="submit"
                className="bg-ngo-green text-white hover:bg-ngo-green-dark"
                data-ocid="admin_settings.save_button"
              >
                Save Settings
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
