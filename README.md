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
3. Follow the prompts — give your bot a name and a username
4. BotFather will give you a token like `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ` — copy it into `TELEGRAM_BOT_TOKEN`
5. To set your webhook secret, use any random string (e.g. generate one with `openssl rand -hex 32`) and paste it into `TELEGRAM_BOT_SECRET`

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

> 💡 **VS Code tip**: open the integrated terminal with `Ctrl+`` (or `` Cmd+` `` on Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → **Project URL** | Your Supabase project endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → **anon public** key | Client-safe key for browser-side Supabase queries |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → **service role** key | Server-side key that bypasses RLS (never expose this client-side) |
| `TELEGRAM_BOT_TOKEN` | Yes | Telegram → @BotFather → after creating a bot | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | Generate yourself with `openssl rand -hex 32` | Secret used to verify webhook signatures with HMAC-SHA256 |

## 🧪 Running Tests

Unit tests automatically check that core pieces of the app work correctly (e.g. that the login logic validates emails properly, that metric formatting functions output the right numbers).

**Run all tests:**
```bash
npx jest
```

**Run a specific test file:**
```bash
npx jest __tests__/auth.test.ts
```

**Run tests in watch mode (re-runs automatically when you save a file):**
```bash
npx jest --watch
```

**Reading the output:**
- `PASS` — everything passed ✅
- `FAIL` — something broke, check the error message below to see which test failed and why

**What the tests cover:**
- `auth-validators.test.ts` — authentication validation rules (email format, password strength)
- `auth.test.ts` — authentication flows (login, logout, session handling)
- `dashboard/formatMetric.test.ts` — metric formatting logic
- `lib/dashboard/stats.test.ts` — statistics calculation functions
- `lib/utils.test.ts` — shared utility functions
- `utils.test.ts` — general utility functions

## 📁 Project Structure

- `src/components/` — React components including dashboard UI components like the user profile modal

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the **Environment Variables** section, add all the variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
4. Click **Deploy** — Vercel will build and deploy your app automatically

> ⚠️ **Important**: Make sure every environment variable from `.env.local` is added to Vercel, or your app will crash at runtime.

## 📝 License

MIT