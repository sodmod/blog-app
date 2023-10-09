"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./PostDetails.module.css";

const PostDetails = () => {
  const param = useParams();
  const id = param.blogdetails;
  console.log(id);

  return (
    <div className="m-auto">
      <Header>
        <Link href="/" className={styles["nav-item"]}>
          View all Events
        </Link>
      </Header>
      <header className="flex justify-evenly">
        <h1>title</h1>
        <nav className="flex gap-5">
          <button>Delete</button>
          <Link href="/new-post">Edit</Link>
        </nav>
      </header>
      <div id={styles["event-details-content"]}>
        <div id={styles["event-details-info"]}>
          <div>
            <time dateTime={`Todo-DateT$Todo-Time`}>waoo</time>
          </div>
          <p id={styles["event-details-description"]}>description</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
