import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Themes from "./themes/themes";

import CKEditor from "@ckeditor/ckeditor5-react";
// import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

import XmlClassicEditor from "./xml-classic-editor";

import { setData } from "../../actions/editor";

import { makeStyles } from "@material-ui/core/styles";

import "@ckeditor/ckeditor5-build-classic/build/translations/ru.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const Editor = React.memo(({ data, config, setData }) => {
  const classes = useStyles();

  const editor = React.useRef(null);
  const openModal = React.useCallback(() => setOpened(true), []);

  const onChange = React.useCallback((e, editor) => {
    setData(editor.getData());
  }, []);

  const onInit = React.useCallback(
    (editor) => {
      window.editor = editor;
      // CKEditorInspector.attach(editor);
    },
    [setData]
  );

  return (
    <div className={classes.root}>
      <CKEditor
        ref={editor}
        editor={XmlClassicEditor}
        data={data}
        config={Object.assign(config, {
          highlight: Object.assign(config.highlight, { openModal }),
        })}
        onChange={onChange}
        onInit={onInit}
      />
      <Themes />
    </div>
  );
});

const mapStateToProps = ({ editor: { data, config } }) => ({ data, config });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
