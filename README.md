# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Dashboard** — Analytics dashboard displaying statistics with visual stat cards
- **Authentication** — Secure login and signup with Supabase
- **Responsive Design** — Tailwind CSS for modern, responsive layouts
- **Animations** — Smooth transitions with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Testing**: Jest with React Testing Library
- **Auth & Database**: Supabase

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
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot API token — https://core.telegram.org/bots/tutorial#creating-your-first-bot
TELEGRAM_BOT_TOKEN=

# Telegram webhook secret token — configured when calling setWebhook with secret parameter
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Safe to expose in browser, Row Level Security controls access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side only, bypasses all security — never expose to browser |
| `TELEGRAM_BOT_TOKEN` | No | Open Telegram → search for **@BotFather** → send `/newbot` → follow prompts → copy the token | Used to send notifications via Telegram bot |
| `TELEGRAM_BOT_SECRET` | No | Any random string you choose (e.g. `my-secret-123`) | Used to verify that incoming webhook requests are really from Telegram |

## 🧪 Running Tests

Unit tests automatically check that specific parts of your app work correctly — like verifying that a calculation returns the right number or that a login form behaves as expected.

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

**How to read the output:**
- **PASS** (green) = all tests in that file passed ✅
- **FAIL** (red) = something broke, check the error message below for which test failed and why

**Tests included:**
- `__tests__/auth.test.ts` — Authentication flow tests
- `__tests__/auth-validators.test.ts` — Form validation tests
- `__tests__/dashboard/formatMetric.test.ts` — Dashboard metric formatting tests
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics tests
- `__tests__/lib/utils.test.ts` — Utility function tests
- `__tests__/utils.test.ts` — General utility tests

## 📁 Project Structure

- `src/components/dashboard` — Dashboard UI components including stat cards

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step by step:**

1. Push your code to GitHub if you haven't already
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"**
4. Import your repository
5. In **"Environment Variables"**, add every variable from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_SECRET`
6. Click **"Deploy"**

> ⚠️ **Important**: Make sure to add ALL environment variables in Vercel. If you miss one, the app will crash when it tries to use that missing variable.

## 📝 License

MIT