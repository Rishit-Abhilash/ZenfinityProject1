# Zenfinity Energy - Battery Analytics Dashboard

A comprehensive battery analytics dashboard built for Zenfinity Energy's internship assignment. This dashboard provides real-time insights into battery performance, health metrics, and cycle analysis.

## Features

### Core Features
- **Cycle Navigation**: Browse through different battery cycles with previous/next controls and quick access to the latest cycle
- **Cycle Statistics**: Comprehensive overview of cycle duration, distance traveled, SOH drop, and charging events
- **Battery Health Monitoring**: Visual gauges for State of Charge (SOC) with min/max ranges
- **Temperature Distribution**: Interactive temperature analysis with toggleable 5°C, 10°C, and 15°C range grouping
- **Performance Metrics**: Speed analysis showing average and maximum speeds
- **Voltage Statistics**: Detailed voltage metrics (average, minimum, maximum)
- **Alerts & Protections**: Real-time display of warnings and protection triggers
- **Multi-Battery Support**: Switch between different battery IMEIs

### Bonus Feature
- **SOH Degradation Trend**: Long-term State of Health analysis across all cycles with visual trend line

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (custom Zenfinity brand styling)
- **Data Fetching**: SWR (stale-while-revalidate)
- **Visualization**: Recharts
- **Date Formatting**: date-fns
- **Icons**: lucide-react

## Project Structure

```
src/
├── app/                      # Next.js app router
│   ├── api/proxy/           # API proxy routes
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main dashboard
│   └── globals.css          # Global styles
├── components/
│   ├── charts/              # Reusable chart components
│   ├── layout/              # Header, Footer
│   ├── providers/           # React context providers
│   └── ui/                  # Base UI components
├── hooks/                   # Custom React hooks (SWR)
├── lib/
│   ├── api/                 # API client
│   ├── constants/           # Colors, IMEIs
│   └── utils/               # Formatters, calculations
└── types/                   # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone or extract the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. The environment variables are already configured in `.env.local`

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## API Integration

The dashboard connects to the Zenfinity Battery Snapshots API:
- **Base URL**: `https://zenfinity-intern-api-104290304048.europe-west1.run.app`
- **Allowed IMEIs**:
  - 865044073967657
  - 865044073949366

### API Endpoints Used
1. `GET /api/snapshots/summary` - Battery summary
2. `GET /api/snapshots?imei={imei}` - All cycle snapshots for a battery
3. `GET /api/snapshots/{imei}/latest` - Latest cycle data
4. `GET /api/snapshots/{imei}/cycles/{cycle_number}` - Specific cycle data

## Key Features Explained

### Temperature Distribution Toggle
The dashboard allows users to view temperature distribution in different granularities:
- **5°C ranges**: Most detailed view (default API data)
- **10°C ranges**: Aggregates two 5°C ranges
- **15°C ranges**: Aggregates three 5°C ranges

### SOH Trend Calculation
State of Health degradation is calculated cumulatively:
```
SOH(cycle_n) = 100% - Σ(soh_drop from cycle_1 to cycle_n)
```

### Data Caching
SWR provides intelligent caching:
- Summary data: 60 seconds
- Snapshots: 60 seconds
- Latest cycle: 30 seconds
- Specific cycle: 120 seconds

## Design System

The dashboard uses Zenfinity Energy's brand identity:

### Colors
- **Primary**: #002639 (Navy)
- **Accent**: #FBD602 (Gold/Yellow)
- **Background**: #E8E8E8 (Light Gray)
- **Text**: #171717 (Dark Gray)

### Typography
- **Display**: Red Hat Display
- **Mono**: Red Hat Mono
- **Body**: Red Hat Text

## Deployment

### Deploy to Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. Deploy via Vercel Dashboard or CLI:
   - **Via Dashboard**: Connect your GitHub repository to Vercel
   - **Via CLI**: Run `vercel` and follow the prompts

3. **IMPORTANT**: Set the following environment variable in Vercel:
   - Go to your project settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_BASE_URL` = `https://zenfinity-intern-api-104290304048.europe-west1.run.app`
   - Make sure to apply it to all environments (Production, Preview, Development)
   - Redeploy after adding the environment variable

4. The dashboard will be available at your Vercel deployment URL

**Note**: The API will return 500 errors if `NEXT_PUBLIC_API_BASE_URL` is not configured. Check the Vercel function logs for detailed error messages.

The dashboard is production-ready and optimized for Vercel's edge network.

## Features Checklist

### Part 1: Data Retrieval ✅
- [x] Fetch summary
- [x] Choose IMEI
- [x] Fetch cycle snapshots

### Part 2: Dashboard ✅
- [x] Cycle navigation
- [x] Cycle stats
- [x] Performance metrics
- [x] Temperature distribution (with toggle)
- [x] Battery health (SOC/SOH)
- [x] Alerts display
- [x] Charging insights
- [x] Additional insights (voltage, duration)

### Part 3: Bonus ✅
- [x] Long-term SOH degradation trends

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance Optimizations

- Server-side rendering with Next.js
- Automatic code splitting
- SWR data caching and deduplication
- Optimized chart rendering with Recharts
- CSS Modules for scoped styling

## Author

Created for Zenfinity Energy Internship Assignment
Deadline: December 14, 2025

---

**Note**: This dashboard is a demonstration project for the Zenfinity Energy internship assignment and uses real API endpoints provided for the assessment.
