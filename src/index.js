// import './css/styles.css';
import fetchCountries from './fetchCountries.js';
// import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

fetchCountries('peru')
  .then(result => {
    if (result.length > 10) {
      console.log('Too many matches found. Please enter a more specific name.');
      return;
    }
    console.log(result[0]);
    const {
      name: { official: name },
      capital: [capital],
      population,
      flags: { svg: flags },
      languages,
    } = result[0];
  })
  .catch(error => console.log(error));

function markupRender(obj) {
  const markup = `<svg width="70" height="70"> 
  <use href="${obj.flags}">
  </use></svg>
  <h1>${name}</h1>
  `;
}
