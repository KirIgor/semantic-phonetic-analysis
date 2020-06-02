import React from "react";
import { reduxForm, Field } from "redux-form";
import { TextField, DatePicker } from "redux-form-material-ui";

const TextPassport = React.memo(() => (
  <form style={{ display: "flex", flexDirection: "column" }}>
    <Field
      name="recordLocation.state"
      component={TextField}
      floatingLabelText="Место записи - страна"
      hintText="Место записи - страна"
    />
    <Field
      name="recordLocation.region"
      component={TextField}
      floatingLabelText="Место записи - область"
      hintText="Место записи - область"
    />
    <Field
      name="recordLocation.locality"
      component={TextField}
      floatingLabelText="Место записи - место"
      hintText="Место записи - место"
    />
    <Field
      name="recordLocation.district"
      component={TextField}
      floatingLabelText="Место записи - район"
      hintText="Место записи - район"
    />
    <Field
      name="recordDate"
      component={DatePicker}
      format={null}
      floatingLabelText="Дата записи"
      hintText="Дата записи"
    />
    <Field
      name="source"
      component={TextField}
      floatingLabelText="Источник"
      hintText="Источник"
    />
    <Field
      name="comment"
      component={TextField}
      floatingLabelText="Примечание"
      multiLine={true}
      rows={3}
      rowsMax={3}
    />
  </form>
));

export default reduxForm({ form: "textPassport" })(TextPassport);
