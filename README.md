# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Multi-language Support** — Built-in internationalization with English, French, and Spanish translations
- **Unsubscribe Management** — User-facing unsubscribe page with confirmation dialog
- **Responsive UI** — Tailwind CSS-powered responsive interface
- **Analytics** — PostHog integration for tracking user behavior

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Icons**: Lucide React
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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` (Windows/Linux) or `` Cmd+` `` (Mac) to open the integrated terminal. Then run:

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key section | Public API key for client-side requests |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key section | Admin key for server-side operations — never expose to client |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Your PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Already pre-filled as `https://eu.i.posthog.com` | PostHog server endpoint |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Must be a domain verified in Resend Dashboard → Domains | Sender email address (e.g., `hello@yourdomain.com`) |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard → Audiences → click your audience → copy ID from URL or settings | Audience ID for email list management |
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployed app URL or `http://localhost:3000` for local dev | Base URL for generating unsubscribe links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather → `/newbot` command → copy the token | Bot token for receiving updates |
| `TELEGRAM_BOT_SECRET` | No | Create a secret webhook token yourself (any random string) | Secret for verifying incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your Telegram bot's username (ends with `bot`) | Public bot username shown in Telegram |

## 🧪 Running Tests

Tests automatically check that the core features of the app work correctly — if any test fails, that part of the code is broken.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth-validators.test.ts
```

### Watch mode (re-runs tests automatically when you save a file)

```bash
npx jest --watch
```

### Understanding the output

- **PASS** ✅ — All tests in that file passed
- **FAIL** ❌ — One or more tests failed — the output shows which test broke and why
- ** Suites: X passed, Y failed** — Summary at the bottom tells you the overall result

### What the tests cover

Based on the test files in this project:

- **auth-validators.test.ts** — Email and password validation logic
- **auth.test.ts** — Authentication flow and protected routes
- **dashboard/formatMetric.test.ts** — Data formatting for dashboard metrics
- **lib/dashboard/stats.test.ts** — Statistics calculation utilities
- **lib/utils.test.ts** — Shared utility functions
- **utils.test.ts** — General helper functions

## 📁 Project Structure

- **src/lib/i18n/dictionaries/** — Internationalization: language files and type definitions for en, fr, es
- **src/components/unsubscribe/** — Unsubscribe form component
- **src/components/ui/** — Reusable UI components (ConfirmDialog)
- **src/app/unsubscribe/** — Unsubscribe page routes and client components

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`

5. Click **Deploy** — Vercel will build and deploy your app

> 💡 **Important**: Don't forget to update `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL (e.g., `https://your-app.vercel.app`) after deployment.

## 📝 License

MIT