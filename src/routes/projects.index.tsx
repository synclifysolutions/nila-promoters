import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ProjectCard } from "@/components/site/ProjectCard";
import { PageBanner } from "./about";
import { COMPLETED, ONGOING, UPCOMING, ALL_PROJECTS, type Project } from "@/data/projects";
import { MapPin, CheckCircle2, Zap, Clock, ArrowRight } from "lucide-react";
import nilahero1 from "@/assets/nila-hero1.jpg";
import { Reveal } from "@/components/site/Reveal";

import { useLanguage } from "./__root";

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

const GOLD = "#E8C77E";
const NAVY = "#0F2235";

const DOT_GRID_DARK: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, rgba(249,244,241,0.10) 1.5px, transparent 1.5px)",
  backgroundSize: "28px 28px",
};

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 32, filter: "blur(8px)" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectsPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<Tab>("all");

  const TABS: { id: Tab; label: string; Icon: React.FC<{ className?: string }> }[] = [
    { id: "all",       label: t("projects.tabAll"),       Icon: MapPin },
    { id: "ongoing",   label: t("projects.tabOngoing"),   Icon: Zap },
    { id: "completed", label: t("projects.tabCompleted"), Icon: CheckCircle2 },
    { id: "upcoming",  label: t("projects.tabUpcoming"),  Icon: Clock },
  ];

  const filtered: Project[] =
    active === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.status.toLowerCase() === active);

  return (
    <>
      <PageBanner title={t("projects.bannerTitle")} description={t("projects.bannerDesc")} crumbs={[t("nav.home"), t("nav.projects")]} />

      {/* ── STATS STRIP ── */}
      <div className="relative overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-0 pointer-events-none" style={DOT_GRID_DARK} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <div className="relative mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl" style={{ background: `${GOLD}18` }}>
            {[
              { value: COMPLETED.length, label: t("projects.tabCompleted") },
              { value: ONGOING.length,   label: t("projects.tabOngoing") },
              { value: UPCOMING.length,   label: t("projects.tabUpcoming") },
              { value: "2000+",           label: t("stats.families") },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-1.5 py-8 px-6 text-center"
                style={{ background: "rgba(15,34,53,0.85)" }}
              >
                <span className="font-display text-4xl font-bold" style={{ color: GOLD }}>{s.value}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PORTFOLIO SECTION ── */}
      <section className="py-24" style={{ background: "#F9F4F1" }}>
        <div className="mx-auto max-w-7xl px-6">

          {/* Filter bar */}
          <FadeUp delay={0.05} className="mb-14 -mx-6 flex justify-start overflow-x-auto px-6 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0">
            <div className="inline-flex shrink-0 items-center gap-1 p-1 rounded-full" style={{ background: "rgba(15,34,53,0.07)", border: "1px solid rgba(15,34,53,0.10)" }}>
              {TABS.map((tItem) => {
                const isActive = active === tItem.id;
                return (
                  <button
                    key={tItem.id}
                    onClick={() => setActive(tItem.id)}
                    className="relative inline-flex shrink-0 items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none sm:px-5"
                    style={{
                      background: isActive ? NAVY : "transparent",
                      color: isActive ? GOLD : "rgba(15,34,53,0.45)",
                      boxShadow: isActive ? "0 2px 12px rgba(15,34,53,0.25)" : "none",
                    }}
                  >
                    <tItem.Icon className="h-3.5 w-3.5" />
                    {tItem.label}
                  </button>
                );
              })}
            </div>
          </FadeUp>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
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

      {/* ── CTA BANNER ── */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden py-28"
      >
        <div className="absolute inset-0">
          <img src={nilahero1} alt="Nila Promoters plot layout" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,34,53,0.55) 0%, rgba(15,34,53,0.4) 45%, rgba(15,34,53,0.65) 100%)" }} />
        </div>
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(232,199,126,0.12)" }} />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(249,244,241,0.08)" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#E8C77E", textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              {t("cta.sub")}
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-5xl" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.75), 0 4px 30px rgba(0,0,0,0.55)" }}>
              {t("cta.title1")}{" "}
              <span className="italic" style={{ color: "#E8C77E" }}>{t("cta.title2")}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl md:text-lg" style={{ color: "rgba(249,244,241,0.95)", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>
              {t("cta.desc")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold shadow-lg transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #E8C77E 0%, #d4ad57 100%)", color: "#0F2235", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                {t("cta.btnVisit")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold backdrop-blur transition-all hover:scale-105"
                style={{ border: "2px solid rgba(249,244,241,0.5)", color: "#F9F4F1" }}
              >
                {t("cta.btnView")}
              </Link>
            </div>
          </Reveal>
        </div>
      </motion.section>

      <div
        className="h-[5px] w-full"
        style={{
          background: "linear-gradient(90deg, #d4ad57 0%, #E8C77E 50%, #d4ad57 100%)",
          boxShadow: "0 0 20px rgba(232,199,126,0.65), 0 0 4px rgba(232,199,126,0.9)",
        }}
      />
    </>
  );
}