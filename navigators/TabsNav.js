import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  //const { data } = useMe();
  return (
    <Tabs.Navigator
    
      screenOptions={
        {
          headerShown: false,
          tabBarActiveTintColor: "rgba(228, 86, 103, 1)",
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              display: "flex"
            },
            null
          ],

          headerStyle: {
            shadowColor: "rgba(228, 86, 103, 1)",
            shadowOffset: 1
          }
          
        }
        
      }
      
    >
      <Tabs.Screen
        name="MapTab"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"md-map"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Map" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="FeedTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"md-calendar"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="UploadTab"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"md-add-circle"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="SearchTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="ProfileTab"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            <TabIcon iconName={"person"} color={color} focused={focused} />
        }}
      >
        {() => <SharedStackNav screenName="MyProfile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
