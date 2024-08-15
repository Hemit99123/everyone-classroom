import {User} from '@/utils/auth';
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import connect from "@/utils/db";

export const POST = async (req: NextRequest) => {
    try {
        // Connecting to the database
        await connect();
        var saltRounds = 10
        const {email, password, name } = await req.json();

        // Hashing password for extra secuirty

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashed = bcrypt.hashSync(password, salt);

        await User.create({_id: email, name, password: hashed, role: "user"})

        return NextResponse.json({success: true})
    } catch(err) {
        return NextResponse.json({success: false, error: err})
    }
}