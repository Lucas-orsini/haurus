# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Dashboard** — Admin interface to compose, preview, and send email newsletters to your audience
- **Email Preview** — Preview how your newsletter emails will look before sending them
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
| `TELEGRAM_BOT_TOKEN` | Optional | Message @BotFather on Telegram, click "/mybots", select your bot, copy the token | Telegram bot API token for sending/receiving messages |
| `TELEGRAM_BOT_SECRET` | Optional | You define this yourself — it's a secret you choose | HMAC-SHA256 secret for verifying incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Optional | Your bot's username from Telegram (e.g., `@MyBot`) | Used for webhook signature verification |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → Project API Key (anon/public) | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → Project API Key (service_role) | Server-side secret key — never expose to client |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | Google Cloud Console → APIs & Services → Credentials | For Sign in with Google feature |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog → Project Settings → Project API Key | PostHog project API key for analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Use `https://eu.i.posthog.com` for EU hosting | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Resend Dashboard → Domains → add and verify your domain | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard → Audiences → click your audience → Settings | Audience ID for managing subscribers |
| `NEXT_PUBLIC_APP_URL` | Yes | Set `http://localhost:3000` for local dev | Base URL used in email links |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly. They help catch bugs before you deploy.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth-validators.test.ts
```

Watch mode (re-runs on file change):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — all tests in that file passed ✓
- `FAIL` — something broke ✗, you'll see which test failed and why

**What the tests cover:**
- `__tests__/auth-validators.test.ts` — validation logic for authentication
- `__tests__/auth.test.ts` — authentication flows and behavior
- `__tests__/dashboard/formatMetric.test.ts` — metric formatting in the dashboard
- `__tests__/lib/dashboard/stats.test.ts` — statistics calculations
- `__tests__/lib/utils.test.ts` — general utility functions
- `__tests__/utils.test.ts` — common utility functions

## 📁 Project Structure

- `src/app` — Next.js App Router pages and API routes
- `src/app/api/admin/newsletter/send` — API endpoint for sending newsletters
- `src/app/dashboard/admin/newsletter` — Admin newsletter page
- `src/components/dashboard/admin` — Reusable dashboard components for admin features
- `src/lib/email` — Email utility functions (newsletter sending logic)

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the "Deploy" button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file (copy them one by one)
5. Click **Deploy**

> ⚠️ **Important**: Make sure to add ALL environment variables from `.env.local` in Vercel, especially `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY`, or the app will fail to send emails and access protected data.

## 📝 License

MIT