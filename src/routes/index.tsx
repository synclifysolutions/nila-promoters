import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  ShieldCheck, FileCheck2, MapPin, Wallet, Award, Eye,
  ChevronDown, Star, ArrowRight, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import nilahero4 from "@/assets/nila-hero4.jpg";
import nilahero1 from "@/assets/nila-hero1.jpg";
import nilaAd1 from "@/assets/nila_ad_1.png";
import nilaAd2 from "@/assets/nila_ad_2.png";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { COMPLETED, ONGOING, UPCOMING } from "@/lib/projects";
import mahalakshmilogo from "@/assets/logos/mahalakshmi-logo.png";
import anugraghalogo from "@/assets/logos/anugragha-logo.png";
import megalogo from "@/assets/logos/mega-logo.png";

import anugraha1 from "@/assets/logos/anugraha-1.jpg";
import anugraha2 from "@/assets/logos/anugraha-2.jpg";
import anugraha3 from "@/assets/logos/anugraha-3.jpg";
import anugraha4 from "@/assets/logos/anugraha-4.jpg";
import anugraha5 from "@/assets/logos/anugraha-5.jpg";
import anugraha6 from "@/assets/logos/anugraha-6.jpg";
import anugraha7 from "@/assets/logos/anugraha-7.jpg";
import anugraha8 from "@/assets/logos/anugraha-8.jpg";
import anugraha9 from "@/assets/logos/anugraha-9.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nila Promoters — Premium DTCP & RERA Plots in Kumbakonam" },
      { name: "description", content: "Own land that lasts generations. DTCP & RERA approved premium plot developer since 2020." },
      { property: "og:title", content: "Nila Promoters — Premium Plots in Kumbakonam" },
      { property: "og:description", content: "DTCP & RERA approved premium plot developer since 2020." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const GALLERY_IMAGES = [
  { src: anugraha1, alt: "Anugraha Avenue Plot 1" },
  { src: anugraha2, alt: "Anugraha Avenue Plot 2" },
  { src: anugraha3, alt: "Anugraha Avenue Plot 3" },
  { src: anugraha4, alt: "Anugraha Avenue Plot 4" },
  { src: anugraha5, alt: "Anugraha Avenue Plot 5" },
  { src: anugraha6, alt: "Anugraha Avenue Plot 6" },
  { src: anugraha7, alt: "Anugraha Avenue Plot 7" },
  { src: anugraha8, alt: "Anugraha Avenue Plot 8" },
  { src: anugraha9, alt: "Anugraha Avenue Plot 9" },
];

const CONFETTI_COLORS = [
  "#E8C77E", "#F9F4F1", "#1B3650", "#0F2235",
  "#e63946", "#2ec4b6", "#ff9f1c", "#cbf3f0",
  "#ffbf69", "#ffffff", "#a8dadc", "#457b9d",
  "#f4a261", "#e9c46a", "#264653", "#2a9d8f",
];

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotSpeed: number;
  color: string;
  w: number; h: number;
  shape: "circle" | "rect" | "strip";
  gravity: number;
  alpha: number; life: number;
};

