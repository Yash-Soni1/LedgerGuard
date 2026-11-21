
import "./config/dns.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import v1Routes from "./routes/v1/index.js";
import { closeAllTenantConnections } from "./services/tenantConnection.service.js";

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/v1", v1Routes);

app.use(errorHandler);

async function cleanupDatabaseConnections(): Promise<void> {
  try {
    await closeAllTenantConnections();
    console.log("Tenant connections closed successfully.");

    await mongoose.disconnect();
    console.log("Central database disconnected successfully.");
  } catch (error) {
    console.error("Error during database cleanup:", error);
    process.exitCode = 1;
  }
}

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    const server = app.listen(PORT, () => {
      console.log(`LedgerGuard API running on port ${PORT}`);
    });

    let isShuttingDown = false;

    const shutdown = (signal: string): void => {
      if (isShuttingDown) {
        return;
      }

      isShuttingDown = true;

      console.log(`\n${signal} received. Starting graceful shutdown...`);

      server.close(() => {
        console.log("HTTP server closed.");

        void cleanupDatabaseConnections();
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

void startServer();
