# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **User Profile Management** — Modal interface for viewing and managing user profile data
- **Authentication** — Secure authentication powered by Supabase
- **Telegram Integration** — Webhook endpoints for connecting and disconnecting Telegram bots
- **Role-Based Access Control** — Configurable role limits for different user tiers
- **Metrics Dashboard** — Display and visualize key performance metrics with Recharts
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth & Database**: Supabase
- **Charts**: Recharts
- **Testing**: Jest with React Testing Library

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

**How to get your Supabase values (step by step for no-code users):**

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** and follow the setup steps
3. Wait about 2 minutes for your project to be created
4. In the left sidebar, click the **gear icon** (Project Settings)
5. Click **API** in the settings menu
6. Find **Project URL** at the top → copy it → paste into `NEXT_PUBLIC_SUPABASE_URL`
7. In the "Project API keys" table, copy the **anon public** key → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
8. In the same table, copy the **service role** key → paste into `SUPABASE_SERVICE_ROLE_KEY`

**How to get your Telegram Bot Token:**

1. Open Telegram and search for **@BotFather**
2. Send the message `/newbot`
3. Follow the prompts — give your bot a name and username
4. BotFather will give you a token like `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`
5. Paste this into `TELEGRAM_BOT_TOKEN`
6. Choose a secret string for `TELEGRAM_BOT_SECRET` (any random string you make up — keep it safe)

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings (gear icon) → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings (gear icon) → API → **anon public** key | Anonymous (public) key — safe for client-side use with Row Level Security |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings (gear icon) → API → **service_role** key | Service role key — server-side only, bypasses all RLS policies |
| `TELEGRAM_BOT_TOKEN` | Yes | Telegram BotFather after creating a bot with `/newbot` | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | You choose this when setting up your webhook | Secret string used to verify incoming webhook requests |

## 🧪 Running Tests

Unit tests automatically verify that small pieces of your app (like helper functions) work correctly without needing to run the whole app.

**Run all tests:**

```bash
npx jest
```

**Run a specific test file:**

```bash
npx jest __tests__/auth.test.ts
```

**Watch mode (re-runs tests automatically when files change):**

```bash
npx jest --watch
```

**How to read the output:**
- `PASS` — everything is working correctly
- `FAIL` — something broke, check the error message below for what went wrong

**What gets tested:**
- Authentication validators and logic
- Dashboard metric formatting
- Statistics calculations
- General utility functions

## 📁 Project Structure

- `src/lib/supabase` — Supabase database type definitions
- `src/lib` — Authentication utilities and helpers
- `src/lib/config` — Role limits configuration
- `src/app/api/telegram` — Telegram webhook and disconnect API endpoints
- `src/components/dashboard` — Dashboard UI components

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the **Environment Variables** section, add every variable from your `.env.local` file:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`

4. Click **Deploy**

Your app will be live at a URL like `your-app.vercel.app` within seconds.

## 📝 License

MIT