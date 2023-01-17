/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text as RNText } from 'react-native'
import I18n from 'i18n-js'
import { SubContext } from '.'
import StageCard from '../../components/StageCard'
import { Text } from '../../components/common'
import { heightp } from '../../utils/responsiveDesign'

const ChooseGroup = (subjectGroupData) => {
    const items = subjectGroupData?.subjectGroupData
    console.log('subjectGroupData', subjectGroupData)
    const { setGroupId, setDisabledProps } = useContext(SubContext)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    useEffect(() => {
        const groupId = activeStage?.days[0]?.group_id
        if (activeStage == null) {
            setDisabledProps(false)
        } else {
            setDisabledProps(true)
            setGroupId(groupId)
        }
    }, [activeStage, setDisabledProps, setGroupId])
    const styles = StyleSheet.create({
        container: {},
        textColor: {
            color: 'white',
            fontWeight: 'bold',
        },
        subItemText2: {
            fontSize: heightp(15),
            lineHeight: heightp(20),
            textAlign: 'right',
            color: '#434854',
        },
    })
    return (
        <View style={styles.container}>
            <RNText
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
                {I18n.t('GroupGroupSelect')}
            </RNText>
            {items.length > 0 ? (
                items?.map((item, index) => (
                    <>
                        <>{console.log('days', item)}</>
                        <StageCard
                            group
                            show
                            navigateSubjects={() => {}}
                            newPress={() => {}}
                            stage={item}
                            groupNumber={
                                item && `${I18n.t('GroupNumber')} ${index + 1}`
                            }
                            activeLevel={activeLevel}
                            setActiveLevel={setActiveLevel}
                            activeStage={activeStage}
                            setActiveStage={setActiveStage}
                            dark
                            text={item.start && `${item.start} - ${item.end}`}
                            // days={item?.days && item?.days}
                        />
                    </>
                ))
            ) : (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text text={I18n.t('NoAvailableDates')} />
                </View>
            )}
        </View>
    )
}

export default ChooseGroup
