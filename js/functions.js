// 무작위로 5글자 단어를 생성하는 함수
function createRandomWord() {
  let result = "";
  for (let i = 0; i < 5; ++i) {
    const index = Math.floor(Math.random() * 26);
    result += CHARS[index];
  }
  return result;
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
function checkResult() {
  let answerCopy = ANSWER.slice();

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
        console.log(ANSWER);
        console.log(answerCopy);
        break;
      }
    }
  }
}
