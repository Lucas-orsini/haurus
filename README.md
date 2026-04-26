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

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

Open `.env.local` in your code editor and paste the following template:

```env
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

For each variable below: copy the value from Supabase and paste it after the `=` sign in your `.env.local` file.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → **anon public** row in "Project API keys" table | Anonymous (public) key — safe for client-side use with Row Level Security |

### How to get your Supabase credentials

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** and follow the steps to create a new Supabase project
3. Wait for your project to be created (this takes about 2 minutes)
4. In the left sidebar, click **Settings** (the gear icon)
5. Click **API** in the settings menu
6. Copy the **Project URL** and paste it into `NEXT_PUBLIC_SUPABASE_URL` in your `.env.local`
7. In the same page, copy the **anon public** key from the "Project API keys" table and paste it into `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your `.env.local`

## 📁 Project Structure

- `src/app/dashboard` — Dashboard pages and layouts (Next.js App Router)
- `src/components/dashboard` — Dashboard UI components (Sidebar, MatchTable, TableFilters)
- `src/lib/supabase` — Supabase client utilities and database queries
- `src/types` — TypeScript type definitions for match statistics

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository (`haraus`)
3. In the **Environment Variables** section, add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` → paste your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → paste your Supabase anon key
4. Click **Deploy**

Your app will be live on a Vercel URL (e.g., `your-app.vercel.app`) once the deployment finishes.

## 📝 License

MIT