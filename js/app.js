const MAX_ROW = 6;
const MAX_COLUMN = 5;
const FILLED = "filled";
const YELLOW = "yellow";
const GREEN = "green";

// 첫 타겟 설정
let rowIndex = 0;
let columnIndex = 0;
const innerEl = document.querySelector("main>.inner");
let target = innerEl.children[rowIndex].children[columnIndex];

// 키보드 입력 이벤트 등록
document.addEventListener("keydown", function (event) {
  const input = event.key.toUpperCase();
  // 알파벳 입력 시
  if (chars.includes(input)) {
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

function setTextToTarget(text) {
  if (target.classList.contains(FILLED)) moveTargetToNextColumn();
  if (target.classList.contains(FILLED)) return;

  target.textContent = text;
  target.classList.add(FILLED);
}

function moveTargetToNextColumn() {
  if (columnIndex === MAX_COLUMN - 1) return;

  ++columnIndex;
  target = innerEl.children[rowIndex].children[columnIndex];
}

function rowIsFulled() {
  if (innerEl.children[rowIndex].lastElementChild.classList.contains(FILLED))
    return true;

  return false;
}

function moveTargetToNextRow() {
  if (rowIndex === MAX_ROW - 1) return;

  ++rowIndex;
  columnIndex = 0;
  target = innerEl.children[rowIndex].children[columnIndex];
}

function lastRowIsFulled() {
  if (innerEl.lastElementChild.lastElementChild.classList.contains(FILLED))
    return true;

  return false;
}

function bringBackTarget() {
  if (columnIndex === 0) return;

  --columnIndex;
  target = innerEl.children[rowIndex].children[columnIndex];
}

function removeTextInTarget() {
  if (!target.classList.contains(FILLED)) bringBackTarget();
  if (!target.classList.contains(FILLED)) return;

  target.textContent = "";
  target.classList.remove(FILLED);
}

function checkResult() {
  let answerCopy = answer.slice();

  let result = "";
  for (let child of innerEl.children[rowIndex].children) {
    result += child.textContent;
  }

  // 그린 비교
  for (let i = 0; i < MAX_COLUMN; ++i) {
    if (answerCopy[i] === result[i]) {
      innerEl.children[rowIndex].children[i].classList.add(GREEN);
    }
  }

  // 옐로우 비교
  for (let i = 0; i < MAX_COLUMN; ++i) {
    const element = innerEl.children[rowIndex].children[i];

    if (element.classList.contains(GREEN)) {
      continue;
    }

    for (let j = 0; j < MAX_COLUMN; ++j) {
      if (answerCopy[j] === result[i]) {
        element.classList.add(YELLOW);
        answerCopy[j] = "*";
        console.log(answer);
        console.log(answerCopy);
        break;
      }
    }
  }
}
