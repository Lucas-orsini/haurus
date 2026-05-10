# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Management** — Send newsletters to subscribers via a dedicated admin form; subscribers can unsubscribe from email communications
- **Email Delivery** — Send transactional emails using Resend with customizable sender addresses and audience management
- **Supabase Integration** — Auth and database powered by Supabase

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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, Resend, and other services.

To create this file, open your terminal and `cd` into your project folder and run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

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

# === Google OAuth (optional — for Sign in with Google) ===
NEXT_PUBLIC_GOOGLE_CLIENT_ID=

# === Telegram Bot (optional) ===
# Get your bot token from @BotFather on Telegram
# https://core.telegram.org/bots/tutorial#creating-your-first-bot
TELEGRAM_BOT_TOKEN=
# Used for HMAC-SHA256 signature verification on incoming webhook requests
TELEGRAM_BOT_SECRET=
# Your bot's username (e.g., if your bot is @MyBot, enter "MyBot")
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac), then run the commands above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public key for Supabase client (safe to expose) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Secret key for admin operations (never expose) |
| `RESEND_API_KEY` | Yes | [Resend API Keys](https://resend.com/api-keys) | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard → Audiences → Settings | ID of your email audience |
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployed app URL | Base URL used in email links |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | [PostHog](https://eu.posthog.com) → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | OAuth client ID for Google Sign-In |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather after creating your bot | Bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | You define this when setting up webhooks | Secret for HMAC signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username on Telegram | Bot username (without @) |

## 🧪 Running Tests

Tests automatically check that key parts of the app work correctly — think of them as a robot that clicks buttons and types text to make sure nothing is broken.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/utils.test.ts

# Watch mode — re-runs tests automatically when you save a file
npx jest --watch
```

**How to read the output:**
- **PASS** ✅ — All checks passed, everything works
- **FAIL** ❌ — Something broke, check the error message below for details

The test suite covers:
- Authentication validators and logic
- Utility functions (class merging, string formatting)
- Dashboard formatting helpers
- Stats calculation helpers

## 📁 Project Structure

- `src/lib/email` — Email utilities including newsletter sending logic
- `src/components/dashboard/admin` — Admin dashboard components for newsletter management
- `src/components/layout` — Shared layout components (footer, etc.)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file (copy them one by one)
5. Click **Deploy**

Make sure to add `NEXT_PUBLIC_APP_URL` with your production URL (e.g., `https://your-app.vercel.app`) instead of `http://localhost:3000`.

## 📝 License

MIT