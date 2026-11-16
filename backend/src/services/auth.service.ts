import jwt, { type SignOptions } from "jsonwebtoken";

import User from "../models/User.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

import {
    hashPassword,
    comparePassword
} from "./password.service.js";

import {
    type RegisterInput,
    type LoginInput
} from "../validators/auth.validators.js";

const generateToken = (userId: string): string => {
    return jwt.sign({}, env.JWT_SECRET, {
        subject: userId,
        expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    });
};

export const registerUser = async (input: RegisterInput) => {
    const passwordHash = await hashPassword(input.password);

    try {
        const user = await User.create({
            name: input.name,
            email: input.email,
            passwordHash,
        });

        const token = generateToken(user._id.toString());

        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            },
            token,
        };
    } catch (error: unknown) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000
        ) {
            throw new AppError("Email is already registered", 409);
        }

        throw error;
    }
};

export const loginUser = async (input: LoginInput) => {
    const user = await User.findOne({ email: input.email }).select("+passwordHash");

    if (!user || !(await comparePassword(input.password, user.passwordHash))) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user._id.toString());

    return {
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        },
        token,
    };
}