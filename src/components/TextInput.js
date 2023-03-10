import React, { useState } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

import defaultStyles from '../helpers/styles'
import colors from '../helpers/colors'
import { heightp } from '../utils/responsiveDesign'

function AppTextInput({
    labelName,
    icon,
    width = '100%',
    AntDesignIcon,
    password = false,
    ...otherProps
}) {
    const [showValue, setShowValue] = useState(false)
    return (
        <View style={{ flex: 1, marginVertical: 10 }}>
            <View style={styles.inputLbl}>
                {icon && (
                    <MaterialCommunityIcons
                        name={icon}
                        size={20}
                        color={defaultStyles.colors.black}
                        style={styles.icon}
                    />
                )}
                {AntDesignIcon && (
                    <AntDesign
                        name={AntDesignIcon}
                        size={20}
                        color={defaultStyles.colors.black}
                        style={styles.icon}
                    />
                )}
                <Text style={styles.label}>{labelName}</Text>
            </View>
            {password ? (
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },
                    ]}
                >
                    <TextInput
                        placeholderTextColor={defaultStyles.colors.black}
                        style={[
                            styles.text,
                            {
                                width: '90%',
                                padding: 5,
                            },
                        ]}
                        secureTextEntry={!showValue}
                        {...otherProps}
                    />
                    <>
                        {showValue ? (
                            <TouchableHighlight
                                underlayColor="transparent"
                                onPress={() => setShowValue(!showValue)}
                                style={{
                                    paddingRight: heightp(15),
                                }}
                            >
                                <Feather name="eye" size={16} color="#a09e9e" />
                            </TouchableHighlight>
                        ) : (
                            <TouchableHighlight
                                underlayColor="transparent"
                                onPress={() => setShowValue(!showValue)}
                                style={{
                                    paddingRight: heightp(15),
                                }}
                            >
                                <Feather
                                    name="eye-off"
                                    size={16}
                                    color="#a09e9e"
                                />
                            </TouchableHighlight>
                        )}
                    </>
                </View>
            ) : (
                <View style={[styles.container]}>
                    <TextInput
                        placeholderTextColor={defaultStyles.colors.black}
                        style={styles.text}
                        {...otherProps}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(112, 112, 112, 0.1)',
        borderRadius: 40,
        height: 50,
        color: colors.black,
        width: '100%',
    },
    text: {
        color: colors.black,
        fontSize: 18,
        fontFamily: 'Cairo-Regular',
        width: '95%',
        height: 50,
        padding: 5,
    },
    icon: {
        marginRight: 10,
    },
    label: {
        color: 'rgba(67, 72, 84, 1)', // colors.black
        fontSize: 16,
        fontFamily: 'Cairo-Regular',
    },
    inputLbl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
})

export default AppTextInput
