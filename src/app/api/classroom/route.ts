import Classroom from "@/models/Classroom";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import {handleServerAuth, handleServerAdminAuth} from '@/utils/auth'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export const GET = async () => {

    const auth = await handleServerAuth();
    if(auth) {
        return auth
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
  const session = await getServerSession(authOptions)
  const auth = await handleServerAdminAuth();
  if (auth) {
    return auth;
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
  const session = await getServerSession(authOptions)
  const auth = await handleServerAdminAuth();

  if (auth) {
    return auth;
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
