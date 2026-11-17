import { Router } from "express";
import { createOrganizationController } from "../../controllers/organization.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createOrganizationController);


export default router;