# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Profile Dashboard** — Display player information and performance data with interactive components
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Smooth Animations** — Framer Motion for polished transitions and interactions
- **Secure Authentication** — Secure authentication powered by Supabase with Row Level Security

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
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram, chat with @BotFather, follow the create bot flow | Your Telegram bot's API token |
| `TELEGRAM_BOT_SECRET` | Yes | You define this yourself — pick any random string | Secret for HMAC-SHA256 webhook verification |

### Finding Supabase credentials:

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (the gear icon) in the left sidebar
4. Click **API**
5. Copy the **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
6. Under "API Keys", copy the **anon/public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Copy the **service_role** key → paste as `SUPABASE_SERVICE_ROLE_KEY` (keep this one secret!)

## 🧪 Running Tests

Unit tests automatically check that individual pieces of code work correctly. When you see **PASS**, everything is working. When you see **FAIL**, something broke — the output will show exactly what went wrong.

### Run all tests:

```bash
npm test
```

### Run a specific test file:

```bash
npm test -- auth.test.ts
```

### Run tests in watch mode (re-runs automatically when you save a file):

```bash
npm test -- --watch
```

### Run tests with coverage report:

```bash
npm test -- --coverage
```

**Tests cover:**
- Authentication validators and logic
- Dashboard utility functions (stats, metric formatting)
- Common utility functions

## 📁 Project Structure

- `src/` — Next.js App Router source files (components, pages, layouts, API routes)
- `src/components/dashboard/player/` — Player profile dashboard components
- `__tests__/` — Jest test files organized by feature

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the **Environment Variables** section, add all variables from your `.env.local` file:

   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key
   - `TELEGRAM_BOT_TOKEN` = your Telegram bot token
   - `TELEGRAM_BOT_SECRET` = your webhook secret

4. Click **Deploy**

> ⚠️ **Important**: Make sure all environment variables are added in Vercel, otherwise your app will crash on startup.

## 📝 License

MIT