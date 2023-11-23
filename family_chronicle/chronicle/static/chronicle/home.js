document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#albums').addEventListener('click', loadAlbumsView);
    document.querySelector('#create-album').addEventListener('click', loadAlbumCreationForm);

    document.querySelector('#albums').addEventListener('mouseover', displayAlbumsOptions);
    document.querySelector('#users').addEventListener('mouseover', hideOptions)

    document.querySelector('#header').addEventListener('mouseenter', hideOptions);
    document.querySelector('#content').addEventListener('mouseenter', hideOptions);

    // Participants and contributors picker
    document.querySelectorAll('.users').forEach(function(element) {
        element.addEventListener('click', function(event) {
            if (event.target.checked === true) {
                element.style.color = '#f5c240';
            } else {
                element.style.color = "rgb(184, 134, 11)";
            }
        });
    });

    // Remove images from file input
    document.querySelector('#images-container').addEventListener('change', function() {
        document.querySelectorAll('.preview').forEach(function(element) {
            element.addEventListener('click', function(event) {
                element.style.display = "none";
                event.target.previousElementSibling.previousElementSibling.value = "";
            });
        });
    });

    // Make Image carousel change images on button click
    const buttons = document.querySelectorAll('[data-carousel-btn]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // get closest parent element for button and from that element select elements of slides ul
            const slides = button.closest('[data-carousel]').querySelector('[data-slides]').children;
            const miniatures = document.querySelector('[data-miniatures]').children;

            // Transform const slides into array
            const slidesList = Array.prototype.slice.call(slides);

            // Get currently visible slide and it's index
            const activeSlide = document.querySelector('[data-active-slide]');
            const activeMiniature = document.querySelector('[data-active-miniature]');
            let index = slidesList.indexOf(activeSlide);

            // Change active slide dependently on clicked button
            if (button.dataset.carouselBtn === 'next') {
                if (index === slidesList.length - 1) index = 0;
                else index += 1;
            }
            else {
                if (index === 0) index = slidesList.length - 1;
                else index -= 1;
            }

            slides[index].setAttribute('data-active-slide', '');
            miniatures[index].setAttribute('data-active-miniature', '');

            activeSlide.removeAttribute('data-active-slide');
            activeMiniature.removeAttribute('data-active-miniature')

        });
    });

    // show buttons 
    document.querySelector('[data-carousel]').addEventListener('mouseover', () => {
        const buttons = document.querySelectorAll('[data-carousel-btn]');
        buttons.forEach(button => {
            button.style.opacity = 1;
        })
    })

    document.querySelector('[data-carousel]').addEventListener('mouseout', () => {
        const buttons = document.querySelectorAll('[data-carousel-btn]');
        buttons.forEach(button => {
            button.style.opacity = 0;
        });
    });

    // Add listener to popup image
    document.querySelector('[data-slides]').addEventListener('click', popupImage);

    // Default load
    hideOptions();
    loadAlbumsView();
    displayUserFullName();
});

// HTML loaders
function loadAlbumsView() {
    document.querySelector('#album-view').style.display = "none";
    document.querySelector('#album-creation').style.display = "none";
    document.querySelector('#my-albums').style.display = "none";
    document.querySelector('#users-list').style.display = "none";
    document.querySelector('#albums-view').style.display = "block";
}

function loadAlbumCreationForm() {
    document.querySelector('#album-view').style.display = "none";
    document.querySelector('#my-albums').style.display = "none";
    document.querySelector('#users-list').style.display = "none";
    document.querySelector('#albums-view').style.display = "none";
    document.querySelector('#album-creation').style.display = "block";
}

// Display dropdowns
function displayAlbumsOptions() {
    document.querySelector('#albums-opt').style.display = "block";
}

// Hide dropdowns
function hideOptions() {
    document.querySelector('#albums-opt').style.display = "none";
}

function changeToFileName() {
    const fileNames = document.querySelector("#images");
    console.log(fileNames);
}

