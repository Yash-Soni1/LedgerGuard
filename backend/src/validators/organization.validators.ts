import { z } from "zod";

export const createOrganizationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(100, { message: "Name must be at most 100 characters long" }),


    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(2, { message: "Organization Slug must be at least 2 characters long" })
        .max(100, { message: "Organization Slug must be at most 100 characters long" })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Organization Slug must be a valid slug" }),
});

export type CreateOrganizationInput = z.infer<
    typeof createOrganizationSchema
>;