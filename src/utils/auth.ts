import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import connect from "./db";

await connect();

export const User = mongoose.models.User || mongoose.model(
    "User",
    new mongoose.Schema(
        {
            _id: { type: String, required: true },
            name: { type: String, required: true },
            password: { type: String, required: true },
            role: { type: String, required: true }
        } as const,
        { _id: false }
    )
);


// Not using this within the app (Lucia takes care of it) so no need to export it or assign it to a variable

mongoose.models.Session || mongoose.model(
    "Session",
    new mongoose.Schema(
        {
            _id: { type: String, required: true },
            user_id: { type: String, required: true }
        } as const,
        { _id: false }
    )
);

export const adapter = new MongodbAdapter(
	mongoose.connection.collection("sessions"),
	mongoose.connection.collection("users")
);