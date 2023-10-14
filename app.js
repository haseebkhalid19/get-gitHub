const find = document.getElementById('find');
let currentName = document.getElementsByClassName('name');
let avatar = document.querySelectorAll('.image img');
let level = document.querySelector('.level p');
let followers = document.querySelector('.followers h5');
let following = document.querySelector('.following h5');
let repos = document.querySelector('.Repos h5');
let located_at = document.querySelector('.located_at');
let about = document.querySelector('.about');

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Ensure two digits for month and day
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    
    return `${formattedMonth}/${formattedDay}/${year}`;
}

find.addEventListener('click', () => {
    const searchValue = document.getElementById('search-bar').value;
    var gitApi = `https://api.github.com/users/${searchValue}`;
    fetch(gitApi)
        .then((data) => data.json())
        .then((res) => {
            for (let i = 0; i < currentName.length; i++) {
                currentName[i].textContent = res.name;
                avatar[i].src = res.avatar_url;
            }
            level.textContent = res.bio;
            repos.textContent = res.public_repos;
            followers.textContent = res.followers;
            following.textContent = res.following;
            located_at.textContent = res.location;
            const formattedDate = formatDate(res.created_at);
            about.textContent = formattedDate;
        })
        .catch((error) => console.log('error :', error));
});
