import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, LogBox, StyleSheet, View } from 'react-native'
import { Container, Text } from '../../components/common'
import MultiPackageStageCard from '../../components/MultiPackageStageCard'
import {
    getSubjectLevels,
    getSubjectStages,
} from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL2 } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'

LogBox.ignoreAllLogs()
const JointCourses = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const { subjectData } = useAppSelector((state) => state.subjectPage)
    const { levelData } = useAppSelector((state) => state.levelPage)
    console.log('levelData', levelData)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    useEffect(() => {
        const payload = {
            stage_id: activeStage?.id,
        }
        dispatch(getSubjectStages())
        dispatch(getSubjectLevels(payload))
    }, [activeStage?.id, dispatch])

    const navigateSubjects = useCallback(() => {
        if (activeStage)
            navigation.navigate('SubjectDetails', {
                level: activeLevel?.id,
                // subject: route?.params?.SubjectValue ? route.params.SubjectValue : '',
            })
    }, [activeLevel?.id, activeStage, navigation])

    return (
        <Container>
            <View style={styles.containerFlex}>
                <FlatList
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
                    data={subjectData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                        const uri = `${IMAGEURL2}${item.image}`
                        return (
                            <MultiPackageStageCard
                                withImg
                                uri={uri}
                                navigateSubjects={navigateSubjects}
                                stage={item}
                                levels={levelData}
                                activeStage={activeStage}
                                activeLevel={activeLevel}
                                setActiveLevel={setActiveLevel}
                                setActiveStage={setActiveStage}
                                dark
                                text={item.name}
                                navigation={navigation}
                            />
                        )
                    }}
                />
            </View>
        </Container>
    )
}

export default JointCourses

const styles = StyleSheet.create({
    flatlistContent: {
        flexGrow: 1,
    },
    containerFlex: {
        marginBottom: heightp(20),
    },
})
