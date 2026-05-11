# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Overview** — Main dashboard view component displaying key metrics
- **Stat Cards Row** — Clean stat cards layout for displaying formatted metrics
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

Create a `.env.local` file in the project root. This file stores sensitive credentials like API keys and passwords. It lives on your computer only — never commit it to GitHub.

**For no-code users**: A terminal is a text-based way to interact with your computer. In VS Code, press `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac) to open the integrated terminal. Then run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

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

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard > Project Settings > API > Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard > Project Settings > API > anon/public key | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard > Project Settings > API > service_role key | Server-side admin key (keep secret!) |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog Dashboard > Project Settings > Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Leave as `https://eu.i.posthog.com` | PostHog server URL |
| `RESEND_API_KEY` | Yes | Resend Dashboard > API Keys | Email service API key |
| `RESEND_FROM_EMAIL` | Yes | Must be a verified domain in Resend Dashboard > Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | Yes | Resend Dashboard > Audiences > Settings | Email audience ID |
| `NEXT_PUBLIC_APP_URL` | Yes | Your app's public URL (use `http://localhost:3000` in dev) | Used for unsubscribe links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather when creating your bot | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | You define this yourself | Secret for verifying incoming Telegram requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Your bot's username on Telegram | Bot username for client-side use |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console > APIs & Services > Credentials | For Google Sign-In |

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly without needing the whole app running.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest __tests__/utils.test.ts

# Watch mode — re-runs tests automatically when files change
npx jest --watch
```

**Reading the output**: `PASS` means everything worked. `FAIL` means something broke — look for the error message and which test failed to debug.

Tests in this project cover:
- Authentication validators and flows
- Dashboard metric formatting
- Dashboard statistics utilities
- General utility functions

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components (overview, stat cards, weather modal)
- `src/lib/types` — TypeScript type definitions for the dashboard

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In Vercel dashboard, go to **Settings > Environment Variables**
4. Add all variables from your `.env.local` file (copy-paste each key/value pair)
5. Click **Deploy**

> ⚠️ Important: Make sure to add all environment variables in Vercel before deploying. Without `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, the app will not work properly.

## 📝 License

MIT