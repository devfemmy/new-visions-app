import React from 'react'
import I18n from 'i18n-js'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import colors from '../helpers/colors'
import { heightp } from '../utils/responsiveDesign'
import { Text } from './common'
import AppButton from './Button'
import { WINDOW_WIDTH } from '../helpers/common'

const SubscriptionModal = ({ isVisible, onPress, text, navigation }) => {
    return (
        <Modal onBackdropPress={onPress} isVisible={isVisible}>
            <View style={styles.modal}>
                <View style={styles.timeContainer}>
                    <FastImage
                        style={{
                            width: heightp(150),
                            height: heightp(150),
                            borderRadius: 10,
                        }}
                        source={require('../assets/img/SubscriptionModal.png')}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text
                        style={styles.header}
                        text={I18n.t('RegistrationRequest')}
                    />
                    <Text style={styles.text} text={text} />
                    <View
                        style={{
                            marginTop: heightp(10),
                            width: WINDOW_WIDTH * 0.7,
                        }}
                    >
                        <AppButton
                            color="primary"
                            title={I18n.t('Done')}
                            onPress={navigation}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SubscriptionModal

const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
    },
    timeContainer: {
        marginVertical: heightp(10),
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: heightp(26),
        textAlign: 'center',
    },
    text: {
        color: colors.dark,
        fontWeight: '600',
        fontSize: heightp(19),
        textAlign: 'center',
    },
})
