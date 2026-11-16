import type { Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.service.js";
import {
    registerSchema,
    loginSchema
} from "../validators/auth.validators.js";
import { AppError } from "../utils/AppError.js";

import User from "../models/User.js";

export const register = async (req: Request, res: Response) => {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
        throw new AppError("Invalid input data", 400);
    }

    const result = await registerUser(validation.data);

    res.status(201).json({
        success: true,
        message: "Registration successful",
        data: result,
    });
};

export const login = async (req: Request, res: Response) => {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
        throw new AppError("Invalid Login data", 400);
    }

    const result = await loginUser(validation.data);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    });
};

export const getCurrentUser = async (
    _req: Request,
    res: Response
) => {
    const userId = res.locals.userId;

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json({
        success: true,
        data: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        },
    });
};