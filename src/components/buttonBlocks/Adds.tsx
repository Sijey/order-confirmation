import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { ButtonsWrap, CustomButton } from "../StyledComponents";
import { isActiveColor } from "../../helpers";
import { Additional } from "../../constant";

type AddsProps = {
  additional: Additional;
  handleAdditional: (additional: Additional | string) => void;
};

const Adds: React.FC<AddsProps> = ({ additional, handleAdditional }) => {
  const isMobile = useMediaQuery("(max-width:1023px)");

  return (
    <ButtonsWrap ismobile={isMobile ? 1 : 0}>
      <Box>Додатки:</Box>
      <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
        <CustomButton bgcolor={isActiveColor("", additional)} onClick={() => handleAdditional("")}>
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
  );
};

export default Adds;
