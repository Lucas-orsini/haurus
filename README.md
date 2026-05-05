# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Metrics Dashboard** — Track and visualize tennis player performance with interactive charts
- **Match History** — Browse detailed match results with surface and tournament filtering
- **Player Tracking** — Add players to your watchlist for quick access to their statistics
- **Responsive Design** — Tailwind CSS for modern, responsive layouts

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side key that bypasses Row Level Security |
| `TELEGRAM_BOT_TOKEN` | No | Open Telegram, search for [@BotFather](https://t.me/botfather), send `/newbot`, follow instructions, copy the token | Your Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | Create any random string (e.g., use a password generator) | Secret token for verifying Telegram webhook requests |

## 🧪 Running Tests

Unit tests automatically check that small pieces of your code work correctly — like making sure a math function returns the right answer.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/auth.test.ts

# Run tests in watch mode (re-runs when you save a file)
npx jest --watch
```

**Reading the output:**
- `PASS` — All tests passed, everything works ✅
- `FAIL` — Something broke, check the error message below for which test failed and why

**What the tests cover:**
- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows and session handling
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting utilities
- `__tests__/lib/dashboard/stats.test.ts` — Statistics calculation functions
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Shared utility functions

## 📁 Project Structure

- `src/components/dashboard/player` — Player dashboard components including metrics display, match history, player tracking, and statistics charts

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click "Add New..." → "Project" → import your GitHub repository
2. In the Vercel project settings, go to **Environment Variables**
3. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN` (if used)
   - `TELEGRAM_BOT_SECRET` (if used)
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add all environment variables in Vercel before deploying. The app will fail to build if Supabase keys are missing.

## 📝 License

MIT