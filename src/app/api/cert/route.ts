import { getServerSession } from "next-auth";
import { handleServerAdminAuth, handleServerAuth } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import connect from "@/utils/db";
import Certificate from "@/models/Certificate";

export const POST = async (request: any) => {
    const session = await getServerSession(authOptions);
    const auth = await handleServerAdminAuth();
    
    if (auth) {
        return auth;
    }

    try {
        const { classID, course_name } = await request.json();
        
        await connect();
        
        const existingCertificate = await Certificate.findOne({ email: session?.user.email, classID, course_name }).exec();

        if (existingCertificate) {
            return NextResponse.json({ message: "User is already certified for this class" }, { status: 203 });
        } else {
            const newCertificate = new Certificate({
                name: session?.user.name,
                email: session?.user.email,
                classID,
                course_name
            });

            const certificate = await newCertificate.save();
            
            return NextResponse.json({ message: certificate?._id  }, { status: 200 });
        }
    } catch (error) {
        console.error("Error processing the request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const GET = async (request: NextRequest) => {
    try {

        const certID = await request.nextUrl.searchParams.get('certID');
  
      const auth = await handleServerAuth()
  
      if (auth) {
        return auth
      }
      // Connect to the database
      await connect();
  
      // Fetch the certifcate for the user
      const certificate = await Certificate.findOne({ _id: certID }).exec();
      
      return NextResponse.json(certificate)
    } catch (error) {
      console.error("Error fetching data from the database:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  };
  