import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { _id, photo_url } = await request.json();

  await connect();

  try {
    // Find the existing user with _id for extra security (email is too easy to hack)
    const existingUser = await User.findOne({ _id });

    if (!existingUser) {
      return new NextResponse("User does not exist", { status: 400 });
    }

    // Update profile picture
    const updatedUser = await User.updateOne(
      { _id },
      { $set: { photo_url } }
    );

    if (updatedUser.modifiedCount === 1) {
      return new NextResponse("Profile picture updated successfully", {
        status: 200,
      });
    } else {
      return new NextResponse("Failed to update profile picture", {
        status: 500,
      });
    }
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
