import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import connect from "@/utils/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import Post from "@/models/Post";

export const GET = async (request: NextRequest) => {
    await connect(); // Assuming connect is a function to establish a database connection

    const session = await getServerSession({ req: request, ...authOptions });

    if (!session || !session.user || session.user.isAdmin === false) {
        return new Response(
            JSON.stringify({ message: 'You are not authorized' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    } else {
        return new Response(
            JSON.stringify({ message: 'You are an admin user' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
