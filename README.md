# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Layout** — Responsive dashboard interface built with Next.js App Router
- **Tailwind CSS Styling** — Utility-first CSS for clean, modern UI
- **Smooth Animations** — Framer Motion for fluid page transitions and interactions
- **Analytics Ready** — PostHog integration for tracking user behavior
- **Email Notifications** — Resend integration for transactional emails
- **Telegram Bot Support** — Webhook integration for Telegram bot notifications

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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side key with elevated privileges (never expose to client) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → **OAuth 2.0 Client IDs** | Client ID for Sign in with Google feature |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Your PostHog project API key (starts with `phc_`) |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Provided by PostHog | PostHog host URL (use `https://eu.i.posthog.com` for EU) |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → **Create API Key** | API key for sending emails via Resend |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains → verify your domain | Sender email address (must match a verified domain) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Audience ID for email marketing |
| `NEXT_PUBLIC_APP_URL` | Yes | You define this yourself | Base URL of your app (use `http://localhost:3000` in dev) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather → create bot → copy token | Telegram bot token for webhook integration |
| `TELEGRAM_BOT_SECRET` | No | You define this yourself | Secret for HMAC-SHA256 webhook signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (from BotFather) | Bot username displayed in messages |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your code work correctly without needing the whole app running.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/auth.test.ts

# Watch mode — re-runs tests automatically when files change
npx jest --watch
```

**How to read the output:**
- **PASS** — All assertions passed, the code works as expected
- **FAIL** — Something broke; read the error message below to see which test failed and why

**Tests included:**
- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flow tests
- `__tests__/dashboard/formatMetric.test.ts` — Dashboard metric formatting
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — Utility function tests
- `__tests__/utils.test.ts` — General utility tests

## 📁 Project Structure

- `src/app` — Next.js App Router pages and layouts (includes dashboard layout)

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (if using Google OAuth)
   - `NEXT_PUBLIC_POSTHOG_KEY` (if using PostHog)
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL` (set to your production URL, e.g., `https://your-app.vercel.app`)
   - `TELEGRAM_BOT_TOKEN` (if using Telegram)
   - `TELEGRAM_BOT_SECRET` (if using Telegram)
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` (if using Telegram)
5. Click **Deploy** — Vercel will automatically build and deploy your app

> ⚠️ **Important**: Set `NEXT_PUBLIC_APP_URL` to your production URL in Vercel (e.g., `https://your-app.vercel.app`), not `localhost`.

## 📝 License

MIT