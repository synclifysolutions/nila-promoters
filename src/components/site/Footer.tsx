import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import nilaLogo from "@/assets/nila-logo.png";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.2v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.6 12 21.6 12 21.6s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

const navLinks = [
  { to: "/",         label: "Home"     },
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/contact",  label: "Contact"  },
];

const projects = [
  "Mahalakshmi Nagar",
  "SPM Garden",
  "Sanjana Nagar",
  "Anugragah Avenue",
  "London City",
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nila_promoters_kumbakonam?utm_source=qr",
    Icon: IconInstagram,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@nilapromoters?si=lGuXMvbRfKOodl05",
    Icon: IconYouTube,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1BSfPhPc4L/?mibextid=wwXIfr",
    Icon: IconFacebook,
  },
];

export function Footer() {
  return (
    <footer style={{ background: "#0F2235" }}>

      {/* thin gold top line */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(232,199,126,0.4), transparent)" }} />

      {/* main grid */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-1"
          >
            <Link to="/">
              <img
                src={nilaLogo}
                alt="Nila Promoters"
                className="h-20 w-auto object-contain"
                style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.7))" }}
              />
            </Link>
            <p
              className="mt-5 text-sm leading-relaxed"
              style={{ color: "rgba(249,244,241,0.4)", maxWidth: "220px" }}
            >
              Premium DTCP &amp; RERA‑approved plots in Kumbakonam since 2020.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    border: "1px solid rgba(249,244,241,0.15)",
                    color: "rgba(249,244,241,0.45)",
                    background: "rgba(249,244,241,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F9F4F1";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,199,126,0.45)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(232,199,126,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(249,244,241,0.45)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,244,241,0.15)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(249,244,241,0.05)";
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#E8C77E" }}>
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(249,244,241,0.45)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F9F4F1")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(249,244,241,0.45)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#E8C77E" }}>
              Projects
            </p>
            <ul className="space-y-3">
              {projects.map((name) => (
                <li key={name} className="text-sm" style={{ color: "rgba(249,244,241,0.45)" }}>
                  {name}
                </li>
              ))}
            </ul>
            <Link
              to="/projects"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium transition-opacity duration-200 hover:opacity-70"
              style={{ color: "#E8C77E" }}
            >
              Explore all projects <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#E8C77E" }}>
              Contact
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "rgba(232,199,126,0.5)" }} />
                <span className="text-xs leading-relaxed" style={{ color: "rgba(249,244,241,0.4)" }}>
                  Smart Plaza, OSJ Abdeen Nagar,<br />
                  Chennai Main Rd, Kumbakonam – 612002
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: "rgba(232,199,126,0.5)" }} />
                <div className="flex gap-3">
                  {["9629688133", "8220651747"].map((n) => (
                    <a
                      key={n}
                      href={`tel:${n}`}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(249,244,241,0.45)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F9F4F1")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(249,244,241,0.45)")}
                    >
                      {n}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>

      {/* bottom bar */}
      <div style={{ borderTop: "1px solid rgba(249,244,241,0.07)" }}>
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col items-center gap-1 text-center">
          <p className="text-[11px]" style={{ color: "rgba(249,244,241,0.25)" }}>
            © 2025 Nila Promoters. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "rgba(249,244,241,0.2)" }}>
            Developed by{" "}
            <a
              href="https://synclifysolutions.in/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
              style={{ color: "rgba(249,244,241,0.4)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F9F4F1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(249,244,241,0.4)")}
            >
              Synclify Solutions
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}