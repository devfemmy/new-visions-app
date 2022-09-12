import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Loader } from '../../components/Loader';
import { AppContext } from '../../context/AppState';
import HomePageService from '../../services/userServices';

const DeleteMembership = () => {
    const [loading, setLoading] = useState(false);
     const {onLogout} = useContext(AppContext);
    useEffect(() => {
        Alert.alert(
            "Delete Membership",
            "Are you sure you want to delete membership?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "DELETE", onPress: () =>  deleteUser() }
            ]
          ); 
    }, [])

    const deleteUser = async () => {
        setLoading(true);
        try {
          const res = await HomePageService.deleteUser();
          setLoading(false);
          onLogout();
        return res;
        } catch (err) {
            // console.log('err', err)
          setLoading(false);
        } 
      }
    return (
        <View style={styles.container}>
             <Loader visible={loading} /> 
            <Text>DeleteMembership</Text>
        </View>
    )
}

export default DeleteMembership

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
})
