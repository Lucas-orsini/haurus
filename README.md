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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the very top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side admin key (keep this secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | For Sign in with Google feature |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Default value: `https://eu.i.posthog.com` | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | Yes | Must be a domain verified in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → your audience → Settings | Email audience ID for broadcasts |
| `NEXT_PUBLIC_APP_URL` | Yes | Default: `http://localhost:3000` | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string for webhook verification | HMAC-SHA256 secret for webhook security |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username from BotFather | Bot username for client-side use |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the whole app running.

### Run all tests

```bash
npm test
```

or

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/lib/utils.test.ts
```

### Watch mode (re-runs tests automatically when files change)

```bash
npx jest --watch
```

### Reading test output

- **PASS** ✅ — All tests in that file passed
- **FAIL** ❌ — Something broke; read the error message below to see which test failed and why

### What the tests cover

| Test File | What it tests |
|-----------|---------------|
| `__tests__/auth-validators.test.ts` | Authentication validation logic |
| `__tests__/auth.test.ts` | Authentication flows and functions |
| `__tests__/dashboard/formatMetric.test.ts` | Metric formatting utilities |
| `__tests__/lib/dashboard/stats.test.ts` | Dashboard statistics calculations |
| `__tests__/lib/utils.test.ts` | General utility functions |
| `__tests__/utils.test.ts` | Application-wide utility helpers |

## 📁 Project Structure

- `src/lib/dashboard` — Dashboard statistics and metrics logic

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step-by-step

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all your environment variables in Vercel:
   - Go to **Settings → Environment Variables**
   - Add every variable from your `.env.local` file (copy-paste the keys and values)
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` as **Server-side only** variables. The others can be set to **All environments**.

## 📝 License

MIT