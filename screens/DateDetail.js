import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { gql, useQuery } from "@apollo/client";

import ScreenLayout from "../components/ScreenLayout";
import DateCover from "../components/DateCover";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import VisitDetail from "../components/VisitDetail";
import DateReport from "../components/DateReport";
import { FlatList } from "react-native-gesture-handler";
import DateTitle from "../components/DateTitle";
import Timeline from "../components/Timeline";
import DateBriefMap from "../components/DateBriefMap"

const keyExtractor = (item, index) => {
  return `fl${index}`;
};
export default function DateDetail({ loading, data }) {
  var DATA = [];
  if (!loading) {
    DATA = [0, 1, 2, ...data.seeDate.visits, 3];
  }
  const FlatListRef = useRef();
  const renderItem = ({ index, item }) => {

    if (index === 0) {
      return <DateTitle data={data.seeDate} />;
    }
    if (index === 1) {
      return <Timeline data={data.seeDate.visits} onItemClick={onItemClick} />;
    }
    if (index === 2) {
      return <View></View>;
    }
    if (index === DATA.length - 1) {
      return <DateBriefMap data={data.seeDate.visits}/>
    }
    return <VisitDetail data={item} />;
  };
  const onItemClick = (e) => {
    FlatListRef.current.scrollToIndex({ index: e + 3 });
  };

  return loading ? (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color="tomato" size={50} />
    </View>
  ) : (
    <FlatList
      ref={FlatListRef}
      horizontal={false}
      style={{ width: "100%", backgroundColor: "black" }}
      pagingEnabled={false}
      decelerationRate="normal"
      onMomentumScrollEnd={(e) => {
        console.log(e.nativeEvent);
      }}
      stickyHeaderIndices={[0, 2]}
      overScrollMode="never"
      renderItem={renderItem}
      data={DATA}
      keyExtractor={keyExtractor}
    />
  );
}
