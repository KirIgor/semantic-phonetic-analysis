import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

import InterviewItem from "./interview-item/interview-item";
import Highlight from "./themes/highlight";
import Accent from "./accent/accent";
import SpecialChars from "./special-chars/special-chars";

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [
    Essentials,
    Superscript,
    Paragraph,
    InterviewItem,
    Highlight,
    Accent,
    SpecialChars
  ],
  toolbar: [
    "superscript",
    "accent",
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
  }
})
  .then(editor => {
    console.log("Editor was initialized", editor);

    window.editor = editor;

    CKEditorInspector.attach(editor);
  })
  .catch(err => {
    console.error(err.stack);
  });
