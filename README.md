# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Authentication** — Secure login and signup with Supabase
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Animations** — Smooth transitions with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Testing**: Jest with React Testing Library
- **Auth & Database**: Supabase
- **Notifications**: Telegram Bot Integration

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

Create a `.env.local` file in the project root. This file stores sensitive credentials that your app needs to connect to external services.

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase and other services.

To create this file, open your terminal and `cd` into your project folder and run:

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` `` (Windows/Linux) or `Cmd+`` ` `` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Client-side safe key for Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side only key, bypasses RLS |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, message [@BotFather](https://t.me/botfather), send `/newbot`, follow instructions, copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Yes | Generate any random string (e.g., `openssl rand -hex 32`) | Secret for HMAC-SHA256 webhook verification |

## 🧪 Running Tests

Tests verify that specific parts of your code work correctly. When a test **PASS**es, that feature is working. When it **FAIL**s, something is broken — the error message shows exactly which part.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth.test.ts
```

### Run tests in watch mode (re-runs on file change)

```bash
npx jest --watch
```

### What the tests cover

- **auth-validators.test.ts** — Authentication validation logic
- **auth.test.ts** — Authentication flows and behavior
- **formatMetric.test.ts** — Metric formatting in dashboard
- **stats.test.ts** — Dashboard statistics calculations
- **utils.test.ts** — General utility functions

## 📁 Project Structure

- `src/components/layout` — Layout components including the Navbar

## 🚀 Deploy to Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. Click the "Deploy with Vercel" button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository
3. Vercel will auto-detect Next.js — click **Deploy**
4. Once deployed, go to your project → **Settings** → **Environment Variables**
5. Add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
6. Click **Save** and **Redeploy**

> ⚠️ **Important**: Without these environment variables, your app will crash or show errors on Vercel. Make sure every variable from `.env.local` is added.

## 📝 License

MIT