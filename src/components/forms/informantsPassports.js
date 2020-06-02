import React from "react";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import Button from "material-ui/RaisedButton";
import { reduxForm, Field, FieldArray } from "redux-form";
import { TextField, SelectField, DatePicker } from "redux-form-material-ui";

import "./informantsPassports.css";

const renderInformants = ({ fields }) => (
  <ul>
    {fields.map((member, index) => (
      <>
        <Button label="Удалить" onClick={() => fields.remove(index)}></Button>
        <li className="flexColumn">
          <Field
            name={`${member}.lastName`}
            component={TextField}
            floatingLabelText="Фамилия"
            hintText="Фамилия"
          />
          <Field
            name={`${member}.firstName`}
            component={TextField}
            floatingLabelText="Имя"
            hintText="Имя"
          />
          <Field
            name={`${member}.middleName`}
            component={TextField}
            floatingLabelText="Отчество"
            hintText="Отчество"
          />
          <Field
            name={`${member}.gender`}
            component={SelectField}
            floatingLabelText="Пол"
            hintText="Пол"
          >
            <MenuItem value="male" primaryText="Мужской" />
            <MenuItem value="female" primaryText="Женский" />
          </Field>
          <Field
            name={`${member}.birthLocation.state`}
            component={TextField}
            floatingLabelText="Место рождения - страна"
            hintText="Место рождения - страна"
          />
          <Field
            name={`${member}.birthLocation.region`}
            component={TextField}
            floatingLabelText="Место рождения - область"
            hintText="Место рождения - область"
          />
          <Field
            name={`${member}.birthLocation.locality`}
            component={TextField}
            floatingLabelText="Место рождения - место"
            hintText="Место рождения - место"
          />
          <Field
            name={`${member}.birthLocation.district`}
            component={TextField}
            floatingLabelText="Место рождения - район"
            hintText="Место рождения - район"
          />
          <Field
            name={`${member}.parentBirthLocation.state`}
            component={TextField}
            floatingLabelText="Место рождения родителей - страна"
            hintText="Место рождения родителей - страна"
          />
          <Field
            name={`${member}.parentBirthLocation.region`}
            component={TextField}
            floatingLabelText="Место рождения родителей - область"
            hintText="Место рождения родителей - область"
          />
          <Field
            name={`${member}.parentBirthLocation.locality`}
            component={TextField}
            floatingLabelText="Место рождения родителей - место"
            hintText="Место рождения родителей - место"
          />
          <Field
            name={`${member}.parentBirthLocation.district`}
            component={TextField}
            floatingLabelText="Место рождения родителей - район"
            hintText="Место рождения родителей - район"
          />
          <Field
            name={`${member}.birthDay`}
            component={DatePicker}
            format={null}
            floatingLabelText="Дата рождения"
            hintText="Дата рождения"
          />
          <Field
            name={`${member}.selfIdentification`}
            component={TextField}
            floatingLabelText="Самоопределение"
            hintText="Самоопределение"
          />
          <Field
            name={`${member}.education`}
            component={TextField}
            floatingLabelText="Образование"
            hintText="Образование"
          />
          <Field
            name={`${member}.job`}
            component={TextField}
            floatingLabelText="Место работы"
            hintText="Место работы"
          />
          <Field
            name={`${member}.dialect`}
            component={TextField}
            floatingLabelText="Диалект"
            hintText="Диалект"
          />
          <Field
            name={`${member}.comment`}
            component={TextField}
            floatingLabelText="Примечание"
            multiLine={true}
            rows={3}
            rowsMax={3}
          />
        </li>
        <Divider />
      </>
    ))}
    <Button label="Добавить" onClick={() => fields.push({})} />
  </ul>
);

const InformantsPassport = React.memo(() => (
  <form className="flexColumn">
    <FieldArray name="informants" component={renderInformants} />
  </form>
));

export default reduxForm({ form: "informantsPassports" })(InformantsPassport);
