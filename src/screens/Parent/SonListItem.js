import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../helpers/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import I18n from 'i18n-js'

function ReturnStatus({ status }) {
    if (status == '2') {
        return <AntDesign name="checkcircle" color={colors.primary} size={15} />
    } else if (status == '1') {
        return <Entypo name="help-with-circle" color={colors.dark} size={15} />
    }
    return <AntDesign name="closecircle" color={'#FF0000'} size={15} />
}

export default function SonListItem({
    name,
    status,
    subClick,
    attendanceClick,
}) {
    console.log(status)
    return (
        <View style={styles.rowItem}>
            <View>
                <Image
                    source={require('../../assets/img/USRE.png')}
                    style={styles.img}
                />
            </View>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <View>{status && <ReturnStatus status={status} />}</View>
                </View>
                {status == '2' && (
                    <View
                        style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            marginTop: 5,
                        }}
                    >
                        <View>
                            <TouchableOpacity
                                style={styles.btnStyle}
                                onPress={subClick}
                            >
                                <Text style={styles.btnTxt}>
                                    {I18n.t('Subscriptions')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[
                                    styles.btnStyle,
                                    {
                                        backgroundColor: colors.dark,
                                        marginHorizontal: 10,
                                    },
                                ]}
                                onPress={attendanceClick}
                            >
                                <Text style={styles.btnTxt}>
                                    {I18n.t('Attendace')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 70,
        height: 70,
        borderRadius: 15,
    },
    rowItem: {
        flexDirection: 'row',
        backgroundColor: colors.gray,
        width: '90%',
        alignSelf: 'center',

        borderRadius: 15,
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        color: colors.black,
        fontWeight: '700',
        fontFamily: 'Cairo',
        marginHorizontal: 20,
    },
    btnStyle: {
        backgroundColor: colors.primary,
        width: 95,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    btnTxt: {
        color: colors.white,
        fontWeight: '700',
        fontFamily: 'Cairo',
    },
})
