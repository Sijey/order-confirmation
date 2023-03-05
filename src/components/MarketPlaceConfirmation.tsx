import React, { useState } from "react";
import { BlockWrap, ButtonsWrap, CustomButton, TextWrap, Wrapper } from "./StyledComponents";
import { MarketPlace, Payment } from "../constant";
import { Box, Button, useMediaQuery } from "@mui/material";
import { getDateString, isActiveColor } from "../helpers";
import SendReceiveDate from "./buttonBlocks/SendReceiveDate";
import { DateTime } from "luxon";

type MarketProps = {
  copyToClipboard: (text: string) => void;
};

const MarketPlaceConfirmation: React.FC<MarketProps> = ({ copyToClipboard }) => {
  const isMobile = useMediaQuery("(max-width:1023px)");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [platform, setPlatform] = useState<MarketPlace>(MarketPlace.rozetka);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [orderItems, setOrderItems] = useState<string[]>([]);
  const [sendDate, setSendDate] = useState<DateTime>(
    DateTime.now().startOf("hour").hour < 18 ? DateTime.now() : DateTime.now().plus({ day: 1 })
  );
  const [deliveryDate, setDeliveryDate] = useState<DateTime>(
    DateTime.now().startOf("hour").hour < 18
      ? DateTime.now().plus({ day: 1 })
      : DateTime.now().plus({ day: 2 })
  );
  const [paymentType, setPaymentType] = useState<Payment>(Payment.payed);

  const handleOrderNumber = () => {
    navigator.clipboard.readText().then((text) => text && setOrderNumber(text));
    navigator.clipboard.writeText("");
  };

  const handleShippingAddress = () => {
    navigator.clipboard.readText().then((text) => text && setShippingAddress(text));
    navigator.clipboard.writeText("");
  };

  const handleOrderItem = () => {
    navigator.clipboard
      .readText()
      .then((text) => text && setOrderItems((orderItems) => [...orderItems, text]));
    navigator.clipboard.writeText("");
  };

  const deleteLastItem = () => {
    setOrderItems((orderItems) => orderItems.slice(0, -1));
  };

  const handleDateChange = (type: string, date: DateTime) => {
    type === "send" ? setSendDate(date) : setDeliveryDate(date);
  };

  const getPaymentString = () => {
    switch (paymentType) {
      case Payment.postPayment:
        return "Оплата під час отримання товару";
      case Payment.payed:
        return "Оплата пройшла успішно";
      case Payment.req:
        return "При оформленні ви вказали оплату по реквізитам - зручніше" + " Приват чи Моно?";
    }
  };

  const text = `Добрий день 👋\n${
    !isConnected ? "Не можемо зв'язатися з вами" + " по телефону.\n" : ""
  }\n${
    paymentType === Payment.postPayment ? "Прийняли " : "Підтверджуємо "
  }замовлення з ${platform} ${orderNumber} на:\n${orderItems.map(
    (item) => `• ${item}\n`
  )}\nАдреса доставки:\n${shippingAddress}\n\nЗамовлення буде готове до відправлення ${
    sendDate && getDateString(sendDate, "send")
  }.\nОрієнтовна дата доставки: ${
    deliveryDate && getDateString(deliveryDate, "deliver")
  }.\n\n${getPaymentString()}\n\n${
    paymentType === Payment.postPayment ? "Підтверджуєте замовлення?" : "Дякуємо за замовлення 😊"
  }`;

  return (
    <Wrapper>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap ismobile={isMobile ? 1 : 0}>
          <Box>Звʼязок:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <CustomButton
              bgcolor={isConnected ? "white" : "rgb(242, 242, 242)"}
              onClick={() => setIsConnected(false)}>
              Не зв’язались
            </CustomButton>
            <CustomButton
              bgcolor={isConnected ? "rgb(242, 242, 242)" : "white"}
              onClick={() => setIsConnected(true)}>
              Зв’язались
            </CustomButton>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap ismobile={isMobile ? 1 : 0}>
          <Box>Платформа:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <CustomButton
              bgcolor={isActiveColor(MarketPlace.epicentr, platform)}
              onClick={() => setPlatform(MarketPlace.epicentr)}>
              Епіцентр
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(MarketPlace.prom, platform)}
              onClick={() => setPlatform(MarketPlace.prom)}>
              Пром
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(MarketPlace.rozetka, platform)}
              onClick={() => setPlatform(MarketPlace.rozetka)}>
              Розетка
            </CustomButton>
          </Box>
        </ButtonsWrap>
      </BlockWrap>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap ismobile={isMobile ? 1 : 0}>
          <Box>Номер замовлення:</Box>
          <Button
            sx={{ bgcolor: orderNumber ? "rgb(242, 242, 242)" : "rgb(255, 222, 222)" }}
            onClick={handleOrderNumber}>
            Номер замовлення
          </Button>
        </ButtonsWrap>
        <ButtonsWrap ismobile={isMobile ? 1 : 0}>
          <Box>Адреса:</Box>
          <Button
            sx={{ bgcolor: shippingAddress ? "rgb(242, 242, 242)" : "rgb(255, 222, 222)" }}
            onClick={handleShippingAddress}>
            Адреса
          </Button>
        </ButtonsWrap>
      </BlockWrap>
      <ButtonsWrap ismobile={isMobile ? 1 : 0}>
        <Box>Товари:</Box>
        <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
          <Button sx={{ bgcolor: "rgb(242, 242, 242)" }} onClick={handleOrderItem}>
            Додати товар
          </Button>
          <Button sx={{ bgcolor: "rgb(255, 150, 150)" }} onClick={deleteLastItem}>
            видалити останній
          </Button>
        </Box>
      </ButtonsWrap>
      <SendReceiveDate
        sendDate={sendDate}
        deliveryDate={deliveryDate}
        handleDateChange={handleDateChange}
      />
      <ButtonsWrap ismobile={isMobile ? 1 : 0}>
        <Box>Оплата:</Box>
        <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
          <CustomButton
            bgcolor={isActiveColor(Payment.postPayment, paymentType)}
            onClick={() => setPaymentType(Payment.postPayment)}>
            При отриманні
          </CustomButton>
          <CustomButton
            bgcolor={isActiveColor(Payment.payed, paymentType)}
            onClick={() => setPaymentType(Payment.payed)}>
            Оплатити
          </CustomButton>
          <CustomButton
            bgcolor={isActiveColor(Payment.req, paymentType)}
            onClick={() => setPaymentType(Payment.req)}>
            Реквізити
          </CustomButton>
        </Box>
      </ButtonsWrap>
      <TextWrap onClick={() => copyToClipboard(text)} maxWidth="500px">
        Добрий день👋
        <br />
        {!isConnected ? (
          <Box>
            Не можемо зв&apos;язатися з вами по телефону.
            <br />
          </Box>
        ) : (
          ""
        )}
        <br />
        {paymentType === Payment.postPayment ? "Прийняли " : "Підтверджуємо "}
        замовлення з {platform} {orderNumber} на:
        <br />
        {orderItems.map((item, i) => (
          <Box key={i}>
            • {item}
            <br />
          </Box>
        ))}
        <br />
        Адреса доставки:
        <br />
        {shippingAddress}
        <br />
        <br />
        Замовлення буде готове до відправлення {sendDate && getDateString(sendDate, "send")}.<br />
        Орієнтовна дата доставки: {deliveryDate && getDateString(deliveryDate, "deliver")}.<br />
        <br />
        {getPaymentString()}
        <br />
        <br />
        {paymentType === Payment.postPayment
          ? "Підтверджуєте замовлення?"
          : "Дякуємо за замовлення 😊"}
      </TextWrap>
    </Wrapper>
  );
};

export default MarketPlaceConfirmation;
