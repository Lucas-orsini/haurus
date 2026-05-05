# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard Metrics** — Interactive dashboard components displaying performance indicators and statistics
- **Match Data Display** — Row-based components for viewing match information
- **Secure Authentication** — Authentication powered by Supabase with Row Level Security
- **Responsive Design** — Tailwind CSS for modern, responsive layouts

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

To create this file, open your terminal (how to open it below) and run:

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
>
> **What is a terminal?** A terminal is a text-based way to talk to your computer. In VS Code, there's a built-in terminal that lets you run commands without leaving your editor. It's at the bottom of the window and looks like a black strip.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key | Public key for client-side authentication, safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key | Server-side key that bypasses Row Level Security |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, chat with [@BotFather](https://t.me/BotFather), send `/newbot`, follow instructions, copy the token | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | Create any random string (e.g., `openssl rand -hex 32`) | Secret token for verifying incoming Telegram webhook requests |

**How to find Supabase credentials:**
1. Go to [app.supabase.com](https://app.supabase.com)
2. Sign in to your project
3. Click **Project Settings** (gear icon)
4. Click **API**
5. Find **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
6. Find **anon/public** key under "Project API keys" (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
7. Find **service_role** key under "Project API keys" — click to reveal (for `SUPABASE_SERVICE_ROLE_KEY`)

## 🧪 Running Tests

Unit tests automatically check that specific parts of your code work correctly — like making sure a function returns the right result.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs tests automatically when you save a file):

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — Everything works correctly
- `FAIL` — Something broke, check the error message below for details

**Tests included:**
- Authentication validators
- Authentication flow
- Dashboard metric formatting
- Dashboard statistics
- Utility functions

## 📁 Project Structure

- `src/components/dashboard` — Dashboard components for displaying metrics and match rows

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click **Import Git Repository** and select your repo
4. Add all environment variables in **Vercel Dashboard → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
5. Click **Deploy**

> ⚠️ **Important**: `SUPABASE_SERVICE_ROLE_KEY` must be added as an environment variable — it should be marked as **Secret** and only available in Production (not Preview).

## 📝 License

MIT