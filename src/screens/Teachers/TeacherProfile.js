/* eslint-disable react/no-children-prop */
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { Container, Text } from '../../components/common'
import IconText from '../../components/IconText'
import colors from '../../helpers/colors'
import { globalStyles } from '../../helpers/globalStyles'
import defaultStyles from '../../helpers/styles'
import HomePageService from '../../services/userServices'
import { IMAGEURL, IMAGEURL2 } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../helpers/common'
import { Vimeo } from 'react-native-vimeo-iframe'
// import Video from 'react-native-video'
const defaultUri = require('../../assets/img/default-profile-picture.jpeg')

const TeacherProfile = () => {
    const route = useRoute()
    const playerRef = useRef()
    const { item } = route.params
    const [teachersData, setTeachersData] = useState({})
    const [VideoUrl, setVideoUrl] = useState('')
    const [vidId, setVideoId] = useState('')
    useEffect(() => {
        // get Notification
        async function getTeacherProfile() {
            // setLoading(true)
            const payload = {
                teacher_id: item?.id,
            }
            try {
                const res = await HomePageService.getTeacherProfile(payload)
                const data = res?.data
                // setLoading(false)
                setTeachersData(data)
                const id = parseInt(data?.video.replace(/[^0-9]/g, ''))
                // fetchVideoLink(id)
                setVideoId(id)
                return res
            } catch (err) {
                // setLoading(false)
            }
        }
        async function fetchVideoLink(id) {
            try {
                fetch(`https://player.vimeo.com/video/${id}/config`, {
                    headers: {
                        'content-type': 'application/json',
                        accept: 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(
                            'ressssssssss',
                            res.request.files.hls.cdns[
                                res.request.files.hls.default_cdn
                            ].url
                        )
                        setVideoUrl(
                            res.request.files.hls.cdns[
                                res.request.files.hls.default_cdn
                            ].url
                        )
                    })
                // return res
            } catch (err) {
                // setLoading(false)
            }
        }
        getTeacherProfile()
    }, [item?.id])
    const uri = `${IMAGEURL}/${teachersData?.image}`

    const videoCallbacks = {
        timeupdate: (data) => console.log('timeupdate: ', data),
        play: (data) => console.log('play: ', data),
        pause: (data) => console.log('pause: ', data),
        fullscreenchange: (data) => console.log('fullscreenchange: ', data),
        ended: (data) => console.log('ended: ', data),
        controlschange: (data) => console.log('controlschange: ', data),
    }

    return (
        <Container>
            <View style={[styles.container, globalStyles.rowBetween]}>
                <FastImage
                    style={{
                        width: heightp(70),
                        height: heightp(70),
                        borderRadius: 10,
                        marginRight: heightp(20),
                    }}
                    source={
                        teachersData?.image === null
                            ? defaultUri
                            : {
                                  uri,
                                  priority: FastImage.priority.normal,
                              }
                    }
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.widthContainer}>
                    <View>
                        <Text
                            style={styles.name}
                            text={
                                teachersData?.first_name &&
                                `${teachersData?.first_name} ${teachersData?.last_name}`
                            }
                        />
                        <Text
                            style={[
                                styles.ratingsName,
                                {
                                    color: colors.white,
                                    width: '90%',
                                    paddingBottom: heightp(7.5),
                                },
                            ]}
                            text={
                                teachersData?.bio && `Bio: ${teachersData?.bio}`
                            }
                        />
                    </View>
                </View>
            </View>
            <View style={styles.borderContainer}>
                {teachersData?.video?.length > 0 ? (
                    <View
                        style={{
                            height: WINDOW_HEIGHT * 0.25,
                            width: WINDOW_WIDTH * 0.9,
                            marginVertical: heightp(10),
                        }}
                    >
                        <Vimeo
                            videoId={vidId}
                            params={'api=1&autoplay=0'}
                            handlers={videoCallbacks}
                        />
                    </View>
                ) : (
                    <Text
                        style={styles.text}
                        text="No Data Present at the moment"
                    />
                )}
            </View>
            <View style={styles.borderContainer}>
                <Text style={styles.header} text="Ratings and Comments" />

                {teachersData?.rates?.length > 0 ? (
                    teachersData?.rates.map((rate) => (
                        <View
                            style={[
                                styles.ratingsContainer,
                                globalStyles.rowBetweenNoCenter,
                                {
                                    flexDirection: 'column',
                                },
                            ]}
                        >
                            <View style={[globalStyles.rowBetweenNoCenter]}>
                                <View style={globalStyles.rowBetweenNoCenter}>
                                    <FastImage
                                        style={{
                                            width: heightp(30),
                                            height: heightp(30),
                                            borderRadius: heightp(30),
                                            marginRight: heightp(10),
                                        }}
                                        source={{
                                            uri: `${IMAGEURL}/${rate?.from?.image}`,
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                    <Text
                                        style={styles.ratingsName}
                                        text={
                                            rate?.from?.first_name &&
                                            `${rate?.from?.first_name} ${rate?.from?.last_name}`
                                        }
                                    />
                                </View>
                                <AirbnbRating
                                    size={12}
                                    imageSize={10}
                                    defaultRating={rate?.rate}
                                    reviews={
                                        [
                                            // 'Terrible',
                                            // 'Bad',
                                            // 'Okay',
                                            // 'Swift & quick pickup',
                                            // 'Excellent',
                                        ]
                                    }
                                    reviewSize={10}
                                    type="star"
                                    ratingColor="#3498db"
                                    ratingContainerStyle={{
                                        flexDirection: 'row',
                                        backgroundColor: 'inherit',
                                        height: '40%',
                                    }}
                                />
                            </View>
                            <Text
                                style={styles.ratingsText}
                                text={
                                    rate?.from?.message &&
                                    `${rate?.from?.message}`
                                }
                            />
                        </View>
                    ))
                ) : (
                    <Text
                        style={styles.text}
                        text="No Ratings Present at the moment"
                    />
                )}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: heightp(90),
        backgroundColor: colors.primary,
        marginVertical: 20,
        borderRadius: 10,
        paddingHorizontal: heightp(15),
    },
    widthContainer: {
        width: '80%',
    },
    name: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: heightp(18),
        textAlign: 'left'
    },
    header: {
        fontWeight: 'bold',
        fontSize: heightp(16),
    },
    borderContainer: {
        borderBottomColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomWidth: 1,
        minHeight: heightp(120),
        // marginVertical: heightp(5),
    },
    text: {
        textAlign: 'center',
        opacity: 0.5,
        marginTop: heightp(20),
    },
    teacherVideo: {
        width: '100%',
        height: heightp(180),
    },
    ratingsContainer: {
        minHeight: heightp(90),
        paddingVertical: heightp(7.5),
        borderBottomColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomWidth: 1,
    },
    ratingsName: {
        color: colors.black,
        fontSize: heightp(12),
    },
    ratingsText: {
        color: colors.black,
        fontSize: heightp(12),
        fontFamily: defaultStyles.text.fontFamily,
        lineHeight: heightp(16),
        paddingTop: heightp(10),
        paddingBottom: heightp(20),
    },
})

export default TeacherProfile
