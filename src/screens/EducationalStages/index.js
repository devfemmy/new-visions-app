/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native'
import I18n from 'i18n-js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { Container, Text } from '../../components/common'
import LessonCard from '../../components/LessonCard'
import { Loader } from '../../components/Loader'
import StageCard from '../../components/StageCard'
import { AppContext } from '../../context/AppState'
import colors from '../../helpers/colors'
import { globalStyles } from '../../helpers/globalStyles'
import { getSubjectLevels } from '../../redux/action'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import HomePageService from '../../services/userServices'
import { heightp } from '../../utils/responsiveDesign'

const EducationalStage = () => {
    const route = useRoute()
    const { lang, loadingSpinner, showLoadingSpinner, onLogout } =
        useContext(AppContext)
    // const { setDisabledProps } = useContext(SubContext);
    const [levelDatas, setLevelDatas] = useState(null)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { stage_id } = route.params
    const navigation = useNavigation()
    const { levelData } = useAppSelector((state) => state.levelPage)
    let stagesArray
    if (lang === 'ar') {
        stagesArray = ['مدرسة إبتدائية', 'المدرسة المتوسطة', 'تَعْليم ثانَويّ']
    } else {
        stagesArray = ['Primary School', 'Middle School', 'Secondary School']
    }

    const getSubjectLevels = async () => {
        setLoading(true)
        const payload = {
            stage_id,
        }
        try {
            const res = await HomePageService.getLevels(payload)
            const data = res?.data
            if (res.code === 200) {
                setLoading(false)
                setLevelDatas(data)
                // console.log('wwwwwwwwww data zooooooooooooooom', data)
            } else {
                alert('This Account is Logged in from another Device.')
                onLogout()
                // return
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('<<<<<tabs Refreshed>>>>>>')
            getSubjectLevels()
        })
        return unsubscribe
    }, [stage_id, dispatch])

    const navigateSubjects = useCallback(() => {
        if (activeStage)
            navigation.navigate('SubjectDetails', {
                level: activeStage?.id,
                // subject: route?.params?.SubjectValue ? route.params.SubjectValue : '',
            })
    }, [activeStage, navigation])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getSubjectLevels()
        console.log('response', res)
        if (res?.code === 200) {
            setRefreshing(false)
        }
    }, [])

    return (
        <>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    globalStyles.container,
                    globalStyles.wrapper,
                ]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text
                    style={styles.textStyle}
                    text={stagesArray[stage_id - 1]}
                />
                <View style={globalStyles.horizontalMargin} />
                <View>
                    {levelDatas?.map((item, index) => (
                        <LessonCard
                            key={item?.id}
                            show
                            navigateSubjects={() => {
                                navigateSubjects()
                            }}
                            stage={item}
                            activeLevel={activeLevel}
                            setActiveLevel={setActiveLevel}
                            activeStage={activeStage}
                            group
                            reducedHeight
                            setActiveStage={setActiveStage}
                            dark
                            text={item?.name}
                        />
                    ))}
                </View>
            </ScrollView>
            <Loader visible={loading} />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    textStyle: {
        fontSize: heightp(22),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    continueBtn: {
        backgroundColor: colors.primary,
        height: heightp(45),
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: heightp(20),
        marginBottom: heightp(25),
    },
})

export default EducationalStage
