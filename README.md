# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **User Profile Management** — Modal interface for viewing and managing user profile data
- **Telegram Integration** — Webhook endpoints for connecting and disconnecting Telegram bots
- **Role-Based Access Control** — Configurable role limits for different user tiers
- **Authentication** — Secure authentication powered by Supabase
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

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

Then open it in your code editor and paste the following template:

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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, Telegram, and other services.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` (Windows/Linux) or `Cmd+`` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **anon/public key** | Public key for client-side authentication |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → **service_role key** | Server-side key that bypasses RLS |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, chat with [@BotFather](https://t.me/botfather), use `/newbot` command | Telegram bot API token |
| `TELEGRAM_BOT_SECRET` | Yes | Your custom secret string (any random value you choose) | Used to verify webhook requests via HMAC-SHA256 |

## 🧪 Running Tests

Unit tests check that individual pieces of your app work correctly without needing the whole app running.

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

**How to read the output:**
- `PASS` — all tests in that file passed, everything is working
- `FAIL` — something broke, the error message shows which test failed and why

**Tests included:**
- `__tests__/auth-validators.test.ts` — authentication validation logic
- `__tests__/auth.test.ts` — authentication flow
- `__tests__/dashboard/formatMetric.test.ts` — metric formatting
- `__tests__/lib/dashboard/stats.test.ts` — dashboard statistics
- `__tests__/lib/utils.test.ts` — utility functions
- `__tests__/utils.test.ts` — general utilities

## 📁 Project Structure

- `src/app/api/telegram/disconnect` — Telegram disconnect webhook endpoint
- `src/components/dashboard` — Dashboard UI components including user profile modal
- `src/lib/config` — Role limits configuration for different user tiers

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

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

Vercel will automatically build and deploy your app. Every time you push to `main`, Vercel redeploys.

## 📝 License

MIT