/* eslint-disable react/prop-types */
import React, {memo, useMemo} from 'react';
import {Text as BaseText} from 'react-native';
import colors from '../../helpers/colors';
import { heightp } from '../../utils/responsiveDesign';


export const Text = memo(
  ({
    text,
    fontSize = heightp(15),
    lineHeight,
    onPress,
    fontFamily= 'Cairo-Regular',
    textAlign,
    color = colors.black,
    fontWeight = '400',
    style,
    ...rest
  }) => {
    const propsStyle = useMemo(
      () => ({
        color,
        fontSize,
        textAlign,
        lineHeight,
        fontWeight,
        fontFamily,
      }),
      [color, textAlign, fontWeight, lineHeight, fontSize, fontFamily],
    );

    return (
      <BaseText
        onPress={onPress}
        category="p1"
        style={[propsStyle, style]}
        {...rest}>
        {text}
      </BaseText>
    );
  },
);
