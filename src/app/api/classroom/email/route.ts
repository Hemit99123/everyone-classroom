import Classroom from "@/models/Classroom";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req: any) => {
  try {
    // Connect to the database
    await connect();

    // Get the user session
    const session = await getServerSession(authOptions);

    // Check if the user is not logged in
    if (!session) {
      return NextResponse.json({ message: 'You are not logged in.' }, { status: 401 });
    }

    // Check if the user is not an admin
    if (session.user.isAdmin === false) {
      return NextResponse.json({ message: 'You do not have permission.' }, { status: 403 });
    }

    // Fetch classrooms for the logged-in user
    const classrooms = await Classroom.find({ email: session?.user.email }).exec();

    return new NextResponse(JSON.stringify(classrooms), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
