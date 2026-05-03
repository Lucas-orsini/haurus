# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Telegram Webhook Integration** — Webhook endpoints for receiving and processing Telegram bot updates with HMAC-SHA256 signature verification
- **Secure Server-Side Operations** — Service role key usage for webhook endpoints that bypass Supabase Row Level Security
- **Authentication** — Secure authentication powered by Supabase
- **Role-Based Access Control** — Configurable role limits for different user tiers
- **Metrics Dashboard** — Display and visualize key performance metrics with Recharts
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions

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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, Telegram, and other services.

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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side key that bypasses RLS. Used for webhook endpoints without session cookies |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, chat with [@BotFather](https://t.me/botfather), use `/newbot` command, copy the token | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself — pick any random string | Secret token for HMAC-SHA256 webhook signature verification |

**Finding Supabase credentials:**
1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API**
5. Find **Project URL** (copy it for `NEXT_PUBLIC_SUPABASE_URL`)
6. Find **anon public** key under "API Keys" (copy it for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
7. Find **service_role secret** key under "API Keys" (copy it for `SUPABASE_SERVICE_ROLE_KEY`)

> ⚠️ Never share your `SUPABASE_SERVICE_ROLE_KEY` — it bypasses all security checks!

## 🧪 Running Tests

Unit tests automatically verify that individual parts of the code work correctly — like checking that a login function properly accepts valid passwords and rejects invalid ones.

Run all tests:
```bash
npx jest
```

Run a specific test file:
```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs tests automatically when files change):
```bash
npx jest --watch
```

**How to read Jest output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌. Jest will show which test failed and what went wrong (expected vs. actual value)

**Tests included:**
- `__tests__/auth.test.ts` — Authentication flow tests
- `__tests__/auth-validators.test.ts` — Authentication validation logic tests
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting tests
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics tests
- `__tests__/lib/utils.test.ts` — Utility function tests
- `__tests__/utils.test.ts` — General utility tests

## 📁 Project Structure

- `src/app/api/telegram/webhook/route.ts` — Telegram webhook API endpoint with HMAC-SHA256 signature verification

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add your environment variables in Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add each variable from `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_BOT_SECRET`
4. Click **Deploy**

Vercel auto-detects Next.js configuration. Your site will be live at a `vercel.app` URL once deployment completes.

## 📝 License

MIT