import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, MapPin, MessageCircle, Phone, Download } from "lucide-react";
import { PageBanner } from "./about";
import { ProjectsCTA } from "@/components/site/ProjectsCTA";
import { ALL_PROJECTS, DEFAULT_FEATURES, COMPANY_PHONE, COMPANY_WHATSAPP } from "@/data/projects";
import { getFeatureIcon, statusConfig } from "@/lib/feature-icons";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = ALL_PROJECTS.find((p) => p.slug === params.slug);
    return {
      meta: [
        { title: project ? `${project.name} — Nila Promoters` : "Project Not Found — Nila Promoters" },
        { name: "description", content: project?.description ?? "Explore Nila Promoters' plotted developments in Kumbakonam." },
      ],
    };
  },
  component: ProjectDetailsPage,
});

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

function ProjectDetailsPage() {
  const { slug } = Route.useParams();
  const project = ALL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section style={{ background: "#FAFAF8" }} className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="font-display text-4xl font-bold" style={{ color: "#001D39" }}>Project Not Found</h1>
        <p className="text-sm" style={{ color: "rgba(0,29,57,0.5)" }}>The project you're looking for doesn't exist or may have been moved.</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white"
          style={{ background: "#001D39", borderRadius: "2px" }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
      </section>
    );
  }

  const cfg = statusConfig[project.status];
  const features = project.features?.length ? project.features : DEFAULT_FEATURES;
  const phone = project.phone ?? COMPANY_PHONE;
  const whatsapp = project.whatsapp ?? COMPANY_WHATSAPP;

  return (
    <>
      <PageBanner title={project.name} crumbs={["Home", "Projects", project.name]} />

      {/* ── Overview ── */}
      <section style={{ background: "#FAFAF8" }} className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp className="mb-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-300"
              style={{ color: "#001D39" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B6914")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#001D39")}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Link>
          </FadeUp>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Left — image/logo panel */}
            <FadeUp>
              <div
                className="relative aspect-[4/3] w-full overflow-hidden border border-[#e8e3d8] bg-[#F5F0E8]"
                style={{ borderRadius: "2px" }}
              >
                {project.logo && (
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <img src={project.logo} alt={`${project.name} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                )}

                <div
                  className="absolute left-5 top-5 z-20 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                  style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`, borderRadius: "2px" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: cfg.dot }} />
                  {cfg.label}
                </div>

                {project.highlight && (
                  <div
                    className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 text-center text-xs font-bold tracking-widest"
                    style={{ background: "#001D39", color: "#C9A84C" }}
                  >
                    {project.highlight}
                  </div>
                )}
              </div>
            </FadeUp>

            {/* Right — content */}
            <FadeUp delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "#C9A84C" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.38em]" style={{ color: "#8B6914" }}>Portfolio</span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl" style={{ color: "#001D39" }}>
                {project.name}
              </h1>

              <div className="mt-4 inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" style={{ color: "#C9A84C" }} />
                <span className="text-sm font-semibold" style={{ color: "rgba(0,29,57,0.55)" }}>
                  {project.address ?? project.location}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(0,29,57,0.55)" }}>
                {project.description}
              </p>

             {/* Feature grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => {
                  const Icon = getFeatureIcon(f);
                  return (
                    <div
                      key={f}
                      className="flex items-center gap-3 border border-[#e8e3d8] bg-white px-4 py-3"
                      style={{ borderRadius: "2px" }}
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center"
                        style={{ background: "#F5F0E8", borderRadius: "2px" }}
                      >
                        {/* FIXED: Replaced inline style color with Tailwind text color to bypass strict icon types */}
                        <Icon className="h-4 w-4 text-[#8B6914]" />
                      </span>
                      <span className="text-sm font-semibold" style={{ color: "#001D39" }}>{f}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                {/* FIXED: Combined the broken anchor tags back into a single clean button wrapper */}
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${project.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#1EA952", borderRadius: "2px" }}
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#001D39", borderRadius: "2px", boxShadow: "0 4px 20px rgba(0,29,57,0.2)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#0A2E4A")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#001D39")}
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Gallery (only shows if images are provided) ── */}
      {!!project.gallery?.length && (
        <section style={{ background: "#FFFFFF" }} className="py-20 border-t border-[#e8e3d8]">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "#C9A84C" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.38em]" style={{ color: "#8B6914" }}>Visuals</span>
              </div>
              <h2 className="font-display text-3xl font-bold md:text-4xl" style={{ color: "#001D39" }}>
                Project <span className="italic" style={{ color: "#8B6914" }}>Gallery</span>
              </h2>
            </FadeUp>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.gallery!.map((img, i) => (
                <FadeUp key={img + i} delay={i * 0.05}>
                  <div className="aspect-[4/3] overflow-hidden border border-[#e8e3d8]" style={{ borderRadius: "2px" }}>
                    <img src={img} alt={`${project.name} gallery ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Layout Map (only shows if provided) ── */}
      {project.layoutMapImage && (
        <section style={{ background: "#FAFAF8" }} className="py-20 border-t border-[#e8e3d8]">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <FadeUp className="mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "#C9A84C" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.38em]" style={{ color: "#8B6914" }}>Site Plan</span>
              </div>
              <h2 className="font-display text-3xl font-bold md:text-4xl" style={{ color: "#001D39" }}>
                Layout <span className="italic" style={{ color: "#8B6914" }}>Map</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="overflow-hidden border-2 border-[#001D39]" style={{ borderRadius: "2px" }}>
                <img src={project.layoutMapImage} alt={`${project.name} layout map`} className="w-full" />
              </div>
            </FadeUp>
            <FadeUp delay={0.2} className="mt-8">
              <a
                href={project.layoutMapPdf ?? project.layoutMapImage}
                download
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "#001D39", borderRadius: "2px" }}
              >
                <Download className="h-4 w-4" /> Download Layout Map
              </a>
            </FadeUp>
          </div>
        </section>
      )}

      <ProjectsCTA />
    </>
  );
}