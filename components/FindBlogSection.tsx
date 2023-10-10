"use client";
import { useRef, useState } from "react";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBlog } from "@/util/https";
import LoadingIndicator from "@/UI/LoadingIndicator";
import ErrorBlock from "@/UI/ErrorBlock";
import PostItems from "./PostItems";
import styles from "./FindBlogSection.module.css";
import { storePosts } from "../slices/useSlice";

type Post = {
  id: string;
  title: string;
  description: string;
};

interface MyError {
  statusCode: number;
  title?: string;
  withDarkMode: boolean;
}
const FindBlogSection: React.FC = (props) => {
  const searchElement = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSetsearchTerm] = useState<string>("");

  const disptatch = useDispatch<AppDispatch>();

  const { data, isLoading, error } = useQuery<Post[], MyError>({
    queryKey: ["blogs", { search: searchTerm }],
    queryFn: ({ signal }) => getBlog({ signal, searchTerm, id: "" }),
    enabled: searchTerm !== "",
  });
  if (data) {
    disptatch(storePosts(data));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    setSetsearchTerm(searchElement.current?.value || "");
  }

  let content = <p>Please enter a search term and to find your post</p>;

  // if (isLoading) {
  //   content = <LoadingIndicator />;
  // }

  if (data) {
    content = (
      <ul className={styles[".events-list"]}>
        {data.map((event) => (
          <li key={event.id}>
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
