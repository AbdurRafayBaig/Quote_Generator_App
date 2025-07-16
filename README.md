**# Quote Generator App** <br>
A beautiful, modern quote generator built with React, TypeScript, Express, and Tailwind CSS. Features dark/light theme support, favorites management, and social sharing.

**Overview** <br>
This is a modern React-based quote generator application built with TypeScript, featuring a beautiful gradient UI with light/dark theme support. The app displays inspirational quotes with features like favorites management, social sharing, and a responsive design using shadcn/ui components.

**User Preferences** <br>
Preferred communication style: Simple, everyday language.<br>
<br>
**System Architecture** <br>
**Frontend Architecture** <br>
Framework: React 18 with TypeScript <br>
Build Tool: Vite for development and production builds <br>
Routing: Wouter for client-side routing <br>
State Management: React hooks with local state and React Query for server state <br>
Styling: Tailwind CSS with CSS variables for theming <br>
UI Components: shadcn/ui component library built on Radix UI primitives <br>
**
Backend Architecture** <br>
Runtime: Node.js with Express.js <br>
Language: TypeScript with ES modules <br>
API: RESTful API with JSON responses <br>
Data Storage: In-memory storage (MemStorage class) with sample quotes <br>
Database Ready: Drizzle ORM configured for PostgreSQL (schema defined but not actively used) <br>
<br>
****Key Components** <br>
Frontend Components** <br>
QuoteGenerator: Main component handling quote display, favorites, and sharing <br>
ThemeProvider: Context provider for dark/light theme management <br>
UI Components: Complete shadcn/ui component library for consistent design <br>
Pages: Home, Favorites, and NotFound page components<br>
<br>
**Backend Components** <br>
Routes: API endpoints for quotes (/api/quotes, /api/quotes/random, /api/quotes/:id) <br>
Storage: Abstract storage interface with in-memory implementation<br>
Vite Integration: Development server with HMR support <br>
<br>
**Data Flow** <br>
Quote Fetching: React Query handles API calls to fetch quotes from Express server<br>
State Management: Local state for UI interactions, server state cached by React Query<br>
Favorites: Stored in localStorage with React state synchronization<br>
Theme: Context-based theme management with system preference detection<br>
Navigation: Client-side routing with Wouter for SPA experience <br>
<br>
**External Dependencies** <br>
**Frontend Dependencies** <br>
React Ecosystem: React 18, React DOM, React Query for data fetching <br>
UI Libraries: Radix UI primitives, Lucide React icons, Framer Motion animations <br>
Utilities: clsx, class-variance-authority, date-fns, tailwind-merge <br>
<br>
**Backend Dependencies** <br>
Server: Express.js with TypeScript support<br>
Database: Drizzle ORM with PostgreSQL dialect and Neon Database  <br>
Development: tsx for TypeScript execution, esbuild for production builds<br>
<br>
**Development Tools** <br>
Build: Vite with React plugin and runtime error overlay<br>
Styling: Tailwind CSS with PostCSS and Autoprefixer<br>
TypeScript: Configured with strict mode and path aliases<br>
<br>
**Deployment Strategy** <br>
**Development:** <br>
Frontend: Vite dev server with HMR<br>
Backend: tsx for TypeScript execution<br>
Database: Configured for PostgreSQL but using in-memory storage<br>
<br>
**Production:** <br>
Frontend: Static build output to dist/public<br>
Backend: Compiled with esbuild to dist/index.js<br>
Database: Ready for PostgreSQL with Drizzle migrations<br>
<br>
**Build Process** <br>
Frontend builds to static assets <br>
Backend compiles to single JavaScript file <br>
Database migrations ready via drizzle-kit <br>
Environment variable configuration for database connection <br> 
<br>
**Current State** <br>
Application runs with sample data in memory <br>
Database schema defined but not actively used <br>
Ready for PostgreSQL integration when needed <br>
Fully functional quote generator with favorites and theming
