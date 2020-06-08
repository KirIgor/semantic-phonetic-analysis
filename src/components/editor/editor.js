import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Themes from "./themes/themes";

import CKEditor from "@ckeditor/ckeditor5-react";
// import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

import XmlClassicEditor from "./xml-classic-editor";

import { makeStyles } from "@material-ui/core/styles";

import "@ckeditor/ckeditor5-build-classic/build/translations/ru.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const Editor = React.memo(({ config }) => {
  const classes = useStyles();

  const editor = React.useRef(null);
  const openModal = React.useCallback(() => setOpened(true), []);

  const onInit = React.useCallback((editor) => {
    window.editor = editor;
    // CKEditorInspector.attach(editor);
  }, []);

  return (
    <div className={classes.root}>
      <CKEditor
        ref={editor}
        editor={XmlClassicEditor}
        config={Object.assign(config, {
          highlight: Object.assign(config.highlight, { openModal }),
        })}
        onInit={onInit}
      />
      <Themes />
    </div>
  );
});

const mapStateToProps = ({ editor: { config } }) => ({
  config,
});

export default connect(mapStateToProps)(Editor);
