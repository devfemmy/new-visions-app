/* eslint-disable arrow-body-style */
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, LogBox, StyleSheet, View } from 'react-native'
import { Container, Text } from '../../components/common'
import AllMeasurementQuizStageCard from '../../components/AllMeasurementQuizStageCard'
import {
    getSubjectLevels,
    getSubjectStages,
} from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL2 } from '../../utils/functions'
import { heightp, widthp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'

LogBox.ignoreAllLogs()
const AllMeasurementStage = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const { subjectData } = useAppSelector((state) => state.subjectPage)
    const { levelData } = useAppSelector((state) => state.levelPage)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    //
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        const payload = {
            stage_id: activeStage?.id,
        }
        dispatch(getSubjectStages())
        dispatch(getSubjectLevels(payload))
    }, [activeStage?.id, dispatch])

    const navigateSubjects = useCallback(() => {
        if (activeStage)
            navigation.navigate('AllMeasurementQuiz', {
                level_id: activeLevel?.id,
            })
    }, [activeLevel?.id, activeStage, navigation])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await dispatch(getSubjectStages())
        console.log('response', res?.payload)
        if (res?.payload?.code === 200) {
            setRefreshing(false)
        }
    }, [activeStage])

    return (
        <>
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
                            <AllMeasurementQuizStageCard
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
                                newPress={() => {}}
                            />
                        )
                    }}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    flatlistContent: {
        flexGrow: 1,
    },
    containerFlex: {
        flex: 1,
        marginBottom: heightp(20),
        paddingHorizontal: widthp(15),
    },
})

export default AllMeasurementStage
