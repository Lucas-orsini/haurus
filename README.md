# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Tournament Dashboard** — Real-time metrics dashboard with data visualization
- **Tournament Selection** — Dynamic context switching between tournaments for focused analytics
- **Weather Forecast Integration** — View weather forecast data for tournaments
- **Stats & Metrics Display** — Clear statistics cards and data formatting

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac) to open the integrated terminal. Then run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste this template:

```bash
# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# === Google OAuth (optional — for Sign in with Google) ===
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

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the very top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side admin key — never expose to clients |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Client ID for Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog → Project Settings (defaults to `https://eu.i.posthog.com`) | PostHog instance URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains (must be a verified domain, or use `onboarding@resend.dev` for testing) | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Audience ID for email marketing |
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployed app URL or `http://localhost:3000` for local dev | Base URL used in email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather bot creation — [@BotFather](https://t.me/botfather) → `/newbot` | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string for webhook HMAC-SHA256 signature verification | Secures incoming Telegram webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot username (set during bot creation) | Username for your Telegram bot |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your app work correctly — think of them as automated checkups for your code.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — All tests in that file passed ✓
- `FAIL` — Something broke. The output shows exactly which test failed and why.
- `Test Suites: 6 passed` — All 6 test suites passed successfully

**What the tests cover:**
- `auth-validators.test.ts` — Auth validation logic
- `auth.test.ts` — Auth integration tests
- `dashboard/formatMetric.test.ts` — Metrics formatting
- `lib/dashboard/stats.test.ts` — Dashboard statistics
- `lib/utils.test.ts` — Utility functions
- `utils.test.ts` — General utilities

## 📁 Project Structure

- `src/contexts` — React context providers (TournamentContext for managing tournament state)
- `src/components/dashboard` — Dashboard-specific components (TournamentSelector)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (if used)
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL` (change to your production URL)
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
5. Click **Deploy**

> ⚠️ **Important**: `NEXT_PUBLIC_APP_URL` must be updated to your production domain (e.g., `https://your-app.vercel.app`) before deploying.

## 📝 License

MIT