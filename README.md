# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Overview** — Centralized dashboard with structured shell layout, stat cards, and overview components
- **Player Tracking** — Search, track, and analyze player performance with detailed profiles, match history, and statistics charts
- **Surface Selection** — Filter player metrics by playing surface (hard court, clay, grass)
- **Metrics Education** — Learn about key metrics and their impact on player analysis
- **Newsletter Management** — Admin interface for sending email newsletters via Resend
- **Internationalization (i18n)** — Multi-language support with locale switching and provider context

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` `` (Windows/Linux) or `Cmd+`` ` `` (Mac) to open the integrated terminal. Then run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` `` (or `Cmd+`` ` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key — never expose to browsers |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog → Project Settings | Analytics host URL (default: https://eu.i.posthog.com) |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains | Verified sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID |
| `NEXT_PUBLIC_APP_URL` | Yes | You decide | Your app's base URL |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | You decide | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram @BotFather | Your bot's username |

## 🧪 Running Tests

Unit tests check that small pieces of code (like functions or components) work correctly on their own — no database or internet needed.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs automatically when files change):

```bash
npx jest --watch
```

**Reading the output**: `PASS` means all tests passed ✅. `FAIL` means something broke ❌ — check the error message below to see which test failed and why.

These tests cover: authentication validators, auth utilities, dashboard metrics formatting, stats calculations, utility functions, and general app utilities.

## 📁 Project Structure

- `src/app` — Next.js App Router pages and layouts
- `src/components/dashboard` — Dashboard-specific components (player, metrics, admin, UI)
- `src/components/layout` — Layout components (LanguageSwitcher)
- `src/components/ui` — Reusable UI components (ConfirmDialog)
- `src/lib` — Utility functions and i18n configuration
- `src/providers` — React context providers (LocaleProvider)
- `__tests__` — Jest unit tests

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from your `.env.local` in **Vercel > Settings > Environment Variables**
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add ALL environment variables from the `.env.local` file to Vercel, otherwise the app will crash on startup.

## 📝 License

MIT