export default {
  htmlCode:
    '<!DOCTYPE html>\n<html lang="ja">\n\t<head>\n\t\t<meta charset="UTF-8" />\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\t\t<title>My App</title>\n\t</head>\n\t<body>\n\t\t<h1 id="app_daimei">Hello PWA!</h1>\n\t\t<p id="app_shoukai">自由に書き換えてみましょう。</p>\n\t</body>\n</html>\n',
  cssCode:
    "#app_daimei {\n\t/* この中で「app_daimei」の見た目を調整 */\n\ttext-align: center; /* 文字等を中央揃え */\n}\n#app_shoukai {\n\t/* この中で「app_shoukai」の見た目を調整 */\n\ttext-align: center; /* 文字等を中央揃え */\n}\n",
  jsCode:
    'const app_shoukai = document.getElementById("app_shoukai"); // 「app_shoukai」の動きを操作するための準備\nconst app_daimei = document.getElementById("app_daimei"); // 「app_daimei」の動きを操作するための準備\n',
  omikujiDiv:
    '\t\t<div id="omikuji_template">\n\t\t\t<div id="omikuji_start">おみくじ</div>\n\t\t\t<div id="daikichi">大吉</div>\n\t\t\t<div id="kichi">吉</div>\n\t\t\t<div id="kyou">凶</div>\n\t\t\t<div id="button_box">\n\t\t\t\t<button id="omikuji_button">おみくじを引く</button>\n\t\t\t</div>\n\t\t</div>\n',
  omikujiCss:
    "#omikuji_start {\n\t/* この中で「omikuji_start」の見た目を調整 */\n\tmargin: 10px auto; /* 上下に10px, 左右に自動の幅をとる */\n\twidth: 200px; /* 横の長さ */\n\theight: 200px; /* 縦の長さ */\n\ttext-align: center; /* 文字等を中央揃え */\n\tline-height: 200px; /* 行間を200pxに設定して上下中央揃え */\n\tbackground-color: lightgray; /* 背景の色 */\n}\n#daikichi {\n\t/* この中で「daikichi」の見た目を調整 */\n\tmargin: 10px auto; /* 上下に10px, 左右に自動の幅をとる */\n\twidth: 200px; /* 横の長さ */\n\theight: 200px; /* 縦の長さ */\n\ttext-align: center; /* 文字等を中央揃え */\n\tline-height: 200px; /* 行間を200pxに設定して上下中央揃え */\n\tfont-weight: bold; /* 文字を太字にする */\n\tfont-size: xx-large; /* 文字を大きくする */\n\tbackground-color: lightpink; /* 背景の色 */\n}\n#kichi {\n\t/* この中で「kichi」の見た目を調整 */\n\tmargin: 10px auto; /* 上下に10px, 左右に自動の幅をとる */\n\twidth: 200px; /* 横の長さ */\n\theight: 200px; /* 縦の長さ */\n\ttext-align: center; /* 文字等を中央揃え */\n\tline-height: 200px; /* 行間を200pxに設定して上下中央揃え */\n\tfont-weight: bold; /* 文字を太字にする */\n\tfont-size: xx-large; /* 文字を大きくする */\n\tbackground-color: lightgreen; /* 背景の色 */\n}\n#kyou {\n\t/* この中で「kyou」の見た目を調整 */\n\tmargin: 10px auto; /* 上下に10px, 左右に自動の幅をとる */\n\twidth: 200px; /* 横の長さ */\n\theight: 200px; /* 縦の長さ */\n\ttext-align: center; /* 文字等を中央揃え */\n\tline-height: 200px; /* 行間を200pxに設定して上下中央揃え */\n\tfont-weight: bold; /* 文字を太字にする */\n\tfont-size: xx-large; /* 文字を大きくする */\n\tbackground-color: lightblue; /* 背景の色 */\n}\n#button_box {\n\ttext-align: center; /* 文字等を中央揃え */\n}\n",
  omikujiJs:
    'const omikuji_button = document.getElementById("omikuji_button"); // 「omikuji_button」の動きを操作するための準備\nconst omikuji_start = document.getElementById("omikuji_start"); // 「omikuji_start」の動きを操作するための準備\nconst daikichi = document.getElementById("daikichi"); // 「daikichi」の動きを操作するための準備\nconst kichi = document.getElementById("kichi"); // 「kichi」の動きを操作するための準備\nconst kyou = document.getElementById("kyou"); // 「kyou」の動きを操作するための準備\ndaikichi.style.display = "none"; // 「daikichi」を隠す\nkichi.style.display = "none"; // 「kichi」を隠す\nkyou.style.display = "none"; // 「kyou」を隠す\nomikuji_button.onclick = () => {\n\t// 「omikuji_button」がクリックされたときの動作\n\tconst r = Math.random(); // 0以上1未満の乱数（ランダムな数）\n\tif (r < 0.3) {\n\t// rが0.3より小さいときの動作\n\tomikuji_start.style.display = "none"; // 「omikuji_start」を隠す\n\tdaikichi.style.display = "block"; // 「daikichi」を表示する\n\tsetTimeout(() => {\n\t// (下の数字÷1000)秒待ってから以下に書いた操作を実行する\n\tdaikichi.style.display = "none"; // 「daikichi」を隠す\n\tomikuji_start.style.display = "block"; // 「omikuji_start」を表示する\n\t}, 1000);\n\t} else if (r < 0.7) {\n\t// rが0.3以上で、0.7より小さいときの動作\n\tomikuji_start.style.display = "none"; // 「omikuji_start」を隠す\n\tkichi.style.display = "block"; // 「kichi」を表示する\n\tsetTimeout(() => {\n\t// (下の数字÷1000)秒待ってから以下に書いた操作を実行する\n\tkichi.style.display = "none"; // 「kichi」を隠す\n\tomikuji_start.style.display = "block"; // 「omikuji_start」を表示する\n\t}, 1000);\n\t} else {\n\t// その他（rが0.7以上）のときの動作\n\tomikuji_start.style.display = "none"; // 「omikuji_start」を隠す\n\tkyou.style.display = "block"; // 「kyou」を表示する\n\tsetTimeout(() => {\n\t// (下の数字÷1000)秒待ってから以下に書いた操作を実行する\n\tkyou.style.display = "none"; // 「kyou」を隠す\n\tomikuji_start.style.display = "block"; // 「omikuji_start」を表示する\n\t}, 1000);\n\t}\n};\n',
  bmiDiv:
    '  <div>\r\n    <h1>BMI\u8a08\u7b97\u30a2\u30d7\u30ea</h1>\r\n    <p>\u300cBMI=\u4f53\u91cd(kg)\u00f7\u8eab\u9577(m)^2\u300d</p>\r\n\r\n    <p><input id="height" type="text" /> cm</p>\r\n    <p><input id="weight" type="text" /> kg</p>\r\n    <div id="box">\r\n      <button id="bmibutton">\u8a08\u7b97\u3059\u308b\uff01</button>\r\n    </div>\r\n    <p>BMI\u306f\u2026\u2026</p>\r\n    <div id="answer">\uff1f\uff1f</div>\r\n  </div>\r\n',
  bmiCss:
    "h1 {\r\n  text-align: center;\r\n}\r\n\r\np {\r\n  text-align: center;\r\n}\r\n\r\n#box {\r\n  /* \u3053\u306e\u4e2d\u3067\u300cbox\u300d\u306e\u898b\u305f\u76ee\u3092\u8abf\u6574 */\r\n  text-align: center; /* \u6587\u5b57\u7b49\u3092\u4e2d\u592e\u63c3\u3048 */\r\n}\r\n#answer {\r\n  /* \u3053\u306e\u4e2d\u3067\u300canswer\u300d\u306e\u898b\u305f\u76ee\u3092\u8abf\u6574 */\r\n  text-align: center; /* \u6587\u5b57\u7b49\u3092\u4e2d\u592e\u63c3\u3048 */\r\n}\r\n",
  bmiJs:
    'const answer = document.getElementById("answer");\r\nconst height = document.getElementById("height");\r\nconst weight = document.getElementById("weight");\r\n\r\nconst bmibutton = document.getElementById("bmibutton");\r\n\r\nbmibutton.onclick = () => {\r\n  // \u300cbutton\u300d\u304c\u30af\u30ea\u30c3\u30af\u3055\u308c\u305f\u3068\u304d\u306e\u52d5\u4f5c\r\n  answer.textContent = weight.value / (height.value / 100) ** 2;\r\n};\r\n',
  todoDiv:
    '\t<div id="wrapper">\n\t\t<h1>TODO</h1>\n\t\t<p>\n\t\t\tタスクを入力して「登録」で登録できます。タスクをクリックで削除になります。「リセット」ですべて削除します。\n\t\t</p>\n\t\t<div>\n\t\t\t<input type="text" id="input" placeholder="タスクを入力" />\n\t\t\t<button id="register">登録</button>\n\t\t\t<button id="reset">リセット</button>\n\t\t</div>\n\t\t<ul id="ul"></ul>\n\t</div>\n',
  todoCss:
    "ul {\r\n  margin: auto;\r\n  width: 150px;\r\n}\r\n#wrapper {\r\n  text-align: center;\r\n}\r\n.line {\r\n  text-decoration: line-through;\r\n}\r\n",
  todoJs:
    'const input = document.getElementById("input");\nconst ul = document.getElementById("ul");\nconst register = document.getElementById("register");\nconst reset = document.getElementById("reset");\n\n// ローカルストレージに保存されているデータをロード\nconst todos = localStorage.getItem("todos");\n\n// ロードしたデータを書き込む\nul.innerHTML = todos;\n\nregister.addEventListener("click", () => {\n\t// registerが左クリックされたとき\n\tif (input.value) {\n\t\t// もし入力欄が空でなかったら\n\t\t// リストに項目を追加\n\t\tconst li = document.createElement("li");\n\t\tli.innerText = input.value;\n\t\tli.addEventListener("click", () => {\n\t\t\t// 左クリックされたとき\n\t\t\tif (confirm(`タスク「${li.textContent}」を削除します`)) {\n\t\t\t\tli.remove();\n\t\t\t}\n\t\t\t// データを保存\n\t\t\tconst todos = ul.innerHTML;\n\t\t\tlocalStorage.setItem("todos", todos);\n\t\t});\n\n\t\tul.appendChild(li);\n\t\t// 入力欄を空白に戻す\n\t\tinput.value = "";\n\n\t\t// データを保存\n\t\tconst todos = ul.innerHTML;\n\t\tlocalStorage.setItem("todos", todos);\n\t}\n});\n\nreset.addEventListener("click", () => {\n\t// resetが左クリックされたとき\n\tif (confirm("すべてのタスクを削除します")) {\n\t\tul.innerHTML = "";\n\t\tlocalStorage.setItem("todos", "");\n\t}\n});\n',
  serviceWorkerScript: `<script>\r\n      if (\"serviceWorker\" in navigator) {\r\n        navigator.serviceWorker\r\n          .register(\"..\/sw.js\")\r\n          .then(function (registration) {\r\n            console.log(\r\n              \"ServiceWorker registration successful with scope: \",\r\n              registration.scope\r\n            );\r\n          })\r\n          .catch(function (err) {\r\n            console.log(\"ServiceWorker registration failed: \", err);\r\n          });\r\n      }\r\n    <\/script>\n`,
  // divBoxCode:
  //   '<div>テキストを入力</div>\n<style>\n\tmargin: 10px auto;
  //   \n\twidth: 200px;
  //   \n\theight: 200px;
  //   \n\ttext-align: center;
  //   \n\tline-height: 200px;
  //   \n\tfont-size: 36px;
  //   \n\tfont-weight: bold;</style>'
};