function displayUserFullName() {
    document.querySelectorAll('.users-list').forEach(function(element) {
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            const original = children[i].firstChild.childNodes[1].textContent;
            // Separate words and split them into array
            let words = original.replace("_", " ").split(' ');
            for (let j = 1; j < words.length; j++) {
                // Capitalize each word
                words[j] = words[j].charAt(0).toUpperCase() + words[j].slice(1);
            }
            const replacement = words.join(' ');
            
            // Update value
            children[i].firstChild.childNodes[1].textContent = replacement;
        }
    });
}

//Preview images
function previewImages() {
    const parent = document.querySelector('#images-list');
    const files = document.querySelector('#images').files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            let image = document.createElement('img');
            image.className = 'preview';
            image.src = URL.createObjectURL(files[i]);
            parent.appendChild(image);
        }
    }
}

function getAlbum(album_id) {
    // Hide albums view div
    document.querySelector('#albums-view').style.display = 'none';

    const album = document.querySelector('#album-view');
    album.style.display = 'none';

    const header = document.querySelector('[data-header]')

    const carousel = document.querySelector('.carousel');
    const imgPicker = document.querySelector('[data-image-picker]');

    document.querySelector('[data-slides]').innerHTML = '';
    document.querySelector('[data-miniatures]').innerHTML = '';
    document.querySelector('[data-participants-list]').innerHTML = '';
    
    // get ul element from carousel div
    let slides = carousel.children[2];
    let miniatures = imgPicker.children[0];
    fetch(`http://127.0.0.1:8000/album/${album_id}`)
        .then(response => response.json())
        .then(data => {
            header.innerHTML = data.title;
            album.insertBefore(header, album.children[0]);
            for (let i = 0; i < data.images.length; i++){
                // Crete list element for image
                let slide = document.createElement('li');
                slide.className = 'slide';
                slides.appendChild(slide);

                // Create list element for image miniature
                let miniature = document.createElement('li');
                miniature.className = 'miniature';
                miniature.addEventListener('click', changeSlideOnClick)
                miniatures.appendChild(miniature);

                // Create image and append it to list element
                let slide_image = document.createElement('img')
                slide_image.src = data.images[i];
                slide.append(slide_image);

                // Create miniature and append it to list element
                let miniature_image = document.createElement('img')
                miniature_image.src = data.images[i];
                miniature.append(miniature_image);
            }

            const participants = document.querySelector('[data-participants-list]');
            for (let i = 0; i < data.participants.length; i++) {
                let participant = document.createElement('li');
                participant.innerHTML = data.participants[i];
                participants.appendChild(participant);
            }

            document.querySelector('.slide').setAttribute('data-active-slide', '');
            document.querySelector('.miniature').setAttribute('data-active-miniature', '');

            album.style.display = 'block';
        })
}

function changeSlideOnClick() {
    const miniatures = this.closest('[data-image-picker]').querySelector('[data-miniatures]').children;
    const slides = document.querySelector('[data-slides]').children;

    const miniaturesList = Array.prototype.slice.call(miniatures);

    const activeMiniature = document.querySelector('[data-active-miniature]');
    const activeSlide = document.querySelector('[data-active-slide]');
    let index = miniaturesList.indexOf(this); 
    
    miniatures[index].setAttribute('data-active-miniature', '');
    slides[index].setAttribute('data-active-slide', '');

    activeMiniature.removeAttribute('data-active-miniature');
    activeSlide.removeAttribute('data-active-slide');
}

function popupImage() {
    const activeSlide = document.querySelector('[data-active-slide]');
    const popupContainer = document.querySelector('[data-popup-image]');

    let popupImage = document.createElement('img');
    popupImage.src = activeSlide.firstChild.currentSrc;

    popupContainer.appendChild(popupImage);
    popupContainer.style.display = 'block';
}

function closePopup() {
    const popupContainer = document.querySelector('[data-popup-image]');
    popupContainer.removeChild(popupContainer.children[1]);
    document.querySelector('[data-popup-image]').style.display = 'none';
}
