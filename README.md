# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **User Authentication** — Sign up and manage user accounts with Supabase
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
|----------|----------|------------------|-------------|
| `TELEGRAM_BOT_TOKEN` | Optional | Open Telegram, chat with @BotFather, create a bot with `/newbot`, copy the token | Bot API token for Telegram integration |
| `TELEGRAM_BOT_SECRET` | Optional | You define this yourself — it's a secret string you choose | HMAC-SHA256 secret for verifying incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Optional | Your bot's username from BotFather (e.g., "MyBot" if @MyBot) | Public bot username |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Go to [supabase.com](https://supabase.com) → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Go to [supabase.com](https://supabase.com) → Project Settings → API → `anon` key | Public API key for client-side requests |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Go to [supabase.com](https://supabase.com) → Project Settings → API → `service_role` key | Secret API key for server-side requests — never expose this to the client |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | Go to [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → Create OAuth 2.0 Client IDs | For "Sign in with Google" functionality |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | Go to [eu.posthog.com](https://eu.posthog.com) → Project Settings → Project API Key | PostHog project API key for analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | Use `https://eu.i.posthog.com` (EU cloud) or `https://app.posthog.com` (US cloud) | PostHog server URL |
| `RESEND_API_KEY` | Optional | Go to [resend.com/api-keys](https://resend.com/api-keys) → Create API Key | API key for sending emails via Resend |
| `RESEND_FROM_EMAIL` | Optional | Must be a domain verified in Resend Dashboard → Domains. For dev, use `onboarding@resend.dev` | Sender email address |
| `RESEND_AUDIENCE_ID` | Optional | Go to Resend Dashboard → Audiences → Settings → Copy Audience ID | Resend audience ID for email marketing |
| `NEXT_PUBLIC_APP_URL` | Yes | Use `http://localhost:3000` for local dev | Base URL of your application |

## 🧪 Running Tests

Tests automatically check that your app's logic works correctly. When a test **PASS**es, that part of the code is working as expected. When it **FAIL**s, something is broken — the error message shows exactly which test failed and why.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth-validators.test.ts
```

### Watch mode (re-runs automatically when you save a file)

```bash
npx jest --watch
```

### What the tests cover

- **auth-validators.test.ts** — Tests for authentication validation logic
- **auth.test.ts** — Tests for authentication flows
- **dashboard/formatMetric.test.ts** — Tests for metric formatting in the dashboard
- **lib/dashboard/stats.test.ts** — Tests for dashboard statistics
- **lib/utils.test.ts** — Tests for utility functions
- **utils.test.ts** — Tests for general utilities

## 📁 Project Structure

- **src/app/(auth)/signup** — Signup page and authentication routes

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all the environment variables from your `.env.local` file — each variable needs its own row with the name and value
5. Click **Deploy**

> ⚠️ **Important**: Make sure you add ALL environment variables to Vercel, especially `SUPABASE_SERVICE_ROLE_KEY` (keep it secret) and `NEXT_PUBLIC_SUPABASE_URL` (this one is safe to be public).

## 📝 License

MIT