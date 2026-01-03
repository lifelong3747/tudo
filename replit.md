# replit.md

## Overview

This is a full-stack task/todo management application built for study sessions. Users can add, complete, and delete study tasks with smooth animations and a celebration effect (confetti) when all tasks are completed. The application uses a React frontend with a Node.js/Express backend, storing tasks in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement (HMR) for development
- **Styling**: Tailwind CSS with CSS variables for theming (dark mode default)
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state, local React state for UI
- **Animations**: Framer Motion for task transitions and micro-interactions
- **Special Effects**: canvas-confetti for celebration effects on task completion

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful API with typed routes defined in `shared/routes.ts`
- **Validation**: Zod schemas for input validation, shared between client and server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # UI components (including shadcn/ui)
│   │   ├── hooks/        # Custom React hooks (use-tasks, use-toast)
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database storage layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API route definitions with Zod schemas
└── migrations/       # Drizzle database migrations
```

### Key Design Patterns
- **Type Safety**: End-to-end TypeScript with shared types between frontend and backend
- **API Contract**: Route definitions with request/response schemas in `shared/routes.ts`
- **Storage Abstraction**: `IStorage` interface for database operations, allowing for easy testing/swapping
- **Component Architecture**: Atomic design with reusable UI primitives from shadcn/ui

### Database Schema
Single `tasks` table with:
- `id`: Serial primary key
- `text`: Task description (text, required)
- `completed`: Boolean completion status (default false)

### Build Process
- Development: `npm run dev` - runs Vite dev server with HMR proxied through Express
- Production: `npm run build` - builds frontend with Vite, bundles server with esbuild
- Database: `npm run db:push` - pushes schema changes to database using Drizzle Kit

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connected via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database operations and schema management
- **connect-pg-simple**: PostgreSQL session store (available but not currently used)

### Key NPM Packages
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth UI transitions
- **canvas-confetti**: Celebration effects
- **zod**: Runtime type validation
- **drizzle-zod**: Automatic Zod schema generation from Drizzle schemas

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundling for production
- **Drizzle Kit**: Database migration and schema management
- **@replit/vite-plugin-***: Replit-specific development plugins