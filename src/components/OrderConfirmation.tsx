import { Box } from "@mui/material";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { Additional, SetColor, SetType } from "../constant";
import { TelegramIcon, TelegramShareButton } from "react-share";
import { Wrapper, TextWrap } from "./StyledComponents";
import { getDateString } from "../helpers";
import TypeAndColors from "./buttonBlocks/TypeAndColors";
import Adds from "./buttonBlocks/Adds";
import SendReceiveDate from "./buttonBlocks/SendReceiveDate";

type OrderConfirmationProps = {
  copyToClipboard: (text: string) => void;
};

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ copyToClipboard }) => {
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

  const text = `Добрий день 👋\nПрийняли замовлення на ${
    setType === "барний" + " інвентар" ? setType : `набір бармена "${setType}"`
  } ${setColor} кольору${
    additional && ` + ${additional}`
  }.\n\nВесь інвентар є в наявності та буде готовий до відправлення ${
    sendDate && getDateString(sendDate, "send")
  }.\nОрієнтовна дата доставки: ${
    deliveryDate && getDateString(deliveryDate, "deliver")
  }, вас влаштують такі терміни? 😊`;

  return (
    <Wrapper>
      <TypeAndColors
        isCustom={false}
        setType={setType}
        setColor={setColor}
        handleTypeChange={handleTypeChange}
        handleColorChange={handleColorChange}
      />
      <Adds additional={additional} handleAdditional={handleAdditional} />
      <SendReceiveDate sendDate={sendDate} deliveryDate={deliveryDate} handleDateChange={handleDateChange} />
      <TextWrap onClick={() => copyToClipboard(text)} maxWidth="500px">
        Добрий день 👋
        <br />
        Прийняли замовлення на{" "}
        {setType === "барний інвентар" ? setType : `набір бармена "${setType}"`} {setColor} кольору
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
