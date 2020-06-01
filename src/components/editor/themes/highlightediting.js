import React from "react";
import ReactDOM from "react-dom";
import HighlightComponent from "./highlight-component";

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import ClickObserver from "@ckeditor/ckeditor5-engine/src/view/observer/clickobserver";

import HighlightCommand from "./highlightcommand";

export default class HighlightEditing extends Plugin {
  static get pluginName() {
    return "HighlightEditing";
  }

  constructor(editor) {
    super(editor);
  }

  init() {
    const editor = this.editor;

    const options = editor.config.get("highlight.options");

    editor.editing.view.addObserver(ClickObserver);
    const viewDocument = editor.editing.view.document;

    this.listenTo(viewDocument, "click", (e, data) => {
      if (!data.domEvent.ctrlKey) {
        return;
      }

      data.domEvent.stopPropagation();

      const highlightPopup = document.getElementById("highlight-popup");

      ReactDOM.render(<HighlightComponent eventData={data} />, highlightPopup);
    });

    // Allow highlight attribute on text nodes.
    editor.model.schema.extend("$text", {
      allowAttributes: options.map((o) => o.model),
    });

    options.forEach((o) => {
      editor.conversion.attributeToElement({
        model: o.model,
        view: {
          name: "span",
          attributes: {
            tooltip: o.model,
          },
          classes: ["highlight"],
        },
      });
    });

    editor.commands.add("highlight", new HighlightCommand(editor));
  }
}
