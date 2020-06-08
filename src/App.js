import React from "react";

import Editor from "./components/editor/editor";
import TextPassportForm from "./components/forms/textPassport";
import InformantsPassportsForm from "./components/forms/informantsPassports";
import SaveAndLoad from "./components/saveAndLoad/save-load";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

import TextFieldsIcon from "@material-ui/icons/TextFields";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EditIcon from "@material-ui/icons/Edit";
import ImportExportIcon from "@material-ui/icons/ImportExport";

import "./style.css";

const App = React.memo(() => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = React.useCallback(
    (index) => () => {
      setSelectedIndex(index);
    },
    [setSelectedIndex]
  );

  const onDocumentLoadingFinished = React.useCallback(() => {
    setSelectedIndex(0);
  }, [setSelectedIndex]);

  const onThemesLoadingFinished = React.useCallback(() => {
    setSelectedIndex(2);
  }, [setSelectedIndex]);

  return (
    <>
      <div className="main-container">
        <Paper className="menu-paper">
          <List component="nav" aria-label="Действия">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={handleListItemClick(0)}
            >
              <ListItemIcon>
                <TextFieldsIcon />
              </ListItemIcon>
              <ListItemText primary="Паспорт текста" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={handleListItemClick(1)}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Паспорта информантов" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={handleListItemClick(2)}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Редактор" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={handleListItemClick(3)}
            >
              <ListItemIcon>
                <ImportExportIcon />
              </ListItemIcon>
              <ListItemText primary="Импорт / Экспорт" />
            </ListItem>
          </List>
        </Paper>
        <Paper className="item-paper">
          <div style={{ display: selectedIndex == 0 ? undefined : "none" }}>
            <TextPassportForm />
          </div>
          <div style={{ display: selectedIndex == 1 ? undefined : "none" }}>
            <InformantsPassportsForm />
          </div>
          <div style={{ display: selectedIndex == 2 ? undefined : "none" }}>
            <Editor />
          </div>
          <div style={{ display: selectedIndex == 3 ? undefined : "none" }}>
            <SaveAndLoad
              onDocumentLoadingFinished={onDocumentLoadingFinished}
              onThemesLoadingFinished={onThemesLoadingFinished}
            />
          </div>
        </Paper>
      </div>
    </>
  );
});

export default App;
