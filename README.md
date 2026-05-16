# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Search & Tracking** — Search for tennis players and track your favorite athletes
- **Match History** — View detailed match history with surface-specific statistics
- **Interactive Metrics Dashboard** — Real-time metrics cards displaying key performance indicators
- **Statistical Charts** — Visual data representation using Recharts for trends and comparisons
- **Surface Filtering** — Filter statistics by playing surface (hard, clay, grass)
- **Responsive Dashboard UI** — Tailwind-powered responsive interface optimized for all devices
- **Multi-language Support** — English and French localization with automatic language detection
- **Email Notifications** — Resend-powered transactional emails for tracked player updates
- **Analytics Integration** — PostHog-powered analytics tracking for user insights
- **Telegram Integration** — Optional bot for real-time match notifications

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

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public key for Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side only key with admin privileges |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For Google Sign-In functionality |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | PostHog analytics public key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Default: `https://eu.i.posthog.com` | PostHog server host |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending service API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience identifier |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for dev | Base URL of your application |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather → Create bot | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | You define this — used for HMAC-SHA256 webhook verification | Secret for validating incoming requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username (e.g., `mytennisbot`) | Telegram bot username |

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly. When you run them, the console shows PASS (all good) or FAIL (something broke).

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode — automatically re-runs tests when you save a file:

```bash
npx jest --watch
```

**What the tests cover:**

- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows and user sessions
- `__tests__/dashboard/formatMetric.test.ts` — Dashboard metric formatting utilities
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Common utilities used across the app

## 📁 Project Structure

- `src/app/dashboard` — Dashboard page and route
- `src/components/dashboard` — Dashboard UI components (header, stat cards, overview)
- `src/lib/i18n` — Internationalization setup with English and French dictionaries

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from your `.env.local` file in Vercel → Settings → Environment Variables
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add all environment variables listed in the [Environment Variables](#-environment-variables) section above, especially `SUPABASE_SERVICE_ROLE_KEY` which should be set as a **Server-side only** variable.

## 📝 License

MIT