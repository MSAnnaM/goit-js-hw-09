import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const btnStart = document.querySelector('button[data-start]');
const finish = document.querySelectorAll('div.field');
console.log(finish);
btnStart.disabled = true;
let selectedTime = null;
let timerId = null;
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
const calendar = document.querySelector('#datetime-picker');
Notiflix.Notify.init({
  position: 'left-top',
  timeout: 5000,
  clickToClose: true,
  cssAnimationStyle:'from-right',
})
flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      Notiflix.Notify.success('Click on start');
    }
  },
});
const timerText = (days, hours, minutes, seconds) => {
  spanDays.textContent = `${addLeadingZero(days)}`;
    spanHours.textContent = `${addLeadingZero(hours)}`;
    spanMinutes.textContent = `${addLeadingZero(minutes)}`;
    spanSeconds.textContent = `${addLeadingZero(seconds)}`;
}
const start = () => {
  selectedTime = new Date(calendar.value).getTime();
  calendar.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    let currentTime = Date.now();
    const timerTime = selectedTime - currentTime;
    if (timerTime <= 0) {
      stop();
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timerTime);
    timerText(days, hours, minutes, seconds);
  }, 1000);
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
const stop = () => {
  Notiflix.Notify.success('Time is come');
  clearInterval(timerId);
  calendar.removeAttribute('disabled', 'disabled');
  btnStart.disabled = true;
  // finish.classList.add('red-texte');
  finish.forEach(num => {
    num.firstChild.classList.add('red-texte');
  });
  setTimeout(() => {
    // finish.classList.remove('red-texte');
    finish.forEach(num => {
      num.firstChild.classList.remove('red-texte');
    });
    Notiflix.Notify.info('Choose a new date!');
  }, 2000);
};
btnStart.addEventListener('click', start);
