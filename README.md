# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Metrics** — View and analyze match data with real-time metrics displayed on a metrics page
- **Responsive UI** — Tailwind-powered responsive interface
- **Charts & Visualization** — Recharts integration for data visualization
- **Multi-language Support** — Internationalization ready

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac) to open the integrated terminal. Then run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (or `Cmd+`` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key in the "Project API keys" section | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key in the "Project API keys" section | Server-side admin key — never expose this to browsers |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client IDs | For Sign in with Google functionality |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | [PostHog](https://eu.posthog.com) → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Pre-filled as `https://eu.i.posthog.com` | PostHog server URL |
| `RESEND_API_KEY` | Yes | [Resend](https://resend.com/api-keys) → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployment URL (e.g., `https://your-app.vercel.app`) | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | [BotFather](https://t.me/botfather) on Telegram → Create bot and copy the token | Telegram bot authentication |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string used for webhook signature verification | HMAC secret for Telegram webhooks |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (ends with `bot`) | Bot username for client-side use |

## 🧪 Running Tests

Unit tests verify that small pieces of code (like functions or components) work correctly. They catch bugs before they reach production.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (automatically re-runs when you save a file):

```bash
npx jest --watch
```

**Understanding the output:**
- **PASS** ✅ — All tests in that file passed
- **FAIL** ❌ — One or more tests failed. The output shows which test failed and why (expected vs. actual value)

**Tests covered:**
- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows and behavior
- `__tests__/dashboard/formatMetric.test.ts` — Dashboard metric formatting
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — Utility functions
- `__tests__/utils.test.ts` — General utility functions

## 📁 Project Structure

- `src/app/dashboard` — Dashboard pages and layouts (Next.js App Router)
- `src/components/dashboard` — Dashboard UI components (Header, Sidebar, Overview, StatCards, MatchRow, WeatherModal, Shell)
- `src/lib` — Core utilities and helpers (i18n configuration)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from your `.env.local` in Vercel → Settings → Environment Variables
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add all environment variables listed in the table above to Vercel. Missing variables will cause the app to crash or behave unexpectedly.

## 📝 License

MIT