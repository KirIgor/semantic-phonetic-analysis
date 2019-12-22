import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import convert from "xml-js";

import { setData } from "../../actions/editor";

const Load = React.memo(({ setData }) => {
  const onChange = React.useCallback(e => {
    const reader = new FileReader();
    reader.onload = () => {
      const json = JSON.parse(
        convert.xml2json(reader.result, {
          compact: true
        })
      );

      console.log(json);

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
  bindActionCreators({ setData }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Load);
