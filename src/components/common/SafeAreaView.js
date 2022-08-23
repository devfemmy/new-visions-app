/* eslint-disable react/prop-types */
import React, {memo} from 'react';
import {
  SafeAreaView as BaseSafeAreaView,
} from 'react-native-safe-area-context';

import { View } from 'react-native';
import { globalStyles } from '../../helpers/globalStyles';


export const SafeAreaView = memo(({children, ...rest}) => (
    <BaseSafeAreaView style={[globalStyles.wrapper]}>
      <View style={[globalStyles.wrapper]} {...rest}>
        {children}
      </View>
    </BaseSafeAreaView>
  ));
