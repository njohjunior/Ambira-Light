# Project

## Ambira Light
A lighting brand that creates desk lamps designed to transform workspaces into sanctuaries of focus and serenity. The brand concept fuses organic calm (Nature/Zen) with functionality (the "Switch" / light). The product line centers on Japandi-style desk lamps with light oak wood bases.

**Mission:** Offer light sources that transform work or living spaces into true sanctuaries of concentration and serenity.

**SEO Keywords:** Éclairage design, lampe minimaliste, ambiance zen, lumière naturelle, lampe de bureau apaisante, design Japandi.

---

# Commandes

- `npm run dev` — start Vite dev server
- `npm run build` — TypeScript check + Vite build
- `npm run preview` — preview production build

---

# Stack

- React 19 + TypeScript 6 + Vite 8
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- `index.html` lives at project root (NOT in `public/`)
- Static assets (images, favicon) live in `public/`

---

# Brand Identity

## Logo System
- **Logo Principal (Long):** Stylized "A" pictogram left + "ambira" logotype right. Use in `<header>` and invoices.
- **Logo Secondaire (Stacked):** Symbol centered above typography. Use in footer, packaging, business cards.
- **Monogramme:** Symbol only. Use for social media avatars (Instagram, TikTok) with 20% internal margin.
- **Favicon:** Export 512×512px PNG/ICO. Only essential "Switch" lines — must read at 16×16px.
- Logo must always be SVG format for sharpness on Retina/OLED screens.
- **Clear space rule:** Minimum spacing around logo = height of the lowercase "a" in the logotype. Nothing may enter this zone.

## Color Palette
| Name | Role | HEX | CSS Variable |
|---|---|---|---|
| Vert Sauge | Primary / buttons / accents | `#7A9B8C` | `--color-primary: #7A9B8C` |
| Noir Carbone | Dark mode bg / light mode text | `#1A1A1A` | `--color-dark: #1A1A1A` |
| Gris Minéral | Light mode bg / dark mode text | `#C4C3BE` | `--color-light: #C4C3BE` |
| Blanc | Light mode page bg | `#FFFFFF` | — |

**Light Mode:** White/light grey bg, Noir Carbone text, Vert Sauge CTA buttons.  
**Dark Mode:** Noir Carbone bg (`#1A1A1A`), Gris Minéral text (`#E0E0E0`), Vert Sauge logo icon.

## Typography
**Headings (H1/H2/H3):** Cormorant Garamond — Light 300 or Regular 400, italic. Add slight letter-spacing for premium feel.  
**Body / UI:** Josefin Sans — Thin 100 / Light 300i / Regular 400 for text, Medium 500 for action buttons. Line-height: 1.6.

**Type scale:**
| Level | Size | Use |
|---|---|---|
| H1 | 48px | Main title |
| H2 | 32px | Section subtitle |
| H3 | 24px | Product title |
| H4 | 18px | Tag / Label |
| Body | 16px | Descriptions |
| Small | 14px | Legal / secondary info |
| Caption | 10px | Legends / labels |

## Brand Voice
- **Serein:** Whisper with elegance, never shout. Words chosen to soothe, not convince.
- **Concret:** Short, direct sentences. Say what the product does and how it transforms a space.
- **Naturel:** Vocabulary of nature — forest, filtered light, dawn — anchors the brand in a sensory world.
- **Humain:** Speak to people, not consumers. "Vous" is respectful, never condescending.

Say: *"Une lumière qui s'adapte à votre rythme."*  
Avoid: *"La MEILLEURE lampe du marché !!!"*

## UI/UX Specifics
- Icons: line art (filaire), constant stroke 1.5–2px, rounded stroke-linejoin (Japandi softness).
- The Light/Dark mode toggle should visually echo the "Switch" logo animation.
- Toggle/filter buttons can echo the rounded "a" letterform from the logo.
- Product photo style: chiaroscuro, tidy desk scenes, natural textures (matte wood, plants), soft lamp shadows.
- Always use descriptive filenames for images (e.g., `lampe-bureau-ambira-light-bois.jpg`) and fill `alt` attributes for SEO.

---

# Docs
- `src/docs/Visual identity.pdf` — Ambira Light brand identity guidelines (logo, colors, typography, maquettes)
- `src/docs/Project specifications.docx` — Full technical specifications for web integration
