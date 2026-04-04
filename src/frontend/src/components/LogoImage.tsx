import { useApp } from "@/context/AppContext";

interface LogoImageProps {
  className?: string;
  alt?: string;
}

const FALLBACK = "/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png";

export default function LogoImage({
  className = "h-14 w-14 object-contain",
  alt = "DMVV Foundation Logo",
}: LogoImageProps) {
  const { settings } = useApp();
  const src = settings.logoUrl || FALLBACK;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src !== window.location.origin + FALLBACK) {
          target.src = FALLBACK;
        }
      }}
    />
  );
}
