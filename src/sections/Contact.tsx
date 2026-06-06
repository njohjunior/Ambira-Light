import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import Button from '../components/ui/Button'

const ease = [0.76, 0, 0.24, 1] as const

/* ─── Shared input class (no cascade issue — all Tailwind arbitrary values) */
const inputBase = [
  'w-full px-4 py-3 font-body text-sm rounded-sm',
  'border border-[#C4C3BE]/30 dark:border-white/[0.08]',
  'focus:outline-none focus:ring-1 focus:ring-[#7A9B8C] focus:border-[#7A9B8C]',
  'transition-colors duration-200',
].join(' ')

/* ─── Contact + Footer ───────────────────────────────────────────────────── */

export default function Contact() {
  const { theme } = useTheme()
  const [submitted, setSubmitted] = useState(false)

  const inputStyle = {
    color: theme === 'dark' ? '#E0E0E0' : '#1A1A1A',
    backgroundColor: theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-white dark:bg-dark flex flex-col"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* ── Contact form ────────────────────────────────────────── */}
      <div className="flex-1 max-w-[700px] mx-auto w-full px-4 md:px-6 pt-28 pb-16">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <motion.h2
            className="font-heading font-light italic tracking-display leading-tight transition-colors duration-300 mb-3"
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease }}
          >
            Get in touch.
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
            A question, a collaboration, or simply a curiosity about light —{' '}
            we'd love to hear from you.
          </motion.p>
        </div>

        {/* Form / Success */}
        {submitted ? (
          <motion.div
            className="text-center py-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <p
              className="font-heading italic mb-2"
              style={{
                fontSize: '1.75rem',
                color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
              }}
            >
              Thank you.
            </p>
            <p
              className="font-body text-sm"
              style={{ color: theme === 'dark' ? '#C4C3BE' : 'rgba(26,26,26,0.6)' }}
            >
              We'll be in touch soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.25, duration: 0.75, ease }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                required
                className={inputBase}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Your email"
                required
                className={inputBase}
                style={inputStyle}
              />
            </div>
            <textarea
              placeholder="Your message"
              required
              rows={5}
              className={`${inputBase} resize-none`}
              style={inputStyle}
            />
            <div className="flex justify-end mt-1">
              <Button variant="primary" size="md" type="submit">
                Send Message
              </Button>
            </div>
          </motion.form>
        )}
      </div>

      {/* ── Separator ───────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8">
        <hr
          className="border-0 border-t"
          style={{
            borderColor:
              theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(196,195,190,0.35)',
          }}
        />
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="max-w-[1200px] mx-auto w-full px-4 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Col 1 — Logo */}
          <div>
            <a href="#home" aria-label="Back to top">
              <img
                src="/images/Logo.png"
                alt="Ambira Light"
                className="h-10 w-auto object-contain"
                draggable={false}
              />
            </a>
          </div>

          {/* Col 2 — Brand text + copyright */}
          <div className="flex flex-col gap-3">
            <p
              className="font-body leading-relaxed"
              style={{
                fontSize: '13px',
                color: theme === 'dark' ? '#C4C3BE' : 'rgba(26,26,26,0.6)',
              }}
            >
              Minimal desk lamps crafted from natural oak, designed to transform
              your workspace into a sanctuary of focus and calm.
            </p>
            <p
              className="font-body"
              style={{
                fontSize: '12px',
                color:
                  theme === 'dark'
                    ? 'rgba(196,195,190,0.45)'
                    : 'rgba(26,26,26,0.35)',
              }}
            >
              © 2026 Ambira Light. All rights reserved.
            </p>
          </div>

          {/* Col 3 — Contact info */}
          <div className="flex flex-col gap-2">
            <p
              className="font-body font-medium uppercase tracking-ui mb-1"
              style={{
                fontSize: '11px',
                color: theme === 'dark' ? '#E0E0E0' : '#1A1A1A',
              }}
            >
              Contact
            </p>
            {[
              { label: 'hello@ambiralight.com', href: 'mailto:hello@ambiralight.com' },
              { label: 'Instagram — @ambiralight', href: 'https://instagram.com/ambiralight' },
              { label: 'TikTok — @ambiralight', href: 'https://tiktok.com/@ambiralight' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-body transition-opacity duration-200 hover:opacity-70"
                style={{
                  fontSize: '13px',
                  color: theme === 'dark' ? '#C4C3BE' : 'rgba(26,26,26,0.6)',
                }}
              >
                {label}
              </a>
            ))}
          </div>

        </div>
      </footer>
    </section>
  )
}
