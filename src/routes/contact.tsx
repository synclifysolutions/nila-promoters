import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, Mail, Send } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { PageBanner } from "./about";
import { ALL_PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nila Promoters — Kumbakonam Plot Developer" },
      { name: "description", content: "Get in touch with Nila Promoters for DTCP & RERA approved plots in Kumbakonam. Two offices, WhatsApp, call, or visit us." },
      { property: "og:title", content: "Contact Nila Promoters" },
      { property: "og:description", content: "Reach Nila Promoters in Kumbakonam — call, WhatsApp or visit our offices." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageBanner title="Get In Touch" crumbs={["Home", "Contact"]} />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl bg-card p-8 shadow-card ring-1 ring-border/60 md:p-10">
              <h2 className="font-display text-3xl font-bold text-[#0F2235]">Send Us an Enquiry</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us a bit about what you're looking for — we'll respond within 24 hours.
              </p>

              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="mt-8 grid gap-5 md:grid-cols-2"
              >
                <Field label="Full Name" name="name" required />
                <Field label="Phone Number" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" className="md:col-span-2" />
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#0F2235]/60">
                    Interested In
                  </label>
                  <select className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-[#0F2235] outline-none focus:ring-2 focus:ring-[#1B3650]">
                    <option>General Enquiry</option>
                    {ALL_PROJECTS.map((p) => <option key={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#0F2235]/60">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-[#0F2235] outline-none focus:ring-2 focus:ring-[#1B3650]"
                    placeholder="Tell us about your plot requirements..."
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0F2235] px-6 py-3.5 text-sm font-semibold text-[#F9F4F1] shadow transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(249,244,241,0.45)]"
                  >
                    <Send className="h-4 w-4" /> Send Enquiry
                  </button>
                  <a
                    href="https://wa.me/918220651747"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </div>

                {sent && (
                  <p className="md:col-span-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Thank you! Your enquiry has been received. We'll be in touch shortly.
                  </p>
                )}
              </form>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-4">
              <InfoCard icon={Phone} title="Call Us">
                <a href="tel:9629688133" className="block hover:text-[#1B3650]">9629688133</a>
                <a href="tel:8220651747" className="block hover:text-[#1B3650]">8220651747</a>
              </InfoCard>

              <InfoCard icon={MessageCircle} title="WhatsApp">
                <a href="https://wa.me/918220651747" target="_blank" rel="noreferrer" className="hover:text-[#1B3650]">
                  8220651747
                </a>
              </InfoCard>

              <InfoCard icon={MapPin} title="Office 1">
                8/2038 A, Smart Plaza, OSJ Abdeen Nagar,<br />
                Chennai Main Road, Kumbakonam – 612002
              </InfoCard>

              <InfoCard icon={MapPin} title="Office 2">
                17, 18, Sarangapani South Road,<br />
                Kumbakonam – 612001
              </InfoCard>

              <InfoCard icon={Clock} title="Working Hours">
                Mon – Sat: 9:00 AM – 6:00 PM<br />
                Sunday: By Appointment
              </InfoCard>

              <InfoCard icon={Mail} title="Email">
                <a href="mailto:contact@nilapromoters.com" className="hover:text-[#1B3650] break-all">
                  contact@nilapromoters.com
                </a>
              </InfoCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <Reveal>
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="overflow-hidden rounded-2xl shadow-card ring-1 ring-border/60">
              <iframe
                title="Nila Promoters office map"
                src="https://maps.google.com/maps?q=Sarangapani%20South%20Road%20Kumbakonam&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}

function Field({
  label, name, type = "text", required, className = "",
}: { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-semibold uppercase tracking-widest text-[#0F2235]/60">
        {label}{required && <span className="text-[#1B3650]"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-[#0F2235] outline-none focus:ring-2 focus:ring-[#1B3650]"
      />
    </div>
  );
}

function InfoCard({
  icon: Icon, title, children,
}: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-card p-5 shadow-card ring-1 ring-border/60 transition-shadow hover:shadow-[0_15px_30px_-12px_rgba(13,27,42,0.2)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1B3650]/12 text-[#1B3650]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#0F2235]/60">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-[#0F2235]">{children}</div>
      </div>
    </div>
  );
}