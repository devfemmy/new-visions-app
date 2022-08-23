import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Container, Text } from '../../components/common';
import NotificationCard from '../../components/NotificationCard';

const Notification = () => {
  const navigation = useNavigation();
  const userData = [
    {
      id: 1,
      content: 'Ebrahim Hanna has subscribed to a special curriculum that you offer. Please review the application to complete the process'
    },
    {
      id: 2,
      content: 'Ebrahim Hanna has subscribed to a special curriculum that you offer. Please review the application to complete the process'
    },
    {
      id: 3,
      content: 'Ebrahim Hanna has subscribed to a special curriculum that you offer. Please review the application to complete the process'
    },
  ]
  return (
    (
        <Container style = {styles.container}>
          <View>
            <FlatList
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.flatlistContent}
              ListEmptyComponent={() => <Text text="No Data" />}
              data={userData}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => (
                  <NotificationCard
                  contents={item.content}
                  />
                )}
            />
          </View>
        </Container>
    )
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  }
})

export default Notification;