import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ShieldCheck, FileCheck2, MapPin, Wallet, Award, Eye,
  ChevronDown, Star, ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/hero-bg.jpg";
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
          style={{ color: dark ? "#F0F8FF" : "#001D39" }}
        >
          {count}
        </span>
        <span
          className="font-display text-4xl font-bold md:text-5xl mb-1"
          style={{ color: "#4E8EA2" }}
        >
          {suffix}
        </span>
      </div>
      <span
        className="text-sm font-semibold uppercase tracking-[0.2em]"
        style={{ color: dark ? "rgba(190,220,235,0.5)" : "rgba(0,29,57,0.45)" }}
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
      {/* ══════════════════════════════
          1. HERO — neutral dark overlay, image shows naturally
      ══════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img
            src={heroImg}
            alt="Premium residential plot layout in Kumbakonam"
            className="h-full w-full object-cover object-center"
            width={1920} height={1080}
          />
        </motion.div>

        {/* ── Neutral black overlays — no colour cast on the image ── */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.15) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
        />
        {/* subtle teal glow — only on the left text side, very faint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 40% 60% at 5% 70%, rgba(78,142,162,0.10) 0%, transparent 70%)" }}
        />

        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-16 pt-28"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-10" style={{ background: "#4E8EA2" }} />
            <span
              className="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] backdrop-blur-sm"
              style={{
                border: "1px solid rgba(78,142,162,0.5)",
                background: "rgba(78,142,162,0.14)",
                color: "#BDD8E9",
              }}
            >
              DTCP · RERA Approved · Est. 2020
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-[1.02] text-white">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-[82px]"
              >
                Own Land That Lasts
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-[82px]"
              >
                Generations in{" "}
                <span className="italic" style={{ color: "#7BBDE8" }}>Kumbakonam.</span>
              </motion.div>
            </div>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-lg text-base leading-relaxed md:text-[17px]"
            style={{ color: "rgba(220,235,242,0.75)" }}
          >
            Premium DTCP &amp; RERA-approved plots for families who demand
            clear titles, prime locations, and absolute transparency.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projects"
              className="group flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0A4174 0%, #4E8EA2 100%)",
                boxShadow: "0 4px 24px rgba(78,142,162,0.45)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(123,189,232,0.55)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(78,142,162,0.45)")}
            >
              Explore Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold backdrop-blur transition-all hover:scale-105"
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
            >
              Book a Site Visit
            </Link>
          </motion.div>

          {/* Trust badges */}
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
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(220,235,242,0.7)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4E8EA2" }} />
                {b}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="h-6 w-6" style={{ color: "rgba(255,255,255,0.4)" }} />
          </motion.div>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ══════════════════════════════
          2. STATS — crisp white
      ══════════════════════════════ */}
      <section
  style={{
    background: "#F2F7FA",
    borderBottom: "1px solid rgba(0,29,57,0.08)",
    backgroundImage: "radial-gradient(circle, rgba(0,29,57,0.12) 1px, transparent 1px)",
    backgroundSize: "24px 24px",
  }}
  className="py-20"
>
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#4E8EA2" }}>
              Our Track Record
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl" style={{ color: "#001D39" }}>
              Numbers That Speak Trust
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {statsData.map((s, i) => (
              <div key={s.label} className="relative">
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px hidden md:block"
                    style={{ background: "rgba(0,29,57,0.1)" }}
                  />
                )}
                <StatItem {...s} index={i} dark={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          3. WHY CHOOSE — #001D39 deep navy
      ══════════════════════════════ */}
      <section style={{ background: "#001D39" }} className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#6EA2B3" }}>
              Our Promise
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
              Why Families Trust{" "}
              <span style={{ color: "#7BBDE8" }}>Nila Promoters</span>
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
    border: isDark ? "1px solid rgba(110,162,179,0.15)" : "1px solid rgba(0,29,57,0.1)",
    background: isDark ? "rgba(10,65,116,0.5)" : "#ffffff",
  }}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLElement).style.border = isDark
      ? "1px solid rgba(123,189,232,0.4)"
      : "1px solid rgba(0,29,57,0.25)";
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLElement).style.border = isDark
      ? "1px solid rgba(110,162,179,0.15)"
      : "1px solid rgba(0,29,57,0.1)";
  }}
