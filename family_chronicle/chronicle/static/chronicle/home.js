document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#posts').addEventListener('click', loadPostsView);
    document.querySelector('#albums').addEventListener('click', loadAlbumsView);

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