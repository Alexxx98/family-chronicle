document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#posts').addEventListener('click', loadPostsView);
    document.querySelector('#albums').addEventListener('click', loadAlbumsView);
    document.querySelector('#create-post').addEventListener('click', createPost);

    document.querySelector('#posts').addEventListener('mouseover', displayPostsOptions);
    document.querySelector('#albums').addEventListener('mouseover', displayAlbumsOptions);

    document.querySelector('#header').addEventListener('mouseenter', hideOptions);
    document.querySelector('#content').addEventListener('mouseenter', hideOptions);

    // Default load
    hideOptions();
    loadPostsView();
});

// HTML loaders
function loadPostsView() {
    document.querySelector("#post-creation").style.display = "none";
    document.querySelector("#albums-view").style.display = "none";
    document.querySelector("#posts-view").style.display = "block";
}

function loadAlbumsView() {
    document.querySelector("#post-creation").style.display = "none";
    document.querySelector("#posts-view").style.display = "none";
    document.querySelector("#albums-view").style.display = "block";
}

function createPost() {
    document.querySelector("#posts-view").style.display = "none";
    document.querySelector("#albums-view").style.display = "none";
    document.querySelector("#post-creation").style.display = "block";
}

// Display dropdowns
function displayPostsOptions() {
    document.querySelector('#albums-opt').style.display = "none";
    document.querySelector('#posts-opt').style.display = "block";
}

function displayAlbumsOptions() {
    document.querySelector('#posts-opt').style.display = "none";
    document.querySelector('#albums-opt').style.display = "block";
}

// Hide dropdowns
function hideOptions() {
    document.querySelector('#posts-opt').style.display = "none";
    document.querySelector('#albums-opt').style.display = "none";
}