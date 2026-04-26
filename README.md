# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Tennis Match Stats Dashboard** — View and filter tennis match statistics in a professional interface
- **Advanced Filtering** — Filter match data by various criteria with real-time table updates
- **Sidebar Navigation** — Clean sidebar layout for dashboard navigation
- **Dark Analytics Interface** — Professional, distraction-free design optimized for data analysis

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth with middleware protection

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

Create a `.env.local` file in the project root. Open your code editor, create a new file, and save it as `.env.local` in the project folder.

Paste this template into `.env.local`:

```env
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → **Settings** → **API** → copy "Project URL" | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → **Settings** → **API** → find "anon public" row in "Project API keys" table → copy key | Anonymous key — safe for client-side use with Row Level Security |

### How to get your Supabase credentials

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** and follow the steps to create a new project
3. Wait for your project to be created (takes about 2 minutes)
4. In the left sidebar, click the **gear icon** (Settings)
5. Click **API** in the settings menu
6. Copy the **Project URL** and paste into `NEXT_PUBLIC_SUPABASE_URL`
7. Copy the **anon public** key from the "Project API keys" table and paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Tests check that individual pieces of code (like functions or components) work correctly without needing the whole app running.

```bash
# Run all tests
npx jest

# Run a specific test file
npx jest path/to/file.test.ts

# Watch mode — automatically re-runs tests when files change
npx jest --watch
```

Currently no test files exist yet. Once you add `.test.ts` or `.test.tsx` files, they will automatically be picked up by Jest.

## 📁 Project Structure

- `src/app` — Next.js App Router pages and layouts (auth routes, login page)
- `src/middleware.ts` — Authentication middleware for protected routes

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In **Environment Variables**, add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy**

Your app will be live on a `.vercel.app` URL within seconds.

## 📝 License

MIT