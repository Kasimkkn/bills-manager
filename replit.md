# Invoice Generator Application

## Overview

This is a modern, full-stack invoice generation application built with React, TypeScript, and Express. The app allows users to create professional invoices using customizable templates, with features like PDF generation, multiple currency support, and usage tracking. It's designed for freelancers, small businesses, and enterprises who need to generate beautiful, tax-compliant invoices quickly.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI components
- **State Management**: React Context API for invoice data and template selection
- **Routing**: React Router for client-side navigation between landing page, dashboard, and editor
- **Component Structure**: Modular design with separate contexts for invoice data and template management

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Build System**: ESBuild for production bundling
- **Development**: Hot module replacement via Vite integration
- **Storage Interface**: Abstracted storage layer with in-memory implementation for user data

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema definition
- **Local Storage**: Browser localStorage for invoice drafts, template preferences, and usage tracking
- **File Storage**: Base64 encoding for logo uploads and document management

### Authentication and Authorization
- **Current State**: No authentication implemented (guest mode)
- **User Management**: Basic user schema defined in shared/schema.ts for future implementation
- **Session Management**: Ready for PostgreSQL session storage via connect-pg-simple

### Template System
- **Template Engine**: Multiple pre-built invoice templates (Modern, Freelancer, Retail, Service, Hospitality)
- **Customization**: Template-specific field configuration and styling options
- **PDF Generation**: HTML-to-PDF conversion using jsPDF and html2canvas for exact visual matching

### Usage Tracking and Monetization
- **Free Tier**: 3 free PDF downloads with local storage tracking
- **Upgrade Flow**: Modal-based conversion system for premium features
- **Analytics**: Built-in hooks for tracking user behavior and usage patterns

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: Serverless PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM and query builder
- **@tanstack/react-query**: Server state management and caching

### UI Components
- **@radix-ui/***: Comprehensive accessible component primitives
- **class-variance-authority**: Type-safe component variant management
- **tailwindcss**: Utility-first CSS framework

### PDF Generation
- **jspdf**: Client-side PDF generation
- **html2canvas**: HTML element to canvas conversion for PDF rendering

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error handling in Replit environment
- **@replit/vite-plugin-cartographer**: Development environment integration

### Utilities
- **date-fns**: Date manipulation and formatting
- **zod**: Runtime type validation and schema definition
- **nanoid**: Unique ID generation for invoices and components