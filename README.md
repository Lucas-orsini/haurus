# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Metrics** — View and analyze match data with real-time metrics
- **Match Analysis** — Display match information with formatted statistics
- **Responsive UI** — Tailwind-powered responsive interface
- **Charts & Visualization** — Recharts integration for data visualization

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
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Leave default | PostHog server URL |
| `RESEND_API_KEY` | No | Resend → API Keys | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend → Audiences → Settings | Email audience ID |
| `NEXT_PUBLIC_APP_URL` | Yes | Local: http://localhost:3000 | Application base URL |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather | Bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | Your webhook secret | HMAC-SHA256 verification secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot username | Public bot identifier |

## 🧪 Running Tests

Unit tests check that individual parts of the code work correctly. Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth-validators.test.ts
```

Run tests in watch mode (re-runs automatically when files change):

```bash
npx jest --watch
```

**Reading Jest output**: `PASS` means all tests passed, `FAIL` means something broke — Jest will show which test failed and why.

Test coverage includes: auth validators, authentication flows, metric formatting, dashboard statistics, and utility functions.

## 📁 Project Structure

- `src/lib` — Shared utilities and metric definitions
- `src/components` — Reusable UI components including dashboard elements
- `src/app` — Next.js App Router pages including dashboard metrics

## 🚀 Deploy to Vercel

One-click deploy:

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

Or manual deploy:

1. Import your GitHub repository in Vercel Dashboard
2. Add all environment variables from `.env.local` in Vercel → Settings → Environment Variables
3. Click Deploy

> ⚠️ **Important**: Don't forget to add all variables from `.env.local` to Vercel before deploying!

## 📝 License

MIT