# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure login system powered by Supabase with OAuth support
- **OAuth Integration** — Seamless authentication callback handling for external providers
- **Newsletter System** — Email newsletter distribution via Resend with unsubscribe management
- **Telegram Bot Integration** — Optional bot for notifications and webhook support
- **Internationalization** — Multi-language support with English and French
- **Dashboard** — User profile management with metrics visualization

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (or `Cmd+`` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side API key (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For Google OAuth sign-in |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog → Project Settings (EU hosting) | PostHog API endpoint |
| `RESEND_API_KEY` | No | Resend → API Keys | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains | Verified sender email domain |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID |
| `NEXT_PUBLIC_APP_URL` | Yes | Your choice | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather chat | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string | HMAC-SHA256 webhook verification secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram BotFather | Your bot's username |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code (like functions and components) work correctly without needing to run the whole app.

Run all tests:
```bash
npx jest
```

Run a specific test file:
```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when files change):
```bash
npx jest --watch
```

**Understanding the output:**
- `PASS` — All tests passed, the code works correctly
- `FAIL` — Something broke, check the error message above the failure

**Tests included:**
- `__tests__/auth.test.ts` — Authentication flow tests
- `__tests__/auth-validators.test.ts` — Auth validation logic tests
- `__tests__/dashboard/formatMetric.test.ts` — Dashboard formatting tests
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics tests
- `__tests__/lib/utils.test.ts` — Utility function tests
- `__tests__/utils.test.ts` — General utility tests

## 📁 Project Structure

- `src/lib/i18n` — Internationalization system with English and French dictionaries
- `src/components/dashboard/metrics` — Dashboard metrics components
- `__tests__` — Jest test files for the application

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In Vercel dashboard → Settings → Environment Variables, add all variables from your `.env.local`
4. Click Deploy

> ⚠️ **Important**: Don't forget to add ALL environment variables listed above in Vercel, including `SUPABASE_SERVICE_ROLE_KEY` which is marked as "Keep secret".

## 📝 License

MIT