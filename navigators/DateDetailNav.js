import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/SelectPhoto";


import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { fontSet } from "../fonts";
import { colors } from "../colors";
import UploadForm from "../screens/UploadForm";
import DateDetail from "../screens/DateDetail"

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function DateDetailNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: fontSet.Regular
        },
        "tabBarActiveTintColor": "tomato",
        "tabBarIndicatorStyle": {
          "backgroundColor": "white",
          "top": 0
        },
        "tabBarStyle": {
          "backgroundColor": "white",
        },
        swipeEnabled : false
      }}
    >
      <Tab.Screen name="DateDetail" options={{ title: "업로드", headerTitleAlign: "center" }} component={DateDetail} />
    </Tab.Navigator>
  );
}
