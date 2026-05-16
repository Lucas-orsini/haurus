# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Interactive Metrics Dashboard** — Real-time metrics cards displaying key performance indicators
- **Multi-language Support** — English and French localization with automatic language detection
- **Statistical Charts** — Visual data representation using Recharts for trends and comparisons
- **Responsive Dashboard UI** — Tailwind-powered responsive interface optimized for all devices
- **Analytics Integration** — PostHog-powered analytics tracking for user insights
- **Email Notifications** — Resend-powered transactional emails for tracked player updates
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
|----------|----------|-----------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | For Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Already set to `https://eu.i.posthog.com` | PostHog server address |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create key | Email service API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains → verified domain | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID |
| `NEXT_PUBLIC_APP_URL` | Yes | Set manually | Your app's base URL |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather when creating your bot | Telegram bot token |
| `TELEGRAM_BOT_SECRET` | No | Set manually (any random string) | HMAC secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot's username (@your_bot) | Telegram bot username |

### Supabase Setup Details

To find your Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and log in
2. Select your project
3. Navigate to **Project Settings** (gear icon)
4. Click on **API**
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## 🧪 Running Tests

Unit tests automatically check that your code works correctly. They compare expected results with actual results so you can catch bugs early.

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

How to read the output:
- **PASS** — All assertions passed, the code works as expected
- **FAIL** — Something broke, you'll see which test failed and why (expected vs. actual)

Test coverage:
- Auth validators and authentication logic (`auth-validators.test.ts`, `auth.test.ts`)
- Dashboard formatting and metrics (`dashboard/formatMetric.test.ts`, `lib/dashboard/stats.test.ts`)
- Utility functions (`lib/utils.test.ts`, `utils.test.ts`)

## 📁 Project Structure

- `src/lib/i18n` — Internationalization types and language dictionaries (English, French)
- `src/lib/metrics` — Metrics definitions and data structures
- `src/components/dashboard/metrics` — Dashboard metrics UI components

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

1. Click the **Deploy** button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:
   - Copy each key-value pair from `.env.local`
   - Paste into Vercel's environment variable form
   - Click **Save**
5. Click **Deploy** — Vercel will build and deploy your app

> ⚠️ **Important**: Make sure to add ALL environment variables listed in the table above. Missing variables will cause the build to fail or features to not work.

## 📝 License

MIT