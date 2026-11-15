import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "LedgerGuard API is running",
    timestamp: new Date().toISOString(),
  });
});

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
