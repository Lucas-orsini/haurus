# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Analytics** — View metrics and statistics in a clean dashboard interface
- **Newsletter Management** — Send newsletters to subscribers via a dedicated admin panel
- **Email Delivery** — Send transactional emails using Resend
- **PostHog Analytics Integration** — Track user behavior with PostHog, capturing page views and user interactions across the application
- **Supabase Integration** — Auth and database powered by Supabase
- **Telegram Bot Support** — Webhook verification for Telegram bot integration

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Icons**: Lucide React
- **Charts**: Recharts
- **Auth & Database**: Supabase
- **Email**: Resend
- **Analytics**: PostHog
- **Testing**: Jest with React Testing Library

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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, PostHog, Resend, and other services.

To create this file, open your terminal and `cd` into your project folder and run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# === Telegram Bot (optional) ===
# Get your bot token from @BotFather on Telegram
# https://core.telegram.org/bots/tutorial#creating-your-first-bot
TELEGRAM_BOT_TOKEN=
# Used for HMAC-SHA256 signature verification on incoming webhook requests
TELEGRAM_BOT_SECRET=
# Your bot's username (e.g., if your bot is @MyBot, enter "MyBot")
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=

# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# === Google OAuth (optional — for Sign in with Google) ===
NEXT_PUBLIC_GOOGLE_CLIENT_ID=

# === PostHog Analytics ===
# Get your key from https://eu.posthog.com → Project Settings → Project API Key
NEXT_PUBLIC_POSTHOG_KEY=phc_mX5zZik7gN24hgZvaTWjatGkXjitkECEjzxstjYe2Xmm
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com

# === Resend (Email) ===
# Get your key from https://resend.com/api-keys
RESEND_API_KEY=
# Sender email — must be a verified domain in Resend Dashboard → Domains
# For dev, you can use onboarding@resend.dev (sends only to account owner)
RESEND_FROM_EMAIL=hello@yourdomain.com

# === App URL ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: open the integrated terminal with Ctrl+` (or Cmd+` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `TELEGRAM_BOT_TOKEN` | Optional | Open Telegram, chat with [@BotFather](https://t.me/botfather), send `/newbot`, follow steps, copy the token | Telegram bot API token for sending messages and handling updates |
| `TELEGRAM_BOT_SECRET` | Optional | Create a secret token yourself (any random string) | Used for HMAC-SHA256 signature verification on incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Optional | Your bot's username on Telegram (e.g., `MyAwesomeBot`) | Public username of your Telegram bot |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://supabase.com) → Project Settings → API → Project URL | Supabase project URL for authentication and database |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://supabase.com) → Project Settings → API → Project API keys → `anon` / `public` key | Public anon key for client-side Supabase operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | [Supabase Dashboard](https://supabase.com) → Project Settings → API → Project API keys → `service_role` key | Secret service role key for server-side admin operations |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → OAuth 2.0 Client IDs | Google OAuth client ID for "Sign in with Google" |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | [PostHog](https://eu.posthog.com) → Project Settings → Project API Key | PostHog project API key for analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | PostHog self-host URL or cloud URL | PostHog server host URL |
| `RESEND_API_KEY` | Yes | [Resend](https://resend.com/api-keys) → Create API Key → copy | Resend API key for sending transactional emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a domain verified in [Resend Dashboard](https://resend.com/domains) → Domains | Sender email address for newsletters and notifications |
| `NEXT_PUBLIC_APP_URL` | Yes | `http://localhost:3000` for local dev, or your production URL | Base URL of your application |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly. They run instantly and catch bugs before they reach your app.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth-validators.test.ts
```

Watch mode (re-runs on file change during development):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌, the error message shows which test failed and why

**Tests included:**
- `__tests__/auth-validators.test.ts` — Auth validation logic
- `__tests__/auth.test.ts` — Authentication flow tests
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting utilities
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics logic
- `__tests__/lib/utils.test.ts` — Utility function tests
- `__tests__/utils.test.ts` — General utility tests

## 📁 Project Structure

Only folders containing actual files from this repository are listed below.

- `src/app` — Next.js App Router pages and layouts (includes dashboard/admin/newsletter page)
- `__tests__` — Jest test files for components, utilities, and services

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click **"Import Git Repository"** and select your repo
4. Vercel will auto-detect Next.js — click **Deploy**
5. Add all environment variables:
   - Go to your project → **Settings** → **Environment Variables**
   - Add each variable from `.env.local` (copy all the keys and values)
6. Redeploy: **Deployments** → **..."** menu → **Redeploy**

> ⚠️ **Important**: Every variable from your `.env.local` must be added to Vercel, or your app will crash. Pay special attention to `SUPABASE_SERVICE_ROLE_KEY` — this is a secret key and should be marked as **"Secret"** not "Plain".

## 📝 License

MIT