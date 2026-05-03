# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Profile Dashboard** — Display player information and performance data with interactive components
- **Match Metrics Visualization** — Visualize and analyze match performance metrics using Recharts
- **Secure Authentication** — Secure authentication powered by Supabase with Row Level Security
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions and interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Testing**: Jest with React Testing Library
- **Auth & Database**: Supabase
- **Icons**: Lucide React

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

Create a `.env.local` file in the project root. This file stores sensitive credentials that your app needs to connect to external services.

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase and other services.

To create this file, open your terminal and run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role key — server-side only, bypasses RLS completely
# Used by: /api/telegram/webhook
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token — https://core.telegram.org/bots/tutorial#creating-your-first-bot
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret token — used for HMAC-SHA256 signature verification
TELEGRAM_BOT_SECRET=
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Anonymous key for client-side operations (safe with RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side key that bypasses Row Level Security |
| `TELEGRAM_BOT_TOKEN` | Yes | Telegram BotFather — message `/newbot` and follow the steps | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this when setting up your webhook | A secret string you choose for HMAC signature verification |

**Finding Supabase credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API** in the sidebar
5. Find **Project URL** and copy it to `NEXT_PUBLIC_SUPABASE_URL`
6. Find **anon/public** key under "Project API keys" and copy it to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Find **service_role** key (marked as "secret") and copy it to `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ Never share your `SUPABASE_SERVICE_ROLE_KEY` — it bypasses all security rules.

## 🧪 Running Tests

Unit tests check that small pieces of your code work correctly — like making sure a function returns the right result when given specific input.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth-validators.test.ts
```

### Watch mode (re-runs tests automatically when files change)

```bash
npx jest --watch
```

### Reading test output

- **PASS** — All assertions passed, the code works as expected
- **FAIL** — Something broke. Look for the error message and the line number to find the issue

The test suite covers: authentication validation, auth utilities, dashboard metric formatting, dashboard stats calculations, and utility functions.

## 📁 Project Structure

src/app — Next.js App Router pages, layouts, and API routes (including player-search endpoint)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step-by-step

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository (`haraus`)
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
5. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` once deployment completes.

> 💡 Make sure all environment variables are added — missing variables will cause runtime errors.

## 📝 License

MIT