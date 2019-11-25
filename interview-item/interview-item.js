import InterviewItemEditing from "./interview-item-editing";
import InterviewItemUI from "./interview-item-ui";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class InterviewItem extends Plugin {
  static get requires() {
    return [InterviewItemEditing, InterviewItemUI];
  }
}
