import NextAuth, { NextAuthOptions, User, Account, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/client";

const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | null;
      account: Account | null;
      profile?: Profile | undefined;
    }) {
      if (!profile || !profile.email) {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (existingUser) {
        return true;
      } else {
        //create new user if they dont exist
        await prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name,
            role: "RESIDENT",
          },
        });
        return true;
      }
    },
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
