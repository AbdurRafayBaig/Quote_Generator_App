# Quote Generator App

## Overview

This is a modern React-based quote generator application built with TypeScript, featuring a beautiful gradient UI with light/dark theme support. The app displays inspirational quotes with features like favorites management, social sharing, and a responsive design using shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks with local state and React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API**: RESTful API with JSON responses
- **Data Storage**: In-memory storage (MemStorage class) with sample quotes
- **Database Ready**: Drizzle ORM configured for PostgreSQL (schema defined but not actively used)

### Key Components

#### Frontend Components
- **QuoteGenerator**: Main component handling quote display, favorites, and sharing
- **ThemeProvider**: Context provider for dark/light theme management
- **UI Components**: Complete shadcn/ui component library for consistent design
- **Pages**: Home, Favorites, and NotFound page components

#### Backend Components
- **Routes**: API endpoints for quotes (`/api/quotes`, `/api/quotes/random`, `/api/quotes/:id`)
- **Storage**: Abstract storage interface with in-memory implementation
- **Vite Integration**: Development server with HMR support

### Data Flow

1. **Quote Fetching**: React Query handles API calls to fetch quotes from Express server
2. **State Management**: Local state for UI interactions, server state cached by React Query
3. **Favorites**: Stored in localStorage with React state synchronization
4. **Theme**: Context-based theme management with system preference detection
5. **Navigation**: Client-side routing with Wouter for SPA experience

### External Dependencies

#### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for data fetching
- **UI Libraries**: Radix UI primitives, Lucide React icons, Framer Motion animations
- **Utilities**: clsx, class-variance-authority, date-fns, tailwind-merge

#### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect and Neon Database client
- **Development**: tsx for TypeScript execution, esbuild for production builds

#### Development Tools
- **Build**: Vite with React plugin and runtime error overlay
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **TypeScript**: Configured with strict mode and path aliases

### Deployment Strategy

- **Development**: 
  - Frontend: Vite dev server with HMR
  - Backend: tsx for TypeScript execution
  - Database: Configured for PostgreSQL but using in-memory storage

- **Production**:
  - Frontend: Static build output to `dist/public`
  - Backend: Compiled with esbuild to `dist/index.js`
  - Database: Ready for PostgreSQL with Drizzle migrations

#### Build Process
1. Frontend builds to static assets
2. Backend compiles to single JavaScript file
3. Database migrations ready via `drizzle-kit`
4. Environment variable configuration for database connection

#### Current State
- Application runs with sample data in memory
- Database schema defined but not actively used
- Ready for PostgreSQL integration when needed
- Fully functional quote generator with favorites and theming