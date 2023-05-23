// 키보드 입력 처리
function handleKeyboardInput(event) {
  const text = event.key.toUpperCase();
  handleTextInput(text);
}

// 마우스 입력 처리
function handleMouseInput(event) {
  handleTextInput(event.target.dataset.key);
}

// 텍스트 입력 처리
function handleTextInput(text) {
  // 알파벳 입력 시
  if (CHARS.includes(text)) {
    setTextToTarget(text);
  }
  // 엔터 입력 시
  else if (text === "ENTER") {
    if (rowIsFulled()) {
      // 정답이 맞는지 검사하는 로직 여기에
      checkResult().then(moveTargetToNextRow);

      if (lastRowIsFulled()) {
        // 게임 종료하는 로직 여기에
        gameOver();
        return;
      }
    }
  }
  // 백스페이스 입력 시
  else if (text === "BACKSPACE") {
    removeTextInTarget();
  }
}

// 타겟에 텍스트 입력
function setTextToTarget(text) {
  if (target.classList.contains(FILLED)) moveTargetToNextColumn();
  if (target.classList.contains(FILLED)) return;

  target.textContent = text;
  target.classList.add(FILLED);
}

// 다음 블럭으로 타켓 옮기기
function moveTargetToNextColumn() {
  if (columnIndex === MAX_COLUMN - 1) return;

  ++columnIndex;
  target = innerEl.children[rowIndex].children[columnIndex];
}

// 한 줄이 다 차면 true 반환
function rowIsFulled() {
  if (innerEl.children[rowIndex].lastElementChild.classList.contains(FILLED))
    return true;

  return false;
}

// 다음 줄로 타겟 옮기기
function moveTargetToNextRow() {
  if (rowIndex === MAX_ROW - 1) return;

  ++rowIndex;
  columnIndex = 0;
  target = innerEl.children[rowIndex].children[columnIndex];
}

// 모든 블럭이 다 차면 true 반환
function lastRowIsFulled() {
  if (innerEl.lastElementChild.lastElementChild.classList.contains(FILLED))
    return true;

  return false;
}

// 이전 타겟으로 되돌리기
function bringBackTarget() {
  if (columnIndex === 0) return;

  --columnIndex;
  target = innerEl.children[rowIndex].children[columnIndex];
}

// 타겟에서 텍스트 지우기
function removeTextInTarget() {
  if (!target.classList.contains(FILLED)) bringBackTarget();
  if (!target.classList.contains(FILLED)) return;

  target.textContent = "";
  target.classList.remove(FILLED);
}

// 정답 확인하기
async function checkResult() {
  const response = await fetch("/answer");
  const obj = await response.json();
  const answer = await obj.answer;

  let result = "";
  for (let child of innerEl.children[rowIndex].children) {
    result += child.textContent;
  }

  let count = 0;

  for (let i = 0; i < MAX_COLUMN; ++i) {
    let mainEl = innerEl.children[rowIndex].children[i];
    let footerEl = document.querySelector(`footer .key[data-key=${result[i]}]`);

    // 자리와 문자가 같으면 그린
    if (answer[i] === result[i]) {
      mainEl.classList.add(GREEN);
      footerEl.classList.add(GREEN);
      ++count;
    }
    // 자리는 다르지만 문자가 포함되면 옐로우
    else if (answer.includes(result[i])) {
      mainEl.classList.add(YELLOW);
      footerEl.classList.add(YELLOW);
    }
    // 나머지 레드
    else {
      mainEl.classList.add(RED);
      footerEl.classList.add(RED);
    }
  }

  // 모두 맞췄다면
  if (count === 5) {
    gameOver();
  }
}

// 게임 종료
function gameOver() {
  // 타이머 종료
  stopTimer();

  // 키보드 입력 이벤트 제거
  document.removeEventListener("keydown", handleKeyboardInput);

  // 마우스 입력 이벤트 제거
  let els = document.querySelectorAll("footer .key");
  els.forEach(function (el) {
    el.removeEventListener("click", handleMouseInput);
  });
}
