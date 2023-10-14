const currentName = document.getElementsByClassName("name");
const avatar = document.querySelectorAll(".image img");
const level = document.querySelector(".level p");
const followers = document.querySelector(".followers h5");
const following = document.querySelector(".following h5");
const repos = document.querySelector(".Repos h5");
const located_at = document.querySelector(".located_at");
const about = document.querySelector(".about");
const box = document.querySelectorAll(".box");
const profile = document.querySelector(".profile a");

function getGitHubProfile(event) {
  event.preventDefault();
  const searchValue = document.getElementById("search-bar").value;
  if (!searchValue) {
    Swal.fire({
      icon: "error",
      title: "Empty Field...",
      text: "The search field can't be empty",
    });
    return;
  }
  var gitApi = `https://api.github.com/users/${searchValue}`;
  fetch(gitApi)
    .then((data) => {
      if (!data.ok) {
        throw new Error("Network error");
      }
      return data.json();
    })
    .then((res) => {
      for (let i = 0; i < currentName.length; i++) {
        currentName[i].textContent = res.name;
        avatar[i].src = res.avatar_url;
        box[i].style.opacity = "1";
      }
      level.textContent = res.bio;
      repos.textContent = res.public_repos;
      followers.textContent = res.followers;
      following.textContent = res.following;
      located_at.textContent = res.location;
      profile.href = res.html_url;
      about.textContent = new Date(res.created_at).toLocaleDateString();
    })
    .catch((error) => {
      console.error(error);
      box[0].style.opacity = "0";
      box[1].style.opacity = "0";
      Swal.fire({
        icon: "error",
        title: "No User...",
        text: "There is No user with this username",
      });
    });
}
