import "server-only";

import {
  connect,
  connection,
  ConnectionStates,
  Types,
  Error as MongooseError,
} from "mongoose";
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
  cursor?: string,
  userId?: string,
  tag?: string
): Promise<PostsWithCursorIF | undefined> => {
  await connectToDb();

  // const filter = cursor ? { _id: { $lte: new Types.ObjectId(cursor) } } : {};
  const filter: Record<string, any> = {};
  if (cursor) {
    filter._id = { $lt: new Types.ObjectId(cursor) };
  }
  if (userId) {
    filter.owner = new Types.ObjectId(userId);
  }
  if (tag) {
    filter.tags = { $in: [tag] };
  }

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
    // if (cursor) {
    //   ret.posts.map((p) => {
    //     p.imageURL = "";
    //   });
    // }
    ret.posts.map((p) => {
      p.imageURL = "";
    });

    // await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return ret;
};

export const getUserById = async (id: string): Promise<UserIF | undefined> => {
  await connectToDb();

  try {
    const user = await User.findById(id);
    return user?.toObject();
  } catch (error) {
    if (!(error instanceof MongooseError.CastError)) {
      console.error(error);
    }
  }

  return undefined;
};
