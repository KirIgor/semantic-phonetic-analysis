import DocumentFragment from "@ckeditor/ckeditor5-engine/src/view/documentfragment";
import ViewElement from "@ckeditor/ckeditor5-engine/src/view/element";
import ViewText from "@ckeditor/ckeditor5-engine/src/view/text";

import convert from "xml-js";

export default class XmlDataProcessor {
  constructor(config) {
    this.config = config;
  }

  toData(viewFragment) {
    const json = [];

    for (const child of viewFragment) {
      const childJson = viewToXml(child);

      json.push(childJson);
    }

    const jsonResult = {
      elements: [{ type: "element", name: "record", elements: json }]
    };

    const options = { compact: false, ignoreComment: true, spaces: 0 };
    const result = convert.json2xml(jsonResult, options);

    return result;
  }

  toView(xmlString) {
    const jsonData = JSON.parse(
      convert.xml2json(xmlString, {
        compact: false,
        ignoreComment: true,
        spaces: 0
      })
    );
    const viewFragment = new DocumentFragment();

    for (const childJson of jsonData.elements[0].elements) {
      const child = xmlToView(childJson, this.config);
      if (!child) continue;

      viewFragment._appendChild(child);
    }

    return viewFragment;
  }
}

function viewToXml(viewElement) {
  const json = {};

  if (viewElement.is("text")) {
    json.type = "text";
    json.text = viewElement.data;
  } else {
    json.type = "element";
    if (viewElement.name == "p") {
      json.name = "p";
    } else if (viewElement.name == "sup") {
      json.name = "sup";
    } else if (viewElement.name == "strong") {
      json.name = "b";
    } else if (
      viewElement.name == "section" &&
      viewElement.hasClass("interview-item")
    ) {
      json.name = "interviewItem";
    } else if (
      viewElement.name == "div" &&
      viewElement.hasClass("interview-item-question")
    ) {
      json.name = "question";
    } else if (
      viewElement.name == "div" &&
      viewElement.hasClass("interview-item-answer")
    ) {
      json.name = "answer";
    } else if (viewElement.name == "mark") {
      json.name = "theme";
      json.attributes = {};
      json.attributes.class = viewElement.getAttribute("tooltip");
    }

    json.elements = [];

    for (const child of viewElement.getChildren()) {
      json.elements.push(viewToXml(child));
    }
  }

  return json;
}

function xmlToView(xmlObject, config) {
  if (xmlObject.type == "text") {
    return new ViewText(xmlObject.text);
  } else if (xmlObject.type == "element") {
    const element = {};

    if (xmlObject.name == "p") {
      element.name = "p";
    } else if (xmlObject.name == "sup") {
      element.name = "sup";
    } else if (xmlObject.name == "b") {
      element.name = "strong";
    } else if (xmlObject.name.toUpperCase() == "interviewItem".toUpperCase()) {
      element.name = "section";
      element.attributes = {
        class: "interview-item"
      };
    } else if (xmlObject.name == "question") {
      element.name = "div";
      element.attributes = {
        class: "interview-item-question"
      };
    } else if (xmlObject.name == "answer") {
      element.name = "div";
      element.attributes = {
        class: "interview-item-answer"
      };
    } else if (xmlObject.name == "theme") {
      element.name = "mark";
      element.attributes = {
        tooltip: xmlObject.attributes.class,
        style:
          "background-color:" +
          config
            .get("highlight.options")
            .find(opt => opt.model == xmlObject.attributes.class).color
      };
    }

    const viewElement = new ViewElement(element.name, element.attributes);

    if (xmlObject.elements) {
      for (const childJson of xmlObject.elements) {
        const viewChild = xmlToView(childJson, config);

        viewElement._appendChild(viewChild);
      }
    }

    return viewElement;
  }
}
