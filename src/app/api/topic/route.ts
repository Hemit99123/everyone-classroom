// routes/api/topics.ts
import Topics from "@/models/Topics";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";
import { withAuthHandler } from "@/utils/handler";

// GET handler
const getTopics = async () => {
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

export const GET = withAuthHandler(getTopics, false);

// POST handler
const createTopic = async (request: NextRequest) => {
  const { title, description, tag } = await request.json();

  const newTopic = new Topics({
    title,
    description,
    tag
  });

  try {
    await newTopic.save();
    return NextResponse.json({ message: 'Added topic' }, { status: 200 });
  } catch (error) {
    console.error("Error posting the data to the database:", error);
    return new NextResponse(`Internal Server Error ${error}`, { status: 500 });
  }
};

export const POST = withAuthHandler(createTopic, true);

// DELETE handler
const deleteTopic = async (request: NextRequest) => {
  const { id } = await request.json();

  try {
    // Delete all Post associated with the topicId
    await Post.deleteMany({ topicId: id });

    // Delete the topic itself
    const deletedTopic = await Topics.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    } else {
      return NextResponse.json({ message: 'Deleted topic and associated posts' }, { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting the data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = withAuthHandler(deleteTopic, true);
