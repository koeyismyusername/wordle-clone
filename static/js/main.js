import GameManager from "./game_manager.js";

const gameManager = new GameManager();
gameManager.initAnswer().then(() => {
  console.log(`answer is ${gameManager.answer}`);

  // 키보드 입력 이벤트 등록
  document.addEventListener("keydown", handleKeyboardInput);
  console.log("Activate keyboard");

  // 마우스 클릭 이벤트 등록
  document.querySelectorAll("footer .key").forEach(function (el) {
    el.addEventListener("click", handleMouseInput);
  });
  console.log("Activate Mouse");
});

// 키보드 입력 처리 함수
function handleKeyboardInput(event) {
  if (gameManager.isGameOver) return;
  gameManager.handleTextInput(event.key.toUpperCase());
}
// 마우스 입력 처리 함수
function handleMouseInput(event) {
  if (gameManager.isGameOver) return;
  gameManager.handleTextInput(event.target.dataset.key.toUpperCase());
}
