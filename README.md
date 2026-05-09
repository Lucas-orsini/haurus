# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Management** — Send newsletters via Resend with unsubscribe functionality
- **Email Delivery** — Transactional emails powered by Resend
- **Supabase Integration** — Auth and database powered by Supabase
- **PostHog Analytics** — Track user behavior with PostHog analytics
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
# Resend Audience ID — find it in Resend Dashboard → Audiences → Settings
RESEND_AUDIENCE_ID=
# Base URL of your app (for unsubscribe links in emails)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public key for client-side auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Secret key for server-side operations (never expose to client) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | For Google Sign-In functionality |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Your PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Default provided | PostHog server URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings → Audience ID | Audience ID for email campaigns |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for local dev | Base URL for generating unsubscribe links |
| `TELEGRAM_BOT_TOKEN` | No | Chat with @BotFather on Telegram → /newbot | Your Telegram bot token |
| `TELEGRAM_BOT_SECRET` | No | You define this yourself — used for HMAC-SHA256 webhook verification | Secret string for verifying Telegram webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username from @BotFather (e.g., "MyBot") | Telegram bot username |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your code work correctly — think of them as quality gates that verify functions return the right results.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/lib/utils.test.ts
```

Watch mode (re-runs tests automatically when you save a file):

```bash
npx jest --watch
```

**Understanding test output:**

- **PASS** ✅ — All tests in that file passed successfully
- **FAIL** ❌ — Something broke. The output shows which test failed and why (expected vs. actual values)

The test suite covers:

- `auth-validators.test.ts` — Authentication validation logic
- `auth.test.ts` — Authentication flow tests
- `dashboard/formatMetric.test.ts` — Metric formatting utilities
- `lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `lib/utils.test.ts` — General utility functions
- `utils.test.ts` — Shared utility functions

## 📁 Project Structure

`src/lib/email` — Email utilities including newsletter sender

`__tests__` — Jest test files for auth, dashboard, and utilities

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the "Deploy with Vercel" button above (or go to vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from your `.env.local` file:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Copy each variable name and value from `.env.local`
4. Click "Deploy"

> ⚠️ **Important**: Make sure all environment variables are added to Vercel, especially `SUPABASE_SERVICE_ROLE_KEY` (mark it as a **Server** variable, not Environment).

## 📝 License

MIT