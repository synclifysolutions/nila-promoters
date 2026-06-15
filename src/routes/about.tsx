import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import nilaMd from '@/assets/nila-md.png';
import {
  Award,
  Sparkles, Heart, Scale, Users, Leaf, ArrowRight,
} from "lucide-react";
import nilaLogo from "@/assets/nila-logo.png";
import { StatsStrip } from "@/components/site/StatsStrip";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nila Promoters — DTCP & RERA Plot Developer Kumbakonam" },
      { name: "description", content: "Founded in 2020, Nila Promoters is Kumbakonam's trusted DTCP & RERA approved premium plot developer. Meet our story, our MD, and our mission." },
      { property: "og:title", content: "About Nila Promoters" },
      { property: "og:description", content: "Trusted DTCP & RERA approved plot developer in Kumbakonam since 2020." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const milestones = [
  { y: "2020", t: "Nila Promoters Founded", d: "First plotted layout launched in Kumbakonam." },
  { y: "2021", t: "Mahalakshmi Nagar & SPM Garden", d: "100+ families served across two landmark projects." },
  { y: "2022", t: "Sanjana Nagar Launched", d: "Expanded to new micro-markets with Senchina." },
  { y: "2023", t: "Salith Nagar Delivered", d: "300+ happy families milestone crossed." },
  { y: "2024", t: "Anugragah Avenue Launched", d: "Our flagship ongoing flagship project." },
  { y: "2025", t: "London City & Shanthi Nagar", d: "Scaling new heights across Kumbakonam." },
];

const values = [
  { Icon: Sparkles, t: "Transparency", d: "Every transaction is open, honest, and documented." },
  { Icon: Heart, t: "Integrity", d: "We do what we say, always." },
  { Icon: Award, t: "Quality", d: "Premium plots with zero compromise on standards." },
  { Icon: Users, t: "Customer First", d: "Your trust is the foundation we build on." },
  { Icon: Scale, t: "Legal Compliance", d: "100% DTCP & RERA approved, every time." },
  { Icon: Leaf, t: "Community Growth", d: "Building neighbourhoods, not just plots." },
];

/* ─── Animated counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Word-by-word reveal ─── */
function SplitReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Fade-up reveal ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax section ─── */
function ParallaxBg() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-20%]">
        <div
          className="h-full w-full opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.2) 0%, transparent 50%)",
          }}
        />
      </motion.div>
    </div>
  );
}

