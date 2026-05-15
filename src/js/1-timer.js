import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let timerId = null;

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    
    if (selectedDates[0] <= currentDate) {
      iziToast.error({ 
        message: 'Please choose a date in the future',
        position: 'center'
      });
      userSelectedDate = null;
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(input, options);

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
  return String(value).padStart(2, "0");
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;
  
  timerId = setInterval(() => {
    const currentTime = new Date();
    const diff = userSelectedDate - currentTime;

    if (diff <= 0) {
      clearInterval(timerId);
      input.disabled = false;
      
      daysRef.textContent = "00";
      hoursRef.textContent = "00";
      minutesRef.textContent = "00";
      secondsRef.textContent = "00";
      return;
    }

    const timeSrt = convertMs(diff);

    daysRef.textContent = addLeadingZero(timeSrt.days);
    hoursRef.textContent = addLeadingZero(timeSrt.hours);
    minutesRef.textContent = addLeadingZero(timeSrt.minutes);
    secondsRef.textContent = addLeadingZero(timeSrt.seconds);
  }, 1000);
});