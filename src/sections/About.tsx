import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const ease = [0.76, 0, 0.24, 1] as const;

/* ─── Dark-mode glow ─────────────────────────────────────────────────────── */
/*
 * One animated wrapper, two inner divs:
 *   - desktop  → lamp is in the left column  → glow origin at 25 % width
 *   - mobile   → columns stack, lamp is at top-center → glow origin at 50 % width, ~32 % from top
 */
function AboutProjection() {
  return (
    <motion.div
      key="about-projection"
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.04, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      transition={{
        duration: 2.4,
        times: [0, 0.12, 1],
        ease: ["linear", [0.22, 1, 0.36, 1]],
      }}
    >
      {/* Desktop — lamp centred in left 50 % column */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 50% 55% at 25% 50%, rgba(247,247,247,0.10) 0%, transparent 100%)",
            "radial-gradient(ellipse 72% 72% at 25% 52%, rgba(196,195,190,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 95% 88% at 25% 55%, rgba(122,155,140,0.04) 0%, transparent 70%)",
          ].join(", "),
        }}
      />
      {/* Mobile — lamp centred horizontally, upper third of section */}
      <div
        className="md:hidden absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 90% 38% at 50% 32%, rgba(247,247,247,0.10) 0%, transparent 100%)",
            "radial-gradient(ellipse 110% 52% at 50% 34%, rgba(196,195,190,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 130% 65% at 50% 37%, rgba(122,155,140,0.04) 0%, transparent 70%)",
          ].join(", "),
        }}
      />
    </motion.div>
  );
}

/* ─── About ──────────────────────────────────────────────────────────────── */

export default function About() {
  const { theme } = useTheme();

  return (
    <section
      id="about"
      className="relative min-h-screen md:h-screen bg-white dark:bg-dark overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Glow — dark mode only */}
      <AnimatePresence>
        {theme === "dark" && <AboutProjection />}
      </AnimatePresence>

      {/* Grid — above the glow */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen md:h-full md:min-h-0">

        {/* ── Lamp — left 50 % ─────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center justify-center px-8 md:px-12 pt-28 pb-4 md:py-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, ease }}
        >
          {/*
           * Two responsive heights via Tailwind arbitrary values:
           *   mobile  → clamp(220px, 38vh, 320px)  — compact, no vertical stretch
           *   desktop → clamp(380px, 70vh, 620px)  — large, breathing room
           */}
          <div className="relative w-full h-[clamp(220px,38vh,320px)] md:h-[clamp(380px,70vh,620px)]">
            <img
              src="/images/tripod-lamp-off.webp"
              alt="Ambira Light tripod desk lamp in natural oak"
              draggable={false}
              loading="lazy"
              className={`absolute inset-0 m-auto h-full w-auto select-none transition-opacity duration-700 ${
                theme === "light" ? "opacity-100" : "opacity-0"
              }`}
            />
            <img
              src="/images/tripod-lamp-on.webp"
              alt="Ambira Light tripod desk lamp illuminated"
              draggable={false}
              loading="lazy"
              className={`absolute inset-0 m-auto h-full w-auto select-none transition-opacity duration-700 ${
                theme === "dark" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </motion.div>

        {/* ── Text — right 50 % ────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 md:px-16 pb-20 md:pb-0 gap-6 md:gap-8">
          <motion.h2
            className="font-heading font-light italic tracking-display leading-tight transition-colors duration-300"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              color: theme === "dark" ? "#FFFFFF" : "#1A1A1A",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.75, ease }}
          >
            Crafted in the
            <br />
            spirit of silence.
          </motion.h2>

          <motion.p
            className="font-body leading-relaxed"
            style={{
              fontSize: "16px",
              color: theme === "dark" ? "#C4C3BE" : "rgba(26,26,26,0.65)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.75, ease }}
          >
            Ambira Light was born from a single belief: a workspace should feel
            like a sanctuary. Each lamp begins as a piece of natural oak, shaped
            by the Japanese principle of <em>ma</em> — the beauty found in space
            and silence. Where others add, we subtract. Each piece is designed
            so your light feels less like furniture and more like the quality of
            morning.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
