import React, { useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";


import styled from "styled-components/native";
import DateDetailHeader from "./DateDetailHeader";
import { Ionicons } from "@expo/vector-icons";
import StickyNav from "./StickyNav";
import Visit from "./Visit";
import { gql, useQuery } from "@apollo/client";
import { timestampParsor } from "../util/DateHandle";
import { reverseGeocoding } from "../util/ReverseGeocoding";
import { Divider } from "react-native-elements";
import MyCarousel from "./MyCarousel";
import Carousel from "react-native-snap-carousel";

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

function Date({ data }) {

  const fadeAnim = useRef(new Animated.Value(100)).current;
  const [navScrollable, setNavScrollable] = useState(false);
  const [show, setShow] = useState(true);
  const onScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    
    if (watching >= 0 && y < accHeights[watching]) {
      navScrollRef.current.snapToItem(watching - 1, true, false);
      if (watching - 1 === -1) {
        setShow(true);
        setNavItemWidth(1);
        setNavScrollable(false);
      }

      setWatching(watching - 1);
    } else if (
      data.seeDate.visits.length > watching &&
      y >= accHeights[watching + 1]
    ) {
      navScrollRef.current.snapToItem(watching + 1, true, false);
      setWatching(watching + 1);
      if (watching + 1 === 0) {
        setNavItemWidth(0.5);
        setShow(false);
        setNavScrollable(true);
      }
    }
  };
  const winDim = useWindowDimensions();

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            margin: 10,
            color: "black",
            fontFamily: "Pretendard-SemiBold",
            textAlign: "center",
            maxWidth: 200,
            fontSize: 18,
          }}
        >
          {item}
        </Text>
      </View>
    );
  };
  const scrollRef = useRef();
  const navScrollRef = useRef();
  const sumRating = data.seeDate.visits
    .map((visit) => visit.rating.value)
    .reduce((a, b) => a + b, 0);
  const avgRating = sumRating / data.seeDate.visits.length || 0;

  const [contentHeights, setContentHeights] = useState({});
  const [accHeights, setAcctHeights] = useState({});
  const setContentHeight = (id, height) => {
    contentHeights[id] = height;
    setContentHeights(contentHeights);
    accHeights[0] = contentHeights[0];
    for (var i = 1; i < Object.keys(contentHeights).length; i++) {
      accHeights[i] = contentHeights[i] + accHeights[i - 1];
    }
    setAcctHeights(accHeights);
  };
  const [watching, setWatching] = useState(-1);
  const [navItemWidth, setNavItemWidth] = useState(0.5);
  return (
    <Container>
      
      <ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        stickyHeaderIndices={[1, 42]}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        decelerationRate={"fast"}
      >

        <DateDetailHeader
          title={data.seeDate.name}
          star={avgRating}
          daydate={timestampParsor(data.seeDate.datetime)}
          location={"서울시 노원구"}
          onLayout={(e) => setContentHeight(0, e.nativeEvent.layout.height)}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            height: 50,
          }}
        >
          <StickyNav visible={show} />
          <Carousel
            ref={navScrollRef}
            data={["테스트11", "테스트 2번", "테스트 3번"]}
            renderItem={_renderItem}
            sliderWidth={winDim.width}
            itemWidth={winDim.width * navItemWidth}
            onSnapToItem={(e) => {
              setWatching(e);
              scrollRef.current.scrollTo({
                x: 0,
                y: accHeights[e] + (e===0 ? 0 : 110),
                animated: false,
              });
            }}
            scrollEnabled={navScrollable}
            lockScrollWhileSnapping={true}
          />
        </View>

        <Visit
          onLayout={(e) => setContentHeight(1, e.nativeEvent.layout.height)}
          file={
            "https://luvbeenhere-images.s3.ap-northeast-2.amazonaws.com/14b8eaf22ccd44dad42be0f08664afcd38b4647d96e560fbccb2caabe6a47b79.jpg"
          }
          comment={"좋았어!!"}
        />
        <Visit
          divider={true}
          onLayout={(e) => setContentHeight(2, e.nativeEvent.layout.height)}
          file={
            "https://luvbeenhere-images.s3.ap-northeast-2.amazonaws.com/4a4e364a387afb68c94bdd8aee736b199732d6b3eacd59260ce3522cd92fa4f8.jpg"
          }
        />
        <Visit
          divider={true}
          onLayout={(e) => setContentHeight(3, e.nativeEvent.layout.height)}
          file={
            "https://luvbeenhere-images.s3.ap-northeast-2.amazonaws.com/ee51f71379dae5f05ae3c0c2b044ccc6dad57c02af82aca7f8a6067da1bc825a.jpg"
          }
        /> 
      </ScrollView>
      
    </Container>
  );
}

export default Date;
