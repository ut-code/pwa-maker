import sampleCode from "./sample-code.js";

require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });

const helpButton = document.getElementById("help-button");

const h1Button = document.getElementById("h1-button");
const h1Input = document.getElementById("h1-input");

const paraButton = document.getElementById("para-button");
const paraInput = document.getElementById("para-input");

const ulButton = document.getElementById("ul-button");
const ulInput = document.getElementById("ul-input");

const divButton = document.getElementById("div-button");
const divInput = document.getElementById("div-input");

const buttonButton = document.getElementById("button-button");
const buttonInput = document.getElementById("button-input");

const inputButton = document.getElementById("input-button");
const inputInput = document.getElementById("input-input");

const whButton = document.getElementById("wh-button");
const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");

const colorButton = document.getElementById("color-button");
const colorSelect = document.getElementById("color-select");

const fsLargeButton = document.getElementById("fs-large-button");
const fwBoldButton = document.getElementById("fw-bold-button");
const textAlignButton = document.getElementById("text-align-button");

const onclickButton = document.getElementById("onclick-button");
const onclickInput = document.getElementById("onclick-input");

// const rightClickButton = document.getElementById("right-click-button");
// const rightClickInput = document.getElementById("right-click-input");

const randomButton = document.getElementById("random-button");
const setTimeOutButton = document.getElementById("setTimeOut-button");
const setTimeOutInput = document.getElementById("setTimeOut-input");

const colorChangeButton = document.getElementById("color-change-button");
const colorChangeInput = document.getElementById("color-change-input");
const colorChangeSelect = document.getElementById("color-change-select");

const textContentButton = document.getElementById("text-content-button");
const textContentInput = document.getElementById("text-content-input");

const hideButton = document.getElementById("hide-button");
const hideInput = document.getElementById("hide-input");

const showButton = document.getElementById("show-button");
const showInput = document.getElementById("show-input");

const omikujiButton = document.getElementById("omikuji-button");
const bmiButton = document.getElementById("bmi-button");
const todoButton = document.getElementById("todo-button");

const iframeElem = document.getElementById("iframe-elem");

const saveButton = document.getElementById("save-button");
const removeButton = document.getElementById("remove-button");

const themeToggle = document.getElementById("theme-toggle");

const dlAnchor = document.getElementById("dl-anchor");

// const htmlTab = document.getElementById("html-tab");
// const cssTab = document.getElementById("css-tab");
// const jsTab = document.getElementById("js-tab");

// const htmlSpace = document.getElementById("html-editor");
// const cssSpace = document.getElementById("css-editor");
// const jsSpace = document.getElementById("js-editor");

