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
- **Secure Authentication** — User account creation and login with email/password powered by Supabase Auth

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Tektur (Google Fonts via next/font/google)
- **Auth & Database**: Supabase (Auth + PostgreSQL)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended
- Git installed
- A Supabase account — [Sign up free](https://supabase.com)

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

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

Open `.env.local` in your code editor and add your Supabase credentials. See the [Environment Variables](#-environment-variables) section below for where to find each value.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → Project API keys (table row "anon public") | Anonymous (public) key — safe for client-side use with Row Level Security |

### How to get your Supabase credentials

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** and follow the steps to create a new Supabase project
3. Wait for your project to be created (this takes about 2 minutes)
4. In the left sidebar, click **Settings** (the gear icon ⚙️)
5. Click **API** in the settings menu
6. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
7. In the same page, find the table "Project API keys" and copy the **anon public** key
8. Paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Your `.env.local` should look like this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router — pages and layouts
│   ├── layout.tsx          # Root layout (fonts, providers, metadata)
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles + Tailwind imports
├── components/             # Reusable UI components
│   ├── Navbar.tsx          # Navigation bar with logo and CTA button
│   ├── Hero.tsx            # Hero section
│   ├── Pricing.tsx         # Pricing tiers (Starter, Analyst, Pro)
│   ├── Features.tsx        # Features showcase
│   └── Footer.tsx          # Footer
├── lib/                    # Utility functions and helpers
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
└── providers/              # React context providers
    └── SupabaseProvider.tsx  # Supabase client provider
```

## 🚀 Deploy to Vercel

The easiest way to deploy your Haurus app is with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step-by-step deployment

1. **Import your GitHub repository**
   - Click "Import Git Repository" on Vercel
   - Select your `haraus` repository from the list
   - Vercel will auto-detect Next.js settings

2. **Add your environment variables**
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - Make sure both are set for **Production**, **Preview**, and **Development** environments

3. **Deploy**
   - Click **Deploy** — Vercel will build and deploy your app
   - Your live URL will be shown (e.g., `https://haraus.vercel.app`)

> ⚠️ **Important**: Don't forget to add your Supabase environment variables in Vercel. Without them, authentication won't work in production.

## 📝 License

MIT