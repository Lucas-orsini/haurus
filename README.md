# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Tournament Dashboard** — View and manage tournament metrics with real-time data visualization
- **Responsive Dashboard Layout** — Clean, organized interface with dashboard components
- **Tournament Selection** — Dynamic tournament context switching for focused analytics
- **Analytics Dashboard** — Stat cards with performance metrics and data visualization

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac) to open the integrated terminal. Then run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side key for admin operations (never expose to client) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Use `https://eu.i.posthog.com` by default | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | Yes | Must match a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for local dev | Base URL of your app (for email links) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | Set a custom secret when configuring your webhook | HMAC-SHA256 signature verification secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (e.g., `mybot`) | Used for client-side Telegram login |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the full app running.

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

**Reading the output**: `PASS` means all tests passed ✅. `FAIL` means something broke — you'll see which test failed and why. A test with `✓` checks one expected behavior; a test with `✕` indicates a broken expectation.

These tests cover:

- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting for dashboard
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — Utility function tests
- `__tests__/utils.test.ts` — General utility tests

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including TournamentSelector and WeatherForecastModal
- `src/hooks` — Custom React hooks including useTournamentWeather for tournament weather data

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

1. Click the **Deploy** button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from your `.env.local` in **Vercel > Settings > Environment Variables**
4. Click **Deploy**

> ⚠️ **Important**: Make sure to copy every variable from your `.env.local` file into Vercel — missing variables will cause the app to fail.

## 📝 License

MIT