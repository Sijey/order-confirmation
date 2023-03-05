import React from "react";
import { BlockWrap, ButtonsWrap, CustomButton } from "../StyledComponents";
import { Box, useMediaQuery } from "@mui/material";
import { isActiveColor } from "../../helpers";
import { SetColor, SetType } from "../../constant";

type TypeAndColorsProps = {
  isCustom: boolean;
  setType: SetType | string;
  setColor: SetColor;
  handleTypeChange: (type: SetType | string) => void;
  handleColorChange: (color: SetColor) => void;
};

const TypeAndColors: React.FC<TypeAndColorsProps> = ({
  isCustom,
  setType,
  setColor,
  handleTypeChange,
  handleColorChange
}) => {
  const isMobile = useMediaQuery("(max-width:1023px)");

  return (
    <BlockWrap style={{ flexDirection: isMobile ? "row" : "column" }}>
      <ButtonsWrap ismobile={isMobile ? 1 : 0}>
        <Box>Тип:</Box>
        <Box style={{ flexDirection: isMobile ? "column" : "row", display: "flex" }}>
          {!isCustom && (
            <CustomButton
              bgcolor={isActiveColor("барний інвентар", setType)}
              onClick={() => handleTypeChange("барний інвентар")}>
              барний інвентар
            </CustomButton>
          )}
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
      <ButtonsWrap ismobile={isMobile ? 1 : 0}>
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
  );
};

export default TypeAndColors;
