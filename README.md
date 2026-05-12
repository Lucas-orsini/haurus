# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Weather Forecast Modal** — Interactive modal for displaying weather forecast data with smooth animations

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` ` ` (Windows/Linux) or `` Cmd+`` ` ` `` (Mac) to open the integrated terminal. Then run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste this template:

```bash
# === Telegram Bot (optional) ===
TELEGRAM_BOT_TOKEN=
TELEGRAM_BOT_SECRET=
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=

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
```

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+`` ` ` `` (or `` Cmd+`` ` ` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather when creating your bot (see [Telegram docs](https://core.telegram.org/bots/tutorial#creating-your-first-bot)) | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | You define this — used for HMAC-SHA256 webhook verification | A secret string you choose for webhook security |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username (e.g., @your_bot) | Bot username displayed publicly on Telegram |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Google OAuth client ID for Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Provided by default in PostHog settings | PostHog instance URL |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard → Domains | Sender email address (use `onboarding@resend.dev` for testing) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Audience ID for email list management |
| `NEXT_PUBLIC_APP_URL` | Yes | You define this — use `http://localhost:3000` for local dev | Base URL for unsubscribe links in emails |

## 🧪 Running Tests

Unit tests automatically check that core features work correctly without you needing to test them manually.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when you save changes):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — all tests passed, everything works ✅
- `FAIL` — something broke, check the error message below for what failed 🔴

**Tests covered:**
- Authentication validators and flows
- Dashboard metric formatting
- Dashboard statistics utilities
- General utility functions

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including the Weather Forecast Modal

## 🚀 Deploy to Vercel

The easiest way to deploy your Next.js app is with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the "Deploy with Vercel" button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository
3. Add all your environment variables in Vercel → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Add `SUPABASE_SERVICE_ROLE_KEY`
   - Add all other variables from the `.env.example` template
4. Click "Deploy"

Your app will be live at a `.vercel.app` URL within seconds.

## 📝 License

MIT