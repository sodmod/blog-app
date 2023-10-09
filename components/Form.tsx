"use client";

import styles from "./Form.module.css";

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
  return (
    <form id={styles["event-form"]} onSubmit={handleSubmit}>
      <div className={styles["control"]}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          // defaultValue={inputData?.title ?? ""}
        />
      </div>

      <p className={styles["control"]}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          // defaultValue={inputData?.description ?? ""}
        />
      </p>

      {/* <div className={styles["controls-row"]}>
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            //   defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            //   defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div> */}

      <div className={styles["form-actions"]}>{props.children}</div>
    </form>
  );
};

export default Form;
