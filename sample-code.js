export default {
  htmlCode:
    '<!DOCTYPE html>\n<html lang="ja">\n\t<head>\n\t\t<meta charset="UTF-8" />\n\t\t<title>Document</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello HTML!</h1>\n\t\t<p>自由に書き換えてみましょう。</p>\n\t</body>\n</html>',
  cssCode: "h1 {\n\ttext-align: center;\n}\n\np {\n\ttext-align: center;\n}",
  jsCode: "//JavaScriptのコード",
  omikujiCode:
    '<div id="omikuji-template">\n\t<div class="img-box">\n\t<img\n\t\tid="omikuji-image"\n\t\tsrc="./img/omikuji-box.png"\n\t\talt="おみくじの箱"\n\t/>\n\t</div>\n\t<button id="omikuji-button">おみくじを引く</button>\n\t<script>\n\tconst omikujiButton = document.getElementById("omikuji-button");\n\tconst omikujiImage = document.getElementById("omikuji-image");\n\tomikujiButton.onclick = () => {\n\t\tconst r = Math.random();\n\t\tif (r < 0.3) {\n\t\tomikujiImage.src = "./img/omikuji_daikichi.png";\n\t\tsetTimeout(() => {\n\t\t\tomikujiImage.src = "./img/omikuji-box.png";\n\t\t}, 1000);\n\t\t} else if (r < 0.7) {\n\t\tomikujiImage.src = "./img/omikuji_kichi.png";\n\t\tsetTimeout(() => {\n\t\t\tomikujiImage.src = "./img/omikuji-box.png";\n\t\t}, 1000);\n\t\t} else {\n\t\tomikujiImage.src = "./img/omikuji_kyou.png";\n\t\tsetTimeout(() => {\n\t\t\tomikujiImage.src = "./img/omikuji-box.png";\n\t\t}, 1000);\n\t\t}\n\t};\n\t</script>\n</div>',
  // divBoxCode:
  //   '<div>テキストを入力</div>\n<style>\n\tmargin: 10px auto;
  //   \n\twidth: 200px;
  //   \n\theight: 200px;
  //   \n\ttext-align: center;
  //   \n\tline-height: 200px;
  //   \n\tfont-size: 36px;
  //   \n\tfont-weight: bold;</style>'
};
