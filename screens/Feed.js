import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { FlatList, Text, View, ScrollView } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import Date from "../components/Date";


export default function Feed() {
  return (
    <ScreenLayout >
      <Text>feed screen</Text>
    </ScreenLayout>
  );
}
