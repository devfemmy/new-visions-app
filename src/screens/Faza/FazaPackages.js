/* eslint-disable arrow-body-style */
import { useNavigation } from '@react-navigation/native'
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { FlatList, LogBox, StyleSheet, View } from 'react-native'
import { Container, Text } from '../../components/common'
import PackageStageCard from '../../components/PackageStageCard'
import {
    getSubjectLevels,
    getSubjectStages,
} from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL2 } from '../../utils/functions'
import { heightp, widthp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'
import { AppContext } from '../../context/AppState'
import { Loader } from '../../components/Loader'

LogBox.ignoreAllLogs()
const FazaPackagesStage = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const { loadingSpinner } = useContext(AppContext)
    const { subjectData } = useAppSelector((state) => state.subjectPage)
    const { levelData } = useAppSelector((state) => state.levelPage)
    console.log('levelData', levelData)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    //
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('<<<<<tabs Refreshed>>>>>>')
            const payload = {
                stage_id: activeStage?.id,
            }
            dispatch(getSubjectStages())
            dispatch(getSubjectLevels(payload))
        })
        return unsubscribe
    }, [activeStage?.id, dispatch])

    const navigateSubjects = useCallback(() => {
        if (activeStage)
            navigation.navigate('SubjectDetails', {
                level: activeLevel?.id,
                // subject: route?.params?.SubjectValue ? route.params.SubjectValue : '',
            })
    }, [activeLevel?.id, activeStage, navigation])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await dispatch(getSubjectStages())
        console.log('response', res?.payload)
        if (res?.payload?.code === 200) {
            setRefreshing(false)
        }
    }, [])

    const recipientFazaSubjectData = subjectData?.filter((a) => {
        if (a?.id === 2 || a?.id === 3) {
            return a
        }
    })

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
                    data={recipientFazaSubjectData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                        const uri = `${IMAGEURL2}${item.image}`
                        return (
                            <PackageStageCard
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
                                faza
                            />
                        )
                    }}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
            {/* <Loader visible={loadingSpinner} /> */}
        </>
    )
}

export default FazaPackagesStage

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
