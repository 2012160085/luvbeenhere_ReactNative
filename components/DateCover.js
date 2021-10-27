import React from "react";
import { Image, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import styled from "styled-components";
import { colors } from "../colors";
import Timeline from "react-native-timeline-flatlist";
import { Text } from "react-native";
import { fontSet } from "../fonts";
const Container = styled.View``;

const TimeLabelText = styled.Text`
  color: white;
`;
const DateCover = () => {
  const data = [
    { time: "09:00", title: "Event 1", description: "Event 1 Description" },
    { time: "10:45", title: "Event 2", description: "Event 2 Description" },
    { time: "12:00", title: "Event 3", description: "Event 3 Description" },
    { time: "14:00", title: "Event 4", description: "Event 4 Description" },
    { time: "16:30", title: "Event 5", description: "Event 5 Description" },
  ];

  const renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description)
      desc = (
        <View>
          <Text>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        {desc}
        {title}
      </View>
    );
  };
  return (
    <Timeline
      data={data}
      renderDetail={renderDetail}
      timeStyle={{
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0)",
        color: "black",
        fontFamily: fontSet.Regular,
        padding: 5,
        borderRadius: 13,
        marginTop: -7
      }}
    />
  );
};
export default DateCover;
