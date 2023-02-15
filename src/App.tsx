import "./App.css";
import OrderConfirmation from "./components/OrderConfirmation";
import React, {useState} from "react";
import {Tab, Tabs} from "@mui/material";
import {TabPanel} from "./components/TabPanel";
import CustomMessage from "./components/CustomMessage";

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

  const handleChangeIndex = (index: number) => {
    setValue(index);
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
      >
        <Tab label="Standard" {...a11yProps(0)} />
        <Tab label="Custom" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <OrderConfirmation />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomMessage />
      </TabPanel>
    </div>
  );
}

export default App;
