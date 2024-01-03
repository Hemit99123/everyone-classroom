import Classroom from "@/models/Classroom";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { handleServerAdminAuth } from "@/utils/auth";

export const GET = async (req: any) => {
  try {

    const auth = await handleServerAdminAuth()
    const session = await getServerSession(authOptions)

    if (auth) {
      return auth
    }
    // Connect to the database
    await connect();

    // Fetch classrooms for the logged-in user
    const classrooms = await Classroom.find({ email: session?.user.email }).exec();
    
    return NextResponse.json(classrooms)
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
