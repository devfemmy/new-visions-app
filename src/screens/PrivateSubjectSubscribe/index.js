import React, { useState } from 'react'
import I18n from 'i18n-js'
import {
    StyleSheet,
    View,
    Pressable,
    Text as RNText,
    ScrollView,
    Alert,
} from 'react-native'
import { Container, Text } from '../../components/common'
import { heightp, widthp } from '../../utils/responsiveDesign'
import colors from '../../helpers/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomDateTimePicker from '../../components/DateTimePicker'
import HomePageService from '../../services/userServices'
import moment from 'moment'
import { Loader } from '../../components/Loader'

const dayOptions = [
    { value: '1', label: I18n.t('Saturday') },
    { value: '2', label: I18n.t('Sunday') },
    { value: '3', label: I18n.t('Monday') },
    { value: '4', label: I18n.t('Tuesday') },
    { value: '5', label: I18n.t('Wednesday') },
    { value: '6', label: I18n.t('Thursday') },
    { value: '7', label: I18n.t('Friday') },
]

const PrivateSubjectSubscribe = ({ navigation, route }) => {
    const { subject_id } = route.params
    const inputArr = [
        {
            day_id: '',
            time: new Date(),
        },
    ]
    const [inputArray, setInputArray] = useState(inputArr)
    const [dataTogglePicker, setDatePicker] = useState(false)
    const [timeTogglePicker, setTimeTogglePicker] = useState(false)
    const [openDateTogglePickerByInd, setOpenDateTogglePickerByInd] =
        useState('')
    const [loading, setLoading] = useState(false)
    console.log('inputArray', subject_id, inputArray)
    const addInput = () => {
        setInputArray((prev) => {
            return [
                ...prev,
                {
                    day_id: '',
                    time: new Date(),
                },
            ]
        })
    }
    const handleChangeDay = (i, day) => {
        console.log('press pressed day handle', i, day)
        let updatedList = inputArray.map((item, index) => {
            if (i === index) {
                return { ...item, day_id: day } //gets what was already in item, and updates them
            }
            return item // else return unmodified item not particularly needed to run this function
        })
        setInputArray(updatedList)
    }
    const handleChangeTime = (i, time) => {
        console.log('press pressed time handle', i, time)
        let updatedList = inputArray.map((item, index) => {
            if (i === index) {
                return { ...item, time: time } //gets what was already in item, and updates them
            }
            return item // else return unmodified item not particularly needed to run this function
        })
        setInputArray(updatedList)
    }
    async function subscribeToPrivateCourse() {
        setLoading(true)
        let allDayTimeFormatRemodelled = []
        inputArray?.map((item) => {
            const res = {
                day_id:
                    item.day_id === 'Saturday'
                        ? '1'
                        : item.day_id === 'Sunday'
                        ? '2'
                        : item.day_id === 'Monday'
                        ? '3'
                        : item.day_id === 'Tuesday'
                        ? '4'
                        : item.day_id === 'Wednesday'
                        ? '5'
                        : item.day_id === 'Thursday'
                        ? '6'
                        : item.day_id === 'Friday'
                        ? '7'
                        : item?.day_id,
                time: moment(item.time).format('LT'),
            }
            allDayTimeFormatRemodelled.push(res)
        })
        const payload = {
            lesson_id: subject_id,
            days: allDayTimeFormatRemodelled,
        }
        console.log('payload', payload)
        try {
            const res = await HomePageService.subscribeToPrivateCourse(payload)
            if (res.code === 200) {
                console.log('subscribeToPrivateCourse res', res)
                setLoading(false)
                navigation.goBack()
            } else {
                setLoading(false)
                console.log('false data', res)
                Alert.alert(
                    `${I18n.t('PrivateSubjectSubscribe')}`,
                    res?.message,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                // navigation.navigate('Home')
                            },
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            }
        } catch (err) {
            setLoading(false)
            console.log('err', err)
        }
    }
    return (
        <>
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.containerFlex}>
                        <View style={styles.container}>
                            <View style={styles.horizon} />
                            <Text
                                style={styles.text}
                                text={I18n.t('ChooseTheRightDate')}
                            />
                            <View style={styles.horizon} />
                        </View>
                        {inputArray.map((item, index) => {
                            return (
                                <CustomDateTimePicker
                                    pickerTitle="choose the day"
                                    label="Choose the day"
                                    timeLabel="Choose the time"
                                    dropdownTitle="Select day"
                                    data={dayOptions}
                                    dataRoute="label"
                                    value={inputArray[index]?.day_id}
                                    timeValue={inputArray[index]?.time}
                                    onPressToggle={(ind) => {
                                        console.log(
                                            'press pressed ind day',
                                            ind
                                        )
                                        setDatePicker(!dataTogglePicker)
                                        setOpenDateTogglePickerByInd(index)
                                    }}
                                    togglePicker={dataTogglePicker}
                                    shouldToggleMyPicker={
                                        openDateTogglePickerByInd === index
                                            ? true
                                            : false
                                    }
                                    onPress={(el) => {
                                        console.log('press pressed time', el)
                                        handleChangeDay(index, el?.label)
                                        setDatePicker(!dataTogglePicker)
                                    }}
                                    onPressToggleTime={(ind) => {
                                        setTimeTogglePicker(!timeTogglePicker)
                                        setOpenDateTogglePickerByInd(index)
                                    }}
                                    toggleTimePicker={timeTogglePicker}
                                    onChangeTime={(event, value) => {
                                        console.log('press pressed time')
                                        handleChangeTime(index, value)
                                        // setTimeTogglePicker(!timeTogglePicker)
                                    }}
                                />
                            )
                        })}
                    </View>
                    <View
                        style={{
                            height: heightp(150),
                        }}
                    />
                </ScrollView>
            </Container>
            {/* // */}
            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.loginBtn}
                    onPress={() => {
                        addInput()
                        console.log('pressed')
                    }}
                >
                    <View
                        style={[
                            styles.loginBtnView,
                            {
                                backgroundColor: 'rgba(67, 72, 84, 1)',
                            },
                        ]}
                    >
                        <RNText style={styles.loginText}>
                            {I18n.t('AddAnotherDate')}
                        </RNText>
                        <View
                            style={[
                                styles.arrowCont,
                                {
                                    backgroundColor: colors.white,
                                },
                            ]}
                        >
                            <MaterialIcons
                                name={'add'}
                                size={20}
                                color={'rgba(67, 72, 84, 1)'}
                            />
                        </View>
                    </View>
                </Pressable>
                <Pressable
                    style={styles.loginBtn}
                    onPress={() => {
                        subscribeToPrivateCourse()
                        console.log('pressed')
                    }}
                >
                    <View style={styles.loginBtnView}>
                        <RNText style={styles.loginText}>
                            {I18n.t('Save')}
                        </RNText>
                        <View style={styles.arrowCont}>
                            <MaterialIcons
                                name={'check'}
                                size={20}
                                color={colors.white}
                            />
                        </View>
                    </View>
                </Pressable>
            </View>
            <Loader visible={loading} />
        </>
    )
}

export default PrivateSubjectSubscribe

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: heightp(80),
    },
    containerFlex: {
        marginBottom: heightp(20),
    },
    horizon: {
        border: 'solid',
        borderBottomColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomWidth: 1,
        minWidth: '20%',
    },
    text: {
        textAlign: 'center',
        opacity: 0.8,
        paddingHorizontal: widthp(20),
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        height: heightp(120),
        backgroundColor: '#fff',
        width: '100%',
        paddingVertical: heightp(5),
    },
    loginBtn: {
        width: '90%',
        flexDirection: 'row',
        height: heightp(40),
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: heightp(5),
    },
    loginBtnView: {
        flex: 1,
        borderRadius: heightp(40),
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: widthp(50),
    },
    arrowCont: {
        width: widthp(30),
        height: heightp(30),
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 20,
        fontFamily: 'Cairo-Bold',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
        paddingHorizontal: widthp(20),
    },
})
