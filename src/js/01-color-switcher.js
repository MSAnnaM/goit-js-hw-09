const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

const addAttribut = (btnAdd) => {
    btnAdd.setAttribute("disabled", "disabled");
}
const attributRemove = (btnRemove) => {
    btnRemove.removeAttribute("disabled", "disabled");
}
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

