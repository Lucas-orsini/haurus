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
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side key that bypasses RLS (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | Yes | Telegram @BotFather after creating your bot | Bot API token for Telegram integration |
| `TELEGRAM_BOT_SECRET` | Yes | You define this value — it's your webhook secret | Secret string used to verify webhook requests |

### Finding Supabase credentials:

1. Go to [https://app.supabase.com](https://app.supabase.com) and sign in
2. Select your project
3. Click **Project Settings** (gear icon) in the left sidebar
4. Click **API**
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Copy the **service_role** key and paste it as `SUPABASE_SERVICE_ROLE_KEY`

## 🧪 Running Tests

This project uses Jest with React Testing Library to verify that components and utilities work correctly. Tests check things like authentication logic, formatting helpers, and data transformations.

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

**Understanding test output:**
- `PASS` — All tests in that file passed ✅
- `FAIL` — Something broke ❌ The error message shows which test failed and why

**What the tests cover:**
- `auth-validators.test.ts` — Authentication validation logic
- `auth.test.ts` — Authentication flow
- `dashboard/formatMetric.test.ts` — Metric formatting utilities
- `lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `lib/utils.test.ts` — General utility functions
- `utils.test.ts` — Helper functions

## 📁 Project Structure

- `src/components/dashboard/player` — Player profile dashboard components

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step-by-step deployment:**

1. Click the button above or go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository (`haraus`)
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all the variables from your `.env.local` file:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | your-supabase-url |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your-anon-key |
| `SUPABASE_SERVICE_ROLE_KEY` | your-service-role-key |
| `TELEGRAM_BOT_TOKEN` | your-telegram-token |
| `TELEGRAM_BOT_SECRET` | your-webhook-secret |

5. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within minutes.

## 📝 License

MIT