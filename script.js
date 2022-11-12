import sampleCode from "./sample-code.js";

require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });

const h1Button = document.getElementById("h1-button");
const h1Input = document.getElementById("h1-input");

const paraButton = document.getElementById("para-button");
const paraInput = document.getElementById("para-input");

const divColorSelect = document.getElementById("div-color-select");
const divButton = document.getElementById("div-button");

const omikujiButton = document.getElementById("omikuji-button");

const iframeElem = document.getElementById("iframe-elem");
const themeToggle = document.getElementById("theme-toggle");
const htmlTab = document.getElementById("html-tab");
const cssTab = document.getElementById("css-tab");
const jsTab = document.getElementById("js-tab");

const htmlSpace = document.getElementById("html-editor");
const cssSpace = document.getElementById("css-editor");
const jsSpace = document.getElementById("js-editor");

require(["vs/editor/editor.main"], () => {
  //エディタ作成
  const htmlDefaultModel = monaco.editor.createModel(
    [sampleCode.htmlCode].join("\n"),
    "html"
  );
  const htmlEditor = monaco.editor.create(
    document.getElementById("html-editor")
  );

  const cssDefaultModel = monaco.editor.createModel(
    [sampleCode.cssCode].join("\n"),
    "css"
  );
  const cssEditor = monaco.editor.create(document.getElementById("css-editor"));

  const jsDefaultModel = monaco.editor.createModel(
    [sampleCode.jsCode].join("\n"),
    "javascript"
  );
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

  omikujiButton.onclick = () => {
    insertInHtml([sampleCode.omikujiCode].join("\n"));
  };

  // divButton.onclick = () => {
  //   insertInHtml(`<div>テキスト</div>\n<style></style>`);
  // };

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
