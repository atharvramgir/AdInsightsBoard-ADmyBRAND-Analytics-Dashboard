# ADmyBRAND Insights - Analytics Dashboard

A modern, visually stunning analytics dashboard application built for digital marketing agencies. Track campaign performance, revenue trends, and user engagement with interactive charts and real-time updates.

## Features

### 🎯 Core Dashboard Features
- **Overview Metrics**: Revenue, Users, Conversions, and Growth Rate cards with real-time updates
- **Interactive Charts**: Line charts for revenue trends, donut chart for traffic sources, bar chart for campaign performance
- **Advanced Data Table**: Sortable and filterable campaigns table with pagination
- **Export Functionality**: Download data in JSON or CSV formats

### 🎨 UI/UX Features
- **Professional Design**: Modern design system with consistent typography and spacing
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Micro-interactions, hover effects, and loading states
- **Real-time Updates**: Automatic data refresh every 30 seconds

### ⚡ Technical Features
- **React 18**: Modern React with TypeScript for type safety
- **Tailwind CSS**: Utility-first CSS framework with shadcn/ui components
- **TanStack Query**: Efficient server state management with caching
- **Recharts**: Beautiful, responsive chart library
- **Express.js**: Robust backend API with TypeScript

## Getting Started

### Prerequisites
- Node.js 20+ 
- PostgreSQL database (optional - uses in-memory storage by default)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd admybrand-insights
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (optional)
```bash
cp .env.example .env
# Edit .env with your database configuration
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment

### Replit Deployment
This application is optimized for Replit deployment:

1. The application automatically detects the Replit environment
2. Uses in-memory storage by default (no database setup required)
3. Includes production build configuration
4. SEO-optimized with meta tags and Open Graph properties

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/metrics` - Dashboard overview metrics
- `GET /api/campaigns` - Campaign listing with performance data  
- `GET /api/revenue-data` - Monthly revenue data for charts
- `GET /api/traffic-sources` - Traffic source breakdown
- `GET /api/export?format=json|csv` - Data export functionality

## Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query
- **Build Tool**: Vite
- **Charts**: Recharts

### Backend  
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Storage**: In-memory (production ready) or PostgreSQL
- **Build**: esbuild optimization

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configuration
├── server/                 # Express.js backend
├── shared/                 # Shared types and schemas
└── dist/                   # Production build output
```

## Development

The application includes:
- Hot Module Replacement (HMR) for fast development
- TypeScript for type safety
- ESLint and Prettier for code quality
- Responsive design testing
- Real-time data simulation

## License

MIT License - see LICENSE file for details