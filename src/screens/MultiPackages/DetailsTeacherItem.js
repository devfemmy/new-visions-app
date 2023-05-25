/* eslint-disable react/prop-types */
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    ScrollView,
    FlatList,
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
import IconText from '../../components/IconText'

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
                    // flex: 1,
                    backgroundColor: colors.darkGray,
                    flexDirection: 'row',
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
                <Text
                    style={[
                        styles.subItemText,
                        {
                            fontWeight: '100',
                            // textAlign: lang == 'ar' ? 'right' : 'left',
                        },
                    ]}
                >
                    {lang == 'ar'
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

    return (
        <Pressable
            onPress={() => {
                navigateTeacherProfile(itemData)
            }}
            style={[
                styles.container,
                {
                    flexDirection: 'row',
                    // width: '90%',
                },
            ]}
        >
            <FastImage
                style={{
                    width: uri ? heightp(100) : heightp(75),
                    height: uri ? heightp(100) : heightp(75),
                    borderRadius: 10,
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
                    width: '100%',
                    // backgroundColor: '#f0f',
                    flex: 1,
                    // flexGrow: 1,
                }}
            >
                {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                 <FontAwesome5
                            name="chalkboard-teacher"
                            size={20}
                           />
                    <Text
                        style={[
                            styles.subItemText,
                            {
                                textAlign: lang === 'ar' ? 'right' : 'left',
                            },
                        ]}
                    >
                        {teacherName}
                    </Text>
                </View> */}
                <IconText
                    style={styles.subItemText}
                    text={teacherName && teacherName}
                    children={
                        <FontAwesome5
                            name="chalkboard-teacher"
                            size={20}
                            color={colors.black}
                        />
                    }
                />
                <IconText
                    style={styles.subItemText}
                    text={subjectName && subjectName}
                    children={
                        <MaterialIcons
                            name="subject"
                            size={20}
                            color={colors.black}
                        />
                    }
                />
                {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
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
                                // textAlign: lang !== 'ar' ? 'left' : 'right',
                            },
                        ]}
                    >
                        {subjectName}
                    </Text>
                </View> */}

                {/* <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ flex: 1 }}
                    // nestedScrollEnabled
                    horizontal
                    showsVerticalScrollIndicator={false}
                >
                    {calender?.map((item, index) => {
                        return <RenderItem item={item} />
                    })}
                </ScrollView> */}
                <FlatList
                    horizontal
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator
                    contentContainerStyle={{
                        flex: 1,
                        flexGrow: 1,
                        width: '100%',
                        // paddingVertical: 5,
                        // backgroundColor: '#f0f',
                    }}
                    style={{ flex: 1 }}
                    data={calender}
                    extraData={calender}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    scrollEnabled={true}
                />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 120,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkGray,
        marginHorizontal: 10,
    },
})
