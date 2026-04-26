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
- **Dashboard Overview** — Interactive match table with real-time search, tournament filters, and expandable metric details for each match

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

Open `.env.local` in your code editor and add your Supabase credentials:

```bash
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

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
4. In the left sidebar, click **Settings** (the gear icon)
5. Click **API** under the Settings menu
6. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
7. Copy the **anon public** key from the API keys table and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Required Supabase database setup

For the dashboard to work, create a `match_stats` table in your Supabase project with the following structure:

```sql
-- Run this in the Supabase SQL Editor (Tools → SQL Editor)

CREATE TABLE match_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  tournament TEXT NOT NULL,
  player1 TEXT NOT NULL,
  player2 TEXT NOT NULL,
  surface TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value_player1 NUMERIC,
  metric_value_player2 NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE match_stats ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all match data
CREATE POLICY "Authenticated users can read match_stats"
ON match_stats FOR SELECT
TO authenticated
USING (true);
```

Make sure you also enable **Email** authentication in your Supabase project under **Authentication → Providers**.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── (auth)/            # Auth-related pages (login, signup)
│   │   ├── dashboard/         # Protected dashboard pages
│   │   │   └── page.tsx       # Dashboard overview at /dashboard
│   │   ├── layout.tsx         # Root layout with fonts and providers
│   │   └── page.tsx           # Landing page
│   ├── components/             # Reusable React components
│   │   ├── ui/                # Base UI components
│   │   └── ...                # Feature-specific components
│   ├── lib/                   # Utilities and Supabase client setup
│   └── middleware.ts          # Auth protection middleware
├── public/                    # Static assets
├── .env.local                 # Environment variables (create from .env.example)
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json               # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Import your repository**
   - Click the deploy button above or go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository (`your-username/haraus`)
   - Vercel will auto-detect Next.js

2. **Add environment variables**
   - In the Vercel dashboard, go to **Settings → Environment Variables**
   - Add each variable from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

3. **Deploy**
   - Click **Deploy** — Vercel will build and deploy automatically
   - Each push to `main` triggers a new deployment

4. **Update Supabase allowed URLs**
   - Go to your Supabase dashboard → Authentication → URL Configuration
   - Add your Vercel deployment URL (e.g., `https://haraus.vercel.app`) to **Site URL** and **Redirect URLs**

## 📝 License

MIT