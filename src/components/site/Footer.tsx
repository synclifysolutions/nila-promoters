import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-bold text-gold">NILA PROMOTERS</div>
          <p className="mt-3 text-sm text-white/60">
            Building Kumbakonam's Future, One Plot at a Time.
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-gold/80">
            DTCP · RERA Approved
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/projects" className="hover:text-gold">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-white">Our Projects</h4>
          <ul className="space-y-2 text-sm">
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
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>8/2038 A, Smart Plaza, OSJ Abdeen Nagar, Chennai Main Rd, Kumbakonam – 612002</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>17, 18, Sarangapani South Rd, Kumbakonam – 612001</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" />
              <a href="tel:9629688133" className="hover:text-gold">9629688133</a> ·
              <a href="tel:8220651747" className="hover:text-gold">8220651747</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gold" />
              <a href="https://wa.me/918220651747" className="hover:text-gold" target="_blank" rel="noreferrer">
                WhatsApp: 8220651747
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-white/50">
          © 2025 Nila Promoters. All Rights Reserved. · DTCP & RERA Approved Real Estate Developer, Kumbakonam
        </div>
      </div>
    </footer>
  );
}
