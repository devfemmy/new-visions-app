/* eslint-disable react/prop-types */
import React, {memo} from 'react';
import {
  StyleSheet,
  ScrollView as BaseScrollView,
} from 'react-native';
import { globalStyles } from '../../helpers/globalStyles';


export const Container = memo(
  ({children, contentContainerStyle, ...rest}) => (
      <BaseScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          globalStyles.container,
          globalStyles.wrapper,
          contentContainerStyle,
        ]}
        {...rest}>
        {children}
      </BaseScrollView>
    ),
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
