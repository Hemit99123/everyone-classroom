import { NextRequest, NextResponse } from 'next/server';
import { validateAdminSession, validateSession } from '@/utils/lucia';
import connect from '@/utils/db';

type Handler = (request: NextRequest) => Promise<NextResponse>;

export const withAuthHandler = (handler: Handler, adminRequired: boolean) => {

  return async (request: NextRequest) => {
    const response = NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });

    try {
      if (adminRequired) {
        const isAdmin = await validateAdminSession();
        if (!isAdmin) {
          return response;
        }
      } else {
        const isAuth = await validateSession();
        if (!isAuth) {
            return response;
        }
      }

      await connect();
      return await handler(request);
    } catch (error) {
      console.error("Error processing request:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  };
};
