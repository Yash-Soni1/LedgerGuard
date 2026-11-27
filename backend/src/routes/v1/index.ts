import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import organizationRoutes from "./organization.routes.js";
import usageEventRoutes from "./usageEvent.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/organizations", organizationRoutes)
router.use(
    "/organizations/:organizationId/usage-events",
    usageEventRoutes
);

export default router;