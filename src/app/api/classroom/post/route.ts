import Post from "@/models/Post";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (request: NextRequest) => {
    const session = await getServerSession(authOptions)
    const classID = await request.nextUrl.searchParams.get('classID');
    
    if(!session) {
        return NextResponse.json({ message: 'You are not logged in.' }, {status: 401})
    } else {
        await connect();

        try {
            const post_from_classroom = await Post.find({classID}).exec();
    
            return new NextResponse(JSON.stringify(post_from_classroom), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Error fetching data from the database:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }
};

export const POST = async (request: NextRequest) => {
    try {
  
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