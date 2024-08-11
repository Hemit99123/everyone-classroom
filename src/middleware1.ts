import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {

    if (request.method === "GET") {
        NextResponse.next()
    }

    // CORS protection so requests can only be made from our website and not from an unauthorized site
    const originHeader = request.headers.get("Origin");
    const hostHeader = request.headers.get("X-Forwarded-Host");

    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
        return new NextResponse(null, {
            status: 403
        });
    }

    return NextResponse.next();
}
