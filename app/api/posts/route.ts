import { HydratedDocument } from "mongoose";
import { PostIF } from "@/app/models/Post";
import { ROW_LENGTH } from "@/app/const/feedOptions";
import { getPostsWithCursor } from "@/app/utils/database";

export interface PostsGetResponse {
  posts: HydratedDocument<PostIF>[];
}

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url);

  const count = Math.max(
    parseInt(searchParams.get("count") ?? ROW_LENGTH.toString(), 10),
    1
  );
  const id = searchParams.get("id");

  const posts = await getPostsWithCursor(count, id ?? undefined);

  const res = Response.json(
    { posts: posts.map((post) => post.toJSON({ getters: true })) },
    { status: 200 }
  );

  return res;
};
