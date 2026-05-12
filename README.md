# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure login system powered by Supabase with OAuth support
- **User Profile Management** — Interactive modal for viewing and updating user profile data
- **OAuth Integration** — Seamless authentication callback handling for external providers

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

Create a `.env.local` file in the project root. This file stores sensitive credentials like API keys and secrets — it lives on your computer only and should never be committed to GitHub.

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` ` (Windows/Linux) or `Cmd+`` ` ` (Mac) to open the integrated terminal. Then run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste this template:

```bash
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

# === Telegram Bot (optional) ===
TELEGRAM_BOT_TOKEN=
TELEGRAM_BOT_SECRET=
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` ` (or `Cmd+`` ` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | Google OAuth client ID for Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog Dashboard → Project Settings → Project API Key | PostHog API host URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys | API key for sending emails |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains | Verified sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Audience ID for email campaigns |
| `NEXT_PUBLIC_APP_URL` | Yes | — | Base URL of your app (for email links) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | — | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram BotFather | Telegram bot username |

## 🧪 Running Tests

Unit tests verify that specific parts of the code work correctly — like checking that a login function handles wrong passwords properly.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/auth.test.ts

# Watch mode — re-runs tests automatically when files change
npx jest --watch
```

**Reading test output:**
- `PASS` — all tests in that file passed ✅
- `FAIL` — something broke, check the error message below for which test failed

**Tests in this project:**
- Authentication validators (`__tests__/auth-validators.test.ts`)
- Authentication flows (`__tests__/auth.test.ts`)
- Dashboard formatting (`__tests__/dashboard/formatMetric.test.ts`)
- Dashboard statistics (`__tests__/lib/dashboard/stats.test.ts`)
- Utility functions (`__tests__/lib/utils.test.ts`, `__tests__/utils.test.ts`)

## 📁 Project Structure

- `src/app` — Next.js App Router pages and API routes
- `src/components` — React components including dashboard UI
- `src/lib` — Utility functions and Supabase client setup

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from `.env.local` in Vercel → Settings → Environment Variables
4. Click Deploy

> ⚠️ **Important**: Add ALL environment variables listed in the `.env.local` section above. Missing variables will cause the app to fail.

## 📝 License

MIT