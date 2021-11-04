import React, { useEffect, useRef } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";

import ScreenLayout from "../components/ScreenLayout";
import DateCover from "../components/DateCover";
import Swiper from 'react-native-swiper'
import styled from "styled-components";
import VisitDetail from "../components/VisitDetail";
import DateReport from "../components/DateReport";
import { FlatList } from "react-native-gesture-handler";


const keyExtractor = (item) => {
  console.log(item.id);
  return `${item.__typename}${item.id}`;
}
export default function DateDetail({ loading, data }) {
  var DATA = []
  if (!loading) {
    DATA = [data.seeDate, ...data.seeDate.visits]
  }
  const FlatListRef = useRef();
  const renderItem = ({ index, item }) => {

    if (index === 0) {
      return <DateCover data={item} onItemClick={onItemClick} />
    }
    return <VisitDetail data={item} />
  }
  const onItemClick = (e) => {
    console.log(e);
    FlatListRef.current.scrollToIndex({ index: e + 1 });
  }
  return (
    loading ? <View style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}><ActivityIndicator color="tomato" size={50} /></View>
      :
      <FlatList
        ref={FlatListRef}
        horizontal={false}
        style={{ height: "100%" }}
        pagingEnabled={true}
        onMomentumScrollEnd={(e) => {
          console.log(e.nativeEvent);
        }}
        overScrollMode="never"
        renderItem={renderItem}
        data={DATA}
        keyExtractor={keyExtractor}
      >

      </FlatList>


  )


}
