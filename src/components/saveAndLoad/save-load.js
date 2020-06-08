import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Save from "./save";
import Load from "./load";

import SaveThemes from "./save-themes";
import LoadThemes from "./load-themes";

import "./save-load.css";

const SaveAndLoad = React.memo(
  ({ onDocumentLoadingFinished, onThemesLoadingFinished }) => {
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
    const [format, setFormat] = React.useState("xml");

    const selectNewTab = React.useCallback(
      (e, newIndex) => {
        setSelectedTabIndex(newIndex);
      },
      [setSelectedTabIndex]
    );

    const handleChangeFormat = React.useCallback(
      (event) => {
        setFormat(event.target.value);
      },
      [setFormat]
    );

    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={selectedTabIndex}
            onChange={selectNewTab}
            aria-label="Вкладки"
          >
            <Tab label="Документ" />
            <Tab label="Темы" />
          </Tabs>
        </AppBar>
        <div className="tab-content">
          {selectedTabIndex == 0 ? (
            <>
              <FormControl component="fieldset">
                <FormLabel component="legend">Формат</FormLabel>
                <RadioGroup
                  aria-label="Формат"
                  name="format"
                  value={format}
                  onChange={handleChangeFormat}
                >
                  <FormControlLabel
                    value="xml"
                    control={<Radio />}
                    label="XML"
                  />
                  <FormControlLabel
                    value="json"
                    control={<Radio />}
                    label="JSON"
                  />
                </RadioGroup>
              </FormControl>
              <Save isJson={format == "json"} />
              <Load
                isJson={format == "json"}
                onLoadingFinished={onDocumentLoadingFinished}
              />
            </>
          ) : (
            <>
              <SaveThemes />
              <LoadThemes onLoadingFinished={onThemesLoadingFinished} />
            </>
          )}
        </div>
      </div>
    );
  }
);

export default SaveAndLoad;
