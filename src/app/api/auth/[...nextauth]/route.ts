import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connect from '@/utils/db';
import NextAuth, { type NextAuthOptions } from 'next-auth'; 
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                await connect();
                try {
                    // Check if credentials and credentials.email are defined
                    if (credentials && credentials.email) {
                        const user = await User.findOne({ email: credentials.email });
                        if (user) {
                            // Check if credentials and credentials.password are defined
                            if (credentials.password) {
                                const isPasswordCorrect = await bcrypt.compare(
                                    credentials.password,
                                    user.password
                                );
                                if (isPasswordCorrect) {
                                    return Promise.resolve(user);
                                }
                            }
                        }
                    }
                    return Promise.resolve(null); // Return null if email or password is incorrect
                    
                } catch (err: any) {
                    throw new Error(err);
                }
            }
        })
    ],
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        // If you want to use the role in client components
        async jwt({ token, user }) {
            if (user) token.role = user.isAdmin
            return token
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) session.user.isAdmin = token.role
            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }

    },
    secret: process.env.NEXT_SECRET
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };