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
    <>
      {/* Logo — fixed top-left, outside navbar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-6 left-8 z-50 pointer-events-auto"
      >
        <Link to="/">
          <img
            src={nilaLogo}
            alt="Nila Promoters"
            className="h-24 w-auto object-contain drop-shadow-[0_0_24px_rgba(14,165,233,0.5)]"
          />
        </Link>
      </motion.div>

      {/* Navbar — centered, no logo */}
      <div className="fixed inset-x-0 top-0 z-50 flex flex-col items-center pointer-events-none">
        <motion.header
          initial={{ y: -20, opacity: 0, scaleX: 0.85 }}
          animate={{
            y: scrolled ? 10 : 16,
            opacity: 1,
            scaleX: 1,
            width: open ? "92%" : scrolled ? "70%" : "80%",
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="pointer-events-auto rounded-[2rem] bg-[#0a0f1e]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          style={{ maxWidth: "900px" }}
        >
          <div className="flex items-center justify-between px-6 py-3">

            {/* Center Nav Links */}
            <nav className="hidden md:flex items-center gap-1 mx-auto">
              {links.map((l) => {
                const isActive =
                  l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pill"
                        className="absolute inset-0 rounded-full bg-sky-500"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-sky-500 hover:bg-sky-400 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] hover:scale-105"
              >
                Enquire Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="text-white/80 md:hidden p-1 ml-auto"
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
                  {open ? <X size={20} /> : <Menu size={20} />}
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
                <div className="flex flex-col gap-1 px-4 pb-4 pt-1 border-t border-white/10">
                  {links.map((l) => {
                    const isActive =
                      l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                    return (
                      <Link
                        key={l.to}
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-sky-500 text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-1 rounded-full bg-sky-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Enquire Now
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </>
  );
}