
import type { RequestHandler } from "express";
import mongoose from "mongoose";

import Organization from "../models/Organization.js";
import OrganizationMembership, {
    type OrganizationMembershipRole,
} from "../models/OrganizationMembership.js";

import { AppError } from "../utils/AppError.js";

export const requireOrganizationMembership = (
    allowedRoles?: OrganizationMembershipRole[]
): RequestHandler => {
    return async (req, res, next) => {
        const userId = res.locals.userId as string | undefined;

        const organizationId = Array.isArray(req.params.organizationId)
            ? req.params.organizationId[0]
            : req.params.organizationId;

        if (
            typeof organizationId !== "string" ||
            !mongoose.Types.ObjectId.isValid(organizationId)
        ) {
            throw new AppError("Invalid organization ID", 400);
        }

        if (!userId) {
            throw new AppError("Authentication required", 401);
        }

        const membership = await OrganizationMembership.findOne({
            userId,
            organizationId,
        });

        if (!membership) {
            throw new AppError("Organization access denied", 403);
        }

        if (
            allowedRoles &&
            !allowedRoles.includes(membership.role)
        ) {
            throw new AppError("Insufficient organization permissions", 403);
        }

        const organization = await Organization.findOne({
            _id: organizationId,
            status: "active",
        }).select("_id");

        if (!organization) {
            throw new AppError("Organization not found or inactive", 404);
        }

        res.locals.organizationId = organization._id.toString();
        res.locals.organizationRole = membership.role;

        next();
    };
};
