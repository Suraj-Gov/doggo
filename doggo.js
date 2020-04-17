let DOG_URL;
const doggos = document.querySelector(".doggo-pics");
const isLoading = false;
const LIST_URL = "https://dog.ceo/api/breeds/list/all";
const selector = document.querySelector(".selector");
let selectedBreed;
document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);
document.querySelector(".clear-doggos").addEventListener("click", clearAllDoggos);
loadBreeds();

function getBreedURL(breed) {
    if(breed != "random") {
        return `https://dog.ceo/api/breed/${breed}/images/random`;
    }
    else return "https://dog.ceo/api/breeds/image/random";
}

function getSelectedBreed(selector) {
    let option;
    for(let i = 0; i < selector.options.length; i++) {
        option = selector.options[i];
        if(option.selected === true) {
            break;
        }
    }
    return option.value;
}

function clearAllDoggos() {
    let doggoPics = document.querySelector(".doggo-pics");
    while(doggoPics.hasChildNodes())
    doggoPics.removeChild(doggoPics.firstChild);
}

function loadBreeds() {
    const listObj = fetch(LIST_URL);
    listObj.then(function(response) {
        const breedsJSON = response.json();
        return breedsJSON;
    }).then(function(breedsJSON) {
        const listArr = (Object.keys(breedsJSON.message));
        for(let i = 0; i < listArr.length; i++) {
            let option = document.createElement('option');
            option.appendChild(document.createTextNode(capitalizeFirstLetter(listArr[i])));
            option.value = listArr[i];
            selector.appendChild(option);
        }
    })
}

function capitalizeFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

function loading(loadingBool) {
    if(loadingBool) {
        document.getElementById("loading").style.display = "block";
    }
    else document.getElementById("loading").style.display = "none";
}

function addNewDoggo() {
    selectedBreed = getSelectedBreed(selector);
    DOG_URL = getBreedURL(selectedBreed);
    const pic = fetch(DOG_URL);
    loading(true);
    pic
        .then(function(response) {
        const processingPic = response.json();
        return processingPic;
    })
        .then(function(processedPic) {
            const img = document.createElement("img");
            img.src = processedPic.message;
            console.log(processedPic.message);
            img.alt = "awesome doggo";
            img.className = "doggo-pic";
            doggos.appendChild(img);
            loading(false);
            console.log(selectedBreed);
        });
}

