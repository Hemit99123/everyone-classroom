import { handleServerAuth, handleServerAdminAuth } from "@/utils/auth"
import Enroll from '@/models/Enroll'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextRequest, NextResponse } from "next/server"
import connect from "@/utils/db"

export const GET = async (request: NextRequest) => {
    try {
        const classID = request.nextUrl.searchParams.get('classID');

        // Check if the user is authenticated
        const session = await getServerSession(authOptions);
        const auth = await handleServerAuth();

        if (auth) {
            return auth;
        }

        // Connect to MongoDB
        await connect();

        // Find enrollment
        const enroll = await Enroll.findOne({ classID, email: session?.user.email }).exec();

        if (enroll) {
            return NextResponse.json({ message: "User enrolled" }, {status: 200});
        } else {
            return NextResponse.json({ message: "User not enrolled in the class" }, {status: 404});
        }
    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.error();
    }
};

export const POST = async (request: any) => {
    const session = await getServerSession(authOptions)
    const auth = await handleServerAuth()
    if (auth) {
        return auth
    }

    const { classID } = await request.json();
    await connect()
    const enroll = await Enroll.findOne({ classID, email: session?.user.email }).exec();

    if (enroll) {
        return NextResponse.json({ message: "You are already enrolled into this class" }, { status: 203 });
    } else {
        const newEnroll = new Enroll({
            name: session?.user.name,
            email: session?.user.email,
            classID,
        });

        try {
            await newEnroll.save();
            return NextResponse.json({ message: 'Added post to classroom' }, { status: 200 });
        } catch (error) {
            console.error("Error posting the data to the database:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }
}

// Logic to change isCert to true
export const PUT = async (request: any) => {
    const auth = await handleServerAdminAuth();
    if (auth) {
        return auth;
    }
    await connect()
}