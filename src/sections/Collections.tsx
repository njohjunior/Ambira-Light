import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import Button from '../components/ui/Button'
import collectionsData, { type LampProduct } from '../data/collectionsData'

const ease = [0.76, 0, 0.24, 1] as const

/* ─── Card ───────────────────────────────────────────────────────────────── */

function LampCard({
  lamp,
  index,
  theme,
}: {
  lamp: LampProduct
  index: number
  theme: string
}) {
  return (
    <motion.article
      className={[
        'flex flex-col overflow-hidden rounded-sm cursor-pointer',
        'border border-[#C4C3BE]/20 dark:border-white/[0.06]',
        'shadow-sm hover:shadow-md transition-shadow duration-300',
      ].join(' ')}
      style={{ backgroundColor: theme === 'dark' ? '#222222' : '#FFFFFF' }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.09, duration: 0.65, ease }}
      whileHover={{ y: -5, transition: { duration: 0.28, ease } }}
    >
      {/* ── Image 1:1 ── */}
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={{ backgroundColor: theme === 'dark' ? '#1C1C1C' : '#F7F7F7' }}
      >
        <img
          src={lamp.imageOff}
          alt={`${lamp.name} desk lamp — off`}
          draggable={false}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-contain select-none transition-opacity duration-700 ${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <img
          src={lamp.imageOn}
          alt={`${lamp.name} desk lamp — illuminated`}
          draggable={false}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-contain select-none transition-opacity duration-700 ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-2.5">
        <h3
          className="font-heading italic tracking-display leading-tight transition-colors duration-300"
          style={{
            fontSize: '1.25rem',
            color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
          }}
        >
          {lamp.name}
        </h3>
        <p
          className="font-body"
          style={{
            fontSize: '13px',
            lineHeight: '1.55',
            color: theme === 'dark' ? '#C4C3BE' : 'rgba(26,26,26,0.6)',
          }}
        >
          {lamp.tagline}
        </p>

        {/* ── Footer: Buy Now + price ── */}
        <div
          className="flex items-center justify-between mt-auto pt-4 border-t"
          style={{
            borderColor:
              theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(196,195,190,0.35)',
          }}
        >
          <Button variant="primary" size="sm">
            Buy Now
          </Button>
          <span
            className="font-body font-medium tracking-ui"
            style={{ fontSize: '15px', color: '#7A9B8C' }}
          >
            {lamp.price}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ─── Collections ────────────────────────────────────────────────────────── */

export default function Collections() {
  const { theme } = useTheme()

  return (
    <section
      id="collection"
      className="relative bg-white dark:bg-dark overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 pt-28 pb-20">

        {/* ── Section heading ── */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <motion.h2
            className="font-heading font-light italic tracking-display leading-tight transition-colors duration-300 mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease }}
          >
            The Collection.
          </motion.h2>
          <motion.p
            className="font-body leading-relaxed"
            style={{
              fontSize: '16px',
              color: theme === 'dark' ? '#C4C3BE' : 'rgba(26,26,26,0.65)',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15, duration: 0.75, ease }}
          >
            Six lamps. One philosophy. Each piece is shaped by silence, crafted
            from natural oak, and designed to bring the quality of morning light
            to every desk.
          </motion.p>
        </div>

        {/* ── 3 × 2 grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {collectionsData.map((lamp, i) => (
            <LampCard key={lamp.id} lamp={lamp} index={i} theme={theme} />
          ))}
        </div>

      </div>
    </section>
  )
}
