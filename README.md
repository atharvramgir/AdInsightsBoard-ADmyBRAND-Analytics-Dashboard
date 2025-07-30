# ADmyBRAND Insights - Analytics Dashboard

A modern, visually stunning analytics dashboard for digital marketing agencies with interactive charts, real-time data updates, and comprehensive data visualization.

## Features

- 📊 **Interactive Charts**: Line charts, donut charts, and bar charts with responsive design
- 🌓 **Dark/Light Mode**: Seamless theme switching with smooth transitions
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts
- ⚡ **Real-time Updates**: Automatic data refresh every 30 seconds
- 📤 **Export Functionality**: JSON and CSV export capabilities
- 🎨 **Modern UI/UX**: Smooth animations and micro-interactions
- 🔒 **Security**: Production-ready security headers and error handling

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS + Radix UI
- **Charts**: Recharts for data visualization
- **State Management**: TanStack Query (React Query)
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM (ready for production)

## Deployment on Vercel

### Prerequisites

1. Create a [Vercel account](https://vercel.com)
2. Install Vercel CLI (optional): `npm i -g vercel`

### Deploy from GitHub

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Environment Variables** (if using database):
   - In Vercel dashboard, go to Project Settings > Environment Variables
   - Add: `DATABASE_URL` (your PostgreSQL connection string)

4. **Deploy**:
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-project-name.vercel.app`

### Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add DATABASE_URL
   ```

### Configuration

The project includes a `vercel.json` configuration file that:
- Builds the frontend with Vite
- Sets up serverless functions for the API
- Configures routing for both frontend and backend
- Optimizes for production deployment

### Build Configuration

- **Frontend Build**: `vite build --outDir dist/public`
- **API Functions**: Serverless functions in `/api` directory
- **Static Assets**: Served from `dist/public`
- **Environment**: Automatically set to production

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api

## Project Structure

```
├── api/                 # Vercel serverless functions
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilities and configuration
│   │   └── pages/       # Application pages
├── server/              # Express backend (for local dev)
├── shared/              # Shared types and schemas
├── vercel.json          # Vercel deployment configuration
└── package.json         # Dependencies and scripts
```

## API Endpoints

- `GET /api/metrics` - Dashboard overview metrics
- `GET /api/campaigns` - Campaign data with performance metrics
- `GET /api/revenue-data` - Monthly revenue data for charts
- `GET /api/traffic-sources` - Traffic source breakdown
- `GET /api/export` - Data export functionality
- `GET /api/health` - Health check endpoint

## Performance Features

- **Caching**: API responses cached with appropriate headers
- **Real-time Updates**: Automatic data refresh with status indicator
- **Loading States**: Beautiful loading skeletons for better UX
- **Error Boundaries**: Graceful error handling and recovery
- **SEO Optimized**: Comprehensive meta tags and Open Graph properties

## Security

- XSS Protection headers
- Content Security Policy
- Frame options protection
- HTTPS enforcement in production
- Input validation and sanitization

## Support

For deployment issues or questions, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Project Issues](https://github.com/your-repo/issues)

---

Built with ❤️ for digital marketing agencies