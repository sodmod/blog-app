"use client";
import ErrorBlock from "../UI/ErrorBlock";
import LoadingIndicator from "../UI/LoadingIndicator";
import { getBlog1 } from "../util/https";
import styles from "./NewBlogSection.module.css";
import PostItems from "./PostItems";
import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";

type Post = {
  id: string;
  title: string;
  description: string;
};

const NewBlogSection: React.FC = () => {
  const { data, error, isError, isLoading } = useQuery<Post[]>({
    queryKey: ["blooo"],
    queryFn: getBlog1,
  });

  let content;
  if (isLoading) {
    content = <LoadingIndicator />;
  } else if (error) {
    content = (
      <ErrorBlock title="An error occurred" message="Failed to fetch events." />
    );
  }
  if (data) {
    content = (
      <ul className={styles["events-list"]}>
        {data.map((event) => (
          <li key={event.id}>
            <PostItems event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className={styles["content-section"]} id="new-events-section">
      <header>
        <h2>Your recently added posts</h2>
      </header>
      {content}
    </section>
  );
};

export default NewBlogSection;
