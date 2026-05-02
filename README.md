# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Components** — Interactive UI with user profile modal, sidebar navigation, and Telegram connection modal
- **Telegram Integration** — API routes for webhook handling, token management, and bot disconnect functionality
- **Authentication** — Secure auth utilities powered by Supabase
- **Role-Based Access Control** — Configurable role limits for different user tiers

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth & Database**: Supabase
- **Charts**: Recharts
- **Testing**: Jest with React Testing Library

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
# Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — safe to expose in browser
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role key — server-side only, never share this
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token — from @BotFather
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret — your custom secret for verifying webhook requests
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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → anon/public key | Public key for client-side authentication |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → service_role key | Server-side key that bypasses RLS (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, chat with [@BotFather](https://t.me/botfather), use `/newbot` command | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | Create any random string you like (e.g. use a password generator) | Secret token for HMAC-SHA256 webhook verification |

## 🧪 Running Tests

Unit tests verify that individual pieces of code (like auth functions and utility helpers) work correctly without needing the full app.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when files change):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — all tests in that file passed ✅
- `FAIL` — something broke, you'll see which test failed and why (e.g. "expected X but got Y")

**What the tests cover:**
- `auth-validators.test.ts` — validation logic for authentication
- `auth.test.ts` — core authentication functions
- `dashboard/formatMetric.test.ts` — metric formatting in the dashboard
- `lib/dashboard/stats.test.ts` — dashboard statistics calculations
- `lib/utils.test.ts` — shared utility functions
- `utils.test.ts` — general utility functions

## 📁 Project Structure

- `src/app/api/telegram` — Telegram webhook API routes (token, disconnect, webhook handlers)
- `src/components/dashboard` — Dashboard UI components (sidebar, modals)
- `src/lib` — Shared utilities and auth functions
- `src/lib/config` — Role-based access configuration

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
5. Click **Deploy**

> ⚠️ Don't forget to add all environment variables — the app will crash if they're missing!

## 📝 License

MIT