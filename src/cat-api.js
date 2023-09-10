import axios from "axios";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = "live_fSnk3sPaCzj6P4YZJTdgS16SX3Z4VnOEZRT3kTYLaVE6p3VfU85dQwCzEhoP55OS";
 
export function fetchBreeds() {
    return axios.get(`/breeds`)
        .then((response) => {
            return response.data;
        })
}

export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`)
       .then(response => {
           return response.data;
       });
};