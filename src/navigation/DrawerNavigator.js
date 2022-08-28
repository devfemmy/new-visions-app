import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { RootBottomTabNavigator } from "./RootTabNavigator";
import Home from "../screens/Home/Home";
import BackIcon from '../assets/img/back.svg';
import Calendar from "../screens/Calendar";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const backRight = () => (
    <TouchableOpacity
    onPress={() => navigation.goBack()}
      style={{
        marginLeft: 16,
      }}
    >
      <BackIcon width={20} height={20} />
    </TouchableOpacity>
  );
return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={RootBottomTabNavigator}
      options={{
        headerShown: false,
      }} 
      />
      <Drawer.Screen name="Calendar" component={Calendar}
      options={{
        headerShown: true,
        headerLeft: backRight,
        unmountOnBlur: true
      }} 
      />
    </Drawer.Navigator>
)
}

export default DrawerNavigator;