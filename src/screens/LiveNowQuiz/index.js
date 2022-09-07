import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation, StackActions } from '@react-navigation/native'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Pressable,
} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { heightp } from '../../utils/responsiveDesign'
import { globalStyles } from '../../helpers/globalStyles'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import { WINDOW_WIDTH } from '../../helpers/common'
import { Container, Text as CustomText } from '../../components/common'

const LiveNowQuiz = () => {
    const route = useRoute()
    const { item } = route.params
    const navigation = useNavigation()
    const [quizData, setQuizData] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    ])
    const [loading, setLoading] = useState(true)
    console.log('item in live quiz', quizData)
    useEffect(() => {
        // get Questions and answers
        async function getQuiz() {
            setLoading(true)
            const payload = {
                lesson_id: item?.data?.lesson.toString(),
                lesson_id: '1289',
            }
            console.log(payload)
            try {
                const res = await HomePageService.startLessonQuiz(payload)
                if (res.code === -2) {
                    setLoading(false)
                } else {
                    console.log('quiz res', res)
                    const data = res?.data
                    setLoading(false)
                    setQuizData(data)
                    console.log('quiz data', data)
                    return res
                }
            } catch (err) {
                setLoading(false)
                console.log('err', err)
            }
        }
        // getQuiz()
    }, [])

    const timeTaken = 4 * 86400

    const renderFooter = () => {
        return (
            <View
                style={{
                    marginBottom: heightp(60),
                }}
            >
                <View style={styles.footer}></View>
            </View>
        )
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <CircularProgress
                        value={0}
                        maxValue={100}
                        initialValue={100}
                        radius={100}
                        duration={timeTaken}
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
                            alert('callback')
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
                    ListFooterComponent={renderFooter}
                    data={quizData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <View style={styles.containerFlex}>
                            <Text
                                style={[
                                    styles.inputTitle,
                                    {
                                        color: 'rgba(155, 186, 82, 1)',
                                    },
                                ]}
                            >
                                Question number 1
                            </Text>
                            <Text style={[styles.inputTitle]}>
                                It is not classified as a main memory type
                            </Text>

                            <View
                                style={{
                                    borderBottomColor:
                                        'rgba(112, 112, 112, 0.5)',
                                    borderBottomWidth: 1,
                                    width: '60%',
                                    marginVertical: heightp(10),
                                }}
                            />
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    console.log('pressed')
                                }}
                            >
                                <View
                                    style={[
                                        styles.btnContainer,
                                        {
                                            backgroundColor: colors.primary,
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
                                        {I18n.t('Attendance')}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    console.log('pressed')
                                }}
                            >
                                <View
                                    style={[
                                        styles.btnContainer,
                                        {
                                            backgroundColor: colors.primary,
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
                                        {I18n.t('Attendance')}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    console.log('pressed')
                                }}
                            >
                                <View
                                    style={[
                                        styles.btnContainer,
                                        {
                                            backgroundColor: colors.primary,
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
                                        {I18n.t('Attendance')}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    console.log('pressed')
                                }}
                            >
                                <View
                                    style={[
                                        styles.btnContainer,
                                        {
                                            backgroundColor: colors.primary,
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
                                        {I18n.t('Attendance')}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
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
})
