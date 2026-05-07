# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Player Dashboard** — Track and manage player profiles with a dedicated search component
- **Visual Analytics** — Display key metrics with chart visualizations using Recharts
- **Authentication** — Secure login and signup powered by Supabase
- **Animations** — Smooth transitions and interactions using Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Testing**: Jest with React Testing Library

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
# Supabase project URL
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

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` ` ` (Windows/Linux) or `Cmd+`` ` ` (Mac), then type the command above.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Anonymous key for client-side Supabase access |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Service role key for server-side operations that bypass RLS |
| `TELEGRAM_BOT_TOKEN` | No | Open Telegram, chat with [@BotFather](https://t.me/BotFather), use `/newbot` command | Telegram bot token for webhook integration |
| `TELEGRAM_BOT_SECRET` | No | Set this when configuring your webhook URL with the secret parameter | Secret token for webhook request verification |

## 🧪 Running Tests

Unit tests automatically check that individual parts of the code work correctly — like a quality check for small pieces of your app.

Run all tests:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest __tests__/auth.test.ts
```

Watch mode (re-runs automatically when you save a file):

```bash
npx jest --watch
```

**Reading the output**: `PASS` means all tests passed — everything works. `FAIL` means something broke — you'll see which test failed and why.

The test suite covers:
- Authentication validators and flows
- Dashboard utility functions and metric formatting
- General utility functions

## 📁 Project Structure

- `src/components/dashboard/player` — Player dashboard components including the search bar

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables in **Vercel Dashboard → Your Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN` (if used)
   - `TELEGRAM_BOT_SECRET` (if used)
4. Click **Deploy**

> ⚠️ **Important**: Make sure all environment variables from your `.env.local` are also added in Vercel, otherwise your app will break in production.

## 📝 License

MIT