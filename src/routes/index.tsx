import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck, FileCheck2, MapPin, Wallet, Award, Eye,
  ChevronDown, Search, Star,
} from "lucide-react";
import heroImg from "@/assets/hero-aerial-land.jpg";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { StatsStrip } from "@/components/site/StatsStrip";
import { ProjectCard } from "@/components/site/ProjectCard";
import { COMPLETED, ONGOING, UPCOMING } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nila Promoters — Premium DTCP & RERA Plots in Kumbakonam" },
      { name: "description", content: "Your Land. Your Legacy. Your Kumbakonam. DTCP & RERA approved premium plot developer since 2020." },
      { property: "og:title", content: "Nila Promoters — Premium Plots in Kumbakonam" },
      { property: "og:description", content: "DTCP & RERA approved premium plot developer since 2020." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const headline = ["Your", "Land.", "Your", "Legacy.", "Your", "Kumbakonam."];

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img
            src={heroImg}
            alt="Aerial drone view of premium green land plots in Kumbakonam"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/40" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-block w-fit rounded-full border border-gold/40 bg-navy/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-gold backdrop-blur"
          >
            DTCP · RERA Approved · Est. 2020
          </motion.span>

          <h1 className="font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl lg:text-[88px]">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`mr-3 inline-block ${word === "Kumbakonam." ? "text-gold italic" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-6 max-w-2xl text-lg text-white/85 md:text-xl"
          >
            DTCP & RERA Approved Premium Plot Developer Since 2020
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/projects"
              className="group rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(201,168,76,0.55)]"
            >
              Explore Our Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/70 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:scale-105 hover:bg-white hover:text-navy"
            >
              Talk to Us
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-32 left-1/2 z-10 -translate-x-1/2 text-white/70"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>

        {/* Floating Search */}
        <div className="absolute bottom-0 left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 translate-y-1/2 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="glass rounded-2xl p-5 shadow-glass md:p-6"
          >
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
              <SelectField label="Location" options={["Kumbakonam", "Senchina", "Analagragharam"]} />
              <SelectField label="Project Status" options={["Completed", "Ongoing", "Upcoming"]} />
              <SelectField label="Plot Size" options={["600 – 1200 sqft", "1200 – 2400 sqft", "2400+ sqft"]} />
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-navy shadow transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(201,168,76,0.5)]">
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spacer for floating search */}
      <div className="h-24 md:h-20 bg-surface" />

      {/* STATS */}
      <StatsStrip
        stats={[
          { value: 5, label: "Years of Trust" },
          { value: 500, label: "Happy Families" },
          { value: 10, label: "Projects" },
          { value: 100, suffix: "%", label: "Clear Title" },
        ]}
      />

      {/* WHY CHOOSE */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Promise
            </span>
            <h2 className="gold-underline-center mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
              Why Families Trust Nila Promoters
            </h2>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: ShieldCheck, t: "DTCP & RERA Approved", d: "Every layout cleared by Tamil Nadu's town planning and real-estate regulators." },
              { Icon: FileCheck2, t: "100% Clear Title", d: "Legally verified, encumbrance-free documents on every single plot we sell." },
              { Icon: MapPin, t: "Prime Locations", d: "Hand-picked micro-markets across Kumbakonam with the strongest growth fundamentals." },
              { Icon: Wallet, t: "Flexible Payment Plans", d: "Tailored installment structures that fit family budgets — no hidden charges." },
              { Icon: Award, t: "Trusted Since 2020", d: "Five years of consistent delivery and 500+ families who chose us as their partner." },
              { Icon: Eye, t: "Transparent Dealings", d: "What we promise on paper is exactly what we deliver on the ground." },
            ].map(({ Icon, t, d }) => (
              <motion.div
                key={t}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-card p-7 shadow-card ring-1 ring-border/60 transition-shadow hover:shadow-[0_25px_50px_-15px_rgba(13,27,42,0.2),0_0_0_1px_rgba(201,168,76,0.4)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-navy">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Portfolio</span>
            <h2 className="gold-underline-center mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
              Our Signature Projects
            </h2>
          </Reveal>
          <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard p={COMPLETED[0]} />
            <ProjectCard p={ONGOING[0]} />
            <ProjectCard p={UPCOMING[0]} />
          </Stagger>
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex rounded-full border-2 border-navy px-7 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Voices of Trust</span>
            <h2 className="gold-underline-center mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
              What Our Families Say
            </h2>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-3">
            {[
              { n: "Ramesh Kumar", l: "Kumbakonam", q: "From documentation to registration, Nila Promoters made the entire process effortless. My plot in Mahalakshmi Nagar was the best decision for my family." },
              { n: "Lakshmi Priya", l: "Senchina", q: "True to their word on every commitment. The Sanjana Nagar layout is exactly as promised — clear titles, wide roads, peaceful location." },
              { n: "Suresh Babu", l: "Thanjavur", q: "I evaluated five developers before choosing Nila. Their transparency and DTCP approvals stood out. Couldn't be happier." },
            ].map((t) => (
              <motion.div
                key={t.n}
                variants={itemVariants}
                className="rounded-2xl bg-card p-7 shadow-card ring-1 ring-border/60"
              >
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-gold">
                    {t.n[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.l}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-navy py-20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(201,168,76,0.35), transparent 40%), radial-gradient(circle at 80% 30%, rgba(30,111,217,0.3), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
              Ready to Own Your Dream Plot in <span className="text-gold italic">Kumbakonam?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Schedule a complimentary site visit. Walk the land, ask every question, and decide with confidence.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(201,168,76,0.6)]"
            >
              Book a Site Visit Today
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-navy/60">
        {label}
      </label>
      <select className="rounded-xl border border-border bg-white/80 px-3 py-2.5 text-sm font-medium text-navy outline-none focus:ring-2 focus:ring-gold">
        <option>Select {label}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
