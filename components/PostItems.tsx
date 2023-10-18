import Link from "next/link";
import styles from "./PostItems.module.css";

const PostItems: React.FC<{
  event: {
    uniqueId: string;
    title: string;
    description: string;
    date: Date;
    url: string;
  };
}> = (props) => {
  const formattedDate = new Date(props.event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <article className={styles["event-item"]}>
      <div className={styles["event-item-content"]}>
        <img src={props.event.url} alt="" />
        <div>
          <p className={styles["post-title"]}>{props.event.title}</p>
          <p className={styles["post-title-description"]}>
            {props.event.description}
          </p>
          <p className={styles["event-item-date"]}>{formattedDate}</p>
        </div>
        <p>
          <Link
            href={`/new-post/${props.event.uniqueId}`}
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
