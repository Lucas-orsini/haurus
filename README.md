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
- **Dashboard Overview** — Real-time searchable match table with expandable metrics panels

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

Open `.env.local` in your code editor and add the following:

```env
# Supabase project URL — https://app.supabase.com/project/<project>/settings/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here

# Supabase anonymous (public) key — exposed client-side, safe with RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

See the [Environment Variables](#-environment-variables) section below for where to find each value in the Supabase dashboard.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

After login, you will be redirected directly to the dashboard overview page at `/dashboard/overview`.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → anon public key | Anonymous key for client-side Supabase access |

## 🧪 Running Tests

Unit tests automatically check that specific parts of the code work correctly without needing the full app running.

### Run all tests

```bash
npx jest
```

### Run a specific test file

```bash
npx jest __tests__/matchFormatters.test.ts
```

### Watch mode (re-runs on file change)

```bash
npx jest --watch
```

### Understanding test output

- **PASS** — All tests in that file passed successfully
- **FAIL** — Something broke; look at the error message below to see which test failed and why
- **FAIL** example output shows the test name, expected value, and actual value received

**Tests covered in this project:**
- `__tests__/matchFormatters.test.ts` — Tests for match data formatting utilities

## 📁 Project Structure

```
├── __tests__/              # Unit tests
├── public/                 # Static assets (favicon, images)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (auth)/         # Authentication pages (login, signup)
│   │   ├── dashboard/      # Protected dashboard pages
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable React components
│   │   ├── ui/             # Base UI components (buttons, inputs, cards)
│   │   └── ...             # Feature-specific components
│   ├── lib/                # Utilities and Supabase client setup
│   │   └── supabase/       # Supabase client configuration
│   └── types/              # TypeScript type definitions
├── .env.local              # Environment variables (create from .env.example)
├── .env.example            # Template for required environment variables
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step

1. **Import your repository** — Click the button above or go to [vercel.com/new](https://vercel.com/new), select "Import Git Repository", and choose your GitHub repo
2. **Add environment variables** — In the Vercel dashboard, go to Settings → Environment Variables and add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy** — Click "Deploy". Vercel will automatically detect Next.js and configure the build settings
4. **Custom domain (optional)** — Configure your custom domain in Settings → Domains

> ⚠️ **Important**: Make sure all environment variables from `.env.local` are added to Vercel before deploying. The app will not work without `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 📝 License

MIT