require(["vs/editor/editor.main"], () => {
  //??????????????????
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
  htmlEditor.updateOptions({
    fontSize: 14,
  });
  cssEditor.setModel(cssDefaultModel);
  cssEditor.updateOptions({
    fontSize: 14,
  });
  jsEditor.setModel(jsDefaultModel);
  jsEditor.updateOptions({
    fontSize: 14,
  });

  const allReflect = () => {
    let htmlText = htmlEditor.getValue();
    const cssValue = cssEditor.getValue();
    const jsValue = jsEditor.getValue();

    const headEndPoint = htmlText.indexOf("</head>");

    const headBeforeText = htmlText.slice(0, headEndPoint);
    const headAfterText = htmlText.slice(headEndPoint);

    htmlText =
      headBeforeText +
      `<link rel="manifest" href="./manifest.json" />\n` +
      `<style>${cssValue}</style>\n` +
      headAfterText;

    const bodyEndPoint = htmlText.indexOf("</body>");

    const bodyBeforeText = htmlText.slice(0, bodyEndPoint);
    const bodyAfterText = htmlText.slice(bodyEndPoint);

    htmlText = bodyBeforeText + `<script>${jsValue}</script>\n` + bodyAfterText;

    iframeElem.srcdoc = [htmlText].join("\n");

    const scriptStart = htmlText.indexOf("<script>");

    const beforeScript = htmlText.slice(0, scriptStart);
    const afterScript = htmlText.slice(scriptStart);

    const dlText = beforeScript + sampleCode.serviceWorkerScript + afterScript;

    const blob = new Blob([dlText], { type: "text/html" });
    dlAnchor.href = URL.createObjectURL(blob);
    dlAnchor.download = "index.html";
    // dlAnchor.textContent = "????????????????????????????????????????????????";
    // dlSection.appendChild(dlAnchor);
  };

  allReflect();

  htmlEditor.onDidChangeModelContent(() => {
    allReflect();
  });

  cssEditor.onDidChangeModelContent(() => {
    allReflect();
  });

  jsEditor.onDidChangeModelContent(() => {
    allReflect();
  });

  // const insertInHtmlAtCursor = (text) => {
  //   htmlEditor.executeEdits("", [
  //     {
  //       forceMoveMarkers: true,
  //       range: htmlEditor.getSelection(),
  //       text: text,
  //     },
  //   ]);
  // };

  const insertInHtmlAtBodyBottom = (text) => {
    const body = htmlEditor.getModel().findMatches("</body>")[0].range;
    console.log(body);
    htmlEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: new monaco.Range(
          body.startLineNumber,
          body.startColumnNumber,
          body.startLineNumber,
          body.startColumnNumber
        ),
        text: text,
      },
    ]);
  };

  const insertInCssAtBottom = (text) => {
    const bottom = cssEditor.getModel().getLineCount();
    cssEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: new monaco.Range(bottom, 1, bottom, 1),
        text: text,
      },
    ]);
  };

  const insertInCssAtCursor = (text) => {
    cssEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: cssEditor.getSelection(),
        text: text,
      },
    ]);
  };

  const insertInJsAtTop = (text) => {
    jsEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: new monaco.Range(1, 1, 1, 1),
        text: text,
      },
    ]);
  };

  const insertInJsAtBottom = (text) => {
    const bottom = jsEditor.getModel().getLineCount();
    jsEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: new monaco.Range(bottom, 1, bottom, 1),
        text: text,
      },
    ]);
  };

  const insertInJsAtCursor = (text) => {
    jsEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: jsEditor.getSelection(),
        text: text,
      },
    ]);
  };

  // ?????????????????????HTML???
  // HTML????????????????????????????????????CSS??????????????????ID????????????????????????JS??????????????????DOM???????????????

  h1Button.onclick = () => {
    if (h1Input.value != "") {
      insertInHtmlAtBodyBottom(`\t\t<h1 id="${h1Input.value}">?????????</h1>\n`);
      insertInCssAtBottom(
        `#${h1Input.value} {\n\t/* ???????????????${h1Input.value}???????????????????????? */\n}\n`
      );
      insertInJsAtTop(
        `const ${h1Input.value} = document.getElementById("${h1Input.value}"); // ???${h1Input.value}??????????????????????????????????????????\n`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  paraButton.onclick = () => {
    if (paraInput.value != "") {
      insertInHtmlAtBodyBottom(`\t\t<p id="${paraInput.value}">??????</p>\n`);
      insertInCssAtBottom(
        `#${paraInput.value} {\n\t/* ???????????????${paraInput.value}???????????????????????? */\n}\n`
      );
      insertInJsAtTop(
        `const ${paraInput.value} = document.getElementById("${paraInput.value}"); // ???${paraInput.value}??????????????????????????????????????????\n`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  ulButton.onclick = () => {
    if (ulInput.value != "") {
      insertInHtmlAtBodyBottom(
        `    <ul id=\"${ulInput.value}">\r\n        <li><\/li>\r\n    <\/ul>\r\n`
      );
      insertInCssAtBottom(
        `#${ulInput.value} {\n\t/* ???????????????${ulInput.value}???????????????????????? */\n}\n`
      );
      insertInJsAtTop(
        `const ${ulInput.value} = document.getElementById("${ulInput.value}"); // ???${ulInput.value}??????????????????????????????????????????\n`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  divButton.onclick = () => {
    if (divInput.value != "") {
      insertInHtmlAtBodyBottom(
        `\t\t<div id="${divInput.value}">????????????</div>\n`
      );
      insertInCssAtBottom(
        `#${divInput.value} {\n\t/* ???????????????${divInput.value}???????????????????????? */\n}\n`
      );
      insertInJsAtTop(
        `const ${divInput.value} = document.getElementById("${divInput.value}"); // ???${divInput.value}??????????????????????????????????????????\n`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  buttonButton.onclick = () => {
    if (buttonInput.value != "") {
      insertInHtmlAtBodyBottom(
        `\t\t<button id="${buttonInput.value}">?????????</button>\n`
      );
      insertInCssAtBottom(
        `#${buttonInput.value} {\n\t/* ???????????????${buttonInput.value}???????????????????????? */\n}\n`
      );
      insertInJsAtTop(
        `const ${buttonInput.value} = document.getElementById("${buttonInput.value}"); // ???${buttonInput.value}??????????????????????????????????????????\n`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  inputButton.onclick = () => {
    if (inputInput.value != "") {
      insertInHtmlAtBodyBottom(
        `\t\t<input id="${inputInput.value}" type="text"/>\n`
      );
      insertInCssAtBottom(
        `#${inputInput.value} {\n\t/* ???????????????${inputInput.value}???????????????????????? */\n}\n`
      );
      insertInJsAtTop(
        `const ${inputInput.value} = document.getElementById("${inputInput.value}"); // ???${inputInput.value}??????????????????????????????????????????\n`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  // ????????????????????????CSS???
  // CSS???????????????????????????????????????????????????????????????????????????
  whButton.onclick = () => {
    if (widthInput.value != "" && heightInput.value != "") {
      insertInCssAtCursor(
        `width: ${widthInput.value}px; /* ???????????? */\n\theight: ${heightInput.value}px; /* ???????????? */\n\t`
      );
    } else {
      alert("????????????????????????????????????????????????");
    }
  };

  colorButton.onclick = () => {
    insertInCssAtCursor(
      `background-color: ${colorSelect.value}; /* ???????????? */\n\t`
    );
  };

  fsLargeButton.onclick = () => {
    insertInCssAtCursor(`font-size: xx-large; /* ???????????????????????? */\n\t`);
  };

  fwBoldButton.onclick = () => {
    insertInCssAtCursor(`font-weight: bold; /* ????????????????????? */\n\t`);
  };

  textAlignButton.onclick = () => {
    insertInCssAtCursor(`text-align: center; /* ???????????????????????? */\n\t`);
  };

  // ???????????????JS???
  // DOM?????????????????????????????????

  randomButton.onclick = () => {
    insertInJsAtCursor(
      `const r = Math.random(); // 0??????1???????????????????????????????????????\r\n\tif (r < 0.3) {\r\n\t\t\/\/ r\u304c0.3\u3088\u308a\u5c0f\u3055\u3044\u3068\u304d\u306e\u52d5\u4f5c\r\n\t\t\r\n\t} else if (r < 0.7) {\r\n\t\t\/\/ r\u304c0.3\u4ee5\u4e0a\u3067\u30010.7\u3088\u308a\u5c0f\u3055\u3044\u3068\u304d\u306e\u52d5\u4f5c\r\n\t\t\r\n\t} else {\r\n\t\t\/\/ \u305d\u306e\u4ed6\uff08r\u304c0.7\u4ee5\u4e0a\uff09\u306e\u3068\u304d\u306e\u52d5\u4f5c\r\n\t\t\r\n\t}\r\n\t`
    );
  };

  onclickButton.onclick = () => {
    if (onclickInput.value != "") {
      insertInJsAtCursor(
        `${onclickInput.value}.onclick = () => {\n\t// ???${onclickInput.value}??????????????????????????????????????????\n\t\n}\n`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  // rightClickButton.onclick = () => {
  //   if (rightClickInput.value != "") {
  //   insertInJsAtCursor(
  //     `${rightClickInput.value}.addEventListener("contextmenu", (e) => {\n\te.preventDefault(); // ??????????????????????????????????????????????????????????????????\n\t// ????????????????????????????????????????????????\n\t\n});\n`
  //     // `${rightClickInput.value}.addEventListener(\"contextmenu\", (e) => {\r\n    \/\/ \u53f3\u30af\u30ea\u30c3\u30af\u3055\u308c\u305f\u3068\u304d\r\n    \/\/ \u53f3\u30af\u30ea\u30c3\u30af\u306e\u30e1\u30cb\u30e5\u30fc\u3092\u8868\u793a\u3057\u306a\u3044\r\n    e.preventDefault();\r\n    \/\/ \u884c\u3046\u51e6\u7406\r\n    \r\n  });\n`
  //   );
  // } else {
  //   alert("????????????????????????????????????");
  // }
  // };

  setTimeOutButton.onclick = () => {
    if (setTimeOutInput.value != "") {
      insertInJsAtCursor(
        `setTimeout(() => {\r\n\t\t\t\/\/ (\u4e0b\u306e\u6570\u5b57\u00f71000)\u79d2\u5f85\u3063\u3066\u304b\u3089\u4ee5\u4e0b\u306b\u66f8\u3044\u305f\u64cd\u4f5c\u3092\u5b9f\u884c\u3059\u308b\r\n\t    }, ${
          setTimeOutInput.value * 1000
        });\r\n\t\t`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  colorChangeButton.onclick = () => {
    if (colorChangeInput.value != "") {
      insertInJsAtCursor(
        `${colorChangeInput.value}.style.backgroundColor = "${colorChangeSelect.value}"; // ???${colorChangeInput.value}??????????????????????????????\r\n\t`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  textContentButton.onclick = () => {
    if (textContentInput.value != "") {
      insertInJsAtCursor(
        `${textContentInput.value}.textContent = "??????????????????????????????"; // ???${textContentInput.value}???????????????????????????\r\n\t`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  hideButton.onclick = () => {
    if (hideInput.value != "") {
      insertInJsAtCursor(
        `${hideInput.value}.style.display = "none"; // ???${hideInput.value}????????????\r\n\t`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  showButton.onclick = () => {
    if (showInput.value != "") {
      insertInJsAtCursor(
        `${showInput.value}.style.display = "block"; // ???${showInput.value}??????????????????\r\n\t`
      );
    } else {
      alert("????????????????????????????????????");
    }
  };

  // ??????????????????
  omikujiButton.onclick = () => {
    insertInHtmlAtBodyBottom([sampleCode.omikujiDiv].join("\n"));
    insertInCssAtBottom([sampleCode.omikujiCss].join("\n"));
    insertInJsAtBottom([sampleCode.omikujiJs].join("\n"));
  };

  bmiButton.onclick = () => {
    insertInHtmlAtBodyBottom([sampleCode.bmiDiv].join("\n"));
    insertInCssAtBottom([sampleCode.bmiCss].join("\n"));
    insertInJsAtBottom([sampleCode.bmiJs].join("\n"));
  };

  todoButton.onclick = () => {
    insertInHtmlAtBodyBottom([sampleCode.todoDiv].join("\n"));
    insertInCssAtBottom([sampleCode.todoCss].join("\n"));
    insertInJsAtBottom([sampleCode.todoJs].join("\n"));
  };

  // localStorage?????????
  saveButton.onclick = () => {
    localStorage.setItem("html", htmlEditor.getValue());
    localStorage.setItem("css", cssEditor.getValue());
    localStorage.setItem("js", jsEditor.getValue());
  };

  removeButton.onclick = () => {
    const result = window.confirm("???????????????????????????????????????");
    if (result) {
      localStorage.removeItem("html");
      localStorage.removeItem("css");
      localStorage.removeItem("js");
    }
  };

  window.onload = () => {
    helpButton.click();
  };

  window.onbeforeunload = (e) => {
    e.returnValue = "";
  };

  shortcut.add("Ctrl+S", function () {
    localStorage.setItem("html", htmlEditor.getValue());
    localStorage.setItem("css", cssEditor.getValue());
    localStorage.setItem("js", jsEditor.getValue());
  });

  shortcut.add("Meta+S", function () {
    // cmd + S(Mac)
    localStorage.setItem("html", htmlEditor.getValue());
    localStorage.setItem("css", cssEditor.getValue());
    localStorage.setItem("js", jsEditor.getValue());
  });

  //?????????????????????????????????????????????
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

  // ?????????
  // htmlSpace.classList.remove("hidden");
  // cssSpace.classList.add("hidden");
  // jsSpace.classList.add("hidden");
  // htmlTab.classList.add("active-light");

  changeTheme();
  themeToggle.addEventListener("change", changeTheme);

  // console.log(htmlEditor.getModel().getLineCount());
  // display none ?????????????????????

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
