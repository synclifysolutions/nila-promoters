import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectsCTA } from "@/components/site/ProjectsCTA";
import { PageBanner } from "./about";
import { COMPLETED, ONGOING, UPCOMING, ALL_PROJECTS, type Project } from "@/data/projects";
import { MapPin, CheckCircle2, Zap, Clock } from "lucide-react";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Our Projects — Nila Promoters Kumbakonam" },
      { name: "description", content: "Explore Nila Promoters' completed, ongoing, and upcoming DTCP & RERA approved plotted developments across Kumbakonam." },
      { property: "og:title", content: "Our Projects — Nila Promoters" },
      { property: "og:description", content: "Completed, ongoing, and upcoming premium plot layouts across Kumbakonam." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

type Tab = "all" | "completed" | "ongoing" | "upcoming";

const TABS: { id: Tab; label: string; Icon: React.FC<{ className?: string }>; count: number }[] = [
  { id: "all",       label: "All Projects", Icon: MapPin,        count: ALL_PROJECTS.length },
  { id: "completed", label: "Completed",    Icon: CheckCircle2,  count: COMPLETED.length },
  { id: "ongoing",   label: "Ongoing",      Icon: Zap,           count: ONGOING.length },
  { id: "upcoming",  label: "Upcoming",     Icon: Clock,         count: UPCOMING.length },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectsPage() {
  const [active, setActive] = useState<Tab>("all");

  const filtered: Project[] =
    active === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.status.toLowerCase() === active);

  return (
    <>
      <PageBanner title="Our Projects" crumbs={["Home", "Projects"]} />

      <div style={{ background: "#001D39" }} className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: COMPLETED.length, label: "Completed" },
              { value: ONGOING.length,   label: "Ongoing" },
              { value: UPCOMING.length,  label: "Upcoming" },
              { value: "500+",           label: "Happy Families" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-4 px-6 text-center">
                <span className="font-display text-4xl font-bold" style={{ color: "#C9A84C" }}>{s.value}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section style={{ background: "#FAFAF8" }} className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8" style={{ background: "#C9A84C" }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.38em]" style={{ color: "#8B6914" }}>Portfolio</span>
                </div>
                <h2 className="font-display text-5xl font-bold leading-tight md:text-6xl" style={{ color: "#001D39" }}>
                  Our <span className="italic" style={{ color: "#8B6914" }}>Developments</span>
                </h2>
              </div>
              <p className="text-sm leading-relaxed md:max-w-[280px] md:text-right" style={{ color: "rgba(0,29,57,0.45)" }}>
                DTCP & RERA approved plotted layouts crafted for families who demand clear titles, prime locations, and complete transparency.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="mb-12">
            <div className="inline-flex flex-wrap gap-1 p-1" style={{ background: "#EDE8DF", borderRadius: "2px" }}>
              {TABS.map((t) => {
                const isActive = active === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                    style={{ background: isActive ? "#001D39" : "transparent", color: isActive ? "#C9A84C" : "rgba(0,29,57,0.5)", borderRadius: "2px" }}
                  >
                    <t.Icon className="h-3.5 w-3.5" />
                    {t.label}
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5"
                      style={{ background: isActive ? "rgba(201,168,76,0.2)" : "rgba(0,29,57,0.08)", color: isActive ? "#C9A84C" : "rgba(0,29,57,0.4)", borderRadius: "2px" }}
                    >
                      {t.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard p={p} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <ProjectsCTA />
    </>
  );
}