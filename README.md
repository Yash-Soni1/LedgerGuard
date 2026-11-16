# LedgerGuard

### Dynamic Multi-Tenant Zero-Knowledge Billing Engine

LedgerGuard is a multi-tenant SaaS billing engine designed to provide secure tenant isolation, reliable usage tracking, and consistent financial ledger operations.

The project focuses on building a scalable backend architecture with idempotent billing, dynamic database connections, transaction safety, and real-time analytics.

> **Development Status:** Active Development
> **Project Timeline:** November 15 - December 9, 2026
> **Current Milestone:** Foundation Completed

---

## Table of Contents

- [Overview](#overview)
- [Core Objectives](#core-objectives)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Features and Progress](#features-and-progress)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Documentation](#documentation)
- [Development Roadmap](#development-roadmap)
- [Security Considerations](#security-considerations)

---

## Overview

LedgerGuard aims to provide a reliable billing infrastructure for applications operating across multiple organizations or tenants.

Its architecture is designed around:

- **Multi-tenancy:** Isolated organization-level data access.
- **Idempotency:** Preventing duplicate usage and billing operations.
- **Financial consistency:** Transaction-safe ledger operations.
- **Dynamic database management:** Runtime tenant-specific database connections.
- **Real-time analytics:** Monitoring usage and billing activity.
- **Cryptographic verification:** RSA-SHA256 payload signing and verification.

The initial MVP will simulate billing operations. It will not process real payments.

## Core Objectives

1. Build a scalable multi-tenant backend.
2. Implement secure authentication and authorization.
3. Establish reliable tenant isolation.
4. Prevent duplicate billing through idempotent processing.
5. Maintain financial consistency using database transactions.
6. Build a real-time analytics dashboard.
7. Implement cryptographic payload verification.
8. Provide comprehensive testing and documentation.

## Technology Stack

| Category | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Backend Language | TypeScript |
| Database | MongoDB |
| ODM | Mongoose |
| Validation | Zod |
| Authentication | JWT |
| Distributed Locking | Redis (planned) |
| Real-time Communication | Socket.io (planned) |
| Cryptography | RSA-SHA256 |
| Version Control | Git and GitHub |

## System Architecture

The planned high-level architecture:

```text
             Next.js Dashboard
                     |
                     v
               Express API
                     |
                     v
           Authentication Layer
                     |
                     v
               Tenant Context
                     |
                     v
             Service Layer
                     |
          +----------+----------+
          |          |          |
          v          v          v
      Tenant DB    Redis     Ledger Engine
      Registry     Locks     & Transactions
          |          |          |
          +----------+----------+
                     |
                     v
                 MongoDB
                     |
                     v
           Analytics & Real-time
```

This architecture is a development target. Individual components will be documented as they are implemented.

## Features and Progress

### Foundation

- [x] Initialize Next.js frontend.
- [x] Initialize Express backend.
- [x] Configure MongoDB Atlas connection.
- [x] Integrate frontend and backend.
- [x] Configure strict backend TypeScript.
- [x] Implement Zod environment validation.
- [x] Implement centralized error handling.
- [x] Verify backend production build.
- [x] Verify production server startup.
- [x] Push foundation changes to GitHub.

### Authentication and Organizations

- [x] User registration and login.
- [x] Password hashing.
- [x] JWT authentication.
- [x] Organization management.
- [x] Membership and role management.
- [x] Tenant-aware authentication middleware.

### Multi-Tenant Architecture

- [ ] Dynamic tenant database connections.
- [ ] Tenant connection registry.
- [ ] Connection lifecycle management.
- [ ] Tenant isolation testing.

### Billing Engine

- [ ] Usage event ingestion.
- [ ] Event validation and unique identifiers.
- [ ] Idempotency service.
- [ ] Redis distributed locking.
- [ ] Financial ledger.
- [ ] Atomic database transactions.

### Dashboard and Analytics

- [ ] Dashboard overview.
- [ ] Usage analytics.
- [ ] Transaction history.
- [ ] Organization settings.
- [ ] Real-time updates.
- [ ] Responsive UI.

### Security and Cryptography

- [ ] RSA key generation.
- [ ] Payload signing.
- [ ] Signature verification.
- [ ] Security hardening.
- [ ] Integration and security testing.

## Project Structure

```text
LedgerGuard/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── env.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_DESIGN.md
│   ├── DEVELOPMENT_LOG.md
│   └── SECURITY.md
│
├── public/
├── README.md
├── next.config.ts
├── package.json
└── tsconfig.json
```

The structure will be updated as the project grows.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd LedgerGuard
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the backend

```bash
npm run dev
```

### 5. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend runs on port `3000` and the backend runs on port `5000` by default.

**Important:** Never commit actual environment variables, database credentials, or private cryptographic keys.

## API Endpoints

### Currently Implemented

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Backend health check |

More endpoints will be documented as they are implemented.

## Documentation

Detailed technical documentation is maintained in the `docs/` directory.

| Document | Description |
|---|---|
| [Architecture](docs/ARCHITECTURE.md) | System design and component interactions |
| [API Documentation](docs/API_DOCUMENTATION.md) | API endpoints and request/response formats |
| [Database Design](docs/DATABASE_DESIGN.md) | Database schemas and relationships |
| [Development Log](docs/DEVELOPMENT_LOG.md) | Daily progress and completed milestones |
| [Security](docs/SECURITY.md) | Security architecture and implementation |

## Development Roadmap

| Phase | Planned Work | Status |
|---|---|---|
| Day 1 | Foundation and frontend/backend integration | Completed |
| Days 2–3 | Backend architecture | Upcoming |
| Days 4–5 | Authentication | Upcoming |
| Days 6–7 | Organizations and tenant isolation | Upcoming |
| Day 8 | Dynamic database connections | Upcoming |
| Days 9–10 | Usage events and idempotency | Upcoming |
| Day 11 | Redis distributed locks | Upcoming |
| Days 12–13 | Ledger and transactions | Upcoming |
| Day 14 | Mid-project review | Upcoming |
| Days 15–19 | Analytics APIs and dashboard | Upcoming |
| Days 20–21 | Real-time features and UI polish | Upcoming |
| Day 22 | Cryptographic layer | Upcoming |
| Day 23 | Security hardening | Upcoming |
| Days 24–25 | Testing, deployment and documentation | Upcoming |

**Target completion:** December 9, 2026.

## Security Considerations

The architecture follows these principles:

- Tenant identity must originate from verified authentication.
- Clients must not control tenant database selection.
- Database unique indexes must enforce durable idempotency.
- Distributed locks must have expiration and ownership-based release.
- MongoDB multi-document transactions require replica-set or sharded-cluster support.
- Secrets and private keys must never be committed to source control.

## Current Development Milestone

### November 15, 2026 — Day 1 Completed

**Completed work:**

- Initialized the Next.js frontend and Express backend.
- Connected MongoDB Atlas.
- Integrated frontend and backend through an API rewrite.
- Implemented strict TypeScript configuration.
- Added Zod environment validation.
- Implemented centralized Express error handling.
- Verified backend production build.
- Verified production server startup.
- Pushed completed changes to GitHub.

**Git milestones:**

- `1: Set up LedgerGuard backend and frontend integration`
- `2: Configure strict TypeScript and backend error handling`

---

*LedgerGuard is actively under development. This documentation will be maintained alongside implementation to ensure that project progress accurately reflects the codebase.*