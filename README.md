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

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `` Ctrl+`` ` `` ` (Windows/Linux) or `` Cmd+`` ` `` ` (Mac) to open the integrated terminal. Then run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+`` ` `` ` (or `` Cmd+`` ` `` ` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side admin key (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | Google OAuth client ID for Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys | Email service API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains | Must be a verified domain in Resend |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for campaigns |
| `NEXT_PUBLIC_APP_URL` | No | You define this | Base URL of your app (for email links) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather when creating your bot | Bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | You define this | Secret for HMAC-SHA256 webhook verification |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your code work correctly — like verifying that a calculation returns the right number, or that a form validation catches invalid input.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth-validators.test.ts
```

Run tests in watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

**Reading Jest output**: `PASS` means all tests passed ✅. `FAIL` means something broke — Jest will show you exactly which test failed and why, with a diff of what was expected vs. what happened.

**What the tests cover**:

- `auth-validators.test.ts` — validation logic for authentication inputs
- `auth.test.ts` — authentication flow behavior
- `dashboard/formatMetric.test.ts` — metric formatting logic
- `lib/dashboard/stats.test.ts` — dashboard statistics calculations
- `lib/utils.test.ts` — utility function tests
- `utils.test.ts` — general utility tests

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including the Weather Forecast Modal

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables:
   - Copy every variable from your `.env.local` file
   - Make sure to include `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and any others you configured
4. Click **Deploy**

> ⚠️ **Important**: All `NEXT_PUBLIC_*` variables must be added to Vercel for the app to work correctly. Without them, your app will show errors on load.

## 📝 License

MIT