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

# === App Base URL ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: open the integrated terminal with Ctrl+\` (or Cmd+\` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Supabase anonymous key (safe to expose in browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Supabase service role key — **never expose publicly** |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For "Sign in with Google" |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog → Project Settings → Project API Key | PostHog analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | PostHog → Project Settings → Project API Key | PostHog host URL |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys | Resend email API key |
| `RESEND_FROM_EMAIL` | Yes | Resend Dashboard → Domains | Verified sender email address |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather | Bot token for Telegram integration |
| `TELEGRAM_BOT_SECRET` | No | You set this yourself | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot username | Your bot's @username |
| `NEXT_PUBLIC_APP_URL` | Yes | You set this yourself | Base URL of your app (for email links) |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly — think of them as automated quality checks.

Run all tests:
```bash
npx jest
```

Run a specific test file:
```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when you change files):
```bash
npx jest --watch
```

**How to read the output:**
- `PASS` ✅ — everything works
- `FAIL` ❌ — something broke, check the error message below for details

**Tests cover:**
- Auth validators — validation logic for authentication
- Auth utilities — authentication helper functions
- Dashboard utilities — metric formatting and statistics calculations
- General utilities — shared helper functions

## 📁 Project Structure

- `src/lib/email` — Email sending utilities (newsletter)
- `src/app/api/admin/newsletter/send` — API route for sending newsletters
- `src/components/dashboard/admin` — Admin dashboard components (newsletter preview, send form)
- `src/app/dashboard/admin/newsletter` — Admin newsletter page

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to https://vercel.com/new
2. Import your GitHub repository
3. In **Environment Variables**, add every variable from your `.env.local` file:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Copy each variable name and value from `.env.local`
   - Click Save for each one
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add all environment variables before deploying. If you forget one, redeploy after adding it.

## 📝 License

MIT