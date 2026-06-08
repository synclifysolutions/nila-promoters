import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck, FileCheck2, MapPin, Award, Building2,
  Sparkles, Heart, Scale, Users, Leaf,
} from "lucide-react";
import aboutImg from "@/assets/about-land.jpg";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
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
  { y: "2021", t: "Mahalakshmi Nagar & SPM Garden Completed", d: "100+ families served." },
  { y: "2022", t: "Sanjana Nagar (Senchina) Launched", d: "Expanded to new micro-markets." },
  { y: "2023", t: "Salith Nagar Delivered", d: "300+ happy families milestone crossed." },
  { y: "2024", t: "Anugragah Avenue Launched", d: "Flagship ongoing project." },
  { y: "2025", t: "London City & Shanthi Nagar Announced", d: "Scaling new heights." },
];

function AboutPage() {
  return (
    <>
      {/* Page banner */}
      <PageBanner title="About Nila Promoters" crumbs={["Home", "About"]} />

      {/* Intro */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our Story</span>
            <h2 className="gold-underline mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
              A Promise Rooted in Kumbakonam
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Nila Promoters was founded in 2020 with a single, powerful commitment — to make land
              ownership in Kumbakonam transparent, accessible, and truly valuable. As a DTCP and
              RERA approved developer, we specialize exclusively in premium residential plot sales
              across the most prime locations in and around Kumbakonam.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every plot we sell carries a clear legal title, government approvals, and the promise
              of long-term investment growth.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl shadow-card ring-1 ring-border/60">
              <img
                src={aboutImg}
                alt="Aerial view of premium land plots developed by Nila Promoters in Kumbakonam"
                className="h-[460px] w-full object-cover"
                width={1280}
                height={960}
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MD Profile */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="rounded-3xl bg-card p-10 text-center shadow-card ring-1 ring-border/60 md:p-14">
            <div className="mx-auto h-44 w-44 rounded-full bg-gradient-to-br from-navy to-navy-deep p-1.5 shadow-[0_0_0_4px_rgba(201,168,76,0.7)]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-navy text-center text-[10px] font-semibold uppercase tracking-widest text-gold/80">
                Upload photo of<br />R. Mahesh here
              </div>
            </div>
            <h3 className="mt-6 font-display text-4xl font-bold text-navy">R. Mahesh</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Managing Director, Nila Promoters
            </p>
            <div className="mx-auto mt-5 h-[3px] w-16 rounded bg-gold" />
            <blockquote className="mt-6 font-display text-xl italic leading-relaxed text-navy/90 md:text-2xl">
              "At Nila Promoters, we don't just sell land — we build futures, one plot at a time.
              Every family that trusts us is our greatest achievement."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <StatsStrip
        stats={[
          { value: 5, label: "Years in Business" },
          { value: 500, label: "Families Served" },
          { value: 10, label: "Projects Delivered" },
          { value: 100, suffix: "%", label: "DTCP/RERA Approved" },
        ]}
      />

      {/* Timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our Journey</span>
            <h2 className="gold-underline-center mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
              Five Years. One Promise.
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => {
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={m.y}
                    initial={{ opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex flex-col gap-4 pl-12 md:pl-0 ${
                      left ? "md:pr-[52%]" : "md:pl-[52%]"
                    }`}
                  >
                    <div className="absolute left-[10px] top-2 h-4 w-4 -translate-x-1/2 rounded-full bg-gold ring-4 ring-gold/20 md:left-1/2" />
                    <div className="rounded-2xl bg-card p-6 shadow-card ring-1 ring-border/60">
                      <span className="font-display text-3xl font-bold text-gold">{m.y}</span>
                      <h4 className="mt-1 font-display text-xl font-bold text-navy">{m.t}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{m.d}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="bg-surface py-24">
        <div className="mx-auto grid max-w-6xl gap-7 px-6 md:grid-cols-2">
          {[
            { t: "Our Vision", d: "To be Kumbakonam's most trusted land developer — where every plot is a promise of prosperity, legal clarity, and lifelong value." },
            { t: "Our Mission", d: "To deliver DTCP & RERA approved plots at prime locations across Kumbakonam with complete transparency, fair pricing, and unwavering customer support." },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 0.1}>
              <div className="relative overflow-hidden rounded-2xl bg-navy p-10 text-white shadow-card">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold via-gold-soft to-gold" />
                <h3 className="font-display text-3xl font-bold text-gold">{v.t}</h3>
                <p className="mt-4 leading-relaxed text-white/80">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-10 text-center">
            <h3 className="font-display text-2xl font-bold text-navy md:text-3xl">
              Approvals & Assurances
            </h3>
          </Reveal>
          <Stagger className="flex flex-wrap items-center justify-center gap-3">
            {[
              { Icon: ShieldCheck, t: "DTCP Approved" },
              { Icon: FileCheck2, t: "RERA Registered" },
              { Icon: Award, t: "Clear Title" },
              { Icon: MapPin, t: "Prime Location" },
              { Icon: Building2, t: "Est. 2020" },
            ].map(({ Icon, t }) => (
              <motion.span
                key={t}
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border-2 border-gold/60 bg-gold/5 px-5 py-2.5 text-sm font-semibold text-navy"
              >
                <Icon className="h-4 w-4 text-gold" /> {t}
              </motion.span>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">What Guides Us</span>
            <h2 className="gold-underline-center mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
              Core Values
            </h2>
          </Reveal>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Sparkles, t: "Transparency" },
              { Icon: Heart, t: "Integrity" },
              { Icon: Award, t: "Quality" },
              { Icon: Users, t: "Customer First" },
              { Icon: Scale, t: "Legal Compliance" },
              { Icon: Leaf, t: "Community Growth" },
            ].map(({ Icon, t }) => (
              <motion.div
                key={t}
                variants={itemVariants}
                className="flex items-center gap-4 rounded-2xl bg-card p-6 shadow-card ring-1 ring-border/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-display text-lg font-bold text-navy">{t}</span>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}

export function PageBanner({ title, crumbs }: { title: string; crumbs: string[] }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-36">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(201,168,76,0.15) 0 2px, transparent 2px 28px), radial-gradient(circle at 80% 50%, rgba(201,168,76,0.25), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <nav className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
          {crumbs.map((c, i) => (
            <span key={c} className="flex items-center gap-2">
              {i === 0 ? (
                <Link to="/" className="hover:text-gold">{c}</Link>
              ) : (
                <span className="text-gold">{c}</span>
              )}
              {i < crumbs.length - 1 && <span>›</span>}
            </span>
          ))}
        </nav>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="gold-underline font-display text-4xl font-bold text-white md:text-6xl"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
