import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const email = String(credentials.email).trim().toLowerCase();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return null;
        }
        const valid = await bcrypt.compare(String(credentials.password), user.passwordHash);
        if (!valid) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          image: user.imageDataUrl ?? undefined,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "local-development-only-nextauth-secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        // Keep JWT small — profile image is loaded from DB in session callback
        delete (token as Record<string, unknown>).picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user || !token.sub) {
        return session;
      }
      session.user.id = token.sub;
      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: { email: true, name: true, imageDataUrl: true },
      });
      if (dbUser) {
        session.user.email = dbUser.email;
        session.user.name = dbUser.name ?? undefined;
        session.user.image = dbUser.imageDataUrl ?? undefined;
      }
      return session;
    },
  },
};
