import React from 'react'
import i18n from 'i18n-js'
import { I18nManager } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import RNRestart from 'react-native-restart'
import Global from '../../Global'

export const AppContext = React.createContext({
    user: null,
    lang: 'ar',
    isLoading: true,
    rtl: true,
    loadingSpinner: false,
    uuid: '',
})

export class AppState extends React.Component {
    state = {
        user: null,
        lang: 'ar',
        isLoading: true,
        rtl: true,
        loadingSpinner: false,
        uuid: '',
    }

    initUUID = (uid) => {
        this.setState({ uuid: uid })
    }

    initState = (user, lang) => {
        i18n.locale = lang
        if (lang !== 'ar') {
            I18nManager.forceRTL(false)
            this.setState({ user, lang, rtl: false, isLoading: false })
            if (I18nManager.isRTL) RNRestart.Restart()
        } else {
            I18nManager.forceRTL(true)
            this.setState({ user, lang, rtl: true, isLoading: false })
            if (!I18nManager.isRTL) RNRestart.Restart()
        }
        AsyncStorage.setItem('lang', lang)
    }

    changeLang = async (lang) => {
        // this.setState({ loadingSpinner: true })
        i18n.locale = lang
        this.setState({ lang })
        if (lang !== 'ar') {
            if (I18nManager.isRTL) {
                await I18nManager.forceRTL(false)
                this.setState({ lang, rtl: false }, () =>
                    AsyncStorage.setItem('lang', lang)
                )
            }
        } else {
            if (!I18nManager.isRTL) {
                await I18nManager.forceRTL(true)
                console.log(I18nManager.isRTL, 'what is rtl 222')
                this.setState({ lang, rtl: true }, () =>
                    AsyncStorage.setItem('lang', lang)
                )
            }
        }
        RNRestart.Restart()
        // RNRestart.Restart()
        //Updates.reloadAsync();
    }

    onLogin = (user, remember_me) => {
        debugger
        console.log('onLogin user => ', user)
        this.setState({ user }, () => {
            if (remember_me)
                AsyncStorage.setItem('user', JSON.stringify(this.state.user))
            AsyncStorage.setItem(
                'stage_id',
                JSON.stringify(this.state.user?.stage_id)
            )
            AsyncStorage.setItem(
                'level_id',
                JSON.stringify(this.state.user?.level_id)
            )
        })
    }

    onLogout = () => {
        AsyncStorage.removeItem('token')
        console.log('onLogout => ')
        Global.AuthenticationToken = '' || null
        this.setState({ user: null }, () => AsyncStorage.removeItem('user'))
    }

    showLoadingSpinner = (value) => {
        console.log(
            'showLoadingSpinner//////////////////////////////////////////// : ' +
                value
        )
        this.setState({ loadingSpinner: value })
    }

    //rtlText = () => {return this.state.rtl? { textAlign: 'right', writingDirection: 'rtl' }: {} }
    //rtlView = () => {return this.state.rtl? { flexDirection: 'row-reverse' } : {} }

    render() {
        return (
            <AppContext.Provider
                value={{
                    user: this.state.user,
                    lang: this.state.lang,
                    isLoading: this.state.isLoading,
                    loadingSpinner: this.state.loadingSpinner,
                    uuid: this.state.uuid,
                    onLogin: this.onLogin,
                    onLogout: this.onLogout,
                    changeLang: this.changeLang,
                    initState: this.initState,
                    showLoadingSpinner: this.showLoadingSpinner,
                    initUUID: this.initUUID,
                    rtl: this.state.rtl,
                    //rtlText : this.rtlText,
                    //rtlView : this.rtlView,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
