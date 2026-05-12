# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure login system powered by Supabase with OAuth support
- **User Profile Management** — Interactive modal for viewing and updating user profile data
- **OAuth Integration** — Seamless authentication callback handling for external providers

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
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials | Google OAuth client ID for Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Pre-filled | PostHog server URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Resend Dashboard → Domains | Sender email (must be a verified domain) |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for contacts |
| `NEXT_PUBLIC_APP_URL` | Yes | Pre-filled for dev | Base URL of your app |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | No | Telegram Bot Settings | HMAC-SHA256 secret for webhook verification |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram BotFather | Your bot's username for display purposes |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the whole app running.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth.test.ts
```

### Run tests in watch mode (re-runs on file changes)

```bash
npx jest --watch
```

### Reading the output

- **PASS** ✅ — All assertions passed, the code works as expected
- **FAIL** ❌ — Something broke. Check the error message above for which test failed and why

### What the tests cover

Based on the test files in this project:

- `auth-validators` — Authentication input validation logic
- `auth` — User authentication flows and callbacks
- `dashboard/formatMetric` — Metric formatting utilities
- `lib/dashboard/stats` — Dashboard statistics calculations
- `lib/utils` — Shared utility functions
- `utils` — General helper functions

## 📁 Project Structure

- `__tests__` — Jest test files for components, utilities, and feature modules

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Connect your GitHub repo** — Click the button above, then select your repository from the list
2. **Add environment variables** — In the Vercel dashboard, go to Settings → Environment Variables and add every variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_APP_URL` (set to your production URL, e.g., `https://your-app.vercel.app`)
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
3. **Deploy** — Vercel will automatically build and deploy your app
4. **Update Supabase and Resend** — Add your production URL to their allowed domains/callback URLs

## 📝 License

MIT