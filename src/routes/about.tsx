import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import nilaMd from '@/assets/nila-md.png';
import nilaHero3 from '@/assets/nila-hero3.jpg';
import {
  Award,
  Sparkles, Heart, Scale, Users, Leaf, ArrowRight,
} from "lucide-react";
import nilaLogo from "@/assets/nila-logo.png";
import nilahero1 from "@/assets/nila-hero1.jpg";

import { useLanguage } from "./__root";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nila Promoters — DTCP & RERA Plot Developer Kumbakonam" },
      { name: "description", content: "Founded in 2020, Nila Promoters is Kumbakonam's trusted DTCP & RERA approved premium plot developer." },
      { property: "og:title", content: "About Nila Promoters" },
      { property: "og:description", content: "Trusted DTCP & RERA approved plot developer in Kumbakonam since 2020." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const GOLD = "#E8C77E";

function SplitReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(8px)" }}
          transition={{ duration: 0.6, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(10px)" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxBg() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-20%]">
        <div className="h-full w-full opacity-20" style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(249,244,241,0.35) 0%, transparent 60%)" }} />
      </motion.div>
    </div>
  );
}

function AboutPage() {
  const { t } = useLanguage();

  const milestones = [
    { y: "2020", t: t("about.m1.t"), d: t("about.m1.d") },
    { y: "2021", t: t("about.m2.t"), d: t("about.m2.d") },
    { y: "2022", t: t("about.m3.t"), d: t("about.m3.d") },
    { y: "2023", t: t("about.m4.t"), d: t("about.m4.d") },
    { y: "2024", t: t("about.m5.t"), d: t("about.m5.d") },
    { y: "2025", t: t("about.m6.t"), d: t("about.m6.d") },
    { y: "2026", t: t("about.m7.t"), d: t("about.m7.d") },
  ];

  const values = [
    { Icon: Sparkles, t: t("about.v1.t"), d: t("about.v1.d") },
    { Icon: Heart,    t: t("about.v2.t"), d: t("about.v2.d") },
    { Icon: Award,    t: t("about.v3.t"), d: t("about.v3.d") },
    { Icon: Users,    t: t("about.v4.t"), d: t("about.v4.d") },
    { Icon: Scale,    t: t("about.v5.t"), d: t("about.v5.d") },
    { Icon: Leaf,     t: t("about.v6.t"), d: t("about.v6.d") },
  ];

  return (
    <>
      <PageBanner title={t("about.bannerTitle")} description={t("about.bannerDesc")} crumbs={[t("nav.home"), t("nav.about")]} />

      {/* ── OUR STORY ── */}
      <section className="relative overflow-hidden py-0" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0">
          <img src={nilaHero3} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(15,34,53,0.88) 0%, rgba(15,34,53,0.70) 50%, rgba(15,34,53,0.25) 80%, rgba(15,34,53,0.08) 100%)" }} />
        </div>

        <motion.div
          className="absolute top-6 right-5 z-20 sm:top-8 sm:right-8 md:top-10 md:right-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={nilaLogo}
            alt="Nila Promoters Logo"
            className="w-24 sm:w-36 md:w-52 h-auto object-contain"
            style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.55)) brightness(1.08)" }}
          />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="max-w-xl">
            <FadeUp delay={0.05}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
                <span className="h-px w-8" style={{ background: GOLD }} /> {t("about.storySub")}
              </span>
            </FadeUp>

            <h2 className="mt-4 sm:mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              <SplitReveal text={t("about.storyTitle")} delay={0.15} />
            </h2>

            <div className="mt-3 sm:mt-4 h-1 w-16 sm:w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />

            <FadeUp delay={0.4}>
              <p className="mt-5 sm:mt-6 text-sm sm:text-base leading-relaxed text-white/75">
  <span style={{ color: GOLD, fontWeight: 700 }}>Nila Promoters</span> {t("about.storyP1")}
