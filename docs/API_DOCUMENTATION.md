# LedgerGuard - API Documentation

## 1. Introduction

This document describes the HTTP API exposed by the LedgerGuard backend.

**Base URL (Development):**

```text
http://localhost:5000
```

**API Version:** v1

**API Format:** JSON

**Backend Framework:** Express.js

**Status:** Health-check, authentication, organization creation, and organization membership authorization implemented.

---

## 2. API Response Convention

The API uses JSON responses.

Successful responses generally follow this structure:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Error responses generally follow this structure:

```json
{
  "success": false,
  "message": "Error message"
}
```

The exact response fields depend on the endpoint.

---

## 3. Implemented Endpoints

### 3.1 Health Check

Checks whether the LedgerGuard API is responding.

| Property | Value |
|---|---|
| Method | GET |
| Endpoint | `/api/v1/health` |
| Authentication | Not required |
| Status | Implemented |

**Request:**

```http
GET /api/v1/health
```

**Example using PowerShell:**

```powershell
Invoke-RestMethod http://localhost:5000/api/v1/health
```

**Successful response:**

```json
{
  "success": true,
  "message": "LedgerGuard API v1 is running",
  "version": "v1",
  "timestamp": "2026-11-16T16:59:47.976Z"
}
```

The timestamp is generated dynamically by the backend.

### 3.2 User Registration

Creates a new user account and returns a JWT authentication token.

| Property | Value |
|---|---|
| Method | POST |
| Endpoint | `/api/v1/auth/register` |
| Authentication | Not required |
| Success Status | 201 |
| Status | Implemented |

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Successful response:**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "JWT_TOKEN"
  }
}
```

**Possible error statuses:**

- `400` — Invalid registration data.
- `409` — Email is already registered.

Passwords are hashed using bcrypt before being stored in the database.

### 3.3 User Login

Authenticates an existing user and returns a JWT authentication token.

| Property | Value |
|---|---|
| Method | POST |
| Endpoint | `/api/v1/auth/login` |
| Authentication | Not required |
| Success Status | 200 |
| Status | Implemented |

**Request body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Successful response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "JWT_TOKEN"
  }
}
```

**Possible error statuses:**

- `400` — Invalid login data.
- `401` — Invalid email or password.

### 3.4 Get Current User

Returns the profile of the currently authenticated user.

| Property | Value |
|---|---|
| Method | GET |
| Endpoint | `/api/v1/auth/me` |
| Authentication | Required |
| Success Status | 200 |
| Status | Implemented |

**Request headers:**

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Example using PowerShell:**

```powershell
$headers = @{
    Authorization = "Bearer YOUR_JWT_TOKEN"
}

Invoke-RestMethod `
    -Uri "http://localhost:5000/api/v1/auth/me" `
    -Headers $headers
```

Replace `YOUR_JWT_TOKEN` with the token returned by registration or login.

**Successful response:**

```json
{
  "success": true,
  "data": {
    "id": "USER_ID",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Possible error statuses:**

- `401` — Authorization required or invalid/expired token.
- `404` — User not found.

The JWT authentication middleware verifies the token before allowing access to the user's profile.

---

### 3.5 Create Organization

Creates a new organization and automatically assigns the authenticated user as its owner.

| Property | Value |
|---|---|
| Method | POST |
| Endpoint | `/api/v1/organizations` |
| Authentication | Required |
| Success Status | 201 |
| Status | Implemented |

**Request headers:**

```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request body:**

```json
{
  "name": "Acme Technologies",
  "slug": "acme-technologies"
}
```

**Successful response:**

```json
{
  "success": true,
  "message": "Organization created successfully",
  "data": {
    "organization": {
      "_id": "ORGANIZATION_ID",
      "name": "Acme Technologies",
      "slug": "acme-technologies",
      "status": "active"
    }
  }
}
```

**Possible error statuses:**

- `400` — Invalid organization data.
- `401` — Authentication required.
- `409` — Organization slug already exists.

Organization creation and owner membership assignment are performed within a MongoDB transaction.

### Organization Membership Authorization

LedgerGuard implements middleware for organization-level access control.

The middleware:

- Validates the organization ID.
- Checks whether the authenticated user belongs to the organization.
- Optionally verifies the user's organization role (`owner`, `admin`, or `member`).
- Rejects suspended or unavailable organizations.
- Stores the authorized organization ID and role in request-local state.

**Possible error statuses:**

- `400` — Invalid organization ID.
- `403` — Organization access denied.
- `403` — Insufficient organization permissions.
- `404` — Organization not found or inactive.

**Verification:** Tested successfully with two users. A non-member received `403 Forbidden`, while the organization owner received access with the `owner` role.

## 4. Authentication and Security

LedgerGuard currently uses JSON Web Tokens (JWT) for authentication.

Implemented security measures include:

- Password hashing using bcrypt with 12 salt rounds.
- JWT-based authentication.
- Configurable JWT expiration.
- JWT secret validation through environment configuration.
- Protected routes using authentication middleware.
- Zod-based request validation.
- Normalized email addresses.
- Duplicate email detection.
- Password hashes excluded from default user queries.

**Environment variables:**

| Variable | Description |
|---|---|
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `JWT_EXPIRES_IN` | JWT expiration duration |

The JWT secret must remain private and must never be committed to the repository.

---

## 5. Error Handling

The backend uses centralized Express error middleware.

Expected error response structure:

```json
{
  "success": false,
  "message": "Internal server error"
}
```

The backend uses appropriate HTTP status codes for application errors.

Internal error details are logged on the server rather than exposed in production responses.

---

## 6. Planned API Modules

The following modules contain functionality that is planned or partially implemented.

| Module | Planned Functionality | Status |
|---|---|---|
| Authentication | Register and login implemented; logout planned | Partially implemented |
| Users | User profile and account management | Planned |
| Organizations | Organization creation and membership authorization; further management features planned | Partially implemented |
| Members | Invitations and role management | Planned |
| Usage | Submit and retrieve usage events | Planned |
| Billing | Billing and usage summaries | Planned |
| Ledger | Financial transactions and balances | Planned |
| Analytics | Historical usage and dashboard metrics | Planned |

Additional request and response specifications will be documented as new endpoints are implemented.

---

## 7. API Development Guidelines

- Validate all incoming request data.
- Use appropriate HTTP status codes.
- Authenticate protected endpoints.
- Derive tenant context from verified authorization.
- Return consistent JSON responses.
- Avoid exposing internal errors or secrets.
- Keep authentication and authorization logic separate from business logic.
- Test endpoints before documenting them as implemented.
- Maintain API versioning for future compatibility.

---

**Last updated:** November 17, 2026

**Project:** LedgerGuard