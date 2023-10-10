"use client";

import Form from "@/components/Form";
import Link from "next/link";
import styles from "../../../../components/Form.module.css";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/provider/TanstackProvider";
import { fetchBlog, patchBlog } from "@/util/https";

const EditPost: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["blogs", params.blogdetails],
    queryFn: ({ signal }) =>
      fetchBlog({ id: params.blogdetails.toString(), signal }),
  });

  console.log("hmm this is data", data);

  const { mutate } = useMutation({
    mutationFn: patchBlog,
    onMutate: async (data: any) => {
      const newPost = data;
      await queryClient.cancelQueries({ queryKey: ["", params.blogdetails] });
      const previousPost = queryClient.getQueriesData(["", params.blogdetails]);
      queryClient.setQueriesData(["", params.blogdetails], newPost);
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
    console.log(formData);
    mutate({ id: params.blogdetails.toString(), formData: formData.formData });
    // router.push("/");
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
