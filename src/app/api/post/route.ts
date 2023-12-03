import Post from "@/models/Post";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (request: NextRequest) => {
    const session = await getServerSession(authOptions)
    const classID = await request.nextUrl.searchParams.get('classID');
    
    if(!session) {
        return NextResponse.json({ message: 'You are not logged in.' }, {status: 401})
    } else {
        await connect();

        try {
            const post_from_classroom = await Post.find({classID}).exec();
    
            return new NextResponse(JSON.stringify(post_from_classroom), {
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
