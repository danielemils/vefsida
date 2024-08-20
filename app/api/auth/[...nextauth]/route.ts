import NextAuth, { Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/User";
import { connectToDb } from "@/app/utils/database";

const handler = NextAuth({
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

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name,
            image: profile?.picture,
          });
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
          const sessionUser = await User.findOne({
            email: session?.user?.email,
          });
          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
          }
        } catch (error) {
          console.error(error);
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
