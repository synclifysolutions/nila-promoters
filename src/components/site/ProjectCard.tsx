import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import type { Project } from "@/data/projects";
import { useLanguage } from "../../routes/__root";

export type { Project };

const GOLD = "#E8C77E";
const NAVY = "#0F2235";

const statusDot: Record<string, string> = {
  completed: "#4CAF82",
  ongoing:   "#E8C77E",
  upcoming:  "#6B9FD4",
};

export function ProjectCard({ p }: { p: Project }) {
  const { t, language } = useLanguage();
  const dot = statusDot[p.status.toLowerCase()] ?? GOLD;

  // Resolve dynamic content checking if localized properties exist in the data model
  const localizedName = language === "ta" && p.nameTa ? p.nameTa : p.name;
  const localizedLocation = language === "ta" && p.locationTa ? p.locationTa : p.location;
  const localizedDescription = language === "ta" && p.descriptionTa ? p.descriptionTa : p.description;

  // Resolve status dictionary configurations
  const statusLabel = t(`projects.tab${p.status.charAt(0).toUpperCase() + p.status.slice(1).toLowerCase()}`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden"
      style={{
        borderRadius: "20px",
        background: "#fff",
        border: "1px solid rgba(15,34,53,0.07)",
        boxShadow: "0 2px 8px rgba(15,34,53,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 20px 60px rgba(15,34,53,0.14), 0 0 0 1px rgba(232,199,126,0.3)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,199,126,0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(15,34,53,0.06)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,34,53,0.07)";
      }}
    >
      {/* ── IMAGE / LOGO AREA ── */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3", background: "#F3F0EB" }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, transparent 60%, rgba(15,34,53,0.08) 100%)",
          }}
        />

        {p.logo ? (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <motion.img
              src={p.logo}
              alt={`${localizedName} logo`}
              className="relative z-10 max-h-full max-w-full object-contain"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ) : (
          <ImagePlaceholder label={p.imageLabel} className="absolute inset-0 rounded-none" />
        )}

        {/* Shimmer sweep */}
        <motion.div
          initial={{ x: "-130%" }}
          whileHover={{ x: "130%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-y-0 z-20 w-1/3 skew-x-[-18deg]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,199,126,0.18), transparent)",
          }}
        />

        {/* Status badge */}
        <div
          className="absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md"
          style={{
            background: "rgba(15,34,53,0.72)",
            color: "#F9F4F1",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: dot, boxShadow: `0 0 6px ${dot}` }}
          />
          {statusLabel}
        </div>
      </div>

      {/* Underline grow effect */}
      <div className="h-[2px] w-full overflow-hidden" style={{ background: "rgba(15,34,53,0.05)" }}>
        <motion.div
          className="h-full origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 0 }}
          style={{ background: `linear-gradient(90deg, ${GOLD}, rgba(232,199,126,0.3))` }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* ── CARD BODY ── */}
      <div className="flex flex-1 flex-col px-7 pt-6 pb-7">
        {/* Location */}
        <div className="mb-3 flex items-center gap-1.5">
          <MapPin className="h-3 w-3 shrink-0" style={{ color: GOLD }} />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "rgba(15,34,53,0.38)" }}
          >
            {localizedLocation}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display text-[1.25rem] font-bold leading-snug"
          style={{ color: NAVY }}
        >
          {localizedName}
        </h3>

        {/* Divider */}
        <div
          className="my-4 h-px w-10 transition-all duration-500 group-hover:w-16"
          style={{ background: GOLD }}
        />

        {/* Description */}
        <p
          className="flex-1 text-[0.8125rem] leading-relaxed"
          style={{ color: "rgba(15,34,53,0.48)" }}
        >
          {localizedDescription}
        </p>

        {/* CTA */}
        <div
          className="mt-6 pt-5"
          style={{ borderTop: "1px solid rgba(15,34,53,0.07)" }}
        >
          <Link
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="group/btn inline-flex items-center gap-2.5 text-sm font-bold transition-all duration-300"
            style={{ color: NAVY }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = GOLD)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = NAVY)
            }
          >
            {language === "en" ? (p.cta ?? "View Details") : (p.ctaTa ?? "விவரங்களை காண்க")}
            <motion.span
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300"
              style={{
                background: "rgba(232,199,126,0.12)",
                border: "1px solid rgba(232,199,126,0.3)",
              }}
              whileHover={{ scale: 1.18, rotate: 12 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-3.5 w-3.5" style={{ color: GOLD }} />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}