# LedgerGuard

### Dynamic Multi-Tenant Zero-Knowledge Billing Engine

LedgerGuard is a multi-tenant SaaS billing engine designed to provide secure tenant isolation, reliable usage tracking, and consistent financial ledger operations.

The project focuses on building a scalable backend architecture with idempotent billing, dynamic database connections, transaction safety, cryptographic verification, and real-time analytics.

> **Development Status:** Active Development
> **Project Timeline:** November 15 – December 9, 2026
> **Current Milestone:** Foundation and Authentication Completed
> **Current Progress:** Day 3 of 25

---

## Table of Contents

- [Overview](#overview)
- [Core Objectives](#core-objectives)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Implemented Features and Progress](#implemented-features-and-progress)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Documentation](#documentation)
- [Development Roadmap](#development-roadmap)
- [Security Considerations](#security-considerations)
- [Current Development Milestone](#current-development-milestone)

---

## Overview

LedgerGuard aims to provide reliable billing infrastructure for applications operating across multiple organizations or tenants.

Its architecture is designed around the following principles:

- **Multi-tenancy:** Organization-level data isolation.
- **Idempotency:** Preventing duplicate usage and billing operations.
- **Financial consistency:** Transaction-safe ledger operations.
- **Dynamic database management:** Runtime tenant-specific database connections.
- **Real-time analytics:** Monitoring usage and billing activity.
- **Cryptographic verification:** RSA-SHA256 payload signing and verification.
- **Secure authentication:** JWT-based authentication and protected API endpoints.

The initial MVP will simulate billing operations. It will not process real payments.

---

## Core Objectives

1. Build a scalable multi-tenant backend.
2. Implement secure authentication and authorization.
3. Establish reliable tenant isolation.
4. Prevent duplicate billing through idempotent processing.
5. Maintain financial consistency using database transactions.
6. Implement dynamic tenant database connections.
7. Build a real-time analytics dashboard.
8. Implement cryptographic payload verification.
9. Provide comprehensive testing and documentation.

---

## Technology Stack

| Category | Technology | Status |
|---|---|---|
| Frontend Framework | Next.js | Implemented |
| Frontend Library | React | Implemented |
| Frontend Language | TypeScript | Implemented |
| Styling | Tailwind CSS | Implemented |
| Backend Runtime | Node.js | Implemented |
| Backend Framework | Express.js | Implemented |
| Backend Language | TypeScript | Implemented |
| Database | MongoDB Atlas | Implemented |
| ODM | Mongoose | Implemented |
| Validation | Zod | Implemented |
| Authentication | JSON Web Tokens (JWT) | Implemented |
| Password Hashing | bcryptjs | Implemented |
| API Architecture | REST API with versioning | Implemented |
| Distributed Locking | Redis | Planned |
| Real-time Communication | Socket.io | Planned |
| Cryptography | RSA-SHA256 | Planned |
| Version Control | Git and GitHub | Implemented |

---

## System Architecture

### 1. Currently Implemented Architecture

The current implementation establishes communication between the Next.js frontend and Express backend, with authentication and database integration.

```text
                 Next.js Frontend
                        |
                        v
                Frontend API Proxy
                        |
                        v
                  Express API
                        |
                        v
                 Request Logger
                        |
                        v
                  API Router v1
                        |
              +---------+---------+
              |                   |
              v                   v
         Health Routes       Auth Routes
                                  |
                                  v
                         Authentication
                            Middleware
                                  |
                                  v
                         Auth Controller
                                  |
                                  v
                          Auth Service
                                  |
                         +--------+--------+
                         |                 |
                         v                 v
                   Password Service    JWT Service
                         |
                         v
                     User Model
                         |
                         v
                       MongoDB
```

Centralized error handling, environment validation, and database configuration support the backend.

### 2. Planned Target Architecture

The following architecture represents the intended future system. These components will be implemented progressively.

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
          +-------------+-------------+
          |             |             |
          v             v             v
      Tenant DB       Redis       Ledger Engine
      Registry        Locks       & Transactions
          |             |             |
          +-------------+-------------+
                        |
                        v
                     MongoDB
                        |
                        v
              Analytics & Real-time
```

The target architecture will introduce dynamic tenant database management, distributed locking, idempotent billing, financial transactions, and real-time analytics.

---

## Implemented Features and Progress

### 1. Foundation and Backend Architecture

- [x] Initialize Next.js frontend.
- [x] Initialize Express backend.
- [x] Configure MongoDB Atlas connection.
- [x] Integrate frontend and backend through API proxy.
- [x] Configure strict backend TypeScript.
- [x] Implement Zod environment validation.
- [x] Implement centralized error handling.
- [x] Implement request logging middleware.
- [x] Implement API versioning (`/api/v1`).
- [x] Create separate health-check route.
- [x] Verify backend production build.
- [x] Verify production server startup.
- [x] Push foundation changes to GitHub.

### 2. Authentication

- [x] Create User model and schema.
- [x] Implement password hashing using bcryptjs.
- [x] Implement user registration API.
- [x] Implement user login API.
- [x] Implement JWT generation.
- [x] Implement JWT authentication middleware.
- [x] Implement Zod registration and login validation.
- [x] Implement protected current-user endpoint.
- [x] Handle duplicate email registration.
- [x] Handle invalid credentials and unauthorized requests.
- [x] Test authentication endpoints.
- [x] Update API documentation.

### 3. Organizations and Tenant Management

- [ ] Organization data model.
- [ ] Organization creation API.
- [ ] Organization ownership.
- [ ] User-to-organization membership.
- [ ] Organization roles and permissions.
- [ ] Tenant-aware authentication.
- [ ] Tenant isolation middleware.

### 4. Multi-Tenant Database Architecture

- [ ] Dynamic tenant database connections.
- [ ] Tenant connection registry.
- [ ] Connection reuse and lifecycle management.
- [ ] Tenant database selection.
- [ ] Tenant isolation testing.

### 5. Billing Engine

- [ ] Usage event ingestion.
- [ ] Event validation and unique identifiers.
- [ ] Idempotency service.
- [ ] Redis distributed locking.
- [ ] Financial ledger.
- [ ] Atomic database transactions.
- [ ] Duplicate billing prevention.
- [ ] Ledger consistency testing.

### 6. Dashboard and Analytics

- [ ] Dashboard overview.
- [ ] Usage analytics.
- [ ] Transaction history.
- [ ] Organization settings.
- [ ] Billing summaries.
- [ ] Real-time updates.
- [ ] Responsive UI.
- [ ] Dashboard integration with backend APIs.

### 7. Security and Cryptography

- [ ] RSA key generation.
- [ ] Payload signing.
- [ ] Signature verification.
- [ ] Authorization and permission hardening.
- [ ] Tenant isolation security testing.
- [ ] Integration and security testing.

---

## Project Structure

The following represents the current project structure, including the implemented authentication and backend architecture.

```text
LedgerGuard/
|
|-- app/
|   |-- favicon.ico
|   |-- globals.css
|   |-- layout.tsx
|   |-- page.tsx
|
|-- backend/
|   |
|   |-- src/
|   |   |
|   |   |-- config/
|   |   |   |-- database.ts
|   |   |   |-- env.ts
|   |   |
|   |   |-- controllers/
|   |   |   |-- auth.controller.ts
|   |   |
|   |   |-- middleware/
|   |   |   |-- auth.middleware.ts
|   |   |   |-- errorHandler.ts
|   |   |   |-- requestLogger.ts
|   |   |
|   |   |-- models/
|   |   |   |-- User.ts
|   |   |
|   |   |-- routes/
|   |   |   |-- v1/
|   |   |       |-- auth.routes.ts
|   |   |       |-- health.routes.ts
|   |   |       |-- index.ts
|   |   |
|   |   |-- services/
|   |   |   |-- auth.service.ts
|   |   |   |-- password.service.ts
|   |   |
|   |   |-- utils/
|   |   |   |-- AppError.ts
|   |   |
|   |   |-- validators/
|   |   |   |-- auth.validators.ts
|   |   |
|   |   |-- server.ts
|   |
|   |-- .env
|   |-- .env.example
|   |-- package.json
|   |-- package-lock.json
|   |-- tsconfig.json
|
|-- docs/
|   |-- API_DOCUMENTATION.md
|   |-- ARCHITECTURE.md
|   |-- DATABASE_DESIGN.md
|   |-- DEVELOPMENT_LOG.md
|   |-- SECURITY.md
|
|-- public/
|
|-- README.md
|-- next.config.ts
|-- package.json
|-- package-lock.json
|-- tsconfig.json
```

**Note:** The `.env` file is local configuration and must never be committed to Git. The tree above documents its presence locally, not as a tracked repository file.

The project structure will be updated as additional modules and features are implemented.

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd LedgerGuard
```

Replace `YOUR_REPOSITORY_URL` with your GitHub repository URL.

### 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend/` directory.

Example configuration:

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_random_secret_of_at_least_64_characters
JWT_EXPIRES_IN=1h
```

**Important:**

- Replace the MongoDB URI with your own connection string.
- Generate a secure random JWT secret of at least 64 characters.
- Never share or commit actual environment variables, database credentials, JWT secrets, or private cryptographic keys.
- Keep `.env` private and use `.env.example` as the configuration template.

### 5. Start the Backend

From the `backend/` directory:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the Frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

---

## API Endpoints

**Base URL:**

```text
http://localhost:5000
```

**API Version:** `v1`

### Currently Implemented Endpoints

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| GET | `/api/v1/health` | Not required | Backend health check |
| POST | `/api/v1/auth/register` | Not required | Register a new user |
| POST | `/api/v1/auth/login` | Not required | Authenticate an existing user |
| GET | `/api/v1/auth/me` | Required | Retrieve current user profile |

### Authentication

Protected endpoints require a JWT in the Authorization header.

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Registration Example

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Login Example

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

Registration and login return a JWT token that can be used to access protected endpoints.

For detailed request formats, response examples, and error codes, see [API Documentation](docs/API_DOCUMENTATION.md).

---

## Documentation

Detailed technical documentation is maintained in the `docs/` directory.

| Document | Description |
|---|---|
| [Architecture](docs/ARCHITECTURE.md) | System design and component interactions |
| [API Documentation](docs/API_DOCUMENTATION.md) | API endpoints and request/response formats |
| [Database Design](docs/DATABASE_DESIGN.md) | Database schemas and relationships |
| [Development Log](docs/DEVELOPMENT_LOG.md) | Daily progress and completed milestones |
| [Security](docs/SECURITY.md) | Security architecture and implementation |

Documentation will be maintained alongside development to reflect the actual implementation.

---

## Development Roadmap

The project follows a 25-day development schedule.

| Phase | Planned Work | Status |
|---|---|---|
| Day 1 | Foundation and frontend/backend integration | Completed |
| Day 2 | API architecture, versioning and request logging | Completed |
| Day 3 | Authentication and JWT authorization | Completed |
| Days 4–5 | Organizations and tenant context | Upcoming |
| Days 6–8 | Dynamic tenant database connections | Upcoming |
| Days 9–10 | Usage events and idempotency | Upcoming |
| Day 11 | Redis distributed locking | Upcoming |
| Days 12–13 | Financial ledger and transactions | Upcoming |
| Day 14 | Mid-project review | Upcoming |
| Days 15–19 | Analytics APIs and dashboard | Upcoming |
| Days 20–21 | Real-time features and UI polish | Upcoming |
| Day 22 | Cryptographic layer | Upcoming |
| Day 23 | Security hardening | Upcoming |
| Days 24–25 | Testing, deployment and documentation | Upcoming |

**Project Start:** November 15, 2026
**Target Completion:** December 9, 2026

The roadmap may be adjusted as implementation progresses while keeping the target completion date unchanged.

---

## Security Considerations

LedgerGuard follows these security principles:

- Passwords must be hashed before storage.
- JWT secrets must remain private.
- Protected endpoints must verify authentication tokens.
- Tenant identity must originate from verified authentication.
- Clients must not control tenant database selection.
- User input must be validated before processing.
- Internal errors and sensitive information must not be exposed to clients.
- Database unique indexes must enforce durable idempotency.
- Distributed locks must have expiration and ownership-based release.
- MongoDB multi-document transactions require replica-set or sharded-cluster support.
- Financial operations must maintain consistency and prevent duplicate processing.
- Secrets and private cryptographic keys must never be committed to source control.

Security measures will be expanded as the corresponding modules are implemented.

---

## Current Development Milestone

### November 15, 2026 — Day 1 Completed

**Foundation and Integration**

- Initialized Next.js frontend and Express backend.
- Connected MongoDB Atlas.
- Integrated frontend and backend through an API rewrite.
- Implemented strict backend TypeScript configuration.
- Added Zod environment validation.
- Implemented centralized Express error handling.
- Verified backend production build and server startup.
- Pushed foundation changes to GitHub.

### November 16, 2026 — Day 2 Completed

**Backend Architecture**

- Implemented API versioning.
- Created the `/api/v1` route structure.
- Separated the health-check route.
- Implemented request logging middleware.
- Verified API responses and request logs.
- Verified TypeScript compilation and production build.
- Pushed backend architecture changes to GitHub.

### November 17, 2026 — Day 3 Completed

**Authentication and Authorization**

- Created the User model.
- Implemented password hashing using bcryptjs.
- Implemented registration and login APIs.
- Added JWT generation and verification.
- Implemented authentication middleware.
- Added Zod authentication validation.
- Implemented the protected current-user endpoint.
- Tested registration, login, duplicate registration, invalid credentials, and unauthorized access.
- Updated API documentation.
- Verified TypeScript compilation and production build.
- Committed and pushed authentication implementation to GitHub.

**Git milestone commits:**

```text
1: Set up LedgerGuard backend and frontend integration
2: Configure strict TypeScript and backend error handling
3: Implement API versioning and request logging
4: Implement user authentication and JWT authorization
```

---

**LedgerGuard is actively under development.** This README will be maintained alongside implementation so that the documented architecture, features, API endpoints, and project progress accurately reflect the codebase.