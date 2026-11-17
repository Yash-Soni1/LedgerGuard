import mongoose from "mongoose";

import OrganizationMembership from "../models/OrganizationMembership.js";

import { AppError } from "../utils/AppError.js";

import type { CreateOrganizationInput } from "../validators/organization.validators.js";
import Organization from "../models/Organization.js";

export const createOrganization = async (
    userId: string,
    input: CreateOrganizationInput
) => {
    const session = await mongoose.startSession();

    try {
        const organization = await session.withTransaction(async () => {
            const [createdOrganization] = await Organization.create(
                [
                    {
                        name: input.name,
                        slug: input.slug,
                        createdBy: new mongoose.Types.ObjectId(userId),
                    },
                ],
                { session }
            );

            await OrganizationMembership.create(
                [
                    {
                        userId: new mongoose.Types.ObjectId(userId),
                        organizationId: createdOrganization._id,
                        role: "owner",
                    },
                ],
                { session }
            );

            return {
                _id: createdOrganization._id,
                name: createdOrganization.name,
                slug: createdOrganization.slug,
                status: createdOrganization.status,
            };
        });

        if (!organization) {
            throw new AppError("Failed to create organization", 500);
        }

        return organization;

    } catch (error: unknown) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000
        ) {
            throw new AppError("Organization slug already exists", 400);
        }

        throw error;

    } finally {
        await session.endSession();
    }
}