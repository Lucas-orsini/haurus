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
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret token
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon/public key | Your Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → Project Settings → API → service_role key | Your Supabase service role key |
| `TELEGRAM_BOT_TOKEN` | Yes | Open Telegram → Search @BotFather → /newbot → follow the steps → copy the token | Your Telegram bot token |
| `TELEGRAM_BOT_SECRET` | Yes | Set this yourself when calling setWebhook with the secret parameter | A secret string you choose for webhook verification |

To find your Supabase credentials:

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (the gear icon)
4. Click **API**
5. Copy the **Project URL** into `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public key** (under "Project API keys") into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Copy the **service_role key** (under "Project API keys") into `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ **Security note**: Never expose `SUPABASE_SERVICE_ROLE_KEY` client-side. It's used server-side only to bypass Row Level Security.

## 🧪 Running Tests

Tests check that individual pieces of code work correctly — like making sure a login function handles wrong passwords properly.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Run tests in watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

How to read the output:

- **PASS** — All tests in that file passed ✅
- **FAIL** — Something broke ❌ (the error message will show which test failed and why)

The project includes tests for authentication validators, auth helpers, metric formatting, dashboard statistics, utility functions, and more.

## 📁 Project Structure

- `src/components/layout` — Layout components including Footer
- `src/components/sections` — Section components including MetricsShowcase
- `__tests__` — Jest test files for components, utilities, and business logic

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

Vercel will automatically detect Next.js and run the build. Your site will be live at a `vercel.app` URL.

## 📝 License

MIT