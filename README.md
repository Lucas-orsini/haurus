# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Search & Tracking** — Search for tennis players and track your favorite athletes
- **Match History** — View detailed match history with surface-specific statistics
- **Interactive Metrics Dashboard** — Real-time metrics cards displaying key performance indicators
- **Statistical Charts** — Visual data representation using Recharts for trends and comparisons
- **Surface Filtering** — Filter statistics by playing surface (hard, clay, grass)
- **Responsive Dashboard UI** — Tailwind-powered responsive interface optimized for all devices
- **Multi-language Support** — English and French localization with automatic language detection
- **Email Notifications** — Resend-powered transactional emails for tracked player updates
- **Analytics Integration** — PostHog-powered analytics tracking for user insights
- **Telegram Integration** — Optional bot for real-time match notifications

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (or `Cmd+`` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** field at the top | Your Supabase project URL (looks like `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key in the "Project API keys" section | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key (⚠️ keep this secret, never expose to client) | Admin key for server-side operations |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Defaults to `https://eu.i.posthog.com` | PostHog server URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Set manually | Base URL of your app (use `http://localhost:3000` for local dev) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather after creating your bot | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | Set manually — any random secret string | HMAC secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username (e.g., `MyTennisBot`) | Telegram bot username |

## 🧪 Running Tests

Unit tests check that specific parts of the code work correctly — think of them as automated quality checks for individual features.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth-validators.test.ts
```

Watch mode (re-runs tests automatically when files change):

```bash
npx jest --watch
```

**Reading the output:**
- **PASS** ✅ — All assertions passed, the code works as expected
- **FAIL** ❌ — Something broke, check the error message below to see which test failed and why

The test suite covers:
- Authentication validation logic
- Dashboard metric formatting utilities
- Statistical calculation helpers
- General utility functions

## 📁 Project Structure

- `src/lib/i18n` — Internationalization setup with English and French dictionaries
- `src/components/dashboard/player` — Player dashboard components (metrics cards, search, charts, match history, tracking modals)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, add all your environment variables:
   - Go to **Settings** → **Environment Variables**
   - Add each variable from your `.env.local` file (copy the key and value pairs)
   - Make sure to set them for **Production**, **Preview**, and **Development** environments
4. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within seconds.

## 📝 License

MIT