</p>
              <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-white/60">
                {t("about.storyP2")}
              </p>
            </FadeUp>

            <FadeUp delay={0.55}>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                {[t("trust.dtcp"), t("trust.rera"), t("trust.title"), t("about.est")].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest"
                    style={{ background: "rgba(232,199,126,0.12)", border: `1px solid ${GOLD}55`, color: GOLD }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── MD PROFILE ── */}
      <section className="relative overflow-hidden bg-[#0F2235] py-14 sm:py-16 md:py-20">
        <ParallaxBg />
        <div className="absolute inset-0 opacity-[0.08]">
          <img src={nilaHero3} alt="" className="h-full w-full object-cover object-center" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,34,53,0.6) 0%, rgba(15,34,53,0.92) 60%, #0F2235 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(232,199,126,0.18) 1.5px, transparent 1.5px)`, backgroundSize: "30px 30px", maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 75%)" }} />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <FadeUp className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
              <span className="h-px w-8 sm:w-10" style={{ background: GOLD }} /> {t("about.leadSub")} <span className="h-px w-8 sm:w-10" style={{ background: GOLD }} />
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {t("about.leadTitle1")} <span style={{ color: GOLD }}>Nila Promoters</span>
            </h2>
          </FadeUp>

          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
            <FadeUp className="flex-1 flex flex-col justify-center order-2 md:order-1">
              <div className="w-12 h-0.5" style={{ background: GOLD }} />
              <h3 className="mt-4 sm:mt-5 font-display text-4xl sm:text-5xl font-bold text-white Gold-tight">
                {t("about.mdName")}
              </h3>
              <p className="mt-2 sm:mt-3 text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: `${GOLD}B3` }}>
                {t("about.mdTitle")}
              </p>
              <div className="flex items-center gap-4 mt-4 mb-4">
                <div className="h-px w-16 bg-[#F9F4F1]/40" />
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
              </div>
              <blockquote className="font-display text-lg sm:text-xl md:text-2xl italic leading-relaxed text-white/80 max-w-lg">
                "{t("about.mdQuote1")} <span style={{ color: GOLD }}>Nila Promoters</span>, {t("about.mdQuote2")}"
              </blockquote>
            </FadeUp>

            <FadeUp delay={0.2} className="w-48 sm:w-64 md:w-80 lg:w-96 flex-shrink-0 order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{ background: `${GOLD}14` }} />
                <div className="absolute -top-3 -right-3 h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-r-2 rounded-tr-2xl z-10" style={{ borderColor: `${GOLD}66` }} />
                <div className="absolute -bottom-3 -left-3 h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-l-2 rounded-bl-2xl z-10" style={{ borderColor: `${GOLD}66` }} />
                <img
                  src={nilaMd}
                  alt="R. Mahesh – Managing Director, Nila Promoters"
                  className="relative z-10 w-full rounded-2xl object-contain shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <FadeUp className="mb-14 sm:mb-20 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-[#1B3650]">
              <span className="h-px w-8 bg-[#1B3650]" /> {t("about.journeySub")} <span className="h-px w-8 bg-[#1B3650]" />
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2235]">
              {t("about.journeyTitle")}
            </h2>
          </FadeUp>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#1B3650] via-[#1B3650]/30 to-transparent md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-10 sm:space-y-14">
              ={milestones.map((m, i) => {
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={m.y}
                    initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex flex-col gap-4 pl-14 md:pl-0 ${left ? "md:pr-[53%]" : "md:pl-[53%]"}`}
                  >
                    <div className="absolute left-[10px] top-5 h-4 w-4 sm:h-5 sm:w-5 -translate-x-1/2 rounded-full bg-[#1B3650] shadow-[0_0_0_4px_rgba(27,54,80,0.2)] md:left-1/2" />
                    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#0F2235]/10 bg-[#F4EFEA] p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(27,54,80,0.15)]">
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#1B3650]/80 to-[#1B3650]/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <div className="font-display text-3xl sm:text-4xl font-black leading-none mb-1" style={{ color: GOLD }}>{m.y}</div>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-[#0F2235]">{m.t}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#0F2235]/60">{m.d}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION / MISSION ── */}
      <section className="relative overflow-hidden bg-[#0F2235] py-20 sm:py-28">
        <ParallaxBg />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(249,244,241,0.10) 1.5px, transparent 1.5px)`, backgroundSize: "28px 28px" }} />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <FadeUp className="mb-10 sm:mb-14 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
              <span className="h-px w-8" style={{ background: GOLD }} /> {t("about.driveSub")} <span className="h-px w-8" style={{ background: GOLD }} />
            </span>
          </FadeUp>

          <div className="grid gap-px overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 grid-cols-1 md:grid-cols-2" style={{ background: "rgba(255,255,255,0.06)" }}>
            {[
              { n: "01", t: t("about.visTitle"), d: t("about.visDesc") },
              { n: "02", t: t("about.misTitle"), d: t("about.misDesc") },
            ].map((v, i) => (
              <FadeUp key={v.t} delay={i * 0.15} className="h-full">
                <div className="group relative h-full bg-[#0F2235] p-6 sm:p-7 md:p-8 transition-colors duration-500 hover:bg-[#13283e]">
                  <span className="font-display text-4xl sm:text-5xl font-bold leading-none" style={{ color: "rgba(249,244,241,0.08)", WebkitTextStroke: `1px ${GOLD}40` }}>{v.n}</span>
                  <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-white">{v.t}</h3>
                  <div className="mt-3 h-px w-12 transition-all duration-500 group-hover:w-20" style={{ background: GOLD }} />
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{v.d}</p>
                  <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 transition-colors duration-300 group-hover:text-white">
                    Nila Promoters <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(15,34,53,0.04) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <FadeUp className="mb-12 sm:mb-16 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: GOLD }}>
              <span className="h-px w-8 sm:w-10" style={{ background: GOLD }} /> {t("about.valuesSub")} <span className="h-px w-8 sm:w-10" style={{ background: GOLD }} />
            </span>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-6xl font-bold text-[#0F2235] leading-tight">
              {t("about.valuesTitle1")} <span style={{ color: GOLD }}>{t("about.valuesTitle2")}</span>
            </h2>
            <p className="mt-4 max-w-md text-sm text-[#0F2235]/50 leading-relaxed">
              {t("about.valuesDesc")}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {values.map(({ Icon, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col gap-4 sm:gap-5 cursor-default"
                style={{ background: "#F9F4F1", border: "1px solid rgba(15,34,53,0.08)" }}
              >
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" style={{ background: GOLD }} />
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110" style={{ background: `${GOLD}20`, border: `1px solid ${GOLD}50` }}>
                  <Icon className="h-5 w-5" style={{ color: "#0F2235" }} />
                </div>
                <div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-[#0F2235]">{t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#0F2235]/55">{d}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.5} className="mt-10 sm:mt-14 flex justify-center">
            <div className="inline-flex items-center gap-4 rounded-full px-5 sm:px-6 py-3" style={{ background: "rgba(15,34,53,0.04)", border: "1px solid rgba(15,34,53,0.10)" }}>
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0F2235]/40">{t("about.footerTag")}</span>
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <motion.section
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden py-20 sm:py-28"
      >
        <div className="absolute inset-0">
          <img src={nilahero1} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,34,53,0.55) 0%, rgba(15,34,53,0.4) 45%, rgba(15,34,53,0.65) 100%)" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#E8C77E", textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>{t("cta.sub")}</span>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.75)" }}>
            {t("cta.title1")}{" "}
            <span className="italic" style={{ color: "#E8C77E" }}>{t("cta.title2")}</span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-5 max-w-xl text-sm sm:text-base md:text-lg" style={{ color: "rgba(249,244,241,0.95)", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>
            {t("cta.desc")}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold shadow-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #E8C77E 0%, #d4ad57 100%)", color: "#0F2235" }}>
              {t("cta.btnVisit")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold backdrop-blur transition-all hover:scale-105" style={{ border: "2px solid rgba(249,244,241,0.5)", color: "#F9F4F1" }}>
              {t("cta.btnView")}
            </Link>
          </div>
        </div>
      </motion.section>

      <div className="h-[5px] w-full" style={{ background: "linear-gradient(90deg, #d4ad57 0%, #E8C77E 50%, #d4ad57 100%)", boxShadow: "0 0 20px rgba(232,199,126,0.65)" }} />
    </>
  );
}

/* ─── Page Banner ─── */
export function PageBanner({ title, description, crumbs }: { title: string; description: string; crumbs: string[] }) {
  const words = title.split(" ");

  return (
    <section className="relative min-h-[46vh] sm:min-h-[52vh] overflow-hidden bg-[#0F2235] flex items-end pb-14 sm:pb-20 pt-28 sm:pt-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(249,244,241,0.10) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-5 sm:px-6 text-center">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 sm:mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white/40"
        >
          {crumbs.map((c, i) => (
            <span key={c} className="flex items-center gap-2">
              {i === 0 ? (
                <Link to="/" className="hover:text-[#F9F4F1] transition-colors">{c}</Link>
              ) : (
                <span className="text-[#F9F4F1]">{c}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-white/20">›</span>}
            </span>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <div className="h-px w-10 sm:w-12" style={{ background: GOLD }} />
          <span className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: GOLD }}>Nila Promoters</span>
        </motion.div>

        {/* Responsive heading */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight" aria-label={title}>
          {words.map((word, i) => {
            const isBrand = word === "Nila" || word === "Promoters";
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.25em]"
                style={{ color: isBrand ? GOLD : "white" }}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-5 h-1 w-20 sm:w-28 origin-center rounded-full"
          style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base text-white/50 px-4"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}