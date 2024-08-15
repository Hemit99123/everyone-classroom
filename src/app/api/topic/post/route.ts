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
  const { topicId, title, message, github, realworldApplication, youtubeID } = await request.json();

  // Create a post object with only the fields that are defined and are required by the db
  const postData: any = {
    topicId,
    title,
    message
  };

  // Conditionally add optional fields if they are not null or undefined
  if (github) postData.github = github;
  if (realworldApplication) postData.realworldApplication = realworldApplication;
  if (youtubeID) postData.youtubeID = youtubeID;

  const newPost = new Post(postData);

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
