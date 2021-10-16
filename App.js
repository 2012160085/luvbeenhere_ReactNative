import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    const fontsToLoad = [
      Ionicons.font,
      { "Pretendard-Black": require("./assets/fonts/Pretendard-Black.otf") },
      {
        "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.otf"),
      },
      {
        "Pretendard-ExtraLight": require("./assets/fonts/Pretendard-ExtraLight.otf"),
      },
      { "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.otf") },
      {
        "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.otf"),
      },
      {
        "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
      },
      { "Pretendard-Thin": require("./assets/fonts/Pretendard-Thin.otf") },
    ];
    fontsToLoad.map((font) => console.log(font));
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
