import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/user";
import email from "next-auth/providers/email";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = getUserByEmail(credentials?.email as string);
          console.log(user);
          if (user) {
            const isMatch = user?.password === credentials.password;

            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error as any);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user; // Storing user data in the token
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("session", session);
      if (token?.user) {
        session.user = { ...token.user } as any; // Sync user data into session
        console.log("session", session.user);
        console.log("session username", session.user.name);
      }
      return session;
    },
  },
});
