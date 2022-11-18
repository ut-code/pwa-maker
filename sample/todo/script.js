const input = document.getElementById("input");
const ul = document.getElementById("ul");
const button = document.getElementById("button");

// ローカルストレージに保存されているデータをロード
const todos = localStorage.getItem("todos");

// ロードしたデータを書き込む
ul.innerHTML = todos;

button.addEventListener("click", () => {
  if (input.value) {
    // もし入力欄が空でなかったら
    // リストに項目を追加
    const li = document.createElement("li");
    li.innerText = input.value;

    li.addEventListener("contextmenu", (e) => {
      // 右クリックされたとき
      // 右クリックのメニューを表示しない
      e.preventDefault();
      if (confirm("このタスクを削除します")) {
        li.remove();
      }
      // データを保存
      const todos = ul.innerHTML;
      localStorage.setItem("todos", todos);
    });

    li.addEventListener("click", () => {
      // 左クリックされたとき
      li.classList.toggle("line");

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
