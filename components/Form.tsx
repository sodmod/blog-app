"use client";

import { useSelector } from "react-redux";
import styles from "./Form.module.css";

type Post = {
  id: string;
  title: string;
  description: string;
};
type RootState = {
  post: Post;
};
const Form: React.FC<{
  children: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void;
}> = (props) => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    props.onSubmit(data);
  }

  const sele = useSelector((state: RootState) => state.post);
  console.log(sele);
  return (
    <form id={styles["event-form"]} onSubmit={handleSubmit}>
      <div className={styles["control"]}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={sele?.title ?? ""}
        />
      </div>

      <p className={styles["control"]}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={sele?.description ?? ""}
        />
      </p>
      <div className={styles["form-actions"]}>{props.children}</div>
    </form>
  );
};

export default Form;
