# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Weather Forecast Modal** — Interactive modal for displaying weather forecast data with animations
- **Dashboard Components** — Reusable UI components with Tailwind styling
- **Real-time Analytics** — PostHog integration for tracking user behavior
- **Email Notifications** — Resend integration for transactional emails

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` ` ` (Windows/Linux) or `` Cmd+`` ` ` `` (Mac) to open the integrated terminal. Then run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste this template:

```bash
# === Telegram Bot (optional) ===
TELEGRAM_BOT_TOKEN=
TELEGRAM_BOT_SECRET=
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=

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
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+`` ` ` `` (or `` Cmd+`` ` ` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | PostHog Dashboard → Project Settings | Analytics host URL |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Resend Dashboard → Domains | Verified sender email domain |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather bot creation | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | Your own generated secret | HMAC secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot profile | Your bot's username |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → Credentials | Google OAuth client ID |
| `NEXT_PUBLIC_APP_URL` | Yes | Local: http://localhost:3000 / Production: your deployment URL | Base URL for email links |

## 🧪 Running Tests

Tests automatically verify that core functionality works correctly — they run small checks on your code to make sure nothing broke when you made changes.

**Run all tests:**

```bash
npx jest
```

**Run a specific test file:**

```bash
npx jest __tests__/auth-validators.test.ts
```

**Run tests in watch mode (re-runs automatically when files change):**

```bash
npx jest --watch
```

**Reading test output:**
- `PASS` means everything worked — all checks passed
- `FAIL` means something broke — look at the error message below for details on what went wrong

**Test coverage:**
- Auth validators (email/password validation logic)
- Auth flow (authentication functions)
- Dashboard formatting (metric display formatting)
- Dashboard stats (statistics calculations)
- Utility functions (helper functions)

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including the Weather Forecast modal

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to https://vercel.com/new
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file (copy each key-value pair)
5. Click **Deploy**

Make sure to add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `NEXT_PUBLIC_APP_URL` in Vercel's environment variables.

## 📝 License

MIT