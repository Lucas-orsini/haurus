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
- **Secure Authentication** — User account creation and login with email/password

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Tektur (Google Fonts via next/font/google)

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

### 3. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac)

## 🔐 Authentication

Haurus includes user authentication pages for account management.

### Login

Access the login page at `/login` or click the sign-in button in the navbar.

- Enter your email and password
- Click "Sign In" to access your account
- Use the "Forgot password?" link if needed (coming soon)

### Sign Up

Create a new account at `/signup` or click the "Get Started" button in the navbar.

- Enter your full name
- Enter your email address
- Choose a secure password (minimum 8 characters)
- Click "Create Account" to register

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, Tailwind imports, font-family on body
│   ├── layout.tsx           # Root layout with Tektur font and metadata
│   ├── page.tsx             # Home page composing all sections
│   ├── login/
│   │   └── page.tsx         # Login page for existing users
│   └── signup/
│       └── page.tsx         # Sign up page for new users
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Top navigation bar with auth buttons (Login/Sign Up)
│   │   └── Footer.tsx       # Site footer with legal disclaimer
│   ├── sections/
│   │   ├── Hero.tsx              # Hero section with BETA AVAILABLE badge
│   │   ├── MetricsShowcase.tsx   # Available metrics display
│   │   ├── WhyHaurus.tsx         # Data layer & tipster service differentiators
│   │   ├── SocialProof.tsx       # Testimonials or credibility elements
│   │   └── Pricing.tsx           # Subscription tiers display
│   └── ui/
│       └── Button.tsx      # Reusable button component with variants
├── lib/
│   └── utils.ts            # Utility functions (cn helper for Tailwind)
└── public/
    └── (static assets)
```

## 🔤 Typography

Haurus uses **Tektur** as its sole typeface, loaded via `next/font/google` for optimal performance. The font is configured in `src/app/layout.tsx` and applied globally to the `<body>` element via CSS variable.

## 📝 License

MIT