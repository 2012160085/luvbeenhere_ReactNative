import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { gql, useQuery } from "@apollo/client";

import ScreenLayout from "./ScreenLayout";
import DateCover from "./DateCover";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import VisitDetail from "./VisitDetail";
import DateReport from "./DateReport";
import { FlatList } from "react-native";
import DateTitle from "./DateTitle";
import Timeline from "./Timeline";
import DateBriefMap from "./DateBriefMap";
import VisitHeader from "./VisitHeader";

const keyExtractor = (item, index) => {
  return `fl${index}`;
};
export default function DateDetail({ loading, data }) {


  const stickyHeaderIndex = [];
  const FlatListRef = useRef();
  const [touchable, setTouchable] = useState(true)
  const onItemClick = (e) => {
    FlatListRef.current.scrollToIndex({ index: 2 * e + 1 });
  };
  var ListComponents = [];
  if (!loading) {
    ListComponents.push(<DateTitle data={data.seeDate} />);
    data.seeDate.visits.map((visit) => {
      stickyHeaderIndex.push(ListComponents.length);
      ListComponents.push(<VisitHeader visit={visit} />);
      ListComponents.push(<VisitDetail data={visit} />);
    });
    stickyHeaderIndex.push(ListComponents.length);
    ListComponents.push(<DateBriefMap setTouchable={setTouchable} data={data.seeDate.visits} parentScroll={FlatListRef} />);
    ListComponents.push(
      <Timeline data={data.seeDate.visits} onItemClick={onItemClick} />
    );
  }

  const renderItem = ({ index, item }) => {
    return item;
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
        
      }}
      overScrollMode="never"
      renderItem={renderItem}
      data={ListComponents}
      keyExtractor={keyExtractor}
      stickyHeaderIndices={stickyHeaderIndex}
      pinchGestureEnabled={true}
      nestedScrollEnabled={true}
      scrollEnabled={touchable}
    />
  );
}
