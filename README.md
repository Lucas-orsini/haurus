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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` `` (Windows/Linux) or `` Cmd+`` ` `` (Mac) to open the integrated terminal. Then run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` `` (or `` Cmd+`` ` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the very top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side key — never expose this to the browser |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Use `https://eu.i.posthog.com` (EU cloud) or `https://app.posthog.com` (US cloud) | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | Resend → API Keys → Create key | Email sending API key |
| `RESEND_FROM_EMAIL` | Yes | Resend → Domains → verify your domain, then use any address from that domain (or use `onboarding@resend.dev` for testing) | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend → Audiences → select your audience → Settings | Email list audience ID |
| `NEXT_PUBLIC_APP_URL` | Yes | For local dev: `http://localhost:3000` | Base URL of your app (used for unsubscribe links) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram → talk to [@BotFather](https://t.me/botfather) → create bot → copy token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string — any random string works | HMAC secret for verifying webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username from BotFather (e.g., `myAwesomeBot`) | Public bot username |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of your app work correctly without needing to run the whole application.

Run all tests:
```bash
npx jest
```

Run a specific test file:
```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when you change files):
```bash
npx jest --watch
```

**Reading the output**: `PASS` means all tests passed ✅. `FAIL` means something broke ❌ — the error message will show exactly which test failed and why.

The test suite covers:
- **Auth validators** — validation logic for authentication
- **Auth functions** — core authentication functionality
- **Dashboard formatting** — metric display formatting
- **Dashboard stats** — statistics calculations
- **Utility functions** — shared helper functions

## 📁 Project Structure

Only folders with actual source files are listed below.

- `src/contexts` — React context providers for tournament state management
- `src/components/dashboard` — Dashboard UI components

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In Vercel dashboard → Settings → Environment Variables, add all variables from your `.env.local`:
   - All `NEXT_PUBLIC_*` variables (required for browser)
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_BOT_SECRET`
4. Click **Deploy**

> ⚠️ **Important**: Every variable from your `.env.local` file must be added to Vercel, or the app will break in production.

## 📝 License

MIT