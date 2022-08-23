import { DefaultTheme } from "@react-navigation/native";
import colors from "../helpers/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.white,
    background: colors.white,
  },
};
