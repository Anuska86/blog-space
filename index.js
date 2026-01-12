const form = document.getElementById("new-post");

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((response) => response.json())
  .then((data) => {
    const postsArray = data.slice(0, 5);

    const html = postsArray
      .map((post) => {
        return `<div class="post">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <hr />
                </div>`;
      })
      .join("");

    document.getElementById("post-container").innerHTML = html;
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;

  const newPost = {
    title: postTitle,
    body: postBody,
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const newPostHtml = `<div class="post">
                <h2>${data.title}</h2>
                <p>${data.body}</p>
                <hr />
            </div>`;

      document.getElementById("post-container").innerHTML =
        newPostHtml + document.getElementById("post-container").innerHTML;

      form.reset();
    });
});
