"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./PostDetails.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, getBlogPost } from "@/util/https";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { storePost } from "@/slices/useSlice";
interface Post1 {
  uniqueId: string;
  title: string;
  description: string;
  url: string;
  dateCreated: Date;
}
const PostDetails: React.FC = () => {
  const param = useParams();
  const id = param.blogdetails.toString();

  const dispatch = useDispatch<AppDispatch>();

  const retry = useQueryClient();

  const { data } = useQuery<Post1>({
    queryKey: ["post1"],
    queryFn: () => getBlogPost({ id }),
  });

  if (data) {
    dispatch(
      storePost({
        uniqueId: data.uniqueId,
        description: data.description,
        title: data.title,
        url: data.url,
      })
    );
  }

  // function retryHandler() {
  //   retry.refetchQueries(["post1"]);
  // }

  return (
    <div className="m-auto">
      <Header>
        <Link href="/" className={styles["nav-item"]}>
          View all Events
        </Link>
      </Header>
      <div id={styles["event-details-content"]}>
        <div>
          <div className="flex justify-evenly w-full text-3xl p-3">
            <h1 className="w-1/2">Title</h1>
            <nav className="flex gap-7 justify-evenly w-1/2">
              <button
                onClick={(event) => {
                  const id = param.blogdetails.toString();
                  deleteBlog({ id });
                }}
                style={{
                  background: "red",
                  borderRadius: "10px",
                  padding: "4px",
                }}
              >
                Delete
              </button>
              <Link
                href={`/new-post/${param.blogdetails}/edit-post`}
                style={{
                  backgroundColor: "blueviolet",
                  borderRadius: "10px",
                  padding: "4px",
                }}
              >
                Edit
              </Link>
            </nav>
          </div>
          <div id={styles["event-details-content"]}>
            <img src={`${data?.url}`} alt="" />
            <div id={styles["event-details-info"]}>
              <div>
                <p>{data?.title}</p>
              </div>
              <p id={styles["event-details-description"]}>
                {data?.description}
              </p>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default PostDetails;
