import Link from "next/link";
import meetupImg from "../assets/meetup.jpg";
import styles from "./BlogEventsIntroSection.module.css";
const BlogEventsIntroSection = () => {
  return (
    <section
      className={styles["content-section"]}
      id={styles["overview-section"]}
      style={{ backgroundImage: `url(${meetupImg.src})` }}
    >
      <h2>
        Connect with amazing people <br />
        or <strong>find a new passion</strong>
      </h2>
      <p>Anyone can organize and join events on NextJS Event!</p>
      <p>
        <Link href="/new-post" className={styles.button}>
          Create your first post
        </Link>
      </p>
    </section>
  );
};

export default BlogEventsIntroSection;
