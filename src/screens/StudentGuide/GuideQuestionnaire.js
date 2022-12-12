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
import { heightp } from '../../utils/responsiveDesign'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'
import I18n from 'i18n-js'
import { Text } from '../../components/common'
import colors from '../../helpers/colors'

const GuideQuestionnaire = () => {
    const route = useRoute()
    const { item, questionData } = route.params
    const navigation = useNavigation()
    const { lang, onLogout } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [questionsInput, setQuestionsInput] = useState([])

    console.log('questionnaireData?.questions', questionsInput)

    const submitQuiz = async () => {
        setLoading(true)
        // const payload = {
        //     id: groupId.toString(),
        //     type: 1,
        //     lesson_id: '',
        //     day_id: '',
        // }
        try {
            const res = await HomePageService.subscribeExternal()
            if (res.code === 200) {
                setLoading(false)
            } else {
                setLoading(false)
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
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }

    const navigateTeachersProfile = useCallback(
        (item) => {
            navigation.navigate('TeacherProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )
    const navigateStudyGuide = useCallback(
        (item, id) => {
            navigation.navigate('ChooseStudyDate', {
                item,
                guide_id: id,
            })
        },
        [navigation]
    )

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    globalStyles.container,
                    // globalStyles.wrapper,
                ]}
                style={{ flex: 1, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
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
                                    // onChangeText={(text) => {
                                    //     console.log(text)
                                    // }}
                                    onEndEditing={(value) => {
                                        const textValue = value.nativeEvent.text
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
                                        setQuestionsInput((questionsInput) => [
                                            ...questionsInput,
                                            {
                                                id: item?.id,
                                                name: textValue,
                                            },
                                        ])
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
            <View
                style={{
                    backgroundColor: colors.primary,
                    width: '90%',
                    height: 45,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
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
                            {I18n.t('Send')}
                        </RNText>
                    </View>
                </TouchableOpacity>
            </View>
            <Loader visible={loading} />
        </View>
    )
}

export default GuideQuestionnaire

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 50,
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
})
