import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        email: {type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
        },
        passwordHash: {
            type: String,
            required: [true, 'Password hash is required'],
            select: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export type User = InferSchemaType<typeof userSchema>;

const User =
    mongoose.models.User ||
    mongoose.model('User', userSchema);


export default User;
