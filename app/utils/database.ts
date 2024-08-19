import {
  connect,
  connection,
  ConnectionStates,
  HydratedDocument,
} from "mongoose";
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

export const getPostsWithCursor = async (
  count: number,
  id?: string
): Promise<HydratedDocument<PostIF>[]> => {
  //https://mongoosejs.com/docs/api/query.html#Query.prototype.cursor()

  await connectToDb();

  const filter = id ? { _id: { $gt: id } } : {};
  const cursor = Post.find(filter).limit(count).cursor();
  const posts: HydratedDocument<PostIF>[] = [];

  for (let i = 0; i < count; i++) {
    const post = await cursor.next();
    if (!post) break;
    posts.push(post);
  }

  return posts;
};