/* ─── Popup Ad Component ─── */
function AdPopup() {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => launchConfetti(), 320);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(animRef.current);
    };
  }, [visible]);

  function launchConfetti() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const particles: Particle[] = [];
    const cannons = [
      { x: W * 0.1, y: H * 0.85, angleMin: -110, angleMax: -60 },
      { x: W * 0.9, y: H * 0.85, angleMin: -120, angleMax: -70 },
      { x: 0,       y: H * 0.45, angleMin: -35,  angleMax: 15  },
      { x: W,       y: H * 0.45, angleMin: 165,  angleMax: 215 },
    ];

    for (let i = 0; i < 260; i++) {
      const cannon = cannons[Math.floor(Math.random() * cannons.length)];
      const angleDeg = cannon.angleMin + Math.random() * (cannon.angleMax - cannon.angleMin);
      const angleRad = (angleDeg * Math.PI) / 180;
      const speed = 10 + Math.random() * 14;
      const shape = (["circle", "rect", "strip"] as const)[Math.floor(Math.random() * 3)];
      particles.push({
        x: cannon.x, y: cannon.y,
        vx: Math.cos(angleRad) * speed,
        vy: Math.sin(angleRad) * speed,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 18,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        w: shape === "strip" ? 3 + Math.random() * 3 : 7 + Math.random() * 9,
        h: shape === "strip" ? 14 + Math.random() * 10 : 4 + Math.random() * 6,
        shape,
        gravity: 0.3 + Math.random() * 0.25,
        alpha: 1, life: 0.85 + Math.random() * 0.15,
      });
    }

    const ctx = canvas.getContext("2d")!;
    function animate() {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.vy += p.gravity; p.vx *= 0.985;
        p.rot += p.rotSpeed;
        p.life -= 0.006;
        p.alpha = Math.max(0, p.life);
        if (p.y < H + 30 && p.alpha > 0) alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
      if (alive) animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
  }

  function close() {
    cancelAnimationFrame(animRef.current);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ad-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%", zIndex: 0 }} />
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
            style={{ maxWidth: 900, maxHeight: "92vh", overflowY: "auto", background: "#fff", zIndex: 1 }}
          >
            <button
              onClick={close}
              aria-label="Close advertisement"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{ background: "rgba(15,34,53,0.7)", color: "#fff" }}
            >
              <X className="h-4 w-4" />
            </button>

            {/* MOBILE: stack images vertically; DESKTOP: side by side */}
            <div className="flex flex-col sm:flex-row w-full" style={{ background: "#fff" }}>
              <motion.div
                initial={{ x: 0, y: -40, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex items-center justify-center overflow-hidden"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
              >
                <img src={nilaAd1} alt="அனுக்கிரஹா அவென்யூ – Nila Promoters plot layout" className="w-full h-full object-contain" style={{ maxHeight: "min(45vh, 380px)" }} />
              </motion.div>
              <motion.div
                initial={{ x: 0, y: 40, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex items-center justify-center overflow-hidden"
              >
                <img src={nilaAd2} alt="மனைப்பிரிவின் சிறப்பம்சங்கள் மற்றும் இட வரைபடம்" className="w-full h-full object-contain" style={{ maxHeight: "min(45vh, 380px)" }} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.45 }}
              className="flex gap-3 justify-center px-4 py-3"
              style={{ background: "#0F2235" }}
            >
              <a href="tel:9629688133" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105" style={{ background: "#F9F4F1", color: "#0F2235" }}>📞 Call Now</a>
              <a href="https://wa.me/919629688133" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105" style={{ background: "#F9F4F1", color: "#0F2235" }}>💬 WhatsApp</a>
            </motion.div>
            <div onClick={close} className="py-2 text-center text-xs cursor-pointer select-none" style={{ background: "#fff", color: "#999" }}>Close</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Fullscreen Lightbox ─── */
function Lightbox({ images, startIndex, onClose }: { images: typeof GALLERY_IMAGES; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.96)" }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          style={{ background: "rgba(249,244,241,0.12)", color: "#F9F4F1", border: "1px solid rgba(249,244,241,0.2)" }}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-medium" style={{ color: "rgba(249,244,241,0.55)" }}>
          {current + 1} / {images.length}
        </div>

        {/* Smaller nav buttons on mobile */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-2 sm:left-8 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all hover:scale-110 z-10"
          style={{ background: "rgba(249,244,241,0.12)", color: "#F9F4F1", border: "1px solid rgba(249,244,241,0.25)" }}
        >
          <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
        </button>

        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
          style={{ width: "100vw", height: "100vh", padding: "72px 52px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[current].src}
            alt={images[current].alt}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 25px 80px rgba(0,0,0,0.7)",
              border: "1px solid rgba(249,244,241,0.15)",
            }}
          />
        </motion.div>

        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-2 sm:right-8 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all hover:scale-110 z-10"
          style={{ background: "rgba(249,244,241,0.12)", color: "#F9F4F1", border: "1px solid rgba(249,244,241,0.25)" }}
        >
          <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className="rounded-full transition-all"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? "#E8C77E" : "rgba(249,244,241,0.3)",
              }}
            />
          ))}
        </div>

        {/* Hide keyboard hint on mobile */}
        <div
          className="absolute bottom-6 right-6 text-xs font-medium px-3 py-1.5 rounded-full hidden sm:block"
          style={{ background: "rgba(249,244,241,0.08)", color: "rgba(249,244,241,0.4)", border: "1px solid rgba(249,244,241,0.12)" }}
        >
          ← → keys to navigate · Esc to close
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Infinite Scroll Gallery ─── */
function InfiniteGallery() {
  const [paused, setPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const speed = 0.6;

  const doubled = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function tick() {
      if (!paused && track) {
        posRef.current += speed;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence>
          {paused && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-20 rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest pointer-events-none"
              style={{ background: "rgba(15,34,53,0.80)", color: "#E8C77E", backdropFilter: "blur(8px)", border: "1px solid rgba(232,199,126,0.25)" }}
            >
              Click to open · Arrow keys to navigate
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={trackRef} className="flex gap-3 sm:gap-5 will-change-transform py-3" style={{ width: "max-content" }}>
          {doubled.map((img, i) => {
            const realIndex = i % GALLERY_IMAGES.length;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => setLightboxIndex(realIndex)}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl shrink-0"
                style={{
                  /* Smaller on mobile: 260px vs 380px on desktop */
                  width: "clamp(220px, 45vw, 380px)",
                  height: "clamp(155px, 32vw, 270px)",
                  border: "1px solid rgba(15,34,53,0.12)",
                  boxShadow: "0 6px 28px rgba(15,34,53,0.12)",
                  cursor: "zoom-in",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  draggable={false}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(15,34,53,0.42)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                    style={{ background: "rgba(232,199,126,0.95)" }}
                  >
                    <Eye className="h-6 w-6" style={{ color: "#0F2235" }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ─── count-up hook ─── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return { count, ref };
}

const statsData = [
  { value: 2000, suffix: "+", label: "Happy Families"     },
  { value: 10,  suffix: "+", label: "Projects Delivered" },
  { value: 5,   suffix: "+", label: "Years of Trust"     },
  { value: 100, suffix: "%", label: "Clear Title Plots"  },
];

function StatItem({ value, suffix, label, index, dark }: (typeof statsData)[0] & { index: number; dark?: boolean }) {
  const { count, ref } = useCountUp(value, 2000 + index * 150);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 text-center py-5 sm:py-6"
    >
      <div className="flex items-end leading-none">
        {/* Responsive font size: smaller on mobile */}
        <span className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tabular-nums" style={{ color: dark ? "#F9F4F1" : "#0F2235" }}>{count}</span>
        <span className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-1" style={{ color: "#1B3650" }}>{suffix}</span>
      </div>
      <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em]" style={{ color: dark ? "rgba(249,244,241,0.5)" : "rgba(15,34,53,0.45)" }}>{label}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY       = useTransform(scrollY, [0, 700], [0, 140]);
  const heroScale   = useTransform(scrollY, [0, 700], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.25]);
  const textY       = useTransform(scrollY, [0, 400], [0, 55]);

  return (
    <>
      <AdPopup />

      {/* 1. HERO */}
      <section ref={heroRef} className="relative min-h-screen sm:min-h-[700px] w-full overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.18, filter: "blur(22px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <img src={nilahero4} alt="Premium residential plot layout in Kumbakonam" className="h-full w-full object-cover object-center" style={{ filter: "brightness(1.15) contrast(1.05) saturate(1.08)" }} width={1920} height={1080} />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,34,53,0.55) 0%, rgba(15,34,53,0.28) 55%, rgba(15,34,53,0.08) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,34,53,0.42) 0%, transparent 50%)" }} />

        <motion.div style={{ y: textY, opacity: heroOpacity }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-6 pb-16 pt-28 sm:pt-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -28, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 sm:mb-7 flex items-center gap-2 sm:gap-3"
          >
            <span className="h-px w-6 sm:w-10" style={{ background: "#F9F4F1" }} />
            <span className="rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.28em] backdrop-blur-md" style={{ border: "1px solid rgba(232,199,126,0.55)", background: "rgba(15,34,53,0.55)", color: "#F9F4F1", boxShadow: "0 4px 20px rgba(0,0,0,0.45)" }}>
              DTCP · RERA Approved · Est. 2020
            </span>
          </motion.div>

          {/* Hero heading — tighter on mobile */}
          <h1 className="font-hero font-bold leading-[1.02] text-white">
            <div className="overflow-visible">
              <motion.div
                initial={{ y: "105%", filter: "blur(14px)" }} animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="text-[34px] sm:text-5xl md:text-7xl lg:text-[82px] leading-tight"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.55)" }}
              >
                Where Your Dream Begins with
              </motion.div>
            </div>
            <div className="overflow-visible">
              <motion.div
                initial={{ y: "105%", filter: "blur(14px)" }} animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="text-[34px] sm:text-5xl md:text-7xl lg:text-[82px] leading-tight"
              >
                <span className="italic">
                  <span style={{ color: "#1a7a2e", WebkitTextStroke: "clamp(3px, 1vw, 8px) #E8C77E", paintOrder: "stroke fill" }}>Nila </span>
                  <span style={{ color: "#e01b1b", WebkitTextStroke: "clamp(3px, 1vw, 8px) #E8C77E", paintOrder: "stroke fill" }}>Promoters.</span>
                </span>
              </motion.div>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-7 max-w-lg border-l-2 pl-4 sm:pl-5 text-sm sm:text-base leading-relaxed md:text-[17px]"
            style={{ color: "rgba(249,244,241,0.92)", borderColor: "rgba(168,196,205,0.55)", textShadow: "0 1px 6px rgba(0,0,0,0.55)" }}
          >
            Premium DTCP &amp; RERA-approved plots for families who demand clear titles, prime locations, and absolute transparency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/projects" className="group flex items-center gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #0F2235 0%, #1B3650 100%)", boxShadow: "0 4px 24px rgba(15,34,53,0.5)" }}>
              Explore Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="flex items-center gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold backdrop-blur transition-all hover:scale-105" style={{ border: "1px solid rgba(249,244,241,0.45)", background: "rgba(249,244,241,0.10)", color: "#F9F4F1" }}>
              Book a Site Visit
            </Link>
          </motion.div>

          {/* Trust badges — wrap to 2 per row on mobile */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.75, duration: 0.8 }}
            className="mt-6 sm:mt-10 flex flex-wrap gap-2"
          >
            {["DTCP Approved", "RERA Certified", "100% Clear Title", "No Hidden Charges"].map((b) => (
              <span key={b} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-medium backdrop-blur" style={{ border: "1px solid rgba(249,244,241,0.22)", background: "rgba(249,244,241,0.08)", color: "rgba(249,244,241,0.78)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#F9F4F1" }} />
                {b}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.6 }} className="absolute bottom-6 sm:bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="h-6 w-6" style={{ color: "rgba(249,244,241,0.5)" }} />
          </motion.div>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(249,244,241,0.4)" }}>Scroll</span>
        </motion.div>
      </section>

      {/* 2. STATS */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "#F9F4F1" }}
        className="relative overflow-hidden py-16 sm:py-24"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(15,34,53,0.06) 3px, transparent 3px)", backgroundSize: "26px 26px" }} />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: "#E8C77E" }}>Our Track Record</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "#0F2235" }}>Numbers That Speak Trust</h2>
          </Reveal>
          {/* 2x2 on mobile, 4 across on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {statsData.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} className="relative">
                {/* Vertical divider: after col 1 on mobile (every 2nd), after col 1/2/3 on md */}
                {(i === 1 || i === 3) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px md:hidden" style={{ background: "rgba(15,34,53,0.1)" }} />
                )}
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden h-12 w-px md:block" style={{ background: "rgba(15,34,53,0.1)" }} />
                )}
                <StatItem {...s} index={i} dark={false} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. WHY CHOOSE */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "#0F2235" }}
        className="py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#F9F4F1" }}>Our Promise</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Why Families Trust{" "}<span style={{ color: "#E8C77E" }}>Nila Promoters</span>
            </h2>
          </Reveal>
          {/* 1 col on mobile, 2 on sm, 3 on lg */}
          <Stagger className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: ShieldCheck, t: "DTCP & RERA Approved",   d: "Every layout cleared by Tamil Nadu's town planning and real-estate regulators." },
              { Icon: FileCheck2,  t: "100% Clear Title",        d: "Legally verified, encumbrance-free documents on every single plot we sell." },
              { Icon: MapPin,      t: "Prime Locations",         d: "Hand-picked micro-markets across Kumbakonam with the strongest growth fundamentals." },
              { Icon: Wallet,      t: "Flexible Payment Plans",  d: "Tailored installment structures that fit family budgets — no hidden charges." },
              { Icon: Award,       t: "Trusted Since 2020",      d: "Five years of consistent delivery and 500+ families who chose us as their partner." },
              { Icon: Eye,         t: "Transparent Dealings",    d: "What we promise on paper is exactly what we deliver on the ground." },
            ].map(({ Icon, t, d }, i) => {
              const isDark = i % 2 === 0;
              return (
                <motion.div
                  key={t}
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="rounded-xl sm:rounded-2xl p-5 sm:p-7 transition-all"
                  style={{ border: isDark ? "1px solid rgba(27,54,80,0.55)" : "1px solid rgba(249,244,241,0.18)", background: isDark ? "rgba(27,54,80,0.45)" : "rgba(249,244,241,0.06)" }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: isDark ? "rgba(249,244,241,0.14)" : "rgba(249,244,241,0.12)", color: "#F9F4F1" }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg sm:text-xl font-bold" style={{ color: "#ffffff" }}>{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: isDark ? "rgba(249,244,241,0.58)" : "rgba(249,244,241,0.45)" }}>{d}</p>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </motion.section>

      {/* 4. FEATURED PROJECTS */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "#F9F4F1" }}
        className="py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: "#1B3650" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: "#1B3650" }}>Portfolio</span>
              <span className="h-px w-8" style={{ background: "#1B3650" }} />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: "#0F2235" }}>
              Our Signature{" "}<span className="italic" style={{ color: "#E8C77E" }}>Projects</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: "rgba(15,34,53,0.55)" }}>
              A curated selection of layouts that define quality, trust, and lasting value.
            </p>
          </Reveal>
          {/* 1 col on mobile, 2 on sm, 3 on lg */}
          <Stagger className="grid gap-5 sm:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard p={{ ...COMPLETED[0], logo: mahalakshmilogo }} />
            <ProjectCard p={{ ...ONGOING[0],   logo: anugraghalogo }} />
            <ProjectCard p={{ ...UPCOMING[0],  logo: megalogo }} />
          </Stagger>
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full px-6 sm:px-7 py-3 text-sm font-semibold transition-all hover:scale-105"
              style={{ border: "2px solid #1B3650", color: "#0F2235" }}
            >
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 4b. PROJECT GALLERY */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "#F9F4F1" }}
        className="pb-16 sm:pb-24 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 mb-8 sm:mb-10">
          <Reveal className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: "#1B3650" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: "#1B3650" }}>Site Gallery</span>
              <span className="h-px w-8" style={{ background: "#1B3650" }} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "#0F2235" }}>
              Glimpses from the{" "}<span className="italic" style={{ color: "#E8C77E" }}>Ground</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-xs sm:text-sm" style={{ color: "rgba(15,34,53,0.5)" }}>
              Hover to pause · Click any photo to view fullscreen
            </p>
          </Reveal>
        </div>
        <InfiniteGallery />
      </motion.section>

      {/* 5. TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden py-20 sm:py-28" style={{ background: "#1B3650" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl" style={{ background: "rgba(249,244,241,0.10)" }} />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl" style={{ background: "rgba(15,34,53,0.5)" }} />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(249,244,241,0.18) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="mb-12 sm:mb-16 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: "#E8C77E" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#E8C77E" }}>Voices of Trust</span>
              <span className="h-px w-8" style={{ background: "#E8C77E" }} />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              What Our{" "}<span className="italic" style={{ color: "#E8C77E" }}>Families</span>{" "}Say
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: "rgba(249,244,241,0.55)" }}>Over 500 families have trusted us with their most important investment.</p>
          </Reveal>

          {/* 1 col on mobile, 3 on md */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            {[
              { n: "Ramesh Kumar", l: "Kumbakonam", q: "From documentation to registration, Nila Promoters made the entire process effortless. My plot in Mahalakshmi Nagar was the best decision for my family.", rating: 5 },
              { n: "Lakshmi Priya", l: "Senchina",  q: "True to their word on every commitment. The Sanjana Nagar layout is exactly as promised — clear titles, wide roads, peaceful location.", rating: 5 },
              { n: "Suresh Babu",  l: "Thanjavur",  q: "I evaluated five developers before choosing Nila. Their transparency and DTCP approvals stood out. Couldn't be happier.", rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col"
                style={{ background: "linear-gradient(135deg, rgba(15,34,53,0.7) 0%, rgba(15,34,53,0.92) 100%)", border: "1px solid rgba(249,244,241,0.14)", backdropFilter: "blur(12px)" }}
              >
                <div className="absolute top-0 left-8 right-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(249,244,241,0.35), transparent)" }} />
                <div className="absolute top-6 right-7 font-display text-7xl font-bold leading-none select-none" style={{ color: "rgba(249,244,241,0.08)" }}>"</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" style={{ fill: "#E8C77E", color: "#E8C77E" }} />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "rgba(249,244,241,0.82)" }}>"{t.q}"</p>
                <div className="my-4 sm:my-6 h-px" style={{ background: "rgba(249,244,241,0.12)" }} />
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full font-display text-base sm:text-lg font-bold shrink-0" style={{ background: "linear-gradient(135deg, #0F2235, #1B3650)", color: "#F9F4F1", boxShadow: "0 0 0 2px rgba(249,244,241,0.3)" }}>{t.n[0]}</div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-sm truncate">{t.n}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-3 w-3 shrink-0" style={{ color: "rgba(249,244,241,0.6)" }} />
                      <span className="text-xs" style={{ color: "rgba(249,244,241,0.5)" }}>{t.l}</span>
                    </div>
                  </div>
                  <div className="ml-auto shrink-0">
                    <div className="text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full" style={{ background: "rgba(249,244,241,0.12)", color: "#F9F4F1", border: "1px solid rgba(249,244,241,0.25)" }}>Verified</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
          >
            {[{ value: "500+", label: "Happy Families" }, { value: "5★", label: "Average Rating" }, { value: "100%", label: "Verified Reviews" }].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="text-xl sm:text-2xl font-bold font-display" style={{ color: "#F9F4F1" }}>{s.value}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest" style={{ color: "rgba(249,244,241,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 6. CTA BANNER */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden py-20 sm:py-28"
      >
        <div className="absolute inset-0">
          <img src={nilahero1} alt="Nila Promoters plot layout" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,34,53,0.55) 0%, rgba(15,34,53,0.4) 45%, rgba(15,34,53,0.65) 100%)" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#E8C77E", textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>Take the Next Step</span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.75)" }}>
              Ready to Own Your Dream Plot in{" "}<span className="italic" style={{ color: "#E8C77E" }}>Kumbakonam?</span>
            </h2>
            <p className="mx-auto mt-4 sm:mt-5 max-w-xl text-sm sm:text-base md:text-lg" style={{ color: "rgba(249,244,241,0.95)", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>
              Schedule a complimentary site visit. Walk the land, ask every question, and decide with complete confidence.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold shadow-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #E8C77E 0%, #d4ad57 100%)", color: "#0F2235", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                Book a Site Visit Today <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold backdrop-blur transition-all hover:scale-105" style={{ border: "2px solid rgba(249,244,241,0.5)", color: "#F9F4F1" }}>
                View All Projects
              </Link>
            </div>
          </Reveal>
        </div>
      </motion.section>

      <div className="h-[5px] w-full" style={{ background: "linear-gradient(90deg, #d4ad57 0%, #E8C77E 50%, #d4ad57 100%)", boxShadow: "0 0 20px rgba(232,199,126,0.65)" }} />
    </>
  );
}