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
│   │   ├── Navbar.tsx   # Top navigation bar with three-zone flexbox layout (logo left, nav links centered, CTA right)
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={tektur.variable}>
      <body className="antialiased" style={{ fontFamily: 'var(--font-tektur)' }}>
        {children}
      </body>
    </html>
  )
}
```

## 🚀 Deploy to Vercel

The easiest way to deploy your Haurus app is to use [Vercel](https://vercel.com/new), the platform built and maintained by the creators of Next.js.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/new) and import your repository
3. Select your project and click **Deploy**
4. Your app will be live at `https://your-project.vercel.app`

No environment variables are required for the basic deployment since this project doesn't use Supabase or other external services.

## 📝 License

MIT