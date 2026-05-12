# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure login system powered by Supabase
- **OAuth Integration** — Authentication callback handling for external providers
- **Newsletter System** — Email subscription endpoint via Resend API

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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public key** | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role key** | Server-side admin key (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | OAuth client ID for Google sign-in |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Leave as `https://eu.i.posthog.com` | PostHog server address |
| `RESEND_API_KEY` | No | Resend → API Keys | Email service API key |
| `RESEND_FROM_EMAIL` | No | Resend → Domains | Verified sender email |
| `RESEND_AUDIENCE_ID` | No | Resend → Audiences → Settings | Audience ID for email campaigns |
| `NEXT_PUBLIC_APP_URL` | No | Set to `http://localhost:3000` locally | Base URL for unsubscribe links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather | Bot token for notifications |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string | HMAC secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot profile | Bot username for display |

## 🧪 Running Tests

Unit tests automatically check that key parts of the application work correctly (like login validation and data formatting).

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

**Reading the output**: `PASS` means all tests passed. `FAIL` means something broke — the error message shows exactly which test failed and why.

Test files in this project:
- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flow tests
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting for dashboard
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics utilities
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Additional utility tests

## 📁 Project Structure

- `src/app` — Next.js App Router pages and API routes
- `src/lib` — Shared libraries and utilities

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from `.env.local` in **Vercel → Settings → Environment Variables**
4. Click **Deploy**

> ⚠️ Important: Add every variable from the `.env.local` file to Vercel — especially `SUPABASE_SERVICE_ROLE_KEY` which must be set as an **Environment Variable**, not a build-time variable.

## 📝 License

MIT