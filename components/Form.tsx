"use client";

import { useState } from "react";
import styles from "./Form.module.css";

const Form: React.FC<{
  children: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void;
  inputData: any;
}> = (props) => {
  const { title, description, url } = props.inputData || {};

  const [isEmpty, setIsEmpty] = useState(false);

  let isSubmitting;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (formData.get("title") !== "" || formData.get("description") !== "") {
      setIsEmpty(false);
      isSubmitting = props.onSubmit(formData);
    } else {
      setIsEmpty(true);
    }
  }

  return (
    <form id={styles["event-form"]} onSubmit={handleSubmit}>
      <div className={styles["control"]}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" defaultValue={title ?? ""} />
      </div>

      <div className={styles["control"]}>
        <label htmlFor="title">Image Url</label>
        <input type="text" id="url" name="url" defaultValue={url ?? ""} />
      </div>

      <p className={styles["control"]}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={description ?? ""}
        />
      </p>
      <div className={styles["form-actions"]}>{props.children}</div>
      {isEmpty && (
        <p className="text-red-700">
          Please fill in the title and the description
        </p>
      )}
    </form>
  );
};

export default Form;
