# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Metrics Dashboard** — Track and visualize tennis player performance with interactive charts
- **Match History** — Browse detailed match results with filtering
- **Responsive Design** — Tailwind CSS for modern, responsive layouts

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Client-side safe key for Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side only key, bypasses Row Level Security |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram → search for **@BotFather** → send `/newbot` → follow instructions → copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself when setting up your webhook | Secret string used to verify incoming webhook requests |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your code work correctly without needing to run the whole app.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/auth.test.ts
```

### Watch mode (re-runs tests automatically when you save a file)

```bash
npx jest --watch
```

### How to read the output

- **PASS** — All tests in that file passed ✓
- **FAIL** — Something broke. Read the error message below to see which test failed and why

### What the tests cover

| Test File | What It Tests |
|-----------|---------------|
| `__tests__/auth-validators.test.ts` | Authentication validation logic |
| `__tests__/auth.test.ts` | Authentication flows and behavior |
| `__tests__/dashboard/formatMetric.test.ts` | Metric formatting in the dashboard |
| `__tests__/lib/dashboard/stats.test.ts` | Statistics calculations |
| `__tests__/lib/utils.test.ts` | Utility functions |
| `__tests__/utils.test.ts` | General utility functions |

## 📁 Project Structure

- `src/components/layout/` — Layout components including the navigation bar

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Push your code to GitHub** — If you haven't already, create a new repo on GitHub and push your project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

2. **Import to Vercel** — Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.

3. **Add environment variables** — In the Vercel dashboard, go to **Settings → Environment Variables** and add each variable from your `.env.local` file:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_BOT_SECRET`

4. **Deploy** — Click **Deploy**. Vercel will build and deploy your app automatically.

> 💡 **Important**: Make sure all environment variables are added in Vercel before deploying. If you deploy without them, the app will crash.

## 📝 License

MIT