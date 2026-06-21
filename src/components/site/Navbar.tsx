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
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-8"
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,20,33,0.88)" : "rgba(8,20,33,0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(232,199,126,0.14)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src={nilaLogo}
            alt="Nila Promoters"
            className="h-10 w-auto object-contain md:h-11"
            style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.7))" }}
          />
        </Link>

        {/* Center links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to}>
                <motion.div
                  className="relative px-4 py-1.5 text-[13px] tracking-wide"
                  style={{
                    borderRadius: "999px",
                    color: isActive ? "#F9F4F1" : "rgba(249,244,241,0.45)",
                    fontWeight: isActive ? 500 : 400,
                    cursor: "pointer",
                  }}
                  whileHover={{ color: "#F9F4F1" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(232,199,126,0.1)",
                        border: "1px solid rgba(232,199,126,0.25)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {l.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden shrink-0 md:block">
          <Link to="/contact">
            <motion.div
              className="rounded-full px-5 py-2 text-[13px] font-semibold"
              style={{
                background: "linear-gradient(135deg, #E8C77E, #c9a84c)",
                color: "#0F2235",
                cursor: "pointer",
              }}
              whileHover={{ y: -1, boxShadow: "0 6px 20px rgba(232,199,126,0.45)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              Book a Visit
            </motion.div>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-full p-1.5 md:hidden"
          style={{ color: "#E8C77E" }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-1.5 max-w-6xl overflow-hidden rounded-2xl md:hidden"
            style={{
              background: "rgba(8,20,33,0.96)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232,199,126,0.14)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            }}
          >
            <div className="flex flex-col gap-0.5 px-2 pb-2.5 pt-2">
              {links.map((l, i) => {
                const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                return (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                    <motion.div
                      className="rounded-xl px-4 py-2.5 text-[14px]"
                      style={
                        isActive
                          ? { background: "rgba(232,199,126,0.1)", color: "#E8C77E", border: "1px solid rgba(232,199,126,0.22)" }
                          : { color: "rgba(249,244,241,0.55)" }
                      }
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.22 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {l.label}
                    </motion.div>
                  </Link>
                );
              })}
              <Link to="/contact" onClick={() => setOpen(false)}>
                <motion.div
                  className="mt-1 rounded-full px-4 py-2.5 text-center text-[13px] font-semibold"
                  style={{ background: "linear-gradient(135deg, #E8C77E, #c9a84c)", color: "#0F2235" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05, duration: 0.22 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book a Visit
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}