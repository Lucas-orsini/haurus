# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Overview** — Main dashboard view displaying key metrics
- **Weather Forecast Modal** — Modal component for weather forecast data
- **TypeScript Types** — Type-safe dashboard data structures

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` ` (Windows/Linux) or `` Cmd+`` ` ` `` (Mac) to open the integrated terminal. Then run:

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
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | PostHog Dashboard → Project Settings | Analytics host URL (default: https://eu.i.posthog.com) |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | Email service API key |
| `RESEND_FROM_EMAIL` | Yes | Resend Dashboard → Domains → verify your domain | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard → Audiences → Settings | Email audience/list ID |
| `NEXT_PUBLIC_APP_URL` | Yes | Set manually | Your app's base URL |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather chat → /newbot | Telegram bot token for notifications |
| `TELEGRAM_BOT_SECRET` | No | Set manually | Secret for HMAC-SHA256 webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram BotFather chat | Your bot's username |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → Credentials | Google OAuth client ID |

## 🧪 Running Tests

Tests automatically check that your code works correctly — think of them as a robot reviewer that clicks through your app and confirms everything behaves as expected.

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

**Understanding the output:**
- `PASS` — Everything works correctly ✅
- `FAIL` — Something broke. Read the error message below to see which test failed and why.

The test suite covers:
- Auth validators and authentication logic
- Dashboard metric formatting and display
- Dashboard statistics calculations
- Utility functions

## 📁 Project Structure

- `src/lib/types` — TypeScript type definitions for dashboard data
- `src/components/dashboard` — Dashboard UI components (overview, weather forecast modal)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the deploy button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - Include both `NEXT_PUBLIC_*` (public) and regular (secret) variables
4. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within seconds.

## 📝 License

MIT