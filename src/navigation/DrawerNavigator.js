import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { RootBottomTabNavigator } from "./RootTabNavigator";
import Home from "../screens/Home/Home";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();
return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={RootBottomTabNavigator}
      options={{
        headerShown: false,
      }} 
      />
      <Drawer.Screen name="Profile" component={Home}
      options={{
        headerShown: false,
      }} 
      />
    </Drawer.Navigator>
)
}

export default DrawerNavigator;