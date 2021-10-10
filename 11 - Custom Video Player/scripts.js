const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const windButtons = Array.from(player.querySelectorAll("button[data-skip]"));
const sliders = Array.from(player.querySelectorAll(".player__slider"));
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const fullscreen = player.querySelector(".fullscreen");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  if (this.name === "volume") {
    video.volume = this.value;
  } else if (this.name === "playbackRate") {
    video.playbackRate = this.value;
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  const fraction = event.offsetX / video.offsetWidth;

  video.currentTime = video.duration * fraction;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
}

toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

windButtons.forEach((button) => button.addEventListener("click", skip));

sliders.forEach((slider) =>
  slider.addEventListener("input", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreen.addEventListener("click", toggleFullscreen);
