import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "material-ui/RaisedButton";

import { clearThemes, addThemes } from "../../actions/editor";

const ThemesLoad = React.memo(
  ({ clearThemes, addThemes, onLoadingFinished }) => {
    const onChange = React.useCallback(() => {
      const reader = new FileReader();
      reader.onload = () => {
        clearThemes();
        addThemes(JSON.parse(reader.result).sort());
        onLoadingFinished();
      };
      reader.readAsText(document.getElementById("load-file").files[0]);
    }, [clearThemes, addThemes, onLoadingFinished]);

    return (
      <div className="load-container">
        <input id="load-file" type="file" name="file" />
        <Button onClick={onChange}>Загрузить</Button>
      </div>
    );
  }
);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearThemes,
      addThemes,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(ThemesLoad);
