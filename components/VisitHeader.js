import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";

import { ts2DateStr } from "../util/DateHandle";
import { fontSet } from "../fonts";
import IconRating from "./IconRating";
const Container = styled.View`
  background-color: white;
  align-items: center;
`;
const WhenWhere = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  padding-top:5px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-family: ${fontSet.SemiBold};
`;
const Desc = styled.Text`
  font-size: 14px;
  font-family: ${fontSet.Regular};
`;
const VisitHeader = ({ visit }) => {
  const minTime = Math.min(
    ...visit.photos.map((e) => {
      return e.datetime;
    })
  );
  return (
    <Container>
      <Title>{visit.name}</Title>
      <IconRating
        onRating={null}
        iconName={"md-medical"}
        selectedColor={"#ea4335"}
        defaultColor={"#dbdee1"}
        iconSize={12}
        ratingCount={3}
        defaultValue={visit?.rating ? visit.rating.value : 0}
        disabled={true}
      />
      <WhenWhere>
        {/* <MaterialCommunityIcons
          name={"clock-time-one-outline"}
          size={15}
          style={{ paddingHorizontal: 10 }}
        >
          <Desc>{ts2DateStr(minTime, "hm")} ~</Desc>
        </MaterialCommunityIcons> */}
        {/* <Ionicons name={"location"} size={15} style={{ paddingHorizontal: 10 }}>
          <Desc>{visit.rgeocode}</Desc>
        </Ionicons> */}
      </WhenWhere>
    </Container>
  );
};

export default VisitHeader;
