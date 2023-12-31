import Classroom from "@/models/Classroom";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

interface Session {
  user: {
    isAdmin: boolean;
    name: string;
    email: string;
  };
}

const authenticateSession = async (): Promise<Session | null> => {
  return await getServerSession(authOptions);
};

const handleAdminAuthentication = async (): Promise<NextResponse | null> => {
  const session = await authenticateSession();

  if (!session) {
    return NextResponse.json({ message: 'You are not logged in.' }, { status: 401 });
  } else if (!session.user.isAdmin) {
    return NextResponse.json({ message: 'You do not have permission.' }, { status: 403 });
  }

  return null;
};

export const GET = async () => {

    const session = await authenticateSession();
    if(!session) {
        return NextResponse.json({message: "You are not logged in."}, {status: 401})
    }

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
};

export const POST = async (request: NextRequest) => {
  const authenticationError = await handleAdminAuthentication();
  const session = await authenticateSession()

  if (authenticationError) {
    return authenticationError;
  }

  const { title, genre, description } = await request.json();
  await connect();

  const newClassroom = new Classroom({
    title,
    genre,
    instructor: session?.user.name,
    description,
    email: session?.user.email,
  });

  try {
    await newClassroom.save();
    return NextResponse.json({ message: 'Added classroom' }, { status: 200 });
  } catch (error) {
    console.error("Error posting the data to the database:", error);
    return new NextResponse(`Internal Server Error ${error}`, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const authenticationError = await handleAdminAuthentication();
  const session = await authenticateSession()

  if (authenticationError) {
    return authenticationError;
  }

  const { id } = await request.json();
  await connect();

  try {
    const classroom = await Classroom.findOne({ _id: id }).exec();

    // Verifying that admin owns classroom
    if (classroom.email !== session?.user.email) {
      return NextResponse.json({ message: 'This is not your classroom' }, { status: 403 });
    }

    const deletedClass = await Classroom.findByIdAndDelete(id);

    if (!deletedClass) {
      return NextResponse.json({ message: 'Classroom not found' }, { status: 404 });
    } else {
      return NextResponse.json({ message: 'Deleted classroom' }, { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting the data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
