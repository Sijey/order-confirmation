import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { Additional, SetColor, SetType } from "../constant";
import {
  TelegramIcon,
  TelegramShareButton,
} from "react-share";
import {
  Wrapper,
  BlockWrap,
  ButtonsWrap,
  TextWrap,
  CustomButton
} from "./StyledComponents";
import {getDateString, isActiveColor, isActiveDate} from "../helpers";

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
            <CustomButton
              bgcolor={isActiveColor("барний інвентар", setType)}
              onClick={() => handleTypeChange("барний інвентар")}>
              барний інвентар
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(SetType.start, setType)}
              onClick={() => handleTypeChange(SetType.start)}>
              {SetType.start}
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(SetType.pro, setType)}
              onClick={() => handleTypeChange(SetType.pro)}>
              {SetType.pro}
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(SetType.champion, setType)}
              onClick={() => handleTypeChange(SetType.champion)}>
              {SetType.champion}
            </CustomButton>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Колір:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <CustomButton
              onClick={() => handleColorChange(SetColor.silver)}
              bgcolor={isActiveColor(SetColor.silver, setColor)}>
              Сріблястий
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(SetColor.copper, setColor)}
              onClick={() => handleColorChange(SetColor.copper)}>
              Мідний
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(SetColor.black, setColor)}
              onClick={() => handleColorChange(SetColor.black)}>
              Чорний
            </CustomButton>
          </Box>
        </ButtonsWrap>
      </BlockWrap>
      <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
        <Box>Додатки:</Box>
        <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
          <CustomButton
            bgcolor={isActiveColor("", additional)}
            onClick={() => handleAdditional("")}>
            Без опцій
          </CustomButton>
          <CustomButton
            bgcolor={isActiveColor(Additional.carts, additional)}
            onClick={() => handleAdditional(Additional.carts)}>
            + Картки
          </CustomButton>
          <CustomButton
            bgcolor={isActiveColor(Additional.stand, additional)}
            onClick={() => handleAdditional(Additional.stand)}>
            + Підставка
          </CustomButton>
          <CustomButton
            bgcolor={isActiveColor(Additional.cartsAndStand, additional)}
            onClick={() => handleAdditional(Additional.cartsAndStand)}>
            + Картки та підставка
          </CustomButton>
        </Box>
      </ButtonsWrap>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Дата відправки:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <CustomButton
              bgcolor={isActiveDate(sendDate, DateTime.now())}
              onClick={() => handleDateChange("send", DateTime.now())}>
              Сьогодні
            </CustomButton>
            <CustomButton
              bgcolor={isActiveDate(sendDate, DateTime.now().plus({ day: 1 }))}
              onClick={() => handleDateChange("send", DateTime.now().plus({ day: 1 }))}>
              Завтра
            </CustomButton>
            <CustomButton
              bgcolor={isActiveDate(sendDate, DateTime.now().plus({ day: 2 }))}
              onClick={() => handleDateChange("send", DateTime.now().plus({ day: 2 }))}>
              Післязавтра
            </CustomButton>
            <CustomButton
              bgcolor={isActiveDate(sendDate,
                DateTime.now().plus({ week: 1 }).startOf("week"))}
              onClick={() =>
                handleDateChange("send", DateTime.now().plus({ week: 1 }).startOf("week"))
              }>
              У понеділок
            </CustomButton>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Дата отримання:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <CustomButton
              bgcolor={isActiveDate(deliveryDate, DateTime.now().plus({ day: 1 }))}
              onClick={() => handleDateChange("deliver", DateTime.now().plus({ day: 1 }))}>
              Завтра
            </CustomButton>
            <CustomButton
              bgcolor={isActiveDate(deliveryDate, DateTime.now().plus({ day: 2 }))}
              onClick={() => handleDateChange("deliver", DateTime.now().plus({ day: 2 }))}>
              Післязавтра
            </CustomButton>
            <CustomButton
              bgcolor={isActiveDate(deliveryDate,
                DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 1 }))}
              onClick={() =>
                handleDateChange(
                  "deliver",
                  DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 1 })
                )
              }>
              У вівторок
            </CustomButton>
            <CustomButton
              bgcolor={isActiveDate(deliveryDate,
                DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 2 }))}
              onClick={() =>
                handleDateChange(
                  "deliver",
                  DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 2 })
                )
              }>
              У середу
            </CustomButton>
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
