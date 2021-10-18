let countdown = null;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

buttons.forEach((button) => {
  button.addEventListener("click", startTimer);
});

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;

  clearInterval(countdown);
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, 0);
  const formattedSeconds = remainderSeconds.toString().padStart(2, 0);
  const display = `${formattedMinutes}:${formattedSeconds}`;

  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minute = end.getMinutes();

  endTime.textContent = `Be Back At ${hour}:${minute}`;
}

function startTimer() {
  const { time } = this.dataset;
  const seconds = parseInt(time);

  timer(seconds);
}

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const minutes = this.minutes.value;

  this.reset();
  timer(minutes * 60);
});
