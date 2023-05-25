export default class Target {
  constructor() {
    this.rowIndex = 0;
    this.columnIndex = 0;
    this.inner = document.querySelector("main>.inner");
  }
  element() {
    return this.inner.children[this.rowIndex].children[this.columnIndex];
  }
  setText(text) {
    if (this.isFulled()) this.moveNextColumn();
    if (this.isFulled()) return;

    this.element().textContent = text;
    this.element().classList.add(FILLED);
  }
  removeText() {
    if (!this.isFulled()) this.moveBeforeColumn();
    if (!this.isFulled()) return;

    this.element().textContent = "";
    this.element().classList.remove(FILLED);
  }
  moveBeforeColumn() {
    if (this.columnIndex === 0) return;
    --this.columnIndex;
  }
  moveNextColumn() {
    if (this.columnIndex === MAX_COLUMN - 1) return;
    ++this.columnIndex;
  }
  moveNextRow() {
    if (this.rowIndex === MAX_ROW - 1) return;
    ++this.rowIndex;
    this.columnIndex = 0;
  }
  isLastColumn() {
    return this.columnIndex === MAX_COLUMN - 1;
  }
  isLastRow() {
    return this.rowIndex === MAX_ROW - 1;
  }
  isFulled() {
    return this.element().classList.contains(FILLED);
  }
  getCurrentRow() {
    return this.inner.children[this.rowIndex];
  }
}
