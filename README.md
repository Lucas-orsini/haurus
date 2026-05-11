# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Statistics** — Display and format metrics in a clean stat cards layout
- **TypeScript Types** — Type-safe dashboard data structures

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

Create a `.env.local` file in the project root. This file stores sensitive credentials like API keys and passwords. It lives on your computer only — never commit it to GitHub.

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+\`` (Windows/Linux) or `Cmd+\`` (Mac) to open the integrated terminal. Then run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# === Telegram Bot (optional) ===
TELEGRAM_BOT_TOKEN=
TELEGRAM_BOT_SECRET=
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=

# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# === Google OAuth (optional) ===
NEXT_PUBLIC_GOOGLE_CLIENT_ID=

# === PostHog Analytics ===
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com

# === Resend (Email) ===
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@yourdomain.com
RESEND_AUDIENCE_ID=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+\`` (or `Cmd+\`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard > Project Settings > API > service_role key | Server-side admin key (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather bot creation | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | You define this yourself when setting up the webhook | Secret for verifying incoming Telegram requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username on Telegram | Public bot username |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console > APIs & Services > Credentials | For "Sign in with Google" feature |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard > Project Settings > Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog instance URL | Your PostHog server address |
| `RESEND_API_KEY` | No | Resend Dashboard > API Keys | Email service API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard > Domains | Verified sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard > Audiences > Settings | Email audience identifier |
| `NEXT_PUBLIC_APP_URL` | No | You define this | Base URL of your app for email links |

## 🧪 Running Tests

Unit tests verify that individual pieces of code work correctly. They run automatically and check if your code does what it's supposed to do.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/auth-validators.test.ts

# Watch mode — re-runs tests when files change
npx jest --watch
```

**How to read Jest output:**
- `PASS` — Everything works correctly
- `FAIL` — Something broke. Jest will show which test failed and why

**Tests included:**
- `__tests__/auth-validators.test.ts` — Auth validation logic
- `__tests__/auth.test.ts` — Authentication flows
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting utilities
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics logic
- `__tests__/lib/utils.test.ts` — Utility functions
- `__tests__/utils.test.ts` — General utilities

## 📁 Project Structure

- `src/lib/types/dashboard.ts` — TypeScript type definitions for dashboard data
- `src/lib/dashboard/stats.ts` — Dashboard statistics calculation and data processing
- `src/components/dashboard/StatCardsRow.tsx` — React component for displaying stat cards

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel Dashboard > Settings > Environment Variables:
   - Copy each variable from your `.env.local` file
   - Include both development and production values
4. Click Deploy

> ⚠️ **Important**: Don't forget to add `SUPABASE_SERVICE_ROLE_KEY` — this is a server-side secret that should never be exposed to the browser.

## 📝 License

MIT