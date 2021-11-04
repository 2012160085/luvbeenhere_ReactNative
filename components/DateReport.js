import React, { useState } from "react";
import { Image, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import MapView from "react-native-map-clustering";
import { Marker, AnimatedRegion, Animated } from "react-native-maps";
import styled from "styled-components";
import { colors } from "../colors";
import { Text } from "react-native";
import { fontSet } from "../fonts";

import { useWindowDimensions } from "react-native";
import VisitMarker from "./VisitMarker";

const Container = styled.View`
  height: 100%;
  width: ${(props) => props.width}px;
  background-color: #f8f8fa;
  display: flex;
`;
const CommentText = styled.Text`
  font-family: ${fontSet.ExtraBold}
  margin-top: 5px;
  margin-horizontal: 10px;
`;
const ImageBottomView = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
`;
const ImageInfoText = styled.Text`
  font-family: ${fontSet.Regular};
  font-size: 25px;
`;
const StarView = styled.View`
  align-items: center;
  padding-vertical: 10px;
`;

const IconView = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: flex-end;
`;
const IconText = styled.Text`
  color: #8465ff;
  font-family: ${fontSet.Regular};
  font-size: 15px;
`;
const LabelView = styled.View`
  margin-horizontal: 3px;
  padding-horizontal: 3px;
`;
const INITIAL_REGION = {
  latitude: 37.55,
  longitude: 126.99,
  latitudeDelta: 0.25,
  longitudeDelta: 0.25,
};

const data = [{ id: "1", posX: 37.544092813605204, posY: 126.9852969292524, name: "ddd" }];
const DateReport = () => {
  const screen = useWindowDimensions();

  return (
    <Container width={screen.width}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
          <Ionicons name="map-outline" size={16}>지도</Ionicons>

        </View>
      <MapView
        initialRegion={INITIAL_REGION}
        style={{ flex: 1, marginHorizontal: 20, marginTop: 10, marginBottom: 20 }}
        moveOnMarkerPress={false}
        pitchEnabled={false}
        scrollEnabled={false}
      >
        {data.map((visit) => {
          return (
            <Marker
              key={visit.id}
              coordinate={{
                latitude: visit.posX,
                longitude: visit.posY,
              }}
            >
              <VisitMarker text={visit.name} iconName={"restaurant"} />
            </Marker>
          );
        })}
      </MapView>
      <View style={{ flex: 2 }} >
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
          <Ionicons name="time-outline" size={16}>시간</Ionicons>
          <Text>2시간</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
          <Ionicons name="walk-outline" size={16}>이동거리</Ionicons>
          <Text>12km</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
          <Ionicons name="md-medical-outline" size={16}>평균별점</Ionicons>
          <Text>2.4점</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
          <Ionicons name="partly-sunny-outline" size={16}>날씨</Ionicons>
          <Text>맑음, 14C</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
          <Ionicons name="pricetag-outline" size={16}>태그</Ionicons>
        </View>
      </View>

    </Container>
  );
};
export default DateReport;
