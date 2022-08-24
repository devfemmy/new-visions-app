import { useFormikContext } from "formik";
import React from "react";
import { View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../helpers/colors";

const Checkbox = ({ style, children, ...props }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <View style={style}>
      <BouncyCheckbox
        size={25}
        fillColor={colors.secondary}
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: colors.black }}
        onPress={(nextValue) => setFieldValue("rememberMe", nextValue)}
        textStyle={{
          color: colors.black,
          fontFamily: "Cairo-Regular",
          textDecorationLine: "none",
        }}
        {...props}
      />
    </View>
  );
};

export default Checkbox;
