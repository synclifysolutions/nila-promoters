import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone, MessageCircle, MapPin, Clock, Mail, Send, ArrowRight, ArrowUpRight, Loader2, CheckCircle, AlertCircle
} from "lucide-react";
import { ALL_PROJECTS } from "@/data/projects";

import { useLanguage } from "./__root";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nila Promoters — Kumbakonam Plot Developer" },
      { name: "description", content: "Get in touch with Nila Promoters for DTCP & RERA approved plots in Kumbakonam." },
      { property: "og:title", content: "Contact Nila Promoters" },
      { property: "og:description", content: "Reach Nila Promoters in Kumbakonam — call, WhatsApp or visit our offices." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function FadeIn({ children, delay = 0, className = "", y = 28 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(10px)" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactPage() {
  const { t, language } = useLanguage();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Capture all named form fields into a key-value data structure automatically
    const formData = new FormData(formRef.current);

    try {
      // Formspree endpoint from image_ddf440.png
      const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbdvdwrp";

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus("success");
        formRef.current.reset(); // Clear input elements securely
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Formspree submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: "#0F2235" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(249,244,241,0.08) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(232,199,126,0.10)" }} />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <FadeIn className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 sm:w-10" style={{ background: "#E8C77E" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "#E8C77E" }}>{t("contact.heroSub")}</span>
              <span className="h-px w-8 sm:w-10" style={{ background: "#E8C77E" }} />
            </div>
            <h1 className="mt-5 sm:mt-6 mx-auto max-w-3xl font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white px-2 sm:px-0">
              {t("contact.heroTitle1")}{" "}
              <span className="italic" style={{ color: "#E8C77E" }}>{t("contact.heroTitle2")}</span>
            </h1>
            <p className="mt-4 sm:mt-6 mx-auto max-w-xl text-sm sm:text-base leading-relaxed md:text-lg px-3 sm:px-0" style={{ color: "rgba(249,244,241,0.65)" }}>
              {t("contact.heroDesc")}
            </p>
          </FadeIn>

          {/* Quick-contact strip */}
          <FadeIn delay={0.15} className="mt-8 sm:mt-12 grid gap-px overflow-hidden rounded-xl sm:rounded-2xl grid-cols-1 sm:grid-cols-3">
            <div style={{ background: "rgba(249,244,241,0.06)" }}>
              <QuickLink icon={Phone}         label={t("contact.linkCall")}   value="96296 88133"   href="tel:9629688133" />
            </div>
            <div style={{ background: "rgba(249,244,241,0.06)" }}>
              <QuickLink icon={MessageCircle} label={t("contact.linkWa")}   value="82206 51747"   href="https://wa.me/918220651747" external />
            </div>
            <div style={{ background: "rgba(249,244,241,0.06)" }}>
              <QuickLink icon={Mail}          label={t("contact.linkMail")}     value="nilapromoters2020@gmail.com"   href="mailto:nilapromoters2020@gmail.com" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. FORM + HOURS */}
      <section style={{ background: "#F9F4F1" }} className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 px-5 sm:px-6 lg:grid-cols-5">
          {/* Form */}
          <FadeIn className="lg:col-span-3" y={36}>
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12"
              style={{ background: "#fff", border: "1px solid rgba(15,34,53,0.08)", boxShadow: "0 30px 60px -30px rgba(15,34,53,0.18)" }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#C9A23E" }}>{t("contact.formSub")}</span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "#0F2235" }}>
                {t("contact.formTitle1")}{" "}<span className="italic" style={{ color: "#0F2235" }}>{t("contact.formTitle2")}</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(15,34,53,0.55)" }}>
                {t("contact.formDesc")}
              </p>

              <form ref={formRef} onSubmit={handleFormSubmit} className="mt-7 sm:mt-9 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
                <Field label={t("contact.fName")}    name="Name"  required />
                <Field label={t("contact.fPhone")} name="Phone" type="tel" required />
                <Field label={t("contact.fEmail")}        name="Email Address" type="email" className="sm:col-span-2" />

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(15,34,53,0.5)" }}>{t("contact.fInterest")}</label>
                  <select
                    name="Project Interest"
                    className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                    style={{ border: "1px solid rgba(15,34,53,0.14)", background: "#fff", color: "#0F2235" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3650")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(15,34,53,0.14)")}
                  >
                    <option value="General Inquiry">{t("contact.optGeneral")}</option>
                    {ALL_PROJECTS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(15,34,53,0.5)" }}>{t("contact.fMsg")}</label>
                  <textarea
                    name="Message Content"
                    rows={4}
                    placeholder={t("contact.fMsgPlaceholder")}
                    className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                    style={{ border: "1px solid rgba(15,34,53,0.14)", background: "#fff", color: "#0F2235" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3650")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(15,34,53,0.14)")}
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 sm:py-4 text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
                    style={{ background: "linear-gradient(135deg, #0F2235 0%, #1B3650 100%)", color: "#F9F4F1", boxShadow: "0 10px 28px rgba(15,34,53,0.35)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> 
                        {language === "en" ? "Sending..." : "அனுப்பப்படுகிறது..."}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> {t("contact.btnSubmit")}
                      </>
                    )}
                  </button>
                  <a
                    href="https://wa.me/918220651747"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 sm:py-4 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{ background: "#1EA952", boxShadow: "0 10px 28px rgba(30,169,82,0.3)" }}
                  >
                    <MessageCircle className="h-4 w-4" /> {language === "en" ? "WhatsApp" : "வாட்ஸ்அப்"}
                  </a>
                </div>

                {/* Status Banners */}
                {submitStatus === "success" && (
                  <div className="sm:col-span-2 inline-flex items-start gap-3 rounded-xl px-4 py-3.5 text-sm font-medium animate-fadeIn" style={{ background: "rgba(30,169,82,0.1)", color: "#166534", border: "1px solid rgba(30,169,82,0.25)" }}>
                    <CheckCircle className="h-5 w-5 mt-0.5 shrink-0 text-[#1EA952]" />
                    <p>{t("contact.formSuccess")}</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="sm:col-span-2 inline-flex items-start gap-3 rounded-xl px-4 py-3.5 text-sm font-medium animate-fadeIn" style={{ background: "rgba(220,38,38,0.1)", color: "#991B1B", border: "1px solid rgba(220,38,38,0.25)" }}>
                    <AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-red-600" />
                    <p>
                      {language === "en" 
                        ? "Something went wrong. Please try calling or messaging us via WhatsApp directly." 
                        : "தகவலை அனுப்புவதில் பிழை ஏற்பட்டுள்ளது. தயவுசெய்து எங்களை நேரடியாக தொலைபேசி அல்லது வாட்ஸ்அப் மூலம் தொடர்பு கொள்ளவும்."}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </FadeIn>

          {/* Hours + trust */}
          <FadeIn delay={0.1} className="lg:col-span-2" y={36}>
            <div className="flex h-full flex-col gap-4 sm:gap-5">
              <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ background: "#0F2235" }}>
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl" style={{ background: "rgba(232,199,126,0.16)" }}>
                  <Clock className="h-5 w-5" style={{ color: "#E8C77E" }} />
                </div>
                <h3 className="mt-4 sm:mt-5 font-display text-xl font-bold text-white">{t("contact.hoursTitle")}</h3>
                <div className="mt-4 space-y-2.5 text-sm" style={{ color: "rgba(249,244,241,0.7)" }}>
                  <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: "rgba(249,244,241,0.1)" }}>
                    <span>{t("contact.hoursWeekdays")}</span>
                    <span className="font-semibold text-white">9 AM – 6 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("contact.hoursSunday")}</span>
                    <span className="font-semibold" style={{ color: "#E8C77E" }}>{t("contact.hoursAppointment")}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center" style={{ background: "rgba(232,199,126,0.10)", border: "1px solid rgba(232,199,126,0.25)" }}>
                <span className="font-display text-4xl sm:text-5xl font-bold" style={{ color: "#0F2235" }}>5★</span>
                <span className="mt-2 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#8B6914" }}>{t("reviews.avg")}</span>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(15,34,53,0.55)" }}>{t("contact.trustDesc")}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. OFFICES */}
      <section style={{ background: "#0F2235" }} className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(249,244,241,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <FadeIn className="mb-10 sm:mb-14 text-center">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "#E8C77E" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#E8C77E" }}>{t("footer.hContact")}</span>
              <span className="h-px w-8" style={{ background: "#E8C77E" }} />
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {t("contact.officesTitle1")}{" "}<span className="italic" style={{ color: "#E8C77E" }}>{t("contact.officesTitle2")}</span>
            </h2>
          </FadeIn>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {[
              {
                num: "01",
                name: t("contact.office1Name"),
                lines: [t("footer.addressLine1"), t("footer.addressLine2")],
                directionsUrl: "https://maps.app.goo.gl/oQMZvGYL98pfAJSV8",
              },
              {
                num: "02",
                name: t("contact.office2Name"),
                lines: ["17, 18, Sarangapani South Road,", "Kumbakonam – 612001"],
                directionsUrl: "https://maps.google.com/?q=Sarangapani+South+Road+Kumbakonam",
              },
            ].map((office, i) => (
              <FadeIn key={office.name} delay={i * 0.12} y={36}>
                <a
                  href={office.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all"
                  style={{ background: "rgba(249,244,241,0.05)", border: "1px solid rgba(249,244,241,0.14)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.border = "1px solid rgba(232,199,126,0.45)"; (e.currentTarget as HTMLElement).style.background = "rgba(249,244,241,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.border = "1px solid rgba(249,244,241,0.14)"; (e.currentTarget as HTMLElement).style.background = "rgba(249,244,241,0.05)"; }}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl sm:text-6xl font-bold leading-none" style={{ color: "rgba(232,199,126,0.25)" }}>{office.num}</span>
                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ background: "rgba(232,199,126,0.14)", color: "#E8C77E" }}>
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-5 sm:mt-6 font-display text-xl sm:text-2xl font-bold text-white">{office.name}</h3>
                  <div className="mt-3 flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#E8C77E" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(249,244,241,0.6)" }}>
                      {office.lines.map((l) => <span key={l} className="block">{l}</span>)}
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "#E8C77E" }}>
                    {t("contact.btnDirections")} <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAPS */}
      <section style={{ background: "#F9F4F1" }} className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <FadeIn className="mb-8 sm:mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#C9A23E" }}>{t("contact.mapSub")}</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "#0F2235" }}>{t("contact.mapTitle")}</h2>
          </FadeIn>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <FadeIn delay={0} y={36}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: "#C9A23E" }} />
                  <span className="text-sm font-semibold" style={{ color: "#0F2235" }}>{t("contact.office1Name")}</span>
                </div>
                <div className="overflow-hidden rounded-xl sm:rounded-2xl" style={{ border: "1px solid rgba(15,34,53,0.1)", boxShadow: "0 20px 40px -20px rgba(15,34,53,0.15)" }}>
                  <iframe
                    title="Smart Plaza Office map"
                    src="https://maps.google.com/maps?q=8/2038+A,+Smart+Plaza,+OSJ+Abdeen+Nagar,+Chennai+Main+Road,+Kumbakonam+612002&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="280"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a href="https://maps.app.goo.gl/oQMZvGYL98pfAJSV8" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "#C9A23E" }}>
                  {t("contact.btnMapOpen")} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} y={36}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: "#C9A23E" }} />
                  <span className="text-sm font-semibold" style={{ color: "#0F2235" }}>{t("contact.office2Name")}</span>
                </div>
                <div className="overflow-hidden rounded-xl sm:rounded-2xl" style={{ border: "1px solid rgba(15,34,53,0.1)", boxShadow: "0 20px 40px -20px rgba(15,34,53,0.15)" }}>
                  <iframe
                    title="Sarangapani Road Office map"
                    src="https://maps.google.com/maps?q=Sarangapani%20South%20Road%20Kumbakonam&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="280"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a href="https://maps.google.com/?q=Sarangapani+South+Road+Kumbakonam" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "#C9A23E" }}>
                  {t("contact.btnMapOpen")} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="h-[5px] w-full" style={{ background: "linear-gradient(90deg, #d4ad57 0%, #E8C77E 50%, #d4ad57 100%)", boxShadow: "0 0 20px rgba(232,199,126,0.65)" }} />
    </>
  );
}

function QuickLink({ icon: Icon, label, value, href, external }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex h-full items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-6 transition-colors"
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(249,244,241,0.04)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
    >
      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl transition-colors" style={{ background: "rgba(232,199,126,0.14)", color: "#E8C77E" }}>
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(249,244,241,0.45)" }}>{label}</div>
        <div className="truncate text-xs sm:text-sm font-semibold text-white">{value}</div>
      </div>
    </a>
  );
}

function Field({ label, name, type = "text", required, className = "" }: { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(15,34,53,0.5)" }}>
        {label}{required && <span style={{ color: "#C9A23E" }}> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
        style={{ border: "1px solid rgba(15,34,53,0.14)", background: "#fff", color: "#0F2235" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3650")}
        onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(15,34,53,0.14)")}
      />
    </div>
  );
}