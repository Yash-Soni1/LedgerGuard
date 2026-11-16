import {z} from "zod";

export const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),

    email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email must be at most 254 characters long")
    .transform((value) => value.toLowerCase()),

    password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
        (value) => Buffer.byteLength(value, "utf-8") <= 72,
        "Password cannot exceed 72 bytes long"
    ),
});

export const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email must be at most 254 characters long")
    .transform((value) => value.toLowerCase()),

    password: z
    .string()
    .min(1, "Password is required")
    .refine(
        (value) => Buffer.byteLength(value, "utf-8") <= 72,
        "Invalid password"
    ),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;