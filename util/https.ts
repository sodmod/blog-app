import Error from "next/error";

export async function postblog(formData: any) {
  console.log(formData.get("url"));
  const url = "http://localhost:9999/api/post/blog";

  const sss = {
    title: formData.get("title"),
    description: formData.get("description"),
    url: formData.get("url"),
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(sss),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error({ statusCode: 400, title: "Message not sent" });
  }
}

export async function patchBlog({ formData }: { formData: any }) {
  const url = "http://localhost:9999/api/update/blog";

  console.log("This is SSS", formData);

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
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
  const response = await fetch("http://localhost:9999/api/all-post/blog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseData = await response.json();

  if (!response.ok) {
    throw new Error({ statusCode: 400, title: await response.json() });
  }
  const postsArray = [];
  for (const key in responseData) {
    let post = {
      uniqueId: responseData[key].uniqueId,
      title: responseData[key].title,
      description: responseData[key].description,
      date: responseData[key].dateCreated,
      url: responseData[key].url,
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
          uniqueId: key,
          title: post.title,
          description: post.description,
          date: post.dateCreated,
          url: post.url,
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
        date: responseData[key].dateCreated,
        url: responseData[key].url,
      };
      postsArray.push(post);
    }
    return postsArray;
  }
};

export async function fetchBlog({ id, signal }: { id: string; signal: any }) {
  let url = "http://localhost:9999/api/all-post/blog";

  const response = await fetch(url, {
    method: "GET",

    signal: signal,
  });

  const response1 = await fetch(
    `http://localhost:9999/api/get-a-post/blog?post-id=${id}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error({ statusCode: 400, title: await response.json() });
  }

  const data = await response.json();

  return data;
}

export const getBlogPost = async ({ id }: { id: string }) => {
  const response = await fetch(
    `http://localhost:9999/api/get-a-post/blog?post-id=${id}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    console.log("CASALA");
  }
  const data = await response.json();

  return data;
};

export const deleteBlog = async ({ id }: { id: string }) => {
  const response = await fetch(
    `http://localhost:9999/api/delete/blog?post-id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    console.log("Its not going");
  }
};
