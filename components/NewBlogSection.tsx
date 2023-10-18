"use client";
import ErrorBlock from "../UI/ErrorBlock";
import LoadingIndicator from "../UI/LoadingIndicator";
import { getBlog1 } from "../util/https";
import styles from "./NewBlogSection.module.css";
import PostItems from "./PostItems";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Post {
  uniqueId: string;
  title: string;
  description: string;
  date: Date;
  url: string;
}

const NewBlogSection: React.FC = () => {
  const retry = useQueryClient();
  const { data, error, isError, isLoading } = useQuery<Post[]>({
    queryKey: ["blooog"],
    queryFn: getBlog1,
  });

  function retryHandler() {
    retry.refetchQueries(["bloog"]);
  }

  let content;
  if (isLoading) {
    content = <LoadingIndicator />;
  } else if (data) {
    content = (
      <ul className={styles["events-list"]}>
        {data.map((event) => (
          <li key={event.uniqueId}>
            <PostItems event={event} />
          </li>
        ))}
      </ul>
    );
  } else {
    content = (
      <>
        <ErrorBlock
          title="An error occurred"
          message="Failed to fetch events."
        />
        <p>
          <button className={styles["button"]} onClick={retryHandler}>
            View Details
          </button>
        </p>
      </>
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
