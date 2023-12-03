import Classroom from "@/models/Classroom";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {

    const session = await getServerSession(authOptions)

    if(!session) {
        return NextResponse.json({ message: 'You are not logged in.' }, {status: 401})
    } else {
        await connect();

        try {
            const classrooms = await Classroom.find({}).exec();
    
            return new NextResponse(JSON.stringify(classrooms), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Error fetching data from the database:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }
};