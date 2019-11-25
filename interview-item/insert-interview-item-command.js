import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertInterviewItemCommand extends Command {
  execute() {
    this.editor.model.change(writer => {
      this.editor.model.insertContent(createInterviewItem(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "interviewItem"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createInterviewItem(writer) {
  const interviewItem = writer.createElement("interviewItem");
  const interviewItemQuestion = writer.createElement("interviewItemQuestion");
  const interviewItemAnswer = writer.createElement("interviewItemAnswer");

  writer.append(interviewItemQuestion, interviewItem);
  writer.append(interviewItemAnswer, interviewItem);

  writer.appendElement("paragraph", interviewItemAnswer);

  return interviewItem;
}
