const input = document.getElementById("input");
const ul = document.getElementById("ul");
const register = document.getElementById("register");
const reset = document.getElementById("reset");

// ローカルストレージに保存されているデータをロード
const todos = localStorage.getItem("todos");

// ロードしたデータを書き込む
ul.innerHTML = todos;

register.addEventListener("click", () => {
  // registerが左クリックされたとき
  if (input.value) {
    // もし入力欄が空でなかったら
    // リストに項目を追加
    const li = document.createElement("li");
    li.innerText = input.value;
    li.addEventListener("click", () => {
      // 左クリックされたとき
      if (confirm(`タスク「${li.textContent}」を削除します`)) {
        li.remove();
      }
      // データを保存
      const todos = ul.innerHTML;
      localStorage.setItem("todos", todos);
    });

    ul.appendChild(li);
    // 入力欄を空白に戻す
    input.value = "";

    // データを保存
    const todos = ul.innerHTML;
    localStorage.setItem("todos", todos);
  }
});

reset.addEventListener("click", () => {
  // resetが左クリックされたとき
  if (confirm("すべてのタスクを削除します")) {
    ul.innerHTML = "";
    localStorage.setItem("todos", "");
  }
});
