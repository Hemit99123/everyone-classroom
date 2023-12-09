import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false
  });

  try {
    await newUser.save();
    const userId = newUser._id; // Assuming MongoDB's default ObjectId
    return NextResponse.json({ id: userId }, {status: 200});
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
