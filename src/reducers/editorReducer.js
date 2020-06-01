import React from "react";
import ReactDOM from "react-dom";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";

import InterviewItem from "../components/editor/interview-item/interview-item";
import Highlight from "../components/editor/themes/highlight";
import SpecialChars from "../components/editor/special-chars/special-chars";
import BoldAccentUI from "../components/editor/accent/boldaccentui";
import MySuperscriptUI from "../components/editor/superscript/superscriptui";

import HighlightComponent from "../components/editor/themes/highlight-component";

import { fromJS } from "immutable";

import {
  SET_DATA,
  ADD_THEME,
  DELETE_THEMES,
  CHANGE_THEME_MODEL,
  SET_THEMES_COLORS,
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
      BoldAccentUI,
    ],
    toolbar: [
      "my_superscript",
      "accent_bold",
      "interviewItem",
      "specialChar1",
      "specialChar2",
      "specialChar3",
      "specialChar4",
      "specialChar5",
      "specialChar6",
      "specialChar7",
      "undo",
      "redo",
    ],
    highlight: {
      options: [
        {
          model: "быт",
        },
        {
          model: "родня",
        },
        {
          model: "дом",
        },
        {
          model: "хозяйство",
        },
        {
          model: "кровь",
        },
      ],
      renderHighlight: (id, domElement) => {
        ReactDOM.render(<HighlightComponent />, domElement);
      },
    },
    language: "ru",
  },
};

const editorReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return { config: state.config, data: action.payload };
    }
    case ADD_THEME: {
      const { model } = action.payload;

      if (state.config["highlight"]["options"].find((o) => o.model == model))
        throw Error("Такая тема уже существует.");

      window.editor.model.schema.extend("$text", {
        allowAttributes: [model],
      });

      window.editor.conversion.attributeToElement({
        model,
        view: {
          name: "span",
          attributes: {
            tooltip: model,
          },
          classes: ["highlight"],
        },
      });

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], (prev) =>
          prev.concat({ model })
        )
        .toJS();
    }
    case DELETE_THEMES: {
      const { themes } = action.payload;

      const models = themes.map((theme) => theme.model);

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], (prev) =>
          prev.filter((theme) => !models.includes(theme.get("model")))
        )
        .toJS();
    }
    case SET_THEMES_COLORS: {
      const { map } = action.payload;

      for (const model of Object.keys(map)) {
        if (!state.config["highlight"]["options"].find((o) => o.model == model))
          throw Error(`Темы ${model} не существует`);
      }

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], (prev) =>
          prev.withMutations((prev) => {
            for (const e of Object.entries(map)) {
              prev.setIn(
                [
                  prev.findIndex((theme) => theme.get("model") == e[0]),
                  "color",
                ],
                e[1]
              );
            }
          })
        )
        .toJS();
    }
    case CHANGE_THEME_MODEL: {
      const { oldModel, newModel } = action.payload;

      if (state.config["highlight"]["options"].find((o) => o.model == newModel))
        throw Error("Такая тема уже существует.");

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], (prev) =>
          prev.setIn(
            [prev.findIndex((e) => e.get("model") == oldModel), "model"],
            newModel
          )
        )
        .toJS();
    }
    default:
      return initState;
  }
};

export default editorReducer;
