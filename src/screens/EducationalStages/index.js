/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native'
import I18n from 'i18n-js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text } from '../../components/common'
import LessonCard from '../../components/LessonCard'
import StageCard from '../../components/StageCard'
import { AppContext } from '../../context/AppState'
import colors from '../../helpers/colors'
import { globalStyles } from '../../helpers/globalStyles'
import { getSubjectLevels } from '../../redux/action'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { heightp } from '../../utils/responsiveDesign'

const EducationalStage = () => {
    const route = useRoute()
    const { lang } = useContext(AppContext)
    // const { setDisabledProps } = useContext(SubContext);
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
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
    useEffect(() => {
        const payload = {
            stage_id,
        }
        // dispatch(getSubjectStages())
        dispatch(getSubjectLevels(payload))
    }, [stage_id, dispatch])
    const navigateSubjects = useCallback(() => {
        if (activeStage)
            navigation.navigate('SubjectDetails', {
                level: activeStage?.id,
                // subject: route?.params?.SubjectValue ? route.params.SubjectValue : '',
            })
    }, [activeStage, navigation])
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                    style={styles.textStyle}
                    text={stagesArray[stage_id - 1]}
                />
                <View style={globalStyles.horizontalMargin} />
                <View>
                    {levelData?.map((item, index) => (
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
                {/* {activeStage != null ? (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.continueBtn}
                        onPress={navigateSubjects}
                    >
                        <Text
                            text={I18n.t('Next')}
                            style={{
                                textAlign: 'center',
                                fontWeight: '600',
                                color: 'white',
                                fontFamily: 'Cairo-Medium',
                                fontSize: 20,
                            }}
                        />
                    </TouchableOpacity>
                ) : null} */}
            </ScrollView>
        </Container>
    )
}
const styles = StyleSheet.create({
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
