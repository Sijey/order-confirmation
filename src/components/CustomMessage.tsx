import React, { useState } from "react";
import {
  Additional,
  ChampSet,
  Gift,
  MenuList,
  ProSet,
  SetColor,
  SetType,
  StartSet
} from "../constant";
import { DateTime } from "luxon";
import { Alert, Box, Button, Modal, Snackbar, Typography, useMediaQuery } from "@mui/material";
import {
  countSetPriceWithoutItems,
  getDateString,
  getMissedItemManyText,
  getMissedItemSingleText,
  getMissedItemWithoutText
} from "../helpers";
import { styled } from "@mui/system";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "900px",
  padding: "0 25px",
  margin: "25px auto"
});

const ButtonsWrap = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderBottom: "1px solid purple"
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

const CustomMessage = () => {
  const [setColor, setSetColor] = useState(SetColor.silver);
  const [setType, setSetType] = useState(SetType.start);
  const [sendDate, setSendDate] = useState<DateTime>(
    DateTime.now().startOf("hour").hour < 18 ? DateTime.now() : DateTime.now().plus({ day: 1 })
  );
  const [deliveryDate, setDeliveryDate] = useState<DateTime>(
    DateTime.now().startOf("hour").hour < 18
      ? DateTime.now().plus({ day: 1 })
      : DateTime.now().plus({ day: 2 })
  );
  const [additional, setAdditional] = useState(Additional.carts);
  const [open, setOpen] = useState(false);
  const [itemsList, setItemsList] = useState<StartSet[] | ProSet[] | ChampSet[]>(
    Object.values(StartSet)
  );
  const [addList, setAddList] = useState([MenuList.list, Additional.carts, Gift.gift]);
  const [missedItems, setMissedItems] = useState<any>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [shippingDate, setShippingDate] = useState(new Date());
  const formattedShipDate = DateTime.fromJSDate(shippingDate).setLocale("ua").toFormat("dd MMMM");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleShippingDate = (date) => {
    setShippingDate(date);
    handleCloseModal();
  };

  const isMobile = useMediaQuery("(max-width:1023px)");
  const handleColorChange = (color: SetColor) => {
    setSetColor(color);
  };
  const handleTypeChange = (type: SetType) => {
    setSetType(type);
    getSetItemsList(type);
  };

  const handleDateChange = (type: string, date: DateTime) => {
    type === "send" ? setSendDate(date) : setDeliveryDate(date);
  };

  const handleAdditional = (add) => {
    setAdditional(add);
    getAddFields(add);
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

  const getSetItemsList = (type: SetType) => {
    if (type === SetType.start) {
      setItemsList(Object.values(StartSet));
    } else if (type === SetType.pro) {
      setItemsList(Object.values(ProSet));
    } else {
      setItemsList(Object.values(ChampSet));
    }
  };

  const getAddFields = (add) => {
    if (add === Additional.carts) {
      setAddList([MenuList.list, Additional.carts, Gift.gift]);
    } else if (add === Additional.stand) {
      setAddList([MenuList.list, Additional.stand, Gift.gift]);
    } else if (add === Additional.cartsAndStand) {
      setAddList([MenuList.list, Additional.carts, Additional.stand, Gift.gift]);
    } else {
      setAddList([MenuList.list, Gift.gift]);
    }
  };

  const handleMissedItem = (item) => {
    setMissedItems((prev) =>
      prev.includes(item) ? prev.filter((el) => el !== item) : [...prev, item]
    );
  };

  const isShownColor = () => {
    return !!(
      missedItems.includes(ChampSet.shaker) ||
      missedItems.includes(ChampSet.jigger) ||
      missedItems.includes(ChampSet.fineStrainer) ||
      missedItems.includes(ChampSet.strainerHorton) ||
      missedItems.includes(ChampSet.spoon) ||
      missedItems.includes(ChampSet.gazer) ||
      missedItems.includes(ChampSet.madler) ||
      missedItems.includes(ChampSet.tweezers)
    );
  };

  const getRestColors = () => {
    switch (setColor) {
      case SetColor.silver:
        return "чорний або мідний";
      case SetColor.black:
        return "сріблястий або мідний";
      case SetColor.copper:
        return "чорний або сріблястий";
    }
  };

  const text = `Добрий день 👋\nПідтверджуємо замовлення на набір бармена "${setType}" ${setColor} кольору${
    additional && `+ ${additional}`
  }.\n\n${
    missedItems.length > 0 ?
    `Щиро вибачаємось, на жаль, у нас вже закінчились всі ${getMissedItemManyText(missedItems)}${
      isShownColor() ? `${setColor} кольору,` : ","
    } а нову поставку очікуємо ${formattedShipDate} 😔\n\n` : ""}${
    `Ви замовляли набір "${setType}", у нього входить:\n${itemsList
      .map(
        (item, i) =>
          `${i + 1})${missedItems.includes(item) ? "❌" : "✅"} ${item} ${
            missedItems.includes(item) ? `- нема, очікуємо ${formattedShipDate} :(` : ""
          }\n`
      )
      .join("")}`
  }${addList
    .map((add, i) => `${itemsList.length + i + 1})${add === Gift.gift ? "🎁" : "✅"} ${add}\n`)
    .join("")}\n${
    missedItems.length > 0
      ? `Пропонуємо варіанти:\n${
          isShownColor() ? `1)🔸 обрати набір іншого кольору: ${getRestColors()}` : ""
        }\n${
          isShownColor()
            ? `2)🔸 замінити ${getMissedItemSingleText(missedItems)} на ${getRestColors()}\n`
            : ""
        }${
          isShownColor() ? 3 : 1
        })🔸 зачекати на поставку ${formattedShipDate}, якщо у вас є така можливість\n${
          isShownColor() ? 4 : 2
        })🔸 придбати набір без ${getMissedItemWithoutText(missedItems)}, за мінусом ${
          missedItems.length > 1 ? "їх" : "його"
        } вартості: ${countSetPriceWithoutItems(setColor, setType, missedItems, additional)}\n\n`
      : ""
  }Інвентар буде готовий до відправлення ${
    sendDate && getDateString(sendDate, "send")
  }.\nОрієнтовна дата доставки: ${
    deliveryDate && getDateString(deliveryDate, "deliver")
  }, вас влаштують такі терміни? 😊
  `;

  return (
    <Wrapper>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Тип:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button onClick={() => handleTypeChange(SetType.start)}>{SetType.start}</Button>
            <Button onClick={() => handleTypeChange(SetType.pro)}>{SetType.pro}</Button>
            <Button onClick={() => handleTypeChange(SetType.champion)}>{SetType.champion}</Button>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Колір:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button onClick={() => handleColorChange(SetColor.silver)}>Сріблястий</Button>
            <Button onClick={() => handleColorChange(SetColor.copper)}>Мідний</Button>
            <Button onClick={() => handleColorChange(SetColor.black)}>Чорний</Button>
          </Box>
        </ButtonsWrap>
      </BlockWrap>
      <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
        <Box>чого не вистачає:</Box>
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(3," + " 120px)" : "repeat(4," + " 120px)"
          }}>
          {itemsList.map((item) => (
            <Button key={item} onClick={() => handleMissedItem(item)}>
              {item.split(" ")[0]}
            </Button>
          ))}
        </Box>
      </ButtonsWrap>
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
          <Box>Додатки:</Box>
          <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
            <Button onClick={() => handleAdditional("")}>Без опцій</Button>
            <Button onClick={() => handleAdditional(Additional.carts)}>+ Картки</Button>
            <Button onClick={() => handleAdditional(Additional.stand)}>+ Підставка</Button>
            <Button onClick={() => handleAdditional(Additional.cartsAndStand)}>
              + Картки та підставка
            </Button>
          </Box>
        </ButtonsWrap>
        <ButtonsWrap
          style={{
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "start" : "space-between"
          }}>
          <Box>Дата поставки:</Box>
          <Button onClick={handleOpenModal}>Обрати дату</Button>
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={style}>
              <Calendar onChange={handleShippingDate} value={shippingDate} />
            </Box>
          </Modal>
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
      <TextWrap onClick={copyToClipboard} maxWidth="500px">
        Добрий день 👋
        <br />
        Підтверджуємо замовлення на набір бармена &quot;{setType}&quot; {setColor} кольору
        {additional && ` + ${additional}`}.<br />
        <br />
        {missedItems.length > 0 && (
          <Typography>
            Щиро вибачаємось, на жаль, у нас вже закінчились всі{" "}
            {getMissedItemManyText(missedItems)}
            {isShownColor() ? ` ${setColor} кольору,` : ","} а нову поставку очікуємо{" "}
            {formattedShipDate} 😔
            <br />
            <br />
          </Typography>
        )}
        Ви замовляли набір &quot;{setType}&quot;, у нього входить:
        {itemsList.map((item, i) => (
          <Box key={item}>
            {i + 1}) {missedItems.includes(item) ? "❌" : "✅"} {item}{" "}
            {missedItems.includes(item) ? `- нема, очікуємо ${formattedShipDate} :(` : ""}
          </Box>
        ))}
        {addList.map((add, i) => (
          <Box key={add}>
            {itemsList.length + i + 1}) {add === Gift.gift ? "🎁" : "✅"} {add}
          </Box>
        ))}
        <br />
        {missedItems.length > 0 && (
          <Box>
            Пропонуємо варіанти:
            <br />
            {isShownColor() && `1)🔸 обрати набір іншого кольору: ${getRestColors()}`}
            <br />
            {isShownColor() && (
              <Typography>
                2)🔸 замінити {getMissedItemSingleText(missedItems)} на {getRestColors()}
                <br />
              </Typography>
            )}
            {isShownColor() ? 3 : 1})🔸 зачекати на поставку {formattedShipDate}, якщо у вас є така
            можливість
            <br />
            {isShownColor() ? 4 : 2})🔸 придбати набір без {getMissedItemWithoutText(missedItems)},
            за мінусом {missedItems.length > 1 ? "їх" : "його"} вартості:{" "}
            {countSetPriceWithoutItems(setColor, setType, missedItems, additional)}
            <br />
            <br />
          </Box>
        )}
        Інвентар буде готовий до відправлення {sendDate && getDateString(sendDate, "send")}.<br />
        Орієнтовна дата доставки: {deliveryDate && getDateString(deliveryDate, "deliver")}, вас
        влаштують такі терміни? 😊
      </TextWrap>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied!
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default CustomMessage;
