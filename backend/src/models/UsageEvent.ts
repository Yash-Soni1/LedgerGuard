
import { Schema } from "mongoose";

export interface IUsageEvent {
    eventName: string;
    customerId: string;
    quantity: number;
    unit: string;
    occurredAt: Date;
    metadata: Record<string, unknown>;
    
    createdAt?: Date;
    updatedAt?: Date;
}

export const usageEventSchema = new Schema<IUsageEvent>(
    {
        eventName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            minlength: 2,
            maxlength: 100,
        },

        customerId: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: (value: number) =>
                    Number.isFinite(value) && value > 0,
                message: "Quantity must be greater than zero",
            },
        },

        unit: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 50,
        },

        occurredAt: {
            type: Date,
            required: true,
            default: Date.now,
        },

        metadata: {
            type: Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
        versionKey: false,
        strict: true,
    }
);

// Efficient customer usage history queries.
usageEventSchema.index({
    customerId: 1,
    occurredAt: -1,
});

// Efficient event-type analytics.
usageEventSchema.index({
    eventName: 1,
    occurredAt: -1,
});
