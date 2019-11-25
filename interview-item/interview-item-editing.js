import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

import InsertInterviewItemCommand from "./insert-interview-item-command";

export default class InterviewItemEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      "insertInterviewItem",
      new InsertInterviewItemCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("interviewItem", {
      isObject: true,
      allowWhere: "$block"
    });

    schema.register("interviewItemQuestion", {
      isLimit: true,
      allowIn: "interviewItem",
      allowContentOf: "$block"
    });

    schema.register("interviewItemAnswer", {
      isLimit: true,
      allowIn: "interviewItem",
      allowContentOf: "$root"
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith("interviewItemAnswer") &&
        childDefinition.name == "interviewItem"
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      model: "interviewItem",
      view: {
        name: "section",
        classes: "interview-item"
      }
    });
    conversion.for("dataDowncast").elementToElement({
      model: "interviewItem",
      view: {
        name: "section",
        classes: "interview-item"
      }
    });
    conversion.for("editingDowncast").elementToElement({
      model: "interviewItem",
      view: (modelElement, viewWriter) => {
        const section = viewWriter.createContainerElement("section", {
          class: "interview-item"
        });

        return toWidget(section, viewWriter, {
          label: "interview item widget"
        });
      }
    });

    conversion.for("upcast").elementToElement({
      model: "interviewItemQuestion",
      view: {
        name: "div",
        classes: "interview-item-question"
      }
    });
    conversion.for("dataDowncast").elementToElement({
      model: "interviewItemQuestion",
      view: {
        name: "div",
        classes: "interview-item-question"
      }
    });
    conversion.for("editingDowncast").elementToElement({
      model: "interviewItemQuestion",
      view: (modelElement, viewWriter) => {
        const div = viewWriter.createEditableElement("div", {
          class: "interview-item-question"
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

    conversion.for("upcast").elementToElement({
      model: "interviewItemAnswer",
      view: {
        name: "div",
        classes: "interview-item-answer"
      }
    });
    conversion.for("dataDowncast").elementToElement({
      model: "interviewItemAnswer",
      view: {
        name: "div",
        classes: "interview-item-answer"
      }
    });
    conversion.for("editingDowncast").elementToElement({
      model: "interviewItemAnswer",
      view: (modelElement, viewWriter) => {
        const div = viewWriter.createEditableElement("div", {
          class: "interview-item-answer"
        });

        return toWidgetEditable(div, viewWriter);
      }
    });
  }
}
