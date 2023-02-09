import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const params = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  return fetch(`${BASE_URL}${name}?${params}`).then(response => {
    if (response.status === 404) {
      return Notify.failure('Oops, there is no country with that name');
    }
    if (!response.ok) {
      throw Error('Error!');
    }
    return response.json();
  });
}
