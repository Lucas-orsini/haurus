# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Profile Dashboard** — Display player information and performance data with interactive components
- **Match Metrics Visualization** — Visualize and analyze match performance metrics using Recharts
- **Secure Authentication** — Secure authentication powered by Supabase with Row Level Security
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions and interactions

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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase and other services.

To create this file, open your terminal and run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role key — server-side only, bypasses RLS completely
# Used by: /api/telegram/webhook
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token — https://core.telegram.org/bots/tutorial#creating-your-first-bot
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret token — used for HMAC-SHA256 signature verification
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Anonymous key for client-side operations (safe with RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Service role key for server-side operations (bypasses RLS) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram → Search @BotFather → /mybots → Select your bot → Copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this when calling setWebhook in Telegram API | Secret token for HMAC-SHA256 webhook verification |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code (like functions and components) work correctly without needing the full app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
npx jest __tests__/dashboard/formatMetric.test.ts
npx jest __tests__/lib/utils.test.ts
```

Watch mode (re-runs tests automatically when files change):

```bash
npx jest --watch
```

**How to read Jest output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke. Jest will show which test failed and why (expected vs. actual value)

**Tests included:**
- Authentication validators and flow tests
- Dashboard utility functions (formatMetric, stats)
- General utility functions

## 📁 Project Structure

- `src/components/dashboard/player` — Player profile dashboard components and client-side rendering logic

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the "Deploy with Vercel" button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all variables from your `.env.local` file:

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | (your Supabase URL) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (your Supabase anon key) |
   | `SUPABASE_SERVICE_ROLE_KEY` | (your Supabase service role key) |
   | `TELEGRAM_BOT_TOKEN` | (your Telegram bot token) |
   | `TELEGRAM_BOT_SECRET` | (your Telegram webhook secret) |

5. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` once deployment completes.

## 📝 License

MIT