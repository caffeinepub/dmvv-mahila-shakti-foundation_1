import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function WhatsAppButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://wa.me/918349600835?text=Hi%20ANSHIKA%20UDHYOG%20GROUP"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            data-ocid="whatsapp.button"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
          >
            {/* WhatsApp SVG Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="32"
              height="32"
              fill="white"
              role="img"
              aria-label="WhatsApp"
            >
              <title>WhatsApp</title>
              <path d="M4.868 43.303l2.694-9.835a19.276 19.276 0 01-2.583-9.618C4.98 13.514 13.648 4.879 24.353 4.879c5.172.002 10.031 2.017 13.687 5.678 3.657 3.662 5.668 8.523 5.666 13.695-.004 10.683-8.672 19.317-19.375 19.317h-.01a19.365 19.365 0 01-9.26-2.356L4.868 43.303zm10.832-6.251l.587.349a16.095 16.095 0 008.22 2.254h.007c8.861 0 16.074-7.208 16.078-16.072.002-4.294-1.666-8.334-4.695-11.368a16.029 16.029 0 00-11.384-4.717c-8.867 0-16.08 7.208-16.082 16.07a16.07 16.07 0 002.467 8.567l.384.611-1.633 5.962 6.051-1.656zM32.54 28.21c-.133-.222-.486-.355-.974-.622-.487-.267-2.884-1.424-3.332-1.588-.447-.133-.773-.2-1.098.267-.326.465-1.261 1.587-1.547 1.913-.285.327-.57.355-1.058.089-.487-.267-2.056-.757-3.915-2.416-1.447-1.29-2.424-2.883-2.71-3.37-.285-.488-.031-.752.215-.995.22-.218.487-.57.731-.854.244-.285.325-.489.488-.814.163-.325.082-.61-.04-.854-.122-.244-1.099-2.644-1.506-3.621-.397-.954-.8-.826-1.099-.841-.283-.014-.61-.017-.935-.017-.326 0-.853.122-1.3.61-.447.487-1.707 1.666-1.707 4.065 0 2.4 1.747 4.718 1.99 5.043.244.325 3.44 5.252 8.333 7.361 1.164.502 2.072.802 2.779 1.027 1.168.371 2.232.319 3.073.193.937-.14 2.884-1.179 3.29-2.317.405-1.138.405-2.115.284-2.319z" />
            </svg>
          </a>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-900 text-white text-xs">
          Chat on WhatsApp
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
