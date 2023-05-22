// 첫 타겟 설정
let rowIndex = 0;
let columnIndex = 0;
const innerEl = document.querySelector("main>.inner");
let target = innerEl.children[rowIndex].children[columnIndex];

// 키보드 입력 이벤트 등록
document.addEventListener("keydown", function (event) {
  const input = event.key.toUpperCase();
  // 알파벳 입력 시
  if (CHARS.includes(input)) {
    setTextToTarget(input);
  }
  // 엔터 입력 시
  else if (input === "ENTER") {
    if (rowIsFulled()) {
      // 정답이 맞는지 검사하는 로직 여기에
      checkResult();

      if (lastRowIsFulled()) {
        // 게임 종료하는 로직 여기에
        return;
      }

      moveTargetToNextRow();
    }
  }
  // 백스페이스 입력 시
  else if (input === "BACKSPACE") {
    removeTextInTarget();
  }
});
