import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useRoute, useNavigation, StackActions } from '@react-navigation/native'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { heightp, widthp } from '../../utils/responsiveDesign'
import { globalStyles } from '../../helpers/globalStyles'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../helpers/common'
import {
    Container,
    KeyboardAwareScrollView,
    Text as CustomText,
} from '../../components/common'
import { AirbnbRating } from 'react-native-ratings'
import * as Progress from 'react-native-progress'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { IMAGEURL } from '../../utils/functions'
import FastImage from 'react-native-fast-image'
import IconText from '../../components/IconText'
import { AppContext } from '../../context/AppState'

const LiveNowQuizResult = () => {
    const route = useRoute()
    const { item, lesson_id } = route.params
    const { user } = useContext(AppContext)
    const navigation = useNavigation()
    const [quizData, setQuizData] = useState([])
    const [loading, setLoading] = useState(true)
    const [review, setReview] = useState('')
    const [answersInput, setAnswersInput] = useState([])
    const [uri, setUri] = useState('')
    const [numOfMins, setNumOfMins] = useState('')
    useEffect(() => {
        // get Questions and answers
        async function getMeasurementQuizResult() {
            setLoading(true)
            const payload = {
                quiz_id: item?.id,
            }
            console.log(payload)
            try {
                const res = await HomePageService.getMeasurementQuizResult(
                    payload
                )
                if (res.code === -2) {
                    setLoading(false)
                    console.log('false data', res)
                    Alert.alert(
                        `${I18n.t('Quiz')}`,
                        res?.message,
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    navigation.navigate('Home')
                                },
                                style: 'cancel',
                            },
                        ],
                        {
                            cancelable: false,
                        }
                    )
                } else {
                    console.log('quiz res', res)
                    const data = res?.data
                    setLoading(false)
                    setQuizData(data)
                    setUri(`${IMAGEURL}/${data?.photo}`)
                    const filledArray = Array.from(
                        Array(data?.questions.length),
                        () => {
                            return { answer: '', question_id: '' }
                        }
                    )
                    setAnswersInput(filledArray)
                    setNumOfMins(data?.number_of_minutes)
                    console.log('quiz data', data)
                    return res
                }
            } catch (err) {
                setLoading(false)
                console.log('err', err)
            }
        }
        getMeasurementQuizResult()
    }, [])

    const AnswersInfo = ({ item, index, answersInput, setAnswersInput }) => {
        const _handleSubmit = (i, question_id, answer) => {
            console.log('each next', i, question_id, answer)
            let updatedList = answersInput.map((item, index) => {
                if (i === index) {
                    return { question_id: question_id, answer: answer } //gets what was already in item, and updates them
                }
                return item // else return unmodified item not particularly needed to run this function
            })
            setAnswersInput(updatedList)
        }

        const checkAns = (useIndex) => {
            if (Number(useIndex) === Number(item?.correct_answer)) {
                return colors.primary
            } else if (
                Number(useIndex) === Number(item?.correct_answer) &&
                Number(item?.user_answer) === Number(item?.correct_answer)
            ) {
                return colors.primary
            } else if (
                Number(useIndex) === Number(item?.user_answer) &&
                Number(item?.user_answer) !== Number(item?.correct_answer)
            ) {
                return 'rgba(239, 72, 75, 1)'
            } else {
                return '#D9D9D9'
            }
        }

        const checkAnsIcon = (answer, useIndex) => {
            console.log('useIndex', item, 'useIndex', useIndex)
            if (Number(useIndex) === Number(item?.correct_answer)) {
                return (
                    <IconText
                        style={[styles.title]}
                        textColor={colors.white}
                        text={answer}
                        children={
                            <View style={globalStyles.rowBetween}>
                                <Ionicons
                                    name="md-checkmark-sharp"
                                    size={20}
                                    color={colors.white}
                                />
                            </View>
                        }
                    />
                )
            } else if (
                Number(useIndex) === Number(item?.correct_answer) &&
                Number(item?.user_answer) === Number(item?.correct_answer)
            ) {
                return (
                    <IconText
                        style={[styles.title]}
                        textColor={colors.white}
                        text={answer}
                        children={
                            <View style={globalStyles.rowBetween}>
                                <Ionicons
                                    name="md-checkmark-sharp"
                                    size={20}
                                    color={colors.white}
                                />
                            </View>
                        }
                    />
                )
            } else if (
                Number(useIndex) === Number(item?.user_answer) &&
                Number(item?.user_answer) !== Number(item?.correct_answer)
            ) {
                return (
                    <IconText
                        style={[styles.title]}
                        textColor={colors.white}
                        text={answer}
                        children={
                            <View style={globalStyles.rowBetween}>
                                <Ionicons
                                    name="md-close"
                                    size={25}
                                    color={colors.white}
                                />
                            </View>
                        }
                    />
                )
            } else {
                return (
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.white,
                            },
                        ]}
                    >
                        {answer}
                    </Text>
                )
            }
        }

        return (
            <>
                <View style={styles.containerFlex} key={item?.id}>
                    <Text
                        style={[
                            styles.inputTitle,
                            {
                                color: 'rgba(155, 186, 82, 1)',
                            },
                        ]}
                    >
                        {I18n.t('QuestionNumber')} {item?.id}
                    </Text>
                    <Text style={[styles.inputTitle]}>{item?.title}</Text>

                    <View
                        style={{
                            borderBottomColor: 'rgba(112, 112, 112, 0.5)',
                            borderBottomWidth: 1,
                            width: '60%',
                            marginVertical: heightp(10),
                        }}
                    />
                    <View>
                        <Pressable
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor: checkAns(1),
                                },
                            ]}
                        >
                            {checkAnsIcon(item?.first_answer, 1)}
                        </Pressable>
                    </View>
                    <View>
                        <Pressable
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor: checkAns(2),
                                },
                            ]}
                        >
                            {checkAnsIcon(item?.second_answer, 2)}
                            {/* <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {item?.second_answer}
                            </Text> */}
                        </Pressable>
                    </View>
                    <View>
                        <Pressable
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor: checkAns(3),
                                },
                            ]}
                        >
                            {checkAnsIcon(item?.third_answer, 3)}

                            {/* <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {item?.third_answer}
                            </Text> */}
                        </Pressable>
                    </View>
                    <View>
                        <Pressable
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor: checkAns(4),
                                },
                            ]}
                        >
                            {checkAnsIcon(item?.fourth_answer, 4)}
                            {/* <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {item?.fourth_answer}
                            </Text> */}
                        </Pressable>
                    </View>
                </View>
            </>
        )
    }

    return (
        <>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={globalStyles.rowBetween}>
                        <View>
                            <FastImage
                                style={{
                                    width: heightp(100),
                                    height: heightp(90),
                                    borderRadius: 10,
                                }}
                                source={{
                                    uri,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                        <View
                            style={{
                                width: '60%',
                                paddingHorizontal: widthp(20),
                            }}
                        >
                            <View
                                style={[
                                    globalStyles.rowBetween,
                                    {
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                    },
                                ]}
                            >
                                <IconText
                                    style={styles.textAlign}
                                    text={`${user.first_name} ${user?.last_name}`}
                                    children={
                                        <View style={globalStyles.rowBetween}>
                                            <Ionicons
                                                name="ios-person"
                                                size={20}
                                                color={'rgba(67, 72, 84, 1)'}
                                            />
                                            <View
                                                style={{
                                                    height: heightp(20),
                                                    backgroundColor:
                                                        'rgba(67, 72, 84, 1)',
                                                    width: 1,
                                                    marginHorizontal: 6,
                                                }}
                                            />
                                        </View>
                                    }
                                />
                                <IconText
                                    style={styles.textAlign}
                                    text={
                                        quizData?.subject?.title &&
                                        quizData?.subject?.title
                                    }
                                    children={
                                        <View style={globalStyles.rowBetween}>
                                            <Ionicons
                                                name="ios-layers"
                                                size={20}
                                                color={'rgba(67, 72, 84, 1)'}
                                            />
                                            <View
                                                style={{
                                                    height: heightp(20),
                                                    backgroundColor:
                                                        'rgba(67, 72, 84, 1)',
                                                    width: 1,
                                                    marginHorizontal: 6,
                                                }}
                                            />
                                        </View>
                                    }
                                />
                                {/* <IconText
                                    style={styles.textAlign}
                                    text={
                                        quizData?.subject?.title &&
                                        quizData?.subject?.title
                                    }
                                    children={
                                        <View style={globalStyles.rowBetween}>
                                            <Ionicons
                                                name="person-circle-outline"
                                                size={20}
                                                color={'rgba(67, 72, 84, 1)'}
                                            />
                                            <View
                                                style={{
                                                    height: heightp(20),
                                                    backgroundColor:
                                                        'rgba(67, 72, 84, 1)',
                                                    width: 1,
                                                    marginHorizontal: 6,
                                                }}
                                            />
                                        </View>
                                    }
                                /> */}
                                <IconText
                                    style={[
                                        styles.textAlign,
                                        {
                                            color: colors.primary,
                                        },
                                    ]}
                                    text={
                                        quizData?.questions &&
                                        `${quizData?.final_result}/${quizData?.questions_count}`
                                    }
                                    textColor={colors.primary}
                                    children={
                                        <View style={globalStyles.rowBetween}>
                                            <Ionicons
                                                name="ios-newspaper-outline"
                                                size={20}
                                                color={colors.primary}
                                            />
                                            <View
                                                style={{
                                                    height: heightp(20),
                                                    backgroundColor:
                                                        colors.primary,
                                                    width: 1,
                                                    marginHorizontal: 6,
                                                }}
                                            />
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'rgba(0, 0, 0, 1)',
                            borderBottomWidth: 1.1,
                            width: '70%',
                            marginVertical: heightp(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </View>
                <FlatList
                    // nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                    // contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={() => (
                        <View style={styles.container}>
                            <CustomText text={I18n.t('NoData')} />
                            <Pressable
                                onPress={() => {
                                    navigation.goBack()
                                    console.log('pressed')
                                }}
                            >
                                <View
                                    style={[
                                        styles.btnContainer,
                                        {
                                            backgroundColor: colors.primary,
                                            marginTop: 20,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.title,
                                            {
                                                color: colors.white,
                                            },
                                        ]}
                                    >
                                        {I18n.t('Back')}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View
                            style={{
                                height: heightp(30),
                            }}
                        />
                    )}
                    data={quizData?.questions}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => (
                        <AnswersInfo
                            item={item}
                            index={index}
                            answersInput={answersInput}
                            setAnswersInput={setAnswersInput}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </KeyboardAwareScrollView>
            <Loader visible={loading} />
        </>
    )
}

export default LiveNowQuizResult

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: heightp(15),
    },
    containerFlex: {
        // flex: 1,
        marginBottom: heightp(20),
        // flex: 1,
        // paddingHorizontal: widthp(20),
        // paddingTop: heightp(10),
        justifyContent: 'center',
        alignItems: 'center',
        // width: WINDOW_WIDTH * 0.92,
    },
    inputTitle: {
        fontSize: heightp(15),
        fontWeight: '700',
        color: 'rgba(70, 79, 84, 1)',
        fontFamily: 'Cairo-Regular',
    },
    title: {
        fontSize: heightp(15),
        fontWeight: '700',
        fontFamily: 'Cairo',
    },
    btnContainer: {
        width: WINDOW_WIDTH * 0.85,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.primary,
        borderRadius: 10,
        marginVertical: 5,
    },
    flatlistContent: {
        flexGrow: 1,
    },
    footer: {
        // paddingVertical: heightp(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header: {
        fontWeight: 'bold',
        fontSize: heightp(18),
    },
    borderContainer: {
        borderBottomColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomWidth: 1,
        minHeight: heightp(120),
        // marginVertical: heightp(5),
    },
    footerTitle: {
        fontSize: heightp(14),
        fontWeight: '500',
        color: 'rgba(70, 79, 84, 1)',
        fontFamily: 'Cairo-Regular',
        paddingVertical: heightp(10),
    },
    input: {
        width: '100%',
        fontSize: heightp(14),
        fontFamily: 'Cairo-Regular',
        color: 'rgba(70, 79, 84, 1)',
    },
    formContainer: {
        borderWidth: 1,
        borderColor: 'rgba(70, 79, 84, 0.091)',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 2,
        marginBottom: 15,
        height: heightp(120),
        backgroundColor: 'rgba(70, 79, 84, 0.091)',
    },
    completedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedTitle: {
        textAlign: 'center',
        width: widthp(218),
        fontFamily: 'Cairo-Bold',
        fontSize: 22,
        lineHeight: 33,
        letterSpacing: 0.31,
        color: '#3F3B3E',
    },
})
