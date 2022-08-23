import React, { useContext } from 'react'
import { Container, SafeAreaView, Text } from '../../components/common'
import { AppContext } from '../../context/AppState';

const Profile = () => {
  const { onLogout} = useContext(AppContext);
  return (
    <SafeAreaView>
      <Container>
      <Text onPress={() => onLogout()}  text="Logout" />
    </Container>
    </SafeAreaView>
  )
};

export default Profile;