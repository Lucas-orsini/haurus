# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Secure Authentication** — Login and signup powered by Supabase with secure callback handling
- **Account Management** — Delete your account with confirmation dialogs
- **User Profile** — Manage your profile settings from the dashboard

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Icons**: Lucide React
- **Charts**: Recharts
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

# Telegram bot username (without @) — shown when you create a bot with BotFather
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=
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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side only key that bypasses RLS (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram → Search **@BotFather** → Send `/newbot` → Follow prompts → Copy the token | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | You choose this when setting up your webhook. Pick any random string (e.g., `openssl rand -hex 32`) | Secret used to verify incoming webhook requests |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Yes | After creating your bot with BotFather, it tells you the username (e.g., `MyAwesomeBot`) | Your Telegram bot's username (without the @) |

## 🧪 Running Tests

Tests automatically check that key parts of the app work correctly — like authentication, data formatting, and utility functions.

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
- `PASS` — All checks in that file passed ✅
- `FAIL` — Something broke ❌ — look at the error message below for what needs fixing

The test suite covers:
- Authentication validators and flows
- Dashboard metric formatting
- Statistics utilities
- General utility functions

## 📁 Project Structure

- src/app — Next.js App Router pages, layouts, and API routes
- src/components/dashboard — Dashboard-specific UI components
- src/components/ui — Reusable UI components (buttons, dialogs, etc.)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In **Environment Variables**, add every variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
4. Click **Deploy**

> ⚠️ **Important**: Don't skip adding environment variables in Vercel! Your app will crash without them.

## 📝 License

MIT