/* eslint-disable react/prop-types */
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    Pressable,
} from 'react-native'
import React, { useCallback, useContext } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import I18n from 'i18n-js'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import colors from '../../helpers/colors'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import { AppContext } from '../../context/AppState'
import { WINDOW_WIDTH } from '../../helpers/common'

export default function DetailsTeacherItem({
    image,
    teacherName,
    subjectName,
    calender,
    itemData,
}) {
    const navigation = useNavigation()
    const { lang } = useContext(AppContext)

    const dateArr = [
        'السبت',
        'الأحد',
        'الإثنين',
        'الثلاثاء',
        'الأربعاء',
        'الخميس',
        'الجمعه',
    ]
    const dateArrEn = [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
    ]
    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    backgroundColor: colors.darkGray,
                    flexDirection: I18n.locale !== 'ar' ? 'row-reverse' : 'row',
                    width: 100,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    marginHorizontal: 5,
                }}
            >
                <FontAwesome5
                    name="calendar-day"
                    size={20}
                    color={colors.dark}
                />
                <Text style={[styles.subItemText, { fontWeight: '100' }]}>
                    {I18n.locale == 'ar'
                        ? dateArr[item.day_id - 1]
                        : dateArrEn[item.day_id - 1]}
                </Text>
            </View>
        )
    }
    const navigateTeacherProfile = useCallback(
        (item) => {
            navigation.navigate('TeacherProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )
    const uri = image
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx', uri, lang)

    return (
        <Pressable
            onPress={() => navigateTeacherProfile(itemData)}
            style={[
                styles.container,
                {
                    flexDirection: lang !== 'ar' ? 'row-reverse' : 'row',
                    // backgroundColor: '#f0f',
                },
            ]}
        >
            <FastImage
                style={{
                    width: uri ? heightp(100) : heightp(75),
                    height: uri ? heightp(100) : heightp(75),
                    borderRadius: 10,
                    // marginRight: lang === 'ar' ? heightp(0) : heightp(20),
                    // marginLeft: lang === 'ar' ? heightp(20) : heightp(0),
                }}
                source={
                    uri
                        ? {
                              uri: `${IMAGEURL}/${image}`,
                              priority: FastImage.priority.normal,
                          }
                        : require('../../assets/img/default-profile-picture.jpeg')
                }
                resizeMode={FastImage.resizeMode.cover}
            />
            <View
                style={{
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: lang !== 'ar' ? 'row-reverse' : 'row',
                    }}
                >
                    <FontAwesome5
                        name="chalkboard-teacher"
                        size={20}
                        color={colors.black}
                    />
                    <Text
                        style={[
                            styles.subItemText,
                            {
                                textAlign: lang !== 'ar' ? 'left' : 'right',
                            },
                        ]}
                    >
                        {teacherName}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: lang !== 'ar' ? 'row-reverse' : 'row',
                    }}
                >
                    <MaterialIcons
                        name="subject"
                        size={20}
                        color={colors.black}
                    />
                    <Text
                        // numberOfLines={1}
                        style={[
                            styles.subItemText,
                            {
                                textAlign: lang !== 'ar' ? 'left' : 'right',
                            },
                        ]}
                    >
                        {subjectName}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: lang !== 'ar' ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <FlatList
                        horizontal
                        data={calender}
                        extraData={calender}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={true}
                    />
                </View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    subItemText: {
        color: colors.dark,
        fontSize: 16,
        fontWeight: '700',
        paddingHorizontal: 10,
        fontFamily: 'Cairo',
        alignSelf: 'center',
        width: '52.5%',
    },
    container: {
        // width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 120,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkGray,
        marginHorizontal: 10,
    },
})
