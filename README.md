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

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Tektur (Google Fonts)

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

### 3. Set up environment variables

This landing page does not require any environment variables to run locally. All configuration is handled inline.

If you deploy to Vercel, no additional env vars are needed for the landing page.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout with fonts and metadata
│   └── page.tsx         # Home page composing all sections
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx   # Top navigation bar
│   │   └── Footer.tsx   # Site footer with legal disclaimer
│   ├── sections/
│   │   ├── Hero.tsx           # Hero section with tagline
│   │   ├── MetricsShowcase.tsx # Available metrics display
│   │   ├── SocialProof.tsx    # Testimonials or credibility elements
│   │   ├── WhyHaurus.tsx      # Why choose Haurus section
│   │   ├── Pricing.tsx        # Pricing tiers (Starter/Analyst/Pro)
│   │   └── CTABanner.tsx      # Call-to-action banner
│   └── ui/
│       ├── Button.tsx        # Reusable button component
│       ├── MetricCard.tsx    # Individual metric display card
│       └── PricingCard.tsx   # Pricing plan card
└── lib/
    └── utils.ts       # Utility functions (cn helper)
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the "Deploy with Vercel" button above
2. Import your GitHub repository
3. Vercel will auto-detect Next.js — no configuration needed
4. Click "Deploy"

## 📝 License

MIT

---

Here are the code changes for your requested modifications:

```tsx:src/components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff8820] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff8810] rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff8810] border border-[#00ff8830] mb-8"
          >
            <TrendingUp className="w-4 h-4 text-[#00ff88]" />
            <span className="text-sm text-[#00ff88] font-medium">
              Powered by Glicko-2 Ratings
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-tektur), sans-serif" }}
          >
            The metrics bookmakers use.{" "}
            <span className="text-[#00ff88]">Now yours.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Haurus delivers professional-grade tennis analytics: surface-specific
            Glicko-2 ratings, momentum tracking, and probability-weighted serve/return
            metrics. Built for serious bettors who demand an edge.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto">
              <Zap className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800/50"
            >
              <Shield className="w-5 h-5 mr-2" />
              View Sample Analysis
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
```

```tsx:src/components/sections/SocialProof.tsx
"use client";

import { motion } from "framer-motion";
import { Database, Users, RefreshCw } from "lucide-react";

const stats = [
  {
    icon: Database,
    value: "250k",
    label: "matches analysed",
  },
  {
    icon: Users,
    value: "1,033",
    label: "players tracked",
  },
  {
    icon: RefreshCw,
    value: "Twice",
    label: "daily updates",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 bg-[#0a0a0f] border-y border-[#1a1a24]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00ff8810] border border-[#00ff8830] flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-[#00ff88]" />
              </div>
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-tektur), sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

```tsx:src/components/sections/MetricsShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, Activity, Clock, BarChart3, Zap } from "lucide-react";

const metrics = [
  {
    icon: Target,
    name: "BPPI",
    description: "Probability-weighted serve & return metrics for precise match modeling",
    category: "Core",
  },
  {
    icon: TrendingUp,
    name: "Glicko-2",
    description: "Surface-specific ratings calibrated per playing surface (hard, clay, grass)",
    category: "Ratings",
  },
  {
    icon: Activity,
    name: "Momentum TD",
    description: "Track momentum trends over time with time-decay weighting",
    category: "Advanced",
  },
  {
    icon: Clock,
    name: "Form Guide 30d",
    description: "30-day performance analysis to identify current form patterns",
    category: "Form",
  },
  {
    icon: BarChart3,
    name: "Δ Rank 6m",
    description: "6-month ranking delta for trend assessment and form tracking",
    category: "Ranking",
  },
  {
    icon: Zap,
    name: "Injury Risk",
    description: "Historical injury patterns and recovery timelines analysis",
    category: "Health",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MetricsShowcase() {
  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-tektur), sans-serif" }}
          >
            Data Layer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional-grade metrics extracted from comprehensive tennis data.
            Each metric is designed to give you an edge in match prediction.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.name}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff8810] to-[#00ff8805] rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 rounded-2xl bg-[#0d0d14] border border-[#1a1a24] hover:border-[#00ff8840] transition-colors duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff8810] border border-[#00ff8830] flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-[#00ff88]" />
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-[#00ff88] bg-[#00ff8810] rounded-md">
                    {metric.category}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-tektur), sans-serif" }}
                >
                  {metric.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

And update your layout.tsx to include the Tektur font:

```tsx:src/app/layout.tsx
import type { Metadata } from "next";
import { Tektur } from "next/font/google";
import "./globals.css";

const tektur = Tektur({
  subsets: ["latin"],
  variable: "--font-tektur",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haurus | Professional Tennis Analytics",
  description: "The metrics bookmakers use. Now yours. Advanced tennis analytics powered by Glicko-2 ratings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={tektur.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

Make sure your `globals.css` includes the font variable fallback:

```css:src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-tektur: "Tektur", sans-serif;
}

body {
  font-family: var(--font-tektur), system-ui, sans-serif;
}