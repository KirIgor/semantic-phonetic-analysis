import React from "react";
import { connect } from "react-redux";

import { saveAs } from "file-saver";
import convert from "xml-js";

import Button from "material-ui/RaisedButton";

const stateToJson = (state) => {
  const { recordLocation, recordDate, source, comment } = state.form
    .textPassport.values || {
    recordLocation: undefined,
    recordDate: undefined,
    source: undefined,
    comment: undefined,
  };

  return JSON.stringify({
    metadata: {
      recordLocation,
      recordDate,
      source,
      comment,
      informants: (state.form.informantsPassports.values || { informants: [] })
        .informants,
    },
    record: state.editor.data,
  });
};

const stateToXml = (state) => {
  const { recordLocation, recordDate, source, comment } = state.form
    .textPassport.values || {
    recordLocation: undefined,
    recordDate: undefined,
    source: undefined,
    comment: undefined,
  };

  let cdata = state.editor.data;

  cdata = cdata.replace(/<strong>/gi, "<b>");
  cdata = cdata.replace(/<\/strong>/gi, "</b>");

  cdata = cdata.replace(/<p>/gi, "");
  cdata = cdata.replace(/<\/p>/gi, "");

  cdata = cdata.replace(/<sup>/gi, "");
  cdata = cdata.replace(/<\/sup>/gi, "");

  cdata = cdata.replace(
    /<span[^>]*tooltip *= *"([^"]*)">/gi,
    '<theme class="$1">'
  );
  cdata = cdata.replace(/<\/span>/gi, "</theme>");

  cdata = cdata.replace(/<section[^>]*>/gi, "");
  cdata = cdata.replace(/<\/section>/gi, "");
  cdata = cdata.replace(
    /<div[^>]*class *= *"interview-item-question"[^>]*>(.*?)<\/div>/gi,
    "<question>$1</question>"
  );
  cdata = cdata.replace(
    /<div[^>]*class *= *"interview-item-answer"[^>]*>(.*?)<\/div>/gi,
    "<answer>$1</answer>"
  );

  const result = {
    declaration: { attributes: { version: "1.0", encoding: "utf-8" } },
    elements: [
      {
        type: "element",
        name: "doc",
        elements: [
          {
            type: "element",
            name: "version",
            elements: [{ type: "text", text: "1.1" }],
          },
          ...(
            state.form.informantsPassports.values || { informants: [] }
          ).informants.map((informant, index) => ({
            type: "element",
            name: "informant",
            elements: [
              {
                type: "element",
                name: "id",
                elements: [{ type: "text", text: index.toString() }],
              },
              {
                type: "element",
                name: "birth_location",
                elements: [
                  {
                    type: "element",
                    name: "district",
                    elements: [
                      {
                        type: "text",
                        text: informant.birthLocation.district || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "locality",
                    elements: [
                      {
                        type: "text",
                        text: informant.birthLocation.locality || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "region",
                    elements: [
                      {
                        type: "text",
                        text: informant.birthLocation.region || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "state",
                    elements: [
                      {
                        type: "text",
                        text: informant.birthLocation.state || "",
                      },
                    ],
                  },
                ],
              },
              {
                type: "element",
                name: "birth_parent_location",
                elements: [
                  {
                    type: "element",
                    name: "district",
                    elements: [
                      {
                        type: "text",
                        text: informant.parentBirthLocation.district || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "locality",
                    elements: [
                      {
                        type: "text",
                        text: informant.parentBirthLocation.locality || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "region",
                    elements: [
                      {
                        type: "text",
                        text: informant.parentBirthLocation.region || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "state",
                    elements: [
                      {
                        type: "text",
                        text: informant.parentBirthLocation.state || "",
                      },
                    ],
                  },
                ],
              },
              {
                type: "element",
                name: "birth_year",
                elements: [
                  {
                    type: "text",
                    text: informant.birthDay
                      ? `${new Date(informant.birthDay)
                          .getDate()
                          .toString()
                          .padStart(2, "0")}.${(
                          new Date(informant.birthDay).getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0")}.${new Date(
                          informant.birthDay
                        ).getFullYear()}`
                      : "",
                  },
                ],
              },
              {
                type: "element",
                name: "dialect",
                elements: [
                  {
                    type: "text",
                    text: informant.dialect || "",
                  },
                ],
              },
              {
                type: "element",
                name: "education",
                elements: [
                  {
                    type: "text",
                    text: informant.education || "",
                  },
                ],
              },
              {
                type: "element",
                name: "fname",
                elements: [
                  {
                    type: "text",
                    text: informant.firstName || "",
                  },
                ],
              },
              {
                type: "element",
                name: "gender",
                elements: [
                  {
                    type: "text",
                    text: informant.gender
                      ? informant.gender == "female"
                        ? "Женский"
                        : "Мужской"
                      : "",
                  },
                ],
              },
              {
                type: "element",
                name: "lname",
                elements: [
                  {
                    type: "text",
                    text: informant.middleName || "",
                  },
                ],
              },
              {
                type: "element",
                name: "occupation",
                elements: [
                  {
                    type: "text",
                    text: informant.job || "",
                  },
                ],
              },
              {
                type: "element",
                name: "remark",
                elements: [
                  {
                    type: "text",
                    text: informant.comment || "",
                  },
                ],
              },
              {
                type: "element",
                name: "sname",
                elements: [
                  {
                    type: "text",
                    text: informant.lastName || "",
                  },
                ],
              },
              {
                type: "element",
                name: "who_i_am",
                elements: [
                  {
                    type: "text",
                    text: informant.selfIdentification || "",
                  },
                ],
              },
            ],
          })),
          {
            type: "element",
            name: "text",
            elements: [
              {
                type: "element",
                name: "location",
                elements: [
                  {
                    type: "element",
                    name: "district",
                    elements: [
                      {
                        type: "text",
                        text: (recordLocation && recordLocation.district) || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "locality",
                    elements: [
                      {
                        type: "text",
                        text: (recordLocation && recordLocation.locality) || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "region",
                    elements: [
                      {
                        type: "text",
                        text: (recordLocation && recordLocation.region) || "",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "state",
                    elements: [
                      {
                        type: "text",
                        text: (recordLocation && recordLocation.state) || "",
                      },
                    ],
                  },
                ],
              },
              {
                type: "element",
                name: "remark",
                elements: [{ type: "text", text: comment || "" }],
              },
              {
                type: "element",
                name: "source",
                elements: [{ type: "text", text: source || "" }],
              },
              {
                type: "element",
                name: "year",
                elements: [
                  {
                    type: "text",
                    text: recordDate
                      ? `${new Date(recordDate)
                          .getDate()
                          .toString()
                          .padStart(2, "0")}.${(
                          new Date(recordDate).getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0")}.${new Date(
                          recordDate
                        ).getFullYear()}`
                      : "",
                  },
                ],
              },
              {
                type: "element",
                name: "record",
                elements: [{ type: "cdata", cdata }],
              },
            ],
          },
        ],
      },
    ],
  };

  return convert.json2xml(result, { compact: false, spaces: 0 });
};

const Save = React.memo(({ form, editor, isJson }) => {
  const onClick = React.useCallback(() => {
    const blob = new Blob(
      [isJson ? stateToJson({ form, editor }) : stateToXml({ form, editor })],
      {
        type: isJson ? "text/json;charset=utf-8" : "text/xml;charset=utf-8",
      }
    );
    saveAs(blob, isJson ? "data.json" : "data.xml");
  }, [form, editor, isJson]);

  return <Button label="Сохранить" onClick={onClick} />;
});

const mapStateToProps = ({ form, editor }) => ({
  form,
  editor,
});

export default connect(mapStateToProps)(Save);
