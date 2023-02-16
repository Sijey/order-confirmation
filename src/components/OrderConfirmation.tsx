import { Alert, Box, Button, Snackbar, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { Additional, SetColor, SetType } from "../constant";
import {
  TelegramIcon,
  TelegramShareButton,
} from "react-share";
import {Wrapper, BlockWrap, ButtonsWrap, TextWrap} from "./StyledComponents";
import {getDateString, isActiveDate} from "../helpers";

type OrderConfirmationProps = {
  copyToClipboard: (text: string) => void;
};

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({copyToClipboard}) => {
  const [setColor, setSetColor] = useState(SetColor.silver);
  const [setType, setSetType] = useState<SetType | string>(SetType.start);
  const [sendDate, setSendDate] = useState<DateTime>(
    DateTime.now().startOf("hour").hour < 18 ? DateTime.now() : DateTime.now().plus({ day: 1 })
  );
  const [deliveryDate, setDeliveryDate] = useState<DateTime>(
    DateTime.now().startOf("hour").hour < 18
      ? DateTime.now().plus({ day: 1 })
      : DateTime.now().plus({ day: 2 })
  );
  const [additional, setAdditional] = useState(Additional.carts);

  const isMobile = useMediaQuery("(max-width:1023px)");
  const handleColorChange = (color: SetColor) => {
    setSetColor(color);
  };
  const handleTypeChange = (type: SetType | string) => {
    setSetType(type);
  };

  const handleDateChange = (type: string, date: DateTime) => {
    type === "send" ? setSendDate(date) : setDeliveryDate(date);
  };

  const handleAdditional = (add) => {
    setAdditional(add);
  };

  const text = `Добрий день 👋\nПрийняли замовлення на ${setType === "барний" +
  " інвентар" ? setType : `набір бармена "${setType}"`} ${setColor} кольору ${
    additional && `+ ${additional}`
  }.\n\nВесь інвентар є в наявності та буде готовий до відправлення ${
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
            <Button
              sx={{ backgroundColor: setType === "барний інвентар" ? "rgb(242, 242, 242)" : "white" }}
              onClick={() => handleTypeChange("барний інвентар")}>
              барний інвентар
            </Button>
            <Button
              sx={{ backgroundColor: setType === SetType.start ? "rgb(242, 242, 242)" : "white" }}
              onClick={() => handleTypeChange(SetType.start)}>
              {SetType.start}
            </Button>
            <Button
              sx={{
                backgroundColor: setType === SetType.pro ? "rgb(242," + " 242, 242)" : "white"
              }}
              onClick={() => handleTypeChange(SetType.pro)}>
              {SetType.pro}
            </Button>
            <Button
              sx={{
                backgroundColor: setType === SetType.champion ? "rgb(242," + " 242, 242)" : "white"
              }}
              onClick={() => handleTypeChange(SetType.champion)}>
              {SetType.champion}
            </Button>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Колір:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button
              sx={{
                backgroundColor: setColor === SetColor.silver ? "rgb(242, 242, 242)" : "white"
              }}
              onClick={() => handleColorChange(SetColor.silver)}>
              Сріблястий
            </Button>
            <Button
              sx={{
                backgroundColor: setColor === SetColor.copper ? "rgb(242, 242, 242)" : "white"
              }}
              onClick={() => handleColorChange(SetColor.copper)}>
              Мідний
            </Button>
            <Button
              sx={{ backgroundColor: setColor === SetColor.black ? "rgb(242, 242, 242)" : "white" }}
              onClick={() => handleColorChange(SetColor.black)}>
              Чорний
            </Button>
          </Box>
        </ButtonsWrap>
      </BlockWrap>
      <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
        <Box>Додатки:</Box>
        <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
          <Button
            sx={{ backgroundColor: !additional ? "rgb(242," + " 242, 242)" : "white" }}
            onClick={() => handleAdditional("")}>
            Без опцій
          </Button>
          <Button
            sx={{
              backgroundColor:
                additional === Additional.carts ? "rgb(242," + " 242, 242)" : "white"
            }}
            onClick={() => handleAdditional(Additional.carts)}>
            + Картки
          </Button>
          <Button
            sx={{
              backgroundColor:
                additional === Additional.stand ? "rgb(242," + " 242, 242)" : "white"
            }}
            onClick={() => handleAdditional(Additional.stand)}>
            + Підставка
          </Button>
          <Button
            sx={{
              backgroundColor:
                additional === Additional.cartsAndStand ? "rgb(242," + " 242, 242)" : "white"
            }}
            onClick={() => handleAdditional(Additional.cartsAndStand)}>
            + Картки та підставка
          </Button>
        </Box>
      </ButtonsWrap>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Дата відправки:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button
              sx={{
                backgroundColor: isActiveDate(sendDate, DateTime.now())
                  ? "rgb(242," + " 242, 242)"
                  : "white"
              }}
              onClick={() => handleDateChange("send", DateTime.now())}>
              Сьогодні
            </Button>
            <Button
              sx={{
                backgroundColor: isActiveDate(sendDate, DateTime.now().plus({ day: 1 }))
                  ? "rgb(242," + " 242, 242)"
                  : "white"
              }}
              onClick={() => handleDateChange("send", DateTime.now().plus({ day: 1 }))}>
              Завтра
            </Button>
            <Button
              sx={{
                backgroundColor: isActiveDate(sendDate, DateTime.now().plus({ day: 2 }))
                  ? "rgb(242," + " 242, 242)"
                  : "white"
              }}
              onClick={() => handleDateChange("send", DateTime.now().plus({ day: 2 }))}>
              Післязавтра
            </Button>
            <Button
              sx={{
                backgroundColor: isActiveDate(
                  sendDate,
                  DateTime.now().plus({ week: 1 }).startOf("week")
                )
                  ? "rgb(242," + " 242, 242)"
                  : "white"
              }}
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
            <Button
              sx={{
                backgroundColor: isActiveDate(deliveryDate, DateTime.now().plus({ day: 1 }))
                  ? "rgb(242," + " 242, 242)"
                  : "white"
              }}
              onClick={() => handleDateChange("deliver", DateTime.now().plus({ day: 1 }))}>
              Завтра
            </Button>
            <Button
              sx={{
                backgroundColor: isActiveDate(deliveryDate, DateTime.now().plus({ day: 2 }))
                  ? "rgb(242," + " 242, 242)"
                  : "white"
              }}
              onClick={() => handleDateChange("deliver", DateTime.now().plus({ day: 2 }))}>
              Післязавтра
            </Button>
            <Button
              sx={{
                backgroundColor: isActiveDate(
                  deliveryDate,
                  DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 1 })
                )
                  ? "rgb(242," + " 242, 242)"
                  : "white"
              }}
              onClick={() =>
                handleDateChange(
                  "deliver",
                  DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 1 })
                )
              }>
              У вівторок
            </Button>
            <Button
              sx={{
                backgroundColor: isActiveDate(
                  deliveryDate,
                  DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 2 })
                )
                  ? "rgb(242," + " 242, 242)"
                  : "white"
              }}
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
      <TextWrap onClick={() => copyToClipboard(text)} maxWidth="500px">
        Добрий день 👋
        <br />
        Прийняли замовлення на {setType === "барний інвентар" ? setType : `набір бармена "${setType}"`} {setColor} кольору
        {additional && ` + ${additional}`}.<br />
        <br />
        Весь інвентар є в наявності та буде готовий до відправлення{" "}
        {sendDate && getDateString(sendDate, "send")}.<br />
        Орієнтовна дата доставки: {deliveryDate && getDateString(deliveryDate, "deliver")}, вас
        влаштують такі терміни? 😊
      </TextWrap>
      <Box display="flex" mt="15px" gap="30px">
        <TelegramShareButton title="" url={text}>
          <TelegramIcon />
        </TelegramShareButton>
      </Box>
    </Wrapper>
  );
};

export default OrderConfirmation;
