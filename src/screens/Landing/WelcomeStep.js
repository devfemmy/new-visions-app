import { View, Text } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen'
import Swiper from 'react-native-swiper'
import colors from '../../helpers/colors'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import I18n from 'i18n-js'

export default function WelcomeStep() {
    return (
        <Screen>
            <Swiper
                dot={
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,.3)',
                            width: 15,
                            height: 5,
                            borderRadius: 7,
                            marginLeft: 1,
                            marginRight: 1,
                            borderWidth: 1,
                            borderColor: colors.dark,
                        }}
                    />
                }
                activeDot={
                    <View
                        style={{
                            backgroundColor: colors.dark,
                            width: 30,
                            height: 5,
                            borderRadius: 7,
                            marginLeft: 1,
                            marginRight: 1,
                        }}
                    />
                }
                paginationStyle={{
                    bottom: 30,
                }}
                loop={false}
            >
                <Step4 />
                <Step3 />
                <Step2 />
                <Step1 />
            </Swiper>
        </Screen>
    )
}
