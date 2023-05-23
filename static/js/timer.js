const timerEl = document.querySelector("#timer");
const startTime = new Date();

// 타이머 관리자
const TimeManager = {
  isPaused: false,
  timerID: null,
};

// 타이머 등록
TimeManager.timerID = setInterval(function () {
  if (!TimeManager.isPaused) {
    const currentTime = new Date();
    const timer = new Date(currentTime - startTime);
    const minutes = timer.getMinutes().toString().padStart(2, "0");
    const seconds = timer.getSeconds().toString().padStart(2, "0");
    timerEl.innerText = `${minutes}:${seconds}`;
  } else {
    clearInterval(TimeManager.timerID);
  }
}, 1000);

// 타이머 이벤트 종료 함수
function stopTimer() {
  TimeManager.isPaused = true;
}
