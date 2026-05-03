# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **User Dashboard** — Interactive dashboard with user profile management and metrics display
- **Secure Authentication** — Secure authentication powered by Supabase
- **Telegram Webhook Integration** — Webhook endpoints for receiving and processing Telegram bot updates with HMAC-SHA256 signature verification
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions

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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, Telegram, and other services.

To create this file, open your terminal and run:

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Client-side safe key for Supabase authentication |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Server-side only key that bypasses Row Level Security |
| `TELEGRAM_BOT_TOKEN` | Yes | [Telegram BotFather](https://core.telegram.org/bots/tutorial#creating-your-first-bot) | Your Telegram bot token from BotFather |
| `TELEGRAM_BOT_SECRET` | Yes | You define this when configuring your webhook | Secret string used for HMAC-SHA256 signature verification |

To find your Supabase credentials:

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Navigate to **Project Settings** → **API**
4. Copy the **Project URL** for `NEXT_PUBLIC_SUPABASE_URL`
5. Copy the **anon public** key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Copy the **service_role** key for `SUPABASE_SERVICE_ROLE_KEY`

## 🧪 Running Tests

Unit tests are quick checks that verify individual parts of the code work correctly.

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

How to read Jest output:
- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke ❌ (Jest shows which test failed and why)

The test suite covers:
- Authentication validators and flows
- Dashboard metric formatting
- Dashboard statistics utilities
- General utility functions

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including user profile modal

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the deploy button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
5. Click **Deploy**

Your app will be live at a URL like `your-app.vercel.app`.

## 📝 License

MIT