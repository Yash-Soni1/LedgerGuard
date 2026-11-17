import type { RequestHandler } from "express";
import { AppError } from "../utils/AppError.js";
import { createOrganizationSchema } from "../validators/organization.validators.js";
import { createOrganization } from "../services/organization.service.js";

export const createOrganizationController: RequestHandler = async (
    req, res
) => {
    const validation = createOrganizationSchema.safeParse(req.body);

    if (!validation.success) {
        throw new AppError("Invalid Organization data", 400);
    }

    const userId = res.locals.userId as string | undefined;

    if (!userId) {
        throw new AppError("Authentication Required", 401);
    }

    const organization = await createOrganization(userId, validation.data);

    res.status(201).json({
        success: true,
        message: "Organization created successfully",
        data: {
            organization,
        },
    });
};