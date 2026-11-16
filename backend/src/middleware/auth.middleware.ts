import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const authenticate: RequestHandler = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(new AppError("Authorization Required", 401));
    }

    const token = authorization.slice(7).trim();

    if (!token) {
        return next(new AppError("Authorization Required", 401));
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET);

        if(
            typeof payload !== "object" ||
            typeof payload.sub !== "string"
        ) {
            return next(new AppError("Invalid Authentication token", 401));
        }

        res.locals.userId = payload.sub;

        next();
    } catch {
        return next(new AppError("Invalid or expired Authentication token", 401));
    }
};