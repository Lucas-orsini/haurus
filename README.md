# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Overview** — Central hub displaying key metrics and insights at a glance
- **Player Dashboard** — Dedicated view for individual player statistics and performance tracking
- **Metrics Analytics** — Detailed metrics page with charts and data visualization powered by Recharts

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
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Leave default | PostHog EU host URL |
| `RESEND_API_KEY` | No | Resend → API Keys | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains | Sender email (must be verified domain) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for contacts |
| `NEXT_PUBLIC_APP_URL` | No | Leave default for local dev | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather | Bot API token |
| `TELEGRAM_BOT_SECRET` | No | Your webhook secret | HMAC-SHA256 signature verification key |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot username | Bot username for integration |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the full app running.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth-validators.test.ts
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

### Understanding test output

- **PASS** — All assertions passed, the code works as expected
- **FAIL** — Something broke; read the error message to see which test failed and why
- **FAIL** example: `expect(received).toBe(expected)` — received value doesn't match expected

### What the tests cover

- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows and behavior
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting in dashboard
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics utilities
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Utility function tests

## 📁 Project Structure

- `src/app` — Next.js App Router pages and layouts (dashboard, player, metrics views)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. Click the **Deploy with Vercel** button above (or go to vercel.com/new)
2. **Import your Git repository** — Vercel will detect Next.js automatically
3. **Add environment variables** — Go to your project → Settings → Environment Variables and add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (if using Google OAuth)
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel domain, e.g., `https://your-app.vercel.app`)
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
4. **Deploy** — Click Deploy and wait ~1 minute

Your app will be live at `https://your-project.vercel.app`.

## 📝 License

MIT