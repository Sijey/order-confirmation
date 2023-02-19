import {DateTime} from "luxon";
import {Additional, ChampSet, SetColor, SetType} from "./constant";

export const getDateString = (data: DateTime, type: string) => {
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

export const getMissedItemManyText = (missedItems) => {
  const text: string[] = [];
  missedItems.forEach((item) => {
    switch (item) {
      case ChampSet.shaker:
        text.push("шейкери");
        break;
      case ChampSet.gazer:
        text.push("гейзери");
        break;
      case ChampSet.fineStrainer:
        text.push("файн стрейнери");
        break;
      case ChampSet.strainerHorton:
        text.push("Хоторн стрейнери");
        break;
      case ChampSet.glass:
        text.push("стакани");
        break;
      case ChampSet.iceForm:
        text.push("форми для льоду");
        break;
      case ChampSet.jigger:
        text.push("джигери");
        break;
      case ChampSet.madler:
        text.push("мадлери");
        break;
      case ChampSet.spoon:
        text.push("ложки");
        break;
      case ChampSet.sqizer:
        text.push("сквізери");
        break;
      case ChampSet.stopper:
        text.push("стопери");
        break;
      case ChampSet.knife:
        text.push("ножі-штопори");
        break;
      case ChampSet.iceBacked:
        text.push("відерця");
        break;
      case ChampSet.scoop:
        text.push("совочки");
        break;
      case ChampSet.tongs:
        text.push("щипці");
        break;
      case ChampSet.tweezers:
        text.push("пінцети");
        break;
    }
  });
  return text.join(", ");
};

export const getMissedItemSingleText = (missedItems) => {
  const text: string[] = [];
  missedItems.forEach((item) => {
    switch (item) {
      case ChampSet.shaker:
        text.push("шейкер");
        break;
      case ChampSet.gazer:
        text.push("гейзер");
        break;
      case ChampSet.fineStrainer:
        text.push("файн стрейнер");
        break;
      case ChampSet.strainerHorton:
        text.push("Хоторн стрейнер");
        break;
      case ChampSet.glass:
        text.push("стакан");
        break;
      case ChampSet.iceForm:
        text.push("форму для льоду");
        break;
      case ChampSet.jigger:
        text.push("джигер");
        break;
      case ChampSet.madler:
        text.push("мадлер");
        break;
      case ChampSet.spoon:
        text.push("ложку");
        break;
      case ChampSet.sqizer:
        text.push("сквізер");
        break;
      case ChampSet.stopper:
        text.push("стопер");
        break;
      case ChampSet.knife:
        text.push("ніж-штопор");
        break;
      case ChampSet.iceBacked:
        text.push("відерце");
        break;
      case ChampSet.scoop:
        text.push("совочок");
        break;
      case ChampSet.tongs:
        text.push("щипці");
        break;
      case ChampSet.tweezers:
        text.push("пінцет");
        break;
    }
  });
  return text.join(", ");
};

export const getMissedItemWithoutText = (missedItems) => {
  const text: string[] = [];
  missedItems.forEach((item) => {
    switch (item) {
      case ChampSet.shaker:
        text.push("шейкеру");
        break;
      case ChampSet.gazer:
        text.push("гейзеру");
        break;
      case ChampSet.fineStrainer:
        text.push("файн стрейнеру");
        break;
      case ChampSet.strainerHorton:
        text.push("Хоторн стрейнеру");
        break;
      case ChampSet.glass:
        text.push("стакану");
        break;
      case ChampSet.iceForm:
        text.push("форми для льоду");
        break;
      case ChampSet.jigger:
        text.push("джигеру");
        break;
      case ChampSet.madler:
        text.push("мадлеру");
        break;
      case ChampSet.spoon:
        text.push("ложки");
        break;
      case ChampSet.sqizer:
        text.push("сквізеру");
        break;
      case ChampSet.stopper:
        text.push("стоперу");
        break;
      case ChampSet.knife:
        text.push("ножа-штопору");
        break;
      case ChampSet.iceBacked:
        text.push("відерця");
        break;
      case ChampSet.scoop:
        text.push("совочку");
        break;
      case ChampSet.tongs:
        text.push("щипців");
        break;
      case ChampSet.tweezers:
        text.push("пінцету");
        break;
    }
  });
  return text.join(", ");
};

const getSetDefaultPrice = (setColor: SetColor, setType: SetType | string) => {
  if (setType === SetType.start) {
    if (setColor === SetColor.silver) return 1799;
    return 2099;
  } else if (setType === SetType.pro) {
    if (setColor === SetColor.silver) return 2599;
    return 2899;
  } else {
    if (setType === SetType.champion) return 3099;
    return 3599;
  }
}

const countPriceMissedItems = (missedItems: string[], setColor: SetColor) => {
  const itemsPrice: number[] = [];
  missedItems.forEach(item => {
    if (setColor === SetColor.silver) {
      switch (item) {
        case ChampSet.shaker:
          itemsPrice.push(699);
          break;
        case ChampSet.gazer:
          itemsPrice.push(104);
          break;
        case ChampSet.fineStrainer:
          itemsPrice.push(129);
          break;
        case ChampSet.strainerHorton:
          itemsPrice.push(289);
          break;
        case ChampSet.glass:
          itemsPrice.push(259);
          break;
        case ChampSet.iceForm:
          itemsPrice.push(199);
          break;
        case ChampSet.jigger:
          itemsPrice.push(189);
          break;
        case ChampSet.madler:
          itemsPrice.push(169);
          break;
        case ChampSet.spoon:
          itemsPrice.push(179);
          break;
        case ChampSet.sqizer:
          itemsPrice.push(399);
          break;
        case ChampSet.stopper:
          itemsPrice.push(178);
          break;
        case ChampSet.knife:
          itemsPrice.push(139);
          break;
        case ChampSet.iceBacked:
          itemsPrice.push(299);
          break;
        case ChampSet.scoop:
          itemsPrice.push(139);
          break;
        case ChampSet.tongs:
          itemsPrice.push(49);
          break;
        case ChampSet.tweezers:
          itemsPrice.push(149);
          break;
      }
    } else {
      switch (item) {
        case ChampSet.shaker:
          itemsPrice.push(749);
          break;
        case ChampSet.gazer:
          itemsPrice.push(140);
          break;
        case ChampSet.fineStrainer:
          itemsPrice.push(179);
          break;
        case ChampSet.strainerHorton:
          itemsPrice.push(329);
          break;
        case ChampSet.glass:
          itemsPrice.push(259);
          break;
        case ChampSet.iceForm:
          itemsPrice.push(199);
          break;
        case ChampSet.jigger:
          itemsPrice.push(289);
          break;
        case ChampSet.madler:
          itemsPrice.push(199);
          break;
        case ChampSet.spoon:
          itemsPrice.push(229);
          break;
        case ChampSet.sqizer:
          itemsPrice.push(399);
          break;
        case ChampSet.stopper:
          itemsPrice.push(178);
          break;
        case ChampSet.knife:
          itemsPrice.push(139);
          break;
        case ChampSet.iceBacked:
          itemsPrice.push(299);
          break;
        case ChampSet.scoop:
          itemsPrice.push(139);
          break;
        case ChampSet.tongs:
          itemsPrice.push(49);
          break;
        case ChampSet.tweezers:
          itemsPrice.push(189);
          break;
      }
    }
  })
  return itemsPrice;
}

const getAddsPrice = (adds: Additional) => {
  switch (adds) {
    case Additional.carts:
      return 139;
    case Additional.stand:
      return 499;
    case Additional.cartsAndStand:
      return 638;
    default:
      return 0;
  }
}

export const countSetPriceWithoutItems = (setColor: SetColor, setType: SetType | string, missedItems: string[], adds: Additional) => {
  const defaultSetPrice = getSetDefaultPrice(setColor, setType) + getAddsPrice(adds);
  let setPrice = defaultSetPrice;
  const itemsPrice = countPriceMissedItems(missedItems, setColor);
  itemsPrice.forEach(item => setPrice = setPrice - item)
  let resultStr = defaultSetPrice + " грн";
  itemsPrice.forEach(item => resultStr = resultStr.concat(` - ${item} грн`));
  return `${resultStr} = ${setPrice} грн`;
}

export const isActiveDate = (date1: DateTime, date2: DateTime) => {
  return date1.startOf("day").day === date2.startOf("day").day ? "rgb(242," +
    " 242, 242)" : "white";
}

export const isActiveColor = (setColor, currentColor) => {
  switch (currentColor) {
    case setColor:
      return "rgb(242, 242, 242)";
    default:
      return "white"
  }
}

export const isActiveColorFromArr = (item, array) => {
  if (!item && !array.length) return "rgb(242, 242, 242)";
  return array.includes(item) ? "rgb(242, 242, 242)" : "white";
}