>
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl"
        style={{
          background: isDark ? "rgba(78,142,162,0.2)" : "rgba(0,29,57,0.06)",
          color: isDark ? "#7BBDE8" : "#0A4174",
        }}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3
        className="mt-5 font-display text-xl font-bold"
        style={{ color: isDark ? "#ffffff" : "#001D39" }}
      >
        {t}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: isDark ? "rgba(189,216,233,0.6)" : "rgba(0,29,57,0.55)" }}
      >
        {d}
      </p>
    </motion.div>
  );
})}
          </Stagger>
        </div>
      </section>

      {/* ══════════════════════════════
    4. FEATURED PROJECTS — very light blue-grey
══════════════════════════════ */}
<section style={{ background: "#F2F7FA" }} className="py-24">
  <div className="mx-auto max-w-7xl px-6">
    <Reveal className="mb-14 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#49769F" }}>
        Portfolio
      </span>
      <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl" style={{ color: "#001D39" }}>
        Our Signature Projects
      </h2>
      <div className="mx-auto mt-3 h-0.5 w-16" style={{ background: "#4E8EA2" }} />
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
        style={{ border: "2px solid #0A4174", color: "#0A4174" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#0A4174";
          (e.currentTarget as HTMLElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#0A4174";
        }}
      >
        View All Projects <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
</section>

      {/* ══════════════════════════════
    5. TESTIMONIALS
══════════════════════════════ */}
<section className="relative overflow-hidden py-28" style={{ background: "#001D39" }}>
  {/* Background decorations */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl" style={{ background: "rgba(78,142,162,0.12)" }} />
    <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl" style={{ background: "rgba(10,65,116,0.4)" }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-3xl" style={{ background: "rgba(78,142,162,0.05)" }} />
    {/* Subtle grid */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(123,189,232,0.15) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl px-6">
    {/* Header */}
    <Reveal className="mb-16 text-center">
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="h-px w-8" style={{ background: "#4E8EA2" }} />
        <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#7BBDE8" }}>
          Voices of Trust
        </span>
        <span className="h-px w-8" style={{ background: "#4E8EA2" }} />
      </div>
      <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
        What Our{" "}
        <span className="italic" style={{ color: "#7BBDE8" }}>Families</span>{" "}
        Say
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: "rgba(189,216,233,0.5)" }}>
        Over 500 families have trusted us with their most important investment.
      </p>
    </Reveal>

    {/* Cards */}
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
            background: "linear-gradient(135deg, rgba(10,65,116,0.6) 0%, rgba(0,29,57,0.8) 100%)",
            border: "1px solid rgba(123,189,232,0.12)",
            backdropFilter: "blur(12px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.border = "1px solid rgba(123,189,232,0.35)";
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(10,65,116,0.8) 0%, rgba(0,29,57,0.9) 100%)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.border = "1px solid rgba(123,189,232,0.12)";
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(10,65,116,0.6) 0%, rgba(0,29,57,0.8) 100%)";
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-8 right-8 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(123,189,232,0.4), transparent)" }}
          />

          {/* Quote mark */}
          <div
            className="absolute top-6 right-7 font-display text-7xl font-bold leading-none select-none"
            style={{ color: "rgba(123,189,232,0.08)" }}
          >
            "
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4" style={{ fill: "#F59E0B", color: "#F59E0B" }} />
            ))}
          </div>

          {/* Quote */}
          <p className="flex-1 text-sm leading-relaxed" style={{ color: "rgba(210,230,242,0.8)" }}>
            "{t.q}"
          </p>

          {/* Divider */}
          <div className="my-6 h-px" style={{ background: "rgba(123,189,232,0.1)" }} />

          {/* Author */}
          <div className="flex items-center gap-4">
            <div
              className="relative flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-bold shrink-0"
              style={{
                background: "linear-gradient(135deg, #0A4174, #4E8EA2)",
                color: "#ffffff",
                boxShadow: "0 0 0 2px rgba(123,189,232,0.3)",
              }}
            >
              {t.n[0]}
            </div>
            <div>
              <div className="font-semibold text-white text-sm">{t.n}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="h-3 w-3" style={{ color: "#4E8EA2" }} />
                <span className="text-xs" style={{ color: "rgba(189,216,233,0.5)" }}>{t.l}</span>
              </div>
            </div>
            <div className="ml-auto">
              <div
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(78,142,162,0.15)", color: "#7BBDE8", border: "1px solid rgba(78,142,162,0.2)" }}
              >
                Verified
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Bottom trust bar */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-14 flex flex-wrap items-center justify-center gap-8"
    >
      {[
        { value: "500+", label: "Happy Families" },
        { value: "5★", label: "Average Rating" },
        { value: "100%", label: "Verified Reviews" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="text-2xl font-bold font-display" style={{ color: "#7BBDE8" }}>{s.value}</div>
          <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(189,216,233,0.4)" }}>{s.label}</div>
        </div>
      ))}
    </motion.div>
  </div>
</section>

      {/* ══════════════════════════════
          6. CTA BANNER — white
      ══════════════════════════════ */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,29,57,0.08)" }}
      >
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(78,142,162,0.1)" }}
        />
        <div
          className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(10,65,116,0.1)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#49769F" }}>
              Take the Next Step
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl" style={{ color: "#001D39" }}>
              Ready to Own Your Dream Plot in{" "}
              <span className="italic" style={{ color: "#0A4174" }}>Kumbakonam?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl md:text-lg" style={{ color: "rgba(0,29,57,0.58)" }}>
              Schedule a complimentary site visit. Walk the land, ask every question,
              and decide with complete confidence.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #001D39 0%, #0A4174 100%)",
                  boxShadow: "0 8px 32px rgba(0,29,57,0.28)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,29,57,0.45)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,29,57,0.28)")}
              >
                Book a Site Visit Today <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all hover:scale-105"
                style={{ border: "2px solid #4E8EA2", color: "#001D39" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#4E8EA2";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#001D39";
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