# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Metrics Visualization** — Interactive dashboard displaying key performance indicators and statistics
- **Dashboard Components** — Reusable React components for displaying matches and metrics
- **Secure Authentication** — Secure authentication powered by Supabase with Row Level Security
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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key | Server-side key that bypasses RLS (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, chat with [@BotFather](https://t.me/BotFather), send `/newbot`, follow prompts | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself — any random string you choose | Secret used to verify incoming Telegram webhook requests |

**Finding Supabase credentials:**
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API**
5. Copy **Project URL**, **anon/public** key, and **service_role** key

## 🧪 Running Tests

Unit tests automatically check that small pieces of your code work correctly — like making sure a calculation returns the right number.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

**Understanding test output:**
- **PASS** ✅ — All tests in that file passed
- **FAIL** ❌ — Something broke; look at the error message below for what went wrong

The test suite covers:
- Authentication validators
- Auth utilities
- Dashboard metric formatting
- Dashboard statistics
- General utilities

## 📁 Project Structure

- src/components/dashboard — Dashboard React components (DashboardOverview, MatchRow)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add your environment variables in Vercel:
   - Go to **Settings** → **Environment Variables**
   - Add each variable from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_BOT_SECRET`
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add all environment variables listed above before deploying. If you miss `SUPABASE_SERVICE_ROLE_KEY`, the Telegram webhook endpoint will fail.

## 📝 License

MIT