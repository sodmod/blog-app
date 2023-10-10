"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./PostDetails.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlog, getBlog1 } from "@/util/https";
import ErrorBlock from "@/UI/ErrorBlock";
import LoadingIndicator from "@/UI/LoadingIndicator";
import { useDispatch } from "react-redux";
import { storePost } from "@/slices/useSlice";

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
const PostDetails = () => {
  const param = useParams();
  const id = param.blogdetails.toString();
  const retry = useQueryClient();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery<Post[], MyError>({
    queryKey: ["blo"],
    queryFn: getBlog1,
  });

  const result = data?.find((item) => item.id === id);

  console.log(result);

  function retryHandler() {
    retry.refetchQueries(["bloo"]);
  }

  if (result) {
    dispatch(
      storePost({
        id: result.id,
        title: result.title,
        description: result.description,
      })
    );
  }

  let content;
  if (isLoading) {
    content = <LoadingIndicator />;
  }
  if (result) {
    <>
      <div className="flex justify-evenly">
        <h1>title</h1>
        <nav className="flex gap-5">
          <button>Delete</button>
          <Link href="/new-post">Edit</Link>
        </nav>
      </div>
      <div id={styles["event-details-content"]}>
        <div id={styles["event-details-info"]}>
          <div>
            <p>{}</p>
          </div>
          <p id={styles["event-details-description"]}>{result.title}</p>
        </div>
      </div>
    </>;
  } else if (error) {
    content = (
      <>
        <ErrorBlock
          title={error.statusCode}
          // message=""
          message={error.title ? error.title : ""}
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
    <div className="m-auto">
      <Header>
        <Link href="/" className={styles["nav-item"]}>
          View all Events
        </Link>
      </Header>
      {content}
    </div>
  );
};

export default PostDetails;
