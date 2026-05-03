# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **User Profile Management** — Modal interface for viewing and managing user profile data
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth & Database**: Supabase
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
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **anon/public key** | Public key for client-side auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **service_role key** | Server-side key for webhook handlers (bypasses RLS) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, search `@BotFather`, use `/newbot` command | Token for your Telegram bot API |
| `TELEGRAM_BOT_SECRET` | Yes | Your custom secret string (e.g. `my-secret-webhook-token-123`) | Used for HMAC-SHA256 webhook signature verification |

## 🧪 Running Tests

Tests automatically check that key parts of the app work correctly (like authentication logic, formatting numbers, and calculating statistics).

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth.test.ts
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

**Reading test output**: `PASS` means everything worked correctly. `FAIL` means something broke — look at the error message below the failure for details on what went wrong.

### What the tests cover

| Test File | What It Tests |
|-----------|---------------|
| `__tests__/auth-validators.test.ts` | Authentication input validation (email format, password rules) |
| `__tests__/auth.test.ts` | Supabase authentication helpers and session handling |
| `__tests__/dashboard/formatMetric.test.ts` | Number formatting for dashboard metrics |
| `__tests__/lib/dashboard/stats.test.ts` | Statistical calculations for dashboard data |
| `__tests__/lib/utils.test.ts` | General utility functions |
| `__tests__/utils.test.ts` | Common app utilities |

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components (UserProfileModal)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`

4. Deploy — Vercel auto-detects Next.js settings

## 📝 License

MIT