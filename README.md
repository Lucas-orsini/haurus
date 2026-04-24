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

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
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

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, Tailwind imports, font-family on body
│   ├── layout.tsx       # Root layout with Tektur font and metadata
│   └── page.tsx         # Home page composing all sections
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx   # Top navigation bar (centered horizontally)
│   │   └── Footer.tsx   # Site footer with legal disclaimer
│   ├── sections/
│   │   ├── Hero.tsx           # Hero section with BETA AVAILABLE badge
│   │   ├── MetricsShowcase.tsx # Available metrics display
│   │   ├── WhyHaurus.tsx      # Data layer & tipster service differentiators with color-matched glow effects
│   │   ├── SocialProof.tsx    # Testimonials or credibility elements
│   │   └── Pricing.tsx        # Subscription tiers display
│   └── ui/
│       └── Button.tsx   # Reusable button component with variants
├── lib/
│   └── utils.ts        # Utility functions (cn helper for Tailwind)
└── public/
    └── (static assets)
```

## 🔤 Typography

Haurus uses **Tektur** as its sole typeface, loaded via `next/font/google` for optimal performance. The font is configured in `src/app/layout.tsx` and applied globally to the `<body>` element via CSS variable.

**Font configuration** (`src/app/layout.tsx`):
```typescript
import { Tektur } from 'next/font/google'

const tektur = Tektur({
  subsets: ['latin'],
  variable: '--font-tektur',
  display: 'swap',
})
```

**Global CSS** (`src/app/globals.css`):
```css
body {
  font-family: var(--font-tektur);
}
```

All UI elements — headings, paragraphs, buttons, labels, inputs, and navigation — inherit Tektur

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Import your repository** — Click the button above or go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo
2. **Configure project** — Vercel will auto-detect Next.js settings
3. **Add environment variables** — If you add any (API keys, etc.), go to **Settings > Environment Variables** and add each key-value pair
4. **Deploy** — Click **Deploy** and wait for the build to complete
5. **Your site is live** — You'll get a `.vercel.app` URL, or connect a custom domain in **Settings > Domains**

> ⚠️ **Reminder**: Always add all environment variables from your `.env.local` to Vercel before deploying, otherwise your app may crash.

## 📝 License

MIT