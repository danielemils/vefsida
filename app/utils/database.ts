import "server-only";

import { connect, connection, ConnectionStates, Types } from "mongoose";
import User, { UserIF } from "@/app/models/User";
import Post, { PostIF } from "@/app/models/Post";

export const connectToDb = async () => {
  if (
    [ConnectionStates.disconnected, ConnectionStates.uninitialized].includes(
      connection.readyState
    )
  ) {
    await connect(process.env.MONGODB_URI as string);
  }
};

export interface PostsWithCursorIF {
  posts: PostIF[];
  nextCursor?: string;
}

export const getPostsWithCursor = async (
  count: number,
  cursor?: string
): Promise<PostsWithCursorIF | undefined> => {
  await connectToDb();

  const filter = cursor ? { _id: { $lte: new Types.ObjectId(cursor) } } : {};
  const postDocs = await Post.find(filter)
    .limit(count + 1)
    .sort({ _id: "desc" })
    .populate<{ owner: UserIF }>("owner")
    // .lean()
    .exec();

  const ret: PostsWithCursorIF = { posts: [] };

  // have not reached end
  if (postDocs.length > count) {
    ret.nextCursor = postDocs.pop()?.id;
  }

  ret.posts = postDocs.map((d) => d.toObject());

  // Use placeholder images and simulate network latency in development
  if (process.env.DATA_SAVER === "true") {
    if (cursor) {
      ret.posts.map((p) => {
        p.imageURL = "";
      });
    }

    // await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return ret;
};
