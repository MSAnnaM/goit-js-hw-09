import Notiflix from 'notiflix';
const form = document.querySelector('form');
Notiflix.Notify.init({
  timeout: 7000,
  clickToClose: true,
  cssAnimationStyle:'zoom',
})

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
const onCreatePromise = event => {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let customDelay = +delay.value;
  let customStep = +step.value;
  let customAmount = +amount.value;
  for (let i = 1; i <= customAmount; i++) {
    createPromise(i, customDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    customDelay += customStep;
  }
  event.currentTarget.reset();
};
form.addEventListener('submit', onCreatePromise);
