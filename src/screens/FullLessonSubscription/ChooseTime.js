/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import I18n from 'i18n-js'
import { SubContext } from '.'
import StageCard from '../../components/StageCard'

const ChooseTime = ({ getGroupDaysData }) => {
    const { setDisabledProps } = useContext(SubContext)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    const items = [{ id: 1, name: 'Select Group' }]
    useEffect(() => {
        if (activeStage == null) {
            setDisabledProps(false)
        } else {
            setDisabledProps(true)
        }
    }, [activeStage, setDisabledProps])
    const styles = StyleSheet.create({
        container: {},
    })
    return (
        <View style={styles.container}>
            {getGroupDaysData?.map((item, index) => {
                const daysOfWeek = [
                    I18n.t('Saturday'),
                    I18n.t('Sunday'),
                    I18n.t('Monday'),
                    I18n.t('Tuesday'),
                    I18n.t('Wednesday'),
                    I18n.t('Thursday'),
                    I18n.t('Friday'),
                ]
                const specialIndex = `${item?.day_id - 1}`
                const dayOfWeek = daysOfWeek[specialIndex]
                return (
                    <StageCard
                        show
                        navigateSubjects={() => {}}
                        newPress={() => {}}
                        stage={item}
                        group
                        reducedHeight
                        activeLevel={activeLevel}
                        setActiveLevel={setActiveLevel}
                        // activeStage={activeStage}
                        setActiveStage={setActiveStage}
                        text2={dayOfWeek}
                        dark
                        text={item.start && `${item.start} - ${item.end}`}
                    />
                )
            })}
        </View>
    )
}

export default ChooseTime
