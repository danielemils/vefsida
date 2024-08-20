import NextAuth, { Profile, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    picture?: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
