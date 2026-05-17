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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Secret key for server-side operations — never expose this to the client |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Client ID for Google Sign-In |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Your PostHog project API key for analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Use `https://eu.i.posthog.com` (EU) or `https://app.posthog.com` (US) | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a domain verified in Resend Dashboard → Domains | Sender email address (e.g., `hello@yourdomain.com`) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → select audience → Settings | Audience ID for email list management |
| `NEXT_PUBLIC_APP_URL` | Yes | Use `http://localhost:3000` for local development | Base URL of your application |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather → create bot → copy the token | Telegram bot API token for notifications |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string for webhook signature verification | HMAC-SHA256 secret for validating incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (without the @) | Bot username displayed in your app |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your code work correctly — like making sure a calculation returns the right number or a form validates input properly.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/lib/utils.test.ts

# Watch mode — re-runs tests automatically when files change
npx jest --watch
```

**Reading the output:**
- `PASS` — All assertions in the test passed ✓
- `FAIL` — Something broke; check the error message below to see which test failed and why

**What the tests cover:**
- `auth-validators` — Authentication validation logic
- `auth` — User authentication flows
- `dashboard/formatMetric` — Metric formatting for dashboard display
- `lib/dashboard/stats` — Dashboard statistics calculations
- `lib/utils` — Utility helper functions
- `utils` — General-purpose utility functions

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components (TournamentSelector, StatCardsRow, DashboardOverview)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In **Environment Variables**, add every variable from your `.env.local` file:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add each key/value pair from `.env.local`
4. Click **Deploy**

> ⚠️ **Important**: All environment variables must be added to Vercel before deploying, especially `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!).

## 📝 License

MIT