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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (or `Cmd+`` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side key for admin operations (never expose to client) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | For Sign in with Google functionality |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Leave as `https://eu.i.posthog.com` | PostHog host URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains → Add Domain | Verified sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Default: `http://localhost:3000` | Your app's base URL (change to your production URL after deploying) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram → @BotFather → /newbot | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | You define this yourself | HMAC-SHA256 secret for webhook signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram → @BotFather → after creating your bot | Your bot's username (e.g., `myawesomebot`) |

## 🧪 Running Tests

Unit tests automatically check that your code works correctly — think of them as automated checkups for your app.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth-validators.test.ts
```

Run tests in watch mode (automatically re-runs when you save file changes):

```bash
npx jest --watch
```

How to read test output:

- **PASS** ✅ — All checks passed, everything is working correctly
- **FAIL** ❌ — Something broke. Check the error message below the test name to see which assertion failed and why

Tests cover:

- Authentication validators
- Auth page functionality
- Dashboard metric formatting
- Dashboard statistics
- Utility functions

## 📁 Project Structure

- src/components/dashboard — Dashboard UI components (StatCardsRow, WeatherForecastModal, DashboardOverview, TournamentSelector)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Push your code to GitHub if you haven't already
2. Go to https://vercel.com/new
3. Click **"Import Git Repository"** and select your repo
4. In **"Environment Variables"**, add every variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL` (set this to your Vercel deployment URL, e.g., `https://my-app.vercel.app`)
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
5. Click **"Deploy"**

> 💡 **Important**: After deploying, update `NEXT_PUBLIC_APP_URL` in Vercel to match your deployment URL so email links work correctly.

## 📝 License

MIT