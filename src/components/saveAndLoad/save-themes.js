import React from "react";
import { connect } from "react-redux";

import Button from "material-ui/RaisedButton";

import { saveAs } from "file-saver";
import beautify from "json-beautify";

const SaveThemes = React.memo(({ themes }) => {
  const onClick = React.useCallback(() => {
    const blob = new Blob([beautify(themes, null, 2, 100)], {
      type: "text/json;charset=utf-8",
    });
    saveAs(blob, "themes.json");
  }, [themes]);

  return (
    <Button label="Сохранить" onClick={onClick} style={{ width: "150px" }} />
  );
});

const mapStateToProps = ({
  editor: {
    config: {
      highlight: { options },
    },
  },
}) => ({
  themes: options.map((opt) => opt.model),
});

export default connect(mapStateToProps)(SaveThemes);
