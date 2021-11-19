import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-map-clustering";
import {
  Marker,
  AnimatedRegion,
  Animated,
  Polyline,
  Polygon,
} from "react-native-maps";

import {
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import VisitMarker from "./VisitMarker";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { fontSet } from "../fonts";

const Container = styled.View`
  background-color: white;
  border-width: 1px;
`;
const Head = styled.View`
  border-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-family: ${fontSet.Medium};
  font-size: 17px;
`;
const ImageInfo = styled.View`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.66);
`;
const ImageDesc = styled.Text`
  font-family: ${fontSet.Regular};
  font-size: 16px;
  color: white;
  padding-horizontal: 5px;
  padding-vertical: 2px; 
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Body = styled.View`
  height: 150px;
  background-color: white;
  border-bottom-width: 1px;
`;
const Tail = styled.View`
  height: 40px;
  background-color: white;
  border-bottom-width: 1px;
`;
const DateFeed = ({ data }) => {
  console.log(data);
  return (
    <Container>
      <Head>
        <Title>무슨무슨 데이트</Title>
      </Head>
      <Body>
        <Image
          source={{ uri: data.visits[0].photos[0].file }}
          style={{ width: 150, height: 150 }}
          blurRadius={4}
        ></Image>
        <ImageInfo>
          <View style={{ alignItems: "baseline" }}>
            <ImageDesc>dfdfd</ImageDesc>
          </View>
        </ImageInfo>
      </Body>
      <Tail></Tail>
    </Container>
  );
};

export default DateFeed;
