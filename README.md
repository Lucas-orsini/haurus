# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Tournament Dashboard** — View and manage tournament metrics with real-time data visualization
- **Responsive Dashboard Layout** — Clean, organized interface with dashboard components
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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side key for admin operations (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For "Sign in with Google" feature |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Already pre-filled as `https://eu.i.posthog.com` | PostHog server endpoint |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for contacts |
| `NEXT_PUBLIC_APP_URL` | No | Already pre-filled for local dev | Base URL of your app |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather after creating a bot | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username from @BotFather | Public bot username |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your code work correctly — like verifying a login function rejects wrong passwords.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth.test.ts
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

### Understanding the output

- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke ❌ — the output shows exactly which test failed and why
- **Test Suites**: Groups of related tests
- **Tests**: Individual checks like "should reject invalid email format"

### What the tests cover

Based on the test files in this project:

- **auth.test.ts** — Authentication flow (login, logout, session handling)
- **auth-validators.test.ts** — Input validation for auth forms (email format, password strength)
- **dashboard/formatMetric.test.ts** — Number and metric formatting for the dashboard
- **lib/dashboard/stats.test.ts** — Statistics calculation and aggregation logic
- **lib/utils.test.ts** — General utility functions
- **utils.test.ts** — Common helper functions

## 📁 Project Structure

- **src/app** — Next.js App Router pages and layouts (dashboard routes)
- **src/components/dashboard** — Dashboard UI components (StatCardsRow, DashboardShell)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. Click the **Deploy with Vercel** button above (or go to vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js — click **Deploy**
4. Add your environment variables:
   - Go to **Settings** → **Environment Variables**
   - Add each variable from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (if using Google OAuth)
     - `NEXT_PUBLIC_POSTHOG_KEY` (if using PostHog)
     - `RESEND_API_KEY` (if using email)
     - `RESEND_FROM_EMAIL`
     - `RESEND_AUDIENCE_ID`
     - `NEXT_PUBLIC_APP_URL` (set to your production URL, e.g., `https://your-app.vercel.app`)
     - Telegram variables if using the bot
5. Click **Deploy** — Vercel will rebuild with your env vars

> ⚠️ **Important**: Make sure to add ALL environment variables in Vercel. Missing variables will cause runtime errors.

## 📝 License

MIT