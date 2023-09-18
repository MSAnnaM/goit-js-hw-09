import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute('disabled', 'disabled');
let selectedTime = null;
let timerId = null;
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
const calendar = document.querySelector('#datetime-picker');
flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled', 'disabled');
      Notiflix.Notify.success('Click on start');
      const startTimer = () => {
        selectedTime = selectedDates[0];
        start();
      };
      btnStart.addEventListener('click', startTimer);
    }
  },
});
const start = () => {
    calendar.setAttribute('disabled', 'disabled');
    timerId = setInterval(() => {
    let currentTime = Date.now();
        const timerTime = selectedTime - currentTime;
        if (timerTime <= 0) {
            stop();
        Notiflix.Notify.success('Time is come');  
            return
    }
      const { days, hours, minutes, seconds } = convertMs(timerTime);
      spanDays.textContent = `${days}`;
      spanHours.textContent = `${hours}`;
      spanMinutes.textContent = `${minutes}`;
      spanSeconds.textContent = `${seconds}`;

  }, 1000);
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
     return String(value).padStart(2, 0);
}
const stop = () => {
    clearInterval(timerId);
    calendar.removeAttribute('disabled', 'disabled');
    btnStart.setAttribute('disabled', 'disabled');
}
