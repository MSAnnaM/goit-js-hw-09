const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

const addAttribut = btnAdd => {
  btnAdd.setAttribute('disabled', 'disabled');
};
const attributRemove = btnRemove => {
  btnRemove.removeAttribute('disabled', 'disabled');
};
addAttribut(btnStop);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
btnStart.addEventListener('click', () => {
  attributRemove(btnStop);
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  addAttribut(btnStart);
});
btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  attributRemove(btnStart);
  addAttribut(btnStop);
});

import axios from 'axios';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

// get for filter
export async function fetchFilter(page, perPage, filter) {
  return await axios
    .get(`/filters?filter=${filter}&page=${page}&limit=${perPage}`)
    .then(response => response.data);
}

// data.results.name
// data.results.imgURL
const filters = {
  bodyParts: 'Body%20parts',
  muscles: 'Muscles',
  equipment: 'Equipment',
};
fetchFilter(1, 12, filters.equipment)
  .then(data => console.log(data.results))
  .catch(error => console.log(error))
  .finally(console.log('If you see it, fetch works :)'));

//   запит на картки
async function fetchCards(page, perPage, filter, name) {
  return await axios
    .get(`/exercises?${filter}=${name}&${page}=1&limit=${perPage}`)
    .then(response => response.data);
}

const cardFilter = {
  bodyParts: 'bodypart',
  muscles: 'muscles',
  equipment: 'equipment',
};
fetchCards(1, 12, cardFilter.muscles, 'abs')
  .then(data => console.log(data.results))
  .catch(error => console.log(error))
  .finally(console.log('If you see it, fetch works :)'));

// запит на повну інформацію
async function fetchExercise(id) {
  return await axios.get(`/exercises/${id}`).then(response => response.data);
}
fetchExercise('64f389465ae26083f39b17a4')
  .then(data => console.log(data))
  .catch(error => console.log(error))
  .finally(console.log('If you see it, fetch works :)'));

//цитата дня
async function fetchQuote() {
  return await axios.get('/quote').then(response => response.data);
}
fetchQuote()
  .then(data => console.log(data))
  .catch(error => console.log(error))
  .finally(console.log('If you see it, fetch works :)'));

//додавання рейтингу
async function patchRating(id, data) {
  return await axios
      .patch(`/exercises/${id}/rating`, data, {
          headers: {
              'content-type': 'application/json'
          }
      })
    .then(response => response.data);
}
const rating = {
  rate: 5,
  email: 'momotanna@gmail.com',
  review: 'My best exercise'
};
patchRating('64f389465ae26083f39b17a4', rating)
  .then(data => console.log(data))
  .catch(error => console.log(error))
  .finally(console.log('sdgfh'));


//підписка
  async function subscribe(data) {
  return await axios
      .post(`/subscription`, data, {
        headers: {
        'content-type': 'application/json'
    }
    })
    .then(response => response.data);
}
const subsc = {
  email:'momotanna@gmail.com',
};
subscribe(subsc)
  .then(data => console.log(data))
  .catch(error => console.log(error))
  .finally(console.log('sdgfh'));



