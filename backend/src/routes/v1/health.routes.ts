import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "LedgerGuard API v1 is running",
    version: "v1",
    timestamp: new Date().toISOString(),
  });
});

export default router;