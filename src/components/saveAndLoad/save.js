import React from "react";
import { connect } from "react-redux";

import { saveAs } from "file-saver";
import convert from "xml-js";

import Button from "material-ui/RaisedButton";

const stateToXml = state => {
  const record = JSON.parse(
    convert.xml2json(state.editor.data, {
      compact: true,
      spaces: 0
    })
  );

  const { recordLocation, recordDate, source, comment } = state.form
    .textPassport.values || {
    recordLocation: undefined,
    recordDate: undefined,
    source: undefined,
    comment: undefined
  };

  const result = {
    _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
    doc: {
      metadata: {
        recordLocation,
        recordDate,
        source,
        comment,
        informants: (
          state.form.informantsPassports.values || { informants: [] }
        ).informants
      },
      record: record.record
    }
  };

  return convert.json2xml(result, { compact: true, spaces: 0 });
};

const Save = React.memo(state => {
  const onClick = React.useCallback(() => {
    const blob = new Blob([stateToXml(state)], {
      type: "text/xml;charset=utf-8"
    });
    saveAs(blob, "data.xml");
  }, [state]);

  return <Button label="Сохранить" onClick={onClick} />;
});

const mapStateToProps = ({ form, editor }) => ({
  form,
  editor
});

export default connect(mapStateToProps)(Save);
