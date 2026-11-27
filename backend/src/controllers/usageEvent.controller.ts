
import type { RequestHandler } from "express";

import { AppError } from "../utils/AppError.js";
import { createUsageEventSchema } from "../validators/usageEvent.validators.js";
import { createUsageEvent } from "../services/usageEvent.service.js";

export const createUsageEventController: RequestHandler = async (
    req,
    res
) => {
    const validation = createUsageEventSchema.safeParse(req.body);

    if (!validation.success) {
        throw new AppError("Invalid usage event data", 400);
    }

    const organizationId = res.locals.organizationId as
        | string
        | undefined;

    if (!organizationId) {
        throw new AppError("Organization authorization required", 403);
    }

    const event = await createUsageEvent(
        organizationId,
        validation.data
    );

    res.status(201).json({
        success: true,
        message: "Usage event created successfully",
        data: {
            event,
        },
    });
};
