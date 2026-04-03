import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { ImageIcon, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState({ ...settings });
  const fileRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string>(settings.logoUrl);

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
