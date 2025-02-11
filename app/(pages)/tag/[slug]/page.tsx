import ScrollingFeed from "@/app/components/feed/ScrollingFeed";

const TagFilter = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl">#{slug}</p>
      <ScrollingFeed tag={slug} />
    </div>
  );
};

export default TagFilter;
