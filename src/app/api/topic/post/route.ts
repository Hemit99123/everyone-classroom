// your route file
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";
import { withAuthHandler  } from "@/utils/handler";

// GET handler
const getPosts = async (request: NextRequest) => {
  const topicId = request.nextUrl.searchParams.get('topicId');

  try {
    const postsFromClassroom = await Post.find({ topicId })
        .sort({ createdAt: -1 }) // Sort by creation date in ascending order
        .exec();

    return new NextResponse(JSON.stringify(postsFromClassroom), {
        headers: {
            "Content-Type": "application/json",
        },
    });
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = withAuthHandler(getPosts, false); 

// POST handler
const createPost = async (request: NextRequest) => {
  const { topicId, title, message, github, realworldApplication, youtubeID, sketchfab } = await request.json();
  const newPost = new Post({
    topicId,
    title,
    message,
    github,
    realworldApplication,
    youtubeID,
    sketchfab
  });

  try {
    await newPost.save();
    return NextResponse.json({ message: 'Added post to classroom' }, { status: 200 });
  } catch (error) {
    console.error("Error posting the data to the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = withAuthHandler(createPost, true); 

// DELETE handler
const deletePost = async (request: NextRequest) => {
  const { id } = await request.json();

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    } else {
      return NextResponse.json({ message: 'Deleted post' }, { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting the data from the database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = withAuthHandler(deletePost, true);
