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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side key with admin privileges — never expose this to the client |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Default is provided — change only if using a self-hosted PostHog instance | PostHog API endpoint |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must be a domain verified in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → click your audience → Settings | Audience ID for email lists |
| `NEXT_PUBLIC_APP_URL` | Yes | Set manually — use `http://localhost:3000` for local dev | Base URL of your application |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather bot after creating a bot | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | Set manually — used for HMAC-SHA256 webhook verification | Secret for verifying incoming Telegram webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Set to your Telegram bot's username (without @) | Bot username displayed in the app |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the whole app running.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/auth.test.ts

# Run tests in watch mode (re-runs automatically when files change)
npx jest --watch
```

**How to read Jest output:**
- **PASS** — All assertions in the test passed ✅
- **FAIL** — Something broke ❌ (Jest shows exactly which expectation failed and on which line)

The test suite covers:
- Authentication validators (`__tests__/auth-validators.test.ts`)
- Auth integration tests (`__tests__/auth.test.ts`)
- Dashboard formatting utilities (`__tests__/dashboard/formatMetric.test.ts`)
- Dashboard statistics (`__tests__/lib/dashboard/stats.test.ts`)
- Utility functions (`__tests__/lib/utils.test.ts`)
- General utilities (`__tests__/utils.test.ts`)

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including header

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

1. Click the deploy button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - For `NEXT_PUBLIC_*` variables, set Environment to "All" (client + server)
   - For server-only variables like `SUPABASE_SERVICE_ROLE_KEY`, set to "Server"
4. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within seconds.

## 📝 License

MIT