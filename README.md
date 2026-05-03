# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Telegram Webhook Integration** — Webhook endpoints for receiving and processing Telegram bot updates with HMAC-SHA256 signature verification
- **Secure Server-Side Operations** — Service role key usage for webhook endpoints that bypass Supabase Row Level Security
- **Authentication** — Secure authentication powered by Supabase
- **Role-Based Access Control** — Configurable role limits for different user tiers
- **Metrics Dashboard** — Display and visualize key performance metrics with Recharts
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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → Project API keys → `anon` key | Public-facing API key — safe for client-side use with Row Level Security |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → Project API keys → `service_role` key | Server-only key that bypasses Row Level Security entirely |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, chat with [@BotFather](https://t.me/botfather), send `/newbot`, follow the prompts, copy the token | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself when setting up your webhook — make it a long random string | Secret token for verifying incoming webhook requests via HMAC-SHA256 |

**To find your Supabase credentials:**

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon in the left sidebar)
4. Click **API**
5. Copy the **Project URL** and paste it into `NEXT_PUBLIC_SUPABASE_URL`
6. Under **Project API keys**, copy the `anon` public key and paste it into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Copy the `service_role` secret key and paste it into `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ **Important**: Never share your `SUPABASE_SERVICE_ROLE_KEY` — it bypasses all security checks. Keep it server-side only.

## 🧪 Running Tests

Tests help ensure the app works correctly by automatically checking that specific parts of the code behave as expected.

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

**How to read Jest output:**
- `PASS` — The test passed, everything works correctly
- `FAIL` — Something broke, check the error message below to see which test failed and why

**What the tests cover:**
- Authentication validation logic
- Dashboard metric formatting
- Stats calculations
- Utility functions

## 📁 Project Structure

- `src/app/api/telegram/webhook` — Telegram webhook API route with HMAC signature verification

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add all variables from your `.env.local` file:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`

5. Click **Deploy**

> ⚠️ **Reminder**: Make sure to add all environment variables in Vercel. If any variable is missing, the app may crash or certain features (like Telegram webhooks) won't work.

## 📝 License

MIT