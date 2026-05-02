# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure user authentication powered by Supabase
- **Profile Management** — Edit and update your user profile with an intuitive form
- **Settings Dashboard** — Manage your account settings from a dedicated settings page
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth & Database**: Supabase
- **Testing**: Jest with React Testing Library

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — [Download here](https://nodejs.org/)
- **A code editor** — [VS Code](https://code.visualstudio.com/) recommended
- **Git installed**

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

If you're new to this: open VS Code, press `` Ctrl+N `` (or `` Cmd+N `` on Mac) to create a new file, then save it as `.env.local` in the project folder.

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

Unit tests automatically verify that individual pieces of your app (like helper functions) work correctly. If a test fails, it means something broke.

**Run all tests:**

```bash
npx jest
```

**Run a specific test file:**

```bash
npx jest __tests__/auth-validators.test.ts
```

**Watch mode (re-runs on file change):**

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — all tests in that file passed ✅
- `FAIL` — something broke, check the error message below for details

**What the tests cover:**

- `__tests__/auth-validators.test.ts` — Validation logic for authentication inputs
- `__tests__/auth.test.ts` — Authentication flow and user session handling
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting in the dashboard
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — Utility functions used across the app
- `__tests__/utils.test.ts` — General purpose utilities

## 📁 Project Structure

- `src/lib` — Supabase client setup and authentication utilities
- `src/app` — Next.js App Router pages and API routes
- `src/components` — React components (dashboard UI components)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Push your code to GitHub (if you haven't already)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Import Project** → select your repository
4. Vercel auto-detects Next.js — just click **Deploy**
5. Add your environment variables:
   - Go to your project → **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase project URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your anon public key
6. Redeploy (Vercel will trigger a new deploy automatically after adding env vars)

> ⚠️ **Important**: All environment variables from your `.env.local` must be added to Vercel, otherwise your app will crash at runtime.

## 📝 License

MIT