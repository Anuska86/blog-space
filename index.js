const form = document.getElementById("new-post");
const postContainer = document.getElementById("post-container");
let postsArray = [];

//Render posts

function renderPosts() {
  const html = postsArray
    .map(
      (post) => `
        <div class="post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        </div>
    `
    )
    .join("");
  postContainer.innerHTML = html;
}

//Get posts
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts();
  });

//Submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  const newPostData = { title: postTitle, body: postBody };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(newPostData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((newPost) => {
      // Add the new post from the server response to the top of our list
      postsArray.unshift(newPost);
      renderPosts();
      form.reset();
    })
    .catch((err) => console.error("Error posting data:", err));
});
