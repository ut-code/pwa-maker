const omikuji_button = document.getElementById("omikuji_button"); // 「omikuji_button」の動きを操作するための準備
const omikuji_start = document.getElementById("omikuji_start"); // 「omikuji_start」の動きを操作するための準備
const daikichi = document.getElementById("daikichi"); // 「daikichi」の動きを操作するための準備
const kichi = document.getElementById("kichi"); // 「kichi」の動きを操作するための準備
const kyou = document.getElementById("kyou"); // 「kyou」の動きを操作するための準備

daikichi.style.display = "none"; // 「daikichi」を隠す
kichi.style.display = "none"; // 「kichi」を隠す
kyou.style.display = "none"; // 「kyou」を隠す

omikuji_button.onclick = () => {
  // 「omikuji_button」がクリックされたときの動作
  const r = Math.random(); // 0以上1未満の乱数（ランダムな数）
  if (r < 0.3) {
    // rが0.3より小さいときの動作
    omikuji_start.style.display = "none"; // 「omikuji_start」を隠す
    daikichi.style.display = "block"; // 「daikichi」を表示する
    setTimeout(() => {
      // (下の数字÷1000)秒待ってから以下に書いた操作を実行する
      daikichi.style.display = "none"; // 「daikichi」を隠す
      omikuji_start.style.display = "block"; // 「omikuji_start」を表示する
    }, 1000);
  } else if (r < 0.7) {
    // rが0.3以上で、0.7より小さいときの動作
    omikuji_start.style.display = "none"; // 「omikuji_start」を隠す
    kichi.style.display = "block"; // 「kichi」を表示する
    setTimeout(() => {
      // (下の数字÷1000)秒待ってから以下に書いた操作を実行する
      kichi.style.display = "none"; // 「kichi」を隠す
      omikuji_start.style.display = "block"; // 「omikuji_start」を表示する
    }, 1000);
  } else {
    // その他（rが0.7以上）のときの動作
    omikuji_start.style.display = "none"; // 「omikuji_start」を隠す
    kyou.style.display = "block"; // 「kyou」を表示する
    setTimeout(() => {
      // (下の数字÷1000)秒待ってから以下に書いた操作を実行する
      kyou.style.display = "none"; // 「kyou」を隠す
      omikuji_start.style.display = "block"; // 「omikuji_start」を表示する
    }, 1000);
  }
};
