import React from "react";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import styled from "styled-components";
import { colors } from "../colors";
import { Text } from "react-native";
import { fontSet } from "../fonts";
import Timeline from "./Timeline";
import DateTitle from "./DateTitle";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const Container = styled.View`
  display: flex;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: #f8f8fa;
  
`;
const DateTitleView = styled.View`
  padding-top: 10%;
  padding-bottom: 10%;
`;
const DateCover = ({ data, onItemClick }) => {
  const screen = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Container width={screen.width} height={screen.height - tabBarHeight} >
      <DateTitleView>
        <DateTitle data={data}></DateTitle>
      </DateTitleView>
      <ScrollView nestedScrollEnabled={true}>
        <Timeline data={data.visits} onItemClick={onItemClick}></Timeline>
      </ScrollView>
    </Container>
  );
};
export default DateCover;
