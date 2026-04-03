import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed as standalone
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user dismissed recently (within 7 days)
    const dismissedAt = localStorage.getItem("pwa-install-dismissed");
    if (dismissedAt) {
      const daysSince =
        (Date.now() - Number.parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return;
    }

    // Detect iOS
    const ua = navigator.userAgent;
    const iosDevice =
      /iphone|ipad|ipod/i.test(ua) &&
      !(window as Window & { MSStream?: unknown }).MSStream;
    setIsIOS(iosDevice);

    if (iosDevice) {
      // iOS doesn't support beforeinstallprompt, show after 5s
      const timer = setTimeout(() => setShowBanner(true), 5000);
      return () => clearTimeout(timer);
    }

    // Android/Chrome: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after 3 seconds
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Also check if event was already fired (some browsers fire it early)
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowBanner(false);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setShowBanner(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  if (!showBanner || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-white border-2 border-green-500 rounded-2xl shadow-2xl p-4 flex items-start gap-3">
      <div className="flex-shrink-0">
        <img
          src="/assets/generated/dmvv-real-icon-192.dim_192x192.png"
          alt="DMVV Foundation"
          className="w-14 h-14 rounded-xl object-contain border border-green-100"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900">
          DMVV Foundation App Install Karen
        </p>
        {isIOS ? (
          <p className="text-xs text-gray-500 mt-1">
            iPhone par install karne ke liye: Safari mein{" "}
            <strong>Share button</strong> dabayein, phir{" "}
            <strong>"Add to Home Screen"</strong> select karen.
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            Apne phone par DMVV Foundation app install karen -- bilkul native
            app ki tarah kaam karega!
          </p>
        )}
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white text-xs h-8 px-3"
            onClick={handleInstall}
            data-ocid="pwa.install_button"
          >
            <Download className="w-3 h-3 mr-1" />
            {isIOS ? "Samajh Gaya" : "Install Karen"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-500 text-xs h-8 px-2"
            onClick={handleDismiss}
          >
            Baad mein
          </Button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
