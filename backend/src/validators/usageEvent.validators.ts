
import { z } from "zod";

export const createUsageEventSchema = z.object({
    eventName: z
        .string()
        .trim()
        .min(2, "Event name must be at least 2 characters")
        .max(100, "Event name cannot exceed 100 characters")
        .transform((value) => value.toLowerCase()),

    customerId: z
        .string()
        .trim()
        .min(1, "Customer ID is required")
        .max(150, "Customer ID cannot exceed 150 characters"),

    quantity: z
        .number()
        .finite()
        .positive("Quantity must be greater than zero"),

    unit: z
        .string()
        .trim()
        .min(1, "Unit is required")
        .max(50, "Unit cannot exceed 50 characters")
        .transform((value) => value.toLowerCase()),

    occurredAt: z.iso.datetime()
        .transform((value) => new Date(value))
        .optional(),

    metadata: z
        .record(z.string(), z.unknown())
        .optional(),
});

export type CreateUsageEventInput = z.infer<
    typeof createUsageEventSchema
>;
