# my-app

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Metrics** — View and analyze match data with real-time metrics displayed on a metrics page
- **Responsive UI** — Tailwind-powered responsive interface
- **Charts & Visualization** — Recharts integration for data visualization
- **Authentication** — Email/password signup and login with Supabase
- **Internationalization** — Multi-language support for a global audience

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key in the "Project API keys" section | Public API key for client-side operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key in the "Project API keys" section | Server-side admin key — never expose this to browsers |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs → Your web client | Required only if using Sign in with Google |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog Dashboard → Project Settings → Project API Key | Analytics tracking key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog self-host URL or use `https://eu.i.posthog.com` | PostHog server URL |
| `RESEND_API_KEY` | No | Resend Dashboard → API Keys → Create API Key | Email sending API key |
| `RESEND_FROM_EMAIL` | No | Must be a verified domain in Resend Dashboard → Domains | Sender email address |
| `RESEND_AUDIENCE_ID` | No | Resend Dashboard → Audiences → Settings | Email audience ID for newsletters |
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployment URL (use `http://localhost:3000` for local dev) | Base URL for email links |
| `TELEGRAM_BOT_TOKEN` | No | Telegram @BotFather → /newbot → Copy the token | Telegram bot authentication token |
| `TELEGRAM_BOT_SECRET` | No | Your own secret string for HMAC-SHA256 webhook verification | Webhook security secret |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | No | Telegram bot username (without @) | Your bot's Telegram username |

## 🧪 Running Tests

Unit tests check that small pieces of code (like functions) work correctly without needing the whole app running.

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

**Reading Jest output**: `PASS` means everything is working. `FAIL` means a test broke — it will show which test failed and what went wrong.

Tests in this project cover:
- Authentication validators (email format, password strength)
- Auth page rendering and interactions
- Dashboard metrics formatting
- Statistics calculations
- Utility functions (class merging, i18n)

## 📁 Project Structure

- `src/app/(auth)` — Authentication pages (login, signup)
- `src/lib` — Shared utilities and libraries (i18n, Supabase client, helpers)

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the "Deploy" button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add each variable from your `.env.local` file:
   - Copy the variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Paste the value (e.g., `https://xxxxx.supabase.co`)
   - Click **Save**
5. Redeploy: go to **Deployments**, click the three dots (⋮) on your latest deployment, select **Redeploy**
6. Your app will be live at `https://your-project.vercel.app`

> ⚠️ **Important**: Don't forget to add `SUPABASE_SERVICE_ROLE_KEY` — this key must only exist in server-side environments (Vercel), never in client-side code.

## 📝 License

MIT