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
# URL de base de l'app (pour les liens unsubscribe dans les emails)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public | Public anon key for client-side auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role | Server-side secret key (never expose to client) |
| `TELEGRAM_BOT_TOKEN` | No | Message @BotFather on Telegram → Create bot → Copy token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | You generate this yourself (any random string) | Secret for HMAC-SHA256 webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username (e.g., MyBot) | Used to identify your bot publicly |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | For "Sign in with Google" |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog instance URL (defaults to EU cloud) | PostHog server address |
| `RESEND_API_KEY` | No | Resend → API Keys → Create | Email delivery API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `NEXT_PUBLIC_APP_URL` | No | You choose (e.g., http://localhost:3000 in dev) | Base URL for email unsubscribe links |

**To find your Supabase keys:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Project Settings** in the left sidebar
4. Click **API**
5. Copy **Project URL** for `NEXT_PUBLIC_SUPABASE_URL`
6. Copy **anon public** key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Copy **service_role secret** for `SUPABASE_SERVICE_ROLE_KEY`

## 🧪 Running Tests

Unit tests check that small pieces of code (like functions) work correctly without needing the full app running.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth.test.ts
```

### Watch mode (re-runs tests automatically when you save)

```bash
npx jest --watch
```

**Reading the output:**
- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke. Look for the error message below showing which test failed and why

### What the tests cover

Based on the test files found in the project:

- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows
- `__tests__/dashboard/formatMetric.test.ts` — Dashboard metric formatting
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics utilities
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Common utility functions

## 📁 Project Structure

- `src/lib/email/` — Newsletter email utilities (newsletter sending logic)
- `src/components/dashboard/admin/` — Admin dashboard components (NewsletterEmailPreview)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Click the button above** or go to [vercel.com/new](https://vercel.com/new)
2. **Import your GitHub repository** — select your repo from the list
3. **Add your environment variables** — click "Environment Variables" and add each variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `NEXT_PUBLIC_APP_URL` (set to your production URL, e.g., `https://your-app.vercel.app`)
   - Any other variables you're using
4. **Click "Deploy"** — Vercel will build and deploy your app

> ⚠️ **Important**: Don't forget to add ALL environment variables from your `.env.local` to Vercel. If any are missing, the app may crash or features may stop working.

## 📝 License

MIT