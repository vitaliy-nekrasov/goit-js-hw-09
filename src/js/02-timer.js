import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('input'),
  startBtnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
const { inputEl, startBtnEl, daysEl, hoursEl, minutesEl, secondsEl } = refs;
startBtnEl.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  intervalId: null,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      alert('"Please choose a date in the future"');
      startBtnEl.setAttribute('disabled', 'true');
    } else {
      startBtnEl.removeAttribute('disabled');
      function getTime() {
        const time = selectedDates[0].getTime() - Date.now();
        const { days, hours, minutes, seconds } = convertMs(time);

        daysEl.textContent = addLeadingZero(`${days}`);
        hoursEl.textContent = addLeadingZero(`${hours}`);
        minutesEl.textContent = addLeadingZero(`${minutes}`);
        secondsEl.textContent = addLeadingZero(`${seconds}`);
      }

      startBtnEl.addEventListener('click', onStartBtnClick);

      function onStartBtnClick() {
        options.intervalId = setInterval(getTime, 1000);
      }
      if (selectedDates[0].getTime() - Date.now() < 5000) {
        clearInterval(options.intervalId);
      }
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(inputEl, options);
