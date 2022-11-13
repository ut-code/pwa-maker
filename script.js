import sampleCode from "./sample-code.js";

require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });

const h1Button = document.getElementById("h1-button");
const h1Input = document.getElementById("h1-input");

const paraButton = document.getElementById("para-button");
const paraInput = document.getElementById("para-input");

const divButton = document.getElementById("div-button");
const divInput = document.getElementById("div-input");

const whButton = document.getElementById("wh-button");
const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");

const colorButton = document.getElementById("color-button");
const colorSelect = document.getElementById("color-select");

const randomButton = document.getElementById("random-button");

const omikujiButton = document.getElementById("omikuji-button");

const iframeElem = document.getElementById("iframe-elem");

const saveButton = document.getElementById("save-button");
const removeButton = document.getElementById("remove-button");

const testButton = document.getElementById("test-button");
const themeToggle = document.getElementById("theme-toggle");
// const htmlTab = document.getElementById("html-tab");
// const cssTab = document.getElementById("css-tab");
// const jsTab = document.getElementById("js-tab");

// const htmlSpace = document.getElementById("html-editor");
// const cssSpace = document.getElementById("css-editor");
// const jsSpace = document.getElementById("js-editor");

require(["vs/editor/editor.main"], () => {
  //エディタ作成
  const savedHtml = localStorage.getItem("html");
  const savedCss = localStorage.getItem("css");
  const savedJs = localStorage.getItem("js");

  let htmlDefaultModel;
  let cssDefaultModel;
  let jsDefaultModel;

  if (savedHtml == null) {
    htmlDefaultModel = monaco.editor.createModel(
      [sampleCode.htmlCode].join("\n"),
      "html"
    );
  } else {
    htmlDefaultModel = monaco.editor.createModel(savedHtml, "html");
  }

  const htmlEditor = monaco.editor.create(
    document.getElementById("html-editor")
  );

  if (savedCss == null) {
    cssDefaultModel = monaco.editor.createModel(
      [sampleCode.cssCode].join("\n"),
      "css"
    );
  } else {
    cssDefaultModel = monaco.editor.createModel(savedCss, "css");
  }

  const cssEditor = monaco.editor.create(document.getElementById("css-editor"));

  if (savedJs == null) {
    jsDefaultModel = monaco.editor.createModel(
      [sampleCode.jsCode].join("\n"),
      "javascript"
    );
  } else {
    jsDefaultModel = monaco.editor.createModel(savedJs, "javascript");
  }

  const jsEditor = monaco.editor.create(document.getElementById("js-editor"));

  htmlEditor.setModel(htmlDefaultModel);
  cssEditor.setModel(cssDefaultModel);
  jsEditor.setModel(jsDefaultModel);

  const allReflect = () => {
    let htmlText = htmlEditor.getValue();
    const cssValue = cssEditor.getValue();
    const jsValue = jsEditor.getValue();

    // let htmlText = htmlText;

    // const head = iframeElem.contentDocument.querySelector("head");
    // const style = iframeElem.contentDocument.createElement("style");
    // style.innerHTML = [cssValue].join("\n");
    // head.appendChild(style);
    // console.log(iframeElem.contentDocument.querySelector("head"));

    // const headStartPoint = htmlText.indexOf("<head>");
    const headEndPoint = htmlText.indexOf("</head>");
    // const headContent = htmlText.slice(headStartPoint + 6, headEndPoint);
    // const iframeBody = iframeElem.contentDocument.getElementById("iframe-body");
    // iframeBody.innerHTML = headContent;

    // iframeElem.srcdoc = [cssValue].join("\n");
    // iframeElem.srcdoc = [jsValue].join("\n");

    const headBeforeText = htmlText.slice(0, headEndPoint);
    const headAfterText = htmlText.slice(headEndPoint);

    htmlText = headBeforeText + `<style>${cssValue}</style>` + headAfterText;

    const bodyEndPoint = htmlText.indexOf("</body>");

    const bodyBeforeText = htmlText.slice(0, bodyEndPoint);
    const bodyAfterText = htmlText.slice(bodyEndPoint);

    htmlText = bodyBeforeText + `<script>${jsValue}</script>` + bodyAfterText;

    iframeElem.srcdoc = [htmlText].join("\n");
  };

  allReflect();
  // const head = iframeElem.contentDocument.querySelector("head");
  // const style = iframeElem.contentDocument.createElement("style");
  // style.innerHTML = "h1 {text-align: center;}";
  // head.appendChild(style);
  // console.log(iframeElem.contentDocument.querySelector("head"));

  htmlEditor.onDidChangeModelContent(() => {
    allReflect();
  });

  cssEditor.onDidChangeModelContent(() => {
    allReflect();
  });

  jsEditor.onDidChangeModelContent(() => {
    allReflect();
  });

  const insertInHtml = (text) => {
    htmlEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: htmlEditor.getSelection(),
        text: text,
      },
    ]);
  };

  // 末尾に挿入するやつも必要
  // console.log(cssEditor.getTopForLineNumber());
  // console.log(cssEditor.getBottomForLineNumber());
  // console.log(cssEditor.getBottomForLineNumber());

  // 指定箇所（bodyの末尾とか）に追加するとかも必要

  const insertInCss = (text) => {
    cssEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: cssEditor.getSelection(),
        text: text,
      },
    ]);
  };

  const insertInJs = (text) => {
    jsEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: jsEditor.getSelection(),
        text: text,
      },
    ]);
  };

  h1Button.onclick = () => {
    insertInHtml(`<h1>${h1Input.value}</h1>`);
  };

  paraButton.onclick = () => {
    insertInHtml(`<p>${paraInput.value}</p>`);
  };

  divButton.onclick = () => {
    insertInHtml(`<div id="${divInput.value}">テキスト</div>`);
    insertInCss(
      `#${divInput.value} {\n\t/* この中で「${divInput.value}」の見た目を調整 */\n}`
    );
    insertInJs(
      `const ${divInput.value} = document.getElementById("${divInput.value}");\n${divInput.value}.onclick = () => {\n\t// 「${divInput.value}」がクリックされたときの動作\n\t\n}\n`
    );
  };

  whButton.onclick = () => {
    insertInCss(
      `width: ${widthInput.value}px; /* 横の長さ */\n\theight: ${heightInput.value}px; /* 縦の長さ */\n\t`
    );
  };

  colorButton.onclick = () => {
    insertInCss(`background-color: ${colorSelect.value}; /* 背景の色 */\n\t`);
  };

  randomButton.onclick = () => {
    insertInJs(
      `const r = Math.random();\r\n\tif (r < 0.3) {\r\n\t\t\/\/ r\u304c0.3\u3088\u308a\u5c0f\u3055\u3044\u3068\u304d\u306e\u52d5\u4f5c\r\n\t\t\r\n\t} else if (r < 0.7) {\r\n\t\t\/\/ r\u304c0.3\u4ee5\u4e0a\u3067\u30010.7\u3088\u308a\u5c0f\u3055\u3044\u3068\u304d\u306e\u52d5\u4f5c\r\n\t\t\r\n\t} else {\r\n\t\t\/\/ \u305d\u306e\u4ed6\uff08r\u304c0.7\u4ee5\u4e0a\uff09\u306e\u3068\u304d\u306e\u52d5\u4f5c\r\n\t\t\r\n\t}\r\n\t`
    );
  };

  omikujiButton.onclick = () => {
    insertInHtml([sampleCode.omikujiDiv].join("\n"));
    insertInCss([sampleCode.omikujiCss].join("\n"));
    insertInJs([sampleCode.omikujiJs].join("\n"));
  };

  // localStorageに保存
  saveButton.onclick = () => {
    localStorage.setItem("html", htmlEditor.getValue());
    localStorage.setItem("css", cssEditor.getValue());
    localStorage.setItem("js", jsEditor.getValue());
  };

  removeButton.onclick = () => {
    const result = window.confirm("保存したデータを削除します");
    if (result) {
      localStorage.removeItem("html");
      localStorage.removeItem("css");
      localStorage.removeItem("js");
    }
  };

  testButton.onclick = () => {
    console.log(localStorage.getItem("html"));
    console.log(localStorage.getItem("css"));
    console.log(localStorage.getItem("js"));

    console.log(localStorage.getItem("html") == null);
  };

  //ライトテーマ・ダークテーマ変更
  const changeTheme = () => {
    if (themeToggle.checked) {
      monaco.editor.setTheme("vs-dark");
    } else {
      monaco.editor.setTheme("vs");
    }

    // const darkTab = document.querySelector(".active-dark");
    // const lightTab = document.querySelector(".active-light");

    // if (darkTab) {
    //   darkTab.classList.remove("active-dark");
    //   darkTab.classList.add("active-light");
    // } else {
    //   lightTab.classList.remove("active-light");
    //   lightTab.classList.add("active-dark");
    // }
  };

  // 初期化
  // htmlSpace.classList.remove("hidden");
  // cssSpace.classList.add("hidden");
  // jsSpace.classList.add("hidden");
  // htmlTab.classList.add("active-light");

  changeTheme();
  themeToggle.addEventListener("change", changeTheme);

  // display none だと　だめかも

  // htmlTab.onclick = () => {
  //   htmlSpace.classList.remove("hidden");
  //   cssSpace.classList.add("hidden");
  //   jsSpace.classList.add("hidden");

  //   if (themeToggle.checked) {
  //     htmlTab.classList.remove("active-light");
  //     htmlTab.classList.add("active-dark");
  //     cssTab.classList.remove("active-light", "active-dark");
  //     jsTab.classList.remove("active-light", "active-dark");
  //   } else {
  //     htmlTab.classList.remove("active-dark");
  //     htmlTab.classList.add("active-light");
  //     cssTab.classList.remove("active-light", "active-dark");
  //     jsTab.classList.remove("active-light", "active-dark");
  //   }
  // };

  // cssTab.onclick = () => {
  //   cssSpace.classList.remove("hidden");
  //   htmlSpace.classList.add("hidden");
  //   jsSpace.classList.add("hidden");

  //   if (themeToggle.checked) {
  //     cssTab.classList.remove("active-light");
  //     cssTab.classList.add("active-dark");
  //     htmlTab.classList.remove("active-light", "active-dark");
  //     jsTab.classList.remove("active-light", "active-dark");
  //   } else {
  //     cssTab.classList.remove("active-dark");
  //     cssTab.classList.add("active-light");
  //     htmlTab.classList.remove("active-light", "active-dark");
  //     jsTab.classList.remove("active-light", "active-dark");
  //   }
  // };

  // jsTab.onclick = () => {
  //   jsSpace.classList.remove("hidden");
  //   htmlSpace.classList.add("hidden");
  //   cssSpace.classList.add("hidden");

  //   if (themeToggle.checked) {
  //     jsTab.classList.remove("active-light");
  //     jsTab.classList.add("active-dark");
  //     cssTab.classList.remove("active-light", "active-dark");
  //     htmlTab.classList.remove("active-light", "active-dark");
  //   } else {
  //     jsTab.classList.remove("active-dark");
  //     jsTab.classList.add("active-light");
  //     cssTab.classList.remove("active-light", "active-dark");
  //     htmlTab.classList.remove("active-light", "active-dark");
  //   }
  // };
});
