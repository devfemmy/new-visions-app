import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    Alert,
    FlatList,
    Platform,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text as RNText,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { globalStyles } from '../../helpers/globalStyles'
import { heightp, widthp } from '../../utils/responsiveDesign'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'
import I18n from 'i18n-js'
import { Text } from '../../components/common'
import colors from '../../helpers/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NewLoader from '../../components/NewLoader'

const GuideQuestionnaire = () => {
    const route = useRoute()
    const { item, questionData } = route.params
    const navigation = useNavigation()
    const { lang, onLogout } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [questionsInput, setQuestionsInput] = useState([])
    const submitQuiz = async () => {
        setLoading(true)
        const payload = {
            day_id: item?.id,
            answers: questionsInput,
        }
        console.log('============== submit', payload)
        try {
            const res = await HomePageService.subscribeWithGuide(payload)
            if (res.code === 200) {
                setLoading(false)
                console.log('============== successful ==============', res)
                Alert.alert(I18n.t('Subscribe'), res?.message, [
                    {
                        text: 'Cancel',
                        onPress: () => navigation.popToTop(),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => navigation.popToTop(),
                    },
                ])
            } else {
                console.log('============== Failed to ==============', res)
                setLoading(false)
                Alert.alert(I18n.t('Subscribe'), res?.message, [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancelled'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => navigation.popToTop(),
                    },
                ])
            }
            return res
        } catch (err) {
            console.log('error loading', err)
            setLoading(false)
        }
    }

    // const navigateTeachersProfile = useCallback(
    //     (item) => {
    //         navigation.navigate('TeacherProfile', {
    //             item,
    //             title: `${item?.first_name} ${item?.last_name}`,
    //         })
    //     },
    //     [navigation]
    // )
    // const navigateStudyGuide = useCallback(
    //     (item, id) => {
    //         navigation.navigate('ChooseStudyDate', {
    //             item,
    //             guide_id: id,
    //         })
    //     },
    //     [navigation]
    // )

    const changeHandler = (value, id) => {
        console.log('setQuestionsInput', value.nativeEvent, id)
        setQuestionsInput((prevState) => [
            ...prevState,
            {
                [id]: value.nativeEvent.text,
            },
        ])
    }
    if (loading){
        return(
            <NewLoader />
        )
    }

    return (
        <>
            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    flex: 1,
                }}
            >
                <ScrollView
                    contentContainerStyle={[styles.container]}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <RNText
                            style={[
                                styles.subItemText2,
                                {
                                    // color: '#fff',
                                    textAlign: 'center',
                                    paddingTop: heightp(5),
                                    paddingBottom: heightp(20),
                                },
                            ]}
                        >
                            {I18n.t('SurveyNew')}
                        </RNText>
                    </View>
                    <View
                        style={[
                            globalStyles.horizontal,
                            {
                                marginBottom: heightp(5),
                            },
                        ]}
                    />
                    {questionData?.questions.map((item, index) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    paddingVertical: heightp(10),
                                    marginVertical: heightp(5),
                                }}
                            >
                                <Text
                                    style={styles.subItemText}
                                    text={item?.question}
                                />
                                {/* <Text
                                style={[
                                    styles.subItemText,
                                    {
                                        color: colors.primary,
                                    },
                                ]}
                                text={`${I18n.t('ABCABCABC')}`}
                                // text={`${I18n.t('QuestionNumber')} ${
                                //     item?.id
                                // }:`}
                            /> */}
                                <View style={styles.formContainer}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize="none"
                                        placeholderTextColor="#000000"
                                        // onChangeText={(text) => {
                                        //     console.log(text)
                                        // }}
                                        onEndEditing={(value) => {
                                            const textValue =
                                                value.nativeEvent.text
                                            const id = item?.id
                                            // var values = {}
                                            // for (
                                            //     var i = Number(
                                            //         questionData?.questions[0]?.id
                                            //     );
                                            //     i < questionData?.questions.length;
                                            //     ++i
                                            // ) {
                                            //     values[i] = ''
                                            // }
                                            // console.log('values', values)
                                            // Object.keys(values).forEach((key) => {
                                            //     const numKey = Number(key)
                                            //     console.log(
                                            //         'adey here =========>',
                                            //         typeof numKey,
                                            //         values[numKey],
                                            //         typeof item?.id
                                            //     )
                                            //     if (numKey === item?.id) {
                                            //         values[numKey] = textValue
                                            //     }
                                            // })
                                            // setQuestionsInput(
                                            //     (questionsInput) => [
                                            //         ...questionsInput,
                                            //         {
                                            //             [id]: textValue,
                                            //         },
                                            //     ]
                                            // )
                                            setQuestionsInput(
                                                (questionsInput) => ({
                                                    ...questionsInput,
                                                    [id]: textValue,
                                                })
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        )
                    })}
                    {/* <FlatList
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={() => (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text text={I18n.t('NoData')} />
                        </View>
                    )}
                    // ListFooterComponent={renderFooter}
                    data={questionData?.questions}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <>
                            <>{console.log(item)}</>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    paddingVertical: heightp(10),
                                    marginVertical: heightp(5),
                                }}
                            >
                                <Text
                                    style={styles.subItemText}
                                    text={item?.question}
                                />
                                <Text
                                    style={[
                                        styles.subItemText,
                                        {
                                            color: colors.primary,
                                        },
                                    ]}
                                    text={`${I18n.t('ABCABCABC')}`}
                                    // text={`${I18n.t('QuestionNumber')} ${
                                    //     item?.id
                                    // }:`}
                                />
                                <View style={styles.formContainer}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize="none"
                                        placeholderTextColor="#000000"
                                        onChangeText={(text) => {
                                            console.log(text)
                                        }}
                                        onEndEditing={(value) => {
                                            const textValue =
                                                value.nativeEvent.text
                                            // console.log('xxxxxxxxxxxxxvalue from questionsInput', value.nativeEvent.text, 'value from questionsInput');
                                            setQuestionsInput(
                                                (questionsInput) => [
                                                    ...questionsInput,
                                                    {
                                                        id: textValue,
                                                    },
                                                ]
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </>
                    )}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={20}
                /> */}
                </ScrollView>
                <View>
                    <View
                        style={[
                            globalStyles.horizontal,
                            {
                                marginVertical: heightp(5),
                            },
                        ]}
                    />
                    <RNText
                        style={[
                            styles.subItemText2,
                            {
                                // color: '#fff',
                                textAlign: 'center',
                                paddingTop: heightp(5),
                                paddingBottom: heightp(20),
                            },
                        ]}
                    >
                        {I18n.t('SurveyNew2')}
                    </RNText>
                </View>
                <View
                    style={{
                        backgroundColor: colors.primary,
                        width: '90%',
                        height: 45,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 10,
                        marginBottom: 35,
                        borderRadius: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            submitQuiz()
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <RNText
                                style={[
                                    styles.subItemText,
                                    {
                                        marginHorizontal: 20,
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {I18n.t('SendNew2')}
                            </RNText>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            {/* <Loader visible={loading} /> */}
        </>
    )
}

export default GuideQuestionnaire

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 50,
        paddingHorizontal: widthp(15),
    },
    flatlistContent: {
        // flexGrow: 1,
    },
    subItemText: {
        color: '#434854',
        fontSize: heightp(16),
        fontWeight: '700',
        textAlign: 'left',
        fontFamily: 'Cairo',
        // alignSelf: 'center',
    },
    input: {
        width: '100%',
        fontSize: heightp(14),
        height: 45,
        fontFamily: 'Cairo-Regular',
        color: 'rgba(70, 79, 84, 1)',
    },
    formContainer: {
        borderWidth: 1,
        borderColor: 'rgba(70, 79, 84, 0.091)',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 2,
        // marginBottom: 15,
        height: 50,
        backgroundColor: 'rgba(70, 79, 84, 0.091)',
    },
    subItemText2: {
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
})
