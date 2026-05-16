# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure login system powered by Supabase with OAuth support
- **OAuth Integration** — Seamless authentication callback handling for external providers
- **Newsletter System** — Email newsletter distribution via Resend with unsubscribe management
- **Telegram Bot Integration** — Optional bot for notifications and webhook support
- **Internationalization** — Multi-language support with English and French
- **Dashboard** — User profile management with metrics visualization
- **Player Tracking** — Search, track, and analyze player statistics with charts and match history
- **Metric Visualization** — Interactive charts and data tables for performance metrics

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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Admin key for server-side operations — keep secret |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | For Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Defaults to `https://eu.i.posthog.com` | PostHog server URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for newsletter |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for dev | Base URL for unsubscribe links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | Generate a secret string yourself | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username (e.g., `MyAwesomeBot`) | Telegram bot username |

## 🧪 Running Tests

Tests automatically verify that key parts of the app work correctly — like checking that login validation and metric formatting produce the expected results.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

**Reading the output**: `PASS` means everything is working correctly. `FAIL` means something broke — look at the error message below the test name to see what went wrong.

**What the tests cover**:

- `__tests__/auth-validators.test.ts` — Login/signup input validation rules
- `__tests__/auth.test.ts` — Authentication flow logic
- `__tests__/dashboard/formatMetric.test.ts` — Number and metric formatting
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — Utility helper functions
- `__tests__/utils.test.ts` — General utility functions

## 📁 Project Structure

- `src/components/dashboard/player` — Player dashboard components (charts, search, stats, match history, tracking)
- `src/lib/i18n` — Internationalization setup with English and French dictionaries

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In Vercel dashboard → Settings → Environment Variables, add all variables from your `.env.local` file
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add all environment variables (Supabase keys, PostHog key, Resend keys, Telegram tokens) in Vercel before deploying. The app will not work without `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 📝 License

MIT