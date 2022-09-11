import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'

export default function SonSubItem({
    name,
    subDate,
    subPrice,
    billClick,
    index,
}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: index % 2 == 0 ? '#ECECEC' : '#F5F5F5',
                width: '90%',
                alignSelf: 'center',
                marginTop: 5,
                paddingVertical: 10,
                height: 50,
                maxHeight: 50,
                paddingHorizontal: 10,
            }}
        >
            <Text style={{ overflow: 'hidden', maxWidth: '25%' }}>{name}</Text>
            <Text style={{ overflow: 'hidden', maxWidth: '25%' }}>
                {subDate}
            </Text>
            <Text style={{ overflow: 'hidden', maxWidth: '25%' }}>
                {subPrice}
            </Text>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 5,
                    borderRadius: 10,
                    paddingHorizontal: 5,
                }}
                onPress={billClick}
            >
                <Text
                    style={{
                        color: colors.white,
                        fontWeight: '700',
                        fontFamily: 'Cairo',
                    }}
                >
                    {I18n.t('PreviewBill')}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
