# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure login system powered by Supabase with OAuth support
- **OAuth Integration** — Seamless authentication callback handling for external providers
- **Newsletter System** — Email newsletter distribution via Resend with unsubscribe management
- **Telegram Bot Integration** — Optional bot for notifications and webhook support
- **Internationalization** — Multi-language support with English and French
- **Dashboard** — Weather forecast and user profile management

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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | OAuth client ID for Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `RESEND_API_KEY` | No | Resend → API Keys | Email service API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend → Audiences → Settings | Email audience ID for newsletters |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather → Create bot | Bot token for Telegram integration |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram @BotFather | Your bot's username (without @) |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code work correctly. When you run tests, the system tells you if everything passes (PASS) or if something broke (FAIL with details).

### Run all tests

```bash
npm test
```

### Run a specific test file

```bash
npm test -- __tests__/auth.test.ts
```

### Run tests in watch mode (re-runs automatically when files change)

```bash
npm test -- --watch
```

### Run tests with coverage report

```bash
npm test -- --coverage
```

### What the tests cover

- **auth.test.ts** — Authentication flow and user sessions
- **auth-validators.test.ts** — Input validation for auth-related data
- **dashboard/formatMetric.test.ts** — Metric formatting in the dashboard
- **lib/dashboard/stats.test.ts** — Dashboard statistics calculations
- **lib/utils.test.ts** — General utility functions
- **utils.test.ts** — Common helper functions

## 📁 Project Structure

- `src/lib/i18n` — Internationalization configuration, types, and dictionaries (English/French)
- `src/app/dashboard` — Dashboard pages and layouts
- `src/app/api/locale` — API route for locale management
- `src/app` — Root layout and main pages
- `src/components/dashboard` — Dashboard UI components (sidebar, header, modals)
- `src/components/providers` — React context providers (locale)
- `src/components/layout` — Layout components (language switcher)
- `src/middleware.ts` — Request middleware (auth, localization)
- `__tests__` — Jest test files

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - All other variables from your `.env.local`
4. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within seconds.

## 📝 License

MIT