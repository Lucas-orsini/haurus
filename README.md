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
- **🌍 Full Internationalization** — Complete English and French translations for the entire landing page, with language switcher in navbar, localStorage persistence, and automatic browser language detection

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Internationalization**: next-intl
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

## 🔑 Environment Variables

This project does not require any environment variables. The internationalization system uses next-intl with local JSON translation files.

## 📁 Project Structure

```
haurus/
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   ├── components/
│   │   └── layout/            # Layout components
│   │       ├── Navbar.tsx      # Main navigation with language switcher
│   │       └── LanguageSwitcher.tsx  # EN/FR toggle button
│   ├── messages/               # Translation files
│   │   ├── en.json             # English translations
│   │   └── fr.json             # French translations
│   └── lib/                    # Utility functions and helpers
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.mjs             # Next.js configuration
└── package.json                # Dependencies and scripts
```

## 🌍 Internationalization

The landing page is fully internationalized with **English** and **French** support.

### How It Works

- **Language Switcher**: A toggle button (EN / FR) in the navbar lets users switch languages instantly without page reload
- **Persistence**: The selected language is saved to `localStorage` — it persists across sessions
- **Auto-Detection**: On first visit, the language is automatically detected from the browser's settings
- **Supported Locales**: `en` (English) and `fr` (French)

### Translation Files

All translations are stored in structured JSON files:

```
src/messages/
├── en.json   # English translations
└── fr.json   # French translations
```

### Adding New Translations

To add or modify text:

1. Open `src/messages/en.json` or `src/messages/fr.json`
2. Find or create the appropriate key following the nested structure
3. Update the translation string

Example structure:
```json
{
  "Navbar": {
    "features": "Features",
    "pricing": "Pricing",
    "subscribe": "Subscribe"
  },
  "Hero": {
    "title": "Welcome to Haurus"
  }
}
```

### Adding a New Language

1. Create a new JSON file in `src/messages/` (e.g., `es.json` for Spanish)
2. Copy the structure from `en.json` and translate all values
3. Add the locale to the configuration in `i18n.ts` or `i18n/request.ts`
4. Update the language switcher component if needed

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Step by Step

1. **Push your code to GitHub** — Ensure your repository is public or connected to Vercel

2. **Import to Vercel** — Click the deploy button above or go to [vercel.com/new](https://vercel.com/new)

3. **Import your repository** — Select your GitHub repo from the list

4. **Configure your project** — Vercel auto-detects Next.js settings. Click "Deploy"

5. **That's it!** — Your site is live. Vercel will automatically rebuild when you push changes to your repository.

> 💡 **Note**: This project does not require any environment variables, so no additional configuration is needed.

## 📝 License

MIT