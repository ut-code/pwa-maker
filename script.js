require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });

const iframeElem = document.getElementById("iframe-elem");

require(["vs/editor/editor.main"], function () {
  var htmlEditor = monaco.editor.create(
    document.getElementById("html-editor"),
    {
      value: [
        '<!DOCTYPE html>\n<html lang="ja">\n\t<head>\n\t\t<meta charset="UTF-8" />\n\t\t<title>Document</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello HTML!</h1>\n\t\t<p>自由に書き換えてみましょう。</p>\n\t</body>\n</html>',
      ].join("\n"),
      language: "html",
    }
  );
  // var cssEditor = monaco.editor.create(document.getElementById("css-editor"), {
  //   value: ["p {\n\tfont-weight: bold;\n}"].join("\n"),
  //   language: "css",
  // });
  // var jsEditor = monaco.editor.create(document.getElementById("js-editor"), {
  //   value: ['function x() {\n\tconsole.log("Hello world!");\n}'].join("\n"),
  //   language: "javascript",
  // });

  const htmlReflect = () => {
    const htmlText = htmlEditor.getValue();
    const htmlStartPoint = htmlText.indexOf("<body>");
    const htmlEndPoint = htmlText.indexOf("</body>");
    const htmlContent = htmlText.slice(htmlStartPoint + 6, htmlEndPoint);
    const iframeBody = iframeElem.contentDocument.getElementById("iframe-body");
    iframeBody.innerHTML = htmlContent;
  };

  htmlReflect();

  htmlEditor.onDidChangeModelContent(function () {
    htmlReflect();
  });
});
