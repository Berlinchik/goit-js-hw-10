import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

function onSearch(e) {
  if (e.target.value.trim() === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(e.target.value.trim())
    .then(result => {
      if (result === undefined) {
        return;
      }
      if (result.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (result.length > 1 && result.length <= 10) {
        return renderList(result);
      }
      markupRender(result[0]);
    })
    .catch(error => console.log(error));
}

function renderList(arr) {
  countryInfo.innerHTML = '';
  const list = arr.map(
    ({ name: { official: name }, flags: { svg: flags } }) =>
      `<li class = "countrys"><img src = '${flags}' width = '25' height = '25'></img>${name}</li>`
  );
  countryList.innerHTML = list.join('');
}

function markupRender({
  name: { official: name },
  capital: [capital],
  population,
  flags: { svg: flags },
  languages,
}) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  const arrayLang = Object.values(languages);
  const markup = `
  <h1><img src = '${flags}' width = '25' height = '25'></img> ${name}</h1>
  <p><b>Capital:</b> ${capital}</p>
  <p><b>Population:</b> ${population}</p>
  <p><b>Languages:</b> ${arrayLang.join(', ')}</p>
  `;
  countryInfo.insertAdjacentHTML('beforeend', markup);
}

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
