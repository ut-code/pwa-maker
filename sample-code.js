export default {
  htmlCode:
    '<!DOCTYPE html>\n<html lang="ja">\n\t<head>\n\t\t<meta charset="UTF-8" />\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\t\t<title>Document</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello PWA!</h1>\n\t\t<p>自由に書き換えてみましょう。</p>\n\t</body>\n</html>\n',
  cssCode: "h1 {\n\ttext-align: center;\n}\n\np {\n\ttext-align: center;\n}\n",
  jsCode: "//JavaScriptのコード\n",
  omikujiDiv:
    '<div id="wrapper">\r\n  <h1>\u304a\u307f\u304f\u3058\u30a2\u30d7\u30ea</h1>\r\n  <p>\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u304a\u307f\u304f\u3058\u3092\u5f15\u304d\u307e\u3057\u3087\u3046\u3002</p>\r\n\r\n  <div id="omikuji" class="omikuji-elements">\u304a\u307f\u304f\u3058</div>\r\n  <div id="daikichi" class="omikuji-elements">\u5927\u5409</div>\r\n  <div id="kichi" class="omikuji-elements">\u5409</div>\r\n  <div id="kyou" class="omikuji-elements">\u51f6</div>\r\n\r\n  <div id="button-box">\r\n    <button id="omikuji-button">\u304a\u307f\u304f\u3058\u3092\u5f15\u304f</button>\r\n  </div>\r\n</div>\r\n',
  omikujiCss:
    "h1 {\r\n\ttext-align: center;\r\n}\r\np {\r\n\ttext-align: center;\r\n}\r\n#omikuji {\r\n\tbackground-color: lightgray;\r\n}\r\n#daikichi {\r\n\tdisplay: none;\r\n\tbackground-color: lightpink;\r\n}\r\n#kichi {\r\n\tdisplay: none;\r\n\tbackground-color: lightgreen;\r\n}\r\n#kyou {\r\n\tdisplay: none;\r\n\tbackground-color: lightblue;\r\n}\r\n.omikuji-elements {\r\n\tmargin: 10px auto;\r\n\twidth: 200px;\r\n\theight: 200px;\r\n\ttext-align: center;\r\n\tline-height: 200px;\r\n\tfont-size: 36px;\r\n\tfont-weight: bold;\r\n}\r\n\r\n#button-box {\r\n\ttext-align: center;\r\n}\r\n",
  omikujiJs:
    'const omikujiButton = document.getElementById("omikuji-button");\r\nconst omikujiImage = document.getElementById("omikuji-image");\r\n\r\nconst omikuji = document.getElementById("omikuji");\r\nconst daikichi = document.getElementById("daikichi");\r\nconst kichi = document.getElementById("kichi");\r\nconst kyou = document.getElementById("kyou");\r\n\r\nomikujiButton.onclick = () => {\r\n\tconst r = Math.random();\r\n\tif (r < 0.3) {\r\n\tomikuji.style.display = "none";\r\n\tdaikichi.style.display = "block";\r\n\tsetTimeout(() => {\r\n\t\tdaikichi.style.display = "none";\r\n\t\tomikuji.style.display = "block";\r\n\t}, 1000);\r\n\t} else if (r < 0.7) {\r\n\tomikuji.style.display = "none";\r\n\tkichi.style.display = "block";\r\n\tsetTimeout(() => {\r\n\t\tkichi.style.display = "none";\r\n\t\tomikuji.style.display = "block";\r\n\t}, 1000);\r\n\t} else {\r\n\tomikuji.style.display = "none";\r\n\tkyou.style.display = "block";\r\n\tsetTimeout(() => {\r\n\t\tkyou.style.display = "none";\r\n\t\tomikuji.style.display = "block";\r\n\t}, 1000);\r\n\t}\r\n};\r\n',
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

// <div id="omikuji-template">\n\t<div class="img-box">\n\t<img\n\t\tid="omikuji-image"\n\t\tsrc="./img/omikuji-box.png"\n\t\talt="おみくじの箱"\n\t/>\n\t</div>\n\t<button id="omikuji-button">おみくじを引く</button>\n\t<script>\n\tconst omikujiButton = document.getElementById("omikuji-button");\n\tconst omikujiImage = document.getElementById("omikuji-image");\n\tomikujiButton.onclick = () => {\n\t\tconst r = Math.random();\n\t\tif (r < 0.3) {\n\t\tomikujiImage.src = "./img/omikuji_daikichi.png";\n\t\tsetTimeout(() => {\n\t\t\tomikujiImage.src = "./img/omikuji-box.png";\n\t\t}, 1000);\n\t\t} else if (r < 0.7) {\n\t\tomikujiImage.src = "./img/omikuji_kichi.png";\n\t\tsetTimeout(() => {\n\t\t\tomikujiImage.src = "./img/omikuji-box.png";\n\t\t}, 1000);\n\t\t} else {\n\t\tomikujiImage.src = "./img/omikuji_kyou.png";\n\t\tsetTimeout(() => {\n\t\t\tomikujiImage.src = "./img/omikuji-box.png";\n\t\t}, 1000);\n\t\t}\n\t};\n\t</script>\n</div>
