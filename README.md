# LedgerGuard

### Dynamic Multi-Tenant Zero-Knowledge Billing Engine

LedgerGuard is a multi-tenant SaaS billing engine designed to provide secure tenant isolation, reliable usage tracking, and consistent financial ledger operations.

The project focuses on building a scalable backend architecture with idempotent billing, dynamic database connections, transaction safety, cryptographic verification, and real-time analytics.

> **Development Status:** Active Development
> **Project Timeline:** November 15 – December 9, 2026
> **Current Milestone:** Organization Management and Multi-Tenant Foundations
> **Current Progress:** Day 4 of 25

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

The current implementation establishes communication between the Next.js frontend and Express backend, with authentication, organization management, membership authorization, and database integration.

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
          +----------------+----------------+
          |                |                |
          v                v                v
     Health Routes    Auth Routes    Organization Routes
                           |                |
                           v                v
                   Authentication     Authentication
                      Middleware        Middleware
                           |                |
                           v                v
                    Auth Controller  Organization Controller
                           |                |
                           v                v
                     Auth Service    Organization Service
                           |                |
                  +--------+--------+       |
                  |                 |       |
                  v                 v       v
             Password Service   JWT Logic  MongoDB
                  |                         |
                  v                         |
              User Model                    |
                                            |
                                  +---------+---------+
                                  |                   |
                                  v                   v
                            Organization       Organization
                                Model             Membership
```

Centralized error handling, environment validation, request logging, and database configuration support the backend.

Organization creation uses a MongoDB transaction to create the organization and its initial owner membership atomically.

Organization access middleware checks membership, allowed roles, and organization status before granting access to protected organization-scoped routes.

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
           +--------------+--------------+
           |              |              |
           v              v              v
       Tenant DB        Redis       Ledger Engine
       Registry         Locks       & Transactions
           |              |              |
           +--------------+--------------+
                          |
                          v
                        MongoDB
                          |
                          v
                 Analytics & Real-time
```

The target architecture will introduce dynamic tenant database management, distributed locking, idempotent billing, financial transactions, cryptographic verification, and real-time analytics.

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

- [x] Implement Organization data model.
- [x] Implement OrganizationMembership data model.
- [x] Add organization creation validation using Zod.
- [x] Implement organization creation API.
- [x] Automatically assign the creator the owner role.
- [x] Implement atomic organization and membership creation using MongoDB transactions.
- [x] Enforce unique organization slugs.
- [x] Enforce unique user-organization memberships.
- [x] Implement organization membership middleware.
- [x] Implement organization role checks for owner, admin, and member.
- [x] Validate organization IDs.
- [x] Verify organization status before granting access.
- [x] Test unauthorized and cross-organization access.
- [x] Verify duplicate slug handling.
- [x] Verify TypeScript compilation and production build.
- [x] Update API and database documentation.
- [x] Create implementation Git commit.

### 4. Multi-Tenant Database Architecture

- [ ] Dynamic tenant database connections.
- [ ] Tenant connection registry.
- [ ] Connection reuse and lifecycle management.
- [ ] Tenant database selection.
- [ ] Tenant-aware database models.
- [ ] Tenant isolation testing.

### 5. Billing Engine

- [ ] Usage event ingestion.
- [ ] Event validation and unique identifiers.
- [ ] Idempotency service.
- [ ] Redis distributed locking.
- [ ] Financial ledger.
- [ ] Atomic database transactions for billing operations.
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

The following represents the current backend structure after the Day 4 implementation.

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
|   |   |   |-- organization.controller.ts
|   |   |
|   |   |-- middleware/
|   |   |   |-- auth.middleware.ts
|   |   |   |-- errorHandler.ts
|   |   |   |-- requestLogger.ts
|   |   |   |-- organization.middleware.ts
|   |   |
|   |   |-- models/
|   |   |   |-- User.ts
|   |   |   |-- Organization.ts
|   |   |   |-- OrganizationMembership.ts
|   |   |
|   |   |-- routes/
|   |   |   |-- v1/
|   |   |       |-- auth.routes.ts
|   |   |       |-- health.routes.ts
|   |   |       |-- organization.routes.ts
|   |   |       |-- index.ts
|   |   |
|   |   |-- services/
|   |   |   |-- auth.service.ts
|   |   |   |-- password.service.ts
|   |   |   |-- organization.service.ts
|   |   |
|   |   |-- utils/
|   |   |   |-- AppError.ts
|   |   |
|   |   |-- validators/
|   |   |   |-- auth.validators.ts
|   |   |   |-- organization.validators.ts
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
git clone https://github.com/Yash-Soni1/LedgerGuard.git
cd LedgerGuard
```

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

Use the following configuration template and provide your own values:

```env
PORT=5000

MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_random_secret_of_at_least_64_characters
JWT_EXPIRES_IN=1h
```

**Important:**

- Replace the MongoDB values with your own connection details.
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
| POST | `/api/v1/organizations` | Required | Create an organization |

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

### Organization Creation Example

```json
{
  "name": "Acme Technologies",
  "slug": "acme-technologies"
}
```

A successful organization creation returns the organization details and automatically creates an owner membership for the authenticated user.

Organization slugs must be unique. Attempting to create an organization with an existing slug returns a conflict response.

The organization membership middleware is implemented and available for organization-scoped routes. It verifies membership, optional role permissions, and organization status.

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
| Day 4 | Organization management and membership authorization | Completed |
| Day 5 | Tenant context and organization-scoped integration | Upcoming |
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
- Tenant identity must originate from verified authentication and validated membership.
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

### November 17, 2026 — Day 4 Completed

**Organization Management and Multi-Tenant Foundations**

- Created the Organization model.
- Created the OrganizationMembership model.
- Implemented organization creation validation using Zod.
- Implemented the organization creation service and controller.
- Added the protected organization creation endpoint.
- Implemented atomic organization and owner-membership creation using MongoDB transactions.
- Added unique organization slug enforcement.
- Added unique user-organization membership enforcement.
- Implemented organization membership middleware.
- Added organization role checks for owner, admin, and member.
- Added organization status verification.
- Tested organization creation and duplicate slug handling.
- Tested authentication requirements and invalid organization data.
- Verified that non-members cannot access another organization's protected resources.
- Verified TypeScript compilation and production build.
- Updated API documentation, database design, development log, and README.

**Day 4 implementation commit created:**

```text
5: Implement organization management and membership authorization
```

**Documentation commit pushed:**

```text
Update organization API and database documentation
```

### Git Milestone Commits

```text
1: Set up LedgerGuard backend and frontend integration

2: Configure strict TypeScript and backend error handling

3: Implement API versioning and request logging

4: Implement user authentication and JWT authorization

5: Implement organization management and membership authorization
```

---

**LedgerGuard is actively under development.** This README will be maintained alongside implementation so that the documented architecture, features, API endpoints, project structure, and development progress accurately reflect the codebase.