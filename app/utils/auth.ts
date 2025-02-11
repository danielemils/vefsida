import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/app/utils/database";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/User";

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDb();

        const user = await User.findOne({ email: profile?.email });

        if (!user) {
          await User.create({
            email: profile?.email,
            username: profile?.name,
            image: profile?.picture,
          });
        } else {
          if (profile?.picture && user.image !== profile.picture) {
            user.image = profile?.picture;
          }
          if (profile?.name && user.username !== profile.name) {
            user.username = profile.name;
          }
          if (user.isModified()) {
            await user.save();
          }
        }

        return true;
      } catch (error) {
        console.error(error);
      }

      return false;
    },
    async session({ session }) {
      if (session.user) {
        try {
          await connectToDb();
          const user = await User.findOne({
            email: session?.user?.email,
          });
          if (user) {
            session.user.id = user._id.toString();
          }
        } catch (error) {
          console.error(error);
        }
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
