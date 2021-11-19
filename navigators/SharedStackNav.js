import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Map from "../screens/Map";
import Search from "../screens/Search";

import MyProfile from "../screens/MyProfile";
import { Image } from "react-native";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";
import DateDetail from "../screens/DateDetail";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "white",
        },
        options: {

        },
        headerShown: true
      }}
    >
      {screenName === "Map" ? (
        <Stack.Screen
          name={"Map"}
          component={Map}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Feed" ? (
        <Stack.Screen name={"Feed"} component={Feed} options={
          {
            headerShown: false
          }
        } />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "MyProfile" ? <Stack.Screen name={"MyProfile"} component={MyProfile} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="DateDetail" component={DateDetail} />
    </Stack.Navigator>
  );
}
