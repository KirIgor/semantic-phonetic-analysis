import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import CKEditor from "@ckeditor/ckeditor5-react";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

import XmlClassicEditor from "./xml-classic-editor";

import EditThemesModal from "./themes/edit-themes-modal";

import { setData } from "../../actions/editor";

import "@ckeditor/ckeditor5-build-classic/build/translations/ru.js";

const Editor = React.memo(({ data, config, setData }) => {
  const [opened, setOpened] = React.useState(false);

  const editor = React.useRef(null);
  const openModal = React.useCallback(() => setOpened(true), []);

  const onChange = React.useCallback((e, editor) => {
    setData(editor.getData());
  }, []);

  const onClose = React.useCallback(() => {
    editor.current._destroyEditor();
    editor.current._initializeEditor();
    setOpened(false);
  }, [editor]);

  return (
    <>
      <EditThemesModal
        open={opened}
        onClose={onClose}
        themes={config["highlight"]["options"]}
      />
      <CKEditor
        ref={editor}
        editor={XmlClassicEditor}
        data={data}
        config={Object.assign(config, {
          highlight: Object.assign(config.highlight, { openModal })
        })}
        onChange={onChange}
      />
    </>
  );
});

// dangerouslySetInnerHTML={{ __html: data }}

const mapStateToProps = ({ editor: { data, config } }) => ({ data, config });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
