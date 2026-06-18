import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ProjectsCTA() {
  return (
    <section style={{ background: "#F5F0E8" }} className="py-24 border-t border-[#e8e3d8]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#C9A84C" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.38em]" style={{ color: "#8B6914" }}>
                Get in Touch
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl" style={{ color: "#001D39" }}>
              Find Your <span className="italic" style={{ color: "#8B6914" }}>Perfect Plot</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: "rgba(0,29,57,0.5)" }}>
              Get in touch for site visits, pricing, and exclusive pre-launch offers. Our team is ready to guide you.
            </p>
          </FadeUp>

          <FadeUp delay={0.15} className="flex flex-col gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "#001D39", borderRadius: "2px", boxShadow: "0 4px 20px rgba(0,29,57,0.2)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#0A2E4A")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#001D39")}
            >
              Enquire Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "transparent", border: "1.5px solid #001D39", color: "#001D39", borderRadius: "2px" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#001D39";
                (e.currentTarget as HTMLElement).style.color = "#C9A84C";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#001D39";
              }}
            >
              Book a Site Visit
            </Link>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center gap-6 pt-10" style={{ borderTop: "1px solid rgba(0,29,57,0.1)" }}>
            {["DTCP Approved", "RERA Registered", "100% Clear Title", "Est. 2020", "500+ Families"].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full" style={{ background: "#C9A84C" }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(0,29,57,0.45)" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}