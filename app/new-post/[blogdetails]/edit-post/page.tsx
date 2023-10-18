"use client";

import { useSelector } from "react-redux";
import Form from "@/components/Form";
import Link from "next/link";
import styles from "../../../../components/Form.module.css";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/provider/TanstackProvider";
import { patchBlog } from "@/util/https";

const EditPost: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const data = useSelector((state: any) => state.post);

  const { mutate } = useMutation({
    mutationFn: patchBlog,
    onMutate: async (data: any) => {
      const newPost = data;
      await queryClient.cancelQueries({
        queryKey: ["blogs", params.blogdetails],
      });
      const previousPost = queryClient.getQueriesData([
        "",
        params.blogdetails.toString(),
      ]);
      queryClient.setQueriesData(["", params.blogdetails.toString()], newPost);
      return {
        previousPost,
      };
    },

    onError: (error, data, context) => {
      if (context && context.previousPost) {
        queryClient.setQueriesData(["", params.id], context.previousPost);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["", params.id]);
    },
  });

  function handleSubmit(formData: any) {
    mutate({
      formData: {
        id: params.blogdetails,
        title: formData.get("title"),
        description: formData.get("description"),
        url: formData.get("url"),
      },
    });
    router.push("/");
  }

  return (
    <Form inputData={data} onSubmit={handleSubmit}>
      <div className={styles["form-actions"]}>
        <Link
          href=""
          className="button-text"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </div>
    </Form>
  );
};

export default EditPost;
