import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import v1Routes from "./routes/v1/index.js";

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/v1", v1Routes);

app.use(errorHandler);

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`LedgerGuard API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

void startServer();
