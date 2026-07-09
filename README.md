# Restaurant Finance & Cash Flow Dashboard

Premium dark-themed admin dashboard for managing restaurant income, expenses, and cash flow.

## Stack
- Next.js 15 (App Router, src/ directory)
- React 19
- Tailwind CSS v4
- Recharts
- Context API + localStorage persistence
- No TypeScript, no ESLint, no import aliases, no UI libraries

## Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000 — it redirects to /dashboard.

## Data
All data is stored in the browser's localStorage under these keys:
- `rf_income`
- `rf_expenses`
- `rf_settings`

Use Settings > Backup & Data Management to export/import JSON backups or reset to demo data.
