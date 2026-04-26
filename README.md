# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Match Statistics Types** — TypeScript interfaces and utilities for match performance data
- **Authentication Middleware** — Secure request handling with Supabase session management
- **Root Layout** — Application shell with proper metadata and font setup

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth & Database**: Supabase

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended
- Git installed

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/haraus.git
cd haus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root. The easiest way:

**Option A — Using VS Code terminal:**
1. Open VS Code
2. Open the integrated terminal: press `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)
3. Run:
```bash
touch .env.local
```

**Option B — Using your file explorer:**
1. Right-click in your project folder
2. Select "New File"
3. Name it `.env.local`

Open `.env.local` in your code editor and paste the following template:

```env
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Now you need to fill in the values. Don't worry if you don't have a Supabase account yet — the section below explains exactly where to get these keys.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → **Project URL** | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → **anon public** row in "Project API keys" table | Anonymous (public) key — safe for client-side use with Row Level Security |

### How to get your Supabase credentials (step by step)

1. Go to [supabase.com](https://supabase.com) and sign in (or click **Start your project** to create a free account)
2. Click **New Project** and follow the steps:
   - Choose a name for your project (e.g., "Haurus")
   - Set a strong database password (save this somewhere safe!)
   - Select a region closest to you
3. Wait for your project to be created (this takes about 2 minutes — you'll see a progress screen)
4. Once ready, you'll land on your project dashboard
5. In the left sidebar, click **Settings** (the gear icon ⚙️)
6. Click **API** in the settings menu
7. Under **Project URL**, click the **Copy** button and paste it into `NEXT_PUBLIC_SUPABASE_URL` in your `.env.local`
8. In the **Project API keys** section, find the **anon public** row and click **Copy**
9. Paste that value into `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your `.env.local`

> ⚠️ **Important**: The `anon public` key is safe to use in client-side code because of Supabase's Row Level Security (RLS). Never share your **service role** key — that one has full database access.

## 📁 Project Structure

- `src/app` — Next.js App Router root layout
- `src/lib/supabase` — Supabase client utilities and match statistics types
- `src/middleware.ts` — Authentication and session middleware

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. **Connect your repository**
   - Click the deploy button above (or go to [vercel.com/new](https://vercel.com/new))
   - Import your GitHub repository (`haraus`)
   - Vercel will auto-detect Next.js settings

2. **Add environment variables**
   - In the Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add each variable from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon key
   - Click **Save**

3. **Deploy**
   - Click **Deploy** — Vercel will build and deploy your app
   - Your live URL will be shown (e.g., `https://haraus.vercel.app`)

> 💡 **Tip**: Every push to your `main` branch will automatically trigger a new deployment.

## 📝 License

MIT