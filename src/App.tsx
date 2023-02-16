import "./App.css";
import OrderConfirmation from "./components/OrderConfirmation";
import React, {useState} from "react";
import {Tab, Tabs} from "@mui/material";
import {TabPanel} from "./components/TabPanel";
import CustomMessage from "./components/CustomMessage";
import SwipeableViews from "react-swipeable-views";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        TabIndicatorProps={{style: {background: "rgb(228, 228, 228)"}}}
      >
        <Tab label="Набори" {...a11yProps(0)} />
        <Tab label="Набори -" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={value => setValue(value)} enableMouseEvents>
        <TabPanel value={value} index={0}>
          <OrderConfirmation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomMessage />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default App;
