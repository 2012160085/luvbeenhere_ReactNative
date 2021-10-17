import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_PHOTO } from "../fragments";



export default function UploadForm({ route, navigation }) {
  console.log("------------");
  console.log(route);
  return (
    <View><Text>Upload screen</Text></View>
  );
}
