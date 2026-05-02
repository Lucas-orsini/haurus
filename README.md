# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **User Profile Management** — Modal interface for viewing and managing user profile data
- **Authentication** — Secure authentication powered by Supabase
- **Telegram Integration** — Webhook endpoints for connecting and disconnecting Telegram bots
- **Role-Based Access Control** — Configurable role limits for different user tiers
- **Metrics Dashboard** — Display and visualize key performance metrics with Recharts
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions

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

Create a `.env.local` file in the project root. This file stores sensitive credentials that your app needs to connect to external services.

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, Telegram, and other services.

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — safe to expose in browser
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role key — server-side only, never share this
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token — from @BotFather
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret — your custom secret for verifying webhook requests
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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → anon/public key | Public key for client-side authentication |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → service_role key | Server-side key that bypasses RLS (keep secret) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram → search **@BotFather** → send `/newbot` and follow the steps | Token for your Telegram bot |
| `TELEGRAM_BOT_SECRET` | Yes | Set this yourself when configuring your webhook (any random string) | Secret token to verify incoming webhook requests |

**How to get your Supabase values:**

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** → name it → wait ~2 minutes for setup
3. Click the **gear icon** (Project Settings) in the left sidebar
4. Click **API** in the settings menu
5. Copy **Project URL** → paste into `NEXT_PUBLIC_SUPABASE_URL`
6. In the "Project API keys" table, copy the **anon public** key → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. In the same table, copy the **service role** key → paste into `SUPABASE_SERVICE_ROLE_KEY`

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly — like making sure a math function returns the right number or a button does what it should.

### Run all tests

```bash
npm test
```

### Run a specific test file

```bash
npm test -- __tests__/auth-validators.test.ts
```

### Watch mode (re-runs tests automatically when you save a file)

```bash
npm test -- --watch
```

**How to read the output:**
- **PASS** ✅ — All tests in that file passed
- **FAIL** ❌ — Something broke; look at the error message below to see which test failed

**What the tests cover:**
- `auth-validators.test.ts` — Authentication validation logic
- `auth.test.ts` — Authentication flow
- `dashboard/formatMetric.test.ts` — Metric formatting for the dashboard
- `lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `lib/utils.test.ts` — General utility functions
- `utils.test.ts` — Application-wide utilities

## 📁 Project Structure

- `src/middleware.ts` — Next.js middleware for request handling (authentication, routing)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all the variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
5. Click **Deploy**

Your app will be live at a `vercel.app` URL within seconds.

## 📝 License

MIT