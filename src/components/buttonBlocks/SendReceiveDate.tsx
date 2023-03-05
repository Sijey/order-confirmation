import React from "react";
import { BlockWrap, ButtonsWrap, CustomButton } from "../StyledComponents";
import { Box, useMediaQuery } from "@mui/material";
import { isActiveDate } from "../../helpers";
import { DateTime } from "luxon";

type SendReceiveDateProps = {
  sendDate: DateTime;
  deliveryDate: DateTime;
  handleDateChange: (type: string, date: DateTime) => void;
};

const SendReceiveDate: React.FC<SendReceiveDateProps> = ({
  sendDate,
  deliveryDate,
  handleDateChange
}) => {
  const isMobile = useMediaQuery("(max-width:1023px)");

  return (
    <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
      <ButtonsWrap ismobile={isMobile ? 1 : 0}>
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
            bgcolor={isActiveDate(sendDate, DateTime.now().plus({ week: 1 }).startOf("week"))}
            onClick={() =>
              handleDateChange("send", DateTime.now().plus({ week: 1 }).startOf("week"))
            }>
            У понеділок
          </CustomButton>
        </Box>
      </ButtonsWrap>
      <ButtonsWrap ismobile={isMobile ? 1 : 0}>
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
            bgcolor={isActiveDate(
              deliveryDate,
              DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 1 })
            )}
            onClick={() =>
              handleDateChange(
                "deliver",
                DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 1 })
              )
            }>
            У вівторок
          </CustomButton>
          <CustomButton
            bgcolor={isActiveDate(
              deliveryDate,
              DateTime.now().plus({ week: 1 }).startOf("week").plus({ day: 2 })
            )}
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
  );
};

export default SendReceiveDate;
