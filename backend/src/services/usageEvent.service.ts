
import {
    type IUsageEvent,
    usageEventSchema,
} from "../models/UsageEvent.js";

import { getTenantModel } from "./tenantModel.service.js";

import type { CreateUsageEventInput } from "../validators/usageEvent.validators.js";

export const createUsageEvent = async (
    organizationId: string,
    input: CreateUsageEventInput
) => {
    const UsageEvent = await getTenantModel<IUsageEvent>(
        organizationId,
        "UsageEvent",
        usageEventSchema,
        "usage_events"
    );

    const event = await UsageEvent.create({
        eventName: input.eventName,
        customerId: input.customerId,
        quantity: input.quantity,
        unit: input.unit,
        occurredAt: input.occurredAt ?? new Date(),
        metadata: input.metadata ?? {},
    });

    return {
        id: event._id.toString(),
        eventName: event.eventName,
        customerId: event.customerId,
        quantity: event.quantity,
        unit: event.unit,
        occurredAt: event.occurredAt,
        metadata: event.metadata,
        createdAt: event.createdAt,
    };
};
