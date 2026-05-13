# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Internationalization (i18n)** — Multi-language support with locale switching
- **Responsive Landing Page** — Hero section, pricing, social proof, and metrics showcase
- **Smooth Animations** — Framer Motion powered transitions and interactions
- **Analytics Integration** — PostHog tracking for user behavior insights
- **Email Notifications** — Resend-powered transactional emails with unsubscribe management
- **Telegram Bot Integration** — Optional bot for notifications and webhook support

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` ` (Windows/Linux) or `Cmd+`` ` ` (Mac) to open the integrated terminal. Then run:

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
NEXT_PUBLIC_TEGRAM_BOT_USERNAME=
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` ` (or `Cmd+`` ` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth Client ID | For Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Leave as default `https://eu.i.posthog.com` | PostHog server URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email service API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains → add your domain | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Local: `http://localhost:3000` / Production: your domain | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | Set a custom secret for HMAC-SHA256 webhook verification | Webhook security secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (e.g., `@MyBot`) | Bot username for client-side use |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the whole app running.

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

**How to read the output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌. The error message shows which test failed and why.

The test suite covers:
- Authentication validators and logic
- Dashboard formatting and statistics utilities
- General utility functions

## 📁 Project Structure

- `src/app` — Next.js App Router layouts and pages
- `src/components/layout` — Shared layout components (Navbar, Footer, LanguageSwitcher)
- `src/components/sections` — Landing page sections (Hero, Pricing, SocialProof, MetricsShowcase, etc.)
- `src/lib` — Utility functions and i18n configuration
- `src/providers` — React context providers (LocaleProvider)
- `__tests__` — Jest test files

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

1. Click the **Deploy** button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - For local development, `NEXT_PUBLIC_APP_URL=http://localhost:3000`
   - For production, set `NEXT_PUBLIC_APP_URL=https://yourdomain.com`
4. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` (or your custom domain).

## 📝 License

MIT