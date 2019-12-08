import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

import InterviewItem from "./interview-item/interview-item";
import Highlight from "./themes/highlight";
import SpecialChars from "./special-chars/special-chars";
import BoldAccentUI from "./accent/boldaccentui";
import MySuperscriptUI from "./superscript/superscriptui";

import XmlClassicEditor from "./xml-classic-editor";

import "@ckeditor/ckeditor5-build-classic/build/translations/ru.js";

XmlClassicEditor.create(document.querySelector("#editor"), {
  plugins: [
    Essentials,
    Superscript,
    MySuperscriptUI,
    Paragraph,
    InterviewItem,
    Highlight,
    SpecialChars,
    Bold,
    BoldAccentUI
  ],
  toolbar: [
    "my_superscript",
    "accent_bold",
    "interviewItem",
    "highlight",
    "specialChar1",
    "specialChar2",
    "specialChar3",
    "specialChar4",
    "specialChar5",
    "specialChar6",
    "specialChar7",
    "undo",
    "redo"
  ],
  highlight: {
    options: [
      {
        model: "быт",
        color: "#abcdeff0",
        type: "marker"
      },
      { model: "родня", color: "#fedcbaf0", type: "marker" },
      { model: "дом", color: "#cdabeff0", type: "marker" }
    ]
  },
  language: "ru"
})
  .then(editor => {
    console.log("Editor was initialized", editor);

    window.editor = editor;

    CKEditorInspector.attach(editor);
  })
  .catch(err => {
    console.error(err.stack);
  });

function getEditorData() {
  console.log(window.editor.getData());
}

function setEditorData() {
  window.editor.setData(document.getElementById("textArea").value);
}

document.getElementById("getDataBtn").onclick = getEditorData;
document.getElementById("setDataBtn").onclick = setEditorData;
