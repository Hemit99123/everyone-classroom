import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export const handleServerAuth = async (): Promise<NextResponse | null> => {
    const session = await getServerSession(authOptions)
  
    if (!session) {
      return NextResponse.json({ message: 'You are not logged in.' }, { status: 401 });
    }
    return null;
  };
  
export const handleServerAdminAuth = async (): Promise<NextResponse | null> => {
    const session = await getServerSession(authOptions)
  
    if (!session) {
      return NextResponse.json({ message: 'You are not logged in.' }, { status: 401 });
    } else if (!session.user.isAdmin) {
      return NextResponse.json({ message: 'You do not have permission.' }, { status: 403 });
    }
  
    return null;
};