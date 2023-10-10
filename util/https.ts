import Error from "next/error";
import { AbortSignal } from "abort-controller";

type Post1 = {}[];

export async function postblog(formData: any) {
  const url = "https://blog-c4e0e-default-rtdb.firebaseio.com/post.json";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error({ statusCode: 400, title: "Message not sent" });
  }
}

export async function patchBlog({
  id,
  formData,
}: {
  id: string;
  formData: any;
}) {
  const url = "https://blog-c4e0e-default-rtdb.firebaseio.com/";
  const updatedurl = `${url}/post/${id}.json`; // Corrected URL

  const response = await fetch(updatedurl, {
    method: "PUT", // Use PATCH to update specific fields, or PUT to replace the entire object
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json", // Corrected content type
    },
  });

  if (!response.ok) {
    throw new Error(
      { statusCode: 400, title: await response.json() },
      `Failed to update data: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

export const getBlog1 = async () => {
  let url = `https://blog-c4e0e-default-rtdb.firebaseio.com/post.json`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error({ statusCode: 400, title: await response.json() });
  }

  let responseData = await response.json();
  const postsArray = [];

  for (const key in responseData) {
    let post = {
      id: key,
      title: responseData[key].title,
      description: responseData[key].description,
    };
    postsArray.push(post);
  }
  return postsArray;
};

export const getBlog = async ({
  signal,
  searchTerm,
  id,
}: {
  signal: any;
  searchTerm: string;
  id: string;
}) => {
  let url = "https://blog-c4e0e-default-rtdb.firebaseio.com/post.json";

  const response = await fetch(url, {
    method: "GET",
    signal: signal,
  });

  if (!response.ok) {
    throw new Error({
      statusCode: 400,
      title: await response.json(),
      withDarkMode: true,
    });
  }
  const responseData = await response.json();
  console.log("Hmmm this is the real response data", responseData);

  const postsArray = [];
  let post;
  if (searchTerm !== "") {
    for (const key in responseData) {
      const post = responseData[key];
      const searchableText = post.title;
      if (searchableText.toLowerCase().includes(searchTerm.toLowerCase())) {
        postsArray.push({
          id: key,
          title: post.title,
          description: post.description,
        });
      }
    }
    return postsArray;
  } else if (id !== "") {
    console.log(id);
    for (const key in responseData) {
      post = responseData[key];
      const searchableText = post.title;
      if (id === responseData[key]) {
        post = responseData[key];
        return post;
      }
    }
  } else {
    for (const key in responseData) {
      let post = {
        id: key,
        title: responseData[key].title,
        description: responseData[key].description,
      };
      postsArray.push(post);
    }
    return postsArray;
  }
};

export async function fetchBlog({ id, signal }: { id: string; signal: any }) {
  let url = "https://blog-c4e0e-default-rtdb.firebaseio.com/post.json";

  const response = await fetch(url, {
    method: "GET",
    signal: signal,
  });

  if (!response.ok) {
    throw new Error({ statusCode: 400, title: await response.json() });
  }

  let responseData = await response.json();
  const postsArray = [];

  for (const key in responseData) {
    if (id === key) {
      let post = {
        id: key,
        title: responseData[key].title,
        description: responseData[key].description,
      };
      return post;
    }
  }
}
