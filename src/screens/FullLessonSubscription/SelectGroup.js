/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import I18n from 'i18n-js'
import { StyleSheet, View } from 'react-native'
import { SubContext } from '.'
import StageCard from '../../components/StageCard'

const SelectGroup = ({ subject_id, items }) => {
    console.log(subject_id, 'hello')
    const { setDisabledProps } = useContext(SubContext)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)

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
            {items.map((item, index) => (
                <StageCard
                    show
                    navigateSubjects={() => {
                        console.log('pressing what here', item)
                    }}
                    stage={item}
                    subject_id={subject_id}
                    activeLevel={activeLevel}
                    setActiveLevel={setActiveLevel}
                    activeStage={activeStage}
                    setActiveStage={setActiveStage}
                    dark
                    text={item.name}
                />
            ))}
        </View>
    )
}

export default SelectGroup
