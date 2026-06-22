import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  MapPin,
  MessageCircle,
  Phone,
  Download,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { PageBanner } from "./about";
import { Reveal } from "@/components/site/Reveal";
import nilahero1 from "@/assets/nila-hero1.jpg";
import {
  ALL_PROJECTS,
  DEFAULT_FEATURES,
  COMPANY_PHONE,
  COMPANY_WHATSAPP,
} from "@/data/projects";
import { statusConfig } from "@/lib/feature-icons";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = ALL_PROJECTS.find((p) => p.slug === params.slug);

    return {
      meta: [
        {
          title: project
            ? `${project.name} — Nila Promoters`
            : "Project Not Found — Nila Promoters",
        },
        {
          name: "description",
          content:
            project?.description ??
            "Explore Nila Promoters plotted developments in Kumbakonam.",
        },
      ],
    };
  },
  component: ProjectDetailsPage,
});

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 32, filter: "blur(10px)" }
      }
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [goPrev, goNext, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-white/80 transition hover:text-white"
      >
        <X className="h-7 w-7" />
      </button>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition hover:text-white sm:left-6"
        >
          <ChevronLeft className="h-9 w-9" />
        </button>
      )}

      <motion.img
        key={images[index]}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={images[index]}
        alt={`Gallery image ${index + 1} of ${images.length}`}
        className="max-h-[88vh] max-w-[92vw] select-none object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition hover:text-white sm:right-6"
        >
          <ChevronRight className="h-9 w-9" />
        </button>
      )}

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold tracking-widest text-white/70"
        onClick={(e) => e.stopPropagation()}
      >
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
}

