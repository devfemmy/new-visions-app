import * as React from "react";
import * as Svg from "react-native-svg";

export default function SvgComponent({ children, props }) {
  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
      {children}
    </Svg>
  );
}
