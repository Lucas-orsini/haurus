# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Secure Authentication** — Login and signup powered by Supabase with secure callback handling

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Auth & Database**: Supabase
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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` ` (Windows/Linux) or `Cmd+`` ` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Client-safe key for browser-side queries with Row Level Security |
| `SUPABASE_SERVICE_ROLE_KEY` | For webhook endpoints | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side only key that bypasses RLS — never expose to client |
| `TELEGRAM_BOT_TOKEN` | For Telegram bot | Open Telegram, chat with **@BotFather**, follow the setup flow, copy the token he gives you | Authenticates your bot with the Telegram API |
| `TELEGRAM_BOT_SECRET` | For webhook verification | You define this yourself — any random string you choose | Used to verify that incoming webhook requests are actually from Telegram |

## 🧪 Running Tests

Unit tests check that small pieces of your code work correctly — like checking that a password validation function returns the right result for different inputs.

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

**How to read Jest output:**
- `PASS` — all tests passed, nothing is broken
- `FAIL` — something broke, Jest will show which test failed and why

**Tests included:**
- `__tests__/auth-validators.test.ts` — authentication validation logic
- `__tests__/auth.test.ts` — authentication flow tests
- `__tests__/dashboard/formatMetric.test.ts` — metric formatting utilities
- `__tests__/lib/dashboard/stats.test.ts` — dashboard statistics logic
- `__tests__/lib/utils.test.ts` — utility function tests
- `__tests__/utils.test.ts` — general utility tests

## 📁 Project Structure

- `src/lib` — Shared libraries (authentication utilities)
- `src/app` — Next.js App Router pages and API routes

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step-by-step:**

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

Vercel will automatically build and deploy your app. Every time you push to `main`, Vercel will rebuild and redeploy.

## 📝 License

MIT