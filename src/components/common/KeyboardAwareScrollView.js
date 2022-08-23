/* eslint-disable react/prop-types */
import React from 'react';

import {KeyboardAwareScrollView as BaseKeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { globalStyles } from '../../helpers/globalStyles';



export const KeyboardAwareScrollView = ({
  children,
  contentContainerStyle,
  ...rest
}) => (
    <BaseKeyboardAwareScrollView
      contentContainerStyle={[globalStyles.container, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      {...rest}>
      {children}
    </BaseKeyboardAwareScrollView>
  );
