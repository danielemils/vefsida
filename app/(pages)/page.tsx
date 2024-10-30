//export const revalidate = 10;

import ScrollingFeed from "@/comps/feed/ScrollingFeed";

const Home = async () => {
  return (
    <section className="rounded-xl overflow-hidden">
      <ScrollingFeed />
    </section>
  );
};

export default Home;
