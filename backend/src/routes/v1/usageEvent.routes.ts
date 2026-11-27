
import { Router } from "express";

import { createUsageEventController } from "../../controllers/usageEvent.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requireOrganizationMembership } from "../../middleware/organization.middleware.js";
import { requireTenantConnection } from "../../middleware/tenant.middleware.js";

const router = Router({mergeParams: true});

router.post(
    "/",
    authenticate,
    requireOrganizationMembership(),
    requireTenantConnection,
    createUsageEventController
);

export default router;
