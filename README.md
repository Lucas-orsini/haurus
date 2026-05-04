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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Your Supabase anonymous key (safe for client-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side only, bypasses Row Level Security |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram → Chat with [@BotFather](https://t.me/BotFather) → Send `/newbot` → Follow instructions → Copy the token | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself — any random string (e.g., use `openssl rand -hex 32`) | Secret used to verify webhook requests from Telegram |

### Finding Supabase credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API**
5. Copy **Project URL** → paste into `NEXT_PUBLIC_SUPABASE_URL`
6. Copy **anon/public key** (labeled as `anon key`) → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Copy **service_role key** (labeled as `service_role key`) → paste into `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ **Never share your `SUPABASE_SERVICE_ROLE_KEY`** — it bypasses all security rules and should only be used in server-side code.

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code work correctly without needing the whole app running.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs tests automatically when files change):

```bash
npx jest --watch
```

**Reading the output:**
- `PASS` ✅ — All assertions in the test passed
- `FAIL` ❌ — Something broke; the output shows which test failed and why

**What the tests cover:**
- Authentication validators (email format, password strength)
- Authentication flows (login, signup, session handling)
- Dashboard metrics formatting (numbers, percentages, dates)
- Dashboard statistics calculations
- Utility functions (className merging, date helpers)

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including the main overview

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository (`YOUR_USERNAME/haraus`)
3. In the **Environment Variables** section, add each variable from your `.env.local` file:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | (your Supabase URL) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (your anon key) |
   | `SUPABASE_SERVICE_ROLE_KEY` | (your service role key) |
   | `TELEGRAM_BOT_TOKEN` | (your Telegram bot token) |
   | `TELEGRAM_BOT_SECRET` | (your webhook secret) |

4. Click **Deploy**

> ⚠️ **Important**: Every environment variable from your `.env.local` must be added to Vercel, otherwise your deployed app will fail to connect to Supabase and Telegram.

## 📝 License

MIT