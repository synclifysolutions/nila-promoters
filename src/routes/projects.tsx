import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, Stagger } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { COMPLETED, ONGOING, UPCOMING } from "@/lib/projects";
import { PageBanner } from "./about";
import { StatsStrip } from "@/components/site/StatsStrip";

export const Route = createFileRoute("/projects")({
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

type Tab = "completed" | "ongoing" | "upcoming";

const TABS: { id: Tab; label: string; count: number; emoji: string }[] = [
  { id: "completed", label: "Completed", count: COMPLETED.length, emoji: "✅" },
  { id: "ongoing", label: "Ongoing", count: ONGOING.length, emoji: "🔵" },
  { id: "upcoming", label: "Upcoming", count: UPCOMING.length, emoji: "🚀" },
];

function ProjectsPage() {
  const [active, setActive] = useState<Tab>("completed");

  return (
    <>
      <PageBanner title="Our Projects" crumbs={["Home", "Projects"]} />

      <div className="bg-navy/95 pb-2 pt-2">
        <p className="mx-auto max-w-7xl px-6 text-center text-sm italic text-white/70">
          Transforming land into legacies across Kumbakonam
        </p>
      </div>

      {/* Sticky tabs */}
      <div className="sticky top-[72px] z-30 border-b border-border bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6 py-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActive(t.id);
                document.getElementById(`section-${t.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                active === t.id
                  ? "bg-gold text-navy shadow-md"
                  : "bg-surface text-navy hover:bg-gold/20"
              }`}
            >
              <span>{t.emoji}</span> {t.label}
              <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                active === t.id ? "bg-navy text-gold" : "bg-white text-navy/70"
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Completed */}
      <Section id="section-completed" eyebrow="Delivered" title="Completed Projects">
        <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {COMPLETED.map((p) => <ProjectCard key={p.name} p={p} />)}
        </Stagger>
      </Section>

      <StatsStrip
        stats={[
          { value: 4, suffix: "", label: "Completed" },
          { value: 1, suffix: "", label: "Ongoing" },
          { value: 2, suffix: "", label: "Upcoming" },
          { value: 7, suffix: "", label: "Total Projects" },
        ]}
      />

      {/* Ongoing */}
      <Section id="section-ongoing" eyebrow="Active Sales" title="Ongoing Projects" bg="bg-surface">
        <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {ONGOING.map((p) => <ProjectCard key={p.name} p={p} />)}
        </Stagger>
      </Section>

      {/* Upcoming */}
      <Section id="section-upcoming" eyebrow="Pre-Launch" title="Upcoming Projects">
        <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {UPCOMING.map((p) => (
            <motion.div key={p.name} className="relative">
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </Stagger>
      </Section>
    </>
  );
}

function Section({
  id, eyebrow, title, children, bg = "",
}: { id: string; eyebrow: string; title: string; children: React.ReactNode; bg?: string }) {
  return (
    <section id={id} className={`scroll-mt-32 py-24 ${bg}`}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
          <h2 className="gold-underline-center mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
