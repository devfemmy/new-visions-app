/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import I18n from 'i18n-js'
import { StyleSheet, View } from 'react-native'
import { SubContext } from '.'
import StageCard from '../../components/StageCard'
import { useAppDispatch } from '../../redux/hooks'
import { getSubjectGroups } from '../../redux/action'

const SelectGroup = ({ subject_id, items, subscribe_id }) => {
    console.log(subject_id, 'hello')
    const { setDisabledProps } = useContext(SubContext)
    const dispatch = useAppDispatch()
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
                        console.log('pressed')
                    }}
                    newPress={() => {
                        console.log('pressing what here', item)
                        const payload = {
                            subject_id: subscribe_id,
                            type: item.id === 1 ? 1 : item.id === 2 ? 2 : '',
                        }
                        console.log(
                            'xxxxxxxxxxxxxxxxxxx hello, na here i dey',
                            payload
                        )
                        dispatch(getSubjectGroups(payload))
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
