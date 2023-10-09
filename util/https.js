import Error from "next/error";

export async function postblog(formData) {
  const url = "https://blog-c4e0e-default-rtdb.firebaseio.com/post.json";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw Error();
  }
}

export const getBlog = async ({ signal, searchTerm }) => {
  let url = "https://blog-c4e0e-default-rtdb.firebaseio.com/post.json";

  const response = await fetch(url, {
    method: "GET",
    signal: signal,
  });

  if (!response.ok) {
    console.log("There is Error");
  }
  let responseData = await response.json();

  const postsArray = [];
  let post;
  if (searchTerm) {
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
    // post = responseData.filter((event) => {
    //   const searchableText = event.title;
    //   console.log("this is the text searched", searchableText);
    //   searchableText.toLowerCase().includes(searchTerm.toLowerCase());
    //   console.log("This is searchable text", searchableTex);
    // });
    // console.log("This is for finding post", post);
    // postsArray.push(post);
  } else {
    for (const key in responseData) {
      let post = {
        id: key,
        title: responseData[key].title,
        description: responseData[key].description,
      };
      postsArray.push(post);
    }
  }
  return postsArray;
};
