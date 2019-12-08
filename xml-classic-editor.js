import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import ModelDataProcessor from "@ckeditor/ckeditor5-engine/src/dataprocessor/xmldataprocessor";
import ViewText from "@ckeditor/ckeditor5-engine/src/view/text";

import XmlDataProcessor from "./data-processor/xmldataprocessor";

export default class XmlClassicEditor extends ClassicEditor {
  constructor(element, config) {
    super(element, config);

    this.data.processor = new XmlDataProcessor(this.config);
  }
}
