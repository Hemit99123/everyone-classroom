import { handleServerAdminAuth } from "@/utils/auth";
import Enroll from "@/models/Enroll";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";

export const GET = async (request: NextRequest) => {
    try {
        const classID = request.nextUrl.searchParams.get("classID");
        const email = request.nextUrl.searchParams.get("email")

        // Validate classID
        if (!classID) {
            return NextResponse.json({ error: "Invalid classID parameter" }, { status: 400 });
        }

        const auth = await handleServerAdminAuth();

        if (auth) {
            return auth;
        }

        // Connect to MongoDB
        await connect();

        // Find enrollment
        const enroll = await Enroll.findOne({ classID, email }).exec();
        return NextResponse.json(enroll);
    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.error();
    }
};
