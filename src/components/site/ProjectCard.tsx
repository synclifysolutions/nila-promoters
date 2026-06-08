import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { itemVariants } from "./Reveal";

export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  name: string;
  location: string;
  description: string;
  status: ProjectStatus;
  imageLabel: string;
  highlight?: string;
  cta?: string;
}

const statusStyles: Record<ProjectStatus, string> = {
  Completed: "bg-emerald-500 text-white",
  Ongoing: "bg-sky text-white",
  Upcoming: "bg-gold text-navy",
};

export function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-border/60 transition-shadow hover:shadow-[0_25px_50px_-15px_rgba(13,27,42,0.25),0_0_0_1px_rgba(201,168,76,0.6)]"
    >
      <div className="relative">
        <ImagePlaceholder label={p.imageLabel} className="aspect-[4/3] w-full rounded-none" />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow ${statusStyles[p.status]}`}
        >
          {p.status === "Upcoming" ? "🚀 " : p.status === "Ongoing" ? "🔵 " : "✓ "}
          {p.status}
        </span>
        {p.highlight && (
          <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-navy/85 px-3 py-2 text-center text-xs font-semibold text-gold backdrop-blur">
            {p.highlight}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold text-navy">{p.name}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {p.location}
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {p.description}
        </p>
        <Link
          to="/contact"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sky transition-all hover:text-navy"
        >
          {p.cta ?? "View Details"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
