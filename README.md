# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard** — Visual analytics dashboard with chart components
- **Authentication** — Secure login and signup with Supabase
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Animations** — Smooth transitions with Framer Motion
- **Telegram Integration** — Bot notifications for real-time updates

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Testing**: Jest with React Testing Library
- **Auth & Database**: Supabase
- **Notifications**: Telegram Bot Integration

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — [Download here](https://nodejs.org/)
- **A code editor** — [VS Code](https://code.visualstudio.com/) recommended
- **Git installed**

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

Create a `.env.local` file in the project root. This file stores sensitive credentials that your app needs to connect to external services.

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase and other services.

To create this file, open your terminal and `cd` into your project folder and run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role key — server-side only, bypasses RLS completely
# Used by: /api/telegram/webhook (webhook has no session cookie, needs service role)
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token — https://core.telegram.org/bots/tutorial#creating-your-first-bot
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret token — configured when calling setWebhook with secret parameter.
# Used for HMAC-SHA256 signature verification on incoming webhook requests.
TELEGRAM_BOT_SECRET=
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Client-safe key for browser-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side key that bypasses RLS (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram → search **@BotFather** → send `/newbot` → follow prompts → copy the token | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself when setting up your webhook (any random string you choose) | Secret used to verify incoming webhook requests |

## 🧪 Running Tests

Tests are automated checks that make sure your code works correctly — they run pieces of your app and confirm the results match what you expect.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run in watch mode (re-runs automatically when files change):

```bash
npx jest --watch
```

**Reading test output:**
- `PASS` — Everything works correctly
- `FAIL` — Something broke. Look at the error message below for clues (which test failed and why)

**What the tests cover:**
- `__tests__/auth-validators.test.ts` — Validation rules for authentication inputs
- `__tests__/auth.test.ts` — Authentication flow logic
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting in the dashboard
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — Utility functions for the dashboard
- `__tests__/utils.test.ts` — General utility helpers (className merging, Tailwind handling)

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the **Environment Variables** section, add all variables from your `.env.local` file:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | (paste from .env.local) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (paste from .env.local) |
| `SUPABASE_SERVICE_ROLE_KEY` | (paste from .env.local) |
| `TELEGRAM_BOT_TOKEN` | (paste from .env.local) |
| `TELEGRAM_BOT_SECRET` | (paste from .env.local) |

4. Click **Deploy**

> ⚠️ **Important**: All environment variables must be added in Vercel before deploying, otherwise your app will crash on startup.

## 📝 License

MIT