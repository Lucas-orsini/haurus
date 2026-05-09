# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Unsubscribe Management** — Allow users to unsubscribe from newsletters via a dedicated link
- **Newsletter Delivery** — Send newsletters to subscribers via admin API endpoint
- **Email Delivery** — Send transactional emails using Resend
- **PostHog Analytics Integration** — Track user behavior with PostHog, capturing page views and user interactions across the application
- **Supabase Integration** — Auth and database types powered by Supabase
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
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com

# === Resend (Email) ===
# Get your key from https://resend.com/api-keys
RESEND_API_KEY=
# Sender email — must be a verified domain in Resend Dashboard → Domains
# For dev, you can use onboarding@resend.dev (sends only to account owner)
RESEND_FROM_EMAIL=hello@yourdomain.com
# URL of the app (for unsubscribe links in emails)
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
| `TELEGRAM_BOT_TOKEN` | Optional | Open Telegram, chat with @BotFather, use `/newbot` command | Your Telegram bot token for sending messages |
| `TELEGRAM_BOT_SECRET` | Optional | You define this yourself (used for webhook HMAC verification) | A secret string you choose for verifying incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Optional | Your bot's username from @BotFather (e.g., "MyHaurusBot") | Used in the app to reference the bot |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://supabase.com) → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://supabase.com) → Project Settings → API → `anon` key | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | [Supabase Dashboard](https://supabase.com) → Project Settings → API → `service_role` key | Secret key for server-side admin operations |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials | For Google Sign-In functionality |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | [PostHog](https://posthog.com) → Project Settings → Project API Key | Your PostHog project API key for analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | Default: `https://eu.i.posthog.com` | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | [Resend](https://resend.com/api-keys) → Create API Key | API key for sending transactional emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard → Domains | Sender email address for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for local dev | Base URL of your application |

**For Supabase specifically**: Go to [supabase.com](https://supabase.com), sign in, select your project, click **Project Settings** (the gear icon), then click **API**. You'll see:
- `Project URL` → copy into `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → copy into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` secret key → copy into `SUPABASE_SERVICE_ROLE_KEY`

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code work correctly. The test output shows PASS when everything is working or FAIL when something broke.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth.test.ts
```

### Watch mode (re-runs automatically when files change)

```bash
npx jest --watch
```

**How to read the output**:
- `PASS` — all tests in that file passed ✅
- `FAIL` — something broke, look at the error message below for details

**What the tests cover**:
- `auth-validators.test.ts` — Email and password validation logic
- `auth.test.ts` — Authentication flow
- `dashboard/formatMetric.test.ts` — Number and metric formatting utilities
- `lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `lib/utils.test.ts` — Shared utility functions
- `utils.test.ts` — General utility functions

## 📁 Project Structure

- `src/app/api/unsubscribe` — API route for handling email unsubscribe requests
- `src/app/api/admin/newsletter` — API routes for newsletter management (send endpoint)
- `src/app/unsubscribe` — Unsubscribe page UI
- `src/lib/supabase` — Supabase database type definitions

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add all variables from your `.env.local` file (one by one)
5. Click **Deploy**

Make sure to add all environment variables from the table above — especially `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` which are critical for the app to work properly.

## 📝 License

MIT