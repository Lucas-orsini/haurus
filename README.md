# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **PostHog Analytics Integration** — Track user behavior with PostHog, capturing page views and user interactions across the application

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Icons**: Lucide React
- **Charts**: Recharts
- **Auth & Database**: Supabase
- **Analytics**: PostHog
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

**What is `.env.local`?** It's a special file where you store secrets like API keys and passwords. It lives on your computer only — never commit it to GitHub. When the app starts, Next.js reads these variables so your app can talk to Supabase, PostHog, and other services.

To create this file, open your terminal and `cd` into your project folder and run:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google OAuth (optional — for Sign in with Google)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=

# PostHog Analytics — récupère ta clé sur https://eu.posthog.com → Project Settings → Project API Key
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_PROJECT_KEY_HERE
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **anon/public** key | Anonymous key for client-side queries (safe with Row Level Security) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Dashboard → **Project Settings** → **API** → copy **service_role** key | Server-side key that bypasses RLS (keep secret!) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google Cloud Console → **APIs & Services** → **Credentials** → create OAuth 2.0 Client ID | Enables "Sign in with Google" |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog → **Project Settings** → **Project API Key** | Your PostHog project key (starts with `phc_`) |
| `NEXT_PUBLIC_POSTHOG_HOST` | Yes | Always use `https://eu.i.posthog.com` | PostHog server endpoint for EU users |

To find your Supabase credentials:

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API**
5. Copy the **Project URL**, **anon/public** key, and **service_role** key

## 🧪 Running Tests

Tests automatically check that important parts of the app work correctly — like forms, buttons, and data processing.

Run all tests:

```bash
npm test
```

Run a specific test file:

```bash
npm test -- auth-validators.test.ts
```

Run tests in watch mode (re-runs automatically when you save a file):

```bash
npm test -- --watch
```

**How to read the output:**

- `PASS` — Everything works! ✅
- `FAIL` — Something broke. Read the error message to see which test failed and why.

**What the tests cover:**

- `__tests__/auth-validators.test.ts` — Email and password validation logic
- `__tests__/auth.test.ts` — Authentication flows
- `__tests__/dashboard/formatMetric.test.ts` — Metric formatting for the dashboard
- `__tests__/lib/dashboard/stats.test.ts` — Dashboard statistics calculations
- `__tests__/lib/utils.test.ts` — General utility functions
- `__tests__/utils.test.ts` — Common utilities

## 📁 Project Structure

- `src/app` — Next.js App Router layout and root configuration
- `src/providers` — PostHog analytics providers for tracking page views and user events
- Root files — `package.json`, `.env.example`, Jest configuration

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the **Deploy with Vercel** button above
2. Import your GitHub repository
3. Add all environment variables from your `.env.local` file:
   - Go to **Settings** → **Environment Variables**
   - Add each variable from `.env.example` with its value
4. Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within minutes.

## 📝 License

MIT