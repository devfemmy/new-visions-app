import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SonListItem from './SonListItem'
import Screen from '../../components/Screen'
import colors from '../../helpers/colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import I18n from 'i18n-js'
import { AppContext } from '../../context/AppState'
import { FlatList } from 'react-native-gesture-handler'
import axios from 'axios'
import SonSubItem from './SonSubItem'

export default function Subscriptions({route}) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    const [toggle4, setToggle4] = useState(false);
    const [toggle5, setToggle5] = useState(false);

    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
    useContext(AppContext);
    function getSonSubscriptions(){
        showLoadingSpinner(true);
        axios
      .post('https://mo.visionsplus.net/api/getChildPayments', {
        "child_id": "6"
      })
      .then(response => {
        if (
          response != undefined &&
          response.data != undefined &&
          response.data.code != undefined
        ) {
          if (response.data.code == 200) {
            const data = response.data.data;
            setSubscriptions(data);
            showLoadingSpinner(false);
            console.log(subscriptions);
          }else if(response.data.code == 403){
            onLogout();
            showLoadingSpinner(false);
          } else {
            showLoadingSpinner(false);
            alert(response.data.message);
          }
        }
      })
      .catch(error => {
        showLoadingSpinner(false);
        alert(error);
      });
    }

    const renderItem = ({item, index})=>(
        <SonSubItem name={item.title}
        index={index}
        subDate={item.created_at} 
        subPrice={item.full_price}
        billClick={() =>{SubscriptionsClicked(item.bill_number)}}
        />
    );

    const EmptyItem = ({item, index})=>(
      <View style={{backgroundColor:colors.dark, height:40, width:'85%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.subItemText}>{I18n.t("noSubField")}</Text>
            </View>
    );

    useEffect(() => {
        getSonSubscriptions();
        //onLogout();
    },[]);

  return (
    <Screen>
        <View style={{backgroundColor:colors.white, flex:1}}>
            <SonListItem name={route.params.name}
            />
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width:'90%',
                    alignSelf:'center',
                    marginBottom:20
                }}
            />

            <ScrollView style={{marginBottom:20}}>
            <TouchableWithoutFeedback onPress={()=> {setToggle1(!toggle1);}}> 
        <View style={styles.subItem}>
            <Text style={styles.subItemText}>{I18n.t("FullLessonSubscription")}</Text>
            <FontAwesome name={toggle1 ? 'arrow-circle-down':'arrow-circle-left'} color={colors.white} size={30} />            
        </View>
        </TouchableWithoutFeedback>
        {subscriptions.payments && toggle1 && 
        <View>
        <FlatList
        data={subscriptions.payments}
        extraData={subscriptions.payments}
        renderItem={renderItem}
        ListEmptyComponent={EmptyItem}
        keyExtractor={item => item.id}
        />
        </View>
        }
        <TouchableWithoutFeedback onPress={()=> {setToggle2(!toggle2);}}> 
        <View style={styles.subItem}>
            <Text style={styles.subItemText}>{I18n.t("OneLessonSubscription")}</Text>
            <FontAwesome name={toggle2 ? 'arrow-circle-down':'arrow-circle-left'} color={colors.white} size={30} />
        </View>
        </TouchableWithoutFeedback>  
        {subscriptions.lessonsPayments && toggle2 &&
        <View>
        <FlatList
        data={subscriptions.lessonsPayments}
        extraData={subscriptions.lessonsPayments}
        renderItem={renderItem}
        ListEmptyComponent={EmptyItem}
        keyExtractor={item => item.id}
        />
        </View>
        }
        <TouchableWithoutFeedback onPress={()=> {setToggle3(!toggle3);}}> 
        <View style={styles.subItem}>
            <Text style={styles.subItemText}>{I18n.t("JointCoursesSubscriptions")}</Text>
            <FontAwesome name={toggle3 ? 'arrow-circle-down':'arrow-circle-left'} color={colors.white} size={30} />            
        </View>
        </TouchableWithoutFeedback>
        {subscriptions.multiPackagePayments && toggle3 &&
        <View>
        <FlatList
        data={subscriptions.multiPackagePayments}
        extraData={subscriptions.multiPackagePayments}
        renderItem={renderItem}
        ListEmptyComponent={EmptyItem}
        keyExtractor={item => item.id}
        />
        </View>
        }
        <TouchableWithoutFeedback onPress={()=> {setToggle4(!toggle4);}}> 
        <View style={styles.subItem}>
            <Text style={styles.subItemText}>{I18n.t("PackagesSubscriptions")}</Text>
            <FontAwesome name={toggle4 ? 'arrow-circle-down':'arrow-circle-left'} color={colors.white} size={30} />            
        </View>
        </TouchableWithoutFeedback>
        {subscriptions.packagesPayments && toggle4 &&
        <View>
        <FlatList
        data={subscriptions.packagesPayments}
        extraData={subscriptions.packagesPayments}
        renderItem={renderItem}
        ListEmptyComponent={EmptyItem}
        keyExtractor={item => item.id}
        />
        </View>
        }
        <TouchableWithoutFeedback onPress={()=> {setToggle5(!toggle5);}}> 
        <View style={styles.subItem}>
            <Text style={styles.subItemText}>{I18n.t("PrivateLessonsSubscriptions")}</Text>
            <FontAwesome name={toggle5 ? 'arrow-circle-down':'arrow-circle-left'} color={colors.white} size={30} />            
        </View>
        </TouchableWithoutFeedback>
        {subscriptions.PrivateSubjectPayments && toggle5 &&
        <View>
        <FlatList
        data={subscriptions.PrivateSubjectPayments}
        extraData={subscriptions.PrivateSubjectPayments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyItem}
        />
        </View>}
        </ScrollView>
        </View>
        
    </Screen>
  )
}

const styles = StyleSheet.create({
    subItem:{
        backgroundColor:colors.primary,
        height:60,
        width:'90%',
marginTop:20,
alignSelf:'center',
justifyContent:'space-between',
alignItems:'center',
borderRadius:15,
flexDirection:'row',
paddingHorizontal:20
    },
    subItemText:{
        color:colors.white,
        fontSize:20,
        fontWeight:'700',
        fontFamily:'Cairo'
    }
});