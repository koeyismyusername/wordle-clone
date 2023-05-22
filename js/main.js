// 첫 타겟 설정
let rowIndex = 0;
let columnIndex = 0;
const innerEl = document.querySelector("main>.inner");
let target = innerEl.children[rowIndex].children[columnIndex];

// 키보드 입력 이벤트 등록
document.addEventListener("keydown", function (event) {
  const text = event.key.toUpperCase();
  handleTextInput(text);
});

// 마우스 클릭 이벤트 등록
let els = document.querySelectorAll("footer .key");
els.forEach(function (el) {
  let letter = el.dataset.key;
  // 해당 요소가 클릭됐을 때 글자 입력
  el.addEventListener("click", function () {
    handleTextInput(letter);
  });
});

target.addEventListener("click", function (event) {});
