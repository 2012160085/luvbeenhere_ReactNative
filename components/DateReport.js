import React, { useState } from "react";
import { Image, View } from "react-native";

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
  height: 100%
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

      <MapView
        initialRegion={INITIAL_REGION}
        style={{ height: 200, marginHorizontal: 20, marginTop: 10, marginBottom: 20 }}
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
     
  );
};
export default DateReport;
