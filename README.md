# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Advanced Tennis Analytics** — Glicko-2 ratings by surface, p_serve, p_return, and more
- **Surface-Specific Ratings** — Glicko-2 ratings calibrated per playing surface (hard, clay, grass)
- **Serve & Return Performance** — Probability-weighted serve and return metrics for precise match modeling
- **Momentum Tracking** — Momentum TD and Fatigue 72h indicators
- **Ranking Trends** — 6-month rank delta (Δ Rank 6m) for form assessment
- **Three Subscription Tiers** — Starter (€20), Analyst (€50), Pro (€79)
- **Dark Analytics Interface** — Professional, distraction-free design optimized for data analysis
- **Dynamic Card Hover Effects** — Cards feature luminous glow effects that match the icon color on hover for "Data Layer" and "Not a Tipster Service" sections
- **🌍 Full Internationalization** — Complete English and French translations for the entire landing page, with language switcher in navbar, localStorage persistence, and automatic browser language detection

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Internationalization**: next-intl
- **Font**: Tektur (Google Fonts via next/font/google)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended
- Git installed

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/haraus.git
cd haurus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔑 Environment Variables

This project does not require any environment variables. The internationalization system uses next-intl with local JSON translation files.

---

## 🌍 Internationalization

The landing page is fully internationalized with **English** and **French** support.

### How It Works

- **Language Switcher**: A toggle button (EN / FR) in the navbar lets users switch languages instantly
- **Persistence**: The selected language is saved to `localStorage` — it persists across sessions
- **Auto-Detection**: On first visit, the language is automatically detected from the browser's settings
- **Supported Locales**: `en` (English) and `fr` (French)

### Translation Files

All translations are stored in structured JSON files:

```
src/messages/
├── en.json   # English translations
└── fr.json   # French translations
```

### Adding New Translations

To add or modify text:

1. Open `src/messages/en.json` or `src/messages/fr.json`
2. Find or create the appropriate key following the nested structure
3. Update the translation string

Example structure:
```json
{
  "Navbar": {
    "features": "Features",
    "pricing": "Pricing",
    "cta": "Get Started"
  },
  "Hero": {
    "badge": "BETA AVAILABLE",
    "headline": "The metrics bookmakers use. Now yours."
  }
}
```

### Adding a New Language

1. Create a new translation file: `src/messages/[LOCALE].json`
2. Update `src/i18n/config.ts` to include the new locale
3. Add the locale to `middleware.ts` root file

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, Tailwind imports, font-family on body
│   ├── layout.tsx       # Root layout with Tektur font, metadata, and LocaleProvider
│   └── page.tsx         # Home page composing all sections
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Top navigation bar with language switcher (EN/FR)
│   │   └── Footer.tsx        # Site footer with translated legal disclaimer
│   ├── providers/
│   │   └── LocaleProvider.tsx # Client-side locale context provider
│   ├── sections/
│   │   ├── Hero.tsx           # Hero section with BETA AVAILABLE badge (translated)
│   │   ├── MetricsShowcase.tsx # Available metrics display (translated)
│   │   ├── WhyHaurus.tsx      # Data layer & tipster service differentiators (translated)
│   │   ├── SocialProof.tsx    # Testimonials or credibility elements (translated)
│   │   ├── Pricing.tsx        # Subscription tiers display (translated)
│   │   └── CTABanner.tsx      # Call-to-action banner (translated)
│   └── ui/
│       └── Button.tsx   # Reusable button component with variants
├── i18n/
│   ├── config.ts        # Locale configuration (supported locales list)
│   └── request.ts       # Server-side request configuration for next-intl
├── messages/
│   ├── en.json          # English translations for all components
│   └── fr.json          # French translations for all components
├── lib/
│   └── utils.ts        # Utility functions (cn helper for Tailwind)
└── middleware.ts       # Middleware for locale detection and routing
public/
└── (static assets)
```

### Key i18n Files

| File | Purpose |
|------|---------|
| `src/i18n/config.ts` | Defines supported locales (`en`, `fr`) |
| `src/i18n/request.ts` | Server-side request config for next-intl |
| `src/messages/en.json` | All English text (headlines, CTAs, labels, errors, etc.) |
| `src/messages/fr.json` | All French text (headlines, CTAs, labels, errors, etc.) |
| `middleware.ts` | Intercepts requests, detects locale, redirects if needed |

## 🔤 Typography

Haurus uses **Tektur** as its sole typeface, loaded via `next/font/google` for optimal performance. The font is configured in `src/app/layout.tsx` and applied globally to the `<body>` element via CSS variable.

**Font configuration** (`src/app/layout.tsx`):
```typescript
import { Tektur } from 'next/font/google'

const tektur = Tektur({
  subsets: ['latin'],
  variable: '--font-tektur',
})
```

## 📝 License

MIT