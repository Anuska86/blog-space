const form = document.getElementById("new-post");
const postContainer = document.getElementById("post-container");

function getPostHtml(post) {
  return `<div class="post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <hr />
        </div>`;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((response) => response.json())
  .then((data) => {
    const postsArray = data.slice(0, 5);

    const html = postsArray.map((post) => getPostHtml(post)).join("");
    postContainer.innerHTML = html;
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newPost = {
    title: document.getElementById("post-title").value,
    body: (postBody = document.getElementById("post-body").value),
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((postData) => {
      postContainer.innerHTML = getPostHtml(postData) + postContainer.innerHTML;
      form.reset();
    });
});
