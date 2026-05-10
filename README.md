# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Management** — Send newsletters to subscribers with a dedicated admin form and email preview
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
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, search for @BotFather, create bot with `/newbot`, copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself — it's a secret string for HMAC verification | Used to verify incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Yes | Your bot's username (without @) | Used publicly in the app |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon / public | Public API key (safe to expose) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role | Server-only key (never expose) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | Google Cloud Console → APIs & Services → Credentials | For Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | https://eu.posthog.com → Project Settings → Project API Key | PostHog analytics key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Default is `https://eu.i.posthog.com` | PostHog server host |
| `RESEND_API_KEY` | Yes | https://resend.com/api-keys → Create API Key | Resend email API key |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard → Audiences → Settings | Audience ID for email lists |
| `NEXT_PUBLIC_APP_URL` | Yes | Use `http://localhost:3000` for local dev | Base URL of your app |

## 🧪 Running Tests

Unit tests automatically check that small pieces of code (like helper functions) work correctly without needing the whole app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs tests automatically when files change):

```bash
npx jest --watch
```

**How to read the output**: `PASS` means everything works. `FAIL` means something broke — look at the error message below for details on what went wrong.

Tests cover: auth validation, auth functionality, dashboard metric formatting, dashboard stats utilities, general utilities, and email newsletter helpers.

## 📁 Project Structure

- `src/app/api/admin/newsletter/send` — API route for sending newsletters
- `src/components/dashboard/admin` — Admin dashboard components (NewsletterSendForm, NewsletterEmailPreview)
- `src/lib/email` — Email utilities (newsletter helpers)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to https://vercel.com/new
2. Import your GitHub repository
3. Add all environment variables in Vercel → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - For `NEXT_PUBLIC_` variables: set Environment to "All" (client + server)
   - For server-only variables (like `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`): set Environment to "Server"
4. Click Deploy

Your app will be live at `https://your-project.vercel.app` once deployment completes.

## 📝 License

MIT