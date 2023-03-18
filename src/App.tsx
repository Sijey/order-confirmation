import "./App.css";
import OrderConfirmation from "./components/OrderConfirmation";
import React, {useEffect, useState} from "react";
import {Alert, Snackbar, Tab, Tabs} from "@mui/material";
import {TabPanel} from "./components/TabPanel";
import CustomMessage from "./components/CustomMessage";
import SwipeableViews from "react-swipeable-views";
import MarketPlaceConfirmation from "./components/MarketPlaceConfirmation";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [copyLimit, setCopyLimit] = useState<number>(10);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const copyToClipboard = (text: string) => {
    getCopyLimit();
    localStorage.setItem("limit", (copyLimit - 1) + "");
    setCopyLimit(copyLimit => copyLimit - 1);
    copyLimit > 0 && navigator.clipboard.writeText(text);
    setOpen(true);
  };

  const getCopyLimit = () => {
    const limit = localStorage.getItem("limit");
    if (!limit) {
      localStorage.setItem("limit", "10");
      setCopyLimit(+"10");
    } else {
      setCopyLimit(+limit)
    }
  }

  useEffect(() => {
    getCopyLimit();
  }, []);

  return (
    <div className="App" onContextMenu={(event) => event.preventDefault()} style={{userSelect: "none"}}>
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
        <Tab label="Маркетплейс" {...a11yProps(2)} />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={value => setValue(value)} enableMouseEvents>
        <TabPanel value={value} index={0}>
          <OrderConfirmation copyToClipboard={copyToClipboard} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomMessage copyToClipboard={copyToClipboard} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MarketPlaceConfirmation copyToClipboard={copyToClipboard} />
        </TabPanel>
      </SwipeableViews>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        {copyLimit > 0 ? <Alert onClose={handleClose} severity="warning" sx={{width: "100%"}}>
          У Вас залишилось {copyLimit} бескоштовних копіювань
        </Alert>
        :
          <Alert onClose={handleClose} severity="error" sx={{width: "100%"}}>
            Упс, у Вас закінчились всі бескоштовні копіювання, будь ласка, зверніться до команди розробки
          </Alert>
        }
      </Snackbar>
    </div>
  );
}

export default App;
