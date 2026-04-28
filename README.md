# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Stats Visualization** — Interactive charts displaying player performance metrics with Recharts
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
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root. This file stores sensitive credentials that your app needs to connect to Supabase. You can create it from your terminal:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

**How to get these values (step by step for no-code users):**

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account — it's free)
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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Project Settings (gear icon) → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Project Settings (gear icon) → API → **anon public** row in the "Project API keys" table | Anonymous (public) key — safe for client-side use with Row Level Security enabled |

## 🧪 Running Tests

Unit tests are small, fast checks that verify a specific piece of code works correctly — for example, that a function returns the right output for a given input.

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

**How to read the output:**
- `PASS` ✅ — The test passed, everything works correctly
- `FAIL` ❌ — Something broke, check the error message below for details

**What gets tested:**
- Auth validators and authentication logic
- Dashboard metric formatting
- Statistics utilities
- General utility functions

## 📁 Project Structure

src/components/dashboard/player — Player profile dashboard components

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Push your code to GitHub (if you haven't already)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → select your repository
4. Vercel will auto-detect Next.js — click **Deploy**
5. Add your environment variables:
   - Go to your project → **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase project URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon key
6. Redeploy: go to **Deployments** → click the **...** menu → **Redeploy**

## 📝 License

MIT