/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import i18n from 'i18n-js'
import ArrowIcon from '../../assets/img/arrow.svg'
import ArabIcon from '../../assets/img/arab.svg'
import { Text } from './Text'
import { globalStyles } from '../../helpers/globalStyles'
import colors from '../../helpers/colors'
import { heightp } from '../../utils/responsiveDesign'
import { AppContext } from '../../context/AppState'

const HeaderTitle = ({ text, icon, pressed, deleteIcon }) => {
    const { lang } = useContext(AppContext)
    return (
        <View style={[globalStyles.rowBetween, styles.centered]}>
            <Text
                style={styles.headerText}
                fontSize={heightp(13)}
                text={text}
            />
            {deleteIcon ? null : (
                <View style={[globalStyles.rowCenter, styles.lowerBox]}>
                    <Text
                        onPress={pressed}
                        style={styles.text}
                        fontSize={heightp(13)}
                        text={i18n.t('SeeAll')}
                    />
                    {lang === 'ar' ? (
                        <ArabIcon width={11} height={11} />
                    ) : (
                        <ArrowIcon width={11} height={11} />
                    )}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '60%',
        alignItems: 'flex-end',
    },
    headerText: {
        fontWeight: '500',
    },
    logo: {
        width: heightp(120),
        height: heightp(50),
        resizeMode: 'contain',
    },
    centered: {
        alignItems: 'center',
        marginBottom: heightp(5),
    },
    liveLogo: {
        width: heightp(40),
        height: heightp(40),
        resizeMode: 'contain',
    },
    text: {
        marginRight: heightp(5),
        fontSize: heightp(13),
    },
    lowerBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default HeaderTitle
