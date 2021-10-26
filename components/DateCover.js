import React from "react";
import { Image, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import styled from "styled-components";
import { colors } from "../colors";
import Timeline from "react-native-timeline-flatlist";
const Container = styled.View`
  width: 100%;
`;
const DateCover = () => {
  data = [
    { time: "09:00", title: "dddddd" },
    { time: "10:45", title: "aa" },
    { time: "12:00", title: "aa" },
    { time: "14:00", title: "aa" },
    { time: "16:30", title: "aa" },
  ];
  return (
    <Container>

    </Container>
  );
};
export default DateCover;
