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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → Anonymous Key | Public-facing API key (safe for client-side use) |

## 🔐 Authentication Flow

The app uses Supabase Auth with a protected dashboard route. Here's how it works:

### Login → Dashboard Redirect

When a user successfully logs in, they are automatically redirected to `/dashboard`.

### Dashboard Protection

- **Authenticated users**: Access `/dashboard` directly via URL — they stay on the dashboard
- **Unauthenticated users**: Attempting to access `/dashboard` are redirected to `/login`
- **After login**: Users are redirected back to `/dashboard`

### OAuth & Magic Link Callbacks

When using OAuth providers or magic links:

1. Supabase processes the auth and calls your callback URL
2. The callback handler exchanges the auth code for a session
3. The user is redirected to `/dashboard`

### Route Protection Implementation

The app uses Next.js middleware to check the Supabase session on protected routes:

- Middleware runs on every request to `/dashboard/*`
- It validates the Supabase session cookie
- If valid → allow access to the page
- If invalid/missing → redirect to `/login`

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, signup, callback)
│   │   ├── dashboard/          # Protected dashboard page
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utilities and Supabase client helpers
│   └── middleware.ts          # Auth route protection
├── public/                    # Static assets
├── .env.local                 # Environment variables (create from .env.example)
└── package.json               # Dependencies and scripts
```

### Key Files

- `src/middleware.ts` — Protects `/dashboard` routes by checking Supabase session
- `src/lib/supabase/` — Client utilities for server and browser contexts
- `src/app/(auth)/login/page.tsx` — Login page with Supabase auth

## 🚀 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deploy Steps

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Import Project" and select your repository
4. Vercel will auto-detect Next.js — click "Deploy"
5. After deployment, go to Settings → Environment Variables
6. Add all variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Redeploy to apply the environment variables

## 📝 License

MIT