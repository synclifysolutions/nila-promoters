import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-navy/85 via-navy to-navy-deep text-white/70 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(201,168,76,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(30,111,217,0.35), transparent 45%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        <ImageIcon className="h-8 w-8 text-gold" />
        <span className="text-xs font-medium uppercase tracking-widest text-gold/80">
          Image Placeholder
        </span>
        <span className="text-sm text-white/85">{label}</span>
      </div>
    </div>
  );
}
