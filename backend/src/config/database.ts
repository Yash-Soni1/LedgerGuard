
import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(mongoUri);

    console.log("Database name:", mongoose.connection.name);
    console.log("Connection state:", mongoose.connection.readyState);

    console.log("MongoDB connected successfully!");
}
