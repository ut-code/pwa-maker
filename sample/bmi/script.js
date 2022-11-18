const answer = document.getElementById("answer");
const height = document.getElementById("height");
const weight = document.getElementById("weight");

const button = document.getElementById("button");

button.onclick = () => {
  // 「button」がクリックされたときの動作
  answer.textContent = weight.value / (height.value / 100) ** 2;
};
