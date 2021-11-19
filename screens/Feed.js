import React, { useCallback, useState } from "react";
import { RefreshControl, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { FlatList, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import DateCover from "../components/DateCover";
import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import VisitDetail from "../components/VisitDetail";
import DateDetail from "./DateDetail";
import DateReport from "../components/DateReport";
import DateFeed from "../components/DateFeed";
const SEE_DATES = gql`
  query($skip:Int!,$take:Int!){
    seeDates(skip: $skip, take: $take){
      id
      name
      datetime
      visits{
        name
        posX
        posY
        photos{
          file
        }
      }
      couple{
        id
      }
      posX
      posY
      price
      isMine
    }
  }
`;
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
const renderItem = ({ item }) => {

  return <DateFeed data={item}></DateFeed>
}
export default function Feed() {
  const screen = useWindowDimensions();
  const { data, loading, refetch } = useQuery(SEE_DATES, {
    variables: {
      take: 5,
      skip: 0
    },
    fetchPolicy: "network-only"
  });

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(async () => {


  });
  return (
    loading ? null :
      <FlatList
        renderItem={renderItem}
        data={data.seeDates}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

  );
}
