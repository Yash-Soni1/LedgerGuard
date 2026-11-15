# LedgerGuard - API Documentation

## 1. Introduction

This document describes the HTTP API exposed by the LedgerGuard backend.

**Base URL (Development):**

```text
http://localhost:5000
```

**API Format:** JSON

**Backend Framework:** Express.js

**Status:** Initial API implementation.

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

### Health Check

Checks whether the LedgerGuard backend API is responding.

| Property | Value |
|---|---|
| Method | GET |
| Endpoint | `/api/health` |
| Authentication | Not required |
| Status | Implemented |

**Request:**

```http
GET /api/health
```

**Example using PowerShell:**

```powershell
Invoke-RestMethod http://localhost:5000/api/health
```

**Successful response:**

```json
{
  "success": true,
  "message": "LedgerGuard API is running",
  "timestamp": "2026-11-15T07:14:03.399Z"
}
```

The timestamp is generated dynamically by the backend.

### Frontend Proxy Health Check

The Next.js frontend forwards this request to the backend through its configured rewrite.

| Property | Value |
|---|---|
| Method | GET |
| Endpoint | `/api/backend/health` |
| Authentication | Not required |
| Status | Implemented |

**Request:**

```http
GET /api/backend/health
```

**Example:**

```powershell
Invoke-RestMethod http://localhost:3000/api/backend/health
```

This verifies communication through the frontend proxy.

---

## 4. Error Handling

The backend uses centralized Express error middleware.

Expected error response structure:

```json
{
  "success": false,
  "message": "Internal server error"
}
```

Internal error details are logged on the server rather than exposed in production responses.

---

## 5. Planned API Modules

The following endpoints are planned and are not yet implemented.

| Module | Planned Functionality |
|---|---|
| Authentication | Register, login, logout |
| Users | User profile and account management |
| Organizations | Create and manage organizations |
| Members | Invitations and role management |
| Usage | Submit and retrieve usage events |
| Billing | Billing and usage summaries |
| Ledger | Financial transactions and balances |
| Analytics | Historical usage and dashboard metrics |

Detailed request and response specifications will be added when these endpoints are implemented.

---

## 6. API Development Guidelines

- Validate incoming request data.
- Use appropriate HTTP status codes.
- Authenticate protected endpoints.
- Derive tenant context from verified authorization.
- Return consistent JSON responses.
- Avoid exposing internal errors or secrets.
- Test endpoints before documenting them as implemented.

---

**Last updated:** November 15, 2026
**Project:** LedgerGuard