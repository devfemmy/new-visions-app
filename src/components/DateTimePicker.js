import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Pressable,
    Platform,
} from 'react-native'
import Modal from 'react-native-modal'
import DateTimePicker from '@react-native-community/datetimepicker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../helpers/colors'
import { heightp, widthp } from '../utils/responsiveDesign'
import moment from 'moment'

const CustomDateTimePicker = (props) => {
    const flatListRef = useRef()

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <Text>{''}</Text>
            </View>
        )
    }

    return (
        <>
            <View>
                <View style={[styles.toggle]}>
                    <View style={styles.heightCont}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: '#000',
                            }}
                        >
                            {props.label}
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: colors.primary,
                            }}
                        >
                            {props.value}
                        </Text>
                        <Pressable
                            onPress={props.onPressToggle}
                            style={{
                                width: '30%',
                                backgroundColor: colors.primary,
                                height: '70%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}
                        >
                            <Ionicons
                                name={'caret-down'}
                                size={20}
                                color={'#fff'}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.heightCont}>
                        <>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#000',
                                }}
                            >
                                {props.timeLabel}
                            </Text>
                            {/* {props.timeValue?.length > 0 && ( */}
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: '#000',
                                }}
                            >
                                {moment(props.timeValue).format('LT')}
                            </Text>
                            {/* )} */}
                        </>
                        <Pressable
                            onPress={props.onPressToggleTime}
                            style={{
                                width: '30%',
                                backgroundColor: colors.primary,
                                height: '70%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}
                        >
                            <Ionicons
                                name={'caret-down'}
                                size={20}
                                color={'#fff'}
                            />
                        </Pressable>
                    </View>
                </View>
                {props.togglePicker && props.shouldToggleMyPicker && (
                    <View style={styles.positionalIndex}>
                        <View style={styles.container}>
                            <View style={styles.containerStyle}>
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontSize: 14,
                                    }}
                                >
                                    {props.dropdownTitle}
                                </Text>
                            </View>
                            <FlatList
                                ref={flatListRef}
                                data={props.data}
                                nestedScrollEnabled={true}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.onPress(item)
                                        }}
                                        key={index}
                                    >
                                        <Text style={styles.textStyle}>
                                            {item[props.dataRoute]}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                ListFooterComponent={renderFooter}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                )}
                <Modal
                    isVisible={
                        props?.toggleTimePicker && props.shouldToggleMyPicker
                    }
                    onBackdropPress={props.onPressToggleTime}
                >
                    <View style={styles.modal}>
                        <DateTimePicker
                            value={props.timeValue}
                            mode="time"
                            display={
                                Platform.OS === 'ios' ? 'spinner' : 'default'
                            }
                            is24Hour={false}
                            style={styles.datePicker}
                            onChange={props.onChangeTime}
                            textColor="black"
                        />
                    </View>
                </Modal>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    textStyle: {
        color: colors.primary,
        marginVertical: 3.5,
        paddingVertical: 7,
        paddingLeft: 10,
        // backgroundColor: '#000'
    },
    textStyle2: {
        color: '#000',
        fontFamily: 'Cairo-Medium',
        fontWeight: '500',
        fontSize: 13,
    },
    positionalIndex: {
        width: '100%',
        minHeight: heightp(100),
        maxHeight: heightp(260),
        marginTop: 5,
        backgroundColor: '#fff',
        zIndex: 4,
    },
    heightCont: {
        height: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    position: {
        position: 'relative',
        backgroundColor: '#fff',
        paddingBottom: 5,
    },
    toggle: {
        height: heightp(90),
        width: '100%',
        paddingVertical: 5,
        marginVertical: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#EAE0FF',
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
    },
    containerStyle: {
        backgroundColor: colors.primary,
        padding: 10,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        color: colors.white,
    },
    container: {
        borderWidth: 1,
        borderColor: '#EAE0FF',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#F5F8F5',
        paddingBottom: 10,
        marginBottom: 37.5,
    },
    footer: {
        marginVertical: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        backgroundColor: colors.white,
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: widthp(320),
        height: heightp(260),
        display: 'flex',
        color: '#000',
    },
})

export default CustomDateTimePicker
