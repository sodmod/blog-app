import Link from "next/link";
import styles from "./PostItems.module.css";

const PostItems: React.FC<{
  event: { id: string; title: string; description: string };
}> = (props) => {
  return (
    <article className={styles["event-item"]}>
      <div className={styles["event-item-content"]}>
        <div>
          {/* <h2>{props.event.title}</h2> */}
          <p className={styles["post-title"]}>{props.event.title}</p>
          <p className={styles["post-title-description"]}>
            {props.event.description}
          </p>
        </div>
        <p>
          <Link
            href={`/new-post/${props.event.id}`}
            className={styles["button"]}
          >
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
};

export default PostItems;
