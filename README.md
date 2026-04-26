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
- **Dashboard Overview** — Real-time searchable match table with expandable metrics panels

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

Open `.env.local` in your code editor and add the following:

```env
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

See the [Environment Variables](#-environment-variables) section below for where to find each value in the Supabase dashboard.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

After login, you will be redirected directly to the dashboard overview page at `/dashboard/overview`.

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

Your `.env.local` file should look like this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🧪 Running Tests

Unit tests verify that individual pieces of code (like utility functions or components) work correctly. When a test fails, it means something broke and needs fixing.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest path/to/file.test.ts

# Watch mode — re-runs tests on file changes
npx jest --watch
```

### Understanding test output

- **PASS** — All tests in that file passed, nothing is broken
- **FAIL** — Something broke, the error message shows which test failed and why
- A failing test displays the expected vs actual values so you can debug

Currently no test files exist. Tests would be added in `src/__tests__/` or colocated with components as `*.test.ts` or `*.test.tsx`.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── dashboard/
│   │   └── overview/       # Protected dashboard overview page (/dashboard/overview)
│   ├── login/              # Authentication page
│   └── page.tsx           # Landing page
├── components/             # Reusable UI components
├── lib/                    # Utilities, Supabase client, shared functions
├── hooks/                  # Custom React hooks
middleware.ts              # Route protection (redirect unauthenticated users)
```

## 📊 Dashboard Features

The dashboard overview page (`/dashboard/overview`) provides:

- **Match Table** — Displays all matches from Supabase `match_stats` table with columns: date, tournament, players, surface
- **Accordion Details** — Click any row to expand and view all match metrics in an animated panel
- **Real-time Search** — Filter matches instantly by player name (searches both players)
- **Combined Filters** — "Today" toggle and tournament dropdown filter results simultaneously
- **Route Protection** — Unauthenticated users are redirected to login

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. Push your code to GitHub (if not already done)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project**
4. Import your `haurus` repository
5. In the **Environment Variables** section, add both:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **Deploy**

Vercel will automatically build and deploy your app. Any future pushes to `main` will trigger a new deployment.

## 📝 License

MIT