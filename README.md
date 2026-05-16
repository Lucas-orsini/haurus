# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Metrics** — View and analyze match data with real-time metrics displayed on a metrics page
- **Responsive UI** — Tailwind-powered responsive interface
- **Charts & Visualization** — Recharts integration for data visualization
- **Authentication** — Email/password signup and login with Supabase
- **Internationalization** — Multi-language support for a global audience

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
- **Telegram Bot**: Telegram Bot API integration
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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` (Windows/Linux) or `` Cmd+` `` (Mac) to open the integrated terminal. Then run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key in the "Project API keys" section | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key (same section as anon key) | Backend-only key with elevated privileges — never expose to client |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog → Project Settings (defaults to `https://eu.i.posthog.com`) | PostHog server endpoint |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains → verify your domain first | Must be a verified domain; in dev you can use `onboarding@resend.dev` |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings → Audience ID | Email list ID for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Set manually | Base URL of your app (use `http://localhost:3000` for local dev) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram → [@BotFather](https://t.me/botfather) → /newbot | Bot token for Telegram integration |
| `TELEGRAM_BOT_SECRET` | No | Set manually | Secret for HMAC-SHA256 webhook signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username from BotFather | Public bot username for client-side references |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code work correctly without needing the whole app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
npx jest __tests__/lib/utils.test.ts
```

Watch mode (re-runs tests automatically when files change):

```bash
npx jest --watch
```

**Reading test output:**
- **PASS** — All assertions passed, the code works as expected
- **FAIL** — Something broke. Look for the error message and the line number to find the issue

**Tests included:**
- `__tests__/auth.test.ts` — Authentication flow tests
- `__tests__/auth-validators.test.ts` — Input validation for auth forms
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting logic
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — Utility function tests
- `__tests__/utils.test.ts` — General utility tests

## 📁 Project Structure

- `src/app` — Next.js App Router pages (dashboard routes)
- `src/components/dashboard` — Dashboard UI components and metric displays
- `src/lib` — Core utilities, Supabase client, and i18n setup
- `src/lib/i18n/dictionaries` — Language dictionaries (English, French)

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

1. Click the **Deploy** button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the **Environment Variables** section, add every variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (if used)
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel domain, e.g., `https://your-app.vercel.app`)
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_BOT_SECRET`, `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` (if used)
4. Click **Deploy**

> ⚠️ **Important**: All `NEXT_PUBLIC_*` variables must be added to Vercel, otherwise the app will break in production.

## 📝 License

MIT