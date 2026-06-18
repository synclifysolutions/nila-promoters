import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ShieldCheck, FileCheck2, MapPin, Wallet, Award, Eye,
  ChevronDown, Star, ArrowRight, X,
} from "lucide-react";
import nilahero4 from "@/assets/nila-hero4.jpg";
import nilaAd1 from "@/assets/nila_ad_1.png";
import nilaAd2 from "@/assets/nila_ad_2.png";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { COMPLETED, ONGOING, UPCOMING } from "@/lib/projects";
import mahalakshmilogo from "@/assets/logos/mahalakshmi-logo.png";
import anugraghalogo from "@/assets/logos/anugragha-logo.png";
import megalogo from "@/assets/logos/mega-logo.png";

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

/* ─── PALETTE (matched from reference image) ───
   Navy:        #0F2235  (deep navy — primary dark sections/buttons)
   Navy Soft:   #1B3650  (secondary navy — mid-tone sections/cards)
   Ivory:       #F9F4F1  (warm off-white — light backgrounds, cream buttons)
   Ink:         #14140F-ish near-black — handled via Tailwind/inline as needed
   No separate blue accent — contrast comes from navy ↔ ivory only, as in the reference.
*/

/* ─── Popup Ad Component ─── */
function AdPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ad-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full overflow-hidden rounded-3xl shadow-2xl"
            style={{ maxWidth: 900, maxHeight: "92vh", overflowY: "auto", background: "#fff" }}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close advertisement"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{ background: "rgba(15,34,53,0.7)", color: "#fff" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(15,34,53,0.95)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(15,34,53,0.7)")}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Images side-by-side */}
            <div className="flex flex-row w-full" style={{ background: "#fff" }}>
              <motion.div
                initial={{ x: -70, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex items-center justify-center overflow-hidden"
                style={{ borderRight: "1px solid rgba(0,0,0,0.08)" }}
              >
                <img
                  src={nilaAd1}
                  alt="அனுக்கிரஹா அவென்யூ – Nila Promoters plot layout"
                  className="w-full h-full object-contain"
                  style={{ maxHeight: "min(55vh, 460px)" }}
                />
              </motion.div>

              <motion.div
                initial={{ x: 70, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={nilaAd2}
                  alt="மனைப்பிரிவின் சிறப்பம்சங்கள் மற்றும் இட வரைபடம்"
                  className="w-full h-full object-contain"
                  style={{ maxHeight: "min(55vh, 460px)" }}
                />
              </motion.div>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.45 }}
              className="flex gap-3 justify-center px-4 py-3"
              style={{ background: "#0F2235" }}
            >
              <a
                href="tel:9629688133"
                className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "#F9F4F1", color: "#0F2235" }}
              >
                📞 Call Now
              </a>
              <a
                href="https://wa.me/919629688133"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "#F9F4F1", color: "#0F2235" }}
              >
                💬 WhatsApp
              </a>
            </motion.div>

            

            {/* Close text bar */}
            <div
              onClick={close}
              className="py-2 text-center text-xs cursor-pointer select-none"
              style={{ background: "#fff", color: "#999" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
            >
              Close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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

/* ─── stat item ─── */
const statsData = [
  { value: 500, suffix: "+", label: "Happy Families"     },
  { value: 10,  suffix: "+", label: "Projects Delivered" },
  { value: 5,   suffix: "+", label: "Years of Trust"     },
  { value: 100, suffix: "%", label: "Clear Title Plots"  },
];

function StatItem({
  value, suffix, label, index, dark,
}: (typeof statsData)[0] & { index: number; dark?: boolean }) {
  const { count, ref } = useCountUp(value, 2000 + index * 150);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 text-center py-6"
    >
      <div className="flex items-end leading-none">
        <span
          className="font-display text-6xl font-bold tabular-nums md:text-7xl"
          style={{ color: dark ? "#F9F4F1" : "#0F2235" }}
        >
          {count}
        </span>
        <span
          className="font-display text-4xl font-bold md:text-5xl mb-1"
          style={{ color: "#1B3650" }}
        >
          {suffix}
        </span>
      </div>
      <span
        className="text-sm font-semibold uppercase tracking-[0.2em]"
        style={{ color: dark ? "rgba(249,244,241,0.5)" : "rgba(15,34,53,0.45)" }}
      >
        {label}
      </span>
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
      <section ref={heroRef} className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img
            src={nilahero4}
            alt="Premium residential plot layout in Kumbakonam"
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(1.15) contrast(1.05) saturate(1.08)" }}
            width={1920} height={1080}
          />
        </motion.div>

        {/* ── OVERLAYS — lightened so the photo stays bright, just enough for text legibility ── */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(15,34,53,0.42) 0%, rgba(15,34,53,0.18) 55%, rgba(15,34,53,0.02) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(15,34,53,0.32) 0%, transparent 50%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 40% 60% at 5% 70%, rgba(249,244,241,0.06) 0%, transparent 70%)" }}
        />

        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-16 pt-28"
        >
          <motion.div
            initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-10" style={{ background: "#F9F4F1" }} />
            <span
              className="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] backdrop-blur-sm"
              style={{
                border: "1px solid rgba(249,244,241,0.35)",
                background: "rgba(249,244,241,0.12)",
                color: "#F9F4F1",
              }}
            >
              DTCP · RERA Approved · Est. 2020
            </span>
          </motion.div>

          <h1 className="font-display font-bold leading-[1.02] text-white">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-[82px]"
              >
                Where Your Dream Begins with
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-[82px]"
              >
                {" "}
                <span className="italic" style={{ color: "#F9F4F1" }}>Nila Promoters.</span>
              </motion.div>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-lg text-base leading-relaxed md:text-[17px]"
            style={{ color: "rgba(249,244,241,0.85)" }}
          >
            Premium DTCP &amp; RERA-approved plots for families who demand
            clear titles, prime locations, and absolute transparency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projects"
              className="group flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0F2235 0%, #1B3650 100%)",
                boxShadow: "0 4px 24px rgba(15,34,53,0.5)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(249,244,241,0.35)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(15,34,53,0.5)")}
            >
              Explore Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold backdrop-blur transition-all hover:scale-105"
              style={{
                border: "1px solid rgba(249,244,241,0.45)",
                background: "rgba(249,244,241,0.10)",
                color: "#F9F4F1",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(249,244,241,0.20)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(249,244,241,0.10)")}
            >
              Book a Site Visit
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {["DTCP Approved", "RERA Certified", "100% Clear Title", "No Hidden Charges"].map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium backdrop-blur"
                style={{
                  border: "1px solid rgba(249,244,241,0.22)",
                  background: "rgba(249,244,241,0.08)",
                  color: "rgba(249,244,241,0.78)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#F9F4F1" }} />
                {b}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="h-6 w-6" style={{ color: "rgba(249,244,241,0.5)" }} />
          </motion.div>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(249,244,241,0.4)" }}>
            Scroll
          </span>
        </motion.div>
      </section>

      {/* 2. STATS */}
      <section
        style={{
          background: "#F9F4F1",
          borderBottom: "1px solid rgba(15,34,53,0.12)",
          backgroundImage: "radial-gradient(circle, rgba(15,34,53,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        className="py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#1B3650" }}>
              Our Track Record
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl" style={{ color: "#0F2235" }}>
              Numbers That Speak Trust
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {statsData.map((s, i) => (
              <div key={s.label} className="relative">
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px hidden md:block"
                    style={{ background: "rgba(15,34,53,0.15)" }}
                  />
                )}
                <StatItem {...s} index={i} dark={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE */}
      <section style={{ background: "#0F2235" }} className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#F9F4F1" }}>
              Our Promise
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
              Why Families Trust{" "}
              <span style={{ color: "#F9F4F1" }}>Nila Promoters</span>
            </h2>
          </Reveal>
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl p-7 transition-all"
                  style={{
                    border: isDark ? "1px solid rgba(27,54,80,0.55)" : "1px solid rgba(249,244,241,0.18)",
                    background: isDark ? "rgba(27,54,80,0.45)" : "rgba(249,244,241,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border = isDark
                      ? "1px solid rgba(27,54,80,0.9)"
                      : "1px solid rgba(249,244,241,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = isDark
                      ? "1px solid rgba(27,54,80,0.55)"
                      : "1px solid rgba(249,244,241,0.18)";
                  }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{
                      background: isDark ? "rgba(249,244,241,0.14)" : "rgba(249,244,241,0.12)",
                      color: "#F9F4F1",
                    }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3
                    className="mt-5 font-display text-xl font-bold"
                    style={{ color: "#ffffff" }}
                  >
                    {t}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: isDark ? "rgba(249,244,241,0.58)" : "rgba(249,244,241,0.45)" }}
                  >
                    {d}
                  </p>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section style={{ background: "#F9F4F1" }} className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#1B3650" }}>
              Portfolio
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl" style={{ color: "#0F2235" }}>
              Our Signature Projects
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-16" style={{ background: "#1B3650" }} />
          </Reveal>
          <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard p={{ ...COMPLETED[0], logo: mahalakshmilogo }} />
            <ProjectCard p={{ ...ONGOING[0],   logo: anugraghalogo }} />
            <ProjectCard p={{ ...UPCOMING[0],  logo: megalogo }} />
          </Stagger>
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:scale-105"
              style={{ border: "2px solid #1B3650", color: "#0F2235" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1B3650";
                (e.currentTarget as HTMLElement).style.color = "#F9F4F1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#0F2235";
              }}
            >
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="relative overflow-hidden py-28" style={{ background: "#1B3650" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl" style={{ background: "rgba(249,244,241,0.10)" }} />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl" style={{ background: "rgba(15,34,53,0.5)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-3xl" style={{ background: "rgba(249,244,241,0.05)" }} />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(249,244,241,0.18) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="mb-16 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: "#F9F4F1" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#F9F4F1" }}>
                Voices of Trust
              </span>
              <span className="h-px w-8" style={{ background: "#F9F4F1" }} />
            </div>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              What Our{" "}
              <span className="italic" style={{ color: "#F9F4F1" }}>Families</span>{" "}
              Say
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: "rgba(249,244,241,0.55)" }}>
              Over 500 families have trusted us with their most important investment.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
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
                className="group relative rounded-2xl p-8 flex flex-col"
                style={{
                  background: "linear-gradient(135deg, rgba(15,34,53,0.7) 0%, rgba(15,34,53,0.92) 100%)",
                  border: "1px solid rgba(249,244,241,0.14)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(249,244,241,0.35)";
                  (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(15,34,53,0.85) 0%, rgba(15,34,53,0.97) 100%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(249,244,241,0.14)";
                  (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(15,34,53,0.7) 0%, rgba(15,34,53,0.92) 100%)";
                }}
              >
                <div
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(249,244,241,0.35), transparent)" }}
                />
                <div
                  className="absolute top-6 right-7 font-display text-7xl font-bold leading-none select-none"
                  style={{ color: "rgba(249,244,241,0.08)" }}
                >
                  "
                </div>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" style={{ fill: "#F9F4F1", color: "#F9F4F1" }} />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "rgba(249,244,241,0.82)" }}>
                  "{t.q}"
                </p>
                <div className="my-6 h-px" style={{ background: "rgba(249,244,241,0.12)" }} />
                <div className="flex items-center gap-4">
                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-bold shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #0F2235, #1B3650)",
                      color: "#F9F4F1",
                      boxShadow: "0 0 0 2px rgba(249,244,241,0.3)",
                    }}
                  >
                    {t.n[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.n}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-3 w-3" style={{ color: "rgba(249,244,241,0.6)" }} />
                      <span className="text-xs" style={{ color: "rgba(249,244,241,0.5)" }}>{t.l}</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(249,244,241,0.12)", color: "#F9F4F1", border: "1px solid rgba(249,244,241,0.25)" }}
                    >
                      Verified
                    </div>
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
            className="mt-14 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { value: "500+", label: "Happy Families" },
              { value: "5★",   label: "Average Rating"  },
              { value: "100%", label: "Verified Reviews" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="text-2xl font-bold font-display" style={{ color: "#F9F4F1" }}>{s.value}</div>
                <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(249,244,241,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#F9F4F1", borderTop: "1px solid rgba(15,34,53,0.1)" }}
      >
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(27,54,80,0.12)" }}
        />
        <div
          className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(15,34,53,0.12)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#1B3650" }}>
              Take the Next Step
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl" style={{ color: "#0F2235" }}>
              Ready to Own Your Dream Plot in{" "}
              <span className="italic" style={{ color: "#1B3650" }}>Kumbakonam?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl md:text-lg" style={{ color: "rgba(15,34,53,0.62)" }}>
              Schedule a complimentary site visit. Walk the land, ask every question,
              and decide with complete confidence.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold shadow-lg transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #0F2235 0%, #1B3650 100%)",
                  color: "#F9F4F1",
                  boxShadow: "0 8px 32px rgba(15,34,53,0.30)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(15,34,53,0.50)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(15,34,53,0.30)")}
              >
                Book a Site Visit Today <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all hover:scale-105"
                style={{ border: "2px solid #1B3650", color: "#0F2235" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#1B3650";
                  (e.currentTarget as HTMLElement).style.color = "#F9F4F1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#0F2235";
                }}
              >
                View All Projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}