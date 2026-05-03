import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    id: "email",
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
    },
    async authorize(credentials) {
      if (!credentials?.email) {
        return null;
      }

      return {
        id: credentials.email as string,
        name: (credentials.email as string).split("@")[0],
        email: credentials.email as string,
      };
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "local-development-secret",
};
