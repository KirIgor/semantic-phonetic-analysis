import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { change, arrayRemoveAll, arrayPush } from "redux-form";

import convert from "xml-js";

import { setData } from "../../actions/editor";

const informantToForm = informant => ({
  lastName: (informant.lastName && informant.lastName._text) || "",
  firstName: (informant.firstName && informant.firstName._text) || "",
  middleName: (informant.middleName && informant.middleName._text) || "",
  gender: (informant.gender && informant.gender._text) || "",
  birthLocation:
    (informant.birthLocation && informant.birthLocation._text) || "",
  parentBirthLocation:
    (informant.parentBirthLocation && informant.parentBirthLocation._text) ||
    "",
  selfIdentification:
    (informant.selfIdentification && informant.selfIdentification._text) || "",
  education: (informant.education && informant.education._text) || "",
  job: (informant.job && informant.job._text) || "",
  dialect: (informant.dialect && informant.dialect._text) || "",
  comment: (informant.comment && informant.comment._text) || ""
});

const Load = React.memo(({ setData, change, arrayRemoveAll, arrayPush }) => {
  const onChange = React.useCallback(e => {
    const reader = new FileReader();
    reader.onload = () => {
      const json = JSON.parse(
        convert.xml2json(reader.result, {
          compact: true
        })
      );

      change(
        "textPassport",
        "recordLocation",
        json.doc.metadata.recordLocation._text || ""
      );
      change(
        "textPassport",
        "recordDate",
        json.doc.metadata.recordDate._text || ""
      );
      change("textPassport", "source", json.doc.metadata.source._text || "");
      change("textPassport", "source", json.doc.metadata.comment._text || "");

      if (json.doc.metadata.informants) {
        const informants = json.doc.metadata.informants;
        arrayRemoveAll("informantsPassports", "informants");

        if (Array.isArray(informants)) {
          informants.forEach(informant => {
            arrayPush(
              "informantsPassports",
              "informants",
              informantToForm(informant)
            );
          });
        } else {
          arrayPush(
            "informantsPassports",
            "informants",
            informantToForm(informants)
          );
        }
      }

      setData(
        convert.json2xml(
          { record: json.doc.record },
          { compact: true, spaces: 0 }
        )
      );
    };
    reader.readAsText(e.target.files[0]);
  }, []);

  return <input type="file" name="file" onChange={onChange} />;
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData, change, arrayRemoveAll, arrayPush }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Load);
