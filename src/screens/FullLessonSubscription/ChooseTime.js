/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import I18n from 'i18n-js'
import { SubContext } from '.'
import StageCard from '../../components/StageCard'
import { heightp } from '../../utils/responsiveDesign'

const ChooseTime = ({ getGroupDaysData, lesson_price }) => {
    // console.log('getGroupDays', getGroupDaysData)
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
        subItemText2: {
            fontSize: heightp(15),
            lineHeight: heightp(20),
            textAlign: 'right',
            color: '#434854',
        },
    })
    return (
        <View style={styles.container}>
            <Text
                style={[
                    styles.subItemText2,
                    {
                        // color: colors.primary,
                        textAlign: 'center',
                        paddingTop: heightp(5),
                        paddingBottom: heightp(20),
                    },
                ]}
            >
                {I18n.t('GroupDaysNew')}
            </Text>
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
                    <>
                        <StageCard
                            show
                            navigateSubjects={() => {}}
                            newPress={() => {}}
                            stage={item}
                            group
                            reducedHeight
                            activeLevel={activeLevel}
                            setActiveLevel={setActiveLevel}
                            // activeStage={activeStage} moment(item.time).format('LT')
                            setActiveStage={setActiveStage}
                            text2={dayOfWeek}
                            dark
                            text={item.start && `${item.start} - ${item.end} `}
                        />
                    </>
                )
            })}
        </View>
    )
}

export default ChooseTime
