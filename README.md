# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Metrics** — View and analyze match data with real-time metrics displayed on a metrics page
- **Responsive UI** — Tailwind-powered responsive interface
- **Charts & Visualization** — Recharts integration for data visualization
- **Internationalization** — Multi-language support (English, French) with language switcher
- **Analytics Integration** — PostHog-powered analytics tracking

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key in the "Project API keys" section | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key (keep this secret — never expose to client) | Server-side only key for admin operations |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | For Sign in with Google feature |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Your PostHog project key for analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Provided in template — use `https://eu.i.posthog.com` for EU hosting | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a domain verified in Resend Dashboard → Domains | Sender email address (e.g., `hello@yourdomain.com`) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → your audience → Settings | Audience ID for email marketing |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for local dev | Base URL of your app (for unsubscribe links) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather — [follow this guide](https://core.telegram.org/bots/tutorial#creating-your-first-bot) | Telegram bot token for notifications |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string for HMAC-SHA256 webhook verification | Webhook signature secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (without @) | Used to identify the bot in your app |

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly without needing the full app running.

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

### Reading the output

- **PASS** ✅ — All assertions in that test passed
- **FAIL** ❌ — Something broke; read the error message below to see which test failed and why
- **Test Suites** — A group of related tests; each can pass or fail independently

### What the tests cover

- `auth.test.ts`, `auth-validators.test.ts` — Authentication logic and validation
- `dashboard/formatMetric.test.ts` — Metric formatting for the dashboard
- `lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `lib/utils.test.ts`, `utils.test.ts` — General utility functions

## 📁 Project Structure

- `src/lib/i18n/` — Internationalization: type definitions and language dictionaries (English, French)
- `src/components/dashboard/metrics/` — Dashboard metrics UI components
- `src/app/dashboard/metrics/` — Metrics page (Next.js App Router)
- `__tests__/` — Jest test suites for auth, dashboard utilities, and shared utilities

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Import your repository** — Click "Import Project" on Vercel, select your GitHub repo
2. **Add environment variables** — Go to your project → Settings → Environment Variables. Add every variable from your `.env.local` file (copy-paste the key-value pairs)
3. **Deploy** — Click "Deploy". Vercel will automatically detect Next.js and run the build

> ⚠️ **Important**: Make sure all environment variables from `.env.local` are also added in Vercel, especially `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` — these are server-only and should remain hidden.

## 📝 License

MIT