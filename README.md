# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Metrics Visualization** — Interactive dashboard displaying key performance indicators and statistics
- **Secure Authentication** — Secure authentication powered by Supabase with Row Level Security
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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon/public** key | Public key for client-side authentication, safe with Row Level Security |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service_role** key | Server-side only key that bypasses RLS (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, chat with [@BotFather](https://t.me/BotFather), send `/newbot`, follow the steps, copy the token | Your Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself — it's the secret you pass when calling `setWebhook` with the secret parameter | Secret string used to verify incoming webhook requests via HMAC-SHA256 |

**How to find Supabase variables:**

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Find **Project URL** — this is your `NEXT_PUBLIC_SUPABASE_URL`
6. Find **anon/public** key under "Project API keys" — this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Find **service_role** key under "Project API keys" — this is your `SUPABASE_SERVICE_ROLE_KEY`

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the whole app running.

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

**Understanding the output:**

- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌. Look at the error message below the failure to see which test failed and why.

This project tests:

- Authentication validators (email format, password strength)
- Dashboard utilities (metric formatting, statistics calculations)
- Utility functions (date helpers, data transformations)

## 📁 Project Structure

- `src/app` — Next.js App Router pages, layouts, and global styles
- `src/components/dashboard` — Dashboard UI components (sidebar, header, stat cards, match rows, overview)
- `__tests__` — Jest test files for auth, dashboard utilities, and shared utilities

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the "Deploy with Vercel" button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository
3. In the "Environment Variables" section, add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
4. Click **Deploy**

> ⚠️ **Important**: Make sure all five environment variables are added in Vercel before deploying. If you forget one, the app will crash on load.

## 📝 License

MIT