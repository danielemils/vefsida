import "server-only";

import { connect, connection, ConnectionStates, Types } from "mongoose";
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
): Promise<PostsWithCursorIF> => {
  //https://mongoosejs.com/docs/api/query.html#Query.prototype.cursor()

  await connectToDb();

  const filter = cursor ? { _id: { $gte: new Types.ObjectId(cursor) } } : {};
  const postDocs = await Post.find(filter)
    .limit(count + 1)
    .exec();

  const ret: PostsWithCursorIF = { posts: [] };

  if (postDocs.length > count) {
    // have not reached end
    ret.nextCursor = postDocs.pop()?.id;
  }

  ret.posts = postDocs.map((postDoc) => postDoc.toObject());

  return ret;
};
