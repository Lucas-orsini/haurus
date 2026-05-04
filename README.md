# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Performance Dashboard** — Interactive player statistics with metric cards and performance charts
- **Match History Analysis** — Detailed match data with performance metrics visualization
- **Metrics Visualization** — Interactive dashboard displaying key performance indicators and statistics using Recharts
- **Secure Authentication** — Secure authentication powered by Supabase with Row Level Security
- **Responsive Design** — Tailwind CSS for modern, responsive layouts with smooth animations via Framer Motion

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
git clone https://github.com/YOUR_USERNAME/haraus.git
cd haurus
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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Public key for client-side authentication |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side key that bypasses Row Level Security |
| `TELEGRAM_BOT_TOKEN` | No | Telegram BotFather after creating a bot | Bot API token for Telegram integration |
| `TELEGRAM_BOT_SECRET` | No | You define this when setting up your webhook | Secret token for verifying incoming webhook requests |

**To find Supabase credentials:**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API**
5. Find **Project URL** (copy this for `NEXT_PUBLIC_SUPABASE_URL`)
6. Find **anon public** key (copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
7. Find **service_role secret** key (copy this for `SUPABASE_SERVICE_ROLE_KEY`)

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly. When you run tests, the app verifies that functions and components behave as expected.

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

**Reading test output:**
- **PASS** (green) — All tests passed, everything works correctly
- **FAIL** (red) — Something broke, check the error message below for details

**What the tests cover:**
- Authentication validators and authentication flow
- Dashboard utility functions for stats calculation
- Dashboard formatting functions for metrics display
- General utility functions (class merging, Tailwind helpers)

## 📁 Project Structure

- `src/lib/types` — TypeScript type definitions for match data
- `src/components/dashboard` — Dashboard UI components for player metrics, performance charts, and match rows

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add each variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
5. Click **Deploy**

Vercel will automatically build and deploy your app. Your site will be live at a URL like `your-project.vercel.app`.

## 📝 License

MIT