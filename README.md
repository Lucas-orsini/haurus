# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **User Profile Management** — Modal interface for viewing and managing user profile data
- **Authentication** — Secure authentication powered by Supabase
- **Telegram Integration** — Webhook endpoints for connecting and disconnecting Telegram bots
- **Role-Based Access Control** — Configurable role limits for different user tiers
- **Metrics Dashboard** — Display and visualize key performance metrics with Recharts
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Testing**: Jest with React Testing Library
- **Auth & Database**: Supabase
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended
- Git installed

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/haraus.git
cd haurus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root. This file stores sensitive credentials that your app needs to connect to external services.

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, Telegram, and other services.

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role key — server-side only, bypasses RLS completely
# Used by: /api/telegram/webhook (webhook has no session cookie, needs service role)
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token — https://core.telegram.org/bots/tutorial#creating-your-first-bot
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret token — configured when calling setWebhook with secret parameter.
# Used for HMAC-SHA256 signature verification on incoming webhook requests.
TELEGRAM_BOT_SECRET=
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **anon/public key** | Public key for client-side authentication, safe to expose in the browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (server-side) | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **service_role key** | Server-side only key that bypasses Row Level Security, never expose this |
| `TELEGRAM_BOT_TOKEN` | Yes (Telegram) | Open Telegram, search for **@BotFather**, send `/newbot`, follow the prompts, copy the token | Token for your Telegram bot API |
| `TELEGRAM_BOT_SECRET` | Yes (Telegram) | Choose any secure random string (e.g., generate with `openssl rand -hex 32`) | Secret token for verifying incoming Telegram webhook requests |

## 🧪 Running Tests

Unit tests automatically verify that specific parts of the code work correctly without needing the full app running.

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

**How to read Jest output:**
- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke, you'll see the specific test that failed with an error message

**Tests included:**
- `__tests__/auth-validators.test.ts` — Authentication validation logic
- `__tests__/auth.test.ts` — Authentication flows
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting for dashboard
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics
- `__tests__/lib/utils.test.ts` — Utility functions
- `__tests__/utils.test.ts` — General utilities

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including UserProfileModal

## 🚀 Deploy to Vercel

The quickest way to deploy your app is with Vercel.

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

**Steps:**

1. Click the "Deploy" button above or go to [vercel.com/new](https://vercel.com/new)
2. Select "Import Git Repository" and connect your GitHub account
3. Choose your `haurus` repository
4. In the "Environment Variables" section, add each variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
5. Click "Deploy"

Vercel will automatically build and deploy your app. Once complete, you'll receive a live URL like `your-app.vercel.app`.

## 📝 License

MIT