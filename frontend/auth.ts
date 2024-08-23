import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/user";
import email from "next-auth/providers/email";
import bcrypt from "bcrypt";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          console.log(user);
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password as string,
              user.password as string
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.error(error);
          throw new Error("Unable to authenticate. Please try again.");
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
        // console.log("session", session.user);
        // console.log("session username", session.user.name);
      }
      return session;
    },
  },
});
