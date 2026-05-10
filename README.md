# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Management** — Send newsletters to subscribers with a dedicated admin form and email preview
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
# === Telegram Bot ===
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
| `TELEGRAM_BOT_TOKEN` | Yes* | Open Telegram, chat with @BotFather, create a bot and copy the token | Telegram bot API token for sending messages and handling webhooks |
| `TELEGRAM_BOT_SECRET` | Yes* | You define this yourself — it's used to verify incoming webhook requests | Secret key for HMAC-SHA256 signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Yes* | Your bot's username on Telegram (without the @ symbol) | Bot username used for webhook configuration |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public anon key for client-side queries |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side secret key for admin operations |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | OAuth client ID for Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | PostHog analytics project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Provided by PostHog — use `https://eu.i.posthog.com` | PostHog server URL |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard → Audiences → click audience → Settings | Audience ID for managing email subscribers |
| `NEXT_PUBLIC_APP_URL` | Yes | You define this — use `http://localhost:3000` for dev | Base URL of your app for email links |

*Only required if using Telegram bot features

## 🧪 Running Tests

Unit tests verify that small pieces of code work correctly — they check that functions return the right results.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs tests automatically when you save changes):

```bash
npx jest --watch
```

**Reading Jest output:**
- `PASS` — all tests passed, nothing is broken
- `FAIL` — something broke, you'll see which test failed and why (expected vs received value)

**Tests included:**
- `auth-validators.test.ts` — authentication validation logic
- `auth.test.ts` — authentication flows and behavior
- `dashboard/formatMetric.test.ts` — metric formatting utilities
- `lib/dashboard/stats.test.ts` — dashboard statistics calculations
- `lib/utils.test.ts` — general utility functions
- `utils.test.ts` — common utility functions

## 📁 Project Structure

- `src/app` — Next.js App Router pages and layouts (includes unsubscribe functionality)
- Root config files — TypeScript, Tailwind, PostCSS, Jest, ESLint, and Next.js configuration

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to https://vercel.com/new
2. Import your GitHub repository
3. Add all environment variables in Vercel dashboard → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - For `NEXT_PUBLIC_*` variables, make sure to set them as "Public" environment variables
4. Click Deploy

> ⚠️ **Important**: Don't forget to add ALL environment variables in Vercel. If you miss any, your app may fail to build or run incorrectly.

## 📝 License

MIT