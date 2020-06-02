import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { change, arrayRemoveAll, arrayPush } from "redux-form";

import convert from "xml-js";

import { List } from "immutable";

import {
  setData,
  clearThemes,
  addThemes,
  addTheme,
} from "../../actions/editor";

const findAllThemes = (text, attribute) => {
  return List(
    Array.from(text.matchAll(new RegExp(`${attribute} *= *"([^"]*)"`, "gi")))
  )
    .map((match) => match[1])
    .toSet()
    .toArray();
};

///////////////JSON//////////////////

const readJson = (
  readerResult,
  change,
  arrayRemoveAll,
  arrayPush,
  setData,
  clearThemes,
  addThemes
) => {
  const json = JSON.parse(readerResult);

  change("textPassport", "recordLocation", json.metadata.recordLocation || "");
  change(
    "textPassport",
    "recordDate",
    json.metadata.recordDate ? new Date(json.metadata.recordDate) : ""
  );
  change("textPassport", "source", json.metadata.source || "");
  change("textPassport", "comment", json.metadata.comment || "");

  arrayRemoveAll("informantsPassports", "informants");

  if (json.metadata.informants.length > 0) {
    const informants = json.metadata.informants;

    informants.forEach((informant) => {
      arrayPush("informantsPassports", "informants", informant);
    });
  }

  clearThemes();
  addThemes(findAllThemes(json.record, "tooltip"));
  setData(json.record);
};

///////////////XML//////////////////

const findXmlElement = (root, elementName) =>
  root.elements.find((e) => e.type == "element" && e.name == elementName);

const findXmlElementText = (root, elementName) => {
  const element = findXmlElement(root, elementName);

  return (
    (element.elements && element.elements[0] && element.elements[0].text) || ""
  );
};

const readXmlLocation = (locationRoot) => ({
  district: findXmlElementText(locationRoot, "district"),
  locality: findXmlElementText(locationRoot, "locality"),
  region: findXmlElementText(locationRoot, "region"),
  state: findXmlElementText(locationRoot, "state"),
});

const readXmlDate = (root) => {
  const dateText = root && root.elements && root.elements[0].text;
  return dateText ? new Date(dateText.split(".").reverse().join(".")) : "";
};

const readXml = (
  readerResult,
  change,
  arrayRemoveAll,
  arrayPush,
  setData,
  clearThemes,
  addThemes
) => {
  const json = JSON.parse(
    convert.xml2json(readerResult, {
      compact: false,
    })
  );

  const doc = findXmlElement(json, "doc");
  const text = findXmlElement(doc, "text");
  const location = findXmlElement(text, "location");

  const locationObj = readXmlLocation(location);

  change("textPassport", "recordLocation", locationObj);
  change(
    "textPassport",
    "recordDate",
    readXmlDate(findXmlElement(text, "year"))
  );
  change("textPassport", "source", findXmlElementText(text, "source"));
  change("textPassport", "comment", findXmlElementText(text, "remark"));

  const informants = doc.elements
    .filter((e) => e.type == "element" && e.name == "informant")
    .sort(
      (e1, e2) =>
        parseInt(findXmlElementText(e1, "id")) >
        parseInt(findXmlElementText(e2, "id"))
    );

  arrayRemoveAll("informantsPassports", "informants");

  if (informants.length > 0) {
    informants.forEach((informant) => {
      arrayPush(
        "informantsPassports",
        "informants",
        informantToForm(informant)
      );
    });
  }

  let cdata = findXmlElement(text, "record").elements[0].cdata;

  /////////PREPROCESSING/////////

  if (
    !cdata.match(
      /^.*(?:<question>.*<\/question>[^<]*<answer>.*<\/answer>)*.*$/gi
    )
  ) {
    cdata = cdata.replace(/<answer>/gi, "");
    cdata = cdata.replace(/<\/answer>/gi, "");

    cdata = cdata
      .replace(/[\n\r\t]/gi, "")
      .replace(
        /<\/question>(.*?)<question>/gi,
        "</question><answer>$1</answer><question>"
      )
      .replace(
        /<\/question>(?!.*<question>)(.*)/gi,
        "</question><answer>$1</answer>"
      );
  }

  /////////PROCESSING/////////

  cdata = cdata.replace(/<b>/gi, "<strong>");
  cdata = cdata.replace(/<\/b>/gi, "</strong>");

  cdata = cdata.replace(
    /<theme[^>]*class *= *"([^"]*)">/gi,
    '<span class="highlight" tooltip="$1">'
  );
  cdata = cdata.replace(/<\/theme>/gi, "</span>");

  cdata = cdata.replace(
    /<question>/gi,
    '<section class="interview-item"><div class="interview-item-question">'
  );
  cdata = cdata.replace(/<\/question>/gi, "</div>");
  cdata = cdata.replace(/<answer>/gi, '<div class="interview-item-answer"><p>');
  cdata = cdata.replace(/<\/answer>/gi, "</p></div></section>");

  clearThemes();
  addThemes(findAllThemes(cdata, "tooltip"));
  setData(cdata);
};

const informantToForm = (informant) => {
  const birthLocationObj = readXmlLocation(
    findXmlElement(informant, "birth_location")
  );

  const birthParentLocationObj = readXmlLocation(
    findXmlElement(informant, "birth_parent_location")
  );

  return {
    lastName: findXmlElementText(informant, "sname"),
    firstName: findXmlElementText(informant, "fname"),
    middleName: findXmlElementText(informant, "lname"),
    gender:
      findXmlElementText(informant, "gender") == "Женский" ? "female" : "male",
    birthLocation: birthLocationObj,
    parentBirthLocation: birthParentLocationObj,
    selfIdentification: findXmlElementText(informant, "who_i_am"),
    education: findXmlElementText(informant, "education"),
    job: findXmlElementText(informant, "occupation"),
    dialect: findXmlElementText(informant, "dialect"),
    comment: findXmlElementText(informant, "remark"),
    birthDay: readXmlDate(findXmlElement(informant, "birth_year")),
  };
};

///////////////////React/////////////////////

const Load = React.memo(
  ({
    setData,
    change,
    arrayRemoveAll,
    arrayPush,
    clearThemes,
    addThemes,
    isJson,
  }) => {
    const onChange = React.useCallback(
      (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (isJson) {
            readJson(
              reader.result,
              change,
              arrayRemoveAll,
              arrayPush,
              setData,
              clearThemes,
              addThemes
            );
          } else {
            readXml(
              reader.result,
              change,
              arrayRemoveAll,
              arrayPush,
              setData,
              clearThemes,
              addThemes
            );
          }
        };
        reader.readAsText(e.target.files[0]);
      },
      [setData, change, arrayRemoveAll, arrayPush, isJson]
    );

    return <input type="file" name="file" onChange={onChange} />;
  }
);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { setData, change, arrayRemoveAll, arrayPush, clearThemes, addThemes },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Load);
