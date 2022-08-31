import { View, StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import { AppContext } from '../../context/AppState'
import axios from "axios";
import ContentLoader, {Rect, Circle} from 'react-content-loader/native'
import ParentListItem from './ParentListItem'
import Toast from 'react-native-toast-message';

export default function Parents({navigation}) {
    const { onLogout, showLoadingSpinner} =
    useContext(AppContext);
    const [parents, setParents] = useState([]);
    const [loadingContent, setLoadingContent] = useState(true);

    
    const getParents = (value) => {
        //showLoadingSpinner(true);
    axios
      .post('https://newvisions.sa/api/getUserParents', {
      })
      .then(response => {
        if (
          response != undefined &&
          response.data != undefined &&
          response.data.code != undefined
        ) {
          if (response.data.code == 200) {
            const data = response.data.data;
            setParents(data);
            setLoadingContent(false);
            console.log(parents);
          }else if(response.data.code == 403){
            onLogout();
          } else {
            showLoadingSpinner(false);
            Toast.show({
              text1:response.data.message,
              type:'error',
              style:{color:colors.dark}});
          }
        }
      })
      .catch(error => {
        showLoadingSpinner(false);
        alert(error);
      });
    }

    useEffect(() => {
        getParents();
    },[]);

    
    function ApproveParent(item) {
        axios
      .post('https://newvisions.sa/api/approveParentRequest', {
        "request_id":item.id
      })
      .then(response => {
        if (
          response != undefined &&
          response.data != undefined &&
          response.data.code != undefined
        ) {
          if (response.data.code == 200) {
            showLoadingSpinner(false);
            setLoadingContent(true);
            getParents();
            console.log(parents);
          }else if(response.data.code == 403){
            onLogout();
          } else {
            showLoadingSpinner(false);
            Toast.show({
              text1:response.data.message,
              type:'error',
              style:{color:colors.dark}});
          }
        }
      })
      .catch(error => {
        showLoadingSpinner(false);
        alert(error);
      });
    }

    function disApproveParent(item) {
        axios
      .post('https://newvisions.sa/api/disapproveParentRequest', {
        "request_id":item.id
      })
      .then(response => {
        if (
          response != undefined &&
          response.data != undefined &&
          response.data.code != undefined
        ) {
          if (response.data.code == 200) {
            showLoadingSpinner(false);
            setLoadingContent(true);
            getParents();
          }else if(response.data.code == 403){
            onLogout();
          } else {
            showLoadingSpinner(false);
            Toast.show({
              text1:response.data.message,
              type:'error',
              style:{color:colors.dark}});
          }
        }
      })
      .catch(error => {
        showLoadingSpinner(false);
        alert(error);
      });
    }

    const renderItem = ({item})=>(
        <ParentListItem name={item.name}
        status={item.status} 
        approveClick={() =>{ApproveParent(item)}}
        disapproveClick={() =>{disApproveParent(item)}}
        />
    );
  return (
    <View style={{backgroundColor:colors.white,  flex:.4}}>

    {loadingContent ? (
        <ContentLoader viewBox="0 0 380 70"
    backgroundColor={colors.darkGray}
    foregroundColor={colors.gray} 
    height={100}
    speed={1}>
        {I18n.locale === 'ar'?
        <>
        <Rect x="300" y="0" rx="4" ry="4" width="70" height="70" />
        <Rect x="80" y="17" rx="4" ry="4" width="200" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="200" height="10" />
        </>:<>
        <Rect x="0" y="0" rx="4" ry="4" width="70" height="70" />
        <Rect x="80" y="17" rx="4" ry="4" width="200" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="150" height="10" />
        </>}
      </ContentLoader>
      ) : (
        
        <FlatList
        data={parents}
        extraData={parents}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        scrollEnabled={true}
        />
           
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    searchBar:{
        backgroundColor:colors.darkGray,
        width:'60%',
        borderRadius:15,
        margin:10,
        height:40,
        alignItems:'center',
        flexDirection:'row',
        opacity:.5,
paddingHorizontal:10
    },
    searchBarTxt:{
        fontFamily:'Cairo',
        fontWeight:'700',
        color:colors.white,    
    },
    title:{
        fontSize:21,
        color:colors.black,
        fontWeight:'700',
        fontFamily:'Cairo',
        marginHorizontal:20,
        marginTop:10
    },
addBtn:{
 backgroundColor:colors.primary, height:40, alignItems:'center', justifyContent:'center',
 borderRadius:5
}
})