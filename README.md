# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard** — Analytics dashboard displaying statistics with visual stat cards
- **Authentication** — Secure login and signup with Supabase
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Animations** — Smooth transitions with Framer Motion
- **Telegram Integration** — Bot notifications for real-time updates

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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Client-side safe key with Row Level Security |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side only, bypasses RLS |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, message `@BotFather`, follow the bot creation flow, copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this string yourself when setting up your webhook | Secret string for HMAC signature verification |

## 🧪 Running Tests

Unit tests automatically check that core features work correctly by running small pieces of code and comparing the result to what we expect.

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

**How to read the output:**
- `PASS` — all tests passed, everything works
- `FAIL` — a test failed, you'll see which test and what went wrong

The test suite covers authentication validation logic, utility functions, and dashboard metric formatting.

## 📁 Project Structure

- `src/components/ui/` — Reusable UI components (buttons, cards, gauges)
- `src/components/dashboard/` — Dashboard-specific components and stat displays
- `__tests__/` — Jest unit and integration tests

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add all the variables from your `.env.local` file:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`

5. Click **Deploy**

Vercel will automatically detect Next.js and configure the build settings for you.

## 📝 License

MIT