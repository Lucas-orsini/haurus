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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | [Supabase Dashboard](https://app.supabase.com) → Your project → Settings → API → anon.public | Your Supabase anonymous (public) key |

### Steps to find your Supabase credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** (the gear icon)
4. Click **API** in the sidebar
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Under "API Keys", copy the **anon public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Running Tests

Unit tests automatically verify that the application logic works correctly. When you run them, Jest will tell you if everything passes (✓) or if something broke (✗).

### Run all tests

```bash
npm test
```

### Run a specific test file

```bash
npm test -- matchFormatters.test.ts
```

### Watch mode (re-runs tests automatically when files change)

```bash
npm test -- --watch
```

### What the tests cover

- **`__tests__/matchFormatters.test.ts`** — Tests for match data formatting utilities (win rate calculations, score formatting, ranking comparisons)

### Reading Jest output

- **PASS** — All assertions in the test passed. Your code is working correctly.
- **FAIL** — Something broke. Jest shows which test failed and why (expected vs. received value).

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── dashboard/         # Protected dashboard pages
│   └── page.tsx           # Landing page
├── components/
│   ├── auth/              # Authentication form components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/                # Reusable UI components (buttons, inputs, cards)
├── lib/
│   ├── supabase/          # Supabase client setup (browser & server)
│   └── utils.ts           # Utility functions (cn for class merging)
└── types/                 # TypeScript type definitions
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by step:

1. Click the **Deploy with Vercel** button above (or go to [vercel.com/new](https://vercel.com/new))
2. Import your GitHub repository (`haraus`)
3. In the **Environment Variables** section, add all variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` → your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → your Supabase anon key
4. Click **Deploy**

Vercel will automatically build and deploy your app. After deployment, remember to update your Supabase dashboard with the new production URL if needed (for authentication redirect URLs, etc.).

## 📝 License

MIT

---

**Fix applied**: Resolved the React "unique key prop" warning in `SearchAndFilters.tsx` by using `${tournament}-${index}` as the key to ensure uniqueness for tournament dropdown options.