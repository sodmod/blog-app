import BlogEventsIntroSection from "@/components/BlogEventsIntroSection";
import Header from "@/components/Header";
import NewBlogSection from "@/components/NewBlogSection";
import Link from "next/link";
import FindBlogSection from "@/components/FindBlogSection";

const Home: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <>
      <Header>
        <Link href="/new-post" className="button">
          Post New Blog
        </Link>
      </Header>
      <main>
        <BlogEventsIntroSection />
        <NewBlogSection />
        <FindBlogSection />
      </main>
    </>
  );
};

export default Home;
