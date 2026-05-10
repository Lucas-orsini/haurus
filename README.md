# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Management** — Send email newsletters with unsubscribe capabilities
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
| `TELEGRAM_BOT_TOKEN` | Optional | Open Telegram, chat with [@BotFather](https://t.me/botfather), send `/newbot`, follow prompts | Bot API token for your Telegram bot |
| `TELEGRAM_BOT_SECRET` | Optional | You choose this — it's a secret key for HMAC-SHA256 webhook verification | Webhook signature verification secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Optional | Your bot's username from BotFather (e.g., `MyBot`) | Public bot username |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key (safe to expose) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Admin key — never expose this to the browser |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | For "Sign in with Google" |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog → Project Settings → Project API Key | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Defaults to `https://eu.i.posthog.com` (EU hosting) | PostHog server URL |
| `RESEND_API_KEY` | Yes | Resend → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend → Audiences → click your audience → Settings | Email audience/list ID |
| `NEXT_PUBLIC_APP_URL` | Yes | Your app URL — use `http://localhost:3000` for local dev | Base URL for unsubscribe links |

## 🧪 Running Tests

Unit tests are small automated checks that verify specific parts of the code work correctly — like making sure the newsletter email formatting produces the right output.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/lib/utils.test.ts
```

### Watch mode (re-runs tests automatically when files change)

```bash
npx jest --watch
```

### Understanding the output

- **PASS** ✅ — All tests in that file passed. Your code works correctly.
- **FAIL** ❌ — Something broke. Look at the error message below the FAIL line — it shows which test failed and what went wrong (expected vs. actual value).

### What the tests cover

Based on the test files in this project:

- `auth-validators.test.ts` — Authentication validation logic
- `auth.test.ts` — Authentication functionality
- `formatMetric.test.ts` — Dashboard metric formatting
- `stats.test.ts` — Dashboard statistics calculations
- `lib/utils.test.ts` — General utility functions
- `utils.test.ts` — General utility functions

## 📁 Project Structure

- `src/lib/email` — Email sending utilities (newsletter.ts)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Connect your GitHub repo** — Click "Import Project" on Vercel, select your repository
2. **Add environment variables** — In the Vercel dashboard, go to Settings → Environment Variables and add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL`
   - Plus any Telegram and Google OAuth variables you're using
3. **Deploy** — Click "Deploy" and wait for Vercel to build your app

> ⚠️ **Important**: Make sure all environment variables from your `.env.local` are also added to Vercel, or your deployed app won't work correctly.

## 📝 License

MIT