import React, { useEffect, useMemo, useState } from 'react'
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

const LiveNowQuiz = () => {
    const route = useRoute()
    const { item, lesson_id } = route.params
    const navigation = useNavigation()
    const [quizData, setQuizData] = useState([])
    const [loading, setLoading] = useState(true)
    const [review, setReview] = useState('')
    const [answersInput, setAnswersInput] = useState([])
    const [answer, setAnswer] = useState('')
    const [numOfMins, setNumOfMins] = useState('')
    console.log(
        'answer to be submitted in live quiz',
        numOfMins,
        numOfMins.length
    )
    useEffect(() => {
        // get Questions and answers
        async function getQuiz() {
            setLoading(true)
            console.log('answer to be submitted in live quiz', lesson_id, item)
            const payload = {
                lesson_id: lesson_id,
            }
            console.log(payload)
            try {
                const res = await HomePageService.startLessonQuiz(payload)
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
                    setQuizData(data?.questions)
                    const filledArray = Array.from(
                        Array(data?.questions.length),
                        () => {
                            return { answer: '', question_id: '' }
                        }
                    )
                    setAnswersInput(filledArray)
                    setNumOfMins(data?.number_of_minutes)
                    console.log('quiz data', data)
                    Alert.alert(
                        `${I18n.t('Quiz')}`,
                        `${I18n.t('PleaseReadYourQuestionsWell')}`,
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
                    return res
                }
            } catch (err) {
                setLoading(false)
                console.log('err', err)
            }
        }
        getQuiz()
    }, [])

    async function submitLessonQuiz() {
        setLoading(true)
        const payload = {
            lesson_id: lesson_id,
            answers: answersInput,
        }
        console.log(payload)
        try {
            const res = await HomePageService.submitLessonQuiz(payload)
            if (res.code === 200) {
                console.log('submitLessonQuiz res', res)
                setLoading(false)
                navigation.navigate('Home')
            } else {
                setLoading(false)
                console.log('false data', res)
            }
        } catch (err) {
            setLoading(false)
            console.log('err', err)
        }
    }

    const renderFooter = () => {
        return (
            <View
                style={{
                    marginBottom: heightp(60),
                    // marginHorizontal: heightp(10),
                }}
            >
                <View
                    style={[
                        styles.footer,
                        {
                            marginVertical: heightp(15),
                        },
                    ]}
                >
                    <Pressable
                        onPress={() => {
                            console.log('pressed')
                            if (answersInput.length !== quizData.length) {
                                alert(`${I18n.t('PleaseAnswerAll')}`)
                            } else {
                                submitLessonQuiz()
                            }
                        }}
                    >
                        <View
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor: 'rgba(67, 72, 84, 1)',
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
                                {I18n.t('SendQuiz')}
                            </Text>
                        </View>
                    </Pressable>
                </View>
                <Text style={styles.footerTitle}>{I18n.t('Rate')}</Text>
                <View
                    style={[
                        styles.borderContainer,
                        {
                            minHeight: WINDOW_HEIGHT * 0.125,
                            backgroundColor: 'rgba(67, 72, 84, 0.1)',
                            borderBottomWidth: 0,
                            marginBottom: heightp(2),
                            borderRadius: heightp(4),
                        },
                    ]}
                >
                    <View
                        style={{
                            height: WINDOW_HEIGHT * 0.125,
                            width: WINDOW_WIDTH * 0.9,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '40%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={[
                                    styles.header,
                                    {
                                        textAlign: 'center',
                                        fontSize: heightp(32),
                                    },
                                ]}
                            >
                                {2?.toFixed(1)}
                            </Text>
                            <AirbnbRating
                                size={16}
                                imageSize={17}
                                defaultRating={2}
                                reviews={
                                    [
                                        // 'Terrible',
                                        // 'Bad',
                                        // 'Okay',
                                        // 'Swift & quick pickup',
                                        // 'Excellent',
                                    ]
                                }
                                reviewSize={10}
                                type="star"
                                ratingColor="#3498db"
                                ratingContainerStyle={{
                                    flexDirection: 'row',
                                    backgroundColor: 'inherit',
                                    // height: '40%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight: heightp(12),
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '60%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {
                                // rateArray.length > 0 &&
                                ['', '', '', '', ''].map((rate, index) => (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        key={index}
                                    >
                                        <Text
                                            style={[
                                                styles.header,
                                                {
                                                    textAlign: 'center',
                                                    fontSize: heightp(12),
                                                    paddingHorizontal:
                                                        heightp(10),
                                                },
                                            ]}
                                        >
                                            {index + 1}
                                        </Text>
                                        <Progress.Bar
                                            progress={index + 1}
                                            width={150}
                                            color={colors.primary}
                                        />
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </View>
                <Text style={styles.footerTitle}>
                    {I18n.t('AddYourReview')}
                </Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={I18n.t('WriteHere')}
                        multiline
                        autoCapitalize="none"
                        value={review}
                        placeholderTextColor="#000000"
                        onChangeText={(text) => {
                            setReview(text)
                        }}
                    />
                </View>
                <View style={styles.footer}>
                    <Pressable
                        onPress={() => {
                            console.log('pressed')
                        }}
                    >
                        <View
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor: colors.primary,
                                    width: WINDOW_WIDTH * 0.5,
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
                                {I18n.t('Publish')}
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        )
    }

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
                                    backgroundColor:
                                        answersInput[index]?.answer === '1'
                                            ? colors.primary
                                            : '#D9D9D9',
                                },
                            ]}
                            onPressIn={() => {
                                console.log('pressed first In')
                                _handleSubmit(index, item?.id, '1')
                            }}
                            onPress={() => {
                                console.log('pressed first In')
                                _handleSubmit(index, item?.id, '1')
                            }}
                        >
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {item?.first_answer}
                            </Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor:
                                        answersInput[index]?.answer === '2'
                                            ? colors.primary
                                            : '#D9D9D9',
                                },
                            ]}
                            onPressIn={() => {
                                console.log('pressed second In')
                                _handleSubmit(index, item?.id, '2')
                            }}
                            onPress={() => {
                                console.log('pressed second In')
                                _handleSubmit(index, item?.id, '2')
                            }}
                        >
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {item?.second_answer}
                            </Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor:
                                        answersInput[index]?.answer === '3'
                                            ? colors.primary
                                            : '#D9D9D9',
                                },
                            ]}
                            onPressIn={() => {
                                console.log('pressed third In')
                                _handleSubmit(index, item?.id, '3')
                            }}
                            onPress={() => {
                                console.log('pressed third In')
                                _handleSubmit(index, item?.id, '3')
                            }}
                        >
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {item?.third_answer}
                            </Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor:
                                        answersInput[index]?.answer === '4'
                                            ? colors.primary
                                            : '#D9D9D9',
                                },
                            ]}
                            onPressIn={() => {
                                console.log('pressed fourth In')
                                _handleSubmit(index, item?.id, '4')
                            }}
                            onPress={() => {
                                console.log('pressed fourth In')
                                _handleSubmit(index, item?.id, '4')
                            }}
                        >
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {item?.fourth_answer}
                            </Text>
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
                    {numOfMins.length > 0 ? (
                        <>
                            <CircularProgress
                                value={0}
                                maxValue={100}
                                initialValue={100}
                                radius={100}
                                duration={
                                    numOfMins.length > 0
                                        ? parseInt(numOfMins) * 86400
                                        : 0
                                }
                                delay={1000}
                                progressValueColor={'rgba(155, 186, 82, 1)'}
                                titleFontSize={16}
                                titleColor={'rgba(67, 72, 84, 1)'}
                                titleStyle={{ fontWeight: 'bold' }}
                                progressValueStyle={{
                                    fontWeight: '100',
                                    color: 'rgba(67, 72, 84, 1)',
                                    fontSize: 36,
                                }}
                                circleBackgroundColor={'#fff'}
                                inActiveStrokeColor={'rgba(233, 233, 233, 1)'}
                                activeStrokeColor={'rgba(155, 186, 82, 1)'}
                                progressFormatter={(value) => {
                                    'worklet'
                                    return value.toFixed(2) // 2 decimal places
                                }}
                                onAnimationComplete={() => {
                                    Alert.alert(
                                        `${I18n.t('Quiz')}`,
                                        `${I18n.t('SubmitQuiz')}`,
                                        [
                                            {
                                                text: 'Ok',
                                                onPress: () => {
                                                    submitLessonQuiz()
                                                },
                                                style: 'cancel',
                                            },
                                        ],
                                        {
                                            cancelable: false,
                                        }
                                    )
                                }}
                            />
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: '#000',
                                        textAlign: 'center',
                                    },
                                ]}
                            >
                                {I18n.t('YouHave')} {numOfMins}{' '}
                                {I18n.t('Minutes')} {I18n.t('ForThis')}{' '}
                                {I18n.t('Quiz')}
                            </Text>
                        </>
                    ) : (
                        <></>
                    )}
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
                    ListFooterComponent={renderFooter}
                    data={quizData}
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

export default LiveNowQuiz

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
