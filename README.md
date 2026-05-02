# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **User Profile Management** — Modal interface for viewing and managing user profile data
- **Telegram Integration** — API endpoints for connecting and disconnecting Telegram bots
- **Authentication** — Secure authentication powered by Supabase
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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, Telegram, and other services.

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — safe to expose in browser
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role key — server-side only, never share this
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token — from @BotFather
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret — your custom secret for verifying webhook requests
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → anon/public key | Public key for client-side authentication |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → service_role key | Server-side key for bypassing RLS (keep secret!) |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, message `@BotFather`, follow the bot creation steps, copy the token | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | Choose any random string (e.g. use a password generator) | Secret used to verify incoming webhook requests |

## 🧪 Running Tests

Unit tests automatically check that individual pieces of your code work correctly — like verifying that a login function handles wrong passwords properly.

**Run all tests:**
```bash
npx jest
```

**Run a specific test file:**
```bash
npx jest __tests__/auth.test.ts
```

**Watch mode — re-runs tests automatically when you save a file:**
```bash
npx jest --watch
```

**How to read Jest output:** `PASS` means everything worked. `FAIL` means something broke — Jest will show you which test failed and why (e.g., expected "X" but got "Y").

**Tests included:**
- `__tests__/auth-validators.test.ts` — authentication validation logic
- `__tests__/auth.test.ts` — authentication flows
- `__tests__/dashboard/formatMetric.test.ts` — metric formatting utilities
- `__tests__/lib/dashboard/stats.test.ts` — dashboard statistics logic
- `__tests__/lib/utils.test.ts` — general utility functions
- `__tests__/utils.test.ts` — common utilities

## 📁 Project Structure

- `src/app` — Next.js App Router pages and API routes
- `src/components/dashboard` — Dashboard UI components

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings → Environment Variables**
4. Add all the variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
5. Click **Deploy**

Your app will be live on a `.vercel.app` URL. For production, connect a custom domain in **Settings → Domains**.

## 📝 License

MIT