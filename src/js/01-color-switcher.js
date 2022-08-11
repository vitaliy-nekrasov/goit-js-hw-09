const refs = {
  bodyEl: document.querySelector('body'),
  startButtonEl: document.querySelector('[data-start]'),
  stopButtonEl: document.querySelector('[data-stop]'),
};
const { bodyEl, startButtonEl, stopButtonEl } = refs;

startButtonEl.addEventListener('click', toClickStartBtn);
stopButtonEl.setAttribute('disabled', 'true');

function toClickStartBtn() {
  const timerId = setInterval(changeBodyColor, 1000);
  startBtnDisabled();

  stopButtonEl.addEventListener('click', toClickStopBtn);
  function toClickStopBtn() {
    clearInterval(timerId);
    stopBtnDisabled();
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function startBtnDisabled() {
  startButtonEl.setAttribute('disabled', 'true');
  stopButtonEl.removeAttribute('disabled');
}
function stopBtnDisabled() {
  startButtonEl.removeAttribute('disabled');
  stopButtonEl.setAttribute('disabled', 'true');
}
