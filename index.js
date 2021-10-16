const loader = document.getElementById('loader')
const imageContainer = document.getElementById('image-container');
const apiKey = 'vMgZk7BksMSGFuwRoSfd8O-AUEKib8VzdN5NtZoJvx4';
const count = 10;
let photosArray = [];
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0

//check if all the images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden =true;
        console.log('ready-',ready);
    }
}
//function to set the attributes 
function setAttributes(element,attributes){
    for(let key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//Function to display the images 
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Creating Anchor Element
        const item = document.createElement('a');
        //Adding attributes
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        });
        
        //Creating Img element
        const img = document.createElement('img');
        //Adding attributes
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        //Event Listener, check when each image has finished loading 
        img.addEventListener('load',imageLoaded);
        //Adding elements inside the DOM
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Function to Fetch the Images from the API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
    
}

//Event Listener to enable the infinite scrolling
window.addEventListener('scroll',() => {
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready===true){
        ready = false;
        imagesLoaded = 0;
        getPhotos();
     }
})
//Calling APi OnLoad 
getPhotos();

