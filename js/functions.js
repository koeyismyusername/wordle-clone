// 무작위로 5글자 단어를 생성하는 함수
function createRandomWord() {
  let result = "";
  for (let i = 0; i < 5; ++i) {
    const index = Math.floor(Math.random() * 26);
    result += CHARS[index];
  }
  return result;
}
