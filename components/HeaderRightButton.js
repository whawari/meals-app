import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../constants/COLORS";

const HeaderRightButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={COLORS.white}
    />
  );
};

export default HeaderRightButton;
