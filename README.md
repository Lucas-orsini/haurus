# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Metrics Dashboard** — Track and visualize tennis player performance with interactive charts
- **Match History** — Browse detailed match results with filtering
- **Responsive Design** — Tailwind CSS for modern, responsive layouts

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` `` (Windows/Linux) or `Cmd+`` ` `` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Client-side safe key for Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side key that bypasses RLS (keep secret) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram → Chat with [@BotFather](https://t.me/botfather) → Send `/newbot` → Follow prompts → Copy the token | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | Yes | Any random string you choose (e.g., use `openssl rand -hex 32`) | Secret used to verify incoming Telegram webhook requests |

**Finding Supabase credentials:**
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API**
5. Find **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
6. Find **anon/public** key under "Project API keys" (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
7. Find **service_role** key under "Project API keys" (for `SUPABASE_SERVICE_ROLE_KEY`)

## 🧪 Running Tests

Unit tests automatically check that small pieces of your code (like functions) work correctly. If you make changes, running tests helps you catch bugs before they reach your users.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

**Reading the output:**
- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke. Look at the error message below to see which test failed and why.

**Tests included:**
- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows and behavior
- `__tests__/dashboard/formatMetric.test.ts` — Dashboard metric formatting
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Common utility functions

## 📁 Project Structure

- `src/app/(auth)` — Authentication pages (login, signup) and shared auth layout

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the **Environment Variables** section, add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
4. Click **Deploy**

Vercel will automatically detect Next.js and configure the build settings for you.

## 📝 License

MIT