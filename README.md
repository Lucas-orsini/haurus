# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Management** — Admin endpoint for sending newsletters to subscribers
- **Unsubscribe Landing Page** — Allow subscribers to unsubscribe from email communications
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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public key for client-side auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For Google OAuth sign-in |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Leave as `https://eu.i.posthog.com` | PostHog server endpoint |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys | Email delivery API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID |
| `NEXT_PUBLIC_APP_URL` | Yes | Local: `http://localhost:3000` / Production: your domain | App base URL |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather after creating a bot | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | Set manually — used for webhook signature verification | HMAC secret for webhook security |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username from @BotFather | Bot username for client-side use |

## 🧪 Running Tests

Unit tests automatically check that small pieces of code (like utility functions) work correctly without needing the full app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/utils.test.ts
```

Run tests in watch mode (re-runs automatically when files change):

```bash
npx jest --watch
```

**Understanding the output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke, with a summary of what failed and why

**Tests included:**
- Auth validators and authentication logic
- Dashboard utilities (formatting metrics, calculating stats)
- General utility functions

## 📁 Project Structure

- `src/app/api/admin/newsletter/send` — Admin API route for sending newsletters
- `__tests__` — Jest unit tests for auth, dashboard utilities, and general utils

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the "Deploy with Vercel" button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (if using Google OAuth)
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL` (set to your production URL)
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
5. Click **Deploy** — Vercel will automatically build and deploy your app

> ⚠️ **Important**: Make sure to set `NEXT_PUBLIC_APP_URL` to your actual production domain (e.g., `https://your-app.vercel.app`) before deploying, or email unsubscribe links will point to localhost.

## 📝 License

MIT