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
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog self-hosted URL (defaults to EU cloud) | PostHog server endpoint |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys | Email service API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains | Verified sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience identifier |
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployed app URL or http://localhost:3000 | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string for webhook verification | HMAC-SHA256 webhook signature secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot username (without @) | Bot username for display purposes |

## 🧪 Running Tests

Unit tests automatically verify that the authentication system and utility functions work correctly. No manual testing needed — just run the commands below.

Run all tests:
```bash
npx jest
```

Run a specific test file:
```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs automatically when files change):
```bash
npx jest --watch
```

**Reading the output:**
- `PASS` ✅ — All assertions passed, the code works as expected
- `FAIL` ❌ — Something broke, check the error message below for which test failed and why

**Tests included:**
- `__tests__/auth-validators.test.ts` — Email and password validation logic
- `__tests__/auth.test.ts` — Authentication flow and user session handling
- `__tests__/dashboard/formatMetric.test.ts` — Number formatting for dashboard metrics
- `__tests__/lib/dashboard/stats.test.ts` — Statistics calculation utilities
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Shared helper functions

## 📁 Project Structure

- `src/lib` — Authentication utilities and helpers
- `src/app/auth/callback` — OAuth callback route handler

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from `.env.example` in Vercel → Settings → Environment Variables
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add ALL environment variables in Vercel, especially `SUPABASE_SERVICE_ROLE_KEY` — without it, server-side features will fail.

## 📝 License

MIT