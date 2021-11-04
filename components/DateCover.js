import React from "react";
import { Image, useWindowDimensions, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import styled from "styled-components";
import { colors } from "../colors";
import { Text } from "react-native";
import { fontSet } from "../fonts";
import Timeline from "./Timeline";
import DateTitle from "./DateTitle";
import { LinearGradient } from "expo-linear-gradient";

const Container = styled.View`
  height: 100%;
  width: ${(props) => props.width}px;
  background-color: #f8f8fa;
`;
const DateTitleView = styled.View`
  padding-top: 10%;
  padding-bottom: 10%;
`;
const DateCover = ({data, onItemClick}) => {
  const screen = useWindowDimensions();
  return (
    <Container width={screen.width}>
      <DateTitleView>
        <DateTitle data={data}></DateTitle>
      </DateTitleView>
      <ScrollView>
        <Timeline data={data.visits} onItemClick={onItemClick}></Timeline>
      </ScrollView>
    </Container>
  );
};
export default DateCover;
