import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/SelectPhoto";


import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { fontSet } from "../fonts";
import { colors } from "../colors";
import UploadForm from "../screens/UploadForm";
import HandyUpload from "../screens/HandyUpload";


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
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
        }
      }}
    >
      <Tab.Screen name="직접 업로드">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "black",
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                null
              )
              ,
              headerStyle: {
                backgroundColor: "white",
                shadowOpacity: 0.3,
              },
              headerTitleStyle: {
                fontFamily: fontSet.Medium,
                fontSize: 18

              }
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "업로드 사진 선택", headerTitleAlign: "center" }}
              component={SelectPhoto}
            />
            <Stack.Screen
              name="UploadForm"
              options={{
                title: "업로드",
                headerTitleAlign: "center",

              }}
              component={UploadForm}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="UploadDetail" options={{ title: "업로드", headerTitleAlign: "center" }} component={HandyUpload} />
    </Tab.Navigator>
  );
}
