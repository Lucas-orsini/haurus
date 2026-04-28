# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Player Search** — Component for searching and filtering players in the dashboard
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Project Settings → API → **anon public** row in "Project API keys" table | Anonymous (public) key — safe for client-side use with Row Level Security |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code (like functions) work correctly without needing the full app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/utils.test.ts
```

Watch mode (re-runs on file change):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — All tests in that file passed, everything works ✅
- `FAIL` — Something broke, you'll see which test failed and why ❌

**What gets tested:**
- Authentication validators (`auth-validators.test.ts`)
- Auth functionality (`auth.test.ts`)
- Dashboard formatting utilities (`dashboard/formatMetric.test.ts`)
- Dashboard stats library (`lib/dashboard/stats.test.ts`)
- General utility functions (`lib/utils.test.ts`, `utils.test.ts`)

## 📁 Project Structure

- `src/components/dashboard/player` — Dashboard player search component

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add your environment variables:
   - Go to **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase Project URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon public key
4. Click **Deploy**

> ⚠️ **Important**: Make sure all environment variables from your `.env.local` are added to Vercel, otherwise the app will crash on deployment.

## 📝 License

MIT