function AboutPage() {
  return (
    <>
      <PageBanner />

      {/* ── INTRO: Logo left, text right ── */}
      <section className="relative overflow-hidden bg-white py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-gold/4 blur-[120px]" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          {/* Logo card */}
          <FadeUp delay={0}>
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-gold via-gold/40 to-gold/10 blur-sm opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
              <div className="relative flex items-center justify-center rounded-3xl bg-navy p-16 shadow-2xl min-h-[420px]">
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.15)_0%,transparent_70%)]" />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(201,168,76,0.3) 0 1px, transparent 1px 24px)",
                    }}
                  />
                </div>
                <motion.img
                  src={nilaLogo}
                  alt="Nila Promoters Logo"
                  className="relative z-10 max-h-64 w-auto object-contain"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ filter: "drop-shadow(0 0 32px rgba(201,168,76,0.5))" }}
                />
                <div className="absolute top-5 left-5 h-8 w-8 border-t-2 border-l-2 border-gold/50 rounded-tl-lg" />
                <div className="absolute top-5 right-5 h-8 w-8 border-t-2 border-r-2 border-gold/50 rounded-tr-lg" />
                <div className="absolute bottom-5 left-5 h-8 w-8 border-b-2 border-l-2 border-gold/50 rounded-bl-lg" />
                <div className="absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-gold/50 rounded-br-lg" />
              </div>
            </div>
          </FadeUp>

          {/* Text */}
          <div>
            <FadeUp delay={0.1}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-gold">
                <span className="h-px w-8 bg-gold" /> Our Story
              </span>
            </FadeUp>
            <h2 className="mt-5 font-display text-5xl font-bold text-navy leading-tight md:text-6xl">
              <SplitReveal text="A Promise Rooted in Kumbakonam" delay={0.15} />
            </h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gold to-gold/30 rounded-full" />
            <FadeUp delay={0.4}>
              <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
                Nila Promoters was founded in 2020 with a single, powerful commitment — to make land
                ownership in Kumbakonam transparent, accessible, and truly valuable. As a DTCP and
                RERA approved developer, we specialize exclusively in premium residential plot sales
                across the most prime locations in and around Kumbakonam.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Every plot we sell carries a clear legal title, government approvals, and the promise
                of long-term investment growth — backed by five years of unwavering trust.
              </p>
            </FadeUp>
            <FadeUp delay={0.55}>
              <div className="mt-10 flex flex-wrap gap-3">
                {["DTCP Approved", "RERA Registered", "Clear Title", "Est. 2020"].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-gold/50 bg-gold/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsStrip
        stats={[
          { value: 5, label: "Years in Business" },
          { value: 500, label: "Families Served" },
          { value: 10, label: "Projects Delivered" },
          { value: 100, suffix: "%", label: "DTCP/RERA Approved" },
        ]}
      />

      {/* ── MD PROFILE ── */}
      <section className="relative overflow-hidden bg-navy py-28">
        <ParallaxBg />
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-20">
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-10 bg-gold" /> Leadership <span className="h-px w-10 bg-gold" />
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
              The Vision Behind Nila Promoters
            </h2>
          </FadeUp>

          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            <FadeUp className="flex-1 flex flex-col justify-center">
              <div className="w-12 h-0.5 bg-gold mb-8" />
              <h3 className="font-display text-5xl font-bold text-white leading-tight">
                R. Mahesh
              </h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold/70">
                Managing Director, Nila Promoters
              </p>
              <div className="flex items-center gap-4 mt-8 mb-8">
                <div className="h-px w-16 bg-gold/40" />
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
              <blockquote className="font-display text-xl md:text-2xl italic leading-relaxed text-white/80 max-w-lg">
                "At Nila Promoters, we don't just sell land — we build futures,
                one plot at a time. Every family that trusts us is our greatest achievement."
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-8 bg-gold/30" />
                <span className="text-xs uppercase tracking-[0.2em] text-gold/50 font-semibold">
                  Est. Nila Promoters
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className="flex-shrink-0 md:w-80 lg:w-96">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gold/5 blur-2xl" />
                <div className="absolute -top-3 -right-3 h-16 w-16 border-t-2 border-r-2 border-gold/50 rounded-tr-2xl z-10" />
                <div className="absolute -bottom-3 -left-3 h-16 w-16 border-b-2 border-l-2 border-gold/50 rounded-bl-2xl z-10" />
                <img
                  src={nilaMd}
                  alt="R. Mahesh – Managing Director, Nila Promoters"
                  className="relative z-10 w-full rounded-2xl object-cover object-top shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                  style={{ maxHeight: '480px' }}
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="relative overflow-hidden bg-white py-28">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-gold/3 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp className="mb-20 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-8 bg-gold" /> Our Journey <span className="h-px w-8 bg-gold" />
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-navy md:text-5xl">
              Five Years. One Promise.
            </h2>
          </FadeUp>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/30 to-transparent md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-14">
              {milestones.map((m, i) => {
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={m.y}
                    initial={{ opacity: 0, x: left ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex flex-col gap-4 pl-14 md:pl-0 ${left ? "md:pr-[53%]" : "md:pl-[53%]"}`}
                  >
                    <div className="absolute left-[10px] top-5 h-5 w-5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(201,168,76,0.2),0_0_20px_rgba(201,168,76,0.4)] md:left-1/2" />
                    <div className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-[#f0f4f8] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)] hover:border-gold/40">
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-gold/80 to-gold/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <div className="font-display text-4xl font-black text-gold/50 leading-none mb-1">{m.y}</div>
                      <h4 className="font-display text-xl font-bold text-navy">{m.t}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy/60">{m.d}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION / MISSION ── */}
      <section className="relative overflow-hidden bg-navy py-28">
        <ParallaxBg />
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeUp className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-8 bg-gold" /> What Drives Us <span className="h-px w-8 bg-gold" />
            </span>
          </FadeUp>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                t: "Our Vision",
                d: "To be Kumbakonam's most trusted land developer — where every plot is a promise of prosperity, legal clarity, and lifelong value.",
                icon: "◈",
              },
              {
                t: "Our Mission",
                d: "To deliver DTCP & RERA approved plots at prime locations across Kumbakonam with complete transparency, fair pricing, and unwavering customer support.",
                icon: "◉",
              },
            ].map((v, i) => (
              <FadeUp key={v.t} delay={i * 0.15}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-gold/15 bg-white/4 p-10 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-white/7">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <span className="text-4xl text-gold/30 font-display">{v.icon}</span>
                  <h3 className="mt-4 font-display text-3xl font-bold text-gold">{v.t}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/70">{v.d}</p>
                  <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold/50 group-hover:text-gold transition-colors duration-300">
                    Nila Promoters <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="relative overflow-hidden py-28" style={{ background: "#F5F0E8" }}>
        <div className="mx-auto max-w-7xl px-6">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <FadeUp>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: "#8B6914" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.38em]" style={{ color: "#8B6914" }}>
                  What Guides Us
                </span>
              </div>
              <h2 className="font-display text-5xl font-bold leading-[1.05] md:text-6xl" style={{ color: "#001D39" }}>
                Our Core{" "}
                <span className="italic" style={{ color: "#8B6914" }}>Values</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-sm leading-relaxed md:text-right md:max-w-[260px]" style={{ color: "rgba(0,29,57,0.42)" }}>
                Principles that have earned the trust of 500+ families across Kumbakonam.
              </p>
            </FadeUp>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ Icon, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden bg-white p-9 border transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,29,57,0.08)]"
                style={{ borderColor: "rgba(0,29,57,0.09)", borderRadius: 0 }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,29,57,0.18)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,29,57,0.09)")
                }
              >
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "#C9A84C" }}
                />
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] border transition-all duration-300 group-hover:bg-navy group-hover:border-navy"
                  style={{
                    background: "rgba(0,29,57,0.05)",
                    border: "1px solid rgba(0,29,57,0.10)",
                  }}
                >
                  <Icon
                    className="h-5 w-5 transition-colors duration-300 group-hover:text-gold"
                    style={{ color: "#001D39" }}
                  />
                </div>
                <h4 className="font-display text-[18px] font-bold mb-2.5" style={{ color: "#001D39" }}>
                  {t}
                </h4>
                <p className="text-sm leading-[1.7]" style={{ color: "rgba(0,29,57,0.48)" }}>
                  {d}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

/* ─── Page Banner ─── */
export function PageBanner({ title, crumbs }: { title?: string; crumbs?: string[] }) {
  const _title = title ?? "About Nila Promoters";
  const _crumbs = crumbs ?? ["Home", "About"];
  const words = _title.split(" ");

  return (
    <section className="relative min-h-[52vh] overflow-hidden bg-navy flex items-end pb-20 pt-36">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(201,168,76,0.04) 0 1px, transparent 1px 32px)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 60%, rgba(201,168,76,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 40%, rgba(201,168,76,0.08) 0%, transparent 45%)",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-64 w-64 rounded-full bg-gold/10 blur-3xl"
          style={{ top: "20%", right: "10%" }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-40 w-40 rounded-full bg-gold/8 blur-2xl"
          style={{ bottom: "30%", left: "15%" }}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40"
        >
          {_crumbs.map((c, i) => (
            <span key={c} className="flex items-center gap-2">
              {i === 0 ? (
                <Link to="/" className="hover:text-gold transition-colors">{c}</Link>
              ) : (
                <span className="text-gold">{c}</span>
              )}
              {i < _crumbs.length - 1 && <span className="text-white/20">›</span>}
            </span>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gold" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-gold">Nila Promoters</span>
        </motion.div>

        <h1 className="font-display text-5xl font-bold text-white leading-tight md:text-7xl" aria-label={_title}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 h-1 w-28 origin-left rounded-full bg-gradient-to-r from-gold to-gold/30"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-5 text-base text-white/50 max-w-md"
        >
          Kumbakonam's most trusted DTCP & RERA approved plot developer since 2020.
        </motion.p>
      </div>
    </section>
  );
}