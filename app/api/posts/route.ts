import { ROW_LENGTH } from "@/app/const/feedOptions";
import { getPostsWithCursor } from "@/app/utils/database";

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url);

  const count = Math.max(
    parseInt(searchParams.get("count") ?? ROW_LENGTH.toString(), 10),
    1
  );
  const cursor = searchParams.get("cursor");

  const posts = await getPostsWithCursor(count, cursor ?? undefined);

  const res = Response.json(posts, { status: 200 });

  return res;
};
