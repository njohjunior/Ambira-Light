import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import LampProjection from "../components/hero/LampProjection";

const ease = [0.76, 0, 0.24, 1] as const;

/* ─── Geometry helper ───────────────────────────────────────── */

/**
 * Returns the point where a ray from (cx,cy) toward (tx,ty)
 * exits a rectangle centered at (cx,cy) with half-extents (hw, hh).
 * Lines will start from the lamp boundary, never passing through the image.
 */
function getRectEdge(
  cx: number,
  cy: number,
  hw: number,
  hh: number,
  tx: number,
  ty: number,
): [number, number] {
  const dx = tx - cx;
  const dy = ty - cy;
  if (Math.abs(dx) < 1e-9 && Math.abs(dy) < 1e-9) return [cx, cy];
  const sx = Math.abs(dx) < 1e-9 ? Infinity : hw / Math.abs(dx);
  const sy = Math.abs(dy) < 1e-9 ? Infinity : hh / Math.abs(dy);
  const t = Math.min(sx, sy);
  return [cx + dx * t, cy + dy * t];
}

/* ─── Pulsing endpoint dot ──────────────────────────────────── */

function EndDot({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <g style={{ transform: `translate(${cx}px, ${cy}px)` }}>
      <motion.circle
        cx={0}
        cy={0}
        r={8}
        fill="rgba(122,155,140,0.12)"
        stroke="#7A9B8C"
        strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.28, 1, 0.28] }}
        transition={{
          delay,
          duration: 2.8,
          times: [0, 0.08, 0.5, 0.75, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx={0}
        cy={0}
        r={2.5}
        fill="#7A9B8C"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.12, duration: 0.35 }}
      />
    </g>
  );
}

/* ─── Coords type ───────────────────────────────────────────── */

type Coords = {
  lampCX: number;
  lampCY: number;
  lampHalfW: number;
  lampHalfH: number;
  descY: number;
  descRight: number;
  titleY: number;
  titleLeft: number;
};

/* ─── Hero ──────────────────────────────────────────────────── */

export default function Hero() {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    const update = () => {
      if (
        !sectionRef.current ||
        !lampRef.current ||
        !descRef.current ||
        !titleRef.current
      )
        return;
      const S = sectionRef.current.getBoundingClientRect();
      const L = lampRef.current.getBoundingClientRect();
      const D = descRef.current.getBoundingClientRect();
      const Ti = titleRef.current.getBoundingClientRect();

      setCoords({
        lampCX: L.left - S.left + L.width / 2,
        lampCY: L.top - S.top + L.height / 2,
        lampHalfW: L.width / 2,
        lampHalfH: L.height / 2,
        descY: D.top - S.top + D.height / 2,
        descRight: D.right - S.left,
        titleY: Ti.top - S.top + Ti.height / 2,
        titleLeft: Ti.left - S.left,
      });
    };

    const t = setTimeout(update, 1600);
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-white dark:bg-dark"
      style={{ scrollSnapAlign: "start" }}
    >
      <LampProjection />

      {/* ── Connecting lines ─────────────────────────────────── */}
      {coords &&
        (() => {
          // Start each line from the lamp's rectangular boundary, not its interior
          const [descSX, descSY] = getRectEdge(
            coords.lampCX,
            coords.lampCY,
            coords.lampHalfW,
            coords.lampHalfH,
            coords.descRight,
            coords.descY,
          );
          const [titleSX, titleSY] = getRectEdge(
            coords.lampCX,
            coords.lampCY,
            coords.lampHalfW,
            coords.lampHalfH,
            coords.titleLeft,
            coords.titleY,
          );

          // Elbow: 72% from lamp center toward target — then horizontal cap to edge
          const descElbowX =
            coords.lampCX + (coords.descRight - coords.lampCX) * 0.72;
          const titleElbowX =
            coords.lampCX + (coords.titleLeft - coords.lampCX) * 0.72;

          const descPath = `M ${descSX}  ${descSY}  L ${descElbowX}  ${coords.descY}  L ${coords.descRight} ${coords.descY}`;
          const titlePath = `M ${titleSX} ${titleSY} L ${titleElbowX} ${coords.titleY} L ${coords.titleLeft} ${coords.titleY}`;

          return (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              style={{ zIndex: 9 }}
              aria-hidden
            >
              <motion.path
                d={descPath}
                stroke="#7A9B8C"
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ duration: 1.1, ease }}
              />
              <motion.path
                d={titlePath}
                stroke="#7A9B8C"
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ delay: 0.18, duration: 1.1, ease }}
              />

              {/* Dots at lamp boundary (start of each line) */}
              <EndDot cx={descSX} cy={descSY} delay={0} />
              <EndDot cx={titleSX} cy={titleSY} delay={0.1} />
              {/* Dots at target container edges */}
              <EndDot cx={coords.descRight} cy={coords.descY} delay={1.1} />
              <EndDot cx={coords.titleLeft} cy={coords.titleY} delay={1.3} />
            </svg>
          );
        })()}

      {/* ── Description — top left ───────────────────────────── */}
      <motion.div
        ref={descRef}
        className="absolute top-20 md:top-28 left-4 md:left-8 lg:left-16 max-w-[22ch] md:max-w-[26ch] z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.75, ease }}
      >
        <p
          className="font-body leading-relaxed pr-5"
          style={{
            fontSize: "16px",
            color: theme === "dark" ? "#C4C3BE" : "rgba(26,26,26,0.65)",
          }}
        >
          Minimal desk lamps crafted from natural oak, designed to transform
          your workspace into a sanctuary of focus and calm.
        </p>
      </motion.div>

      {/* ── Lamp — centered, clamp-responsive ────────────────── */}
      <motion.div
        ref={lampRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ width: "clamp(200px, 32vw, 540px)" }}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.95, ease }}
      >
        <div className="relative w-full">
          <img
            src="/images/lamp-off.webp"
            alt="Ambira Light desk lamp in natural oak"
            draggable={false}
            loading="eager"
            className={`w-full h-auto select-none transition-opacity duration-700 ${
              theme === "light" ? "opacity-100" : "opacity-0"
            }`}
          />
          <img
            src="/images/lamp-on.webp"
            alt="Ambira Light desk lamp illuminated"
            draggable={false}
            loading="eager"
            className={`absolute top-0 left-0 w-full h-auto select-none transition-opacity duration-700 ${
              theme === "dark" ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </motion.div>

      {/* ── Heading — bottom right ───────────────────────────── */}
      <motion.div
        ref={titleRef}
        className="absolute bottom-8 md:bottom-12 lg:bottom-16 right-4 md:right-8 lg:right-16 text-right z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.75, ease }}
      >
        <h1
          className="font-heading font-medium italic tracking-display leading-[1.1] transition-colors duration-300"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
            color: theme === "dark" ? "#FFFFFF" : "#1A1A1A",
          }}
        >
          Light that
          <br />
          transforms.
        </h1>
      </motion.div>
    </section>
  );
}
