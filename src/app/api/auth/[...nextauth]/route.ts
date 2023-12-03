import bcrypt from 'bcryptjs';
import NextAuth, { type NextAuthOptions, type Account, type Profile } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';
import connect from '@/utils/db';

const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return Promise.resolve(user);
            }
          }
          return Promise.resolve(null); // Return null if email or password is incorrect
        } catch (err: any) {
          throw new Error(err);
        }
      },


    }),
  ],
  pages: {
    // Changing sign in page from /api/auth/signin to /login to avoid secuirty concerns (with roles)
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
