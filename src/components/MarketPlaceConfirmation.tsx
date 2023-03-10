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
        return "???? ???????????? ?????? ?????? ?????????????????? ????????????";
      case Payment.payed:
        return "???? ???????????? ?????????????? ??????????????";
      case Payment.req:
        return "???? ?????? ???????????????????? ???? ?????????????? ???????????? ???? ???????????????????? - ????????????????" + " ???????????? ???? ?????????";
    }
  };

  const text = `???????????? ???????? ????\n${
    !isConnected ? "???? ???????????? ????'?????????????? ?? ????????" + " ???? ????????????????.\n" : ""
  }\n${
    paymentType === Payment.postPayment ? "???????????????? " : "?????????????????????????? "
  }???????????????????? ?? ${platform} ???${orderNumber} ????:\n${orderItems
    .map((item) => `????${item}\n`)
    .join("")}\n??? ???????????????????? ???????? ???????????? ???? ???????????????????????? ${
    sendDate && getDateString(sendDate, "send")
  }.\n???????????????????? ???????? ????????????????: ${
    deliveryDate && getDateString(deliveryDate, "deliver")
  }.\n\n???? ???????????? ????????????????:\n${shippingAddress}\n\n${getPaymentString()}\n\n${
    paymentType === Payment.postPayment ? "?????????????????????????? ?????????????????????" : "?????????????? ???? ???????????????????? ????"
  }`;

  return (
    <Wrapper>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap ismobile={isMobile ? 1 : 0}>
          <Box>??????????????:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <CustomButton
              bgcolor={isConnected ? "white" : "rgb(242, 242, 242)"}
              onClick={() => setIsConnected(false)}>
              ???? ?????????????????????
            </CustomButton>
            <CustomButton
              bgcolor={isConnected ? "rgb(242, 242, 242)" : "white"}
              onClick={() => setIsConnected(true)}>
              ?????????????????????
            </CustomButton>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap ismobile={isMobile ? 1 : 0}>
          <Box>??????????????????:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <CustomButton
              bgcolor={isActiveColor(MarketPlace.epicentr, platform)}
              onClick={() => setPlatform(MarketPlace.epicentr)}>
              ????????????????
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(MarketPlace.prom, platform)}
              onClick={() => setPlatform(MarketPlace.prom)}>
              ????????
            </CustomButton>
            <CustomButton
              bgcolor={isActiveColor(MarketPlace.rozetka, platform)}
              onClick={() => setPlatform(MarketPlace.rozetka)}>
              ??????????????
            </CustomButton>
          </Box>
        </ButtonsWrap>
      </BlockWrap>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap ismobile={isMobile ? 1 : 0}>
          <Box>?????????? ????????????????????:</Box>
          <Button
            sx={{ bgcolor: orderNumber ? "rgb(242, 242, 242)" : "rgb(255, 222, 222)" }}
            onClick={handleOrderNumber}>
            ?????????? ????????????????????
          </Button>
        </ButtonsWrap>
        <ButtonsWrap ismobile={isMobile ? 1 : 0}>
          <Box>????????????:</Box>
          <Button
            sx={{ bgcolor: shippingAddress ? "rgb(242, 242, 242)" : "rgb(255, 222, 222)" }}
            onClick={handleShippingAddress}>
            ????????????
          </Button>
        </ButtonsWrap>
      </BlockWrap>
      <ButtonsWrap ismobile={isMobile ? 1 : 0}>
        <Box>????????????:</Box>
        <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
          <Button sx={{ bgcolor: "rgb(242, 242, 242)" }} onClick={handleOrderItem}>
            ???????????? ??????????
          </Button>
          <Button sx={{ bgcolor: "rgb(255, 150, 150)" }} onClick={deleteLastItem}>
            ???????????????? ????????????????
          </Button>
        </Box>
      </ButtonsWrap>
      <SendReceiveDate
        sendDate={sendDate}
        deliveryDate={deliveryDate}
        handleDateChange={handleDateChange}
      />
      <ButtonsWrap ismobile={isMobile ? 1 : 0}>
        <Box>????????????:</Box>
        <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
          <CustomButton
            bgcolor={isActiveColor(Payment.postPayment, paymentType)}
            onClick={() => setPaymentType(Payment.postPayment)}>
            ?????? ??????????????????
          </CustomButton>
          <CustomButton
            bgcolor={isActiveColor(Payment.payed, paymentType)}
            onClick={() => setPaymentType(Payment.payed)}>
            ????????????????
          </CustomButton>
          <CustomButton
            bgcolor={isActiveColor(Payment.req, paymentType)}
            onClick={() => setPaymentType(Payment.req)}>
            ??????????????????
          </CustomButton>
        </Box>
      </ButtonsWrap>
      <TextWrap onClick={() => copyToClipboard(text)} maxWidth="500px">
        ???????????? ????????????
        <br />
        {!isConnected ? (
          <Box>
            ???? ???????????? ????&apos;?????????????? ?? ???????? ???? ????????????????.
            <br />
          </Box>
        ) : (
          ""
        )}
        <br />
        {paymentType === Payment.postPayment ? "???????????????? " : "?????????????????????????? "}
        ???????????????????? ?? {platform} ???{orderNumber} ????:
        <br />
        {orderItems.map((item, i) => (
          <Box key={i}>
            ????{item}
            <br />
          </Box>
        ))}
        <br />??? ???????????????????? ???????? ???????????? ???? ????????????????????????{" "}
        {sendDate && getDateString(sendDate, "send")}.<br />
        ???????????????????? ???????? ????????????????: {deliveryDate && getDateString(deliveryDate, "deliver")}.<br />
        <br />
        ???? ???????????? ????????????????:
        <br />
        {shippingAddress}
        <br />
        <br />
        {getPaymentString()}
        <br />
        <br />
        {paymentType === Payment.postPayment
          ? "?????????????????????????? ?????????????????????"
          : "?????????????? ???? ???????????????????? ????"}
      </TextWrap>
    </Wrapper>
  );
};

export default MarketPlaceConfirmation;
