import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import CKEditor from "@ckeditor/ckeditor5-react";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

import XmlClassicEditor from "./xml-classic-editor";

import { setData } from "../../actions/editor";

import "@ckeditor/ckeditor5-build-classic/build/translations/ru.js";

const Editor = React.memo(({ data, config, setData }) => {
  const onInit = React.useCallback(editor => {
    CKEditorInspector.attach(editor);
  }, []);

  const onChange = React.useCallback((e, editor) => {
    setData(editor.getData());
  }, []);

  return (
    <CKEditor
      editor={XmlClassicEditor}
      data={data}
      config={config}
      onInit={onInit}
      onChange={onChange}
    />
  );
});

const mapStateToProps = ({ editor: { data, config } }) => ({ data, config });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
