import sampleCode from "./sample-code.js";

require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });

const iframeElem = document.getElementById("iframe-elem");
const themeToggle = document.getElementById("theme-toggle");

const h1Button = document.getElementById("h1-button");
const h1Input = document.getElementById("h1-input");
const paraButton = document.getElementById("para-button");
const paraInput = document.getElementById("para-input");
const omikujiButton = document.getElementById("omikuji-button");

require(["vs/editor/editor.main"], () => {
  const changeTheme = () => {
    if (themeToggle.checked) {
      monaco.editor.setTheme("vs-dark");
    } else {
      monaco.editor.setTheme("vs");
    }
  };

  changeTheme();
  themeToggle.addEventListener("change", changeTheme);

  const htmlDefaultModel = monaco.editor.createModel(
    [sampleCode.htmlCode].join("\n"),
    "html"
  );
  const htmlEditor = monaco.editor.create(
    document.getElementById("html-editor")
  );

  htmlEditor.setModel(htmlDefaultModel);

  const htmlReflect = () => {
    const htmlText = htmlEditor.getValue();
    iframeElem.srcdoc = [htmlText].join("\n");
  };

  htmlReflect();

  htmlEditor.onDidChangeModelContent(() => {
    htmlReflect();
  });

  const insertText = (text) => {
    htmlEditor.executeEdits("", [
      {
        forceMoveMarkers: true,
        range: htmlEditor.getSelection(),
        text: text,
      },
    ]);
  };

  h1Button.onclick = () => {
    insertText(`<h1>${h1Input.value}</h1>`);
  };

  paraButton.onclick = () => {
    insertText(`<p>${paraInput.value}</p>`);
  };

  omikujiButton.onclick = () => {
    insertText([sampleCode.omikujiCode].join("\n"));
  };
});
