import { Alert, Box, Button, Snackbar, useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import { DateTime } from "luxon";
import { styled } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Additional } from "../constant";

const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "900px",
  padding: "0 25px",
  margin: "50px auto"
});

const ButtonsWrap = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%"
});

const TextWrap = styled(Box)({
  textAlign: "start",
  marginTop: "50px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "lightgray"
  }
});

const BlockWrap = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
});
const OrderConfirmation = () => {
  const [setColor, setSetColor] = useState("");
  const [setType, setSetType] = useState("");
  const [sendDate, setSendDate] = useState<DateTime>();
  const [deliveryDate, setDeliveryDate] = useState<DateTime>();
  const [additional, setAdditional] = useState("");
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:1023px)");
  const handleColorChange = (color: string) => {
    setSetColor(color);
  };
  const handleTypeChange = (type: string) => {
    setSetType(type);
  };

  const handleDateChange = (type: string, date: DateTime) => {
    type === "send" ? setSendDate(date) : setDeliveryDate(date);
  };

  const handleAdditional = (add) => {
    setAdditional(add);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const d = new Date();
  d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7));
  console.log(d);

  const getDateString = (data: DateTime, type: string) => {
    if (data.startOf("day") <= DateTime.now().startOf("day")) {
      return "сьогодні";
    } else if (data.startOf("week") >= DateTime.now().plus({ week: 1 }).startOf("week")) {
      return `${type === "send" ? "у " : ""}${data.setLocale("ua").toFormat("cccc")}, ${data
        .setLocale("ua")
        .toFormat("dd MMMM")}`;
    } else {
      return `${data.toRelativeCalendar()}, ${data.setLocale("ua").toFormat("dd" + " MMMM")}`;
    }
  };

  const text = `Добрий день 👋\nПрийняли замовлення на набір бармена "${setType}" ${setColor} кольору ${
    additional && ` + ${additional}`
  }.
  \nВесь інвентар є в наявності та буде готовий до відправлення ${
    sendDate && getDateString(sendDate, "send")
  }.\nОрієнтовна дата доставки: ${
    deliveryDate && getDateString(deliveryDate, "deliver")
  }, вас влаштують такі терміни? 😊`;

  return (
    <Wrapper>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Тип:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button onClick={() => handleTypeChange("Старт")}>Старт</Button>
            <Button onClick={() => handleTypeChange("Про")}>Про</Button>
            <Button onClick={() => handleTypeChange("Чемпіон")}>Чемпіон</Button>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Колір:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button onClick={() => handleColorChange("сріблястого")}>Сріблястий</Button>
            <Button onClick={() => handleColorChange("мідного")}>Мідний</Button>
            <Button onClick={() => handleColorChange("чорного")}>Чорний</Button>
          </Box>
        </ButtonsWrap>
      </BlockWrap>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Дата відправки:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button onClick={() => handleDateChange("send", DateTime.now())}>Сьогодні</Button>
            <Button onClick={() => handleDateChange("send", DateTime.now().plus({ day: 1 }))}>
              Завтра
            </Button>
            <Button onClick={() => handleDateChange("send", DateTime.now().plus({ day: 2 }))}>
              Післязавтра
            </Button>
            <Button
              onClick={() =>
                handleDateChange("send", DateTime.now().plus({ week: 1 }).startOf("week"))
              }>
              У понеділок
            </Button>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Дата отримання:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button onClick={() => handleDateChange("deliver", DateTime.now().plus({ day: 1 }))}>
              Завтра
            </Button>
            <Button onClick={() => handleDateChange("deliver", DateTime.now().plus({ day: 2 }))}>
              Післязавтра
            </Button>
            <Button
              onClick={() =>
                handleDateChange(
                  "deliver",
                  DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 1 })
                )
              }>
              У вівторок
            </Button>
            <Button
              onClick={() =>
                handleDateChange(
                  "deliver",
                  DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 2 })
                )
              }>
              У середу
            </Button>
          </Box>
        </ButtonsWrap>
      </BlockWrap>
      <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
        <Box>Додатки:</Box>
        <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
          <Button onClick={() => handleAdditional(Additional.carts)}>+ Картки</Button>
          <Button onClick={() => handleAdditional(Additional.stand)}>+ Підставка</Button>
          <Button onClick={() => handleAdditional(Additional.cartsAndStand)}>
            + Картки та підставка
          </Button>
        </Box>
      </ButtonsWrap>
      <TextWrap onClick={copyToClipboard} maxWidth="500px">
        Добрий день 👋
        <br />
        Прийняли замовлення на набір бармена &quot;{setType}&quot; {setColor} кольору
        {additional && ` + ${additional}`}.<br />
        <br />
        Весь інвентар є в наявності та буде готовий до відправлення{" "}
        {sendDate && getDateString(sendDate, "send")}.<br />
        Орієнтовна дата доставки: {deliveryDate && getDateString(deliveryDate, "deliver")}, вас
        влаштують такі терміни? 😊
      </TextWrap>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied!
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default OrderConfirmation;
