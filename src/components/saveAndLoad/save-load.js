import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Save from "./save";
import Load from "./load";

import "./save-load.css";

const SaveAndLoad = React.memo(() => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const selectNewTab = React.useCallback((e, newIndex) => {
    setSelectedTabIndex(newIndex);
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={selectedTabIndex}
          onChange={selectNewTab}
          aria-label="Вкладки"
        >
          <Tab label="JSON" />
          <Tab label="XML" />
        </Tabs>
      </AppBar>
      {selectedTabIndex == 0 ? (
        <div className="tab-content">
          <Save isJson={true} />
          <Load isJson={true} />
        </div>
      ) : (
        <div className="tab-content">
          <Save isJson={false} />
          <Load isJson={false} />
        </div>
      )}
    </div>
  );
});

export default SaveAndLoad;
