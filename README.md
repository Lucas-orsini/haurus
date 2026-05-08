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

# === App ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` ` (Windows/Linux) or `Cmd+`` ` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Anonymous key for client-side queries (safe with Row Level Security) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side key that bypasses RLS (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | No | Open Telegram, chat with [@BotFather](https://t.me/BotFather), create a bot, copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | You define this yourself when setting up webhook verification | Secret for HMAC-SHA256 webhook signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Same as above — enter your bot's username without the @ symbol | Your Telegram bot's username |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → **APIs & Services** → **Credentials** → create OAuth 2.0 Client ID | Enables "Sign in with Google" |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | [eu.posthog.com](https://eu.posthog.com) → **Project Settings** → **Project API Key** | PostHog project API key for analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Provided by PostHog — usually `https://eu.i.posthog.com` | PostHog API host URL |
| `RESEND_API_KEY` | No | [resend.com/api-keys](https://resend.com/api-keys) | API key for sending emails |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → **Domains** — must be a verified domain | Sender email address |
| `NEXT_PUBLIC_APP_URL` | No | You define this — `http://localhost:3000` for local dev | Base URL of your app |

## 🧪 Running Tests

Unit tests verify that specific parts of the code work correctly — like checking that a function returns the right output for a given input.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs tests automatically when you save a file):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌ — the error message shows which test failed and why

**Tests included:**
- Auth validators — email/password validation logic
- Dashboard stats — metrics formatting and calculations
- Utility functions — shared helper functions

## 📁 Project Structure

- **src/lib** — Utility libraries (Resend email client)
- **src/app/api/admin/newsletter/send** — API route for sending newsletters
- **src/components/dashboard** — Dashboard UI components (sidebar, admin forms)
- **src/app/dashboard/admin/newsletter** — Admin newsletter management page

## 🚀 Deploy to Vercel

The easiest way to deploy is with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `NEXT_PUBLIC_APP_URL`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
5. Click **Deploy**

> 💡 **Important**: Make sure to set `NEXT_PUBLIC_APP_URL` to your production URL (e.g., `https://your-app.vercel.app`) after deployment.

## 📝 License

MIT