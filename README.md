# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Internationalization (i18n)** — Multi-language support with locale switching
- **Hero Landing Section** — Engaging hero component for the landing page
- **Metrics Showcase** — Display metrics with visual components
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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Use `https://eu.i.posthog.com` (EU) or `https://app.posthog.com` (US) | PostHog server URL |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | Email service API key |
| `RESEND_FROM_EMAIL` | Yes | Resend Dashboard → Domains → verify a domain | Sender email (must be verified) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → select audience → Settings | Audience ID for email lists |
| `NEXT_PUBLIC_APP_URL` | Yes | Use `http://localhost:3000` for local dev | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | Create your own secret string (min 32 chars) | HMAC secret for webhook verification |
| `NEXT_PUBLIC_TEGRAM_BOT_USERNAME` | No | Your bot's username from BotFather | Bot username for client-side use |

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly without needing the whole app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/lib/utils.test.ts
```

Run tests in watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

**Reading Jest output**: `PASS` means the test passed — your code works. `FAIL` means something broke — Jest will show you exactly which test failed and why.

Test coverage based on test files found:
- Auth validators and authentication logic
- Dashboard formatting utilities
- Dashboard statistics
- General utilities
- Common utils

## 📁 Project Structure

- `src/lib` — Core utilities including internationalization (i18n)
- `src/components` — Reusable UI components including Hero and MetricsShowcase sections

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - For local development variables (like `NEXT_PUBLIC_APP_URL`), you may want a different value for production
4. Click Deploy

> ⚠️ **Important**: Make sure to add all environment variables listed in the 🔑 Environment Variables section above, especially `SUPABASE_SERVICE_ROLE_KEY` which must be kept secret.

## 📝 License

MIT