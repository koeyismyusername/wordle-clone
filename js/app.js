// 알파벳모음
const chars = "QWERTYUIOPASDFGHJKLZXCVBNM";

// 무작위로 5글자 단어 생성
const answer = createRandomWord();
// console.log(answer);

function createRandomWord() {
  let result = "";
  for (let i = 0; i < 5; ++i) {
    const index = Math.floor(Math.random() * 26);
    result += chars[index];
  }
  return result;
}
