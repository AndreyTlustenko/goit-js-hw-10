import './css/styles.css';
import debounce from 'lodash.debounce';
// import './fetchCountries';
import {fetchCountries} from "./fetchCountries";
fetchCountries('ukraine');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(search,DEBOUNCE_DELAY))

function search(e){
    e.preventDefault();
    const inputData = input.value.trim();
    fetchCountries(inputData).then(rendercountryList).catch(console.log)
}

function clear (){
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function rendercountryList(responseAPI){
    console.log(responseAPI);
    clear();
    if (responseAPI.lenght > 10){
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    }else if (responseAPI.lenght === 1){
        countryInfo.innerHTML = renderCountryInfo(responseAPI[0]);
    }else {
        const renderListCountry = responseAPI.map(country => renderCountriesList(country)).join('');
        countryList.insertAdjacentHTML('beforeend',renderListCountry);
    }
}

function renderCountriesList({flag, name}){
    return `<li class="country-listInfo">
            <img class="country-flag" src="${flag.svg}"/>
            <h2 class="country-listName">${name.official}</h2>
            </li>`;
}
function renderCountryInfo({name, flag, capital, population, languages}){
    return `<li class="country-listInfo">
    <img class="country-flagInfo" src="${flag.svg}"/>
    <h2 class="country-listName">${name.official}</h2>

    <p><b> capital:</b> ${capital}</p>
    <p><b> population:</b> ${population}</p>
    <p><b> languages:</b> ${Object.values(languages)}</p>
    </li>`;
}