/* ── Layout Map Viewer — fullscreen + zoom + pan ── */
function LayoutMapViewer({ image, name }: { image: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.5, 1));
  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...pos };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPos({
      x: posStart.current.x + (e.clientX - dragStart.current.x),
      y: posStart.current.y + (e.clientY - dragStart.current.y),
    });
  };
  const onMouseUp = () => {
    dragging.current = false;
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.min(Math.max(s - e.deltaY * 0.001, 1), 5));
  };

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Thumbnail — click to open fullscreen */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View layout map fullscreen"
        className="group relative block w-full overflow-hidden border-2 border-[#001D39]"
        style={{ borderRadius: "2px" }}
      >
        <img
          src={image}
          alt={`${name} layout map`}
          className="w-full transition duration-300 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background: "rgba(0,29,57,0.5)" }}
        >
          <span
            className="rounded-full px-6 py-2.5 text-sm font-bold text-white"
            style={{ background: "rgba(201,168,76,0.95)" }}
          >
            🔍 Click to View Fullscreen
          </span>
        </div>
      </button>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: "rgba(0,0,0,0.95)" }}
          >
            {/* Top bar */}
            <div
              className="flex shrink-0 items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="text-sm font-bold text-white/80">
                {name} — Layout Map
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={zoomOut}
                  aria-label="Zoom out"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-white/80 transition hover:text-white"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  −
                </button>
                <span className="w-14 text-center text-xs font-bold text-white/60">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={zoomIn}
                  aria-label="Zoom in"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-white/80 transition hover:text-white"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full px-4 py-2 text-xs font-bold text-white/70 transition hover:text-white"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-white"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Image pan/zoom area */}
            <div
              className="flex flex-1 items-center justify-center overflow-hidden"
              style={{ cursor: scale > 1 ? "grab" : "default" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onWheel={onWheel}
            >
              <img
                src={image}
                alt={`${name} layout map`}
                draggable={false}
                style={{
                  transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
                  transition: dragging.current ? "none" : "transform 0.2s ease",
                  maxWidth: "95vw",
                  maxHeight: "82vh",
                  objectFit: "contain",
                  userSelect: "none",
                }}
              />
            </div>

            {/* Bottom hint */}
            <div className="shrink-0 py-3 text-center text-xs text-white/40">
              Scroll to zoom · Drag to pan · Press Esc to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SiteCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden py-28"
    >
      <div className="absolute inset-0">
        <img
          src={nilahero1}
          alt="Nila Promoters plot layout"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,34,53,0.55) 0%, rgba(15,34,53,0.4) 45%, rgba(15,34,53,0.65) 100%)",
          }}
        />
      </div>
      <div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(232,199,126,0.12)" }}
      />
      <div
        className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(249,244,241,0.08)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#E8C77E", textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
          >
            Take the Next Step
          </span>
          <h2
            className="mt-4 font-display text-3xl font-bold text-white md:text-5xl"
            style={{
              textShadow: "0 2px 6px rgba(0,0,0,0.75), 0 4px 30px rgba(0,0,0,0.55)",
            }}
          >
            Ready to Own Your Dream Plot in{" "}
            <span className="italic" style={{ color: "#E8C77E" }}>
              Kumbakonam?
            </span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl md:text-lg"
            style={{ color: "rgba(249,244,241,0.95)", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}
          >
            Schedule a complimentary site visit. Walk the land, ask every question,
            and decide with complete confidence.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold shadow-lg transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #E8C77E 0%, #d4ad57 100%)",
                color: "#0F2235",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(232,199,126,0.5)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.4)")
              }
            >
              Book a Site Visit Today <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold backdrop-blur transition-all hover:scale-105"
              style={{ border: "2px solid rgba(249,244,241,0.5)", color: "#F9F4F1" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(249,244,241,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              View All Projects
            </Link>
          </div>
        </Reveal>
      </div>
    </motion.section>
  );
}

function ProjectDetailsPage() {
  const { slug } = Route.useParams();
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <section
        style={{ background: "#FAFAF8" }}
        className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center"
      >
        <h1
          className="font-display text-4xl font-bold"
          style={{ color: "#001D39" }}
        >
          Project Not Found
        </h1>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white"
          style={{ background: "#001D39", borderRadius: "2px" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </section>
    );
  }

  const cfg = statusConfig[project.status];
  const features = project.features?.length ? project.features : DEFAULT_FEATURES;
  const phone = project.phone ?? COMPANY_PHONE;
  const whatsapp = project.whatsapp ?? COMPANY_WHATSAPP;
  const gallery = project.gallery ?? [];

  return (
    <>
      <PageBanner title={project.name} crumbs={["Home", "Projects", project.name]} />

      <section style={{ background: "#FAFAF8" }} className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp className="mb-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold"
              style={{ color: "#001D39" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </FadeUp>

          <div className="grid gap-12 md:grid-cols-2">
            <FadeUp>
              <div
                className="relative aspect-[4/3] overflow-hidden border border-[#e8e3d8] bg-[#F5F0E8]"
                style={{ borderRadius: "2px" }}
              >
                {project.logo ? (
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <img
                      src={project.logo}
                      alt={`${project.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-bold text-[#001D39]/40">
                    {project.imageLabel}
                  </div>
                )}

                <div
                  className="absolute left-5 top-5 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                  style={{
                    background: cfg.bg,
                    color: cfg.text,
                    border: `1px solid ${cfg.border}`,
                    borderRadius: "2px",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: cfg.dot }}
                  />
                  {cfg.label}
                </div>

                {project.highlight && (
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center text-xs font-bold tracking-widest"
                    style={{ background: "#001D39", color: "#C9A84C" }}
                  >
                    {project.highlight}
                  </div>
                )}
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "#C9A84C" }} />
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.38em]"
                  style={{ color: "#8B6914" }}
                >
                  Project Details
                </span>
              </div>

              <h1
                className="font-display text-4xl font-bold leading-tight md:text-5xl"
                style={{ color: "#001D39" }}
              >
                {project.name}
              </h1>

              <div className="mt-4 inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: "#C9A84C" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "rgba(0,29,57,0.55)" }}
                >
                  {project.address ?? project.location}
                </span>
              </div>

              <p
                className="mt-5 text-sm leading-relaxed"
                style={{ color: "rgba(0,29,57,0.55)" }}
              >
                {project.description}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 border border-[#e8e3d8] bg-white px-4 py-3"
                    style={{ borderRadius: "2px" }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center"
                      style={{ background: "#F5F0E8", borderRadius: "2px" }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#8B6914]" />
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#001D39" }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                    `Hi, I'm interested in ${project.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white"
                  style={{ background: "#1EA952", borderRadius: "2px" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>

                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white"
                  style={{ background: "#001D39", borderRadius: "2px" }}
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Project Gallery ── */}
      {!!gallery.length && (
        <section className="border-t border-[#e8e3d8] bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            {/* CHANGE 1: added text-center to center the heading */}
            <FadeUp className="mb-10 text-center">
              <h2
                className="font-display text-3xl font-bold md:text-4xl"
                style={{ color: "#001D39" }}
              >
                Project{" "}
                <span className="italic" style={{ color: "#8B6914" }}>
                  Gallery
                </span>
              </h2>
            </FadeUp>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.map((img, index) => (
                <FadeUp key={img + index} delay={index * 0.05}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`View ${project.name} gallery image ${index + 1} full size`}
                    className="group aspect-[4/3] w-full overflow-hidden border border-[#e8e3d8]"
                  >
                    <img
                      src={img}
                      alt={`${project.name} gallery ${index + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </button>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={gallery}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>

      {/* ── Layout Map — CHANGE 2: replaced static img with LayoutMapViewer ── */}
      {project.layoutMapImage && (
        <section
          style={{ background: "#FAFAF8" }}
          className="border-t border-[#e8e3d8] py-20"
        >
          <div className="mx-auto max-w-5xl px-6 text-center">
            <FadeUp className="mb-10">
              <h2
                className="font-display text-3xl font-bold md:text-4xl"
                style={{ color: "#001D39" }}
              >
                Layout{" "}
                <span className="italic" style={{ color: "#8B6914" }}>
                  Map
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <LayoutMapViewer
                image={project.layoutMapImage}
                name={project.name}
              />
            </FadeUp>

            <FadeUp delay={0.2} className="mt-8">
              <a
                href={project.layoutMapPdf ?? project.layoutMapImage}
                download
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white"
                style={{ background: "#001D39", borderRadius: "2px" }}
              >
                <Download className="h-4 w-4" />
                Download Layout Map
              </a>
            </FadeUp>
          </div>
        </section>
      )}

      <SiteCTA />

      {/* Gold divider between CTA and footer */}
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