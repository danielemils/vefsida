const FeedContainer = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex justify-center mt-1">
      <div className="w-[60vw] grid grid-cols-3 gap-1">{children}</div>
    </div>
  );
};

export default FeedContainer;
