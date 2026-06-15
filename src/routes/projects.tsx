import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ProjectCard, Project } from "@/components/site/ProjectCard";
import { PageBanner } from "./about";
import mahalakshmilogo from "@/assets/logos/mahalakshmi-logo.png";
import spmLogo from "@/assets/logos/spm-logo.png";
import senchinalogo from "@/assets/logos/senchina-logo.png";
import salith from "@/assets/logos/salith-logo.png";
import anugraghalogo from "@/assets/logos/anugragha-logo.png";
import megalogo from "@/assets/logos/mega-logo.png";
import { ArrowRight, CheckCircle2, Zap, Clock, MapPin } from "lucide-react";

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

const COMPLETED: Project[] = [
  { name: "Mahalakshmi Nagar", location: "Kumbakonam", description: "A premium DTCP approved plotted layout delivering well-planned residential plots to families seeking peaceful living.", status: "Completed", imageLabel: "Mahalakshmi Nagar", highlight: "100% Plots Sold", cta: "View Details", logo: mahalakshmilogo },
  { name: "SPM Garden", location: "Kumbakonam", description: "Thoughtfully designed layout with wide roads, greenery, and all essential amenities for comfortable community living.", status: "Completed", imageLabel: "SPM Garden", highlight: "Fully Handed Over", cta: "View Details", logo: spmLogo },
  { name: "Sanjana Nagar", location: "Kumbakonam", description: "DTCP approved residential plots in a prime location, offering families a secure and value-driven investment.", status: "Completed", imageLabel: "Sanjana Nagar", highlight: "100% Plots Sold", cta: "View Details", logo: senchinalogo },
  { name: "Salith Nagar", location: "Kumbakonam", description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.", status: "Completed", imageLabel: "Salith Nagar", highlight: "Fully Handed Over", cta: "View Details", logo: salith },
];

const ONGOING: Project[] = [
  { name: "Anugraha Avenue", location: "Kumbakonam", description: "An exclusive ongoing layout with premium amenities, wide internal roads, and DTCP approved plots available now.", status: "Ongoing", imageLabel: "Anugraha Avenue", highlight: "Plots Available — Book Now", cta: "Enquire Now", logo: anugraghalogo },
];

const UPCOMING: Project[] = [
  { name: "London City", location: "Kumbakonam", description: "A landmark pre-launch development inspired by world-class planning, offering premium plots at early-bird pricing.", status: "Upcoming", imageLabel: "London City", highlight: "Pre-Launch — Register Interest", cta: "Register Interest", logo: megalogo },
  { name: "Shanthi Nagar Virivakkam", location: "Analagragharam, Kumbakonam", description: "A peaceful upcoming layout in the growing Analagragharam belt — ideal for families and long-term investors.", status: "Upcoming", imageLabel: "Shanthi Nagar Virivakkam", highlight: "Coming Soon", cta: "Register Interest", logo: senchinalogo },
];

type Tab = "all" | "completed" | "ongoing" | "upcoming";

const TABS: { id: Tab; label: string; Icon: React.FC<{ className?: string }>; count: number }[] = [
  { id: "all",       label: "All Projects", Icon: MapPin,        count: 7 },
  { id: "completed", label: "Completed",    Icon: CheckCircle2,  count: COMPLETED.length },
  { id: "ongoing",   label: "Ongoing",      Icon: Zap,           count: ONGOING.length },
  { id: "upcoming",  label: "Upcoming",     Icon: Clock,         count: UPCOMING.length },
];

const ALL_PROJECTS: Project[] = [...COMPLETED, ...ONGOING, ...UPCOMING];

/* ── Fade up helper ── */
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
    active === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.status.toLowerCase() === active);

  return (
    <>
      <PageBanner title="Our Projects" crumbs={["Home", "Projects"]} />

      {/* ── Stats bar ── */}
      <div style={{ background: "#001D39" }} className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: COMPLETED.length, label: "Completed" },
              { value: ONGOING.length,   label: "Ongoing" },
              { value: UPCOMING.length,  label: "Upcoming" },
              { value: "500+",           label: "Happy Families" },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-4 px-6 text-center">
                <span className="font-display text-4xl font-bold" style={{ color: "#C9A84C" }}>
                  {s.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main portfolio section ── */}
      <section style={{ background: "#FAFAF8" }} className="py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Section header */}
          <FadeUp className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8" style={{ background: "#C9A84C" }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.38em]" style={{ color: "#8B6914" }}>
                    Portfolio
                  </span>
                </div>
                <h2 className="font-display text-5xl font-bold leading-tight md:text-6xl" style={{ color: "#001D39" }}>
                  Our{" "}
                  <span className="italic" style={{ color: "#8B6914" }}>Developments</span>
                </h2>
              </div>
              <p className="text-sm leading-relaxed md:max-w-[280px] md:text-right" style={{ color: "rgba(0,29,57,0.45)" }}>
                DTCP & RERA approved plotted layouts crafted for families who demand clear titles, prime locations, and complete transparency.
              </p>
            </div>
          </FadeUp>

          {/* Filter tabs */}
          <FadeUp delay={0.1} className="mb-12">
            <div
              className="inline-flex flex-wrap gap-1 p-1"
              style={{ background: "#EDE8DF", borderRadius: "2px" }}
            >
              {TABS.map((t) => {
                const isActive = active === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                    style={{
                      background: isActive ? "#001D39" : "transparent",
                      color: isActive ? "#C9A84C" : "rgba(0,29,57,0.5)",
                      borderRadius: "2px",
                    }}
                  >
                    <t.Icon className="h-3.5 w-3.5" />
                    {t.label}
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5"
                      style={{
                        background: isActive ? "rgba(201,168,76,0.2)" : "rgba(0,29,57,0.08)",
                        color: isActive ? "#C9A84C" : "rgba(0,29,57,0.4)",
                        borderRadius: "2px",
                      }}
                    >
                      {t.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeUp>

          {/* Cards grid */}
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
                  key={p.name}
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

      {/* ── Bottom CTA ── */}
      <section style={{ background: "#F5F0E8" }} className="py-24 border-t border-[#e8e3d8]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">

            {/* Left text */}
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "#C9A84C" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.38em]" style={{ color: "#8B6914" }}>
                  Get in Touch
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl" style={{ color: "#001D39" }}>
                Find Your <span className="italic" style={{ color: "#8B6914" }}>Perfect Plot</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: "rgba(0,29,57,0.5)" }}>
                Get in touch for site visits, pricing, and exclusive pre-launch offers. Our team is ready to guide you.
              </p>
            </FadeUp>

            {/* Right CTAs */}
            <FadeUp delay={0.15} className="flex flex-col gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "#001D39",
                  borderRadius: "2px",
                  boxShadow: "0 4px 20px rgba(0,29,57,0.2)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#0A2E4A")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#001D39")}
              >
                Enquire Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "transparent",
                  border: "1.5px solid #001D39",
                  color: "#001D39",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#001D39";
                  (e.currentTarget as HTMLElement).style.color = "#C9A84C";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#001D39";
                }}
              >
                Book a Site Visit
              </Link>
            </FadeUp>

          </div>

          {/* Trust badges */}
          <FadeUp delay={0.2}>
            <div
              className="mt-14 flex flex-wrap items-center gap-6 pt-10"
              style={{ borderTop: "1px solid rgba(0,29,57,0.1)" }}
            >
              {["DTCP Approved", "RERA Registered", "100% Clear Title", "Est. 2020", "500+ Families"].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full" style={{ background: "#C9A84C" }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(0,29,57,0.45)" }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}