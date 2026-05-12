# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure login system powered by Supabase with OAuth support
- **OAuth Integration** — Seamless authentication callback handling for external providers
- **Newsletter System** — Email newsletter distribution via Resend with unsubscribe management
- **Telegram Bot Integration** — Optional bot for notifications and webhook support

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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `Ctrl+`` ` ` (Windows/Linux) or `Cmd+`` ` ` (Mac) to open the integrated terminal. Then run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` ` (or `Cmd+`` ` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | Google OAuth client ID for Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | PostHog (EU) defaults to `https://eu.i.posthog.com` | PostHog instance URL |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Resend Dashboard → Domains → add a verified domain | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Audience ID for email list management |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for local dev | Base URL for unsubscribe links in emails |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather → create bot → copy token | Bot API token for sending messages |
| `TELEGRAM_BOT_SECRET` | No | Telegram → @BotSupport or custom HMAC secret | Secret for webhook signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram → @your_bot → set username | Bot username for display purposes |

**To find your Supabase keys:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Project Settings** → **API**
4. Copy **Project URL**, **anon/public key**, and **service_role key** (the service role key should never be exposed client-side)

## 🧪 Running Tests

Tests automatically verify that your authentication logic, utility functions, and API routes are working correctly.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/auth.test.ts

# Watch mode — re-runs tests automatically when files change
npx jest --watch
```

**Reading the output:**
- **PASS** — All assertions in the test passed ✅
- **FAIL** — Something broke ❌, the error message shows which test failed and why

**What the tests cover:**
- `__tests__/auth.test.ts` — Authentication flow and user sessions
- `__tests__/auth-validators.test.ts` — Input validation for auth forms
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting utilities
- `__tests__/lib/dashboard/stats.test.ts` — Statistics calculation logic
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Shared helper functions

## 📁 Project Structure

- `src/lib` — Shared libraries including authentication logic
- `src/app/api` — API routes handling newsletter unsubscribe, admin newsletter sending, and auth callbacks

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the **Deploy** button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add each variable from your `.env.local` file one by one:
   - Copy the variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Paste the value
   - Click **Save**
5. Go to **Deployments** → click **Redeploy** on your latest deployment
6. Wait for the build to complete — your app will be live at `https://your-project.vercel.app`

> ⚠️ **Important**: All `NEXT_PUBLIC_*` variables must be added to Vercel, otherwise the app will fail to build. The `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are server-side only — never prefix them with `NEXT_PUBLIC_`.

## 📝 License

MIT