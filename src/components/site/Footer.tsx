import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import nilaLogo from "@/assets/nila-logo.png";
export function Footer() {
  return (
    <footer style={{ background: "#001D39", color: "rgba(189,216,233,0.8)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <img
  src={nilaLogo}
  alt="Nila Promoters"
  className="h-32 w-auto object-contain"
/>
          <p className="mt-3 text-sm" style={{ color: "rgba(189,216,233,0.6)" }}>
            Building Kumbakonam's Future, One Plot at a Time.
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest" style={{ color: "rgba(123,189,232,0.7)" }}>
            DTCP · RERA Approved
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/projects", label: "Projects" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  style={{ color: "rgba(189,216,233,0.7)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7BBDE8")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(189,216,233,0.7)")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-white">Our Projects</h4>
          <ul className="space-y-2 text-sm" style={{ color: "rgba(189,216,233,0.65)" }}>
            <li>Mahalakshmi Nagar</li>
            <li>SPM Garden</li>
            <li>Sanjana Nagar</li>
            <li>Salith Nagar</li>
            <li>Anugragah Avenue</li>
            <li>London City</li>
            <li>Shanthi Nagar</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#4E8EA2" }} />
              <span style={{ color: "rgba(189,216,233,0.65)" }}>
                8/2038 A, Smart Plaza, OSJ Abdeen Nagar, Chennai Main Rd, Kumbakonam – 612002
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#4E8EA2" }} />
              <span style={{ color: "rgba(189,216,233,0.65)" }}>
                17, 18, Sarangapani South Rd, Kumbakonam – 612001
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" style={{ color: "#4E8EA2" }} />
              <a
                href="tel:9629688133"
                style={{ color: "rgba(189,216,233,0.7)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7BBDE8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(189,216,233,0.7)")}
              >
                9629688133
              </a>
              <span style={{ color: "rgba(189,216,233,0.4)" }}>·</span>
              <a
                href="tel:8220651747"
                style={{ color: "rgba(189,216,233,0.7)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7BBDE8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(189,216,233,0.7)")}
              >
                8220651747
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" style={{ color: "#4E8EA2" }} />
              <a
                href="https://wa.me/918220651747"
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgba(189,216,233,0.7)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7BBDE8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(189,216,233,0.7)")}
              >
                WhatsApp: 8220651747
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(78,142,162,0.18)" }}>
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col items-center gap-1.5 text-center">
          <p className="text-xs" style={{ color: "rgba(189,216,233,0.45)" }}>
            © 2025 Nila Promoters. All Rights Reserved. · DTCP &amp; RERA Approved Real Estate Developer, Kumbakonam
          </p>
          <p className="text-xs" style={{ color: "rgba(189,216,233,0.35)" }}>
            Developed by{" "}
            <a
              href="https://synclifysolutions.in/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold uppercase tracking-wide transition-colors"
              style={{ color: "#4E8EA2" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7BBDE8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4E8EA2")}
            >
              Synclify Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}