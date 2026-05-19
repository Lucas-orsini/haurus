# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Overview** — Real-time display of key metrics and statistics with interactive stat cards
- **Weather Forecast Integration** — Modal component for viewing weather forecasts with forecast data visualization
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
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard → Project Settings → Project API Key | Your PostHog project API key for analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Defaults to `https://eu.i.posthog.com` | PostHog host URL |
| `RESEND_API_KEY` | Yes | Resend Dashboard → API Keys → Create API Key | API key for sending emails via Resend |
| `RESEND_FROM_EMAIL` | Yes | Resend Dashboard → Domains → verify your domain | Sender email — must be a verified domain (or use `onboarding@resend.dev` for dev) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | ID of your email audience list |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `http://localhost:3000` for local dev | Base URL of your app (used for unsubscribe links) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather → create bot → copy token | Telegram bot token for webhook integration |
| `TELEGRAM_BOT_SECRET` | No | You define this yourself — must match in webhook config | Secret for HMAC-SHA256 signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Set when creating your bot in Telegram | Bot username (without @) for client-side use |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly. When you run them, you'll see `PASS` (everything works) or `FAIL` (something is broken).

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth-validators.test.ts
```

Watch mode (re-runs automatically when files change):

```bash
npx jest --watch
```

**What the tests cover** (based on test files detected):

- Auth validators: validation logic for authentication inputs
- Auth: authentication flow and behavior
- Dashboard formatting: metric display formatting
- Dashboard stats: statistics calculation and aggregation
- Utilities: shared utility functions

## 📁 Project Structure

- `src/lib/types/` — TypeScript type definitions (including dashboard types)
- `src/hooks/dashboard/` — Dashboard-related React hooks (forecast modal logic)
- `src/components/dashboard/` — Dashboard UI components (overview, stat cards, weather forecast modal)

## 🚀 Deploy to Vercel

The easiest way to deploy your Next.js app is to use Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the "Deploy with Vercel" button above
2. Import your GitHub repository
3. In Vercel dashboard → Settings → Environment Variables, add all variables from your `.env.local` file:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (if using Google OAuth)
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL` (set to your production URL)
   - `TELEGRAM_BOT_TOKEN` (if using Telegram)
   - `TELEGRAM_BOT_SECRET` (if using Telegram)
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` (if using Telegram)

4. Click "Deploy" — Vercel will build and deploy your app automatically

> ⚠️ **Important**: Make sure to set `NEXT_PUBLIC_APP_URL` to your production URL (e.g., `https://your-app.vercel.app`) in Vercel environment variables.

## 📝 License

MIT