import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

export default function LampProjection() {
  const { theme } = useTheme()

  return (
    <AnimatePresence>
      {theme === 'dark' && (
        <motion.div
          key="lamp-projection"
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.04, 1] }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          transition={{
            duration: 2.4,
            times: [0, 0.12, 1],
            ease: ['linear', [0.22, 1, 0.36, 1]],
          }}
          style={{
            background: [
              'radial-gradient(ellipse 38% 28% at 50% 56%, rgba(247,247,247,0.10) 0%, transparent 100%)',
              'radial-gradient(ellipse 68% 48% at 50% 58%, rgba(196,195,190,0.07) 0%, transparent 65%)',
              'radial-gradient(ellipse 100% 65% at 50% 62%, rgba(122,155,140,0.04) 0%, transparent 70%)',
            ].join(', '),
          }}
        />
      )}
    </AnimatePresence>
  )
}
