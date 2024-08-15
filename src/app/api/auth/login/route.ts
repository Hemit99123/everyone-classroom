import { lucia } from "@/utils/lucia";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {User} from '@/utils/auth';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

        // Find the user by email
        const user = await User.findOne({ _id: email }).exec();

        if (!user) {
            throw new Error('This user does not exist in our system');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        // Create a session where the userID will point to a specific MONGODB user in the user collection
        const session = await lucia.createSession(user._id, {});
        
        // Create a session cookie
        const sessionCookie = await lucia.createSessionCookie(session.id);
        
        // Create a response
        const response = NextResponse.json({ cookie: sessionCookie });

        // Send a cookie back to the frontend
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        
        return response;
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
};
