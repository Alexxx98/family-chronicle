document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#posts').addEventListener('click', loadPostsView);
    document.querySelector('#albums').addEventListener('click', loadAlbumsView);

    document.querySelector('#posts').addEventListener('mouseover', displayPostsOptions);
    document.querySelector('#albums').addEventListener('mouseover', displayAlbumsOptions);

    document.querySelector('#posts').addEventListener('mouseout', hidePostsOptions);
    document.querySelector('#albums').addEventListener('mouseout', hideAlbumsOptions);

    // Default load
    hidePostsOptions();
    hideAlbumsOptions();
    loadPostsView();
});


function loadPostsView() {
    document.querySelector("#albums-view").style.display = "none";
    document.querySelector("#posts-view").style.display = "block";
}

function loadAlbumsView() {
    document.querySelector("#posts-view").style.display = "none";
    document.querySelector("#albums-view").style.display = "block";
}

// Display dropdowns
function displayPostsOptions() {
    document.querySelector('#posts-opt').style.display = "block";
}

function displayAlbumsOptions() {
    document.querySelector('#albums-opt').style.display = "block";
}

// Hide dropdowns
function hidePostsOptions() {
    document.querySelector('#posts-opt').style.display = "none";
}

function hideAlbumsOptions() {
    document.querySelector('#albums-opt').style.display = "none";
}