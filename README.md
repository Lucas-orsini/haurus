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

**How to get these values:**

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** and follow the steps
3. Wait for your project to be created (about 2 minutes)
4. In the left sidebar, click **Project Settings** (gear icon)
5. Click **API** in the settings menu
6. Copy the **Project URL** → paste into `NEXT_PUBLIC_SUPABASE_URL`
7. Copy the **anon public** key from the "Project API keys" table → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Project Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Project Settings → API → **anon public** row in "Project API keys" table | Anonymous (public) key — safe for client-side use with Row Level Security enabled |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code (like utility functions and components) work correctly without needing the whole app running.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth-validators.test.ts
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

**How to read Jest output:**
- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke. Jest will show which test failed and why (expected vs received value)

The test suite covers:
- Authentication validators and logic
- Dashboard utility functions
- Chart data formatting
- General utility helpers

## 📁 Project Structure

- `src/components/dashboard/player` — Player stats dashboard components including chart visualization

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add each variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

> ⚠️ **Important**: Make sure all environment variables are added in Vercel before deploying. Without them, your app will not connect to Supabase.

## 📝 License

MIT