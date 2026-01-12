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
