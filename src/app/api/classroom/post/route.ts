import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";
import { handleServerAuth, handleServerAdminAuth } from "@/utils/auth";

export const GET = async (request: NextRequest) => {
  const classID = await request.nextUrl.searchParams.get('classID');
      try {
        const auth = await handleServerAuth()

        if(auth) {
          return auth
        }
            await connect();
          const postsFromClassroom = await Post.find({ classID })
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
  }

export const POST = async (request: NextRequest) => {
    try {

      const auth = await handleServerAdminAuth()

      if(auth) {
        return auth
      }
      const { classID, title, message, video_conferencing, github, realworldApplication, youtubeID, sketchfab } = await request.json();
      // Connect to the database
      await connect();
  
      const newPost = new Post({
        classID,
        title,
        message,
        video_conferencing,
        github,
        realworldApplication,
        youtubeID,
        sketchfab
      })
  
      try {
        await newPost.save();
        return NextResponse.json({ message: 'Added post to classroom' }, { status: 200 });
      } catch (error) {
        console.error("Error posting the data to the database:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
      }
    } catch (error) {
      console.error("Error fetching data from the database:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  };