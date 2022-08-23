import React, {memo, ComponentProps} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {Input as BaseInput} from '@ui-kitten/components';
import {MotiView} from 'moti';

import {Text} from './Text';
import {useSecureTextEntry} from '../../../hooks/useSecureTextEntry';
import {globalStyles} from '../../../styles/globalStyles';
import {hp} from '../../../utils';
import {icons, colors} from '../../../constants';

type InputProps = ComponentProps<typeof BaseInput> & {
  error?: string | undefined;
  isPassword?: boolean;
  searchInput?: boolean;
  placeholder: string;
  icon: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

export const Input = memo(
  ({
    error,
    isPassword = false,
    containerStyle,
    placeholder,
    icon,
    style,
    ...rest
  }: InputProps) => {
    const {secureTextEntry, toggleEntry} = useSecureTextEntry(isPassword);
    return (
      <View style={[{marginBottom: hp(15)}, containerStyle]}>
        <View style={styles.labelContainer}>
          <icons.Ionicons name={icon} size={20} color={'black'} />
          <Text style={styles.label} text={placeholder} />
        </View>
        <BaseInput
          size="large"
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, style]}
          textStyle={styles.textStyle}
          accessoryRight={() => {
            return isPassword ? (
              <TouchableOpacity activeOpacity={0.6} onPress={toggleEntry}>
                <icons.Ionicons
                  name={secureTextEntry ? 'eye' : 'eye-off'}
                  size={20}
                  color={'black'}
                />
              </TouchableOpacity>
            ) : (
              <View />
            );
          }}
          {...rest}
        />
        {error !== undefined ? (
          <MotiView
            from={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{
              type: 'timing',
              duration: 350,
            }}
            style={globalStyles.rowEnd}>
            <Text
              text={error}
              category="s1"
              style={styles.error}
              textAlign="right"
            />
          </MotiView>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: hp(15),
  },
  error: {
    paddingTop: hp(-8),
    color: 'tomato',
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: hp(5),
  },
  label: {
    marginLeft: hp(5),
  },
});
