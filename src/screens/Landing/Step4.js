import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import I18n from 'i18n-js';
import colors from '../../helpers/colors';
import { useNavigation } from '@react-navigation/native';

export default function Step4() {
    const navigation = useNavigation();
  return (
    <Screen>
      <ImageBackground source={require('../../assets/img/Step4.png')} style={styles.backgroundImage}></ImageBackground>

      <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate("Login")}>
                <View style={styles.loginBtnView}>
                    
                    <View style={styles.arrowCont}>
                        <MaterialIcons name={I18n.locale == 'ar'?'arrow-forward-ios':'arrow-back-ios'} size={20} color={colors.white} />
                    </View>
                    <Text style={styles.loginText}>{I18n.t('login')}</Text>
                </View>
            </TouchableOpacity>
    </Screen>
  )
}
const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
        resizeMode:'stretch'
    },loginBtn:{
        width:'80%',
        flexDirection:'row',
        height:45,
        justifyContent:'center',
        alignSelf:'center',
        
    },
    loginBtnView:{
        flex:1,
        borderRadius:40,
        backgroundColor:colors.white,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
    },
    arrowCont:{
        width:30,
        height:30,
        borderRadius:15,
        justifyContent:'center',
        backgroundColor:colors.dark,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    loginText:{
        fontSize:20,
    fontFamily:'Cairo-Bold',
    alignSelf:'center',
    fontWeight:'bold',
    marginRight:'35%'
    },
});