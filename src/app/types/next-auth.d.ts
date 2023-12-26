// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            isAdmin: any,
            name: string,
            email: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        isAdmin: boolean,
    }
}
