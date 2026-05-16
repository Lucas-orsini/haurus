# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Metrics** — View and analyze match data with real-time metrics displayed on a metrics page
- **Responsive UI** — Tailwind-powered responsive interface
- **Charts & Visualization** — Recharts integration for data visualization
- **Authentication** — Email/password signup and login with Supabase
- **Internationalization** — Multi-language support for a global audience
- **Player Tracking** — Search for players, view their profiles, track matches, and visualize performance with interactive charts
- **Telegram Bot Integration** — Receive match notifications and updates via Telegram

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
- **Telegram Bot**: Telegram Bot API integration
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key in the "Project API keys" section | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key (⚠️ treat as secret — server-side only) | Admin key for server-side operations like sending verification emails |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Use `https://eu.i.posthog.com` by default | PostHog server host URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address (use `onboarding@resend.dev` for testing) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Audience ID for email list management |
| `NEXT_PUBLIC_APP_URL` | Yes | Set `http://localhost:3000` for local dev | Base URL of your app (for email unsubscribe links) |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather → Create bot → Copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | Set a random secret string you generate yourself | HMAC-SHA256 secret for webhook signature verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram @BotFather → Your bot → Username | Your Telegram bot's username (without @) |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code work correctly without needing the whole app running. They catch bugs early and verify that new changes don't break existing functionality.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when you save changes):

```bash
npx jest --watch
```

**Understanding the output**: When tests pass, you'll see `PASS` in green. If something breaks, you'll see `FAIL` in red with details about what went wrong and which assertion failed.

The test suite covers:
- Authentication validators (input validation, password strength, email format)
- Authentication flows (signup, login, session handling)
- Dashboard utilities (metric formatting, statistics calculations)
- General utility functions

## 📁 Project Structure

Only folders containing files from this project are listed below.

- `src/app/dashboard` — Dashboard pages and layouts (Next.js App Router)
- `src/components/dashboard` — Dashboard UI components (player cards, match history, charts, modals, search)
- `src/lib` — Core utilities and internationalization setup

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step-by-step deployment**:

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:
   - Copy each key-value pair from `.env.local`
   - Paste into Vercel's environment variable form
   - Set the environment to "Production", "Preview", and "Development"
5. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within minutes.

> ⚠️ **Important**: Make sure all environment variables are added in Vercel before deploying. The app will crash on startup if Supabase credentials are missing.

## 📝 License

MIT