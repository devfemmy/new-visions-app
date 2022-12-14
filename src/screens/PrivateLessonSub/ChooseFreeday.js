/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import I18n from 'i18n-js'
import { StyleSheet, View } from 'react-native'
import { SubContext } from '.'
import { Text } from '../../components/common'
import LessonCard from '../../components/LessonCard'

const ChooseFreeDay = ({ freeDays }) => {
    const { setDisabledProps, setDayIdData } = useContext(SubContext)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    
    useEffect(() => {
        if (activeStage == null) {
            setDisabledProps(false)
        } else {
            setDisabledProps(true)
            setDayIdData(activeStage?.id)
        }
    }, [activeStage, setDisabledProps])
    const styles = StyleSheet.create({
        container: {},
    })
    return (
        <View style={styles.container}>
            {freeDays ? (
                freeDays?.map((item, index) => (
                    <LessonCard
                        key={item?.id}
                        show
                        navigateSubjects={() => {}}
                        stage={item}
                        group
                        activeLevel={activeLevel}
                        setActiveLevel={setActiveLevel}
                        activeStage={activeStage}
                        setActiveStage={setActiveStage}
                        dark
                        text={item?.start}
                    />
                ))
            ) : (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text text={I18n.t('NoData')} />
                </View>
            )}
        </View>
    )
}

export default ChooseFreeDay
