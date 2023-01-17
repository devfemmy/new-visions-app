/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import I18n from 'i18n-js'
import { StyleSheet, View, Text as RNText } from 'react-native'
import { SubContext } from '.'
import { Text } from '../../components/common'
import LessonCard from '../../components/LessonCard'
import { heightp } from '../../utils/responsiveDesign'

const ChooseLesson = ({ lessons }) => {
    const { setDisabledProps, setLessonIdGetten } = useContext(SubContext)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    useEffect(() => {
        console.log('active stage', activeStage)
        if (activeStage == null) {
            setDisabledProps(false)
        } else {
            setDisabledProps(true)
            setLessonIdGetten(activeStage?.id)
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
                {I18n.t('GroupDaysExtra')}
            </RNText>
            {lessons ? (
                lessons?.map((item, index) => {
                    return (
                        <LessonCard
                            key={item?.id}
                            show
                            navigateSubjects={() => {}}
                            stage={item}
                            activeLevel={activeLevel}
                            setActiveLevel={setActiveLevel}
                            activeStage={activeStage}
                            setActiveStage={setActiveStage}
                            dark
                            text={item?.title}
                        />
                    )
                })
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

export default ChooseLesson
