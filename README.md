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
- **Dashboard Overview** — Interactive match table with real-time search, date and tournament filters, and expandable metrics panels for each match

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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

See the [Environment Variables](#-environment-variables) section below for where to find each value.

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
5. Click **API** in the settings menu
6. Copy the **Project URL** and paste it into `NEXT_PUBLIC_SUPABASE_URL`
7. Copy the **anon public** key from the API keys table and paste it into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Database setup

Create a `match_stats` table in your Supabase project with the following columns:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| date | date | Match date |
| tournament | text | Tournament name |
| player1 | text | First player name |
| player2 | text | Second player name |
| surface | text | Playing surface (hard, clay, grass) |
| metrics | jsonb | Match metrics data |

Enable Row Level Security (RLS) and create a policy that allows authenticated users to read from this table.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── dashboard/          # Dashboard section (protected)
│   │   └── overview/      # Overview page (/dashboard/overview)
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components
│   └── dashboard/         # Dashboard-specific components
├── lib/                   # Utilities and Supabase client
│   └── supabase/          # Supabase client setup
└── styles/               # Global styles
```

Key folders:

- `src/app/dashboard/overview/page.tsx` — Dashboard Overview page with match table, search, and filters
- `src/components/` — Reusable components including the match table and accordion panels
- `src/lib/supabase/` — Supabase client configuration for server and client components
- `src/app/layout.tsx` — Root layout with authentication provider

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step deployment

1. **Push your code to GitHub** — if you haven't already, create a GitHub repo and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/haraus.git
git push -u origin main
```

2. **Import to Vercel** — Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository

3. **Configure environment variables** — In the Vercel dashboard, go to your project → Settings → Environment Variables and add:

- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon key

4. **Deploy** — Click **Deploy** and wait for the build to complete

5. **Test your deployment** — Open the provided URL and verify the app loads correctly

> ⚠️ **Important**: Make sure all environment variables from your `.env.local` are also added to Vercel, otherwise the app will not work properly.

## 📝 License

MIT