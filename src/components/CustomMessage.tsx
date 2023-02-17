import React, { useEffect, useState } from "react";
import {
  Additional,
  ChampSet,
  Gift,
  MenuList,
  ProSet,
  ReplaceVariant,
  SetColor,
  SetType,
  StartSet
} from "../constant";
import { DateTime } from "luxon";
import { Box, Button, Modal, useMediaQuery } from "@mui/material";
import {
  countSetPriceWithoutItems,
  getDateString,
  getMissedItemManyText,
  getMissedItemSingleText,
  getMissedItemWithoutText,
  isActiveColorFromArr
} from "../helpers";
import { BlockWrap, ButtonsWrap, CustomButton, TextWrap, Wrapper } from "./StyledComponents";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TypeAndColors from "./buttonBlocks/TypeAndColors";
import Adds from "./buttonBlocks/Adds";
import SendReceiveDate from "./buttonBlocks/SendReceiveDate";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require("../images/gandalf.jpeg");

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

type CustomMessageProps = {
  copyToClipboard: (text: string) => void;
};

const CustomMessage: React.FC<CustomMessageProps> = ({ copyToClipboard }) => {
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
  const [itemsList, setItemsList] = useState<StartSet[] | ProSet[] | ChampSet[]>(
    Object.values(StartSet)
  );
  const [addList, setAddList] = useState([MenuList.list, Additional.carts, Gift.gift]);
  const [missedItems, setMissedItems] = useState<string[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [shippingDate, setShippingDate] = useState(new Date());
  const [availableSetColors, setAvailableSetColors] = useState<string[]>([]);
  const [availableItemColors, setAvailableItemColors] = useState<string[]>([]);
  const formattedShipDate = DateTime.fromJSDate(shippingDate).setLocale("ua").toFormat("dd MMMM");
  const isShownShipDate = DateTime.fromJSDate(shippingDate) <= DateTime.now().plus({ month: 1 });
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleShippingDate = (date) => {
    setShippingDate(date);
    handleCloseModal();
  };

  const isMobile = useMediaQuery("(max-width:1023px)");
  const handleColorChange = (color: SetColor) => {
    setSetColor(color);
    getDefaultAvailableColors();
  };
  const handleTypeChange = (type: SetType | string) => {
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

  const getSetItemsList = (type: SetType | string) => {
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
    return (
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

  const getRestColors = (colors) => {
    let resultString = "";
    colors.forEach((item, i) =>
      i === colors.length - 1 ? (resultString += item) : (resultString += `${item} або `)
    );
    return resultString;
  };

  const handleAvailableSetColors = (item) => {
    if (item) {
      return setAvailableSetColors((prev) =>
        prev.includes(item) ? prev.filter((el) => el !== item) : [...prev, item]
      );
    }
    setAvailableSetColors([]);
  };

  const handleAvailableItemColors = (item) => {
    if (item) {
      return setAvailableItemColors((prev) =>
        prev.includes(item) ? prev.filter((el) => el !== item) : [...prev, item]
      );
    }
    setAvailableItemColors([]);
  };

  const getDefaultAvailableColors = () => {
    switch (setColor) {
      case SetColor.silver:
        setAvailableSetColors([ReplaceVariant.copper, ReplaceVariant.black]);
        setAvailableItemColors([ReplaceVariant.copper, ReplaceVariant.black]);
        break;
      case SetColor.copper:
        setAvailableSetColors([ReplaceVariant.silver, ReplaceVariant.black]);
        setAvailableItemColors([ReplaceVariant.silver, ReplaceVariant.black]);
        break;
      case SetColor.black:
        setAvailableSetColors([ReplaceVariant.copper, ReplaceVariant.silver]);
        setAvailableItemColors([ReplaceVariant.copper, ReplaceVariant.silver]);
        break;
    }
  };

  useEffect(() => {
    getDefaultAvailableColors();
  }, [setColor]);

  const text = `Добрий день 👋\nПідтверджуємо замовлення на набір бармена "${setType}" ${setColor} кольору${
    additional && `+ ${additional}`
  }.\n\n${
    missedItems.length > 0
      ? `Щиро вибачаємось, на жаль, у нас вже закінчились всі ${getMissedItemManyText(
          missedItems
        )}${
          isShownColor() ? ` ${setColor} кольору,` : ","
        } а нову поставку очікуємо ${formattedShipDate} 😔\n\n`
      : ""
  }${`Ви замовляли набір "${setType}", у нього входить:\n${itemsList
    .map(
      (item, i) =>
        `${i + 1})${missedItems.includes(item) ? "❌" : "✅"} ${item} ${
          missedItems.includes(item) ? `- нема, очікуємо ${formattedShipDate} :(` : ""
        }\n`
    )
    .join("")}`}${addList
    .map(
      (add, i) =>
        `${itemsList.length + i + 1})${add === Gift.gift ? "🎁" : "✅"} ${
          add.charAt(0).toUpperCase() + add.slice(1)
        }\n`
    )
    .join("")}\n${
    missedItems.length > 0
      ? `Пропонуємо варіанти:\n${
          isShownColor() && availableSetColors.length === 2
            ? `🔸 обрати набір іншого кольору: ${getRestColors(availableSetColors)}\n`
            : availableSetColors.length === 1
            ? `🔸 обрати набір ${getRestColors(availableSetColors).replace(
                "ий",
                "ого"
              )} кольору, все є в наявності\n`
            : ""
        }${
          isShownColor() && availableItemColors.length > 0
            ? `🔸 замінити ${getMissedItemSingleText(missedItems)} на ${getRestColors(
                availableItemColors
              )}\n`
            : ""
        }${
          isShownShipDate
            ? `🔸 зачекати на поставку ${formattedShipDate}, якщо у вас є така можливість\n`
            : ""
        }🔸 придбати набір без ${getMissedItemWithoutText(missedItems)}, за мінусом ${
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
      <TypeAndColors
        isCustom={true}
        setType={setType}
        setColor={setColor}
        handleTypeChange={handleTypeChange}
        handleColorChange={handleColorChange}
      />
      <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
        <Box>Чого не вистачає:</Box>
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(3," + " 120px)" : "repeat(4," + " 120px)"
          }}>
          {itemsList.map((item) => (
            <CustomButton
              bgcolor={isActiveColorFromArr(item, missedItems)}
              key={item}
              onClick={() => handleMissedItem(item)}>
              {item.split(" ")[0]}
            </CustomButton>
          ))}
        </Box>
      </ButtonsWrap>
      {isShownColor() && missedItems.length > 0 && (
        <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
          <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
            <Box>Набір на заміну:</Box>
            <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
              {setColor !== SetColor.silver && (
                <CustomButton
                  bgcolor={isActiveColorFromArr(ReplaceVariant.silver, availableSetColors)}
                  onClick={() => handleAvailableSetColors(ReplaceVariant.silver)}>
                  Сріблястий
                </CustomButton>
              )}
              {setColor !== SetColor.copper && (
                <CustomButton
                  bgcolor={isActiveColorFromArr(ReplaceVariant.copper, availableSetColors)}
                  onClick={() => handleAvailableSetColors(ReplaceVariant.copper)}>
                  Мідний
                </CustomButton>
              )}
              {setColor !== SetColor.black && (
                <CustomButton
                  bgcolor={isActiveColorFromArr(ReplaceVariant.black, availableSetColors)}
                  onClick={() => handleAvailableSetColors(ReplaceVariant.black)}>
                  Чорний
                </CustomButton>
              )}
              <CustomButton
                bgcolor={isActiveColorFromArr("", availableSetColors)}
                onClick={() => handleAvailableSetColors("")}>
                Заміни немає
              </CustomButton>
            </Box>
          </ButtonsWrap>
          <ButtonsWrap style={{ flexDirection: isMobile ? "column" : "row" }}>
            <Box>Колір на заміну:</Box>
            <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
              {setColor !== SetColor.silver && (
                <CustomButton
                  bgcolor={isActiveColorFromArr(ReplaceVariant.silver, availableItemColors)}
                  onClick={() => handleAvailableItemColors(ReplaceVariant.silver)}>
                  Сріблястий
                </CustomButton>
              )}
              {setColor !== SetColor.copper && (
                <CustomButton
                  bgcolor={isActiveColorFromArr(ReplaceVariant.copper, availableItemColors)}
                  onClick={() => handleAvailableItemColors(ReplaceVariant.copper)}>
                  Мідний
                </CustomButton>
              )}
              {setColor !== SetColor.black && (
                <CustomButton
                  bgcolor={isActiveColorFromArr(ReplaceVariant.black, availableItemColors)}
                  onClick={() => handleAvailableItemColors(ReplaceVariant.black)}>
                  Чорний
                </CustomButton>
              )}
              <CustomButton
                bgcolor={isActiveColorFromArr("", availableItemColors)}
                onClick={() => handleAvailableItemColors("")}>
                Заміни немає
              </CustomButton>
            </Box>
          </ButtonsWrap>
        </BlockWrap>
      )}
      <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
        <Adds additional={additional} handleAdditional={handleAdditional} />
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
      <SendReceiveDate
        sendDate={sendDate}
        deliveryDate={deliveryDate}
        handleDateChange={handleDateChange}
      />
      {missedItems.length !== itemsList.length ? (
        <TextWrap onClick={() => copyToClipboard(text)} maxWidth="500px">
          Добрий день 👋
          <br />
          Підтверджуємо замовлення на набір бармена &quot;{setType}&quot; {setColor} кольору
          {additional && ` + ${additional}`}.<br />
          <br />
          {missedItems.length > 0 && (
            <Box>
              Щиро вибачаємось, на жаль, у нас вже закінчились всі{" "}
              {getMissedItemManyText(missedItems)}
              {isShownColor() ? ` ${setColor} кольору,` : ","} а нову поставку очікуємо{" "}
              {formattedShipDate} 😔
              <br />
              <br />
            </Box>
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
              {itemsList.length + i + 1}) {add === Gift.gift ? "🎁" : "✅"}{" "}
              {add.charAt(0).toUpperCase() + add.slice(1)}
            </Box>
          ))}
          <br />
          {missedItems.length > 0 && (
            <Box>
              Пропонуємо варіанти:
              <br />
              {isShownColor() && availableSetColors.length === 2
                ? `🔸 обрати набір іншого кольору: ${getRestColors(availableSetColors)}\n`
                : availableSetColors.length === 1
                ? `🔸 обрати набір ${getRestColors(availableSetColors).replace(
                    "ий",
                    "ого"
                  )} кольору, все є в наявності\n`
                : ""}
              {isShownColor() && availableItemColors.length > 0 && (
                <Box>
                  🔸 замінити {getMissedItemSingleText(missedItems)} на{" "}
                  {getRestColors(availableItemColors)}
                  <br />
                </Box>
              )}
              {isShownShipDate && (
                <Box>
                  🔸 зачекати на поставку {formattedShipDate}, якщо у вас є така можливість
                  <br />
                </Box>
              )}
              🔸 придбати набір без {getMissedItemWithoutText(missedItems)}, за мінусом{" "}
              {missedItems.length > 1 ? "їх" : "його"} вартості:{" "}
              {countSetPriceWithoutItems(setColor, setType, missedItems, additional)}
              <br />
              <br />
            </Box>
          )}
          Інвентар буде готовий до відправлення {sendDate && getDateString(sendDate, "send")}.<br />
          Орієнтовна дата доставки: {deliveryDate && getDateString(deliveryDate, "deliver")}, вас
          влаштують такі терміни? 😊
        </TextWrap>
      ) : (
        <img width="100%" height="100%" style={{ objectFit: "contain" }} src={logo} alt="" />
      )}
    </Wrapper>
  );
};

export default CustomMessage;
