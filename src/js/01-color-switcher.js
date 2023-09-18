const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;
btnStop.setAttribute("disabled", "disabled");
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
btnStart.addEventListener('click', () => {
    btnStop.removeAttribute("disabled", "disabled");
    timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
    }, 1000);
    btnStart.setAttribute("disabled", "disabled");
});
btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    btnStart.removeAttribute("disabled", "disabled");
    btnStop.setAttribute("disabled", "disabled");
});

