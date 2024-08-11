import { lucia } from "@/utils/lucia"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const POST = async () => {

    try {
    // Getting the session id that we stored in the cookie

    const sessionId = cookies().get(lucia.sessionCookieName)?.value || ""

    await lucia.invalidateSession(sessionId)

    // Delete cookie with now invalid session id from the frontend of the arch

    const sessionCookie = lucia.createBlankSessionCookie();

    // Setting a blank cookie in the place of the former one

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    
    return NextResponse.json({success: true})

    } catch(err) {
        return NextResponse.json({success: false, error: err})
    }

}