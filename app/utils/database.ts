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

  return ret;
};
