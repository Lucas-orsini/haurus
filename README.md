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
- **Protected Dashboard** — All routes under `/dashboard/*` require an active session; unauthenticated users are automatically redirected to the login page
- **Smart Redirects** — Authenticated users are redirected away from login/signup pages to `/dashboard/overview`; users are automatically routed to `/dashboard/overview` after successful login
- **Persistent Sessions** — User session is maintained across page reloads and browser refreshes using Supabase SSR cookies
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → anon/public key | Anonymous key for client-side auth (safe with Row Level Security) |

## 🔐 Authentication Flow

This app implements automatic route protection and smart redirects:

| User state | Accessing | Redirected to |
|------------|-----------|--------------|
| Not logged in | Any `/dashboard/*` route | `/login` |
| Logged in | `/login` or `/signup` | `/dashboard/overview` |
| Not logged in | `/` (home) | Redirects based on auth state |
| Logged in | After successful login | `/dashboard/overview` |

**Session persistence**: Your login state is preserved across page reloads and browser refreshes using secure HTTP cookies set by Supabase SSR.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── (auth)/            # Auth group: login, signup pages
│   │   ├── dashboard/         # Protected dashboard routes
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Home/landing page
│   ├── components/            # Reusable React components
│   │   ├── auth/              # Auth-related components (LoginButton, etc.)
│   │   └── ui/                # Generic UI components
│   ├── lib/                   # Utilities and Supabase client setup
│   │   ├── supabase/          # Supabase client configs (server, browser, middleware)
│   │   └── utils.ts           # Helper functions (cn for class merging, etc.)
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── .env.local                 # Local environment variables (gitignored)
├── .env.example               # Template for environment variables
├── supabase/                  # Supabase migrations and edge functions
├── tailwind.config.ts         # Tailwind CSS configuration
└── next.config.ts             # Next.js configuration
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Push your code to GitHub** if you haven't already
2. **Import to Vercel** — Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository
3. **Add environment variables** — In Vercel dashboard, go to Settings → Environment Variables and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. **Deploy** — Click Deploy and wait for the build to complete

Your app will be live at `https://your-project.vercel.app`.

> ⚠️ **Important**: Make sure to add both environment variables in Vercel before deploying. The Supabase connection will not work without them.

## 📝 License

MIT