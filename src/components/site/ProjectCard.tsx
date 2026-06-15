import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, CheckCircle2, Zap, Clock } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  name: string;
  location: string;
  description: string;
  status: ProjectStatus;
  imageLabel: string;
  highlight?: string;
  cta?: string;
  logo?: string;
}

const statusConfig: Record<ProjectStatus, {
  label: string;
  dot: string;
  text: string;
  bg: string;
  border: string;
  Icon: React.FC<{ className?: string }>;
}> = {
  Completed: {
    label: "Completed",
    dot: "#10b981",
    text: "#065f46",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    Icon: CheckCircle2,
  },
  Ongoing: {
    label: "Ongoing",
    dot: "#0ea5e9",
    text: "#0c4a6e",
    bg: "#f0f9ff",
    border: "#bae6fd",
    Icon: Zap,
  },
  Upcoming: {
    label: "Upcoming",
    dot: "#C9A84C",
    text: "#78350f",
    bg: "#fffbeb",
    border: "#fde68a",
    Icon: Clock,
  },
};

export function ProjectCard({ p }: { p: Project }) {
  const cfg = statusConfig[p.status];
  const { Icon } = cfg;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden bg-white border border-[#e8e3d8] transition-all duration-500 hover:border-[#C9A84C]/50 hover:shadow-[0_20px_60px_rgba(0,29,57,0.1)] hover:-translate-y-1"
      style={{ borderRadius: "2px" }}
    >
      {/* ── Logo / Image area ── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F0E8]">
        {p.logo ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.08), transparent 65%)" }}
            />
            <img
              src={p.logo}
              alt={`${p.name} logo`}
              className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <ImagePlaceholder label={p.imageLabel} className="absolute inset-0 rounded-none" />
        )}

        {/* Status badge — top left */}
        <div
          className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
          style={{
            background: cfg.bg,
            color: cfg.text,
            border: `1px solid ${cfg.border}`,
            borderRadius: "2px",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cfg.dot }} />
          {cfg.label}
        </div>

        {/* Highlight strip */}
        {p.highlight && (
          <div
            className="absolute bottom-0 left-0 right-0 z-20 px-4 py-2 text-center text-[11px] font-bold tracking-widest"
            style={{ background: "#001D39", color: "#C9A84C" }}
          >
            {p.highlight}
          </div>
        )}
      </div>

      {/* ── Gold accent line — grows on hover ── */}
      <div className="h-[2px] w-full bg-[#F5F0E8] overflow-hidden">
        <div
          className="h-full w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: "#C9A84C" }}
        />
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-4 inline-flex w-fit items-center gap-1.5">
          <MapPin className="h-3 w-3" style={{ color: "#C9A84C" }} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(0,29,57,0.4)" }}>
            {p.location}
          </span>
        </div>

        <h3
          className="font-display text-xl font-bold leading-snug"
          style={{ color: "#001D39" }}
        >
          {p.name}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "rgba(0,29,57,0.5)" }}>
          {p.description}
        </p>

        {/* CTA */}
        <div
          className="mt-6 flex items-center justify-between border-t pt-5"
          style={{ borderColor: "rgba(0,29,57,0.07)" }}
        >
          <Link
            to="/contact"
            className="group/btn inline-flex items-center gap-2 text-sm font-bold transition-all duration-300"
            style={{ color: "#001D39" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#C9A84C")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#001D39")}
          >
            {p.cta ?? "View Details"}
            <span
              className="flex h-7 w-7 items-center justify-center transition-all duration-300 group-hover/btn:scale-110"
              style={{
                background: "#F5F0E8",
                border: "1px solid rgba(0,29,57,0.12)",
                borderRadius: "2px",
              }}
            >
              <ArrowRight className="h-3.5 w-3.5" style={{ color: "#001D39" }} />
            </span>
          </Link>

          {/* Small dot accent */}
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#C9A84C", opacity: 0.4 }} />
        </div>
      </div>
    </motion.article>
  );
}