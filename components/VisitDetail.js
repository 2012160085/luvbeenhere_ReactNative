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
import { Badge } from "react-native-elements";
import styled from "styled-components";
import { colors } from "../colors";
import { Text } from "react-native";
import { fontSet } from "../fonts";
import Timeline from "./Timeline";
import DateTitle from "./DateTitle";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-snap-carousel";
import { useWindowDimensions } from "react-native";
import IconRating from "./IconRating";
import { ts2DateStr } from "../util/DateHandle";
const carouselSize = 0.9;

const Container = styled.View`
  height: 100%;
  width: ${(props) => props.width}px;
  background-color: #f8f8fa;
  display: flex;
`;
const CommentText = styled.Text`
  font-family: ${fontSet.Medium}

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
  font-family: ${fontSet.Medium};
  font-size: 15px;
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
const VisitDetail = ({ data }) => {
  const screen = useWindowDimensions();
  const minTime = Math.min(...data.photos.map((e) => {
    return e.datetime
  }));
  console.log(data);
  return (
    <Container width={screen.width}>
      <View style={{ flex: 1 }}>
        <ImageBottomView>
          <MaterialCommunityIcons name={"clock-time-one-outline"}>
            <ImageInfoText>{ts2DateStr(minTime, "hm")}</ImageInfoText>
          </MaterialCommunityIcons>
          <Ionicons name={"location"}>
            <ImageInfoText>서울시 노원구 공릉동</ImageInfoText>
          </Ionicons>
        </ImageBottomView>
        <ScrollView
          horizontal={true}
          snapToInterval={screen.width}
          decelerationRate="fast"
          overScrollMode="never"
        >
          {data.photos.map((photo) => (
            <View key={photo.id}>
              <Image
                style={{
                  width: screen.width,
                  height: screen.width,
                }}
                resizeMode="cover"
                source={{ uri: photo.file }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <View style={{ display: "flex", height: "100%" }}>
          <StarView>
            <IconRating
              onRating={null}
              iconName={"md-medical"}
              selectedColor={"#ea4335"}
              defaultColor={"#dbdee1"}
              iconSize={18}
              ratingCount={3}
              defaultValue={data?.rating ? data.rating.value : 0}
              disabled={true}
            />
          </StarView>
          <ScrollView style={{ flex: 1 }}>
            <CommentText>
              {data?.comment ? data.comment : "코멘트가 없습니다"}
            </CommentText>
          </ScrollView>
          <IconView>
            <LabelView>
              <MaterialCommunityIcons
                name="weather-night"
                size={20}
                color={"black"}
              />
            </LabelView>
            <LabelView>
              <MaterialCommunityIcons name="weather-rainy" size={20} />
            </LabelView>
            <LabelView>
              <MaterialCommunityIcons name="weather-windy" size={20} />
            </LabelView>
            <LabelView>
              <Ionicons name="cafe-outline" size={21}></Ionicons>
            </LabelView>
          </IconView>
        </View>
      </View>
    </Container>
  );
};
export default VisitDetail;
//몇 시부터 얼마동안
//일시
//코멘트
//별점
//날씨
