"use client";
import { useRef, useState } from "react";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBlog } from "@/util/https";
import ErrorBlock from "@/UI/ErrorBlock";
import PostItems from "./PostItems";
import { storePosts } from "../slices/useSlice";
import styles from "./FindBlogSection.module.css";
// import LoadingIndicator from "@/UI/LoadingIndicator";

interface Post {
  uniqueId: string;
  title: string;
  description: string;
  date: Date;
  url: string;
}

interface MyError {
  statusCode: number;
  title?: string;
  withDarkMode: boolean;
}
const FindBlogSection: React.FC = (props) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchElement = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSetsearchTerm] = useState<string>("");

  // useEffect(() => {
  //   setIsLoading((preState) => !preState);
  // }, [isLoading]);

  const disptatch = useDispatch<AppDispatch>();

  const { data, error } = useQuery<Post[], MyError>({
    queryKey: ["blogs", { search: searchTerm }],
    queryFn: ({ signal }) => getBlog({ signal, searchTerm, id: "" }),
    enabled: searchTerm !== "",
  });
  if (data) {
    disptatch(storePosts(data));
  }

  function handleSubmit(event: any) {
    // setIsLoading(true);
    event.preventDefault();
    setSetsearchTerm(searchElement.current?.value || "");
  }

  let content = <p>Please enter a search term and to find your post</p>;

  // if (isLoading) {
  //   content = <LoadingIndicator />;
  // }

  if (data) {
    content = (
      <ul className={styles["events-list"]}>
        {data.map((event) => (
          <li key={event.uniqueId}>
            <PostItems event={event} />
          </li>
        ))}
      </ul>
    );
  } else if (error) {
    content = (
      <ErrorBlock title={error?.title} message=" Failed to fetch events." />
    );
  }

  return (
    <section className={styles["content-section"]} id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form id={styles["search-form"]} onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
};

export default FindBlogSection;
