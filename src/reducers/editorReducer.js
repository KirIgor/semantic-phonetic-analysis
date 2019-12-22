import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";

import InterviewItem from "../components/editor/interview-item/interview-item";
import Highlight from "../components/editor/themes/highlight";
import SpecialChars from "../components/editor/special-chars/special-chars";
import BoldAccentUI from "../components/editor/accent/boldaccentui";
import MySuperscriptUI from "../components/editor/superscript/superscriptui";

import { SET_DATA } from "../actions/editor";

const initState = {
  data: '<?xml version="1.0" encoding="utf-8"?><record><p></p></record>',
  config: {
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
  }
};

const editorReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return { config: state.config, data: action.payload };
    }
    default:
      return initState;
  }
};

export default editorReducer;
