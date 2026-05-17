# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Layout** — Responsive dashboard interface built with Next.js App Router
- **Tailwind CSS Styling** — Utility-first CSS for clean, modern UI
- **Smooth Animations** — Framer Motion for fluid page transitions and interactions
- **Analytics Ready** — PostHog integration for tracking user behavior
- **Email Notifications** — Resend integration for transactional emails
- **Telegram Bot Support** — Webhook integration for Telegram bot notifications

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac) to open the integrated terminal. Then run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side secret key — never expose this to the browser |
| `GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Use `https://eu.i.posthog.com` (EU) or `https://app.posthog.com` (US) | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | Yes | Must be a domain verified in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → select audience → Settings | Audience ID for email marketing |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for local dev | Base URL for unsubscribe links in emails |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather → Create bot → Copy token | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string for webhook signature verification | HMAC secret for validating Telegram requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (e.g., `MyAwesomeBot`) | Used to identify which bot sent the webhook |

## 🧪 Running Tests

Tests automatically check that key parts of the application work correctly — they run small checks on the code to make sure everything behaves as expected.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/auth.test.ts

# Watch mode — re-runs tests automatically when files change
npx jest --watch
```

**Reading the output:**
- **PASS** — All checks passed ✅
- **FAIL** — Something is broken, the output shows exactly which test failed and why

The test suite covers: auth validation logic, authentication flows, dashboard metrics formatting, stats utilities, general utilities, and React component behavior.

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including the main overview

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In **Environment Variables**, add all variables from your `.env.local` file
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add ALL environment variables listed in the table above. The app will not work without `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` at minimum.

## 📝 License

MIT