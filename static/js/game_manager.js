import Target from "./target.js";

export default class GameManager {
  constructor() {
    this.target = new Target();
    this.isGameOver = false;
  }
  async initAnswer() {
    this.answer = await fetch("/answer").then((response) => response.json());
  }
  handleTextInput(text) {
    if (CHARS.includes(text)) {
      this.target.setText(text);
    } else if (text === "ENTER") {
      if (this.target.isLastColumn() && this.target.isFulled()) {
        this.checkResult();

        if (this.target.isLastRow()) {
          this.gameOver();
          return;
        }

        this.target.moveNextRow();
      }
    } else if (text === "BACKSPACE") {
      this.target.removeText();
    }
  }
  checkResult() {
    let result = "";
    for (let column of this.target.getCurrentRow().children) {
      result += column.textContent;
    }
    console.log(`your answer is "${result}"`);

    let count = 0;

    for (let i = 0; i < MAX_COLUMN; ++i) {
      let mainEl = this.target.getCurrentRow().children[i];
      let footerEl = document.querySelector(
        `footer .key[data-key=${result[i]}]`
      );

      // 자리와 문자가 같으면 그린
      if (this.answer[i] === result[i]) {
        mainEl.classList.add(GREEN);
        footerEl.classList.add(GREEN);
        ++count;
      }
      // 자리는 다르지만 문자가 포함되면 옐로우
      else if (this.answer.includes(result[i])) {
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
      this.gameOver();
    }
  }
  gameOver() {
    console.log("Game Over!");
    this.isGameOver = true;
    stopTimer();
  }
}
