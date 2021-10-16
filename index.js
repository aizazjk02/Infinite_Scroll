
const imageContainer = document.getElementById('image-container');
const apiKey = 'vMgZk7BksMSGFuwRoSfd8O-AUEKib8VzdN5NtZoJvx4';
const count = 10;
let photosArray = [];
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

function displayPhotos() {
    console.log(photosArray);
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        console.log("item created",item);
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        console.log('image created',img);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
    console.log("function is running")
}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
    
}



getPhotos();

