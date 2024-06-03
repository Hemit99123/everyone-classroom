import Topics from "@/models/Topics";
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
    const topics = await Topics.find({}).exec();

    return new NextResponse(JSON.stringify(topics), {
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

  const { title, description } = await request.json();
  await connect();

  const newTopic = new Topics({
    title,
    description,
  });

  try {
    await newTopic.save();
    return NextResponse.json({ message: 'Added topic' }, { status: 200 });
  } catch (error) {
    console.error("Error posting the data to the database:", error);
    return new NextResponse(`Internal Server Error ${error}`, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const auth = await handleServerAdminAuth();

  if (auth) {
    return auth;
  }

  const { id } = await request.json();
  await connect();

  try {
    const deletedTopic = await Topics.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    } else {
      return NextResponse.json({ message: 'Deleted topic' }, { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting the data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
