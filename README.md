# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Tournament Dashboard** — Real-time metrics dashboard with data visualization
- **Tournament Selection** — Dynamic context switching between tournaments for focused analytics
- **Stats & Metrics Display** — Clear statistics cards and data formatting for surface speed
- **Newsletter Admin** — Admin interface for managing newsletter subscribers

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Server-side key for admin operations (never expose to client) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog → Project Settings → Project API Key | Analytics tracking key from PostHog |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Default provided — `https://eu.i.posthog.com` | PostHog server endpoint |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | Yes (if using email) | Resend Dashboard → Domains → verify a domain first | Sender email address (must be a verified domain) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → click audience → Settings | Audience ID for email list management |
| `NEXT_PUBLIC_APP_URL` | Yes | Set manually | Your app's base URL (use `http://localhost:3000` for local dev) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather → /newbot → copy the token | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | Set manually | Secret for HMAC-SHA256 webhook signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Set manually | Your Telegram bot's username (without the @) |

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly. When you run tests, Jest shows `PASS` if everything works or `FAIL` with details if something broke.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

The test suite covers:

- **Auth validators** — validation logic for authentication inputs
- **Auth flows** — login and signup behavior
- **Dashboard formatting** — metric display formatting
- **Dashboard stats** — statistics calculations and utilities
- **Utils** — general utility functions

## 📁 Project Structure

- `src/app/dashboard` — Next.js App Router pages and layouts for the dashboard
- `src/app/dashboard/admin/newsletter` — Newsletter admin page
- `src/components/dashboard` — Dashboard UI components (selector, overview, metrics display)
- `src/contexts` — React contexts for tournament state management
- `__tests__` — Jest test files for components and utilities

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from `.env.local`:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Copy each variable name and value from your `.env.local` file
   - Make sure to include `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and all other variables
4. Click **Deploy**

> ⚠️ **Important**: Required environment variables must be added in Vercel before deployment: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NEXT_PUBLIC_APP_URL`.

## 📝 License

MIT