"use client";
import { useRef } from "react";
// import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { postblog } from "../../util/https";
import styles from "../../components/Form.module.css";
import Form from "@/components/Form";
import { postblog } from "@/util/https";
import { useMutation } from "@tanstack/react-query";

const NewPost: React.FC<{ children: React.ReactNode }> = (props) => {
  const router = useRouter();
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const { mutate, data, error } = useMutation({
    mutationFn: postblog,
  });

  function handleSubmit(formData: any) {
    console.log(formData);
    mutate(formData);
    router.back();
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className={styles["form-actions"]}>
          <Link href="/" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </div>
      </Form>
    </>
  );
};

export default NewPost;
