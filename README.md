# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Metric Cards** — Interactive display of player performance metrics
- **Match History Table** — Sortable table view showing all player match history
- **Supabase Integration** — Client-side Supabase setup with SSR support for data storage
- **TypeScript** — Fully typed codebase for better developer experience
- **Responsive Design** — Mobile-first Tailwind CSS styling

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth & Database**: Supabase
- **Charts**: Recharts
- **Testing**: Jest with React Testing Library

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

Create a `.env.local` file in the project root. This file stores sensitive credentials that your app needs to connect to Supabase.

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

**How to get these values (step by step for no-code users):**

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** and follow the setup steps
3. Wait about 2 minutes for your project to be created
4. In the left sidebar, click the **gear icon** (Project Settings)
5. Click **API** in the settings menu
6. Find **Project URL** at the top → copy it → paste into `NEXT_PUBLIC_SUPABASE_URL`
7. In the "Project API keys" table, copy the **anon public** key → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings (gear icon) → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings (gear icon) → API → **anon public** key | Anonymous (public) key — safe for client-side use with Row Level Security enabled |

## 🧪 Running Tests

Unit tests automatically verify that specific parts of the code work correctly — like a spell checker for your app's logic.

**Run all tests:**

```bash
npx jest
```

**Run a specific test file:**

```bash
npx jest __tests__/auth.test.ts
```

**Watch mode (re-runs on file change):**

```bash
npx jest --watch
```

**Understanding the output:**

- **PASS** — All tests in that file passed ✓
- **FAIL** — Something broke; the error message shows which test failed and why

**What the tests cover:**

- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting utilities
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Common utility functions

## 📁 Project Structure

- `src/lib` — Type definitions and utility functions
- `src/components/dashboard/player` — Player metric cards and match history table components

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, add your environment variables:
   - Go to **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase project URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon key
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add all `.env.local` variables in Vercel before deploying, otherwise your app won't connect to Supabase.

## 📝 License

MIT