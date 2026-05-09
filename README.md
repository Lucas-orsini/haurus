# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Newsletter Management** — Send email campaigns to your audience with preview and admin controls
- **Email Unsubscribe** — Allow subscribers to opt out via dedicated landing page
- **Telegram Bot Support** — Webhook verification for Telegram bot integration
- **PostHog Analytics Integration** — Track user behavior with PostHog analytics
- **Email Delivery** — Send transactional emails using Resend

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Icons**: Lucide React
- **Charts**: Recharts
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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to PostHog, Resend, Telegram, and other services.

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

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` ` (or `Cmd+`` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|---|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Optional | Open Telegram, message @BotFather, create bot, copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Optional | You define this yourself — any random string you choose | HMAC-SHA256 secret for webhook signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Optional | Your bot's username (e.g., "MyAwesomeBot") | Used in frontend Telegram links |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | [posthog.com](https://eu.posthog.com) → Project Settings → Project API Key | PostHog analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Provided by PostHog — use `https://eu.i.posthog.com` | PostHog server URL |
| `RESEND_API_KEY` | Yes | [resend.com](https://resend.com/api-keys) → Create API Key | Resend email service API key |
| `RESEND_FROM_EMAIL` | Yes | Must be a domain verified in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard → Audiences → click your audience → Settings | Audience ID for email campaigns |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` in dev | Base URL for unsubscribe links in emails |

## 🧪 Running Tests

Unit tests verify that individual pieces of code work correctly — they test small functions and components in isolation.

Run all tests:
```bash
npx jest
```

Run a specific test file:
```bash
npx jest __tests__/utils.test.ts
```

Run tests in watch mode (re-runs automatically when you save):
```bash
npx jest --watch
```

**How to read Jest output:**
- `PASS` — everything works correctly
- `FAIL` — something broke, check the error message below for details

**What gets tested:**
- `__tests__/auth.test.ts` — authentication logic
- `__tests__/auth-validators.test.ts` — auth input validation
- `__tests__/utils.test.ts` — general utility functions
- `__tests__/lib/utils.test.ts` — library utility functions
- `__tests__/lib/dashboard/stats.test.ts` — dashboard statistics functions
- `__tests__/dashboard/formatMetric.test.ts` — metric formatting

## 📁 Project Structure

- `src/lib/email` — email utilities and newsletter helpers
- `src/app/api/admin/newsletter/send` — API route for sending newsletter campaigns
- `src/components/dashboard/admin` — admin dashboard components (newsletter send form, email preview)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the "Deploy with Vercel" button above (or go to vercel.com/new)
2. Import your GitHub repository
3. In Vercel dashboard → Settings → Environment Variables, add all variables from your `.env.local`
4. Click Deploy

> ⚠️ **Important**: Make sure to add ALL environment variables in Vercel — the app won't work without them.

## 📝 License

MIT