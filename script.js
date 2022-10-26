import sampleCode from "./sample-code.js";

require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });

const iframeElem = document.getElementById("iframe-elem");
const themeToggle = document.getElementById("theme-toggle");

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
});
