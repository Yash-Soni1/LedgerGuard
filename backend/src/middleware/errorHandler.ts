/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req,
  res,
  _next
) => {
  const error =
    err instanceof Error
      ? err
      : new Error("An unexpected error occurred");

  const statusCode =
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    typeof err.statusCode === "number"
      ? err.statusCode
      : 500;

  console.error("API Error:", error.message);

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : error.message,
  });
};
