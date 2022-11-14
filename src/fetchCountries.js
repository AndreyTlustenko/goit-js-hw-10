export {fetchCountries};
import Notiflix from 'notiflix';


function fetchCountries(name){
   return fetch (`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then((response) => {
        if (!response.ok){
            throw Error (response.status);
        }
        return response.json();
    })
    .catch (error =>{(Notiflix.Notify.failure("Oops, there is no country with that name"))})
}


// ())

// fetchCountries(name) {
//     return fetch('https://restcountries.com/v3.1/name/{name}')
//       .then(response => response.json())
//       .then(data => console.log(`${name}`, name));
//   }
//   fetchCountries('ukraine');