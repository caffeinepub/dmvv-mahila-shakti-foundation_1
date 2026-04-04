import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminFooter() {
  const { footerSettings, updateFooterSettings } = useApp();
  const [form, setForm] = useState({ ...footerSettings });

  const handleSave = () => {
    updateFooterSettings(form);
    toast.success("Footer settings saved! Changes are now live.");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Footer Settings
        </h1>
        <Button
          className="bg-ngo-green text-white"
          onClick={handleSave}
          data-ocid="admin_footer.save_button"
        >
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Form */}
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Footer Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Footer Description Text</Label>
                <Textarea
                  value={form.footerText}
                  onChange={(e) =>
                    setForm({ ...form, footerText: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                  data-ocid="admin_footer.textarea"
                />
              </div>
              <div>
                <Label>Copyright Text</Label>
                <Input
                  value={form.copyrightText}
                  onChange={(e) =>
                    setForm({ ...form, copyrightText: e.target.value })
                  }
                  className="mt-1"
                  data-ocid="admin_footer.input"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Facebook size={18} className="text-blue-600 flex-shrink-0" />
                <Input
                  value={form.facebookUrl}
                  onChange={(e) =>
                    setForm({ ...form, facebookUrl: e.target.value })
                  }
                  placeholder="Facebook URL"
                  data-ocid="admin_footer.input"
                />
              </div>
              <div className="flex items-center gap-3">
                <Twitter size={18} className="text-sky-500 flex-shrink-0" />
                <Input
                  value={form.twitterUrl}
                  onChange={(e) =>
                    setForm({ ...form, twitterUrl: e.target.value })
                  }
                  placeholder="Twitter URL"
                  data-ocid="admin_footer.input"
                />
              </div>
              <div className="flex items-center gap-3">
                <Youtube size={18} className="text-red-500 flex-shrink-0" />
                <Input
                  value={form.youtubeUrl}
                  onChange={(e) =>
                    setForm({ ...form, youtubeUrl: e.target.value })
                  }
                  placeholder="YouTube URL"
                  data-ocid="admin_footer.input"
                />
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={18} className="text-pink-500 flex-shrink-0" />
                <Input
                  value={form.instagramUrl}
                  onChange={(e) =>
                    setForm({ ...form, instagramUrl: e.target.value })
                  }
                  placeholder="Instagram URL"
                  data-ocid="admin_footer.input"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Display Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.showQuickLinks}
                  onCheckedChange={(v) =>
                    setForm({ ...form, showQuickLinks: v })
                  }
                  data-ocid="admin_footer.switch"
                />
                <Label>Show Quick Links column</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.showPrograms}
                  onCheckedChange={(v) => setForm({ ...form, showPrograms: v })}
                  data-ocid="admin_footer.switch"
                />
                <Label>Show Programs &amp; Pages column</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-ngo-green text-white rounded-b-xl p-5 text-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png"
                    alt="Logo"
                    className="w-10 h-10 rounded-full bg-white p-0.5 object-contain"
                  />
                  <div>
                    <p className="font-bold text-xs">
                      DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
                    </p>
                    <p className="text-green-300 text-xs">
                      Empowering Women — A Step Towards Change
                    </p>
                  </div>
                </div>
                <p className="text-green-200 text-xs leading-relaxed mb-3">
                  {form.footerText}
                </p>
                <div className="flex gap-3 text-green-300 mb-4">
                  {form.facebookUrl && <Facebook size={14} />}
                  {form.twitterUrl && <Twitter size={14} />}
                  {form.youtubeUrl && <Youtube size={14} />}
                  {form.instagramUrl && <Instagram size={14} />}
                </div>
                <div className="border-t border-green-700 pt-3 text-green-300 text-xs">
                  {form.copyrightText}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
