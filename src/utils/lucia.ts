// utils/lucia.ts
import { Lucia } from "lucia";
import { adapter } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {User} from '@/utils/auth';

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "everyone-session-id",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    },
  },
});

export const validateSession = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || "";
  
  const { session } = await lucia.validateSession(sessionId);

  if (session) {
    return true
  } else {
    return null
  }
};

export const validateAdminSession = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || "";

  try {
    const { session, user } = await lucia.validateSession(sessionId);

    if (session) {
      // Refresh the session cookie
      await lucia.createSessionCookie(session.id);

      const dbUser = await User.findOne({ _id: user?.id });

      if (dbUser?.role === "admin") {
        return dbUser;
      } else {
        // User is not an admin, return null or a falsy value
        return null;
      }
    } else {
      // Session is not valid, return null or a falsy value
      return null;
    }
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
};

export const withAdminHandler = async (handler: Function) => {
  return async (request: NextRequest) => {
    const isAdmin = await validateAdminSession();

    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    return handler(request);
  };
};

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
