import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import nilaLogo from "@/assets/nila-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 md:px-10 transition-all duration-300 pointer-events-none ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="pointer-events-auto flex-shrink-0"
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src={nilaLogo}
            alt="Nila Promoters"
            className="h-18 w-auto object-contain"
          />
        </Link>
      </motion.div>

      {/* Center pill — nav links */}
      <motion.header
        initial={{ y: -20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="pointer-events-auto rounded-full shadow-[0_8px_24px_rgba(17,43,60,0.28)]"
        style={{ background: "#112B3C" }}
      >
        <div className="flex items-center px-2 py-2">
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive =
                l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white/85"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "#1E4A6B", zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: "rgba(217,200,184,0.8)" }}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div
                className="flex flex-col gap-1 px-3 pb-3 pt-1 min-w-[200px]"
                style={{ borderTop: "1px solid rgba(217,200,184,0.12)" }}
              >
                {links.map((l) => {
                  const isActive =
                    l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
                      style={
                        isActive
                          ? { background: "#1E4A6B", color: "#ffffff" }
                          : { color: "rgba(217,200,184,0.7)" }
                      }
                      onMouseEnter={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(217,200,184,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLElement).style.background =
                            "transparent";
                      }}
                    >
                      {l.label}
                    </Link>
                  );
                })}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-1 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-all"
                  style={{
                    border: "1px solid rgba(217,200,184,0.35)",
                    color: "#D9C8B8",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(217,200,184,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Right side — language + CTA */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="pointer-events-auto hidden md:flex items-center gap-4 flex-shrink-0"
      >
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: "rgba(217,200,184,0.45)" }}
        >
          ENG
        </span>
        <Link
          to="/contact"
          className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300"
          style={{
            border: "1px solid #112B3C",
            background: "#D9C8B8",
            color: "#112B3C",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#112B3C";
            (e.currentTarget as HTMLElement).style.color = "#D9C8B8";
            (e.currentTarget as HTMLElement).style.border = "1px solid #D9C8B8";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#D9C8B8";
            (e.currentTarget as HTMLElement).style.color = "#112B3C";
            (e.currentTarget as HTMLElement).style.border = "1px solid #112B3C";
          }}
        >
          Contact Us
        </Link>
      </motion.div>
    </div>
  );
}