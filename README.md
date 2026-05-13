# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Tracking & Stats** — Track tennis players and view detailed statistics including performance metrics
- **Surface-Specific Analysis** — Filter and analyze player performance by court surface (hard, clay, grass)
- **Player Search & Profiles** — Search for players and view comprehensive profile data with performance charts
- **Weather Forecast** — View weather forecast information for matches directly in the dashboard
- **Internationalization** — Full multi-language support with easy locale switching

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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key — never expose to browsers |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Provided by PostHog | PostHog server URL (EU) |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains | Verified sender email domain |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for contacts |
| `NEXT_PUBLIC_APP_URL` | No | Set manually | Your app's base URL |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather | Bot API token for Telegram integration |
| `TELEGRAM_BOT_SECRET` | No | Set manually | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram BotFather | Your bot's username |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the whole app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode — re-runs tests automatically when you save a file:

```bash
npx jest --watch
```

Test output explained:
- **PASS** (green) — all tests in that file passed ✅
- **FAIL** (red) — one or more tests broke, showing exactly which assertion failed and why

This project includes tests for:
- Authentication validators and logic
- Dashboard stat calculations and formatting
- Utility functions

## 📁 Project Structure

- `src/app` — Next.js App Router pages and layouts
- `src/components/dashboard` — Dashboard UI components (player stats, weather, matches, user profile)
- `src/components/layout` — Layout components (language switcher)
- `src/hooks` — Custom React hooks
- `src/lib` — Core utilities and libraries (i18n)
- `src/providers` — React context providers (locale)
- `__tests__` — Jest unit tests

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - For `NEXT_PUBLIC_*` variables, set Environment to "All" (client + server)
   - For server-only variables like `SUPABASE_SERVICE_ROLE_KEY`, set to "Server"
4. Click Deploy

Your app will be live at `https://your-project.vercel.app` within seconds.

## 📝 License

MIT