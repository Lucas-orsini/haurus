# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Overview** — Centralized dashboard view with header and shell components for structured layout
- **Internationalization (i18n)** — Multi-language support with locale switching via LanguageSwitcher component and LocaleProvider

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key — never expose to browsers |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Leave default | PostHog host URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must match a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID |
| `NEXT_PUBLIC_APP_URL` | No | Your deployment URL or localhost:3000 for dev | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | HMAC-SHA256 secret for webhook verification | Bot webhook secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username | Public bot username |

## 🧪 Running Tests

Tests automatically check that parts of the app work correctly. When all tests pass, your code is functioning as expected.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth.test.ts
npx jest __tests__/utils.test.ts
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

### Understanding test output

- **PASS** ✅ — All assertions in the test passed
- **FAIL** ❌ — Something broke; check the error message below for which test failed and why

### What the tests cover

| Test File | What it tests |
|-----------|---------------|
| `__tests__/auth.test.ts` | Authentication flow and validation |
| `__tests__/auth-validators.test.ts` | Auth input validation rules |
| `__tests__/utils.test.ts` | General utility functions |
| `__tests__/lib/utils.test.ts` | Library utility functions |
| `__tests__/lib/dashboard/stats.test.ts` | Dashboard statistics calculations |
| `__tests__/dashboard/formatMetric.test.ts` | Metric formatting in dashboard |

## 📁 Project Structure

- `src/lib` — Core utilities including i18n configuration
- `src/components/dashboard` — Dashboard-specific components (Header, Overview, Shell)
- `src/components/layout` — Shared layout components (LanguageSwitcher)
- `src/providers` — React context providers (LocaleProvider)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from `.env.local`:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Copy each variable name and value from your `.env.local` file
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add ALL environment variables listed in the `.env.local` template above, especially `SUPABASE_SERVICE_ROLE_KEY` (keep it as a server-side variable only).

## 📝 License

MIT