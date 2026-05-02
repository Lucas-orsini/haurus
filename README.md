# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Tracking Dashboard** — Track and monitor player performance with detailed profiles
- **Authentication** — Secure user authentication powered by Supabase
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions
- **Reusable UI Components** — Modular component architecture with TypeScript

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
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings (gear icon) → API → **anon public** key | Anonymous (public) key — safe for client-side use with Row Level Security |

## 🧪 Running Tests

Unit tests automatically verify that individual functions and components work correctly. Think of it as a quality checker that runs instantly.

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

**How to read Jest output:**

- `PASS` — all assertions in that test file passed, the code works as expected
- `FAIL` — something broke, check the error message above for which test failed and why

**What the tests cover:**

- Auth validators and authentication logic
- Dashboard metrics formatting and calculations
- Utility functions and helpers

## 📁 Project Structure

- `src/components` — React components including player profile components

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Push your code to GitHub (if you haven't already)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Import Project** → select your repository
4. Vercel will auto-detect Next.js — click **Deploy**
5. Once deployed, go to **Settings** → **Environment Variables**
6. Add all variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click **Save** — Vercel will automatically rebuild with your env vars

> ⚠️ **Important**: Environment variables must be added in Vercel before the app will work. Without them, Supabase connections will fail.

## 📝 License

MIT