import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";

import InterviewItem from "../components/editor/interview-item/interview-item";
import Highlight from "../components/editor/themes/highlight";
import SpecialChars from "../components/editor/special-chars/special-chars";
import BoldAccentUI from "../components/editor/accent/boldaccentui";
import MySuperscriptUI from "../components/editor/superscript/superscriptui";

import { fromJS } from "immutable";

import {
  SET_DATA,
  ADD_THEME,
  DELETE_THEME,
  CHANGE_THEME_MODEL,
  CHANGE_THEME_COLOR
} from "../actions/editor";

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
          color: { r: 171, g: 205, b: 239, a: 0.94 },
          type: "marker"
        },
        {
          model: "родня",
          color: { r: 254, g: 220, b: 186, a: 0.94 },
          type: "marker"
        },
        {
          model: "дом",
          color: { r: 205, g: 171, b: 239, a: 0.94 },
          type: "marker"
        }
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
    case ADD_THEME: {
      const { model, color } = action.payload;

      if (state.config["highlight"]["options"].find(o => o.model == model))
        throw Error("Такая тема уже существует.");

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], prev =>
          prev.concat({ model, color })
        )
        .toJS();
    }
    case DELETE_THEME: {
      const { model } = action.payload;

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], prev =>
          prev.delete(prev.findIndex(e => e.get("model") == model))
        )
        .toJS();
    }
    case CHANGE_THEME_MODEL: {
      const { oldModel, newModel } = action.payload;

      if (state.config["highlight"]["options"].find(o => o.model == newModel))
        throw Error("Такая тема уже существует.");

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], prev =>
          prev.setIn(
            [prev.findIndex(e => e.get("model") == oldModel), "model"],
            newModel
          )
        )
        .toJS();
    }
    case CHANGE_THEME_COLOR: {
      const { model, newColor } = action.payload;

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], prev =>
          prev.setIn(
            [prev.findIndex(e => e.get("model") == model), "color"],
            newColor
          )
        )
        .toJS();
    }
    default:
      return initState;
  }
};

export default editorReducer;
