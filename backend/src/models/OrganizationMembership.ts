import {model, Schema, Types } from 'mongoose';

export type OrganizationMembershipRole = 'owner' | 'admin' | 'member';

export interface IOrganizationMembership {
    userId: Types.ObjectId;
    organizationId: Types.ObjectId;
    role: OrganizationMembershipRole;
}

const organizationMembershipSchema = new Schema<IOrganizationMembership>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
        },
        role: {
            type: String,
            enum: ['owner', 'admin', 'member'],
            default: 'member',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

organizationMembershipSchema.index(
    { userId: 1, organizationId: 1 },
    { unique: true }
);

const OrganizationMembership = model<IOrganizationMembership>(
    "OrganizationMembership",
    organizationMembershipSchema
);

export default OrganizationMembership;
