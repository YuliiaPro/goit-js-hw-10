import { fetchBreeds, fetchCatByBreed } from "./cat-api";

import SlimSelect from 'slim-select';   
import 'slim-select/dist/slimselect.css';           

import Notiflix from 'notiflix';

const refs = {
    breedSelect: document.querySelector('#selectElement'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
} 

refs.breedSelect.style.width = "500px";
refs.breedSelect.style.padding = "0 20px";
refs.breedSelect.style.marginTop = "20px";
refs.breedSelect.style.marginLeft = "20px";
refs.breedSelect.style.fontWeight = "500";

fetchBreeds()
.then((data) => {
createOptions(data);
    new SlimSelect({
    select: refs.breedSelect,
    settings: {
    allowDeselect: true
    }
    })
})
    .catch(onFetchError).finally(() =>
    refs.loader.classList.add("is-hidden"));

refs.breedSelect.addEventListener('change', onSearch);
            
        
function createOptions(data) {
    for (let i = 0; i < data.length; i += 1) {
    let option = document.createElement('option');
    option.value = `${data[i].id}`;
    option.text = `${data[i].name}`;
    refs.breedSelect.add(option);
    }
    refs.breedSelect.classList.remove("is-hidden");
}


function onSearch(e) {
    e.preventDefault();
    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId)
        .then((data) => {
            createMarkup(data);
        })
    .catch(onFetchError).finally(() =>
    refs.loader.classList.add("is-hidden"));
}

function createMarkup(data) {
    const { url, breeds } = data[0]; 
    const markup =
    `<div class="card-img">
    <img class="cat-img" src="${url}" alt="" width="500px">
    </div>
    <div class="card-text">
    <h1 class="cat-name"> ${breeds[0].name}</h1>
    <p class="cat-description"> ${breeds[0].description}</p>
    <p><span class="cat-temperament-span">Temperament:</span> ${breeds[0].temperament} </p>
    </div>`;     
             
    refs.catInfo.innerHTML = markup;
    refs.catInfo.classList.remove("is-hidden");
 };

function onFetchError(error) {
    refs.catInfo.innerHTML = "";
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!',{width:'350px', borderRadius: '10px', position: 'center-center', useIcon: false})   
};



