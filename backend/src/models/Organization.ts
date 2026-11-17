import {model, Schema, Types } from 'mongoose';

export interface IOrganization {
    name: string;
    slug: string;
    status: 'active' | 'suspended';
    createdBy: Types.ObjectId;
}

const organizationSchema = new Schema<IOrganization>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
            match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        },
        status: {
            type: String,
            enum: ['active', 'suspended'],
            default: 'active',
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Organization = model<IOrganization>(
    'Organization',
    organizationSchema
);

export default Organization;