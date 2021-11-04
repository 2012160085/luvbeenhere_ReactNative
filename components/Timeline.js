import React from "react";
import { Image, View } from "react-native";
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
import { ts2DateStr } from "../util/DateHandle";

const testUri = "https://picsum.photos/201"
const ContentBubble = styled.TouchableOpacity`
  background-color: white;
  padding : 10px;
  margin-bottom: 30px;
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  border-radius : 1000px;
  elevation: 2;
`;
const Container = styled.View`
`;
const ElementView = styled.View`
  display: flex;
  flex-direction: row;
  
`;
const TimeLabelView = styled.View`
  background-color: white;
  border-radius: 100px;
  elevation: 2;
  padding-left: 10px;
`;
const TimeLabelText = styled.Text`
  font-family: ${fontSet.Regular};
  width: 50px;
`;
const LineView = styled.View`
  display: flex;
  align-items: flex-end;
`;
const TimePointView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;
const VisitInfoView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 15px;
  padding-left: 5px;
`;
const VisitTitleText = styled.Text`
  font-family : ${fontSet.SemiBold}
  font-size: 16px;
`;
const VisitLocationText = styled.Text`
  font-family : ${fontSet.Regular}
  font-size: 12px;
`;
const Circle = styled.View`
  background-color: ${(props) => (props.color ? props.color : "black")};
  width: ${(props) => (props.size ? props.size : "11")}px;
  height: ${(props) => (props.size ? props.size : "11")}px;
  border-radius :${(props) => (props.size ? props.size : "11")}px;
  margin-left: 5px;
`;
const VerticalLine = styled.View`
  background-color: ${(props) => (props.color ? props.color : "rgba(0,0,0,0.4)")};
  width: ${(props) => (props.width ? props.width : "1")}px;
  height: ${(props) => (props.height ? props.height : "0")}px;
  margin-right: ${(props) => (props.size ? props.size / 2 : "5")}px;
  flex:1;
`;

const TimePoint = ({ renderTime, renderPoint, time }) => {
  return (
    <TimePointView>
      {renderTime(time)}
      {renderPoint()}
    </TimePointView>)
}

const renderTime = (time) => {
  return (
    <TimeLabelView>
      <TimeLabelText>
        {ts2DateStr(time, "hm")}
      </TimeLabelText>
    </TimeLabelView>)
}
const renderFirstTime = () => {
  return (
    <Text style={{ width: 60 }}>
    </Text>
  )
}
const renderPoint = () => {
  return <MaterialCommunityIcons name={"clock-time-one-outline"} size={20} />
}
const renderFirstPoint = () => {
  return <MaterialCommunityIcons name={"home-circle-outline"} size={20} />
}
const renderLastPoint = () => {
  return <MaterialCommunityIcons name={"check-circle-outline"} size={20} />
}
const renderContent = (data, index, onItemClick) => {

  return <ContentBubble onPress={() => onItemClick(index)}>

      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 25
        }}
        resizeMode="cover"
        source={{ uri: data.photos[0].file }}
      />
      <VisitInfoView>
        <VisitTitleText>{data.name}</VisitTitleText>
        <Ionicons name={"location"}>
          <VisitLocationText>{data?.location}</VisitLocationText>
        </Ionicons>
      </VisitInfoView>

  </ContentBubble>
}
const renderEmptyContent = () => {
  return <View style={{ height: 50 }}></View>
}

const TimelineElement = ({ renderContent, index, onItemClick, renderTime, renderPoint, data, time, isLast }) => {

  return (
    <ElementView>
      <LineView>
        <VerticalLine size={20} width={2} ></VerticalLine>
        <TimePoint time={time} renderTime={renderTime} renderPoint={isLast ? renderLastPoint : renderPoint} />
      </LineView>
      <View style={{ marginBottom: 20, marginTop: -20 }}>
        {renderContent(data, index, onItemClick)}
      </View>
    </ElementView>
  )
}
const Timeline = ({ data, onItemClick }) => {
  const minTimes = data.map((visit) => Math.min(...visit.photos.map((e) => {
    return e.datetime
  })));
  const maxTime = Math.max(...data[data.length - 1].photos.map((e) => e.datetime));

  return (
    <Container>
      <TimelineElement renderContent={() => null} renderPoint={renderFirstPoint} renderTime={renderFirstTime} />
      <TimelineElement renderContent={renderEmptyContent} renderPoint={renderPoint} renderTime={renderTime} time={minTimes[0]} />
      {data.map((visit, idx) => <TimelineElement key={idx} index={idx} onItemClick={onItemClick} renderContent={renderContent} renderPoint={renderPoint} renderTime={renderTime} data={visit} time={idx === (data.length - 1) ? maxTime : minTimes[idx + 1]} isLast={idx === (data.length - 1)} />)}

    </Container>
  );
};
export default Timeline;
