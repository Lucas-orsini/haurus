# Haurus

The metrics bookmakers use. Now yours.

## ✨ Features

- **Advanced Tennis Analytics** — Glicko-2 ratings by surface, p_serve, p_return, and more
- **Surface-Specific Ratings** — Glicko-2 ratings calibrated per playing surface (hard, clay, grass)
- **Serve & Return Performance** — Probability-weighted serve and return metrics for precise match modeling
- **Momentum Tracking** — Momentum TD and Fatigue 72h indicators
- **Ranking Trends** — 6-month rank delta (Δ Rank 6m) for form assessment
- **Three Subscription Tiers** — Starter (€20), Analyst (€50), Pro (€79)
- **Dark Analytics Interface** — Professional, distraction-free design optimized for data analysis
- **Dynamic Card Hover Effects** — Cards feature luminous glow effects that match the icon color on hover for "Data Layer" and "Not a Tipster Service" sections
- **Secure Authentication** — User account creation and login with email/password powered by Supabase Auth

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Tektur (Google Fonts via next/font/google)
- **Auth & Database**: Supabase (Auth + PostgreSQL)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended
- Git installed
- A Supabase account — [Sign up free](https://supabase.com)

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

Open `.env.local` in your code editor and add your Supabase credentials. See the [Environment Variables](#-environment-variables) section below for where to find each value.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → Project API keys (table row "anon public") | Anonymous (public) key — safe for client-side use with Row Level Security |

### How to get your Supabase credentials

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** and follow the steps to create a new Supabase project
3. Wait for your project to be created (this takes about 2 minutes)
4. In the left sidebar, click **Settings** (the gear icon)
5. Click **API**
6. Find **Project URL** — copy it and paste as `NEXT_PUBLIC_SUPABASE_URL`
7. Find **API Keys** → **anon public** — click **Copy** and paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Your `.env.local` file should look like this:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔐 Authentication

Haurus includes secure user authentication powered by Supabase Auth.

### Sign Up

Create a new account at `/signup` or click the **"Get Started"** button in the navbar.

- Enter your full name
- Enter your email address
- Choose a secure password (minimum 8 characters)
- Click **"Create Account"** to register

When you sign up:
- Your account is created in Supabase Auth (email + password)
- A user record is automatically created in the `users` table in your database

### Login

Access the login page at `/login` or click the **"Login"** button in the navbar.

- Enter your email and password
- Click **"Sign In"** to access your account
- Supabase verifies your credentials and creates a secure session

### Protected Pages

Once logged in, protected pages (coming soon) will:
- Verify your session on the server side
- Redirect to `/login` if you are not authenticated

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css              # Global styles, Tailwind imports, custom fonts
│   ├── layout.tsx               # Root layout with Tektur font and metadata
│   ├── page.tsx                 # Home page composing all sections
│   ├── login/
│   │   └── page.tsx             # Login page for existing users
│   └── signup/
│       └── page.tsx             # Sign up page for new users
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Top navigation bar with auth buttons
│   │   └── Footer.tsx            # Site footer with legal disclaimer
│   └── sections/
│       ├── Hero.tsx             # Hero section with BETA AVAILABLE badge
│       └── MetricsShowcase.tsx   # Available metrics cards with hover effects
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase client for browser (CSR)
│   │   └── server.ts             # Supabase client for server components (SSR)
│   └── utils.ts                  # Utility functions (cn helper, etc.)
└── types/
    └── index.ts                  # TypeScript type definitions
```

## 🚀 Deploy to Vercel

[![Deploy](https://vercel.com/button)](https://vercel.com/new)

### Step-by-step deployment

1. **Push your code to GitHub** (if you haven't already)

2. **Go to Vercel** — Click the button above or visit [vercel.com/new](https://vercel.com/new)

3. **Import your repository** — Select your GitHub repo from the list

4. **Configure project** — Keep the default settings (Framework: Next.js)

5. **Add environment variables** — Click **Environment Variables** and add each variable:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL (from Settings → API) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key (from Settings → API) |

6. **Deploy** — Click **Deploy**

Your app will be live at `https://your-project.vercel.app` within seconds.

> ⚠️ **Important**: Make sure to add all environment variables in Vercel, otherwise authentication will not work on your deployed site.

## 📝 License

MIT