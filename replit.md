# ADmyBRAND Analytics Dashboard

## Overview

This is a modern analytics dashboard application built for marketing campaign management and performance tracking. The application provides comprehensive insights into revenue, user engagement, and campaign performance through interactive charts and data visualizations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with a clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and production builds
- **Theme System**: Custom theme provider supporting light/dark modes

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for optimized server bundling

## Key Components

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Migrations**: Handled through drizzle-kit with migrations stored in `./migrations`
- **Schema**: Centralized schema definitions in `shared/schema.ts`

### Data Models
The application manages the following core entities:
- **Users**: Authentication and user management
- **Metrics**: Dashboard overview statistics (revenue, users, conversions, growth rates)
- **Campaigns**: Marketing campaign data with performance metrics
- **Revenue Data**: Monthly revenue tracking for charts
- **Traffic Sources**: Website traffic breakdown by source

### UI Components
- **Component System**: shadcn/ui components with Radix UI primitives
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Charts**: Recharts library for data visualization (line charts, pie charts, bar charts)
- **Design System**: Consistent theming with CSS custom properties

### Storage Layer
The application implements a flexible storage interface (`IStorage`) with two implementations:
- **Memory Storage**: In-memory storage with sample data for development/testing
- **Database Storage**: (Prepared for) Drizzle ORM-based database operations

## Data Flow

1. **Frontend Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Layer**: Express.js routes handle HTTP requests and delegate to storage layer
3. **Storage Layer**: Abstract storage interface allows switching between memory and database storage
4. **Response Handling**: Data flows back through the API to frontend components
5. **UI Rendering**: Components render charts and tables using the fetched data

### API Endpoints
- `GET /api/metrics` - Dashboard overview metrics
- `GET /api/campaigns` - Campaign listing with performance data
- `GET /api/revenue-data` - Monthly revenue data for charts
- `GET /api/traffic-sources` - Traffic source breakdown for pie charts
- `GET /api/export` - Data export functionality (JSON/CSV formats)

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **express**: Web application framework

### UI and Styling
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **recharts**: Chart and data visualization library

### Development Tools
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production build optimization
- **@replit/vite-plugin-***: Replit-specific development plugins

## Deployment Strategy

### Development Mode
- **Frontend**: Vite dev server with HMR and TypeScript support
- **Backend**: Express server with tsx for TypeScript execution
- **Database**: PostgreSQL connection via environment variable
- **Replit Integration**: Special handling for Replit development environment

### Production Build
1. **Frontend Build**: Vite compiles React app to static assets in `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Static Serving**: Express serves built frontend assets in production
4. **Database Migrations**: Drizzle migrations applied via `npm run db:push`

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **REPL_ID**: Replit-specific environment detection

The application is designed to work seamlessly in both local development and cloud deployment environments, with special considerations for Replit's hosting platform.