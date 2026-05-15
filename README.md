# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Metrics** — View and analyze match data with real-time metrics displayed on a metrics page
- **Responsive UI** — Tailwind-powered responsive interface
- **Charts & Visualization** — Recharts integration for data visualization

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
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client IDs | For "Sign in with Google" feature |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | [PostHog](https://eu.posthog.com) → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Defaults to `https://eu.i.posthog.com` | PostHog server host |
| `RESEND_API_KEY` | No | [Resend Dashboard](https://resend.com/api-keys) → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployment URL (e.g., `https://yourapp.vercel.app`) | Used for unsubscribe links in emails |
| `TELEGRAM_BOT_TOKEN` | No | [Telegram BotFather](https://core.telegram.org/bots/tutorial#creating-your-first-bot) | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | You define this yourself when setting up webhook verification | HMAC-SHA256 secret for incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (from BotFather) | Bot username for display purposes |

## 🧪 Running Tests

Tests automatically check that critical parts of the app work correctly. They run in seconds and tell you if something broke.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/utils.test.ts
```

### Watch mode (re-runs automatically when files change)

```bash
npx jest --watch
```

### Understanding the output

- **PASS** ✅ — All checks passed, everything works
- **FAIL** ❌ — Something is broken, check the error message below for details

### What the tests cover

- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flow and behavior
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting on the dashboard
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — Utility functions
- `__tests__/utils.test.ts` — General utility helpers

## 📁 Project Structure

- `src/app` — Next.js App Router pages and layouts

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. **Import your repository** — Click "Import Git Repository" and select your GitHub repo
2. **Add environment variables** — Go to Settings → Environment Variables and add every variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel deployment URL, e.g., `https://your-app.vercel.app`)
   - All other variables you're using
3. **Deploy** — Click "Deploy" and wait for the build to complete
4. **Verify** — Open your deployment URL and test that everything works

> ⚠️ **Important**: Make sure all environment variables from `.env.local` are added to Vercel, especially `SUPABASE_SERVICE_ROLE_KEY` which is required for server-side operations.

## 📝 License

MIT