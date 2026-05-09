# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Unsubscribe** — Allow subscribers to unsubscribe from email communications with a dedicated landing page
- **Supabase Integration** — Auth and database powered by Supabase
- **PostHog Analytics Integration** — Track user behavior with PostHog analytics
- **Telegram Bot Support** — Webhook verification for Telegram bot integration
- **Email Delivery** — Send transactional emails using Resend

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

> 💡 **VS Code tip**: open the integrated terminal with Ctrl+` (or Cmd+` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|---|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Optional | Open Telegram, chat with @BotFather, create a bot, copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Optional | You define this yourself — it's a secret string you choose | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Optional | Your bot's username on Telegram (e.g., `MyBot`) | Bot username for public references |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public | Public API key for client-side auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role | Server-side API key (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Google OAuth client ID |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | PostHog analytics key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Default: `https://eu.i.posthog.com` | PostHog server host |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | Resend email API key |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard → Audiences → your audience → Settings | Email audience ID |
| `NEXT_PUBLIC_APP_URL` | Yes | `http://localhost:3000` for dev | Base URL for unsubscribe links |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your code work correctly — like making sure a login function handles wrong passwords properly.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/auth.test.ts

# Watch mode — re-runs tests automatically when you save a file
npx jest --watch
```

**How to read the output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌, check the error message below for details

The test suite covers:
- Auth validation logic (`__tests__/auth-validators.test.ts`)
- Authentication flow (`__tests__/auth.test.ts`)
- Dashboard metric formatting (`__tests__/dashboard/formatMetric.test.ts`)
- Dashboard statistics (`__tests__/lib/dashboard/stats.test.ts`)
- Utility functions (`__tests__/lib/utils.test.ts`, `__tests__/utils.test.ts`)

## 📁 Project Structure

- `src/app` — Next.js App Router pages, layouts, and API routes (newsletter send endpoint, auth pages)

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all the variables from your `.env.local` file (one by one or paste them in bulk)
5. Click **Deploy**

Make sure to add all variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`, and any others your app uses.

## 📝 License

MIT