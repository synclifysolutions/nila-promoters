import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Send,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { ALL_PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nila Promoters — Kumbakonam Plot Developer" },
      {
        name: "description",
        content:
          "Get in touch with Nila Promoters for DTCP & RERA approved plots in Kumbakonam. Two offices, WhatsApp, call, or visit us.",
      },
      { property: "og:title", content: "Contact Nila Promoters" },
      {
        property: "og:description",
        content: "Reach Nila Promoters in Kumbakonam — call, WhatsApp or visit our offices.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

/* ─── PALETTE — same system as the homepage ───
   Navy:   #0F2235   Navy Soft: #1B3650   Ivory: #F9F4F1   Gold: #E8C77E
*/

/* Replays its blur/opacity/translate animation every time it re-enters
   the viewport — matches the homepage's "every visit" scroll behaviour. */
function FadeIn({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(10px)" }
      }
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* 1. HERO — dark navy band, mirrors homepage CTA's gravity */}
      <section className="relative overflow-hidden py-28" style={{ background: "#0F2235" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(249,244,241,0.08) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(232,199,126,0.10)" }}
        />
        <div
          className="absolute -right-24 bottom-0 h-80 w-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(249,244,241,0.06)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ background: "#E8C77E" }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.32em]"
                style={{ color: "#E8C77E" }}
              >
                Let's Talk Land
              </span>
              <span className="h-px w-10" style={{ background: "#E8C77E" }} />
            </div>
            <h1 className="mt-6 mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              Every great plot starts with{" "}
              <span className="italic" style={{ color: "#E8C77E" }}>
                one conversation.
              </span>
            </h1>
            <p
              className="mt-6 mx-auto max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(249,244,241,0.65)" }}
            >
              Call, message, or walk into either of our Kumbakonam offices.
              No call centres, no scripts — just straight answers from the
              people who hold the documents.
            </p>
          </FadeIn>

          {/* quick-contact strip */}
          <FadeIn delay={0.15} className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3" >
            <div style={{ background: "rgba(249,244,241,0.06)" }}>
              <QuickLink
                icon={Phone}
                label="Call Us"
                value="96296 88133"
                href="tel:9629688133"
              />
            </div>
            <div style={{ background: "rgba(249,244,241,0.06)" }}>
              <QuickLink
                icon={MessageCircle}
                label="WhatsApp"
                value="82206 51747"
                href="https://wa.me/918220651747"
                external
              />
            </div>
            <div style={{ background: "rgba(249,244,241,0.06)" }}>
              <QuickLink
                icon={Mail}
                label="Email"
                value="contact@nilapromoters.com"
                href="mailto:contact@nilapromoters.com"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. FORM + HOURS */}
      <section style={{ background: "#F9F4F1" }} className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5">
          {/* Form */}
          <FadeIn className="lg:col-span-3" y={36}>
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{
                background: "#fff",
                border: "1px solid rgba(15,34,53,0.08)",
                boxShadow: "0 30px 60px -30px rgba(15,34,53,0.18)",
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "#C9A23E" }}
              >
                Send an Enquiry
              </span>
              <h2
                className="mt-3 font-display text-3xl font-bold md:text-4xl"
                style={{ color: "#0F2235" }}
              >
                Tell us what you're{" "}
                <span className="italic" style={{ color: "#0F2235" }}>
                  looking for
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(15,34,53,0.55)" }}>
                Share a few details and our team will respond within 24 hours
                with availability, pricing, and next steps.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-9 grid gap-5 md:grid-cols-2"
              >
                <Field label="Full Name" name="name" required />
                <Field label="Phone Number" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" className="md:col-span-2" />

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(15,34,53,0.5)" }}
                  >
                    Interested In
                  </label>
                  <select
                    className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                    style={{
                      border: "1px solid rgba(15,34,53,0.14)",
                      background: "#fff",
                      color: "#0F2235",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3650")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(15,34,53,0.14)")}
                  >
                    <option>General Enquiry</option>
                    {ALL_PROJECTS.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(15,34,53,0.5)" }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your plot requirements..."
                    className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                    style={{
                      border: "1px solid rgba(15,34,53,0.14)",
                      background: "#fff",
                      color: "#0F2235",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3650")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(15,34,53,0.14)")}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition-all hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #0F2235 0%, #1B3650 100%)",
                      color: "#F9F4F1",
                      boxShadow: "0 10px 28px rgba(15,34,53,0.35)",
                    }}
                  >
                    <Send className="h-4 w-4" /> Send Enquiry
                  </button>
                  <a
                    href="https://wa.me/918220651747"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{ background: "#1EA952", boxShadow: "0 10px 28px rgba(30,169,82,0.3)" }}
                  >
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </div>

                {sent && (
                  <p
                    className="md:col-span-2 rounded-xl px-4 py-3.5 text-sm font-medium"
                    style={{
                      background: "rgba(232,199,126,0.16)",
                      color: "#8B6914",
                      border: "1px solid rgba(232,199,126,0.35)",
                    }}
                  >
                    Thank you! Your enquiry has been received. We'll be in
                    touch shortly.
                  </p>
                )}
              </form>
            </div>
          </FadeIn>

          {/* Hours + email card, dark accent for contrast */}
          <FadeIn delay={0.1} className="lg:col-span-2" y={36}>
            <div className="flex h-full flex-col gap-5">
              <div
                className="rounded-3xl p-8"
                style={{ background: "#0F2235" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "rgba(232,199,126,0.16)" }}
                >
                  <Clock className="h-5 w-5" style={{ color: "#E8C77E" }} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  Working Hours
                </h3>
                <div className="mt-4 space-y-2.5 text-sm" style={{ color: "rgba(249,244,241,0.7)" }}>
                  <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: "rgba(249,244,241,0.1)" }}>
                    <span>Monday – Saturday</span>
                    <span className="font-semibold text-white">9 AM – 6 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold" style={{ color: "#E8C77E" }}>By Appointment</span>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-1 flex-col justify-center rounded-3xl p-8 text-center"
                style={{
                  background: "rgba(232,199,126,0.10)",
                  border: "1px solid rgba(232,199,126,0.25)",
                }}
              >
                <span
                  className="font-display text-5xl font-bold"
                  style={{ color: "#0F2235" }}
                >
                  5★
                </span>
                <span
                  className="mt-2 text-xs font-semibold uppercase tracking-[0.25em]"
                  style={{ color: "#8B6914" }}
                >
                  Trusted by 500+ families
                </span>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(15,34,53,0.55)" }}>
                  Five years of clear titles and on-the-ground transparency.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. OFFICES — signature section, treated like featured locations */}
      <section style={{ background: "#0F2235" }} className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(249,244,241,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn className="mb-14 text-center">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "#E8C77E" }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "#E8C77E" }}
              >
                Visit Us
              </span>
              <span className="h-px w-8" style={{ background: "#E8C77E" }} />
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
              Two doors, <span className="italic" style={{ color: "#E8C77E" }}>always open</span>
            </h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                num: "01",
                name: "Smart Plaza Office",
                lines: [
                  "8/2038 A, Smart Plaza,",
                  "OSJ Abdeen Nagar, Chennai Main Road,",
                  "Kumbakonam – 612002",
                ],
                mapQuery: "Smart Plaza OSJ Abdeen Nagar Kumbakonam",
              },
              {
                num: "02",
                name: "Sarangapani Road Office",
                lines: [
                  "17, 18, Sarangapani South Road,",
                  "Kumbakonam – 612001",
                ],
                mapQuery: "Sarangapani South Road Kumbakonam",
              },
            ].map((office, i) => (
              <FadeIn key={office.name} delay={i * 0.12} y={36}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(office.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded-3xl p-8 transition-all"
                  style={{
                    background: "rgba(249,244,241,0.05)",
                    border: "1px solid rgba(249,244,241,0.14)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(232,199,126,0.45)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(249,244,241,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(249,244,241,0.14)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(249,244,241,0.05)";
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="font-display text-6xl font-bold leading-none"
                      style={{ color: "rgba(232,199,126,0.25)" }}
                    >
                      {office.num}
                    </span>
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ background: "rgba(232,199,126,0.14)", color: "#E8C77E" }}
                    >
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold text-white">
                    {office.name}
                  </h3>
                  <div className="mt-3 flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#E8C77E" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(249,244,241,0.6)" }}>
                      {office.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#E8C77E" }}
                  >
                    Get Directions <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAP */}
      <section style={{ background: "#F9F4F1" }} className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-10 text-center">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#C9A23E" }}
            >
              Find Us
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl" style={{ color: "#0F2235" }}>
              On the map
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} y={36}>
            <div
              className="overflow-hidden rounded-3xl"
              style={{
                border: "1px solid rgba(15,34,53,0.1)",
                boxShadow: "0 30px 60px -30px rgba(15,34,53,0.2)",
              }}
            >
              <iframe
                title="Nila Promoters office map"
                src="https://maps.google.com/maps?q=Sarangapani%20South%20Road%20Kumbakonam&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="440"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gold divider between content and footer */}
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

function QuickLink({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex h-full items-center gap-4 px-6 py-6 transition-colors"
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "rgba(249,244,241,0.04)")
      }
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors"
        style={{ background: "rgba(232,199,126,0.14)", color: "#E8C77E" }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div
          className="text-[11px] font-semibold uppercase tracking-widest"
          style={{ color: "rgba(249,244,241,0.45)" }}
        >
          {label}
        </div>
        <div className="truncate text-sm font-semibold text-white">{value}</div>
      </div>
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgba(15,34,53,0.5)" }}
      >
        {label}
        {required && <span style={{ color: "#C9A23E" }}> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
        style={{ border: "1px solid rgba(15,34,53,0.14)", background: "#fff", color: "#0F2235" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3650")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(15,34,53,0.14)")}
      />
    </div>
  );
}