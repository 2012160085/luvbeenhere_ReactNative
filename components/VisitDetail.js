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
import { GetThumbURI } from "../util/ThumbnailURI";
const carouselSize = 0.9;

const Container = styled.View`
  width: ${(props) => props.width}px;
  background-color: white;
`;
const CommentView = styled.View`
  min-height: 50px;
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

  return (
    <Container width={screen.width}>
      <View>
        <View
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        >
          {data.photos.map((photo, index) => {
            const width = index === 0 ? screen.width / 1.5 : screen.width / 3;
            const height = index === 0 ? screen.width / 1.5 : screen.width / 3;

            return (
              <View
                key={photo.id}
                style={{ width: width, height: width, padding: 1 }}
              >
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                  source={{
                    uri:
                      GetThumbURI(photo.file, index === 0 ? 600 : 300),
                  }}
                />
              </View>
            );
          })}
        </View>
        {/* <FlatList
          horizontal={true}
          snapToInterval={screen.width}
          decelerationRate="fast"
          overScrollMode="never"
          nestedScrollEnabled={true}
          data={data.photos}
          renderItem={({item}) => {
            return <Image
              key={item.id}
              style={{
                width: screen.width,
                height: screen.width,
              }}
              resizeMode="cover"
              source={{ uri: item.file }}
            />
          }}
        >

        </FlatList> */}
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 2,
            }}
          >
            <Ionicons name={"location"} size={15}>
              <Text>{data.rgeocode}</Text>
            </Ionicons>
            <IconView>
              <MaterialCommunityIcons name="weather-rainy" size={20} />
              <MaterialCommunityIcons name="weather-rainy" size={20} />
              <MaterialCommunityIcons name="weather-rainy" size={20} />
              <MaterialCommunityIcons name="weather-rainy" size={20} />
            </IconView>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <CommentView>
              <CommentText>
                {data?.comment ? data.comment : "코멘트가 없습니다"}
              </CommentText>
            </CommentView>
          </ScrollView>
          <IconView>
            <Ionicons name="heart" color="tomato" size={15}>
              <Text>3</Text>
            </Ionicons>
            <Ionicons name="chatbubble-ellipses-outline" size={15}>
              <Text>2</Text>
            </Ionicons>
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
