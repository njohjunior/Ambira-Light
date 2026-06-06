import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Collection", href: "#collection" },
  { label: "Contact", href: "#contact" },
];

/* ─── Icons ──────────────────────────────────────────────── */

function SunIcon() {
  return (
    <svg className="size-5 icon-stroke" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="size-5 icon-stroke" viewBox="0 0 24 24" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg className="size-5 icon-stroke" viewBox="0 0 24 24" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="size-5 icon-stroke" viewBox="0 0 24 24" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ─── Header ─────────────────────────────────────────────── */

const linkBase =
  "font-[family-name:var(--font-body)] text-sm font-medium uppercase tracking-[0.12em] " +
  "transition-colors duration-200";

const SECTION_IDS = ["home", "about", "collection", "contact"];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  /* ── Active section tracker ── */
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    let rafId: number | null = null;

    const update = () => {
      const containerRect = container.getBoundingClientRect();
      let bestId = SECTION_IDS[0];
      let bestOverlap = 0;

      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const overlap = Math.max(
          0,
          Math.min(rect.bottom, containerRect.bottom) -
            Math.max(rect.top, containerRect.top)
        );
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          bestId = id;
        }
      });

      setActive(bestId);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-2 left-2 right-2 md:top-5 md:left-5 md:right-5 md:mx-5 z-40 rounded-sm overflow-hidden backdrop-blur-md bg-white/70 dark:bg-dark/80 border border-light/30"
    >
      {/* ── Main bar ── */}
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
        {/* Logo */}
        <a href="#home" className="shrink-0">
          <img
            src="/images/Logo.png"
            alt="Ambira Light"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop nav — centered */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={label}
                href={href}
                className={`${linkBase} relative py-1`}
                style={{
                  color: isActive
                    ? "#7A9B8C"
                    : theme === "dark"
                    ? "#E0E0E0"
                    : "#1A1A1A",
                }}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: "#7A9B8C" }}
                    transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            className={
              "flex items-center justify-center size-9 rounded-full " +
              "text-[#1A1A1A] dark:text-[#E0E0E0] " +
              "hover:text-primary dark:hover:text-primary " +
              "hover:bg-primary/10 " +
              "transition-all duration-200"
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* CTA — desktop only, styled identically to <Button variant="primary" size="sm"> */}
          <a
            href="#collection"
            className="hidden md:inline-flex items-center justify-center gap-2 font-[family-name:var(--font-body)] font-medium tracking-[0.04em] leading-none px-4 pt-2 pb-1 text-sm rounded-[4px] bg-[var(--color-primary)] text-white hover:opacity-85 active:scale-[0.98] transition-all duration-200 select-none"
          >
            Shop Now
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={
              "flex items-center justify-center size-9 rounded-full md:hidden " +
              "text-[#1A1A1A] dark:text-[#E0E0E0] " +
              "hover:text-primary dark:hover:text-primary " +
              "transition-colors duration-200"
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ opacity: 0, rotate: -15 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 15 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {open ? <CloseIcon /> : <HamburgerIcon />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden md:hidden border-t border-light/30"
          >
            <nav
              className="container flex flex-col py-6 gap-5"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map(({ label, href }, i) => {
                const id = href.slice(1);
                const isActive = active === id;
                return (
                  <motion.a
                    key={label}
                    href={href}
                    className={linkBase}
                    style={{
                      color: isActive
                        ? "#7A9B8C"
                        : theme === "dark"
                        ? "#E0E0E0"
                        : "#1A1A1A",
                    }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
