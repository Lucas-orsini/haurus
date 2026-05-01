# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Metrics Visualization** — Dashboard component for displaying educational metrics data
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions
- **Supabase Integration** — Real-time data with Row Level Security

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings (gear icon) → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings (gear icon) → API → **anon public** key | Anonymous (public) key — safe for client-side use with Row Level Security |

## 🧪 Running Tests

Jest runs unit tests to check that individual functions and components work correctly. Think of it as a quality checker that automatically verifies your code.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run in watch mode (re-runs on file change):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — All tests passed, your code works correctly
- `FAIL` — Something broke, you'll see which test failed and why

**Tests cover:**
- Auth validators (email/password validation logic)
- Authentication flows
- Dashboard metric formatting
- Dashboard statistics calculations
- Utility functions

## 📁 Project Structure

- `src/app` — Next.js App Router pages and layouts (contains global styles)
- `__tests__` — Jest test files for auth, dashboard, and utilities

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Import Project** and select your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add your environment variables in Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your anon key
6. Click **Deploy**

Your app will be live at a `.vercel.app` URL within seconds.

## 📝 License

MIT