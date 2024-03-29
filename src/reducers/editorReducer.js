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
  ADD_THEME,
  ADD_THEMES,
  DELETE_THEMES,
  CHANGE_THEME_MODEL,
  SET_THEMES_COLORS,
  CLEAR_THEMES,
} from "../actions/editor";

const initState = {
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
      "highlight",
      "undo",
      "redo",
    ],
    highlight: {
      options: [
        {
          model: "быт",
        },
        {
          model: "быт--колодец",
        },
        {
          model: "быт--утварь",
        },
        {
          model: "быт--производство муки",
        },
        {
          model: "дом",
        },
        {
          model: "дом--мебель",
        },
        {
          model: "дом--печь",
        },
        {
          model: "дом--строительство",
        },
        {
          model: "дом--устройство",
        },
        {
          model: "досуг",
        },
        {
          model: "досуг--игры",
        },
        {
          model: "досуг--праздники",
        },
        {
          model: "досуг--свадьба",
        },
        {
          model: "местная топонимика",
        },
        {
          model: "обувь",
        },
        {
          model: "одежда",
        },
        {
          model: "общество",
        },
        {
          model: "общество--алкоголизм",
        },
        {
          model: "общество--названия жителей",
        },
        {
          model: "прошлое",
        },
        {
          model: "война",
        },
        {
          model: "пища",
        },
        {
          model: "пища--хлебопечение",
        },
        {
          model: "напитки",
        },
        {
          model: "работа",
        },
        {
          model: "работа--орудия",
        },
        {
          model: "работа--полевые работы",
        },
        {
          model: "работа--полевые работы--молотьба",
        },
        {
          model: "работа--род занятий",
        },
        {
          model: "растения",
        },
        {
          model: "растения--дикорастущие--деревья и кустарники",
        },
        {
          model: "растения--дикорастущие--травянистые",
        },
        {
          model: "растения--культурные--зерновые",
        },
        {
          model: "растения--культурные--огородные",
        },
        {
          model: "ремесло",
        },
        {
          model: "ремесло--прядение",
        },
        {
          model: "ремесло--ткачество",
        },
        {
          model: "ремесло--пимокатное дело",
        },
        {
          model: "рыболовство",
        },
        {
          model: "рыбы",
        },
        {
          model: "семья--кровное родство",
        },
        {
          model: "хозяйство",
        },
        {
          model: "хозяйство--животноводство",
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
    case ADD_THEMES: {
      let { models } = action.payload;

      models = models.filter(
        (model) =>
          !state.config["highlight"]["options"].find((o) => o.model == model)
      );

      try {
        window.editor.model.schema.extend("$text", {
          allowAttributes: models,
        });

        models.forEach((model) => {
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
        });
      } catch (ignored) {}

      return fromJS(state)
        .updateIn(["config", "highlight", "options"], (prev) =>
          prev.concat(
            models.map((model) => ({
              model,
            }))
          )
        )
        .toJS();
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
    case CLEAR_THEMES: {
      return fromJS(state).setIn(["config", "highlight", "options"], []).toJS();
    }
    default:
      return initState;
  }
};

export default editorReducer;
