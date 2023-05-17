const timerEl = document.querySelector("#timer");
const startTime = new Date();

setInterval(function () {
  const currentTime = new Date();
  const timer = new Date(currentTime - startTime);
  const minutes = timer.getMinutes().toString().padStart(2, "0");
  const seconds = timer.getSeconds().toString().padStart(2, "0");
  timerEl.innerText = `${minutes}:${seconds}`;
}, 1000);
